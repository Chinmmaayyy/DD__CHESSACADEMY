import { GraduationCap, MapPin, Trophy, CalendarClock } from 'lucide-react'
import type { Stat } from '@/types'

export const stats: Stat[] = [
  {
    icon: CalendarClock,
    value: 20,
    suffix: '+',
    label: 'Years of Experience',
    caption: 'Two decades of coaching mastery',
  },
  {
    icon: GraduationCap,
    value: 500,
    suffix: '+',
    label: 'Students Coached',
    caption: 'From first move to tournament hall',
  },
  {
    icon: MapPin,
    value: 3,
    label: 'Convenient Locations',
    caption: 'Across the Dombivli region',
  },
  {
    icon: Trophy,
    value: 100,
    suffix: '+',
    label: 'Tournament Entries',
    caption: 'Competitive exposure for students',
  },
]
