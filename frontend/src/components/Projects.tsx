import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal, type ProjectCategory } from '../data/content'
import { getProjects } from '../services/api'
import { useApiResource } from '../hooks/useApiResource'
import ApiErrorState from './ApiErrorState'
import ArchDiagram from './ArchDiagram'

type FilterValue = 'all' | ProjectCategory

const tabs: { label: string; value: FilterValue }[] = [
  { label: 'All',            value: 'all'           },
  { label: 'Infrastructure', value: 'infrastructure' },
  { label: 'Software & IoT', value: 'software-iot'  },
  { label: 'Coming Soon',    value: 'coming-soon'   },
]

function CategoryBadge({ category }: { category: ProjectCategory }) {
  if (category === 'infrastructure') {
    return (
      <span className="font-mono text-[11px] border border-accent-blue/50
                       text-accent-blue px-1.5 py-0.5 flex-shrink-0">
        INFRA
      </span>
    )
  }
  if (category === 'software-iot') {
    return (
      <span className="font-mono text-[11px] border border-accent-green/50
                       text-accent-green px-1.5 py-0.5 flex-shrink-0">
        SW / IOT
      </span>
    )
  }
  return (
    <span className="font-mono text-[11px] border border-ink-dim
                     text-ink-muted px-1.5 py-0.5 flex-shrink-0">
      QUEUED
    </span>
  )
}

function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="panel flex flex-col">
          <div className="border-b border-navy-border bg-navy-deep h-[130px] hidden md:block" />
          <div className="p-4 flex-1 space-y-3">
            <div className="h-3 w-24 bg-white/5" />
            <div className="h-4 w-3/4 bg-white/5" />
            <div className="h-3 w-full bg-white/5" />
            <div className="h-3 w-2/3 bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')
  const { data: projects, status, errorMessage, retry } = useApiResource(getProjects)

  const filtered = activeFilter === 'all'
    ? (projects ?? [])
    : (projects ?? []).filter(p => p.category === activeFilter)

  const isComingSoon = (cat: ProjectCategory) => cat === 'coming-soon'

  return (
    <section id="projects" className="px-4 md:px-8 lg:px-16 py-20 border-t border-navy-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-sans text-3xl font-bold text-ink-primary mb-2">Projects</h2>
          <p className="font-mono text-ink-muted text-sm">
            {personal.handle}@{personal.host}:~/projects$ ls -la
          </p>
        </motion.div>

        {status === 'loading' && <ProjectsSkeleton />}

        {status === 'error' && <ApiErrorState message={errorMessage} onRetry={retry} />}

        {status === 'success' && (
          <>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map(tab => (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`font-mono text-xs px-3 py-1.5 border transition-colors ${
                    activeFilter === tab.value
                      ? 'border-accent-green text-accent-green bg-accent-green/5'
                      : 'border-navy-border text-ink-muted hover:border-accent-green/50 hover:text-ink-primary'
                  }`}
                >
                  [ {tab.label} ]
                </button>
              ))}
            </div>

            {/* Grid with AnimatePresence */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map(project => (
                  <motion.div
                    key={project.folder}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.25 }}
                    className={`panel flex flex-col ${
                      isComingSoon(project.category) ? 'opacity-40' : ''
                    }`}
                  >
                    {/* Arch diagram header */}
                    <div className="border-b border-navy-border bg-navy-deep p-3 hidden md:block">
                      {project.nodes.length === 0 ? (
                        <div className="h-[130px] flex items-center justify-center">
                          <span className="font-mono text-ink-muted text-sm">
                            INITIALIZING<span className="cursor-blink">_</span>
                          </span>
                        </div>
                      ) : (
                        <ArchDiagram
                          nodes={project.nodes}
                          edges={project.edges}
                          width={300}
                          height={130}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-mono text-accent-green text-sm">
                          {project.folder}/
                        </p>
                        <CategoryBadge category={project.category} />
                      </div>
                      <h3 className="font-sans font-semibold text-ink-primary text-base mb-2">
                        {project.title}
                      </h3>
                      <p className="font-sans text-ink-muted text-sm leading-relaxed line-clamp-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="px-4 pb-4 pt-3 border-t border-navy-border
                                    flex items-center justify-between flex-wrap gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map(item => (
                          <span
                            key={item}
                            className="font-mono text-[11px] text-ink-muted border
                                       border-navy-border px-2 py-1
                                       hover:border-accent-green transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-accent-green text-sm hover:underline flex-shrink-0"
                        >
                          [ ./open.sh ]
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
