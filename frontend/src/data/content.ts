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

export const hexSkills = [
  { label: 'Linux',      proficiency: 82, color: 'green' as const,
    tools: ['Ubuntu', 'RHEL', 'Systemd', 'SSH', 'Bash'] },
  { label: 'Containers', proficiency: 80, color: 'green' as const,
    tools: ['Docker', 'Docker Compose', 'Kubernetes', 'Helm'] },
  { label: 'CI/CD',      proficiency: 78, color: 'green' as const,
    tools: ['GitHub Actions', 'Git', 'Branching', 'PRs'] },
  { label: 'AWS Cloud',  proficiency: 75, color: 'green' as const,
    tools: ['EC2', 'S3', 'IAM', 'CloudFront', 'Lambda'] },
  { label: 'Networking', proficiency: 65, color: 'blue'  as const,
    tools: ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'CCNA'] },
  { label: 'Terraform',  proficiency: 50, color: 'blue'  as const,
    tools: ['Providers', 'Modules', 'State'] },
  { label: 'Ansible',    proficiency: 48, color: 'blue'  as const,
    tools: ['Playbooks', 'Inventory', 'Roles'] },
  { label: 'Monitoring', proficiency: 45, color: 'blue'  as const,
    tools: ['Prometheus', 'Grafana', 'Loki'] },
  { label: 'IoT / Edge', proficiency: 88, color: 'green' as const,
    tools: ['MQTT', 'Raspberry Pi', 'Edge Agents', 'Go'] },
  { label: 'Backend',    proficiency: 85, color: 'green' as const,
    tools: ['Go', 'Java Spring Boot', 'Python', 'Node.js'] },
  { label: 'Scripting',  proficiency: 80, color: 'green' as const,
    tools: ['Bash', 'Python', 'PowerShell'] },
  { label: 'MCP / AI',   proficiency: 72, color: 'green' as const,
    tools: ['Claude API', 'MCP Servers', 'Agent Design'] },
]

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

