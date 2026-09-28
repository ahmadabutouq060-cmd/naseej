const fs = require('fs')

const A = 'assets/'
const local = {
  irbidBrideImage: A + 'irbid-bride-of-the-north.jpg',
  ajlounThreadImage: A + 'ajloun-thread.jpg',
  jerashRomanRemainsImage: A + 'jerash-roman-remains.jpg',
  ammanCapitalImage: A + 'amman-the-capital.jpg',
  karakThreadImage: A + 'karak-thread.jpg',
  maanSevenWondersImage: A + 'maan-seven-wonders.jpg',
  aqabaBrideImage: A + 'aqaba-bride-of-red-sea.jpg',
  deadSeaImage: A + 'dead-sea-lowest-place.jpg',
  madabaThreadImage: A + 'madaba-thread.jpg',
  karakMansafImage: A + 'karak-mansaf.jpg',
}

const lib = fs.readFileSync('src/pages/ThreadsLibrary.tsx', 'utf8').replace(/\r\n/g, '\n')
const threadsMatch = lib.match(/const threads = \[([\s\S]*?)\]\n\n\/\//)
if (!threadsMatch) throw new Error('threads not found')
let threadsBody = threadsMatch[1]
for (const [k, v] of Object.entries(local)) {
  threadsBody = threadsBody.replaceAll(k, JSON.stringify(v))
}

const citiesMatch = lib.match(/const cities = \[([\s\S]*?)\]\n\n/)
if (!citiesMatch) throw new Error('cities not found')

let td = fs.readFileSync('src/data/threadData.ts', 'utf8').replace(/\r\n/g, '\n')
td = td.replace(/^\/\/ Shared thread data[^\n]*\n\n/, '')
td = td.replace(/export type WpStatus[^\n]+\n\n/, '')
td = td.replace(/export interface Waypoint \{[\s\S]*?\}\n\n/, '')
td = td.replace(/export interface ThreadDef \{[\s\S]*?\}\n\n/, '')
td = td.replace('export const threadData: Record<number, ThreadDef>', 'const threadData')
td = td.replace(/const p = \(id: string\)/, 'const p = (id)')

const out = `/* Migrated from src/data/threadData.ts and src/pages/ThreadsLibrary.tsx */
${td}

const categories = ['All', 'Adventure', 'History', 'Nature', 'Culinary', 'Wellness', 'Local Culture', 'Pilgrimage', 'Art & Craft']

const libraryThreads = [${threadsBody}]

const cities = [${citiesMatch[1]}]

const moodEmoji = {
  Adventurous: '⚡',
  Curious: '🏛️',
  Peaceful: '🌿',
  Hungry: '🍽️',
  Cultural: '🎨',
  Spiritual: '✝️',
}

const difficultyColor = {
  Easy: '#6B8E23',
  Moderate: '#D98A6C',
  'Easy–Moderate': '#C5A028',
  'Moderate–Strenuous': '#B05A2A',
  Strenuous: '#8B2A2A',
}

const featuredThreads = [
  {
    id: 1,
    title: 'The Seven World Wonder',
    subtitle: "Petra & Ma'an",
    image: ${JSON.stringify(local.maanSevenWondersImage)},
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
    image: ${JSON.stringify(local.deadSeaImage)},
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
    image: ${JSON.stringify(local.madabaThreadImage)},
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

const ASSETS = {
  logoIcon: ${JSON.stringify(A + '9920d.png')},
  logoText: ${JSON.stringify(A + '92fb6.png')},
  petraHero: ${JSON.stringify(A + 'petra-hero.jpg')},
  jordanMap: ${JSON.stringify(A + 'jordan-map-new.png')},
  maan: ${JSON.stringify(local.maanSevenWondersImage)},
  ajloun: ${JSON.stringify(local.ajlounThreadImage)},
  madaba: ${JSON.stringify(local.madabaThreadImage)},
}
`

fs.mkdirSync('vanilla/js', { recursive: true })
fs.mkdirSync('vanilla/css', { recursive: true })
fs.writeFileSync('vanilla/js/data.js', out)
const libraryThreads = eval('[' + threadsBody + ']')
console.log('wrote vanilla/js/data.js bytes', out.length)
console.log('library thread count', libraryThreads.length)
console.log('threadData keys', (td.match(/^\s+\d+:/gm) || []).length)
