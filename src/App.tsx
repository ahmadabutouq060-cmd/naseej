import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import ThreadsLibrary from './pages/ThreadsLibrary'
import ActiveThread from './pages/ActiveThread'
import PlaceDetails from './pages/PlaceDetails'
import UserProfile from './pages/UserProfile'

export type Page = 'home' | 'discover' | 'thread' | 'place' | 'profile'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [currentThreadId, setCurrentThreadId] = useState<number | null>(null)
  const [currentWaypointId, setCurrentWaypointId] = useState<number | null>(null)

  const navigate = (page: Page, threadId?: number, waypointId?: number) => {
    if (threadId !== undefined) setCurrentThreadId(threadId)
    if (waypointId !== undefined) setCurrentWaypointId(waypointId)
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F7F3' }}>
      {currentPage === 'home'     && <LandingPage navigate={navigate} />}
      {currentPage === 'discover' && <ThreadsLibrary navigate={navigate} />}
      {currentPage === 'thread'   && <ActiveThread navigate={navigate} threadId={currentThreadId} />}
      {currentPage === 'place'    && <PlaceDetails navigate={navigate} threadId={currentThreadId} waypointId={currentWaypointId} />}
      {currentPage === 'profile'  && <UserProfile navigate={navigate} />}
    </div>
  )
}