export const projects: Project[] = [
  // ── INFRASTRUCTURE ──────────────────────────────────────────
  {
    folder:      'batcavelab',
    title:       'batcavelab Homelab',
    description: 'Ubuntu Server 24.04 homelab running LXD with a 3-container mini-VPC — web, db, and router. Network segmentation, SSH ED25519 auth, systemd service management.',
    stack:       ['Ubuntu 24.04', 'LXD', 'Nginx', 'PostgreSQL', 'SSH'],
    githubUrl:   null,
    category:    'infrastructure',
    nodes: [
      { id: 'dev',    label: 'Dev Machine', x: 30,  y: 50, type: 'device' },
      { id: 'host',   label: 'LXD Host',    x: 110, y: 50, type: 'box'    },
      { id: 'web',    label: 'web:Nginx',   x: 210, y: 15, type: 'box'    },
      { id: 'db',     label: 'db:Postgres', x: 210, y: 50, type: 'box'    },
      { id: 'router', label: 'router',      x: 210, y: 85, type: 'box'    },
    ],
    edges: [
      { from: 'dev',  to: 'host'             },
      { from: 'host', to: 'web'              },
      { from: 'host', to: 'db'               },
      { from: 'host', to: 'router'           },
    ],
  },
  {
    folder:      'zoneforty5-cloud',
    title:       'ZoneForty5 Cloud Infra',
    description: 'AWS production environment — EC2, Docker Compose, CloudFront CDN, Route 53 DNS, ACM TLS. Automated deploy pipeline via GitHub Actions.',
    stack:       ['AWS EC2', 'Docker Compose', 'CloudFront', 'Route 53', 'GitHub Actions'],
    githubUrl:   null,
    category:    'infrastructure',
    nodes: [
      { id: 'gh',  label: 'GitHub',     x: 30,  y: 50, type: 'device' },
      { id: 'ci',  label: 'GH Actions', x: 110, y: 50, type: 'box'    },
      { id: 'ec2', label: 'EC2+Docker', x: 180, y: 50, type: 'box'    },
      { id: 'cf',  label: 'CloudFront', x: 260, y: 20, type: 'cloud'  },
      { id: 'r53', label: 'Route 53',   x: 260, y: 80, type: 'cloud'  },
    ],
    edges: [
      { from: 'gh',  to: 'ci',  label: 'push'   },
      { from: 'ci',  to: 'ec2', label: 'deploy' },
      { from: 'ec2', to: 'cf'                   },
      { from: 'ec2', to: 'r53'                  },
    ],
  },

  // ── SOFTWARE & IOT ───────────────────────────────────────────
  {
    folder:      'raspi-edge-monitoring',
    title:       'Raspberry Pi Edge Monitoring',
    description: '60+ node distributed edge infrastructure — Go agents on each Pi, MQTT broker, real-time telemetry aggregation, Grafana dashboards for fleet visibility.',
    stack:       ['Raspberry Pi', 'Go', 'MQTT', 'Mosquitto', 'Grafana'],
    githubUrl:   null,
    category:    'software-iot',
    nodes: [
      { id: 'fleet',  label: '60x RPi',     x: 30,  y: 50, type: 'device' },
      { id: 'broker', label: 'MQTT Broker',  x: 120, y: 50, type: 'box'    },
      { id: 'agg',    label: 'Aggregator',   x: 200, y: 50, type: 'box'    },
      { id: 'dash',   label: 'Grafana',      x: 270, y: 50, type: 'cloud'  },
    ],
    edges: [
      { from: 'fleet',  to: 'broker', label: 'MQTT' },
      { from: 'broker', to: 'agg'                   },
      { from: 'agg',    to: 'dash',   label: 'HTTP' },
    ],
  },
  {
    folder:      'hermes-agent',
    title:       'Hermes Agent Architecture',
    description: 'Telegram-controlled multi-LLM agent system with Claude Opus/Sonnet/Haiku role layers. Custom MCP servers bridge agents to physical hardware and external APIs.',
    stack:       ['Claude API', 'MCP', 'Go', 'Telegram Bot API', 'Python'],
    githubUrl:   null,
    category:    'software-iot',
    nodes: [
      { id: 'tg',     label: 'Telegram',    x: 30,  y: 50, type: 'device' },
      { id: 'hermes', label: 'Hermes',       x: 115, y: 50, type: 'box'    },
      { id: 'claude', label: 'Claude API',   x: 210, y: 20, type: 'cloud'  },
      { id: 'mcp',    label: 'MCP Servers',  x: 210, y: 80, type: 'box'    },
      { id: 'hw',     label: 'Hardware',     x: 270, y: 80, type: 'device' },
    ],
    edges: [
      { from: 'tg',     to: 'hermes'         },
      { from: 'hermes', to: 'claude'         },
      { from: 'hermes', to: 'mcp'            },
      { from: 'mcp',    to: 'hw'             },
    ],
  },
  {
    folder:      'gym-platform',
    title:       'Gym Management Platform',
    description: '13-service polyglot distributed system — Java Spring Boot core services, Go microservices for real-time operations, PostgreSQL, Redis, and RabbitMQ.',
    stack:       ['Java', 'Spring Boot', 'Go', 'PostgreSQL', 'Redis', 'RabbitMQ'],
    githubUrl:   null,
    category:    'software-iot',
    nodes: [
      { id: 'client', label: 'Client',       x: 30,  y: 50, type: 'device' },
      { id: 'gw',     label: 'API Gateway',  x: 110, y: 50, type: 'box'    },
      { id: 'java',   label: 'Java (8 svc)', x: 195, y: 20, type: 'box'    },
      { id: 'go',     label: 'Go (5 svc)',   x: 195, y: 80, type: 'box'    },
      { id: 'db',     label: 'PG+RMQ',       x: 265, y: 50, type: 'box'    },
    ],
    edges: [
      { from: 'client', to: 'gw'   },
      { from: 'gw',     to: 'java' },
      { from: 'gw',     to: 'go'   },
      { from: 'java',   to: 'db'   },
      { from: 'go',     to: 'db'   },
    ],
  },
  {
    folder:      'devj-hikconnect',
    title:       'devj-hikconnect SDK',
    description: 'Commercial Java SDK for Hikvision ISAPI — biometric access control integration, ISAPI arming, offline event backfill via AcsEvent polling. Published on Maven Central.',
    stack:       ['Java', 'Hikvision ISAPI', 'Maven', 'REST'],
    githubUrl:   null,
    category:    'software-iot',
    nodes: [
      { id: 'app',   label: 'Java App',  x: 30,  y: 50, type: 'device' },
      { id: 'sdk',   label: 'SDK Layer', x: 120, y: 50, type: 'box'    },
      { id: 'isapi', label: 'ISAPI',     x: 210, y: 50, type: 'box'    },
      { id: 'dev',   label: 'HikDevice', x: 270, y: 50, type: 'device' },
    ],
    edges: [
      { from: 'app',   to: 'sdk',   label: 'Maven' },
      { from: 'sdk',   to: 'isapi', label: 'HTTP'  },
      { from: 'isapi', to: 'dev'                   },
    ],
  },

  // ── COMING SOON ──────────────────────────────────────────────
  {
    folder: 'ci-cd-pipeline', title: 'CI/CD Pipeline',
    description: 'GitHub Actions build, test, and deploy pipeline with Docker.',
    stack: ['GitHub Actions', 'Docker'], githubUrl: null,
    category: 'coming-soon', nodes: [], edges: [],
  },
  {
    folder: 'terraform-aws-infra', title: 'Terraform AWS Infra',
    description: 'VPC, EC2, S3 provisioned entirely as Infrastructure as Code.',
    stack: ['Terraform', 'AWS'], githubUrl: null,
    category: 'coming-soon', nodes: [], edges: [],
  },
  {
    folder: 'kubernetes-cluster', title: 'Kubernetes Cluster',
    description: 'K8s deployment with Helm charts and Ingress controller.',
    stack: ['Kubernetes', 'Helm'], githubUrl: null,
    category: 'coming-soon', nodes: [], edges: [],
  },
  {
    folder: 'monitoring-stack', title: 'Monitoring Stack',
    description: 'Prometheus + Grafana dashboards, alerting, Loki log aggregation.',
    stack: ['Prometheus', 'Grafana', 'Loki'], githubUrl: null,
    category: 'coming-soon', nodes: [], edges: [],
  },
]

