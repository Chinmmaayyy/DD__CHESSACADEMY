import dipak from '@/assets/dipak_sir.png'
import shibu from '@/assets/shibu_bhattacharjee.jpeg'
import sachin from '@/assets/sachin_chandi.jpeg'
import vitesh from '@/assets/vitesh_borse.jpeg'
import ajay from '@/assets/ajay_ghayal.jpeg'
import madhuri from '@/assets/madhuri_sagwekar.jpeg'

export interface Instructor {
  name: string
  title: string
  /** Short line of encouragement, shown as a quote. */
  quote: string
  photo?: string
  ratings?: { std?: number; rapid?: number; blitz?: number }
  tags?: string[]
  /** CSS object-position for the portrait crop (default 'top'). */
  focus?: string
}

export const instructors: Instructor[] = [
  {
    name: 'Dipak Dhuri',
    title: 'Founder & Head Coach',
    photo: dipak,
    ratings: { std: 1716, rapid: 1703, blitz: 1701 },
    tags: ['National Arbiter', 'FIDE Trainer'],
    quote:
      'Chess is not about being the smartest — it is about thinking one move deeper than you did yesterday.',
  },
  {
    name: 'Shibu Bhattacharjee',
    title: 'Chess Coach',
    photo: shibu,
    tags: ['Arena FIDE Master'],
    quote: 'Every great player was once a beginner who simply refused to give up.',
  },
  {
    name: 'Sachin Chandi',
    title: 'Chess Coach',
    photo: sachin,
    ratings: { std: 1540, rapid: 1708, blitz: 1766 },
    tags: ['FIDE Rated'],
    quote: 'Master the basics, and the brilliant moves will follow on their own.',
  },
  {
    name: 'Vitesh Borse',
    title: 'Chess Coach',
    photo: vitesh,
    ratings: { std: 1528, rapid: 1594, blitz: 1569 },
    tags: ['Rated Player'],
    quote: 'Patience on the board builds patience in life — trust the process.',
  },
  {
    name: 'Ajay Ghayal',
    title: 'Chess Coach',
    photo: ajay,
    focus: '50% 68%',
    ratings: { std: 1643, rapid: 1512 },
    tags: ['FIDE Rated'],
    quote: 'Your mistakes are your best teachers — learn something from every game.',
  },
  {
    name: 'Madhuri Sagwekar',
    title: 'Chess Coach',
    photo: madhuri,
    ratings: { std: 1502, rapid: 1490 },
    tags: ['FIDE Rated'],
    quote: 'Confidence comes from preparation. Practise, and believe in your moves.',
  },
]
