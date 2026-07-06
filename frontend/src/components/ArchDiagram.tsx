import { useId } from 'react'
import type { ArchNode, ArchEdge } from '../data/content'

interface Props {
  nodes:  ArchNode[]
  edges:  ArchEdge[]
  width:  number
  height: number
}

const NODE_W = 64
const NODE_H = 26

export default function ArchDiagram({ nodes, edges, width, height }: Props) {
  const uid      = useId().replace(/:/g, '')
  const markerId = `arr${uid}`

  if (nodes.length === 0) return null

  const center = (id: string) => {
    const n = nodes.find(nd => nd.id === id)
    return n ? { x: n.x, y: n.y } : { x: 0, y: 0 }
  }

  return (
    <svg
      viewBox="0 0 300 130"
      width={width}
      height={height}
      overflow="visible"
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#1A3A5C" />
        </marker>
      </defs>

      {edges.map((edge, i) => {
        const from = center(edge.from)
        const to   = center(edge.to)
        const dx   = to.x - from.x
        const dy   = to.y - from.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist === 0) return null

        const ux = dx / dist
        const uy = dy / dist

        const absDx = Math.abs(ux)
        const absDy = Math.abs(uy)
        const tH = absDx > 0 ? (NODE_W / 2) / absDx : Infinity
        const tV = absDy > 0 ? (NODE_H / 2) / absDy : Infinity
        const t  = Math.min(tH, tV)

        const x1 = from.x + ux * (t + 2)
        const y1 = from.y + uy * (t + 2)
        const x2 = to.x   - ux * (t + 2)
        const y2 = to.y   - uy * (t + 2)
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2

        return (
          <g key={i}>
            <line
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#1A3A5C"
              strokeWidth="1.5"
              markerEnd={`url(#${markerId})`}
            />
            {edge.label && (
              <text
                x={mx} y={my - 4}
                textAnchor="middle"
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
                fill="#64748B"
              >
                {edge.label}
              </text>
            )}
          </g>
        )
      })}

      {nodes.map(node => {
        const rx =
          node.type === 'cloud'  ? 10 :
          node.type === 'device' ? 0  : 2

        const stroke =
          node.type === 'box'    ? 'rgba(0,255,136,0.35)' :
          node.type === 'cloud'  ? 'rgba(0,180,216,0.45)' :
                                   'rgba(100,116,139,0.55)'

        return (
          <g key={node.id}>
            <rect
              x={node.x - NODE_W / 2} y={node.y - NODE_H / 2}
              width={NODE_W} height={NODE_H}
              rx={rx}
              fill="#0A1628"
              stroke={stroke}
              strokeWidth="1"
            />
            <text
              x={node.x} y={node.y + 3}
              textAnchor="middle"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              fill="#E2E8F0"
            >
              {node.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
