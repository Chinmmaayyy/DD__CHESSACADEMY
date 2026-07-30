import { Camera, Globe, Play, Phone, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoMark from '@/assets/logo-mark.png'
import { Container } from '@/components/ui/Container'
import { navLinks } from '@/data/nav'
import { branches } from '@/data/branches'
import { ACADEMY } from '@/lib/constants'
import { telLink } from '@/lib/utils'

export function Footer() {
  const year = 2026

  return (
    <footer className="bg-inverse text-inverse-content/70">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 items-center rounded-lg bg-white px-2">
                <img src={logoMark} alt="DD Chess Academy logo" className="h-7 w-auto" />
              </span>
              <span className="font-display text-lg font-semibold text-white">
                DD Chess Academy
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {ACADEMY.shortDescription}
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Camera, href: ACADEMY.social.instagram, label: 'Instagram' },
                { icon: Globe, href: ACADEMY.social.facebook, label: 'Facebook' },
                { icon: Play, href: ACADEMY.social.youtube, label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-lg border border-white/10 text-white/70 transition-colors hover:border-gold-500/50 hover:text-gold-400"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-base font-semibold text-white">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  {l.route ? (
                    <Link to={l.href} className="transition-colors hover:text-gold-400">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={`/${l.href}`} className="transition-colors hover:text-gold-400">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
              <li>
                <Link to="/blog" className="transition-colors hover:text-gold-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/learn" className="transition-colors hover:text-gold-400">
                  Play &amp; Learn
                </Link>
              </li>
              <li>
                <a href="/#contact" className="transition-colors hover:text-gold-400">
                  Enquire
                </a>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h4 className="font-display text-base font-semibold text-white">Chess Classes In</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: 'Dombivli', to: '/chess-classes-dombivli' },
                { label: 'Kalyan', to: '/chess-classes-kalyan' },
                { label: 'Thakurli', to: '/chess-classes-thakurli' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-gold-400">
                    Chess Classes in {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-6 font-display text-base font-semibold text-white">Locations</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {branches.map((b) => (
                <li key={`${b.name}-${b.area}`} className="flex gap-2">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold-500/70" />
                  <span>
                    {b.name}
                    {b.area ? `, ${b.area}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={telLink(ACADEMY.phoneRaw)}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold-400"
                >
                  <Phone className="size-4 text-gold-500/70" />
                  {ACADEMY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ACADEMY.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold-400"
                >
                  <Mail className="size-4 text-gold-500/70" />
                  {ACADEMY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {year} DD Chess Academy. All Rights Reserved.</p>
          <p>National Arbiter · FIDE Trainer · FIDE ID 25061305</p>
        </div>
      </Container>
    </footer>
  )
}
