import g1 from '@/assets/gallery_1.jpg'
import g2 from '@/assets/gallery_2.jpeg'
import g3 from '@/assets/gallery_3.jpeg'
import g4 from '@/assets/gallery_4.jpeg'
import g5 from '@/assets/gallery_5.jpeg'
import g6 from '@/assets/gallery_6.jpeg'
import g7 from '@/assets/gallery_7.jpeg'
import g8 from '@/assets/gallery_8.jpeg'
import g9 from '@/assets/gallery_9.jpeg'
import g10 from '@/assets/gallery_10.jpeg'
import g11 from '@/assets/gallery_11.jpeg'
import g12 from '@/assets/gallery_12.jpeg'
import g13 from '@/assets/gallery_13.jpeg'
import g14 from '@/assets/gallery_14.jpeg'
import g15 from '@/assets/gallery_15.jpeg'
import g16 from '@/assets/gallery_16.jpeg'
import g17 from '@/assets/gallery_17.jpeg'
import g18 from '@/assets/gallery_18.jpeg'
import g19 from '@/assets/gallery_19.jpeg'
import g20 from '@/assets/gallery_20.jpeg'
import academyVideo from '@/assets/academy_video.mp4'

export type GalleryCategory = 'Tournaments' | 'Coaching' | 'Prize Distribution'

export interface GalleryImage {
  src: string
  alt: string
  caption: string
  category: GalleryCategory
}

/** Featured academy video (shown in a framed player above the grid). */
export const galleryVideo = {
  src: academyVideo,
  poster: g7,
  caption: 'A day at DD Chess Academy',
}

// Interleaved across categories so the "All" view stays varied.
export const galleryImages: GalleryImage[] = [
  { src: g1, alt: 'A packed tournament hall with dozens of young players at chess boards', caption: 'Tournament day — the full hall in play', category: 'Tournaments' },
  { src: g8, alt: 'Coach Dipak Dhuri guiding students during a chess class', caption: 'Coach Dipak, hands-on with every student', category: 'Coaching' },
  { src: g13, alt: 'Young student holding a trophy at the Anand Chess Festival 2025', caption: 'Champion at Anand Chess Festival 2025', category: 'Prize Distribution' },
  { src: g10, alt: 'Student receiving a chess achievement certificate on stage', caption: 'Recognised for a podium finish', category: 'Prize Distribution' },
  { src: g7, alt: 'A full academy class of children playing chess at colourful tables', caption: 'A full house at academy class', category: 'Coaching' },
  { src: g14, alt: 'Student receiving a trophy at a Decathlon chess tournament', caption: 'Trophy winner — Chess Visionaries', category: 'Prize Distribution' },
  { src: g4, alt: 'Young students focused on their games at an inter-school tournament', caption: 'Focus and composure', category: 'Tournaments' },
  { src: g18, alt: 'Student receiving a trophy and certificate at Asmita Rapid Chess', caption: 'Podium at Asmita Rapid Chess', category: 'Prize Distribution' },
  { src: g3, alt: 'Coach Dipak Dhuri with two students holding achievement certificates', caption: 'Celebrating our achievers', category: 'Prize Distribution' },
  { src: g2, alt: 'Coach playing a practice game against a young student at a tournament', caption: 'Learning across the board', category: 'Coaching' },
  { src: g11, alt: 'Student receiving an award at a TDCA Young Masters tournament', caption: 'TDCA Young Masters awardee', category: 'Prize Distribution' },
  { src: g5, alt: 'Students competing at an outdoor tournament venue', caption: 'Competitive exposure', category: 'Tournaments' },
  { src: g19, alt: 'Student receiving a trophy and certificate at the Elite Chess Championship', caption: 'Elite Chess Championship winner', category: 'Prize Distribution' },
  { src: g9, alt: 'Students lined up at boards during an academy coaching session', caption: 'Practice makes progress', category: 'Coaching' },
  { src: g12, alt: 'Young student receiving a runner-up trophy at a TDCA tournament', caption: 'Runner-up at TDCA tournament', category: 'Prize Distribution' },
  { src: g15, alt: 'Student receiving twin trophies from a chief guest', caption: 'Double trophy day', category: 'Prize Distribution' },
  { src: g6, alt: 'Teenage players concentrating during a tournament round', caption: 'The next generation', category: 'Tournaments' },
  { src: g16, alt: 'Student receiving a trophy at the Maverick age-group tournament', caption: 'Maverick age-group winner', category: 'Prize Distribution' },
  { src: g17, alt: 'Medal-winning student with academy coaches at a mall tournament', caption: 'Medallist with the team', category: 'Prize Distribution' },
  { src: g20, alt: 'Students focused on their chessboards during a coaching session', caption: 'Deep concentration during training', category: 'Coaching' },
]

export const galleryCategories = ['All', 'Tournaments', 'Coaching', 'Prize Distribution'] as const
