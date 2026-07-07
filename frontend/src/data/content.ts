export const personal = {
  name:      'Janaka Sangeeth Hettiarachchi',
  handle:    'devj',
  host:      'zoneforty5',
  title:     'DevOps Engineer',
  subtitle:  'Cloud · Automation · Systems Builder',
  tagline:   'I build what I deploy.',
  location:  'Sri Lanka',
  timezone:  'UTC+5:30',
  email:     'sangeeth.jdev@gmail.com',
  github:    'janak-dev2002',
  githubUrl: 'https://github.com/janak-dev2002',
  linkedin:  null as string | null,
  cvPath:    '/cv.pdf',
}

export const stats = [
  { value: '60+', label: 'Nodes Managed'   },
  { value: '5+',  label: 'Systems Shipped' },
  { value: '3',   label: 'Cloud Projects'  },
  { value: '1',   label: 'Homelab Running' },
]

export const about = `I build what I deploy.

From 60-node Raspberry Pi edge networks to AWS production environments,
I work across the full systems stack — writing the code, containerising
it, wiring the pipeline, and running it in production.

Currently pursuing CCNA at University of Moratuwa and building
hands-on DevOps projects across Linux, Docker, Kubernetes,
Terraform, Ansible, and AWS.

Based in Sri Lanka. Available for DevOps roles and
infrastructure contracts.`

export const sysInfo = [
  { key: 'OS',        val: 'Ubuntu 24.04 LTS'           },
  { key: 'Homelab',   val: 'batcavelab — LXD'           },
  { key: 'Cloud',     val: 'AWS (EC2, S3, CF)'           },
  { key: 'Stack',     val: 'Go · Java · Python · React'  },
  { key: 'Education', val: 'BSc Software Eng. (1st Class)' },
  { key: 'Status',    val: '● CCNA in progress'          },
]

// ── Hex Skills ───────────────────────────────────────────────────────────────
// Data served by GET /api/skills — see src/services/api.ts

export interface HexSkill {
  label:       string
  proficiency: number
  color:       'green' | 'blue'
  tools:       string[]
}

// ── Architecture Diagrams ────────────────────────────────────────────────────

export interface ArchNode {
  id:    string
  label: string
  x:     number
  y:     number
  type:  'box' | 'cloud' | 'device'
}

export interface ArchEdge {
  from:   string
  to:     string
  label?: string
}

// ── Projects ─────────────────────────────────────────────────────────────────

export type ProjectCategory = 'infrastructure' | 'software-iot' | 'coming-soon'

export interface Project {
  folder:      string
  title:       string
  description: string
  stack:       string[]
  githubUrl:   string | null
  category:    ProjectCategory
  nodes:       ArchNode[]
  edges:       ArchEdge[]
}

// Projects array served by GET /api/projects — see src/services/api.ts

// ── Timeline ─────────────────────────────────────────────────────────────────
// Data served by GET /api/timeline — see src/services/api.ts

export interface TimelineEntry {
  id:     string
  label:  string
  org:    string
  date:   string
  status: 'active' | 'queued'
  note:   string
}

// ── Tech Strip ───────────────────────────────────────────────────────────────

export const techTools = [
  'Linux', 'Docker', 'Kubernetes', 'Terraform', 'Ansible',
  'AWS', 'GitHub Actions', 'Prometheus', 'Grafana',
  'Go', 'Java', 'Python', 'Bash', 'MQTT', 'Nginx', 'Git',
]

// ── Boot Sequence ─────────────────────────────────────────────────────────────

export const bootLines = [
  { text: 'BIOS v2.6.1 — ZoneForty5 Systems',        type: 'header'   as const },
  { text: 'Initializing hardware...',                  type: 'info'     as const },
  { text: '',                                          type: 'blank'    as const },
  { text: 'Started Network Manager',                   type: 'ok'       as const },
  { text: 'Mounted /home/devj',                        type: 'ok'       as const },
  { text: 'Started SSH Key Authentication (ED25519)',  type: 'ok'       as const },
  { text: 'Started Docker Container Runtime',          type: 'ok'       as const },
  { text: 'Started Kubernetes Orchestration Layer',    type: 'ok'       as const },
  { text: 'Loaded CCNA Module — networking.service',   type: 'ok'       as const },
  { text: 'Started AWS Cloud Provider',                type: 'ok'       as const },
  { text: 'Reached target DevOps Engineer',            type: 'ok'       as const },
  { text: '',                                          type: 'blank'    as const },
  { text: 'Starting devj.zoneforty5.tech...',          type: 'progress' as const },
]
