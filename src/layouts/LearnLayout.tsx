import { Link, NavLink, Outlet } from 'react-router-dom'
import { Crown, ArrowLeft, Puzzle, LibraryBig, Bot, Grid3x3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const learnNav = [
  { to: '/learn/puzzles', label: 'Puzzles', icon: Puzzle },
  { to: '/learn/library', label: 'Library', icon: LibraryBig },
  { to: '/learn/play', label: 'Play', icon: Bot },
  { to: '/learn/board', label: 'Board', icon: Grid3x3 },
]

export function LearnLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-inverse text-inverse-content">
      {/* Learn header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-900/85 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5" aria-label="DD Chess Academy home">
              <span className="grid size-9 place-items-center rounded-[10px] bg-gold-500 text-navy-900">
                <Crown className="size-5" strokeWidth={2} />
              </span>
              <span className="hidden font-display text-base font-semibold text-white sm:block">
                DD Chess · Play
              </span>
            </Link>
          </div>

          <nav className="flex items-center gap-1">
            {learnNav.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-white/10 text-gold-400'
                        : 'text-white/70 hover:bg-white/5 hover:text-white',
                    )
                  }
                >
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              )
            })}
          </nav>

          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-gold-400"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to site</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
