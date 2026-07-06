import { motion } from 'framer-motion'
import { timeline, personal } from '../data/content'

export default function Timeline() {
  const activeCount = timeline.filter(t => t.status === 'active').length

  return (
    <section id="certs" className="px-4 md:px-8 lg:px-16 py-20 border-t border-navy-border">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-sans text-3xl font-bold text-ink-primary mb-2">
            Roadmap
          </h2>
          <p className="font-mono text-ink-muted text-sm">
            {personal.handle}@{personal.host}:~$ systemctl list-units --type=cert
          </p>
        </motion.div>

        <div className="relative">
          {/* Static background line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-navy-border" />

          {/* Animated green fill */}
          <motion.div
            className="absolute left-5 top-0 w-px bg-accent-green"
            initial={{ height: '0%' }}
            whileInView={{ height: `${(activeCount / timeline.length) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.id}
                className="relative flex gap-6 items-start"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                {/* Node dot */}
                <div className="flex-shrink-0 w-10 flex justify-center pt-3.5 relative z-10">
                  {item.status === 'active' ? (
                    <div
                      className="w-2.5 h-2.5 rounded-full bg-accent-green"
                      style={{ boxShadow: '0 0 8px rgba(0,255,136,0.6)' }}
                    />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full border border-accent-green/30 bg-navy-bg" />
                  )}
                </div>

                {/* Content card */}
                <div className="flex-1 panel p-4 hover:-translate-y-0.5 transition-transform">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-sans font-semibold text-ink-primary text-base">
                      {item.label}
                    </h3>
                    {item.status === 'active' ? (
                      <span className="font-mono text-[11px] border border-accent-green
                                       text-accent-green px-1.5 py-0.5 flex-shrink-0">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] border border-ink-dim
                                       text-ink-muted px-1.5 py-0.5 flex-shrink-0">
                        QUEUED
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-ink-muted text-sm">
                    {item.org} · {item.date}
                  </p>
                  {item.note && (
                    <p className="font-sans text-ink-muted text-sm mt-1.5">
                      {item.note}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
