import { Crown, Camera, Globe, Play, Phone, Mail, MapPin } from 'lucide-react'
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
              <span className="grid size-9 place-items-center rounded-[10px] bg-gold-500 text-navy-900">
                <Crown className="size-5" strokeWidth={2} />
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
                  <a href={l.href} className="transition-colors hover:text-gold-400">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="transition-colors hover:text-gold-400">
                  Enquire
                </a>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h4 className="font-display text-base font-semibold text-white">Locations</h4>
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
