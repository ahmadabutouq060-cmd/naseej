import { useState } from 'react'
import Nav from '../components/Nav'
import { Page } from '../App'
import { threadData, Waypoint } from '../data/threadData'

interface Props {
  navigate: (page: Page, threadId?: number, waypointId?: number) => void
  threadId: number | null
}

// ── Path geometry per waypoint count ─────────────────────────────────────────
const nodePaths: Record<number, [number, number][]> = {
  3: [[100,130],[320,130],[540,130]],
  4: [[80,130],[227,80],[373,180],[520,130]],
  5: [[60,80],[175,80],[290,150],[405,80],[560,80]],
  6: [[40,80],[150,130],[260,180],[370,180],[480,130],[590,80]],
}
const svgPaths: Record<number, { full: string; done: (n: number) => string }> = {
  3: { full: 'M100 130 L320 130 L540 130', done: (n) => n===0?'':n===1?'M100 130 L320 130':n===2?'M100 130 L320 130 L540 130':'' },
  4: { full: 'M80 130 Q154 80 227 80 Q300 80 373 180 Q446 180 520 130', done: (n) => n===0?'':n===1?'M80 130 Q154 80 227 80':n===2?'M80 130 Q154 80 227 80 Q300 80 373 180':'M80 130 Q154 80 227 80 Q300 80 373 180 Q446 180 520 130' },
  5: { full: 'M60 80 Q117 80 175 80 Q233 115 290 150 Q348 115 405 80 Q483 80 560 80', done: (n) => n<=0?'':n===1?'M60 80 Q117 80 175 80':n===2?'M60 80 Q117 80 175 80 Q233 115 290 150':'M60 80 Q117 80 175 80 Q233 115 290 150 Q348 115 405 80' },
  6: { full: 'M40 80 Q95 105 150 130 Q205 155 260 180 Q315 180 370 180 Q425 155 480 130 Q535 105 590 80', done: (n) => n<=0?'':n===1?'M40 80 Q95 105 150 130':n===2?'M40 80 Q95 105 150 130 Q205 155 260 180':n===3?'M40 80 Q95 105 150 130 Q205 155 260 180 Q315 180 370 180':'M40 80 Q95 105 150 130 Q205 155 260 180 Q315 180 370 180 Q425 155 480 130' },
}

