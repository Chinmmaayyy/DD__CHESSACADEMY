import type { Course } from '@/types'

export const courses: Course[] = [
  {
    slug: 'beginner',
    title: 'Beginner',
    level: 'Level 1 · Foundations',
    ageGroup: '5 years & above',
    duration: 'Flexible batches',
    description:
      'Perfect for students who are completely new to chess. We build a joyful, rock-solid foundation.',
    topics: [
      'Rules & piece movement',
      'Check, checkmate & stalemate',
      'Basic tactics & captures',
      'Opening principles',
    ],
    outcome: 'Students confidently play complete games from start to finish.',
  },
  {
    slug: 'intermediate',
    title: 'Intermediate',
    level: 'Level 2 · Competitive',
    ageGroup: '7 years & above',
    duration: 'Flexible batches',
    description:
      'Develop tactical awareness and positional understanding to step confidently into tournaments.',
    topics: [
      'Tactics & combinations',
      'Strategy & positional play',
      'Middlegame planning',
      'Essential endgames',
    ],
    outcome: 'Tournament readiness with a structured, competitive mindset.',
    recommended: true,
  },
  {
    slug: 'advanced',
    title: 'Advanced',
    level: 'Level 3 · Mastery',
    ageGroup: 'By assessment',
    duration: 'Flexible batches',
    description:
      'Tournament preparation, deep calculation and game analysis for serious competitive players.',
    topics: [
      'Opening repertoire',
      'Deep calculation',
      'Advanced endgames',
      'Game analysis & tournament prep',
    ],
    outcome: 'Measurable competitive improvement and rating growth.',
  },
]
