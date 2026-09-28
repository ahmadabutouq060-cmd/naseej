import { useState } from 'react'
import Nav from '../components/Nav'
import { Page } from '../App'
import jordanMapImg from '../assets/jordan-map-new.png'
import irbidBrideImage from '../assets/irbid-bride-of-the-north.jpg'
import ajlounThreadImage from '../assets/ajloun-thread.jpg'
import jerashRomanRemainsImage from '../assets/jerash-roman-remains.jpg'
import ammanCapitalImage from '../assets/amman-the-capital.jpg'
import karakThreadImage from '../assets/karak-thread.jpg'
import maanSevenWondersImage from '../assets/maan-seven-wonders.jpg'
import aqabaBrideImage from '../assets/aqaba-bride-of-red-sea.jpg'
import deadSeaImage from '../assets/dead-sea-lowest-place.jpg'
import madabaThreadImage from '../assets/madaba-thread.jpg'
import karakMansafImage from '../assets/karak-mansaf.jpg'

interface Props { navigate: (page: Page, threadId?: number, waypointId?: number) => void }

const categories = ['All', 'Adventure', 'History', 'Nature', 'Culinary', 'Wellness', 'Local Culture', 'Pilgrimage', 'Art & Craft']

const threads = [
  // ── IRBID ─────────────────────────────────────────────────────────────────
  { id: 7,  title: 'Bride of the North',
    hook: 'Walk the black-basalt streets of ancient Decapolis cities where three countries meet.',
    city: 'Irbid', region: 'Roman Decapolis Trail', image: irbidBrideImage,
    waypoints: 5, duration: '3 days', difficulty: 'Moderate', points: 260, travelers: 520, progress: 40,
    category: 'History', mood: 'Curious', tags: ['Roman', 'Decapolis'],
    start: 'Umm Qais (Gadara)', end: 'Abila (Quwayliba)' },

  { id: 10, title: 'Yarmouk Nature Walk',
    hook: 'Follow the canyon carved by the Jordan River\'s greatest tributary — a highway for 300 bird species.',
    city: 'Irbid', region: 'Yarmouk River Gorge', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=300&fit=crop',
    waypoints: 4, duration: '2 days', difficulty: 'Easy–Moderate', points: 200, travelers: 310, progress: 0,
    category: 'Nature', mood: 'Peaceful', tags: ['Gorge', 'Birds'],
    start: 'Yarmouk Trail Head', end: 'Riverside Picnic Meadow' },

  { id: 11, title: 'City of Scholars & Souk',
    hook: 'Trace Irbid\'s living history from a Bronze Age mound to a 30,000-student university and its bustling souk.',
    city: 'Irbid', region: 'Irbid City Centre', image: 'https://images.unsplash.com/photo-1572903650316-d96eae58c8b2?w=600&h=300&fit=crop',
    waypoints: 4, duration: '1 day', difficulty: 'Easy', points: 180, travelers: 290, progress: 0,
    category: 'Local Culture', mood: 'Cultural', tags: ['University', 'Souk'],
    start: 'Yarmouk University', end: 'Old Irbid Houses' },

  // ── AJLOUN ────────────────────────────────────────────────────────────────
  { id: 6,  title: 'Castle Among Pines',
    hook: 'Descend through mist-wrapped pine forest to a Crusader-era castle built by Saladin\'s own nephew.',
    city: 'Ajloun', region: 'Ajloun Forest Reserve', image: ajlounThreadImage,
    waypoints: 5, duration: '2 days', difficulty: 'Moderate', points: 540, travelers: 760, progress: 0,
    category: 'History', mood: 'Adventurous', tags: ['Castle', 'Forest'],
    start: 'Ajloun Forest Reserve Gate', end: 'Orjan Village & Local Feast' },

  { id: 12, title: 'The Olive Oil Journey',
    hook: 'Follow a single olive from the ancient tree to the stone press to a guesthouse table — all in one day.',
    city: 'Ajloun', region: 'Ajloun Olive Groves', image: 'https://images.unsplash.com/photo-1642275964193-8b9a8523443b?w=600&h=300&fit=crop',
    waypoints: 4, duration: '1 day', difficulty: 'Easy', points: 310, travelers: 480, progress: 0,
    category: 'Culinary', mood: 'Hungry', tags: ['Olive', 'Traditional'],
    start: 'Olive Grove Harvest', end: 'Guesthouse Lunch with Fresh Oil' },

  { id: 13, title: 'Forest Soul Trail',
    hook: 'Hike through one of the Levant\'s last pine forests, spot roe deer at dusk, and sleep under the stars.',
    city: 'Ajloun', region: 'Ajloun Highland Trails', image: 'https://images.unsplash.com/photo-1747080303620-f314b55418d8?w=600&h=300&fit=crop',
    waypoints: 4, duration: '2 days', difficulty: 'Moderate', points: 240, travelers: 400, progress: 0,
    category: 'Nature', mood: 'Peaceful', tags: ['Hiking', 'Pine'],
    start: 'Ajloun Forest Main Trail', end: 'Woodland Lodge Night' },

  // ── JERASH ────────────────────────────────────────────────────────────────
  { id: 2,  title: "Hadrian's City",
    hook: 'Walk a colonnaded street worn smooth by 2,000 years of chariot wheels in the world\'s best-preserved Roman city.',
    city: 'Jerash', region: 'Roman Gerasa', image: jerashRomanRemainsImage,
    waypoints: 6, duration: '1 day', difficulty: 'Easy', points: 310, travelers: 1100, progress: 45,
    category: 'History', mood: 'Curious', tags: ['Roman', 'Columns'],
    start: "Hadrian's Arch", end: 'Hippodrome' },

  { id: 14, title: 'Living Jerash',
    hook: 'Discover the workshops, markets, and reservoir of a city still shaped by 2,000 years of continuous culture.',
    city: 'Jerash', region: 'Old City & Souk', image: 'https://images.unsplash.com/photo-1597814419713-99e2923951b6?w=600&h=300&fit=crop',
    waypoints: 4, duration: '1 day', difficulty: 'Easy', points: 220, travelers: 640, progress: 0,
    category: 'Local Culture', mood: 'Cultural', tags: ['Craft', 'Heritage'],
    start: 'Old City Souk', end: 'Craft Workshops Quarter' },

  { id: 15, title: 'Temples & Gods of Gerasa',
    hook: 'Read the city\'s conversion from pagan gods to the Christian faith written in stone, mosaic, and spolia.',
    city: 'Jerash', region: 'Sacred Jerash', image: 'https://images.unsplash.com/photo-1633788409811-c73f537c4afe?w=600&h=300&fit=crop',
    waypoints: 4, duration: '1 day', difficulty: 'Easy', points: 280, travelers: 720, progress: 0,
    category: 'History', mood: 'Curious', tags: ['Temple', 'Byzantine'],
    start: 'Temple of Zeus', end: 'Church of St. John the Baptist' },

  // ── AMMAN ─────────────────────────────────────────────────────────────────
  { id: 5,  title: "The Capital's Layers",
    hook: 'Climb a hilltop where Bronze Age walls, Roman temples, and Umayyad palaces share the same stone.',
    city: 'Amman', region: 'Amman Citadel & Old City', image: ammanCapitalImage,
    waypoints: 5, duration: '1 day', difficulty: 'Easy', points: 350, travelers: 1650, progress: 20,
    category: 'History', mood: 'Curious', tags: ['Citadel', 'Roman'],
    start: 'Amman Citadel (Jabal al-Qal\'a)', end: 'Jordan Museum' },

  { id: 16, title: 'Downtown Flavors',
    hook: 'Eat like an Ammanite: falafel at Hashem, kanafeh still warm from the wood oven, and fresh-ground za\'atar.',
    city: 'Amman', region: 'Al-Balad Old City', image: 'https://images.unsplash.com/photo-1787472472828-cbbd70310ec2?w=600&h=300&fit=crop',
    waypoints: 4, duration: '1 day', difficulty: 'Easy', points: 290, travelers: 1900, progress: 0,
    category: 'Culinary', mood: 'Hungry', tags: ['Falafel', 'Souk'],
    start: 'Al-Balad Old City Market', end: 'King Faisal Street & Sweet Shops' },

  { id: 17, title: 'Modern Soul of Amman',
    hook: 'Gallery-hop Jabal Weibdeh, browse Rainbow Street\'s bookshops, and find Jordan\'s creative heartbeat.',
    city: 'Amman', region: 'Jabal Weibdeh & Rainbow Street', image: 'https://images.unsplash.com/photo-1636587830808-8e7a6146d049?w=600&h=300&fit=crop',
    waypoints: 4, duration: '1 day', difficulty: 'Easy', points: 240, travelers: 1100, progress: 0,
    category: 'Art & Craft', mood: 'Cultural', tags: ['Art', 'Galleries'],
    start: 'Rainbow Street', end: 'Jabal Weibdeh Gallery Walk' },

  // ── DEAD SEA ──────────────────────────────────────────────────────────────
  { id: 8,  title: 'Lowest Place on Earth',
    hook: 'Float without effort at 430 metres below sea level — then wade the world\'s saltiest river canyon.',
    city: 'Dead Sea', region: 'Dead Sea Shoreline', image: deadSeaImage,
    waypoints: 4, duration: '2 days', difficulty: 'Easy', points: 240, travelers: 930, progress: 0,
    category: 'Nature', mood: 'Adventurous', tags: ['Salt', 'Float'],
    start: 'Dead Sea Shore Float', end: "Lot's Pillar Viewpoint" },

  { id: 18, title: 'Mud & Minerals',
    hook: 'Let 34% salinity mineral-rich mud do what clinics charge thousands for — right on the ancient shore.',
    city: 'Dead Sea', region: 'Dead Sea Resorts', image: 'https://images.unsplash.com/photo-1762254840019-ac371b4e5482?w=600&h=300&fit=crop',
    waypoints: 3, duration: '1 day', difficulty: 'Easy', points: 190, travelers: 1200, progress: 0,
    category: 'Wellness', mood: 'Peaceful', tags: ['Mud', 'Spa'],
    start: 'Dead Sea Mud Spa', end: 'Sunset at Amman Beach' },

  { id: 19, title: 'Sacred Valley',
    hook: "Stand where Jesus was baptised, trace the Lot narrative in a Byzantine mosaic inscription, and follow pilgrims across 1,600 years.",
    city: 'Dead Sea', region: "Baptism Site & Lot's Cave", image: 'https://images.unsplash.com/photo-1726001739725-cfd1902b2a2b?w=600&h=300&fit=crop',
    waypoints: 4, duration: '2 days', difficulty: 'Easy', points: 250, travelers: 670, progress: 0,
    category: 'Pilgrimage', mood: 'Spiritual', tags: ['Baptism', 'Biblical'],
    start: 'Bethany Beyond the Jordan', end: 'Deir Ain Abata Monastery' },

  // ── MADABA ────────────────────────────────────────────────────────────────
  { id: 9,  title: 'City of Mosaics',
    hook: 'Cut your own tesserae in the city where 6th-century artisans mapped the Holy Land in 2 million stone tiles.',
    city: 'Madaba', region: 'Madaba Old Town', image: madabaThreadImage,
    waypoints: 5, duration: '2–3 days', difficulty: 'Easy', points: 320, travelers: 680, progress: 0,
    category: 'Art & Craft', mood: 'Cultural', tags: ['Mosaic', 'Heritage'],
    start: "St. George's Church — Mosaic Map", end: 'Mosaic Making Workshop' },

  { id: 20, title: 'Holy Mountain Trail',
    hook: 'From the summit Moses saw the Promised Land — see it yourself, then descend to Herod\'s imprisoned prophet.',
    city: 'Madaba', region: 'Mount Nebo & Beyond', image: 'https://images.unsplash.com/photo-1720529955669-0e61ac7bf84c?w=600&h=300&fit=crop',
    waypoints: 4, duration: '1 day', difficulty: 'Easy', points: 280, travelers: 890, progress: 0,
    category: 'Pilgrimage', mood: 'Spiritual', tags: ['Moses', 'Biblical'],
    start: 'Mount Nebo — Moses Viewpoint', end: 'Mukawir (Machaerus)' },

  { id: 21, title: 'Springs & Hot Waters',
    hook: 'Immerse in 63°C mineral springs that Herod the Great bathed in — then follow the waterfall to the canyon floor.',
    city: 'Madaba', region: "Ma'in Hot Springs", image: 'https://images.unsplash.com/photo-1528625572934-f7a78011533e?w=600&h=300&fit=crop',
    waypoints: 3, duration: '1 day', difficulty: 'Easy', points: 220, travelers: 740, progress: 0,
    category: 'Wellness', mood: 'Peaceful', tags: ['HotSprings', 'Waterfall'],
    start: "Ma'in Hot Springs Resort", end: "Hammamat Ma'in Natural Pools" },

  // ── KARAK ─────────────────────────────────────────────────────────────────
  { id: 4,  title: 'Crusader Stronghold',
    hook: 'Walk the underground vaults of the fortress Saladin besieged twice — and trace Moabite kings beneath the castle.',
    city: 'Karak', region: 'Karak Castle & Plateau', image: karakThreadImage,
    waypoints: 4, duration: '1 day', difficulty: 'Easy', points: 190, travelers: 890, progress: 0,
    category: 'History', mood: 'Curious', tags: ['Crusaders', 'Castle'],
    start: 'Karak Castle (Crac des Moabites)', end: 'Karak Plateau Viewpoint' },

  { id: 22, title: 'Mansaf & Moab Flavors',
    hook: 'Learn to reconstitute jameed from scratch, cook the national dish, and eat it standing — the Bedouin way.',
    city: 'Karak', region: 'Karak City & Villages', image: karakMansafImage,
    waypoints: 4, duration: '1 day', difficulty: 'Easy', points: 230, travelers: 560, progress: 0,
    category: 'Culinary', mood: 'Hungry', tags: ['Mansaf', 'Honey'],
    start: 'Karak Central Market', end: 'Dhiban (Dibon) — Moabite Capital' },

  { id: 23, title: 'Wadi Canyon Adventure',
    hook: 'Wade a basalt canyon where a 20-metre thermal waterfall meets mineral-stained cliffs above the Moabite plateau.',
    city: 'Karak', region: 'Wadi Ibn Hammad', image: 'https://images.unsplash.com/photo-1670788050263-4c193ee10715?w=600&h=300&fit=crop',
    waypoints: 3, duration: '1 day', difficulty: 'Moderate', points: 200, travelers: 340, progress: 0,
    category: 'Adventure', mood: 'Adventurous', tags: ['Canyon', 'Waterfall'],
    start: 'Wadi Ibn Hammad Canyon', end: 'Dana Biosphere Reserve (North Edge)' },

  // ── MA'AN ─────────────────────────────────────────────────────────────────
  { id: 1,  title: 'The Seven World Wonder',
    hook: 'Step through the Siq at dawn and let 2,000-year-old rose-red stone introduce the Treasury in silence.',
    city: "Ma'an", region: "Petra · Rose-Red City", image: maanSevenWondersImage,
    waypoints: 5, duration: 'Multiple days', difficulty: 'Moderate–Strenuous', points: 420, travelers: 2400, progress: 72,
    category: 'History', mood: 'Curious', tags: ['UNESCO', 'Nabataean'],
    start: 'The Siq', end: 'Ad-Deir (The Monastery)' },

  { id: 24, title: 'Wadi Rum Adventure',
    hook: 'Sleep under the Milky Way in a Bedouin camp after watching the sandstone massifs turn blood-red at sunset.',
    city: "Ma'an", region: 'Wadi Rum Protected Area', image: 'https://images.unsplash.com/photo-1580204745408-9c18ddb64978?w=600&h=300&fit=crop',
    waypoints: 5, duration: '2 days', difficulty: 'Moderate', points: 380, travelers: 1800, progress: 0,
    category: 'Adventure', mood: 'Adventurous', tags: ['Desert', 'Bedouin'],
    start: 'Wadi Rum Visitor Gate', end: 'Bedouin Camp Under Stars' },

  { id: 25, title: 'Little Petra & Bedouin Life',
    hook: 'Find a free Nabataean siq with painted frescoes, a 9,000-year-old village, and Bedouin bread on an open fire.',
    city: "Ma'an", region: 'Siq al-Barid & Al-Beidha', image: 'https://images.unsplash.com/photo-1709912151516-6d2834866c5b?w=600&h=300&fit=crop',
    waypoints: 4, duration: '1 day', difficulty: 'Easy', points: 270, travelers: 820, progress: 0,
    category: 'Local Culture', mood: 'Cultural', tags: ['Neolithic', 'Bedouin'],
    start: 'Little Petra (Siq al-Barid)', end: 'Camel Ride through Wadi Araba' },

  // ── AL-AQABA ──────────────────────────────────────────────────────────────
  { id: 3,  title: 'Bride of the Red Sea',
    hook: 'Drift over the Red Sea\'s healthiest reef system — where 20+ metres of visibility reveals a world unchanged.',
    city: 'Al-Aqaba', region: 'Aqaba Marine Park', image: aqabaBrideImage,
    waypoints: 4, duration: '4 days', difficulty: 'Moderate', points: 280, travelers: 3200, progress: 0,
    category: 'Adventure', mood: 'Adventurous', tags: ['Diving', 'Reef'],
    start: 'Aqaba Marine Park', end: 'Saudi Border Coral Gardens' },

  { id: 26, title: 'Port of History',
    hook: 'Walk from one of Islam\'s first planned cities to the Mamluk fort that T.E. Lawrence captured in an afternoon.',
    city: 'Al-Aqaba', region: 'Aqaba Historic Quarter', image: 'https://images.unsplash.com/photo-1649809014061-5f0f5d894e0d?w=600&h=300&fit=crop',
    waypoints: 4, duration: '1 day', difficulty: 'Easy', points: 240, travelers: 690, progress: 0,
    category: 'History', mood: 'Curious', tags: ['Islamic', 'Port'],
    start: 'Aqaba Fort (Mamluk Castle)', end: 'Aqaba Fish Market & Port' },

  { id: 27, title: 'Desert to Sea',
    hook: 'Journey from the red sands of Wadi Rum to the turquoise Gulf of Aqaba — from starlight to sunrise on water.',
    city: 'Al-Aqaba', region: 'Wadi Rum → Gulf of Aqaba', image: 'https://images.unsplash.com/photo-1649808770884-1ffb672bcb77?w=600&h=300&fit=crop',
    waypoints: 3, duration: '2 days', difficulty: 'Moderate', points: 210, travelers: 510, progress: 0,
    category: 'Adventure', mood: 'Adventurous', tags: ['Route', 'Sunset'],
    start: 'Wadi Rum Desert Departure', end: 'South Beach Camping & Snorkeling' },
]

