export interface NavLink {
  label: string
  href: string
  /** True for a react-router route (e.g. /gallery); otherwise a homepage anchor. */
  route?: boolean
}

/** Navigation for the single-page homepage (+ a couple of dedicated pages). */
export const navLinks: NavLink[] = [
  { label: 'Coaches', href: '/coaches', route: true },
  { label: 'Schools', href: '#schools' },
  { label: 'Gallery', href: '/gallery', route: true },
  { label: 'Locations', href: '#branches' },
  { label: 'FAQ', href: '#faq' },
]
