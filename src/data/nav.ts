export interface NavLink {
  label: string
  href: string
}

/** Anchor-based navigation for the single-page premium homepage. */
export const navLinks: NavLink[] = [
  { label: 'Coach', href: '#coach' },
  { label: 'Schools', href: '#schools' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Locations', href: '#branches' },
  { label: 'FAQ', href: '#faq' },
]
