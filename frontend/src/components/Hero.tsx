import { motion } from 'framer-motion'
import { personal, stats } from '../data/content'

const roleTags = ['Cloud Infrastructure', 'IoT Systems', 'Automation']

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Hero() {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="min-h-screen grid-bg flex items-center
                                   px-4 md:px-8 lg:px-16 py-24">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-14 items-center">

          {/* LEFT */}
          <motion.div
            className="flex-1 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status bar */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs md:text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-green pulse-dot inline-block" />
                <span className="text-accent-green">ONLINE</span>
              </span>
              <span className="text-ink-dim">|</span>
              <span className="text-ink-muted">{personal.timezone}</span>
              <span className="text-ink-dim">|</span>
              <span className="text-accent-green">AVAILABLE FOR HIRE</span>
              <span className="text-ink-dim">|</span>
              <span className="text-ink-muted">Response &lt; 24h</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold
                         text-ink-primary leading-tight"
            >
              {personal.name.split(' ')[0]}{' '}
              <span className="block">{personal.name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-xl md:text-2xl text-accent-green font-semibold"
            >
              {personal.title}
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="font-mono text-sm text-ink-muted"
            >
              {personal.tagline}
            </motion.p>

            {/* Role tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {roleTags.map(tag => (
                <span
                  key={tag}
                  className="border border-navy-border text-ink-muted font-sans
                             text-xs px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <a href={personal.cvPath} download className="btn-primary text-center">
                [ ./download-cv.sh ]
              </a>
              <button onClick={scrollToContact} className="btn-secondary">
                [ ./contact.sh ]
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4
                         border-t border-navy-border"
            >
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-sans text-2xl font-bold text-accent-green">
                    {s.value}
                  </p>
                  <p className="font-sans text-xs text-ink-muted mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — photo */}
          <motion.div
            className="flex-shrink-0 hidden md:block"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="relative w-56 h-72 md:w-72 md:h-96">
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8
                              border-l-[3px] border-t-[3px] border-accent-green" />
              <div className="absolute -top-2 -right-2 w-8 h-8
                              border-r-[3px] border-t-[3px] border-accent-green" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8
                              border-l-[3px] border-b-[3px] border-accent-green" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8
                              border-r-[3px] border-b-[3px] border-accent-green" />

              {/* Photo */}
              <div
                className="border border-accent-green/30 w-full h-full
                           overflow-hidden relative"
                style={{ boxShadow: '0 0 24px rgba(0,255,136,0.10)' }}
              >
                <img
                  src="/avatar.jpg"
                  alt="Janaka Sangeeth"
                  className="w-56 h-72 md:w-72 md:h-96 object-cover block"
                />
                {/* Scan line */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div
                    className="scan-line absolute left-0 right-0 w-full h-1 opacity-40"
                    style={{ background: 'linear-gradient(90deg, transparent, #00FF88, transparent)' }}
                  />
                </div>
              </div>

              <p className="font-mono text-ink-muted text-sm mt-3 text-center">
                {personal.handle}.jpg
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
