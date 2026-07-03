import {
  Route,
  UserCheck,
  Swords,
  Users,
  MapPinned,
  Sparkles,
} from 'lucide-react'
import type { Feature } from '@/types'

export const features: Feature[] = [
  {
    icon: Route,
    title: 'Structured Learning Path',
    description:
      'A clear, level-by-level curriculum takes every student from the basics to competitive play with no gaps.',
  },
  {
    icon: UserCheck,
    title: 'Experienced Coaching',
    description:
      'Learn directly under a National Arbiter and FIDE Trainer with 20+ years of hands-on experience.',
  },
  {
    icon: Swords,
    title: 'Tournament Preparation',
    description:
      'Students are trained for real competition — calculation, nerves, clocks and all.',
  },
  {
    icon: Users,
    title: 'Small Batch Attention',
    description:
      'Focused batch sizes mean every child gets personal feedback and steady progress.',
  },
  {
    icon: MapPinned,
    title: 'Multiple Convenient Locations',
    description:
      'Four centres across the region make it easy to find a class close to home.',
  },
  {
    icon: Sparkles,
    title: 'Friendly Learning Environment',
    description:
      'A warm, encouraging space where children love to learn and keep coming back.',
  },
]
