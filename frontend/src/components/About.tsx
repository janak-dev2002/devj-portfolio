import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { about, personal, sysInfo } from '../data/content'

export default function About() {
  const [displayed, setDisplayed] = useState('')
  const [started,   setStarted]   = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(about.slice(0, i))
      if (i >= about.length) clearInterval(interval)
    }, 20)
    return () => clearInterval(interval)
  }, [started])

  return (
    <section id="about" className="px-4 md:px-8 lg:px-16 py-20 border-t border-navy-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-sans text-3xl font-bold text-ink-primary mb-2">About</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8" ref={wrapperRef}>
          {/* LEFT — typewriter bio */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-accent-green text-sm mb-4">
              {personal.handle}@{personal.host}:~$ cat about.txt
            </p>
            <div className="font-mono text-ink-primary text-sm leading-relaxed whitespace-pre-line min-h-[120px]">
              {displayed}
              {started && displayed.length < about.length && (
                <span className="cursor-blink">_</span>
              )}
            </div>
            <p className="font-mono text-ink-muted text-xs mt-4"># End of file</p>
          </motion.div>

          {/* RIGHT — sys info panel */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="panel p-5">
              <p className="font-mono text-accent-green text-xs mb-4">sys.info</p>
              <div className="space-y-2">
                {sysInfo.map(row => (
                  <div key={row.key} className="flex gap-3 font-mono text-sm">
                    <span className="text-ink-muted w-20 flex-shrink-0">{row.key}</span>
                    <span className={row.key === 'Status' ? 'text-accent-green' : 'text-ink-primary'}>
                      {row.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
