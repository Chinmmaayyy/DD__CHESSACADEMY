import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { Chessboard } from 'react-chessboard'
import { RotateCcw, RefreshCw, Loader2, Trophy, Share2, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { useChessGame } from '@/features/learn/useChessGame'
import { selectAiMove, LEVELS, type Level } from '@/features/learn/engine'
import {
  darkSquareStyle,
  lightSquareStyle,
  legalDot,
  legalCapture,
  selectedSquareStyle,
  lastMoveStyle,
  checkSquareStyle,
} from '@/features/learn/boardTheme'
import { cn } from '@/lib/utils'

export function PlayVsAIPage() {
  const { game, fen, status, history, move, undo, reset, legalTargets } = useChessGame()
  const [playerColor, setPlayerColor] = useState<'w' | 'b'>('w')
  const [level, setLevel] = useState<Level>(3)
  const [thinking, setThinking] = useState(false)
  const [shared, setShared] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null)

  const aiColor = playerColor === 'w' ? 'b' : 'w'
  const targets = selected ? legalTargets(selected) : []

  // AI moves whenever it is its turn.
  useEffect(() => {
    if (status.isGameOver) return
    if (status.turn !== aiColor) return
    setThinking(true)
    const t = window.setTimeout(() => {
      const best = selectAiMove(game.current, level)
      if (best) {
        move({ from: best.from, to: best.to, promotion: best.promotion })
        setLastMove({ from: best.from, to: best.to })
      }
      setThinking(false)
    }, 350)
    return () => {
      window.clearTimeout(t)
      setThinking(false)
    }
  }, [fen, aiColor, level, status.isGameOver, status.turn, game, move])

  const doMove = (from: string, to: string) => {
    if (status.turn !== playerColor || thinking) return false
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
      styles[t] = game.current.get(t as never) ? legalCapture(t) : legalDot(t)
    }
    if (status.inCheck) {
      const board = game.current.board()
      for (let r = 0; r < 8; r++)
        for (let c = 0; c < 8; c++) {
          const sq = board[r][c]
          if (sq && sq.type === 'k' && sq.color === status.turn)
            styles[sq.square] = { ...checkSquareStyle }
        }
    }
    return styles
  }, [selected, targets, lastMove, status.inCheck, status.turn, game])

  const newGame = (color: 'w' | 'b' = playerColor) => {
    reset()
    setPlayerColor(color)
    setSelected(null)
    setLastMove(null)
    setThinking(false)
  }

  const takeback = () => {
    // Undo AI move + player move so it's the player's turn again.
    undo()
    if (game.current.turn() !== playerColor) undo()
    setSelected(null)
    setLastMove(null)
  }

  const resultText = status.isCheckmate
    ? status.winner === (playerColor === 'w' ? 'White' : 'Black')
      ? 'You win! 🎉'
      : 'Computer wins'
    : status.isDraw
      ? 'Draw'
      : null

  const shareResult = async () => {
    // Encode the actual game (PGN) so the recipient can replay & analyse it.
    const pgn = game.current.pgn()
    const url = `${window.location.origin}/learn/board?pgn=${encodeURIComponent(pgn)}`
    const won = status.winner === (playerColor === 'w' ? 'White' : 'Black')
    const verb = status.isDraw ? 'drew with' : won ? 'beat' : 'played'
    const text = `I just ${verb} DD Chess Academy's Computer at Level ${level}! ♟️ Replay my game:`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'DD Chess Academy — my game', text, url })
      } else {
        await navigator.clipboard?.writeText(`${text} ${url}`)
        setShared(true)
        window.setTimeout(() => setShared(false), 1800)
      }
    } catch {
      /* share dialog dismissed — ignore */
    }
  }

  return (
    <Container className="py-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Board */}
        <div className="mx-auto w-full max-w-[560px] rounded-[20px] border border-gold-500/25 bg-inverse p-3 shadow-[var(--shadow-large)]">
          <div className="overflow-hidden rounded-[12px] ring-1 ring-inset ring-white/10">
          <Chessboard
            options={{
              id: 'play-board',
              position: fen,
              boardOrientation: playerColor === 'w' ? 'white' : 'black',
              darkSquareStyle,
              lightSquareStyle,
              squareStyles,
              animationDurationInMs: 250,
              allowDragging: !status.isGameOver && status.turn === playerColor && !thinking,
              onSquareClick: ({ square, piece }) => {
                if (status.turn !== playerColor || thinking) return
                if (selected && targets.includes(square)) {
                  doMove(selected, square)
                  return
                }
                if (piece && piece.pieceType[0] === status.turn) setSelected(square)
                else setSelected(null)
              },
              // Show legal-move dots the moment a piece is picked up to drag.
              onPieceDrag: ({ square, piece }) => {
                if (status.turn !== playerColor || thinking) return
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

        {/* Panel */}
        <aside className="flex flex-col gap-4">
          {/* Result / turn */}
          <div className="rounded-2xl border border-hairline bg-surface p-5">
            {resultText ? (
              <div>
                <div className="flex items-center gap-3">
                  <Trophy className="size-6 text-accent" />
                  <p className="font-display text-xl text-heading">{resultText}</p>
                </div>
                <button
                  onClick={shareResult}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
                >
                  {shared ? <Check className="size-4" /> : <Share2 className="size-4" />}
                  {shared ? 'Copied to clipboard!' : 'Share result'}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {thinking && <Loader2 className="size-5 animate-spin text-accent" />}
                <p className="font-display text-xl text-heading">
                  {thinking
                    ? 'Computer is thinking…'
                    : status.turn === playerColor
                      ? `Your move${status.inCheck ? ' · Check!' : ''}`
                      : 'Computer to move'}
                </p>
              </div>
            )}
          </div>

          {/* Computer level */}
          <div className="rounded-2xl border border-hairline bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted">Computer level</p>
              <p className="text-xs font-semibold text-muted">
                {LEVELS.find((l) => l.id === level)?.blurb}
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  className={cn(
                    'rounded-lg py-2 font-display text-base font-semibold transition-colors',
                    level === l.id
                      ? 'bg-gold-500 text-navy-900'
                      : 'bg-surface-2 text-muted hover:text-heading',
                  )}
                  title={l.blurb}
                  aria-label={`Computer level ${l.id}`}
                >
                  {l.id}
                </button>
              ))}
            </div>
          </div>

          {/* Play as */}
          <div className="rounded-2xl border border-hairline bg-surface p-4">
            <p className="mb-3 text-xs uppercase tracking-wider text-muted">Play as</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => newGame('w')}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  playerColor === 'w'
                    ? 'bg-white text-navy-900'
                    : 'bg-surface-2 text-muted hover:bg-surface-2',
                )}
              >
                White
              </button>
              <button
                onClick={() => newGame('b')}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  playerColor === 'b'
                    ? 'bg-navy-900 text-white ring-1 ring-white/30'
                    : 'bg-surface-2 text-muted hover:bg-surface-2',
                )}
              >
                Black
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={takeback}
              disabled={history.length === 0 || thinking}
              className="flex items-center justify-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-3 text-sm font-medium text-content transition-colors hover:border-gold-500/40 disabled:opacity-40"
            >
              <RotateCcw className="size-4" />
              Take back
            </button>
            <button
              onClick={() => newGame()}
              className="flex items-center justify-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-3 text-sm font-medium text-content transition-colors hover:border-gold-500/40"
            >
              <RefreshCw className="size-4" />
              New game
            </button>
          </div>
        </aside>
      </div>
    </Container>
  )
}
