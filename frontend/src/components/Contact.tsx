import { useState } from 'react'
import { motion } from 'framer-motion'
import { personal } from '../data/content'

type FormState = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full bg-navy-surface border border-navy-border font-mono text-ink-primary ' +
  'text-sm px-3 py-2 outline-none transition-colors placeholder:text-ink-dim ' +
  'focus:border-accent-green focus:shadow-[0_0_0_1px_rgba(0,255,136,0.2)]'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState<FormState>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (res.ok) {
        setState('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <section id="contact" className="px-4 md:px-8 lg:px-16 py-20 border-t border-navy-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* LEFT — info panel (60%) */}
          <motion.div
            className="lg:col-span-3 panel p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-sans text-lg font-bold text-ink-primary mb-1">
              Get in Touch
            </h2>
            <p className="font-mono text-accent-green text-xs mb-6">
              $ ./contact.sh
            </p>

            <div className="space-y-3 font-mono text-sm mb-6">
              <div className="flex gap-4 items-start">
                <span className="text-ink-muted w-16 flex-shrink-0">Email</span>
                <span className="text-ink-dim">→</span>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-accent-green hover:underline break-all"
                >
                  {personal.email}
                </a>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-ink-muted w-16 flex-shrink-0">GitHub</span>
                <span className="text-ink-dim">→</span>
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-green hover:underline"
                >
                  github.com/{personal.github}
                </a>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-ink-muted w-16 flex-shrink-0">LinkedIn</span>
                <span className="text-ink-dim">→</span>
                <span className="text-ink-muted">[coming soon]</span>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-ink-muted w-16 flex-shrink-0">TZ</span>
                <span className="text-ink-dim">→</span>
                <span className="text-ink-primary">{personal.timezone} / {personal.location}</span>
              </div>
            </div>

            <p className="font-sans text-ink-muted text-sm leading-relaxed">
              Available for DevOps roles and infrastructure contracts.
            </p>
          </motion.div>

          {/* RIGHT — form (40%) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-xs text-ink-muted
                                  uppercase tracking-widest mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-sans text-xs text-ink-muted
                                  uppercase tracking-widest mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block font-sans text-xs text-ink-muted
                                  uppercase tracking-widest mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={state === 'sending'}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state === 'sending' ? '[ sending... ]' : '[ ./send.sh ]'}
              </button>
            </form>

            {state === 'success' && (
              <p className="mt-4 font-mono text-accent-green text-sm">
                [  OK  ] Message sent.
              </p>
            )}
            {state === 'error' && (
              <p className="mt-4 font-mono text-red-400 text-sm">
                [ FAIL ] Send failed. Email directly:{' '}
                <a href={`mailto:${personal.email}`} className="underline">
                  {personal.email}
                </a>
              </p>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
