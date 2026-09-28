import Nav from '../components/Nav'
import { Page } from '../App'
import maanSevenWondersImage from '../assets/maan-seven-wonders.jpg'
import deadSeaImage from '../assets/dead-sea-lowest-place.jpg'
import madabaThreadImage from '../assets/madaba-thread.jpg'

interface Props { navigate: (page: Page, threadId?: number, waypointId?: number) => void }

const featuredThreads = [
  {
    id: 1,
    title: 'The Seven World Wonder',
    subtitle: "Petra & Ma'an",
    image: maanSevenWondersImage,
    waypoints: '∞',
    travelers: '2.4k',
    duration: '∞',
    category: 'History',
    progress: 0,
  },
  {
    id: 2,
    title: 'The Lowest Place on Earth',
    subtitle: 'Dead Sea Shoreline',
    image: deadSeaImage,
    waypoints: 2,
    travelers: '930',
    duration: '2 days',
    category: 'Nature',
    progress: 0,
  },
  {
    id: 3,
    title: 'The City of Mosaics',
    subtitle: 'Madaba Old Town',
    image: madabaThreadImage,
    waypoints: 5,
    travelers: '680',
    duration: '2–3 days',
    category: 'Local Culture',
    progress: 0,
  },
]

const stats = [
  { value: '47', label: 'Story Threads' },
  { value: '318', label: 'Hidden Waypoints' },
  { value: '12k+', label: 'Weavers Active' },
  { value: '94', label: 'Local Partners' },
]

