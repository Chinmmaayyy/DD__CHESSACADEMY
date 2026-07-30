import { Link, NavLink, Outlet } from 'react-router-dom'
import { ArrowLeft, Puzzle, LibraryBig, Bot, Grid3x3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import logoSvg from '@/assets/logo.svg'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const learnNav = [
  { to: '/learn/puzzles', label: 'Puzzles', icon: Puzzle },
  { to: '/learn/library', label: 'Library', icon: LibraryBig },
  { to: '/learn/play', label: 'Play', icon: Bot },
  { to: '/learn/board', label: 'Board', icon: Grid3x3 },
]

export function LearnLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-content">
      {/* Learn header */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5" aria-label="DD Chess Academy home">
              <span className="flex h-9 items-center overflow-hidden rounded-lg bg-white px-1.5 ring-1 ring-black/10">
                <img src={logoSvg} alt="DD Chess Academy logo" className="h-6 w-auto" />
              </span>
              <span className="hidden font-display text-base font-semibold text-heading sm:block">
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
                        ? 'bg-surface-2 text-accent'
                        : 'text-muted hover:bg-surface-2 hover:text-heading',
                    )
                  }
                >
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back to site</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
