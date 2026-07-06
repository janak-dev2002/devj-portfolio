import { motion } from 'framer-motion'
import { personal } from '../data/content'

const tools = [
  { name: 'Linux',          symbol: '$_'  },
  { name: 'Docker',         symbol: '🐳'  },
  { name: 'Kubernetes',     symbol: '☸'   },
  { name: 'Terraform',      symbol: '⬡'   },
  { name: 'Ansible',        symbol: '⚙'   },
  { name: 'AWS',            symbol: '☁'   },
  { name: 'GitHub Actions', symbol: '▶'   },
  { name: 'Prometheus',     symbol: '◉'   },
  { name: 'Grafana',        symbol: '▦'   },
  { name: 'Bash',           symbol: '#!'  },
  { name: 'Python',         symbol: '🐍'  },
  { name: 'Git',            symbol: '⌥'   },
  { name: 'MQTT',           symbol: '⇆'   },
  { name: 'Nginx',          symbol: '▷'   },
]

const doubled = [...tools, ...tools]

export default function TechStack() {
  return (
    <section className="border-t border-terminal-border py-10 overflow-hidden">
      <motion.p
        className="text-terminal-accent text-sm px-4 md:px-8 lg:px-16 mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {personal.handle}@{personal.host}:~$ ls /usr/local/bin/
      </motion.p>

      {/* scrolling strip */}
      <div className="relative">
        <div className="flex marquee-track gap-8 w-max">
          {doubled.map((tool, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 flex-shrink-0
                         min-w-[72px] text-center group"
            >
              <div className="w-12 h-12 border border-terminal-border
                              flex items-center justify-center text-lg
                              group-hover:border-terminal-accent
                              group-hover:text-terminal-accent
                              text-terminal-muted transition-colors duration-200">
                {tool.symbol}
              </div>
              <span className="text-terminal-muted text-[10px] group-hover:text-terminal-accent
                               transition-colors duration-200">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
