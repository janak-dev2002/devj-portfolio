import { useEffect, useState } from 'react'
import { personal } from '../data/content'

const navItems = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Certs',    href: '#certs'    },
  { label: 'Contact',  href: '#contact'  },
]

interface Props { onPaletteOpen: () => void }

export default function Nav({ onPaletteOpen }: Props) {
  const [active,   setActive]   = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const ids = navItems.map(n => n.href.slice(1))
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-40 bg-navy-bg/95 backdrop-blur-sm border-b border-navy-border">
      <div className="flex items-center justify-between px-4 md:px-8 h-12">
        <span className="font-mono text-accent-green text-sm">
          {personal.handle}@{personal.host}
        </span>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`font-sans text-sm transition-colors ${
                active === item.href.slice(1)
                  ? 'text-accent-green'
                  : 'text-ink-muted hover:text-ink-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onPaletteOpen}
            className="font-mono text-sm text-ink-dim border border-navy-border
                       px-2 py-0.5 hover:border-accent-green hover:text-accent-green
                       transition-colors"
          >
            ⌘K
          </button>
        </div>

        <button
          className="md:hidden font-mono text-ink-muted hover:text-accent-green transition-colors text-sm"
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? '[x]' : '[≡]'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-navy-border bg-navy-bg">
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`block w-full text-left px-4 py-3 font-sans text-sm
                          transition-colors border-b border-navy-border/40 ${
                active === item.href.slice(1)
                  ? 'text-accent-green'
                  : 'text-ink-muted hover:text-ink-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
