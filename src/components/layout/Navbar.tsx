import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Crown, Gamepad2 } from 'lucide-react'
import { navLinks } from '@/data/nav'
import { ACADEMY, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants'
import { whatsappLink, cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'
import { useActiveSection } from '@/hooks/useActiveSection'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const anchorHrefs = navLinks.map((l) => l.href)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(anchorHrefs)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const wa = whatsappLink(ACADEMY.whatsapp, WHATSAPP_DEFAULT_MESSAGE)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-hairline/80 bg-canvas/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4 lg:h-20 lg:gap-8">
        {/* Logo */}
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="DD Chess Academy home">
          <span className="grid size-9 place-items-center rounded-[10px] bg-gold-500 text-navy-900">
            <Crown className="size-5" strokeWidth={2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold text-heading">
              DD Chess Academy
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
              National Arbiter · FIDE Trainer
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace('#', '')
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors hover:text-accent',
                    isActive ? 'text-accent' : 'text-content',
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gold-500"
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
          <Link
            to="/learn"
            className="flex items-center gap-1.5 text-sm font-semibold text-heading transition-colors hover:text-accent"
          >
            <Gamepad2 className="size-4" />
            Play &amp; Learn
          </Link>
          <ThemeToggle />
          <Button as="a" href={wa} size="sm" target="_blank" rel="noopener noreferrer">
            Book Free Demo
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            className="grid size-10 place-items-center rounded-lg text-heading transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="border-t border-hairline bg-canvas lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-content hover:bg-surface-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/learn"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold text-accent hover:bg-surface-2"
                >
                  <Gamepad2 className="size-5" />
                  Play &amp; Learn
                </Link>
              </li>
              <li className="mt-3 flex flex-col gap-3">
                <Button as="a" href={wa} target="_blank" rel="noopener noreferrer">
                  Book Free Demo
                </Button>
                <Button as="a" href="#contact" variant="outline" onClick={() => setOpen(false)}>
                  Enquire Now
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
