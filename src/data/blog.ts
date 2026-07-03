import cover1 from '@/assets/gallery_3.jpeg'
import cover2 from '@/assets/gallery_8.jpeg'
import cover3 from '@/assets/gallery_12.jpeg'

export interface BlogPost {
  slug: string
  title: string
  description: string
  /** ISO date for schema/sorting. */
  date: string
  displayDate: string
  author: string
  tags: string[]
  cover: string
  readMinutes: number
  /** Markdown body. */
  body: string
}

export const posts: BlogPost[] = [
  {
    slug: 'benefits-of-chess-for-children',
    title: '7 Proven Benefits of Chess for Children',
    description:
      'From sharper focus to better decision-making, here is how learning chess helps children grow — on the board and in the classroom.',
    date: '2026-06-20',
    displayDate: '20 June 2026',
    author: 'DD Chess Academy',
    tags: ['Kids', 'Parents', 'Learning'],
    cover: cover1,
    readMinutes: 5,
    body: `Chess is often called "the gymnasium of the mind" — and for good reason. Beyond being a fun game, it quietly builds the mental habits that help children succeed at school and in life. Here are seven benefits we see in our students every week.

## 1. Sharper focus and concentration
A single game asks a child to stay attentive for a long stretch. Over time, that patience carries over into homework, reading and exams.

## 2. Better decision-making
Every move is a small decision with consequences. Children learn to pause, weigh options and think before they act — a skill that matters far beyond the board.

## 3. Stronger memory
Recognising patterns, recalling openings and remembering plans all exercise memory in a natural, enjoyable way.

## 4. Planning and foresight
Chess rewards thinking ahead. Kids learn to set a goal, build towards it, and adjust when the situation changes.

## 5. Learning to handle setbacks
Everyone loses games. Chess teaches children that a loss is feedback, not failure — building the resilience that helps them bounce back.

## 6. Creativity and problem solving
There are more possible chess games than atoms in the universe. Every position is a fresh puzzle that rewards imagination.

## 7. Confidence
As children improve and win their first games and tournaments, their self-belief grows — and that confidence shows up everywhere.

> At DD Chess Academy, our structured coaching is designed to nurture all seven of these — in a warm, encouraging environment.

Curious whether chess is right for your child? [Book a free demo class](/#contact) and see the difference for yourself.`,
  },
  {
    slug: 'how-to-choose-chess-classes-dombivli',
    title: 'How to Choose the Right Chess Classes in Dombivli',
    description:
      'Thinking of enrolling your child in chess classes in Dombivli? Here are the seven things that actually matter when choosing an academy.',
    date: '2026-06-10',
    displayDate: '10 June 2026',
    author: 'DD Chess Academy',
    tags: ['Parents', 'Dombivli', 'Guide'],
    cover: cover2,
    readMinutes: 6,
    body: `Searching for **chess classes in Dombivli** and not sure how to choose? Not all academies are the same. Here is a simple checklist to help you pick the right one for your child.

## 1. Look at the coach's credentials
A qualified coach makes all the difference. Look for recognised certifications — a **FIDE Trainer** or **National Arbiter** title means the coach is trained to international standards.

## 2. Ask about batch sizes
Small batches mean your child actually gets attention and feedback. Large, crowded classes rarely produce steady improvement.

## 3. Check for a clear curriculum
Good academies have a structured path — from the very first move to tournament play — so you can see your child progressing level by level.

## 4. Tournament exposure
Real growth comes from real games. Ask whether students get regular opportunities to play in-house and rated tournaments.

## 5. A trial class
Any confident academy will offer a **free demo class**. Use it to see how the coach interacts with your child and whether they enjoy it.

## 6. Convenient location and timing
Look for a centre near you with timings that fit your family's routine, so attendance stays consistent.

## 7. The learning environment
Especially for young children, warmth matters as much as skill. The best academies are patient, encouraging and make learning fun.

> DD Chess Academy ticks every box — coaching under a National Arbiter & FIDE Trainer, small batches, a structured curriculum, regular tournaments and centres across Dombivli, Nandivali and Thakurli.

Ready to see for yourself? [Book a free demo class](/#contact) today.`,
  },
  {
    slug: 'chess-principles-for-beginners',
    title: 'Chess for Beginners: 5 Opening Principles Every New Player Should Know',
    description:
      'New to chess? Master these five simple opening principles and you will already play better than most beginners.',
    date: '2026-05-28',
    displayDate: '28 May 2026',
    author: 'DD Chess Academy',
    tags: ['Beginners', 'Strategy', 'Openings'],
    cover: cover3,
    readMinutes: 4,
    body: `You do not need to memorise long opening lines to start well. Follow these five timeless principles and you will get out of the opening with a healthy position almost every time.

## 1. Control the centre
The four central squares are the most powerful real estate on the board. Play a central pawn early (like e4 or d4) to stake your claim.

## 2. Develop your pieces
Bring your knights and bishops out towards the centre in the first few moves. A piece sitting on its starting square is doing nothing.

## 3. Castle early
Castling tucks your king safely into the corner and connects your rooks. Aim to castle within the first ten moves.

## 4. Don't move the same piece twice
In the opening, every move counts. Moving one piece repeatedly wastes time your opponent uses to develop.

## 5. Don't bring your queen out too early
The queen is powerful but vulnerable. Push it out too soon and your opponent gains time by attacking it.

> Remember: **develop, castle, control the centre.** Keep these in mind and the rest of the game becomes much easier.

Want to put these into practice? Try our free [interactive puzzles and Play-vs-Computer trainer](/learn) — or [book a demo class](/#contact) to learn with a coach.`,
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
