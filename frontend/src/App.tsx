import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BootSequence   from './components/BootSequence'
import Nav            from './components/Nav'
import Hero           from './components/Hero'
import About          from './components/About'
import Skills         from './components/Skills'
import TechStrip      from './components/TechStrip'
import Projects       from './components/Projects'
import Timeline       from './components/Timeline'
import Contact        from './components/Contact'
import CommandPalette from './components/CommandPalette'

const SESSION_KEY = 'devj_boot_seen'

export default function App() {
  const [showBoot,   setShowBoot]   = useState(() => !sessionStorage.getItem(SESSION_KEY))
  const [portfolioVisible, setPortfolioVisible] = useState(
    () => !!sessionStorage.getItem(SESSION_KEY),
  )
  const [cmdOpen, setCmdOpen] = useState(false)

  useEffect(() => {
    if (!showBoot) setPortfolioVisible(true)
  }, [showBoot])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(prev => !prev)
      }
      if (e.key === 'Escape') setCmdOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleBootComplete = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setShowBoot(false)
    setTimeout(() => setPortfolioVisible(true), 100)
  }

  return (
    <div className="relative bg-navy-bg min-h-screen font-sans">
      {showBoot && <BootSequence onComplete={handleBootComplete} />}

      <AnimatePresence>
        {portfolioVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Nav onPaletteOpen={() => setCmdOpen(true)} />
            <main>
              <Hero />
              <About />
              <Skills />
              <TechStrip />
              <Projects />
              <Timeline />
              <Contact />
            </main>
            <footer className="border-t border-navy-border py-8 text-center">
              <p className="font-mono text-ink-muted text-xs">
                <span className="text-accent-green">{'{devj}'}</span>
                {' '}— Built with React + TypeScript + Tailwind + Framer Motion
              </p>
            </footer>
            <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
