import type { Branch } from '@/types'

/**
 * Google Maps links are generated from each centre's name + area.
 * If a pin is slightly off, replace `query` with the exact place name or a
 * Plus Code / lat,long for a precise location.
 */
const mapsSearch = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
const mapsEmbed = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`

interface RawBranch {
  name: string
  area: string
  query: string
}

const raw: RawBranch[] = [
  {
    name: 'Little Krishna Preschool & Kidzcare',
    area: 'Dombivli',
    query: 'Little Krishna Preschool & Kidzcare, Dombivli, Maharashtra',
  },
  {
    name: 'Atharva Playgroup',
    area: 'Nandivali',
    query: 'Atharva Playgroup, Nandivali, Dombivli, Maharashtra',
  },
  {
    name: 'Atharva Playgroup',
    area: 'Thakurli',
    query: 'Atharva Playgroup, Thakurli, Dombivli, Maharashtra',
  },
]

export const branches: Branch[] = raw.map((b) => ({
  name: b.name,
  area: b.area,
  mapUrl: mapsSearch(b.query),
  embedUrl: mapsEmbed(b.query),
}))
