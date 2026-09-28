import { useState } from 'react'
import Nav from '../components/Nav'
import { Page } from '../App'
import maanSevenWondersImage from '../assets/maan-seven-wonders.jpg'
import ajlounThreadImage from '../assets/ajloun-thread.jpg'
import madabaThreadImage from '../assets/madaba-thread.jpg'

interface Props { navigate: (page: Page, threadId?: number, waypointId?: number) => void }

const badges = [
  { id: 1, name: 'North Explorer', icon: '🧭', desc: 'Completed all threads in Northern Jordan', earned: true, date: 'Sep 2026', rarity: 'Rare' },
  { id: 2, name: 'Olive Master', icon: '🫒', desc: 'Visited 3+ olive heritage sites', earned: true, date: 'Aug 2026', rarity: 'Common' },
  { id: 3, name: 'Rose Pilgrim', icon: '🌹', desc: 'Walked through Petra at dawn', earned: true, date: 'Jul 2026', rarity: 'Epic' },
  { id: 4, name: 'Desert Weaver', icon: '🏜', desc: 'Spent a night in Wadi Rum', earned: false, date: null, rarity: 'Rare' },
  { id: 5, name: 'Souk Sage', icon: '🏺', desc: 'Visited 5 traditional craft workshops', earned: false, date: null, rarity: 'Common' },
  { id: 6, name: 'Dead Sea Drifter', icon: '🌊', desc: 'Float the lowest point on earth', earned: false, date: null, rarity: 'Common' },
  { id: 7, name: 'Castle Keeper', icon: '🏰', desc: 'Completed all castle waypoints', earned: false, date: null, rarity: 'Epic' },
  { id: 8, name: 'Grand Loom', icon: '🎖', desc: 'Complete 10 full threads', earned: false, date: null, rarity: 'Legendary' },
]

const completedThreads = [
  { id: 1, title: 'The Seven World Wonder', region: "Petra & Ma'an", waypoints: '∞', pointsEarned: 420, completedDate: 'Jul 15, 2026', image: maanSevenWondersImage },
  { id: 2, title: 'The City of Mosaics', region: 'Madaba Old Town', waypoints: 5, pointsEarned: 320, completedDate: 'Aug 22, 2026', image: madabaThreadImage },
]

const activeThreads = [
  { id: 1, title: 'The Castle Among Pines Thread', region: 'Ajloun Forest', progress: 43, nextWaypoint: 'Ajloun Castle Lookout', image: ajlounThreadImage },
]

const rewards = [
  { name: 'Ajloun Soap House', discount: '15% off', points: 200, type: 'Craft', logo: '🧼', remaining: 5 },
  { name: "Orjan Women's Coop", discount: '20% off', points: 300, type: 'Artisan', logo: '🧵', remaining: 3 },
  { name: 'Wadi Rum Bedouin Camp', discount: 'Free tea ceremony', points: 150, type: 'Experience', logo: '☕', remaining: 12 },
  { name: 'Petra Kitchen Restaurant', discount: '10% off dinner', points: 100, type: 'Dining', logo: '🍽', remaining: 8 },
]

const TOTAL_POINTS = 740

