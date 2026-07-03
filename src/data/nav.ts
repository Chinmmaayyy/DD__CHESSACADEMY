export interface NavLink {
  label: string
  href: string
}

/** Anchor-based navigation for the single-page premium homepage. */
export const navLinks: NavLink[] = [
  { label: 'Coach', href: '#coach' },
  { label: 'Courses', href: '#courses' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Locations', href: '#branches' },
  { label: 'FAQ', href: '#faq' },
]