// ── Timeline ─────────────────────────────────────────────────────────────────

export const timeline = [
  { id: 'ccna',       label: 'Cisco CCNA',
    org: 'University of Moratuwa — NetAcad',
    date: 'Jun 2026',  status: 'active' as const,
    note: 'Networking fundamentals — TCP/IP, routing, switching, VLANs' },
  { id: 'rhcsa',      label: 'Red Hat RHCSA',
    org: 'Red Hat', date: 'Q4 2026', status: 'queued' as const,
    note: 'Linux system administration at enterprise level' },
  { id: 'aws-saa',    label: 'AWS Solutions Architect Associate',
    org: 'Amazon Web Services', date: 'Q1 2027', status: 'queued' as const,
    note: 'Cloud architecture, services, and best practices' },
  { id: 'terraform',  label: 'HashiCorp Terraform Associate',
    org: 'HashiCorp', date: 'Q1 2027', status: 'queued' as const,
    note: 'Infrastructure as Code at scale' },
  { id: 'cka',        label: 'Certified Kubernetes Administrator',
    org: 'CNCF', date: 'Q2 2027', status: 'queued' as const,
    note: 'Production Kubernetes operations and administration' },
  { id: 'aws-devops', label: 'AWS DevOps Professional',
    org: 'Amazon Web Services', date: 'Q3 2027', status: 'queued' as const,
    note: 'DevOps practices on AWS at professional level' },
]

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
