import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import {
  Lightbulb,
  Eye,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Flame,
  Target,
  LibraryBig,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { usePuzzleSolver } from '@/features/learn/usePuzzleSolver'
import {
  allPuzzles,
  getDailyPuzzle,
  getStreak,
  getSolvedSet,
  tierColor,
  prettyTheme,
  tiers,
  type PuzzleData,
  type Tier,
} from '@/features/learn/puzzleData'
import {
  darkSquareStyle,
  lightSquareStyle,
  selectedSquareStyle,
  lastMoveStyle,
  legalDot,
  legalCapture,
} from '@/features/learn/boardTheme'
import { cn } from '@/lib/utils'

type Pool = 'All' | Tier

function pickFrom(pool: Pool, exclude?: string): PuzzleData {
  const solved = getSolvedSet()
  const list = allPuzzles.filter((p) => (pool === 'All' || p.tier === pool) && p.id !== exclude)
  const unsolved = list.filter((p) => !solved.has(p.id))
  const source = unsolved.length ? unsolved : list
  return source[Math.floor(Math.random() * source.length)] ?? allPuzzles[0]
}

export function PuzzleTrainerPage() {
  const [params] = useSearchParams()
  const idParam = params.get('id')

  const initial = useMemo<PuzzleData>(() => {
    if (idParam) {
      const found = allPuzzles.find((p) => p.id === idParam)
      if (found) return found
    }
    return getDailyPuzzle()
  }, [idParam])

  const [pool, setPool] = useState<Pool>('All')
  const [puzzle, setPuzzle] = useState<PuzzleData>(initial)
  const [streak, setStreak] = useState(getStreak)

  const solver = usePuzzleSolver(puzzle)
  const {
    fen,
    outcome,
    wrong,
    progress,
    playerMoveCount,
    lastMove,
    wrongMove,
    correctMove,
    hintSquare,
    attempts,
    hintAfter,
  } = solver

  const chess = useMemo(() => new Chess(fen), [fen])
  const [selected, setSelected] = useState<string | null>(null)
  const targets = useMemo(
    () =>
      selected
        ? chess.moves({ square: selected as never, verbose: true }).map((m) => m.to as string)
        : [],
    [selected, chess],
  )

  // Clear any selection when the position changes or a new puzzle loads.
  useEffect(() => setSelected(null), [fen, puzzle.id])

  const squareStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {}
    if (lastMove) {
      styles[lastMove.from] = { ...lastMoveStyle }
      styles[lastMove.to] = { ...lastMoveStyle }
    }
    if (selected) styles[selected] = { ...selectedSquareStyle }
    for (const t of targets) {
      styles[t] = chess.get(t as never) ? legalCapture(t) : legalDot(t)
    }
    if (hintSquare) styles[hintSquare] = { ...selectedSquareStyle }
    if (correctMove) {
      styles[correctMove.from] = { backgroundColor: 'rgba(34,197,94,0.5)' }
      styles[correctMove.to] = { backgroundColor: 'rgba(34,197,94,0.55)' }
    }
    if (wrongMove) {
      styles[wrongMove.from] = { backgroundColor: 'rgba(239,68,68,0.5)' }
      styles[wrongMove.to] = { backgroundColor: 'rgba(239,68,68,0.6)' }
    }
    return styles
  }, [lastMove, hintSquare, selected, targets, chess, correctMove, wrongMove])

  const next = () => {
    setStreak(getStreak())
    setPuzzle(pickFrom(pool, puzzle.id))
  }

  const solvedCount = getSolvedSet().size

  return (
    <Container className="py-8 lg:py-12">
      {/* Stat strip */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StatChip icon={Flame} label="Day streak" value={streak} accent />
        <StatChip icon={Target} label="Solved" value={`${solvedCount}/${allPuzzles.length}`} />
        <Link
          to="/learn/library"
          className="ml-auto inline-flex items-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-2 text-sm font-medium text-content transition-colors hover:border-gold-500/40"
        >
          <LibraryBig className="size-4" />
          Puzzle Library
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Board */}
        <div
          className={cn(
            'mx-auto w-full max-w-[560px] rounded-2xl transition-shadow',
            wrong && 'animate-shake ring-4 ring-danger/60',
            outcome === 'solved' && 'ring-4 ring-success/60',
          )}
        >
          <Chessboard
            options={{
              id: 'puzzle-board',
              position: fen,
              boardOrientation: puzzle.sideToMove === 'White' ? 'white' : 'black',
              darkSquareStyle,
              lightSquareStyle,
              squareStyles,
              animationDurationInMs: 250,
              allowDragging: !outcome,
              onSquareClick: ({ square }) => {
                if (outcome) return
                if (selected && targets.includes(square)) {
                  solver.attempt(selected as never, square as never)
                  setSelected(null)
                  return
                }
                const p = chess.get(square as never)
                setSelected(p && p.color === chess.turn() ? square : null)
              },
              // Show legal-move dots the moment a piece is picked up to drag.
              onPieceDrag: ({ square }) => {
                if (outcome) return
                const p = chess.get(square as never)
                if (p && p.color === chess.turn()) setSelected(square)
              },
              onPieceDrop: ({ sourceSquare, targetSquare }) => {
                setSelected(null)
                return targetSquare ? solver.attempt(sourceSquare, targetSquare) : false
              },
            }}
          />
        </div>

        {/* Panel */}
        <aside className="flex flex-col gap-4">
          {/* Pool selector */}
          <div className="rounded-2xl border border-hairline bg-surface p-4">
            <p className="mb-3 text-xs uppercase tracking-wider text-muted">Difficulty pool</p>
            <div className="grid grid-cols-4 gap-2">
              {(['All', ...tiers] as Pool[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setPool(t)}
                  className={cn(
                    'rounded-lg px-2 py-2 text-xs font-semibold transition-colors',
                    pool === t
                      ? 'bg-gold-500 text-navy-900'
                      : 'bg-surface-2 text-muted hover:bg-surface-2',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Puzzle meta */}
          <div className="rounded-2xl border border-hairline bg-surface p-5">
            <div className="flex items-center justify-between">
              <span className={cn('text-xs font-bold uppercase tracking-wider', tierColor(puzzle.tier))}>
                {puzzle.tier}
              </span>
              <span className="text-sm text-muted tnum">Rating {puzzle.rating}</span>
            </div>
            <h1 className="mt-2 font-display text-2xl font-semibold text-heading">
              {puzzle.themes[0] ? prettyTheme(puzzle.themes[0]) : 'Find the best move'}
            </h1>
            <p className="mt-2 text-sm text-muted">
              <span className="font-semibold text-heading">{puzzle.sideToMove} to move.</span>{' '}
              Find the winning idea — {playerMoveCount} move{playerMoveCount > 1 ? 's' : ''} to solve.
            </p>
            {playerMoveCount > 1 && !outcome && (
              <div className="mt-3 flex gap-1.5">
                {Array.from({ length: playerMoveCount }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1.5 flex-1 rounded-full',
                      i < progress ? 'bg-gold-500' : 'bg-surface-2',
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Feedback */}
          <div
            className={cn(
              'rounded-2xl border p-5',
              outcome === 'solved'
                ? 'border-success/40 bg-success/10'
                : wrong
                  ? 'border-danger/40 bg-danger/10'
                  : hintSquare
                    ? 'border-gold-500/40 bg-gold-500/10'
                    : 'border-hairline bg-surface',
            )}
          >
            {outcome === 'solved' ? (
              <p className="flex items-center gap-2 font-display text-lg text-heading">
                <CheckCircle2 className="size-5 text-success" />
                Solved! {puzzle.san.join(' ')}
              </p>
            ) : outcome === 'shown' ? (
              <p className="flex items-center gap-2 font-display text-lg text-heading">
                <Eye className="size-5 text-accent" />
                Solution: {puzzle.san.join(' ')}
              </p>
            ) : wrong ? (
              <div>
                <p className="flex items-center gap-2 font-semibold text-heading">
                  <XCircle className="size-5 text-danger" />
                  Not the move — try again.
                </p>
                {hintSquare ? (
                  <p className="mt-1.5 text-sm text-muted">
                    Hint: move the piece on{' '}
                    <span className="font-semibold uppercase text-accent">{hintSquare}</span>.
                  </p>
                ) : (
                  <p className="mt-1.5 text-sm text-muted">
                    {hintAfter - attempts} more {hintAfter - attempts === 1 ? 'try' : 'tries'} before
                    a hint.
                  </p>
                )}
              </div>
            ) : hintSquare ? (
              <p className="flex items-center gap-2 text-heading">
                <Lightbulb className="size-5 text-gold-400" />
                Hint: move the piece on{' '}
                <span className="font-semibold uppercase text-accent">{hintSquare}</span>.
              </p>
            ) : (
              <p className="text-muted">Your turn. Drag a piece to make your move.</p>
            )}
          </div>

          {/* Actions */}
          {!outcome ? (
            <div className="grid grid-cols-2 gap-3">
              <PanelButton onClick={solver.revealHint} icon={Lightbulb} disabled={!!hintSquare}>
                Hint
              </PanelButton>
              <PanelButton onClick={solver.showSolution} icon={Eye}>
                Solution
              </PanelButton>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <PanelButton onClick={solver.restart} icon={RefreshCw}>
                Retry
              </PanelButton>
              <PanelButton onClick={next} icon={ArrowRight} primary>
                Next puzzle
              </PanelButton>
            </div>
          )}
        </aside>
      </div>
    </Container>
  )
}

function StatChip({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: React.ReactNode
  accent?: boolean
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-hairline bg-surface px-4 py-2.5">
      <Icon className={cn('size-4', accent ? 'text-accent' : 'text-muted')} />
      <span className="text-sm text-muted">{label}</span>
      <span className="font-display text-base font-semibold text-heading tnum">{value}</span>
    </div>
  )
}

function PanelButton({
  children,
  onClick,
  icon: Icon,
  disabled,
  primary,
}: {
  children: React.ReactNode
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  disabled?: boolean
  primary?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors disabled:opacity-40',
        primary
          ? 'bg-gold-500 text-navy-900 hover:bg-gold-400'
          : 'border border-hairline bg-surface text-content hover:border-gold-500/40',
      )}
    >
      <Icon className="size-4" />
      {children}
    </button>
  )
}
