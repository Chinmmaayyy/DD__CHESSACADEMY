import { useMemo, useState, type CSSProperties } from 'react'
import { Chessboard } from 'react-chessboard'
import { RotateCcw, RefreshCw, FlipVertical2, Copy, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { useChessGame } from '@/features/learn/useChessGame'
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

export function InteractiveBoardPage() {
  const { game, fen, status, history, move, undo, reset, legalTargets } = useChessGame()
  const [orientation, setOrientation] = useState<'white' | 'black'>('white')
  const [selected, setSelected] = useState<string | null>(null)
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null)
  const [copied, setCopied] = useState<'fen' | 'pgn' | null>(null)

  const targets = selected ? legalTargets(selected) : []

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
    return styles
  }, [selected, targets, lastMove, status.inCheck, status.turn, game])

  const copy = (text: string, which: 'fen' | 'pgn') => {
    navigator.clipboard?.writeText(text)
    setCopied(which)
    window.setTimeout(() => setCopied(null), 1500)
  }

  const resetAll = () => {
    reset()
    setSelected(null)
    setLastMove(null)
  }

  return (
    <Container className="py-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Board */}
        <div className="mx-auto w-full max-w-[560px]">
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

        {/* Panel */}
        <aside className="flex flex-col gap-4">
          {/* Status */}
          <div className="rounded-2xl border border-white/10 bg-navy-800/60 p-5">
            <p className="text-xs uppercase tracking-wider text-white/50">Status</p>
            <p className="mt-1 font-display text-xl text-white">
              {status.isCheckmate
                ? `Checkmate — ${status.winner} wins`
                : status.isDraw
                  ? 'Draw'
                  : status.inCheck
                    ? `${status.turn === 'w' ? 'White' : 'Black'} to move · Check`
                    : `${status.turn === 'w' ? 'White' : 'Black'} to move`}
            </p>
          </div>

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
          <ControlButton onClick={() => copy(game.current.pgn(), 'pgn')} icon={copied === 'pgn' ? Check : Copy} full>
            {copied === 'pgn' ? 'PGN copied' : 'Copy PGN'}
          </ControlButton>

          {/* Move list */}
          <div className="min-h-[140px] flex-1 rounded-2xl border border-white/10 bg-navy-800/60 p-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-white/50">Moves</p>
            {history.length === 0 ? (
              <p className="text-sm text-white/40">Make a move to begin.</p>
            ) : (
              <ol className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-white/80 tnum">
                {Array.from({ length: Math.ceil(history.length / 2) }).map((_, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-6 text-white/40">{i + 1}.</span>
                    <span className="flex-1">{history[i * 2]}</span>
                    <span className="flex-1">{history[i * 2 + 1] ?? ''}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </aside>
      </div>
    </Container>
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
        'flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-navy-800/60 px-4 py-3 text-sm font-medium text-white/85 transition-colors hover:border-gold-500/40 hover:text-white disabled:opacity-40',
        full && 'w-full',
      )}
    >
      <Icon className="size-4" />
      {children}
    </button>
  )
}
