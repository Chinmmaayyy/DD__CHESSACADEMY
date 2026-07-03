import { Medal, Award, Star, Crown } from 'lucide-react'
import type { Achievement } from '@/types'

/** Placeholder milestones — replace with real student achievements. */
export const achievements: Achievement[] = [
  {
    title: 'Tournament Medallists',
    detail: 'Students placing at district & inter-school competitions',
    year: '2025',
    icon: Medal,
  },
  {
    title: 'Rated Players Developed',
    detail: 'Beginners guided to their first FIDE rating',
    year: '2025',
    icon: Star,
  },
  {
    title: 'Inter-School Champions',
    detail: 'Podium finishes across multiple age categories',
    year: '2024',
    icon: Crown,
  },
  {
    title: 'Certificates Awarded',
    detail: 'Level completion recognised for every graduate',
    year: 'Ongoing',
    icon: Award,
  },
]
