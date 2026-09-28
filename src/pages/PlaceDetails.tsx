import { useState } from 'react'
import Nav from '../components/Nav'
import { Page } from '../App'
import { threadData } from '../data/threadData'

interface Props {
  navigate: (page: Page, threadId?: number, waypointId?: number) => void
  threadId: number | null
  waypointId: number | null
}

export default function PlaceDetails({ navigate, threadId, waypointId }: Props) {
  const [challengeOpen, setChallengeOpen] = useState(false)

  // ── Resolve data ──────────────────────────────────────────────────────────
  const thread  = (threadId !== null ? threadData[threadId] : null) ?? threadData[7]
  const waypoint = waypointId !== null
    ? thread.waypoints.find(w => w.id === waypointId) ?? thread.waypoints.find(w => w.status === 'active') ?? thread.waypoints[0]
    : thread.waypoints.find(w => w.status === 'active') ?? thread.waypoints[0]

  const wpIndex     = thread.waypoints.indexOf(waypoint)
  const totalWps    = thread.waypoints.length
  const nextWaypoint = thread.waypoints[wpIndex + 1] ?? null

  // Build a small gallery: main image repeated at slight variations so the gallery strip works
  const images = [
    waypoint.image,
    waypoint.image.replace('w=600&h=300', 'w=600&h=300&crop=entropy'),
    waypoint.image.replace('fit=crop', 'fit=crop&sat=-20'),
    waypoint.image.replace('fit=crop', 'fit=crop&bri=10'),
  ]
  const [activeImage, setActiveImage] = useState(0)

  const diffLabel = thread.subtitle.match(/Easy|Moderate|Strenuous/i)?.[0] ?? 'Moderate'
  const durationMatch = thread.subtitle.match(/\d[\d–]* days?|\d+ hrs?|\d day/i)
  const duration = durationMatch ? durationMatch[0] : '2 hrs'

  const tags = [
    { label: 'Duration',   value: duration,         icon: '⏱' },
    { label: 'Reward',     value: `${waypoint.points} pts`, icon: '⭐' },
    { label: 'Difficulty', value: diffLabel,         icon: '⚡' },
    { label: 'Category',   value: waypoint.type,     icon: waypoint.icon },
    { label: 'City',       value: thread.city,       icon: '📍' },
    { label: 'Waypoint',   value: `${wpIndex + 1} of ${totalWps}`, icon: '⊕' },
  ]

  return (
    <div>
      <Nav navigate={navigate} currentPage="place" />

      {/* Breadcrumb */}
      <div className="pt-20 px-10 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm font-body flex-wrap" style={{ color: '#8A7B6B' }}>
          <button onClick={() => navigate('discover')} className="hover:underline">Discover</button>
          <span>/</span>
          <button onClick={() => navigate('thread', threadId ?? undefined)} className="hover:underline">{thread.title}</button>
          <span>/</span>
          <span style={{ color: '#D98A6C' }}>{waypoint.name}</span>
        </div>
      </div>

      {/* Split screen */}
      <div className="max-w-7xl mx-auto px-10 pb-20">
        <div className="grid grid-cols-12 gap-10 min-h-[calc(100vh-140px)]">

          {/* LEFT — Image gallery */}
          <div className="col-span-6 flex flex-col gap-3">
            <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[400px]">
              <img src={images[activeImage]} alt={waypoint.name}
                className="w-full h-full object-cover transition-all duration-500" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,36,23,0.3) 0%, transparent 50%)' }} />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="text-xs font-body font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: '#D98A6C', color: 'white' }}>
                  Waypoint {wpIndex + 1} of {totalWps}
                </span>
                {waypoint.status === 'active' && (
                  <span className="text-xs font-body font-semibold px-3 py-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#6B8E23', color: 'white' }}>
                    ● Active Challenge
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                <button onClick={() => setActiveImage(prev => Math.max(0, prev - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(249,247,243,0.9)', color: '#2C2417' }}>←</button>
                <button onClick={() => setActiveImage(prev => Math.min(images.length - 1, prev + 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(249,247,243,0.9)', color: '#2C2417' }}>→</button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className="rounded-xl overflow-hidden h-20"
                  style={{ border: activeImage === i ? '2px solid #D98A6C' : '2px solid transparent', opacity: activeImage === i ? 1 : 0.65 }}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Location card */}
            <div className="rounded-xl p-4 flex items-center gap-4" style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: 'rgba(217,138,108,0.1)' }}>
                📍
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-body font-semibold truncate" style={{ color: '#2C2417' }}>
                  {waypoint.location ?? `${thread.city}, Jordan`}
                </div>
                <div className="text-xs font-body" style={{ color: '#8A7B6B' }}>{waypoint.type}</div>
              </div>
              <button className="text-xs font-body font-medium px-3 py-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: 'rgba(107,142,35,0.1)', color: '#6B8E23' }}>
                Open in Maps
              </button>
            </div>
          </div>

          {/* RIGHT — Details & CTA */}
          <div className="col-span-6 flex flex-col">
            <div className="flex-1">
              {/* Thread label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D98A6C' }} />
                <span className="text-xs font-body uppercase tracking-widest" style={{ color: '#D98A6C' }}>{thread.title} Thread</span>
              </div>

              <h1 className="font-display text-4xl font-semibold mb-2" style={{ color: '#2C2417' }}>
                {waypoint.name}
              </h1>
              <p className="font-display italic text-lg font-light mb-6" style={{ color: '#D98A6C' }}>
                {waypoint.type} · {thread.city}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map(tag => (
                  <span key={tag.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium"
                    style={{ backgroundColor: 'rgba(217,138,108,0.08)', color: '#2C2417', border: '1px solid rgba(217,138,108,0.2)' }}>
                    <span>{tag.icon}</span>
                    <span style={{ color: '#8A7B6B' }}>{tag.label}:</span>
                    <strong>{tag.value}</strong>
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="mb-6 pb-6" style={{ borderBottom: '1px solid #E8E0D0' }}>
                <h3 className="font-body font-semibold text-sm uppercase tracking-wide mb-3" style={{ color: '#8A7B6B' }}>The Story</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#2C2417' }}>{waypoint.desc}</p>
              </div>

              {/* Challenge */}
              <div className="rounded-xl p-5 mb-6" style={{ backgroundColor: 'rgba(107,142,35,0.06)', border: '1px solid rgba(107,142,35,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">🎯</span>
                  <h3 className="font-body font-semibold text-sm" style={{ color: '#2C2417' }}>Your Challenge</h3>
                  <span className="ml-auto text-xs font-body font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#6B8E23', color: 'white' }}>
                    +{waypoint.points} pts
                  </span>
                </div>
                <p className="text-sm font-body leading-relaxed" style={{ color: '#2C2417' }}>{waypoint.challenge}</p>
                <div className="mt-3 flex gap-4 text-xs font-body" style={{ color: '#8A7B6B' }}>
                  <span>🗺 Evidence required: Photo + Description</span>
                  <span>⏱ Estimated: 45 min</span>
                </div>
              </div>

              {/* Local tip */}
              <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: 'rgba(217,138,108,0.06)', border: '1px solid rgba(217,138,108,0.15)' }}>
                <p className="text-xs font-body leading-relaxed" style={{ color: '#B8633E' }}>
                  <strong>Local Tip:</strong> {thread.tip}
                </p>
              </div>

              {/* Next waypoint teaser */}
              {nextWaypoint && (
                <div className="flex items-center gap-3 mb-6 p-3 rounded-xl" style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0' }}>
                  <div className="text-lg">{nextWaypoint.icon}</div>
                  <div>
                    <p className="text-xs font-body" style={{ color: '#8A7B6B' }}>Up next</p>
                    <p className="text-sm font-body font-semibold" style={{ color: '#2C2417' }}>{nextWaypoint.name}</p>
                  </div>
                  <div className="ml-auto text-xs font-body font-semibold" style={{ color: '#6B8E23' }}>+{nextWaypoint.points} pts</div>
                </div>
              )}
            </div>

            {/* Sticky CTA */}
            <div className="sticky bottom-0 pt-4" style={{ borderTop: '1px solid #E8E0D0', backgroundColor: '#F9F7F3' }}>
              {!challengeOpen ? (
                <button onClick={() => setChallengeOpen(true)}
                  className="w-full py-4 rounded-full font-body font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.99]"
                  style={{ backgroundColor: '#6B8E23', color: 'white', boxShadow: '0 8px 24px rgba(107,142,35,0.35)' }}>
                  📷 Scan QR to Complete Challenge
                </button>
              ) : (
                <div className="text-center py-6 rounded-2xl" style={{ backgroundColor: 'rgba(107,142,35,0.06)', border: '1px solid rgba(107,142,35,0.3)' }}>
                  <div className="inline-block p-4 rounded-xl mb-3" style={{ backgroundColor: 'white', boxShadow: '0 4px 16px rgba(44,36,23,0.1)' }}>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <rect width="120" height="120" fill="white" />
                      {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                        const filled = (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3) || Math.random() > 0.45
                        return filled ? <rect key={`${r}-${c}`} x={8 + c * 15} y={8 + r * 15} width="12" height="12" fill="#2C2417" rx="1" /> : null
                      }))}
                      <rect x="8" y="8" width="42" height="42" fill="none" stroke="#2C2417" strokeWidth="3" />
                      <rect x="70" y="8" width="42" height="42" fill="none" stroke="#2C2417" strokeWidth="3" />
                      <rect x="8" y="70" width="42" height="42" fill="none" stroke="#2C2417" strokeWidth="3" />
                    </svg>
                  </div>
                  <p className="text-sm font-body font-semibold mb-1" style={{ color: '#2C2417' }}>Scan at {waypoint.name}</p>
                  <p className="text-xs font-body" style={{ color: '#8A7B6B' }}>Point your camera at the physical QR marker at this location</p>
                  <button onClick={() => { setChallengeOpen(false); navigate('profile') }}
                    className="mt-4 text-xs font-body font-medium underline underline-offset-2"
                    style={{ color: '#6B8E23' }}>
                    Mark as completed manually →
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => navigate('thread', threadId ?? undefined)}
                  className="flex-1 py-2.5 rounded-full font-body font-medium text-sm"
                  style={{ border: '1px solid #E8E0D0', color: '#2C2417' }}>
                  ← Back to Thread
                </button>
                <button className="flex-1 py-2.5 rounded-full font-body font-medium text-sm"
                  style={{ border: '1px solid #E8E0D0', color: '#2C2417' }}>
                  Save to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
