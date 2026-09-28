import { Page } from '../App'

const logoIcon = '/assets/9920d.png'
const logoText = '/assets/92fb6.png'

interface NavProps {
  navigate: (page: Page, threadId?: number, waypointId?: number) => void
  currentPage: Page
}

export default function Nav({ navigate, currentPage }: NavProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4"
      style={{ backgroundColor: 'rgba(249, 247, 243, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E8E0D0' }}
    >
      <button
        onClick={() => navigate('home')}
        className="flex items-center gap-3 group"
      >
        <img src={logoIcon} alt="Naseej emblem" style={{ width: 39, height: 34, objectFit: 'contain' }} />
        <img src={logoText} alt="Naseej" style={{ width: 74, height: 34, objectFit: 'contain' }} />
      </button>

      <div className="flex items-center gap-8">
        {[
          { label: 'Home', page: 'home' as Page },
          { label: 'Discover', page: 'discover' as Page },
          { label: 'Threads', page: 'thread' as Page },
          { label: 'Community', page: 'profile' as Page },
        ].map(({ label, page }) => (
          <button
            key={label}
            onClick={() => navigate(page)}
            className="text-sm font-medium transition-colors"
            style={{ color: currentPage === page ? '#D98A6C' : '#2C2417' }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          className="text-sm font-medium px-5 py-2 rounded-full transition-all"
          style={{ color: '#2C2417', border: '1px solid #C9BDA8' }}
          onClick={() => navigate('profile')}
        >
          Sign In
        </button>
        <button
          className="text-sm font-medium px-5 py-2 rounded-full transition-all"
          style={{ backgroundColor: '#6B8E23', color: 'white' }}
          onClick={() => navigate('discover')}
        >
          Start Naseej
        </button>
      </div>
    </nav>
  )
}
