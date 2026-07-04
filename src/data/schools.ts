/** Schools where DD Chess Academy conducts coaching. */
export interface School {
  name: string
  area?: string
}

export const schools: School[] = [
  { name: 'Royal International School' },
  { name: 'EuroSchool' },
  { name: 'Lodha World School' },
  { name: 'Stellar World School' },
  { name: 'Don Bosco School', area: 'Dombivli' },
  { name: 'Swami Vivekanand School', area: 'Dombivli' },
]