// Coordinates mapped to viewBox="0 0 628 512" matching jordan-map-new.png
const cities = [
  { id: 'Irbid',    label: 'Irbid',    x: 132, y: 118, labelSide: 'right', labelDy: -16 },
  { id: 'Ajloun',   label: 'Ajloun',   x: 106, y: 162, labelSide: 'right', labelDy: -18 },
  { id: 'Jerash',   label: 'Jerash',   x: 162, y: 165, labelSide: 'right', labelDy: 8   },
  { id: 'Amman',    label: 'Amman',    x: 182, y: 215, labelSide: 'right', labelDy: -11 },
  { id: 'Dead Sea', label: 'Dead Sea', x: 96,  y: 240, labelSide: 'right', labelDy: -18 },
  { id: 'Madaba',   label: 'Madaba',   x: 148, y: 265, labelSide: 'right', labelDy: 8   },
  { id: 'Karak',    label: 'Karak',    x: 132, y: 332, labelSide: 'right', labelDy: -16 },
  { id: "Ma'an",    label: "Ma'an",    x: 165, y: 418, labelSide: 'right', labelDy: -5  },
  { id: 'Al-Aqaba', label: 'Al-Aqaba', x: 100, y: 482, labelSide: 'right', labelDy: -18 },
]

const moodEmoji: Record<string, string> = {
  Adventurous: '⚡',
  Curious: '🏛️',
  Peaceful: '🌿',
  Hungry: '🍽️',
  Cultural: '🎨',
  Spiritual: '✝️',
}

