import { Link } from 'react-router-dom'
import { Puzzle, Bot, Grid3x3, ArrowRight, Sparkles, LibraryBig } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { getDailyPuzzle, prettyTheme, allPuzzles } from '@/features/learn/puzzleData'

const tools = [
  {
    to: '/learn/puzzles',
    icon: Puzzle,
    title: 'Puzzle Trainer',
    desc: 'Solve real rated tactics with multi-move solutions, hints, and a daily streak. Beginner to advanced.',
    tag: `${allPuzzles.length} puzzles`,
  },
  {
    to: '/learn/library',
    icon: LibraryBig,
    title: 'Puzzle Library',
    desc: 'Browse and filter every puzzle by difficulty, theme, and solved status. Pick exactly what you want to train.',
    tag: 'Browse all',
  },
  {
    to: '/learn/play',
    icon: Bot,
    title: 'Play vs Computer',
    desc: 'Play a full game against our engine at four difficulty levels — from gentle beginner to a real challenge.',
    tag: '4 levels',
  },
  {
    to: '/learn/board',
    icon: Grid3x3,
    title: 'Analysis Board',
    desc: 'A free board with legal-move validation. Set up positions, take back moves, flip sides, and export FEN/PGN.',
    tag: 'Free play',
  },
]

export function LearnHub() {
  const daily = getDailyPuzzle()

  return (
    <div className="relative overflow-hidden">
      <div className="chess-grid absolute inset-0 opacity-40" />
      <div className="glow-gold absolute -right-32 -top-20 size-[480px]" />

      <Container className="relative py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow inline-flex items-center gap-2 text-accent">
            <Sparkles className="size-4" />
            Play &amp; Learn
          </span>
          <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-tight text-heading">
            Practice chess, <span className="text-gold-gradient">right here.</span>
          </h1>
          <p className="mt-5 text-lg text-muted">
            An interactive training ground for every DD Chess student. Sharpen
            your tactics, test yourself against the computer, and explore
            positions — all in your browser.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.to}
                to={tool.to}
                className="group flex flex-col rounded-[22px] border border-hairline bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/40 hover:bg-surface-2"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-gold-500/12 text-accent transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-6" />
                  </span>
                  <span className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-semibold text-muted">
                    {tool.tag}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold text-heading">
                  {tool.title}
                </h2>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">
                  {tool.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Open
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>

        {/* Daily puzzle teaser */}
        <Link
          to="/learn/puzzles"
          className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[22px] border border-gold-500/25 bg-gold-500/5 p-6 sm:flex-row sm:items-center"
        >
          <div>
            <p className="eyebrow text-accent">Puzzle of the day</p>
            <p className="mt-1.5 font-display text-xl text-heading">
              {daily.themes[0] ? prettyTheme(daily.themes[0]) : 'Daily tactic'} ·{' '}
              <span className="text-muted">{daily.tier}</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-2.5 font-semibold text-navy-900">
            Solve today's puzzle
            <ArrowRight className="size-4" />
          </span>
        </Link>
      </Container>
    </div>
  )
}
