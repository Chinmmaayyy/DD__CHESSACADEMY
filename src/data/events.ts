import type { AcademyEvent } from '@/types'
import evtRapid from '@/assets/gallery_1.jpg'
import evtCamp from '@/assets/gallery_6.jpeg'
import evtChampionship from '@/assets/gallery_11.jpeg'

/**
 * Upcoming events — update from the academy calendar.
 * `image` is a banner asset; replace with an AI-generated or event-specific image.
 */
export const events: AcademyEvent[] = [
  {
    title: 'Academy Rapid Open',
    date: 'Aug 2026',
    venue: 'SMV Art Hub, Dombivli',
    format: 'Rapid · All levels',
    description:
      'An in-house rapid tournament giving every student real competitive experience in a friendly setting.',
    status: 'upcoming',
    image: evtRapid,
  },
  {
    title: 'Summer Chess Camp',
    date: 'May 2026',
    venue: 'Multiple centres',
    format: 'Workshop · Beginners welcome',
    description:
      'A two-week intensive camp covering tactics, endgames and plenty of practice games.',
    status: 'upcoming',
    image: evtCamp,
  },
  {
    title: 'Inter-Academy Championship',
    date: 'Sep 2026',
    venue: 'Dombivli',
    format: 'Classical · Rated',
    description:
      'Our flagship rated event where students test their skills against players from across the region.',
    status: 'upcoming',
    image: evtChampionship,
  },
]