export default function UserProfile({ navigate }: Props) {
  const [tab, setTab] = useState<'loom' | 'threads' | 'rewards'>('loom')

  return (
    <div>
      <Nav navigate={navigate} currentPage="profile" />

      <div className="pt-20">
        {/* Profile Hero */}
        <div className="px-10 py-10" style={{ background: 'linear-gradient(135deg, #2C2417 0%, #3D3020 100%)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-8 flex items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden" style={{ border: '3px solid #D98A6C' }}>
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" alt="Layla Hassan" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: '#6B8E23', border: '2px solid #2C2417' }}>
                    ✓
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="font-display text-2xl font-semibold" style={{ color: '#F9F7F3' }}>Layla Hassan</h1>
                    <span className="text-xs font-body px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: '#D98A6C', color: 'white' }}>North Explorer</span>
                  </div>
                  <p className="text-sm font-body" style={{ color: 'rgba(249,247,243,0.6)' }}>Weaving since April 2026 · Amman, Jordan</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="text-center">
                      <div className="font-display text-xl font-semibold" style={{ color: '#EDB99E' }}>{TOTAL_POINTS}</div>
                      <div className="text-xs font-body" style={{ color: 'rgba(249,247,243,0.5)' }}>Total Points</div>
                    </div>
                    <div className="w-px h-8" style={{ backgroundColor: 'rgba(249,247,243,0.15)' }} />
                    <div className="text-center">
                      <div className="font-display text-xl font-semibold" style={{ color: '#EDB99E' }}>2</div>
                      <div className="text-xs font-body" style={{ color: 'rgba(249,247,243,0.5)' }}>Threads Done</div>
                    </div>
                    <div className="w-px h-8" style={{ backgroundColor: 'rgba(249,247,243,0.15)' }} />
                    <div className="text-center">
                      <div className="font-display text-xl font-semibold" style={{ color: '#EDB99E' }}>3</div>
                      <div className="text-xs font-body" style={{ color: 'rgba(249,247,243,0.5)' }}>Badges Earned</div>
                    </div>
                    <div className="w-px h-8" style={{ backgroundColor: 'rgba(249,247,243,0.15)' }} />
                    <div className="text-center">
                      <div className="font-display text-xl font-semibold" style={{ color: '#EDB99E' }}>14</div>
                      <div className="text-xs font-body" style={{ color: 'rgba(249,247,243,0.5)' }}>Waypoints</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Points redeemable */}
              <div className="col-span-4">
                <div className="p-5 rounded-2xl" style={{ backgroundColor: 'rgba(249,247,243,0.06)', border: '1px solid rgba(249,247,243,0.12)' }}>
                  <div className="text-xs font-body uppercase tracking-widest mb-2" style={{ color: 'rgba(249,247,243,0.5)' }}>Points Available</div>
                  <div className="font-display text-4xl font-semibold mb-2" style={{ color: '#EDB99E' }}>{TOTAL_POINTS}</div>
                  <div className="h-2 rounded-full mb-3" style={{ backgroundColor: 'rgba(249,247,243,0.1)' }}>
                    <div className="h-full rounded-full" style={{ width: '73%', background: 'linear-gradient(90deg, #6B8E23, #8CB02E)' }} />
                  </div>
                  <p className="text-xs font-body mb-3" style={{ color: 'rgba(249,247,243,0.5)' }}>260 pts to next level: <strong style={{ color: '#EDB99E' }}>Gold Weaver</strong></p>
                  <button
                    onClick={() => setTab('rewards')}
                    className="w-full py-2 rounded-full text-xs font-body font-semibold"
                    style={{ backgroundColor: '#6B8E23', color: 'white' }}
                  >
                    Redeem Points →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-10 max-w-7xl mx-auto">
          <div className="flex gap-0 mt-0" style={{ borderBottom: '1px solid #E8E0D0' }}>
            {[
              { key: 'loom', label: 'The Loom (Badges)' },
              { key: 'threads', label: 'My Threads' },
              { key: 'rewards', label: 'Rewards & Discounts' },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as typeof tab)}
                className="px-6 py-4 text-sm font-body font-medium transition-all"
                style={tab === t.key
                  ? { color: '#D98A6C', borderBottom: '2px solid #D98A6C', marginBottom: '-1px' }
                  : { color: '#8A7B6B' }
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Loom (Badges) */}
          {tab === 'loom' && (
            <div className="py-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-semibold" style={{ color: '#2C2417' }}>The Loom</h2>
                  <p className="text-sm font-body mt-1" style={{ color: '#8A7B6B' }}>3 of 8 badges earned · 5 remaining to complete your tapestry</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-5">
                {badges.map(badge => (
                  <div
                    key={badge.id}
                    className={`relative rounded-2xl p-5 text-center transition-all ${badge.earned ? 'hover:-translate-y-1' : ''}`}
                    style={{
                      backgroundColor: badge.earned ? '#FDFCFA' : 'rgba(249,247,243,0.5)',
                      border: badge.earned ? '1px solid #E8E0D0' : '1px dashed #C9BDA8',
                      filter: badge.earned ? 'none' : 'grayscale(0.3)',
                      opacity: badge.earned ? 1 : 0.65,
                    }}
                  >
                    {badge.earned && badge.rarity === 'Epic' && (
                      <div className="absolute top-2 right-2">
                        <span className="text-xs font-body px-1.5 py-0.5 rounded-full font-semibold" style={{ backgroundColor: 'rgba(107,142,35,0.15)', color: '#6B8E23' }}>
                          {badge.rarity}
                        </span>
                      </div>
                    )}
                    {badge.earned && badge.rarity === 'Legendary' && (
                      <div className="absolute top-2 right-2">
                        <span className="text-xs font-body px-1.5 py-0.5 rounded-full font-semibold" style={{ backgroundColor: 'rgba(217,138,108,0.15)', color: '#D98A6C' }}>
                          {badge.rarity}
                        </span>
                      </div>
                    )}

                    {/* Badge icon */}
                    <div
                      className={`mx-auto mb-3 w-16 h-16 rounded-full flex items-center justify-center text-3xl ${badge.earned ? 'badge-glow' : ''}`}
                      style={{
                        backgroundColor: badge.earned ? 'rgba(107,142,35,0.1)' : 'rgba(200,190,175,0.3)',
                        border: badge.earned ? '2px solid rgba(107,142,35,0.3)' : '2px dashed #C9BDA8',
                      }}
                    >
                      {badge.earned ? badge.icon : '🔒'}
                    </div>

                    <h3 className="font-display text-sm font-semibold mb-1" style={{ color: badge.earned ? '#2C2417' : '#8A7B6B' }}>
                      {badge.name}
                    </h3>
                    <p className="text-xs font-body leading-snug" style={{ color: '#8A7B6B' }}>{badge.desc}</p>

                    {badge.earned && badge.date && (
                      <div className="mt-3 text-xs font-body" style={{ color: '#6B8E23' }}>Earned {badge.date}</div>
                    )}
                    {!badge.earned && (
                      <div className="mt-3 text-xs font-body" style={{ color: '#C9BDA8' }}>Not yet earned</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Threads */}
          {tab === 'threads' && (
            <div className="py-10">
              {/* Active */}
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#2C2417' }}>In Progress</h2>
              <div className="grid grid-cols-3 gap-5 mb-10">
                {activeThreads.map(t => (
                  <div
                    key={t.id}
                    className="rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all"
                    style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0' }}
                    onClick={() => navigate('thread')}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: 'rgba(249,247,243,0.3)' }}>
                        <div className="h-full progress-bar" style={{ width: `${t.progress}%` }} />
                      </div>
                      <span className="absolute top-2 left-2 text-xs font-body px-2 py-0.5 rounded-full font-semibold animate-pulse" style={{ backgroundColor: '#D98A6C', color: 'white' }}>
                        ● Active
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold mb-1" style={{ color: '#2C2417' }}>{t.title}</h3>
                      <p className="text-xs font-body mb-3" style={{ color: '#8A7B6B' }}>Next: {t.nextWaypoint}</p>
                      <div className="flex justify-between text-xs font-body mb-2" style={{ color: '#8A7B6B' }}>
                        <span>Progress</span><span>{t.progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: '#E8E0D0' }}>
                        <div className="h-full rounded-full progress-bar" style={{ width: `${t.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className="rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:-translate-y-1"
                  style={{ border: '2px dashed #C9BDA8', minHeight: '200px' }}
                  onClick={() => navigate('discover')}
                >
                  <div className="text-3xl mb-2">🧵</div>
                  <span className="text-sm font-body font-medium" style={{ color: '#8A7B6B' }}>Start New Thread</span>
                </div>
              </div>

              {/* Completed */}
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#2C2417' }}>Completed</h2>
              <div className="grid grid-cols-3 gap-5">
                {completedThreads.map(t => (
                  <div
                    key={t.id}
                    className="rounded-2xl overflow-hidden"
                    style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0' }}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img src={t.image} alt={t.title} className="w-full h-full object-cover" style={{ filter: 'saturate(0.85)' }} />
                      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(107,142,35,0.2)' }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: '#6B8E23' }}>✓</div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold mb-1" style={{ color: '#2C2417' }}>{t.title}</h3>
                      <div className="flex items-center justify-between text-xs font-body" style={{ color: '#8A7B6B' }}>
                        <span>⊕ {t.waypoints} waypoints</span>
                        <span className="font-semibold" style={{ color: '#6B8E23' }}>+{t.pointsEarned} pts</span>
                      </div>
                      <div className="text-xs font-body mt-2" style={{ color: '#C9BDA8' }}>Completed {t.completedDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rewards */}
          {tab === 'rewards' && (
            <div className="py-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-semibold" style={{ color: '#2C2417' }}>Community Rewards</h2>
                  <p className="text-sm font-body mt-1" style={{ color: '#8A7B6B' }}>Redeem your {TOTAL_POINTS} points with local Jordan partners</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(107,142,35,0.1)', border: '1px solid rgba(107,142,35,0.2)' }}>
                  <span className="font-display text-lg font-semibold" style={{ color: '#6B8E23' }}>{TOTAL_POINTS}</span>
                  <span className="text-sm font-body" style={{ color: '#6B8E23' }}>pts available</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {rewards.map(r => (
                  <div
                    key={r.name}
                    className="flex gap-4 p-5 rounded-2xl transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0' }}
                  >
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ backgroundColor: 'rgba(217,138,108,0.08)' }}>
                      {r.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-body font-semibold text-sm" style={{ color: '#2C2417' }}>{r.name}</h3>
                        <span className="text-xs font-body px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(217,138,108,0.1)', color: '#D98A6C' }}>{r.type}</span>
                      </div>
                      <p className="font-display text-base font-semibold mb-2" style={{ color: '#6B8E23' }}>{r.discount}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-body" style={{ color: '#8A7B6B' }}>{r.points} pts · {r.remaining} left</span>
                        <button
                          className="text-xs font-body font-semibold px-3 py-1.5 rounded-full transition-all"
                          style={TOTAL_POINTS >= r.points
                            ? { backgroundColor: '#6B8E23', color: 'white' }
                            : { backgroundColor: '#E8E0D0', color: '#8A7B6B', cursor: 'not-allowed' }
                          }
                        >
                          {TOTAL_POINTS >= r.points ? 'Redeem' : `Need ${r.points - TOTAL_POINTS} more`}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #2C2417, #3D3020)', border: '1px solid rgba(217,138,108,0.2)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1" style={{ color: '#F9F7F3' }}>Become a Gold Weaver</h3>
                    <p className="text-sm font-body" style={{ color: 'rgba(249,247,243,0.6)' }}>Earn 260 more points to unlock exclusive partner discounts up to 40% off</p>
                  </div>
                  <button
                    onClick={() => navigate('discover')}
                    className="px-5 py-2.5 rounded-full text-sm font-body font-semibold whitespace-nowrap"
                    style={{ backgroundColor: '#D98A6C', color: 'white' }}
                  >
                    Earn More Points →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
