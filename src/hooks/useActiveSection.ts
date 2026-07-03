import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently in view (scroll-spy).
 * Pass the list of anchor hrefs (e.g. "#coach") — returns the active id.
 */
export function useActiveSection(hrefs: string[]): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = hrefs.map((h) => h.replace('#', ''))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [hrefs])

  return active
}