export default function ActiveThread({ navigate, threadId }: Props) {
  const thread = (threadId !== null ? threadData[threadId] : null) ?? threadData[7]
  const wps = thread.waypoints
  const completedCount = wps.filter(w => w.status === 'completed').length
  const activeWp = wps.find(w => w.status === 'active') ?? wps[0]
  const [activeNode, setActiveNode] = useState(activeWp.id)

  const selected = wps.find(w => w.id === activeNode) ?? activeWp
  const n = wps.length as 3|4|5|6
  const positions = nodePaths[n] ?? nodePaths[5]
  const pathSet   = svgPaths[n]  ?? svgPaths[5]

  const getStyle = (wp: Waypoint) => {
    if (wp.status === 'completed') return { bg: '#6B8E23', border: '#4A6318' }
    if (wp.status === 'active')    return { bg: '#F9F7F3', border: '#D98A6C' }
    return { bg: '#E8E0D0', border: '#C9BDA8' }
  }

  return (
    <div>
      <Nav navigate={navigate} currentPage="thread" />

      {/* Header */}
      <div className="pt-20 px-10" style={{ borderBottom: '1px solid #E8E0D0' }}>
        <div className="max-w-7xl mx-auto py-6">
          <div className="flex items-center gap-3 mb-1">
            <button onClick={() => navigate('discover')} className="text-sm font-body flex items-center gap-1" style={{ color: '#8A7B6B' }}>
              ← Discover
            </button>
            <span style={{ color: '#C9BDA8' }}>/</span>
            <span className="text-sm font-body" style={{ color: '#D98A6C' }}>{thread.title}</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-display text-3xl font-semibold" style={{ color: '#2C2417' }}>{thread.title}</h1>
              <p className="font-body text-sm mt-1" style={{ color: '#8A7B6B' }}>{thread.subtitle}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-full text-sm font-body font-medium" style={{ border: '1px solid #E8E0D0', color: '#2C2417' }}>Share Thread</button>
              <button
                onClick={() => { const a = wps.find(w => w.status === 'active'); if (a) navigate('place', threadId ?? undefined, a.id) }}
                className="px-5 py-2 rounded-full text-sm font-body font-semibold" style={{ backgroundColor: '#6B8E23', color: 'white' }}>
                Go to Active Node →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-10">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {thread.stats.map(a => (
            <div key={a.label} className="flex items-center gap-3 px-5 py-4 rounded-xl" style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0' }}>
              <span className="text-2xl">{a.icon}</span>
              <div>
                <div className="font-display text-xl font-semibold" style={{ color: '#2C2417' }}>{a.value}</div>
                <div className="text-xs font-body" style={{ color: '#8A7B6B' }}>{a.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between text-xs font-body mb-2" style={{ color: '#8A7B6B' }}>
            <span>Thread Progress</span><span>{thread.progress}% complete</span>
          </div>
          <div className="h-2 rounded-full" style={{ backgroundColor: '#E8E0D0' }}>
            <div className="h-full rounded-full" style={{ width: `${thread.progress}%`, backgroundColor: '#6B8E23' }} />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Story path */}
          <div className="col-span-8">
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', minHeight: '420px' }}>
              <h2 className="font-body font-semibold text-sm uppercase tracking-wide mb-8" style={{ color: '#8A7B6B' }}>Story Path</h2>
              <div className="relative">
                <svg viewBox="0 0 640 260" className="w-full" style={{ overflow: 'visible' }}>
                  <path d={pathSet.full} stroke="#E8E0D0" strokeWidth="3" fill="none" strokeDasharray="8 4" />
                  {completedCount > 0 && <path d={pathSet.done(completedCount)} stroke="#6B8E23" strokeWidth="3" fill="none" strokeLinecap="round" />}

                  {wps.map((wp, i) => {
                    const [x, y] = positions[i] ?? [60 + i * 100, 130]
                    const style = getStyle(wp)
                    const isActive   = wp.status === 'active'
                    const isSelected = wp.id === activeNode
                    return (
                      <g key={wp.id} onClick={() => setActiveNode(wp.id)} style={{ cursor: 'pointer' }}>
                        {isActive && <circle cx={x} cy={y} r="30" fill="rgba(217,138,108,0.15)" />}
                        <circle cx={x} cy={y} r="22" fill={style.bg} stroke={style.border} strokeWidth={isActive ? 3 : isSelected ? 2.5 : 2}
                          style={isActive ? { filter: 'drop-shadow(0 0 8px rgba(217,138,108,0.6))' } : {}} />
                        <text x={x} y={y + 5} textAnchor="middle" fontSize="14">{wp.status === 'locked' ? '🔒' : wp.icon}</text>
                        <text x={x} y={y + 38} textAnchor="middle" fontSize="9" fontFamily="Outfit, sans-serif"
                          fill={wp.status === 'locked' ? '#8A7B6B' : '#2C2417'} fontWeight="500">
                          {wp.name.split(' ').slice(0, 2).join(' ')}
                        </text>
                        {wp.status === 'completed' && (
                          <text x={x} y={y + 50} textAnchor="middle" fontSize="8" fontFamily="Outfit, sans-serif" fill="#6B8E23" fontWeight="600">
                            ✓ {wp.points}pts
                          </text>
                        )}
                      </g>
                    )
                  })}
                </svg>

                <div className="flex items-center gap-5 mt-2">
                  {[{ color: '#6B8E23', label: 'Completed' }, { color: '#D98A6C', label: 'Active (Current)' }, { color: '#C9BDA8', label: 'Locked' }].map(l => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
                      <span className="text-xs font-body" style={{ color: '#8A7B6B' }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Node detail */}
          <div className="col-span-4">
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E8E0D0' }}>
              <div className="relative h-44">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,36,23,0.65), transparent)' }} />
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-body px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'rgba(249,247,243,0.9)', color: '#D98A6C' }}>
                    {selected.type}
                  </span>
                </div>
                {selected.status === 'active' && (
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-body px-2 py-0.5 rounded-full font-semibold animate-pulse" style={{ backgroundColor: '#D98A6C', color: 'white' }}>● Active</span>
                  </div>
                )}
              </div>

              <div className="p-5" style={{ backgroundColor: '#FDFCFA' }}>
                <h3 className="font-display text-base font-semibold mb-1" style={{ color: '#2C2417' }}>{selected.name}</h3>
                <p className="text-xs font-body mb-3 leading-relaxed" style={{ color: '#8A7B6B' }}>{selected.desc}</p>

                {/* Challenge */}
                <div className="mb-4 p-3 rounded-xl" style={{ backgroundColor: 'rgba(107,142,35,0.07)', border: '1px solid rgba(107,142,35,0.2)' }}>
                  <p className="text-xs font-body font-semibold mb-1" style={{ color: '#4A6318' }}>🎯 Challenge</p>
                  <p className="text-xs font-body leading-relaxed" style={{ color: '#5A7A1A' }}>{selected.challenge}</p>
                </div>

                <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: '1px solid #E8E0D0' }}>
                  <div className="text-center">
                    <div className="font-display text-lg font-semibold" style={{ color: '#6B8E23' }}>+{selected.points}</div>
                    <div className="text-xs font-body" style={{ color: '#8A7B6B' }}>Points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display text-lg font-semibold" style={{ color: '#2C2417' }}>{selected.id}/{wps.length}</div>
                    <div className="text-xs font-body" style={{ color: '#8A7B6B' }}>Waypoint</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">{selected.icon}</div>
                    <div className="text-xs font-body capitalize" style={{ color: '#8A7B6B' }}>{selected.status}</div>
                  </div>
                </div>

                {selected.status === 'active' && (
                  <button onClick={() => navigate('place', threadId ?? undefined, selected.id)} className="w-full py-3 rounded-full font-body font-semibold text-sm transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: '#6B8E23', color: 'white', boxShadow: '0 4px 12px rgba(107,142,35,0.3)' }}>
                    Go to Challenge →
                  </button>
                )}
                {selected.status === 'completed' && (
                  <div className="text-center py-2">
                    <span className="text-sm font-body font-medium" style={{ color: '#6B8E23' }}>✓ Challenge Completed</span>
                  </div>
                )}
                {selected.status === 'locked' && (
                  <div className="text-center py-2">
                    <span className="text-sm font-body" style={{ color: '#8A7B6B' }}>🔒 Complete previous waypoints first</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(217,138,108,0.08)', border: '1px solid rgba(217,138,108,0.2)' }}>
              <p className="text-xs font-body leading-relaxed" style={{ color: '#B8633E' }}>
                <strong>Local Tip:</strong> {thread.tip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
