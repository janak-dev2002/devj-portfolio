import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: '~/about',          id: 'about'    },
  { label: '~/skills',         id: 'skills'   },
  { label: '~/projects',       id: 'projects' },
  { label: '~/roadmap',        id: 'certs'    },
  { label: '~/contact',        id: 'contact'  },
  { label: './download-cv.sh', id: 'cv',      action: () => window.open('/cv.pdf') },
] as const

type NavItem = typeof navItems[number]

interface Props {
  open:    boolean
  onClose: () => void
}

export default function CommandPalette({ open, onClose }: Props) {
  const [query,  setQuery]  = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = navItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const go = (item: NavItem) => {
    if ('action' in item && item.action) {
      item.action()
    } else {
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
    }
    onClose()
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(p => Math.min(p + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(p => Math.max(p - 1, 0))
    } else if (e.key === 'Enter' && filtered[active]) {
      go(filtered[active])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50
                       w-full max-w-lg border border-accent-green bg-navy-bg"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-navy-border">
              <span className="text-accent-green text-sm flex-shrink-0 font-mono">
                devj@zoneforty5:~$ goto
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setActive(0) }}
                onKeyDown={handleKey}
                className="flex-1 bg-transparent text-ink-primary text-sm
                           outline-none caret-accent-green font-mono"
                placeholder="_"
                spellCheck={false}
              />
            </div>

            <ul className="py-2 max-h-64 overflow-y-auto">
              {filtered.length === 0 && (
                <li className="px-4 py-2 text-ink-muted text-sm font-mono">
                  bash: command not found: {query}
                </li>
              )}
              {filtered.map((item, i) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full text-left px-4 py-2 text-base font-mono transition-colors ${
                      active === i
                        ? 'bg-navy-surface text-accent-green'
                        : 'text-ink-muted hover:text-ink-primary'
                    }`}
                  >
                    <span className="text-ink-dim mr-2">▶</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-navy-border px-4 py-2 flex gap-4
                            text-[11px] text-ink-muted font-mono">
              <span><span className="text-accent-green">↑↓</span> navigate</span>
              <span><span className="text-accent-green">↵</span> go</span>
              <span><span className="text-accent-green">Esc</span> close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
