import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { bootLines } from '../data/content'

interface Props {
  onComplete: () => void
}

function TypedLine({
  text,
  type,
  autoStart,
}: {
  text: string
  type: string
  autoStart: boolean
}) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!autoStart) return
    if (type === 'blank') return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, 18)
    return () => clearInterval(interval)
  }, [autoStart, text, type])

  if (type === 'blank') return <div className="h-3" />

  const content = autoStart ? displayed : ''

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.08 }}
      className="leading-relaxed text-sm md:text-base"
    >
      {type === 'header' && (
        <span className="text-terminal-accent font-bold">{content}</span>
      )}
      {type === 'info' && (
        <span className="text-terminal-muted">{content}</span>
      )}
      {type === 'ok' && (
        <span className="text-terminal-text">
          <span className="text-terminal-accent">[  OK  ]</span>{' '}
          {content.replace('[  OK  ] ', '')}
        </span>
      )}
      {type === 'progress' && (
        <span className="text-terminal-text">{content}</span>
      )}
    </motion.div>
  )
}

export default function BootSequence({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const totalLines = bootLines.length
    let lineIndex = 0

    const lineInterval = setInterval(() => {
      lineIndex += 1
      setVisibleLines(lineIndex)
      if (lineIndex >= totalLines) {
        clearInterval(lineInterval)
        let p = 0
        const progInterval = setInterval(() => {
          p += 4
          setProgress(Math.min(p, 100))
          if (p >= 100) {
            clearInterval(progInterval)
            setTimeout(() => {
              setDone(true)
              setTimeout(onComplete, 600)
            }, 400)
          }
        }, 25)
      }
    }, 200)

    return () => clearInterval(lineInterval)
  }, [onComplete])

  const progressBar = '█'.repeat(Math.floor(progress / 8.33)).padEnd(12, '░')

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 bg-terminal-bg flex flex-col justify-center px-6 md:px-16 overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl w-full">
            {bootLines.slice(0, visibleLines).map((line, i) =>
              line.type === 'progress' ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.08 }}
                  className="leading-relaxed text-sm md:text-base"
                >
                  <span className="text-terminal-text">
                    {line.text}{' '}
                    <span className="text-terminal-accent">
                      {progressBar} {progress}%
                    </span>
                  </span>
                </motion.div>
              ) : (
                <TypedLine
                  key={i}
                  text={line.text}
                  type={line.type}
                  autoStart={i < visibleLines}
                />
              )
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
