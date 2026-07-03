import type { LucideIcon } from 'lucide-react'

export interface Coach {
  name: string
  designation: string[]
  fideId: string
  ratings: { label: string; value: number; icon: string }[]
  experienceYears: number
  bio: string
  philosophy: string
  photoUrl?: string
  // FIDE credential details
  federation: string
  federationCode: string
  birthYear: number
  gender: string
  licenseType: string
  licenseActive: boolean
  licensedSince: string
  /** Languages of instruction. */
  languages: string[]
}

export interface Course {
  slug: 'beginner' | 'intermediate' | 'advanced'
  title: string
  level: string
  ageGroup: string
  duration: string
  description: string
  topics: string[]
  outcome: string
  recommended?: boolean
}

export interface Stat {
  icon: LucideIcon
  value: number
  suffix?: string
  label: string
  caption: string
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export interface Branch {
  name: string
  area: string
  /** Official Google Maps link (opens directions/search). */
  mapUrl: string
  /** Embeddable Google Maps URL for an <iframe> (no API key). */
  embedUrl: string
}

export interface Testimonial {
  author: string
  relation: string
  rating: number
  review: string
  student?: string
}

export interface AcademyEvent {
  title: string
  date: string
  venue: string
  format: string
  description: string
  status: 'upcoming' | 'past'
  /** Banner image (imported asset). Swap for an AI-generated / event-specific image. */
  image?: string
}

export interface Achievement {
  title: string
  detail: string
  year: string
  icon: LucideIcon
}

export interface Faq {
  question: string
  answer: string
}
