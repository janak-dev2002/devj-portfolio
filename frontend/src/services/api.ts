import type { Project, HexSkill, TimelineEntry } from '../data/content'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

export interface ApiFieldError {
  field:   string
  message: string
}

// Matches shared/api-contracts.md §1 — the error shape every endpoint returns on failure.
export interface ApiErrorBody {
  timestamp:    string
  status:       number
  error:        string
  message:      string
  path:         string
  fieldErrors?: ApiFieldError[]
}

export class ApiError extends Error {
  readonly status: number
  readonly body: ApiErrorBody
  readonly retryAfterSeconds?: number

  constructor(body: ApiErrorBody, retryAfterSeconds?: number) {
    super(body.message)
    this.name = 'ApiError'
    this.status = body.status
    this.body = body
    this.retryAfterSeconds = retryAfterSeconds
  }
}

async function toApiErrorBody(res: Response): Promise<ApiErrorBody> {
  try {
    const data = await res.json()
    if (data && typeof data.message === 'string') return data as ApiErrorBody
  } catch {
    // response body wasn't JSON (e.g. an upstream proxy error page) — fall through
  }
  return {
    timestamp: new Date().toISOString(),
    status:    res.status,
    error:     res.statusText || 'Error',
    message:   'Something went wrong. Please try again later.',
    path:      new URL(res.url).pathname,
  }
}

// A stalled connection (dropped packets, an unreachable host) never rejects on
// its own — without this, a hung request leaves callers in 'loading' forever.
const REQUEST_TIMEOUT_MS = 9000

async function fetchWithTimeout(url: string, path: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } catch (err) {
    if (controller.signal.aborted) {
      throw new ApiError({
        timestamp: new Date().toISOString(),
        status:    0,
        error:     'Timeout',
        message:   'The server took too long to respond. Please check your connection and try again.',
        path,
      })
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetchWithTimeout(`${API_BASE}${path}`, path)
  if (!res.ok) throw new ApiError(await toApiErrorBody(res))
  return res.json() as Promise<T>
}

export const getProjects = (): Promise<Project[]> => getJson<Project[]>('/api/projects')
export const getSkills   = (): Promise<HexSkill[]> => getJson<HexSkill[]>('/api/skills')
export const getTimeline = (): Promise<TimelineEntry[]> => getJson<TimelineEntry[]>('/api/timeline')

export interface ContactPayload {
  name:    string
  email:   string
  message: string
  website: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

export async function postContact(payload: ContactPayload): Promise<ContactResponse> {
  const path = '/api/contact'
  const res = await fetchWithTimeout(`${API_BASE}${path}`, path, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })
  if (!res.ok) {
    const retryAfterHeader = res.headers.get('Retry-After')
    const retryAfterSeconds = retryAfterHeader ? Number(retryAfterHeader) : undefined
    throw new ApiError(await toApiErrorBody(res), retryAfterSeconds)
  }
  return res.json() as Promise<ContactResponse>
}
