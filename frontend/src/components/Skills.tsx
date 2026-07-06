import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  siLinux,
  siDocker,
  siGithubactions,
  siCisco,
  siTerraform,
  siAnsible,
  siGrafana,
  siRaspberrypi,
  siGo,
  siGnubash,
  siAnthropic,
} from 'simple-icons'
import { hexSkills, personal } from '../data/content'

type HexColor = 'green' | 'blue'
type SIIcon = typeof siLinux

const ICONS: Record<string, SIIcon | null> = {
  'Linux':      siLinux,
  'Containers': siDocker,
  'CI/CD':      siGithubactions,
  'AWS Cloud':  null,
  'Networking': siCisco,
  'Terraform':  siTerraform,
  'Ansible':    siAnsible,
  'Monitoring': siGrafana,
  'IoT / Edge': siRaspberrypi,
  'Backend':    siGo,
  'Scripting':  siGnubash,
  'MCP / AI':   siAnthropic,
}

const ACCENT: Record<HexColor, string> = {
  green: '#00FF88',
  blue:  '#00B4D8',
}

const HEX_W = 132
const HEX_H = 114
const ROW_SIZE = 4
const GAP_X = 18
const GAP_Y = 30

const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const RING_SIZE = 44
const RING_R = 17.5
const RING_C = 2 * Math.PI * RING_R

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
}
const hexVariants = {
  hidden:  { opacity: 0, y: 18, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

interface RingProps {
  proficiency: number
  color:       string
  icon:        SIIcon | null
  label:       string
}

function ProficiencyRing({ proficiency, color, icon, label }: RingProps) {
  const offset = RING_C * (1 - proficiency / 100)
  return (
    <div className="relative flex-shrink-0" style={{ width: RING_SIZE, height: RING_SIZE }}>
      <svg width={RING_SIZE} height={RING_SIZE} viewBox="0 0 44 44" className="-rotate-90">
        <circle cx={22} cy={22} r={RING_R} fill="none" stroke="rgba(148,163,184,0.16)" strokeWidth={2.5} />
        <motion.circle
          cx={22} cy={22} r={RING_R} fill="none"
          stroke={color} strokeWidth={2.5} strokeLinecap="round"
          strokeDasharray={RING_C}
          initial={{ strokeDashoffset: RING_C }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {icon ? (
          <svg viewBox="0 0 24 24" width={18} height={18} fill={color}>
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="font-mono text-[8px] font-bold tracking-tight" style={{ color }}>
            {label.slice(0, 3).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  )
}

const TOOLTIP_W = 172

interface HexTooltipProps {
  skill:  typeof hexSkills[0]
  accent: string
  rect:   DOMRect
}

// Rendered via a portal to document.body: every hex has its own stacking
// context (framer-motion applies `transform`/`filter` inline), so a tooltip
// positioned *inside* a hex can never paint above a sibling hex that comes
// later in the DOM — no z-index escapes a stacking context it's trapped in.
// Portaling to <body> and positioning from the hex's live bounding box (with
// horizontal clamping) sidesteps that entirely and always sits on top.
function HexTooltip({ skill, accent, rect }: HexTooltipProps) {
  const left = Math.max(8, Math.min(
    rect.left + rect.width / 2 - TOOLTIP_W / 2,
    window.innerWidth - TOOLTIP_W - 8,
  ))
  const top = rect.bottom + 12

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      style={{ position: 'fixed', left, top, width: TOOLTIP_W }}
      className="z-[999] border border-navy-border bg-navy-surface/95 backdrop-blur-sm
                 px-3 py-2.5 pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
    >
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-navy-border">
        <span className="font-mono text-[11px] font-bold text-ink-primary">{skill.label}</span>
        <span className="font-mono text-[11px] font-bold" style={{ color: accent }}>
          {skill.proficiency}%
        </span>
      </div>
      <ul className="flex flex-wrap gap-1">
        {skill.tools.map(tool => (
          <li
            key={tool}
            className="font-mono text-[10px] text-ink-muted bg-white/[0.04] border border-navy-border px-1.5 py-0.5"
          >
            {tool}
          </li>
        ))}
      </ul>
    </motion.div>,
    document.body,
  )
}

interface HexCellProps {
  skill:   typeof hexSkills[0]
  hovered: string | null
  onHover: (label: string | null) => void
}

function HexCell({ skill, hovered, onHover }: HexCellProps) {
  const ref       = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const isHovered = hovered === skill.label
  const color     = skill.color as HexColor
  const accent    = ACCENT[color]
  const icon      = ICONS[skill.label] ?? null

  const handleEnter = () => {
    if (ref.current) setRect(ref.current.getBoundingClientRect())
    onHover(skill.label)
  }
  const handleLeave = () => onHover(null)

  return (
    <motion.div
      ref={ref}
      variants={hexVariants}
      whileHover={{ y: -6, scale: 1.05 }}
      whileFocus={{ y: -6, scale: 1.05 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="relative flex-shrink-0 cursor-default outline-none"
      style={{
        width:  HEX_W,
        height: HEX_H,
        filter: isHovered
          ? `drop-shadow(0 14px 22px rgba(0,0,0,0.5)) drop-shadow(0 0 16px ${accent}4D)`
          : 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))',
        transition: 'filter 0.25s ease',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      tabIndex={0}
      aria-label={`${skill.label} — ${skill.proficiency}% proficiency`}
    >
      {/* Border layer */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: HEX_CLIP,
          background: isHovered ? accent : 'rgba(148,163,184,0.20)',
          transition: 'background 0.25s',
        }}
      />
      {/* Fill layer */}
      <div
        className="absolute flex flex-col items-center justify-center gap-1"
        style={{
          inset:      '1.5px',
          clipPath:   HEX_CLIP,
          background: `linear-gradient(155deg, ${accent}17, #0A1628 68%)`,
        }}
      >
        <ProficiencyRing proficiency={skill.proficiency} color={accent} icon={icon} label={skill.label} />
        <span className="font-sans text-[10.5px] font-semibold text-ink-primary text-center leading-tight px-4">
          {skill.label}
        </span>
        <span className="font-mono text-[9px] font-medium" style={{ color: accent }}>
          {skill.proficiency}%
        </span>
      </div>

      <AnimatePresence>
        {isHovered && rect && (
          <HexTooltip key="tooltip" skill={skill} accent={accent} rect={rect} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Skills() {
  const [hovered, setHovered] = useState<string | null>(null)
  const rows = chunk(hexSkills, ROW_SIZE)

  return (
    <section id="skills" className="px-4 md:px-8 lg:px-16 py-20 border-t border-navy-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-sans text-3xl font-bold text-ink-primary mb-2">Capabilities</h2>
          <p className="font-mono text-ink-muted text-sm">
            {personal.handle}@{personal.host}:~$ cat capabilities.yaml
          </p>
        </motion.div>

        {/* Desktop honeycomb */}
        <div className="hidden md:block relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at center, rgba(0,255,136,0.06), transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
          <motion.div
            className="relative flex flex-col items-center overflow-visible"
            style={{ gap: GAP_Y, paddingBottom: 8 }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {rows.map((row, rowIndex) => {
              const rowOffset = rowIndex % 2 === 1 ? (HEX_W + GAP_X) / 2 : 0
              return (
                <div
                  key={rowIndex}
                  className="flex"
                  style={{ gap: GAP_X, transform: `translateX(${rowOffset}px)` }}
                >
                  {row.map(skill => (
                    <HexCell
                      key={skill.label}
                      skill={skill}
                      hovered={hovered}
                      onHover={setHovered}
                    />
                  ))}
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Mobile grid fallback */}
        <motion.div
          className="md:hidden grid grid-cols-3 gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {hexSkills.map(skill => {
            const color  = skill.color as HexColor
            const accent = ACCENT[color]
            const icon   = ICONS[skill.label] ?? null
            return (
              <motion.div
                key={skill.label}
                variants={hexVariants}
                className="panel flex flex-col items-center gap-1.5 p-3 text-center"
              >
                <ProficiencyRing proficiency={skill.proficiency} color={accent} icon={icon} label={skill.label} />
                <p className="font-sans text-[10.5px] font-semibold text-ink-primary leading-tight">
                  {skill.label}
                </p>
                <p className="font-mono text-[9px] font-medium" style={{ color: accent }}>
                  {skill.proficiency}%
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap gap-6 mt-12 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            { color: ACCENT.green, label: 'Active'   },
            { color: ACCENT.blue,  label: 'Learning' },
          ].map(item => (
            <span key={item.label} className="flex items-center gap-2 font-mono text-xs text-ink-muted">
              <span
                className="w-2.5 h-2.5 inline-block border"
                style={{ background: `${item.color}1A`, borderColor: `${item.color}59` }}
              />
              {item.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
