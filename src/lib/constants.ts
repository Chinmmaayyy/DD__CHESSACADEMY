/**
 * Central academy configuration.
 * NOTE: Phone / WhatsApp / Map URLs are placeholders — replace with the
 * real academy details before launch (single source of truth).
 */
export const ACADEMY = {
  name: 'DD Chess Academy',
  tagline: 'Build Strategy. Build Confidence. Master the Game.',
  shortDescription:
    'Professional chess coaching focused on strategy, discipline and long-term growth.',
  phone: '+91 99206 05578',
  phoneRaw: '919920605578',
  whatsapp: '919920605578',
  email: 'dhuridipak2@gmail.com',
  domain: 'ddchessacademy.in',
  serviceArea: 'Dombivli',
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
  },
} as const

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello DD Chess Academy! I'd like to book a free demo class. Please share the details."