const difficultyColor: Record<string, string> = {
  Easy: '#6B8E23',
  Moderate: '#D98A6C',
  'Easy–Moderate': '#C5A028',
  'Moderate–Strenuous': '#B05A2A',
  Strenuous: '#8B2A2A',
}

export default function ThreadsLibrary({ navigate }: Props) {
  const [activeCategory, setActiveCategory] = useState('All')
const [searchQuery, setSearchQuery]       = useState('')
  const [selectedCity, setSelectedCity]     = useState<string | null>(null)

  const match = (t: typeof threads[0]) =>
    (activeCategory === 'All' || t.category === activeCategory) &&
    (t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     t.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
     t.hook.toLowerCase().includes(searchQuery.toLowerCase()))

  const cityThreads  = selectedCity ? threads.filter(t => t.city === selectedCity && match(t)) : []
  const totalFiltered = threads.filter(match)

  return (
    <div style={{ backgroundColor: '#F9F7F3', minHeight: '100vh' }}>
      <Nav navigate={navigate} currentPage="discover" />

      <div className="pt-24 pb-8 px-10 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-2" style={{ color: '#D98A6C' }}>
          <div className="w-5 h-px" style={{ backgroundColor: '#D98A6C' }} />
          <span className="text-xs font-body font-medium tracking-widest uppercase">Thread Library</span>
        </div>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-4xl font-semibold" style={{ color: '#2C2417' }}>Discover Threads</h1>
          <p className="font-body text-sm" style={{ color: '#8A7B6B' }}>{totalFiltered.length} threads found</p>
        </div>
      </div>

      <div className="px-10 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-12 gap-8">

          {/* ── Sidebar ── */}
          <aside className="col-span-3">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8A7B6B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search threads..." value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-body outline-none"
                  style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', color: '#2C2417' }} />
              </div>
            </div>

            {/* Category filter */}
            <div className="p-5 rounded-2xl" style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0' }}>
              <h3 className="font-body font-semibold text-sm mb-4 uppercase tracking-wide" style={{ color: '#2C2417' }}>Category</h3>
              <div className="flex flex-col gap-1.5">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-body font-medium transition-all text-left"
                    style={activeCategory === cat ? { backgroundColor: '#D98A6C', color: 'white' } : { color: '#2C2417' }}>
                    <span>{cat}</span>
                    <span className="text-xs" style={{ color: activeCategory === cat ? 'rgba(255,255,255,0.7)' : '#8A7B6B' }}>
                      {cat === 'All' ? threads.length : threads.filter(t => t.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Main area: Map + Cards ── */}
          <main className="col-span-9">
            <div className="flex gap-6 items-start">

              {/* ── Jordan Map ── */}
              <div className="relative rounded-3xl overflow-hidden flex-shrink-0 transition-all duration-500"
                style={{
                  width: selectedCity ? '52%' : '100%',
                  background: '#F4EFE6', border: '1px solid #D8CDB8',
                  boxShadow: '0 6px 32px rgba(44,36,23,0.10)',
                }}>
                <img src={jordanMapImg} alt="Jordan map" style={{ width: '100%', display: 'block', opacity: 0.92 }} draggable={false} />

                <svg viewBox="0 0 628 512" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <text x="22" y="32" fontSize="14" fontFamily="Fraunces,serif" fontWeight="700" fill="#2C2417" opacity="0.85">Jordan</text>
                  <text x="22" y="46" fontSize="7.5" fontFamily="Outfit,sans-serif" fill="#8A7B6B" letterSpacing="0.1em">TAP A CITY TO EXPLORE</text>

                  {cities.map(city => {
                    const isSelected = selectedCity === city.id
                    const right = city.labelSide === 'right'
                    const labelW = city.label.length * 6.2 + 10
                    const labelX = right ? city.x + 14 : city.x - 14 - labelW
                    const labelY = city.y - 11 + city.labelDy
                    const threadCount = threads.filter(t => t.city === city.id && match(t)).length

                    return (
                      <g key={city.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedCity(isSelected ? null : city.id)}>
                        {isSelected && (
                          <circle cx={city.x} cy={city.y} r="16" fill="#D98A6C" opacity="0.15">
                            <animate attributeName="r" values="12;20;12" dur="1.8s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.18;0.04;0.18" dur="1.8s" repeatCount="indefinite" />
                          </circle>
                        )}
                        <rect x={labelX} y={labelY} width={labelW} height={15} rx="4"
                          fill="rgba(253,252,250,0.94)" stroke={isSelected ? '#D98A6C' : '#CCC0A8'} strokeWidth="0.8" />
                        <text x={labelX + labelW / 2} y={labelY + 10} textAnchor="middle" fontSize="8"
                          fontFamily="Outfit,sans-serif" fontWeight={isSelected ? '700' : '600'}
                          fill={isSelected ? '#D98A6C' : '#3A2810'} letterSpacing="0.02em">
                          {city.label}
                        </text>
                        <circle cx={city.x} cy={city.y} r="8" fill={isSelected ? '#D98A6C' : '#6B8E23'} />
                        <text x={city.x} y={city.y + 3.5} textAnchor="middle" fontSize="7" fontFamily="Outfit,sans-serif" fontWeight="700" fill="white">
                          {threadCount}
                        </text>
                      </g>
                    )
                  })}

                  <g transform="translate(600,490)">
                    <circle cx="0" cy="0" r="13" fill="rgba(253,252,250,0.92)" stroke="#CCC0A8" strokeWidth="0.8" />
                    <path d="M0,-10 L2.5,0 L0,3.5 L-2.5,0 Z" fill="#D98A6C" />
                    <path d="M0,10 L2.5,0 L0,3.5 L-2.5,0 Z" fill="#B0A090" />
                    <text x="0" y="-12" textAnchor="middle" fontSize="6" fontFamily="Outfit,sans-serif" fontWeight="700" fill="#3A2810">N</text>
                  </g>
                </svg>

                {selectedCity && (
                  <button onClick={() => setSelectedCity(null)}
                    className="absolute top-4 right-4 text-xs font-body font-medium px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: 'rgba(253,252,250,0.94)', border: '1px solid #D8CDB8', color: '#D98A6C' }}>
                    ← All cities
                  </button>
                )}
              </div>

              {/* ── Thread cards panel ── */}
              {selectedCity && (
                <div className="flex-1 overflow-y-auto" style={{ maxHeight: '660px' }}>
                  <div className="mb-5">
                    <p className="text-xs font-body font-medium uppercase tracking-widest mb-1" style={{ color: '#D98A6C' }}>
                      {cities.find(c => c.id === selectedCity)?.label}
                    </p>
                    <h2 className="font-display text-xl font-semibold" style={{ color: '#2C2417' }}>
                      {cityThreads.length} Thread{cityThreads.length !== 1 ? 's' : ''} Available
                    </h2>
                  </div>

                  {cityThreads.length === 0 ? (
                    <div className="text-center py-12 rounded-2xl" style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0' }}>
                      <p className="font-body text-sm" style={{ color: '#8A7B6B' }}>No threads match your current filters.</p>
                      <button onClick={() => setActiveCategory('All')}
                        className="mt-3 text-xs font-body font-medium" style={{ color: '#D98A6C' }}>
                        Clear filters
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {cityThreads.map(thread => (
                        <div key={thread.id} onClick={() => navigate('thread', thread.id)}
                          className="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5"
                          style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', boxShadow: '0 2px 12px rgba(44,36,23,0.05)' }}>

                          {/* Image */}
                          <div className="relative overflow-hidden h-36">
                            <img src={typeof thread.image === 'string' ? thread.image : (thread.image as string)}
                              alt={thread.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,36,23,0.5) 0%, transparent 60%)' }} />
                            {/* Category + mood badges */}
                            <div className="absolute top-3 left-3 flex gap-1.5">
                              <span className="text-xs font-body px-2 py-0.5 rounded-full font-medium"
                                style={{ backgroundColor: 'rgba(249,247,243,0.92)', color: '#D98A6C' }}>
                                {thread.category}
                              </span>
                              <span className="text-xs font-body px-2 py-0.5 rounded-full font-medium"
                                style={{ backgroundColor: 'rgba(44,36,23,0.72)', color: 'rgba(255,255,255,0.9)' }}>
                                {moodEmoji[thread.mood]} {thread.mood}
                              </span>
                            </div>
                            {/* Difficulty badge */}
                            <div className="absolute top-3 right-3">
                              <span className="text-xs font-body px-2 py-0.5 rounded-full font-semibold"
                                style={{ backgroundColor: 'rgba(249,247,243,0.92)', color: difficultyColor[thread.difficulty] ?? '#6B8E23' }}>
                                {thread.difficulty}
                              </span>
                            </div>
                            {/* Progress bar */}
                            {thread.progress > 0 && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: 'rgba(107,142,35,0.3)' }}>
                                <div className="h-full" style={{ width: `${thread.progress}%`, backgroundColor: '#6B8E23' }} />
                              </div>
                            )}
                          </div>

                          {/* Card body */}
                          <div className="p-4">
                            <h3 className="font-display text-sm font-semibold mb-1" style={{ color: '#2C2417' }}>{thread.title}</h3>
                            {/* Story hook */}
                            <p className="text-xs font-body mb-3 leading-relaxed" style={{ color: '#6B5E50' }}>{thread.hook}</p>

                            {/* Stats row */}
                            <div className="flex items-center gap-3 text-xs font-body mb-3" style={{ color: '#8A7B6B' }}>
                              <span>⊕ {thread.waypoints} stops</span>
                              <span>⏱ {thread.duration}</span>
                              <span className="ml-auto font-semibold" style={{ color: '#6B8E23' }}>+{thread.points} pts</span>
                            </div>

                            {/* Start → End */}
                            <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg" style={{ backgroundColor: '#F4EFE6', border: '1px solid #E0D5C2' }}>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-body" style={{ color: '#8A7B6B' }}>Start</p>
                                <p className="text-xs font-body font-medium truncate" style={{ color: '#2C2417' }}>{thread.start}</p>
                              </div>
                              <div className="text-xs flex-shrink-0 px-1" style={{ color: '#C9BDA8' }}>→</div>
                              <div className="flex-1 min-w-0 text-right">
                                <p className="text-xs font-body" style={{ color: '#8A7B6B' }}>End</p>
                                <p className="text-xs font-body font-medium truncate" style={{ color: '#2C2417' }}>{thread.end}</p>
                              </div>
                            </div>

                            {/* Progress bar (in-card, if active) */}
                            {thread.progress > 0 && (
                              <div className="mb-3">
                                <div className="flex justify-between text-xs font-body mb-1" style={{ color: '#8A7B6B' }}>
                                  <span>Progress</span><span>{thread.progress}%</span>
                                </div>
                                <div className="h-1.5 rounded-full" style={{ backgroundColor: '#E8E0D0' }}>
                                  <div className="h-full rounded-full" style={{ width: `${thread.progress}%`, backgroundColor: '#6B8E23' }} />
                                </div>
                              </div>
                            )}

                            <button onClick={e => { e.stopPropagation(); navigate('thread', thread.id) }}
                              className="w-full py-2 rounded-full text-xs font-body font-semibold"
                              style={thread.progress > 0
                                ? { backgroundColor: '#6B8E23', color: 'white' }
                                : { backgroundColor: 'transparent', color: '#2C2417', border: '1px solid #E8E0D0' }}>
                              {thread.progress > 0 ? 'Continue Thread →' : 'View Thread →'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
