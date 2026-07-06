import { motion } from 'framer-motion'
import {
  siLinux,
  siDocker,
  siKubernetes,
  siTerraform,
  siAnsible,
  siGithubactions,
  siPrometheus,
  siGrafana,
  siGo,
  siOpenjdk,
  siPython,
  siGnubash,
  siNginx,
  siGit,
} from 'simple-icons'
import { personal } from '../data/content'

type Tool = { icon: typeof siLinux | null; name: string }

const tools: Tool[] = [
  { icon: siLinux,        name: 'Linux'          },
  { icon: siDocker,       name: 'Docker'         },
  { icon: siKubernetes,   name: 'Kubernetes'     },
  { icon: siTerraform,    name: 'Terraform'      },
  { icon: siAnsible,      name: 'Ansible'        },
  { icon: null,           name: 'AWS'            },
  { icon: siGithubactions,name: 'GitHub Actions' },
  { icon: siPrometheus,   name: 'Prometheus'     },
  { icon: siGrafana,      name: 'Grafana'        },
  { icon: siGo,           name: 'Go'             },
  { icon: siOpenjdk,      name: 'Java'           },
  { icon: siPython,       name: 'Python'         },
  { icon: siGnubash,      name: 'Bash'           },
  { icon: siNginx,        name: 'Nginx'          },
  { icon: siGit,          name: 'Git'            },
  { icon: null,           name: 'MQTT'           },
]

const doubled = [...tools, ...tools]

export default function TechStrip() {
  return (
    <section className="border-t border-navy-border py-8">
      <div className="px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.p
            className="font-mono text-xs text-accent-green mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {personal.handle}@{personal.host}:~$ ls tools/
          </motion.p>

          <div className="overflow-hidden">
            <div className="flex marquee-run gap-12 w-max">
              {doubled.map((tool, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 flex-shrink-0
                             min-w-[80px] text-center group cursor-default"
                >
                  {tool.icon ? (
                    <svg
                      viewBox="0 0 24 24"
                      width={28}
                      height={28}
                      fill="currentColor"
                      className="text-ink-muted group-hover:text-accent-green transition-colors duration-200"
                    >
                      <path d={tool.icon.path} />
                    </svg>
                  ) : (
                    <div
                      className="w-7 h-7 border border-navy-border flex items-center
                                  justify-center font-mono text-[8px] text-ink-muted
                                  group-hover:border-accent-green group-hover:text-accent-green
                                  transition-colors duration-200"
                    >
                      {tool.name}
                    </div>
                  )}
                  <span className="font-mono text-xs text-ink-muted
                                   group-hover:text-accent-green transition-colors duration-200">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