export default function LandingPage({ navigate }: Props) {
  return (
    <div>
      <Nav navigate={navigate} currentPage="home" />

      {/* Hero */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <img
          src="/assets/petra-hero.jpg"
          alt="Petra Treasury, Jordan"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(44,36,23,0.75) 40%, rgba(44,36,23,0.2) 100%)' }} />

        {/* Z-pattern: top-left headline */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-10 w-full grid grid-cols-12 gap-6">
            <div className="col-span-7 flex flex-col justify-center pt-20">
              <div className="inline-flex items-center gap-2 mb-6" style={{ color: '#EDB99E' }}>
                <div className="w-6 h-px" style={{ backgroundColor: '#EDB99E' }} />
                <span className="text-xs font-body font-medium tracking-widest uppercase">Jordan Gamified</span>
              </div>
              <h1 className="font-display text-6xl xl:text-7xl font-semibold leading-tight mb-6" style={{ color: '#F9F7F3' }}>
                Weave Your<br />
                <em className="not-italic" style={{ color: '#EDB99E' }}>Jordanian</em><br />
                Story
              </h1>
              <p className="font-body text-lg mb-10 max-w-lg leading-relaxed" style={{ color: 'rgba(249,247,243,0.75)' }}>
                Follow curated narrative paths through Jordan's landscapes, histories, and living cultures. Collect waypoints, earn rewards, and leave your thread in the national tapestry.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('discover')}
                  className="px-8 py-4 rounded-full font-body font-semibold text-base transition-all hover:scale-105"
                  style={{ backgroundColor: '#6B8E23', color: 'white', boxShadow: '0 8px 24px rgba(107,142,35,0.35)' }}
                >
                  Start Your Journey
                </button>
                <button
                  onClick={() => navigate('thread')}
                  className="px-8 py-4 rounded-full font-body font-medium text-base transition-all"
                  style={{ color: '#F9F7F3', border: '1px solid rgba(249,247,243,0.4)' }}
                >
                  View Threads →
                </button>
              </div>

              {/* Z-pattern bottom: stats sweep right */}
              <div className="flex items-center gap-10 mt-16 pt-8" style={{ borderTop: '1px solid rgba(249,247,243,0.15)' }}>
                {stats.map(s => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-semibold" style={{ color: '#EDB99E' }}>{s.value}</div>
                    <div className="text-xs font-body" style={{ color: 'rgba(249,247,243,0.55)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Z-pattern: top-right decorative thread map */}
            <div className="col-span-5 flex items-center justify-end pt-20">
              <div className="relative w-72 h-72 opacity-60">
                <svg viewBox="0 0 280 280" className="w-full h-full">
                  <path d="M40 240 Q80 180 140 140 Q200 100 240 40" stroke="#EDB99E" strokeWidth="1.5" fill="none" strokeDasharray="6 3" opacity="0.6"/>
                  <path d="M20 160 Q80 140 140 100 Q200 60 260 80" stroke="#EDB99E" strokeWidth="1" fill="none" strokeDasharray="4 4" opacity="0.4"/>
                  {[
                    [40,240], [140,140], [240,40], [80,180], [200,100]
                  ].map(([cx,cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="5" fill="#EDB99E" opacity="0.8"/>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(249,247,243,0.4)' }}>
          <span className="text-xs tracking-widest uppercase font-body">Scroll</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(249,247,243,0.4), transparent)' }} />
        </div>
      </section>

      {/* Featured Threads */}
      <section className="py-24 px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-14">
          <div className="col-span-6">
            <div className="inline-flex items-center gap-2 mb-3" style={{ color: '#D98A6C' }}>
              <div className="w-5 h-px" style={{ backgroundColor: '#D98A6C' }} />
              <span className="text-xs font-body font-medium tracking-widest uppercase">Popular Threads</span>
            </div>
            <h2 className="font-display text-4xl font-semibold" style={{ color: '#2C2417' }}>
              Begin with a Thread
            </h2>
          </div>
          <div className="col-span-6 flex items-end justify-end">
            <button
              onClick={() => navigate('discover')}
              className="text-sm font-body font-medium underline underline-offset-4"
              style={{ color: '#D98A6C' }}
            >
              View all 47 threads →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {featuredThreads.map(thread => (
            <div
              key={thread.id}
              className="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1"
              style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', boxShadow: '0 2px 12px rgba(44,36,23,0.06)' }}
              onClick={() => navigate('thread')}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={thread.image}
                  alt={thread.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-body font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(249,247,243,0.92)', color: '#D98A6C' }}>
                    {thread.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, rgba(44,36,23,0.5), transparent)' }} />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold mb-1" style={{ color: '#2C2417' }}>{thread.title}</h3>
                <p className="text-sm font-body mb-4" style={{ color: '#8A7B6B' }}>{thread.subtitle}</p>
                <div className="flex items-center justify-between text-xs font-body mb-4" style={{ color: '#8A7B6B' }}>
                  <span>⊕ {thread.waypoints} waypoints</span>
                  <span>⏱ {thread.duration}</span>
                  <span>◈ {thread.travelers} weavers</span>
                </div>
                <button
                  className="w-full py-2.5 rounded-full text-sm font-body font-medium transition-all"
                  style={{ backgroundColor: '#F9F7F3', color: '#2C2417', border: '1px solid #E8E0D0' }}
                >
                  Begin Thread →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-10" style={{ backgroundColor: '#2C2417' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3" style={{ color: '#EDB99E' }}>
              <div className="w-5 h-px" style={{ backgroundColor: '#EDB99E' }} />
              <span className="text-xs font-body font-medium tracking-widest uppercase">The Process</span>
              <div className="w-5 h-px" style={{ backgroundColor: '#EDB99E' }} />
            </div>
            <h2 className="font-display text-4xl font-semibold" style={{ color: '#F9F7F3' }}>How the Loom Works</h2>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose a Thread', desc: 'Pick a curated narrative path across Jordan\'s regions and cultures.' },
              { step: '02', title: 'Visit Waypoints', desc: 'Follow the story to physical locations and scan QR codes to unlock challenges.' },
              { step: '03', title: 'Complete Challenges', desc: 'Engage with local history, nature, or culture at each stop.' },
              { step: '04', title: 'Earn Your Badge', desc: 'Collect achievement badges and redeem points with local community partners.' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="font-display text-5xl font-semibold mb-4" style={{ color: '#D98A6C', opacity: 0.5 }}>{item.step}</div>
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#F9F7F3' }}>{item.title}</h3>
                <p className="text-sm font-body leading-relaxed" style={{ color: 'rgba(249,247,243,0.55)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-10 max-w-7xl mx-auto text-center">
        <h2 className="font-display text-5xl font-semibold mb-4" style={{ color: '#2C2417' }}>
          Ready to add your thread<br />to Jordan's tapestry?
        </h2>
        <p className="font-body text-lg mb-8 max-w-lg mx-auto" style={{ color: '#8A7B6B' }}>
          Join 12,000+ weavers exploring Jordan's hidden stories, one waypoint at a time.
        </p>
        <button
          onClick={() => navigate('discover')}
          className="px-10 py-4 rounded-full font-body font-semibold text-base transition-all hover:scale-105"
          style={{ backgroundColor: '#6B8E23', color: 'white', boxShadow: '0 8px 24px rgba(107,142,35,0.3)' }}
        >
          Start Weaving — It's Free
        </button>
      </section>

      {/* Footer */}
      <footer className="py-10 px-10" style={{ borderTop: '1px solid #E8E0D0' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/9920d.png" alt="Naseej emblem" style={{ width: 32, height: 28, objectFit: 'contain' }} />
            <img src="/assets/92fb6.png" alt="Naseej" style={{ width: 60, height: 28, objectFit: 'contain' }} />
          </div>
          <p className="text-xs font-body" style={{ color: '#8A7B6B' }}>© 2026 Naseej — Weaving Jordan's Stories Together</p>
        </div>
      </footer>
    </div>
  )
}
