import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Check, ChevronRight, Puzzle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import {
  allPuzzles,
  allThemes,
  getSolvedSet,
  tierColor,
  prettyTheme,
  tiers,
  type Tier,
} from '@/features/learn/puzzleData'
import { cn } from '@/lib/utils'

type TierFilter = 'All' | Tier
type SolvedFilter = 'all' | 'unsolved' | 'solved'

export function PuzzleLibraryPage() {
  const solvedSet = useMemo(() => getSolvedSet(), [])
  const [tier, setTier] = useState<TierFilter>('All')
  const [theme, setTheme] = useState<string>('all')
  const [solved, setSolved] = useState<SolvedFilter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allPuzzles.filter((p) => {
      if (tier !== 'All' && p.tier !== tier) return false
      if (theme !== 'all' && !p.themes.includes(theme)) return false
      const isSolved = solvedSet.has(p.id)
      if (solved === 'solved' && !isSolved) return false
      if (solved === 'unsolved' && isSolved) return false
      if (q) {
        const hay = `${p.n} ${p.rating} ${p.themes.join(' ')} ${p.tier}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [tier, theme, solved, query, solvedSet])

  return (
    <Container className="py-8 lg:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow text-accent">Puzzle Library</span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-heading">
            {allPuzzles.length} tactics to master
          </h1>
          <p className="mt-1 text-muted">
            {solvedSet.size} solved · {allPuzzles.length - solvedSet.size} remaining
          </p>
        </div>
        <Link
          to="/learn/puzzles"
          className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-2.5 font-semibold text-navy-900 transition-colors hover:bg-gold-400"
        >
          <Puzzle className="size-4" />
          Train now
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-4 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rating, theme, number…"
            className="w-full rounded-xl border border-hairline bg-surface py-2.5 pl-9 pr-4 text-sm text-heading placeholder:text-muted focus:border-gold-500/50 focus:outline-none"
          />
        </div>

        {/* Tier chips */}
        <div className="flex gap-2">
          {(['All', ...tiers] as TierFilter[]).map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={cn(
                'rounded-lg px-3 py-2 text-xs font-semibold transition-colors',
                tier === t
                  ? 'bg-gold-500 text-navy-900'
                  : 'bg-surface-2 text-muted hover:bg-surface-2',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Theme select */}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="rounded-lg border border-hairline bg-surface px-3 py-2 text-sm text-heading focus:border-gold-500/50 focus:outline-none"
        >
          <option value="all">All themes</option>
          {allThemes.map((t) => (
            <option key={t} value={t}>
              {prettyTheme(t)}
            </option>
          ))}
        </select>

        {/* Solved toggle */}
        <div className="flex gap-2">
          {(['all', 'unsolved', 'solved'] as SolvedFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setSolved(s)}
              className={cn(
                'rounded-lg px-3 py-2 text-xs font-semibold capitalize transition-colors',
                solved === s
                  ? 'bg-gold-500 text-navy-900'
                  : 'bg-surface-2 text-muted hover:bg-surface-2',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted">No puzzles match these filters.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const isSolved = solvedSet.has(p.id)
            return (
              <Link
                key={p.id}
                to={`/learn/puzzles?id=${p.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-gold-500/40"
              >
                <span
                  className={cn(
                    'grid size-11 shrink-0 place-items-center rounded-xl font-display text-lg font-semibold',
                    isSolved
                      ? 'bg-success/15 text-success'
                      : 'bg-surface-2 text-muted',
                  )}
                >
                  {isSolved ? <Check className="size-5" /> : `#${p.n}`}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm">
                    <span className={cn('font-bold uppercase tracking-wide', tierColor(p.tier))}>
                      {p.tier}
                    </span>
                    <span className="text-muted tnum">· {p.rating}</span>
                  </p>
                  <p className="truncate text-sm text-muted">
                    {p.themes.slice(0, 2).map(prettyTheme).join(' · ') || 'Tactics'}
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            )
          })}
        </div>
      )}
    </Container>
  )
}
