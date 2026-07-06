import dipak from '@/assets/dipak_sir.png'

export interface Instructor {
  name: string
  title: string
  blurb: string
  /** Imported photo asset. Falls back to an initial avatar if omitted. */
  photo?: string
  tags?: string[]
}

/**
 * The coaching team.
 * NOTE: Entries after the first are PLACEHOLDERS — replace the names, titles,
 * blurbs and add photos (drop files in src/assets) with the real instructors.
 */
export const instructors: Instructor[] = [
  {
    name: 'Dipak Dhuri',
    title: 'Founder & Head Coach',
    blurb:
      'National Arbiter & FIDE Trainer with over 20 years of experience, leading the academy and its curriculum. Coaches in Hindi, Marathi and English.',
    photo: dipak,
    tags: ['National Arbiter', 'FIDE Trainer'],
  },
  {
    name: 'Assistant Coach',
    title: 'Chess Instructor',
    blurb:
      'Guides beginner and intermediate batches with patience and a structured, student-first approach. (Placeholder — share details to finalise.)',
    tags: ['Coaching'],
  },
  {
    name: 'Assistant Coach',
    title: 'Chess Instructor',
    blurb:
      'Supports tournament preparation and small-group practice sessions. (Placeholder — share details to finalise.)',
    tags: ['Coaching'],
  },
]
