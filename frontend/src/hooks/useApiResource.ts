import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '../services/api'

type Status = 'loading' | 'success' | 'error'

const FALLBACK_ERROR_MESSAGE = 'Could not reach the server. Check your connection and try again.'

export function useApiResource<T>(fetcher: () => Promise<T>) {
  const [data, setData]               = useState<T | null>(null)
  const [status, setStatus]           = useState<Status>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  const load = useCallback(() => {
    setStatus('loading')
    fetcher()
      .then(result => {
        setData(result)
        setStatus('success')
      })
      .catch((err: unknown) => {
        setErrorMessage(err instanceof ApiError ? err.body.message : FALLBACK_ERROR_MESSAGE)
        setStatus('error')
      })
  }, [fetcher])

  useEffect(() => {
    load()
  }, [load])

  return { data, status, errorMessage, retry: load }
}
