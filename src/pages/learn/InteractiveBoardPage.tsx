import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Chessboard } from 'react-chessboard'
import {
  RotateCcw,
  RefreshCw,
  FlipVertical2,
  Copy,
  Check,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { useChessGame } from '@/features/learn/useChessGame'
import { evaluatePosition, type PositionEval } from '@/features/learn/engine'
import {
  legalDot,
  legalCapture,
  selectedSquareStyle,
  lastMoveStyle,
  checkSquareStyle,
} from '@/features/learn/boardTheme'
import { useBoardTheme } from '@/hooks/useBoardTheme'
import { BoardThemePicker } from '@/components/ui/BoardThemePicker'
import { cn } from '@/lib/utils'

interface ReplayMove {
  from: string
  to: string
  san: string
  before: string
  after: string
}

export function InteractiveBoardPage() {
  const { game, fen, status, history, move, undo, reset, legalTargets, sync } = useChessGame()
  const [params] = useSearchParams()
  const [sharedGame, setSharedGame] = useState(false)
  const [replay, setReplay] = useState<ReplayMove[]>([])
  const [sourcePgn, setSourcePgn] = useState<string | null>(null)
  const [ply, setPly] = useState(0)
  const [orientation, setOrientation] = useState<'white' | 'black'>('white')
  const { themeId, setTheme, lightSquareStyle, darkSquareStyle } = useBoardTheme()

  // Load a shared game (PGN) or position (FEN) from the URL, once on mount.
  useEffect(() => {
    const pgn = params.get('pgn')
    const loadFen = params.get('fen')
    try {
      if (pgn) {
        game.current.loadPgn(pgn)
        const hist = game.current.history({ verbose: true })
        if (hist.length) {
          setReplay(
            hist.map((m) => ({
              from: m.from,
              to: m.to,
              san: m.san,
              before: m.before,
              after: m.after,
            })),
          )
          setPly(hist.length)
          const last = hist[hist.length - 1]
          setLastMove({ from: last.from, to: last.to })
          // Keep the original PGN — stepping through rebuilds from FENs, which
          // would otherwise leave chess.js with no move history to export.
          setSourcePgn(game.current.pgn())
        }
        setSharedGame(true)
        sync()
      } else if (loadFen) {
        reset(loadFen)
        setSharedGame(true)
      }
    } catch {
      /* invalid pgn/fen in the URL — ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** Jump to any point in the shared game (non-destructive — you can go back and forward). */
  const goTo = (n: number) => {
    if (!replay.length) return
    const at = Math.max(0, Math.min(replay.length, n))
    const fen = at === 0 ? replay[0].before : replay[at - 1].after
    reset(fen)
    setPly(at)
    setSelected(null)
    setShowBest(false)
    setLastMove(at === 0 ? null : { from: replay[at - 1].from, to: replay[at - 1].to })
  }
  const [selected, setSelected] = useState<string | null>(null)
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null)
  const [copied, setCopied] = useState<'fen' | 'pgn' | null>(null)
  const [analysis, setAnalysis] = useState<PositionEval | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [showBest, setShowBest] = useState(false)

  const targets = selected ? legalTargets(selected) : []

  // Engine analysis for the eval bar + best-move hint (deferred so it never
  // blocks the move animation).
  useEffect(() => {
    setAnalyzing(true)
    setShowBest(false)
    const t = window.setTimeout(() => {
      setAnalysis(evaluatePosition(fen, 2))
      setAnalyzing(false)
    }, 40)
    return () => window.clearTimeout(t)
  }, [fen])

  const doMove = (from: string, to: string) => {
    const result = move({ from, to, promotion: 'q' })
    if (result) setLastMove({ from, to })
    setSelected(null)
    return !!result
  }

  const squareStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {}
    if (lastMove) {
      styles[lastMove.from] = { ...lastMoveStyle }
      styles[lastMove.to] = { ...lastMoveStyle }
    }
    if (selected) styles[selected] = { ...selectedSquareStyle }
    for (const t of targets) {
      const isCapture = game.current.get(t as never)
      styles[t] = isCapture ? legalCapture(t) : legalDot(t)
    }
    if (status.inCheck) {
      // Highlight the king in check
      const board = game.current.board()
      for (let r = 0; r < 8; r++)
        for (let c = 0; c < 8; c++) {
          const sq = board[r][c]
          if (sq && sq.type === 'k' && sq.color === status.turn) {
            styles[sq.square] = { ...checkSquareStyle }
          }
        }
    }
    if (showBest && analysis?.best) {
      styles[analysis.best.from] = { backgroundColor: 'rgba(59,130,246,0.45)' }
      styles[analysis.best.to] = { backgroundColor: 'rgba(59,130,246,0.5)' }
    }
    return styles
  }, [selected, targets, lastMove, status.inCheck, status.turn, game, showBest, analysis])

  const copy = (text: string, which: 'fen' | 'pgn') => {
    navigator.clipboard?.writeText(text)
    setCopied(which)
    window.setTimeout(() => setCopied(null), 1500)
  }

  const resetAll = () => {
    // For a shared game, "reset" returns to the start of THAT game (keeps the PGN).
    if (replay.length) {
      goTo(0)
      return
    }
    reset()
    setSelected(null)
    setLastMove(null)
  }

  return (
    <Container className="py-8 lg:py-12">
      {sharedGame && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-sm text-heading">
          <span>
            ♟️ You're viewing a shared game — step through it with the arrows, or play on from
            any position.
          </span>
          {replay.length > 0 && (
            <span className="font-semibold tnum">
              Move {ply} / {replay.length}
            </span>
          )}
        </div>
      )}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Board */}
        <div className="mx-auto flex w-full max-w-[600px] self-start items-stretch gap-3">
          <EvalBar evaluation={analysis} orientation={orientation} analyzing={analyzing} />
          <div className="min-w-0 flex-1 rounded-[20px] border border-gold-500/25 bg-inverse p-3 shadow-[var(--shadow-large)]">
          <div className="overflow-hidden rounded-[12px] ring-1 ring-inset ring-white/10">
          <Chessboard
            options={{
              id: 'analysis-board',
              position: fen,
              boardOrientation: orientation,
              darkSquareStyle,
              lightSquareStyle,
              squareStyles,
              animationDurationInMs: 200,
              onSquareClick: ({ square, piece }) => {
                if (selected && targets.includes(square)) {
                  doMove(selected, square)
                  return
                }
                if (piece && piece.pieceType[0] === status.turn) {
                  setSelected(square)
                } else {
                  setSelected(null)
                }
              },
              // Show legal-move dots the moment a piece is picked up to drag.
              onPieceDrag: ({ square, piece }) => {
                if (piece && piece.pieceType[0] === status.turn) setSelected(square)
              },
              onPieceDrop: ({ sourceSquare, targetSquare }) => {
                if (!targetSquare) {
                  setSelected(null)
                  return false
                }
                return doMove(sourceSquare, targetSquare)
              },
            }}
          />
          </div>
          </div>
        </div>

        {/* Panel */}
        <aside className="flex flex-col gap-4">
          {/* Status */}
          <div className="rounded-2xl border border-hairline bg-surface p-5">
            <p className="text-xs uppercase tracking-wider text-muted">Status</p>
            <p className="mt-1 font-display text-xl text-heading">
              {status.isCheckmate
                ? `Checkmate — ${status.winner} wins`
                : status.isDraw
                  ? 'Draw'
                  : status.inCheck
                    ? `${status.turn === 'w' ? 'White' : 'Black'} to move · Check`
                    : `${status.turn === 'w' ? 'White' : 'Black'} to move`}
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
              <span className="text-xs uppercase tracking-wider text-muted">Engine eval</span>
              <span className="font-display text-lg text-heading tnum">
                {analyzing || !analysis ? '…' : formatEval(analysis)}
              </span>
            </div>
            {analysis?.best && !status.isGameOver && (
              <p className="mt-1 text-xs text-muted">
                Best move: <span className="font-semibold text-accent">{analysis.best.san}</span>
              </p>
            )}
          </div>

          {/* Replay navigation (shared game) */}
          {replay.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: ChevronsLeft, label: 'Start', to: 0, off: ply === 0 },
                { icon: ChevronLeft, label: 'Previous move', to: ply - 1, off: ply === 0 },
                { icon: ChevronRight, label: 'Next move', to: ply + 1, off: ply >= replay.length },
                {
                  icon: ChevronsRight,
                  label: 'End',
                  to: replay.length,
                  off: ply >= replay.length,
                },
              ].map(({ icon: Icon, label, to, off }) => (
                <button
                  key={label}
                  onClick={() => goTo(to)}
                  disabled={off}
                  title={label}
                  aria-label={label}
                  className="flex items-center justify-center rounded-xl border border-hairline bg-surface py-3 text-content transition-colors hover:border-gold-500/40 disabled:opacity-40"
                >
                  <Icon className="size-5" />
                </button>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="grid grid-cols-2 gap-3">
            <ControlButton onClick={undo} disabled={history.length === 0} icon={RotateCcw}>
              Undo
            </ControlButton>
            <ControlButton
              onClick={() => setOrientation((o) => (o === 'white' ? 'black' : 'white'))}
              icon={FlipVertical2}
            >
              Flip
            </ControlButton>
            <ControlButton onClick={resetAll} icon={RefreshCw}>
              Reset
            </ControlButton>
            <ControlButton onClick={() => copy(game.current.fen(), 'fen')} icon={copied === 'fen' ? Check : Copy}>
              {copied === 'fen' ? 'Copied' : 'FEN'}
            </ControlButton>
          </div>
          <ControlButton
            onClick={() => setShowBest((v) => !v)}
            icon={Lightbulb}
            disabled={!analysis?.best || status.isGameOver}
            full
          >
            {showBest ? 'Hide best move' : 'Show best move'}
          </ControlButton>
          <ControlButton
            onClick={() => copy(sourcePgn ?? game.current.pgn(), 'pgn')}
            icon={copied === 'pgn' ? Check : Copy}
            full
          >
            {copied === 'pgn' ? 'PGN copied' : 'Copy PGN'}
          </ControlButton>

          {/* Move list */}
          <div className="min-h-[140px] flex-1 rounded-2xl border border-hairline bg-surface p-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted">Moves</p>
            {replay.length > 0 ? (
              // Shared game — click any move to jump to it.
              <ol className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-content tnum">
                {Array.from({ length: Math.ceil(replay.length / 2) }).map((_, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-6 shrink-0 text-muted">{i + 1}.</span>
                    {[0, 1].map((k) => {
                      const idx = i * 2 + k
                      const m = replay[idx]
                      if (!m) return <span key={k} className="flex-1" />
                      return (
                        <button
                          key={k}
                          onClick={() => goTo(idx + 1)}
                          className={cn(
                            'flex-1 rounded px-1 text-left transition-colors hover:bg-surface-2',
                            ply === idx + 1 && 'bg-gold-500/20 font-semibold text-accent',
                          )}
                        >
                          {m.san}
                        </button>
                      )
                    })}
                  </li>
                ))}
              </ol>
            ) : history.length === 0 ? (
              <p className="text-sm text-muted">Make a move to begin.</p>
            ) : (
              <ol className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-content tnum">
                {Array.from({ length: Math.ceil(history.length / 2) }).map((_, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-6 text-muted">{i + 1}.</span>
                    <span className="flex-1">{history[i * 2]}</span>
                    <span className="flex-1">{history[i * 2 + 1] ?? ''}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <BoardThemePicker value={themeId} onChange={setTheme} />
        </aside>
      </div>
    </Container>
  )
}

/** "+1.4", "-0.7", or "M3" from White's perspective. */
function formatEval(e: PositionEval): string {
  if (e.mate != null) return e.mate === 0 ? '#' : `M${Math.abs(e.mate)}`
  const v = e.cp / 100
  return `${v >= 0 ? '+' : ''}${v.toFixed(1)}`
}

/** Vertical evaluation bar — white advantage fills from White's side. */
function EvalBar({
  evaluation,
  orientation,
  analyzing,
}: {
  evaluation: PositionEval | null
  orientation: 'white' | 'black'
  analyzing: boolean
}) {
  const cp = evaluation?.cp ?? 0
  const mate = evaluation?.mate ?? null
  // Win-probability-style curve; clamp so both sides always show a sliver.
  let whiteRatio =
    mate != null ? (mate > 0 ? 1 : mate < 0 ? 0 : 0.5) : 1 / (1 + Math.pow(10, -cp / 400))
  whiteRatio = Math.min(0.98, Math.max(0.02, whiteRatio))
  const whitePct = `${whiteRatio * 100}%`

  const label = evaluation && !analyzing ? formatEval(evaluation) : ''
  const whiteWinning = mate != null ? mate > 0 : cp >= 0

  return (
    <div
      className="relative hidden w-6 shrink-0 overflow-hidden rounded-md bg-navy-900 sm:block"
      aria-label="Engine evaluation"
      title={label ? `Evaluation: ${label}` : 'Analyzing…'}
    >
      {/* White fill (from the side White is on) */}
      <div
        className="absolute inset-x-0 bg-white transition-[height] duration-500 ease-out"
        style={
          orientation === 'white'
            ? { bottom: 0, height: whitePct }
            : { top: 0, height: whitePct }
        }
      />
      {label && (
        <span
          className={`absolute inset-x-0 text-center text-[9px] font-bold tabular-nums ${
            whiteWinning
              ? orientation === 'white'
                ? 'bottom-0.5 text-navy-900'
                : 'top-0.5 text-navy-900'
              : orientation === 'white'
                ? 'top-0.5 text-white'
                : 'bottom-0.5 text-white'
          }`}
        >
          {label}
        </span>
      )}
    </div>
  )
}

function ControlButton({
  children,
  onClick,
  disabled,
  icon: Icon,
  full,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  icon: React.ComponentType<{ className?: string }>
  full?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-3 text-sm font-medium text-content transition-colors hover:border-gold-500/40 hover:text-heading disabled:opacity-40',
        full && 'w-full',
      )}
    >
      <Icon className="size-4" />
      {children}
    </button>
  )
}
