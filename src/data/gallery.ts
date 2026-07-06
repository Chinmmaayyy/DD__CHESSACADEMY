import academyVideo from '@/assets/academy_video.mp4'
import poster from '@/assets/gallery_7.jpeg'

/**
 * Every image named `gallery_<n>.(jpg|jpeg|png|webp)` in src/assets is loaded
 * automatically — just drop new files in and they appear (sorted by number).
 * No code changes needed to add 50+ photos.
 */
const modules = import.meta.glob('../assets/gallery_*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export interface GalleryImage {
  src: string
  alt: string
  caption: string
}

/** Optional alt/caption for known photos, keyed by `gallery_<n>`. */
const META: Record<string, { alt: string; caption: string }> = {
  gallery_1: { alt: 'A packed tournament hall with dozens of young players at chess boards', caption: 'Tournament day — the full hall in play' },
  gallery_2: { alt: 'Coach playing a practice game against a young student at a tournament', caption: 'Learning across the board' },
  gallery_3: { alt: 'Coach Dipak Dhuri with two students holding achievement certificates', caption: 'Celebrating our achievers' },
  gallery_4: { alt: 'Young students focused on their games at an inter-school tournament', caption: 'Focus and composure' },
  gallery_5: { alt: 'Students competing at an outdoor tournament venue', caption: 'Competitive exposure' },
  gallery_6: { alt: 'Teenage players concentrating during a tournament round', caption: 'The next generation' },
  gallery_7: { alt: 'A full academy class of children playing chess at colourful tables', caption: 'A full house at academy class' },
  gallery_8: { alt: 'Coach Dipak Dhuri guiding students during a chess class', caption: 'Coach Dipak, hands-on with every student' },
  gallery_9: { alt: 'Students lined up at boards during an academy coaching session', caption: 'Practice makes progress' },
  gallery_10: { alt: 'Student receiving a chess achievement certificate on stage', caption: 'Recognised for a podium finish' },
  gallery_11: { alt: 'Student receiving an award at a TDCA Young Masters tournament', caption: 'TDCA Young Masters awardee' },
  gallery_12: { alt: 'Young student receiving a runner-up trophy at a TDCA tournament', caption: 'Runner-up at TDCA tournament' },
  gallery_13: { alt: 'Young student holding a trophy at the Anand Chess Festival 2025', caption: 'Champion at Anand Chess Festival 2025' },
  gallery_14: { alt: 'Student receiving a trophy at a Decathlon chess tournament', caption: 'Trophy winner — Chess Visionaries' },
  gallery_15: { alt: 'Student receiving twin trophies from a chief guest', caption: 'Double trophy day' },
  gallery_16: { alt: 'Student receiving a trophy at the Maverick age-group tournament', caption: 'Maverick age-group winner' },
  gallery_17: { alt: 'Medal-winning student with academy coaches at a mall tournament', caption: 'Medallist with the team' },
  gallery_18: { alt: 'Student receiving a trophy and certificate at Asmita Rapid Chess', caption: 'Podium at Asmita Rapid Chess' },
  gallery_19: { alt: 'Student receiving a trophy and certificate at the Elite Chess Championship', caption: 'Elite Chess Championship winner' },
  gallery_20: { alt: 'Students focused on their chessboards during a coaching session', caption: 'Deep concentration during training' },
}

function keyOf(path: string): string {
  return path.match(/(gallery_\d+)\./)?.[1] ?? ''
}
function numOf(path: string): number {
  return Number(path.match(/gallery_(\d+)\./)?.[1] ?? 0)
}

export const galleryImages: GalleryImage[] = Object.entries(modules)
  .sort((a, b) => numOf(a[0]) - numOf(b[0]))
  .map(([path, src]) => {
    const meta = META[keyOf(path)]
    return { src, alt: meta?.alt ?? 'DD Chess Academy — student, class and tournament photo', caption: meta?.caption ?? '' }
  })

/** Featured academy video (shown in a framed player above the grid). */
export const galleryVideo = {
  src: academyVideo,
  poster,
  caption: 'A day at DD Chess Academy',
}
