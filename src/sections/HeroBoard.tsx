import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE_OUT } from '@/lib/motion'
import { PIECE_SVG } from '@/data/pieceSvg'

/**
 * Hero board that AUTO-PLAYS a real game on a loop, using proper vector
 * pieces (open-source cburnett set). Game: the "Opera Game" — Paul Morphy
 * vs. Duke Karl / Count Isouard, Paris 1858 — ending in a queen sacrifice
 * and rook mate. Reduced-motion users get a static mid-game position.
 */

const LIGHT = '#efe6cd'
const DARK = '#1f5a48'

type Color = 'w' | 'b'
type Type = 'p' | 'n' | 'b' | 'r' | 'q' | 'k'
interface PieceDef {
  type: Type
  color: Color
  start: string
}

const p = (color: Color, type: Type, start: string): PieceDef => ({ color, type, start })

const PIECES: Record<string, PieceDef> = {
  wRa: p('w', 'r', 'a1'), wNb: p('w', 'n', 'b1'), wBc: p('w', 'b', 'c1'),
  wQ: p('w', 'q', 'd1'), wK: p('w', 'k', 'e1'), wBf: p('w', 'b', 'f1'),
  wNg: p('w', 'n', 'g1'), wRh: p('w', 'r', 'h1'),
  wPa: p('w', 'p', 'a2'), wPb: p('w', 'p', 'b2'), wPc: p('w', 'p', 'c2'),
  wPd: p('w', 'p', 'd2'), wPe: p('w', 'p', 'e2'), wPf: p('w', 'p', 'f2'),
  wPg: p('w', 'p', 'g2'), wPh: p('w', 'p', 'h2'),
  bRa: p('b', 'r', 'a8'), bNb: p('b', 'n', 'b8'), bBc: p('b', 'b', 'c8'),
  bQ: p('b', 'q', 'd8'), bK: p('b', 'k', 'e8'), bBf: p('b', 'b', 'f8'),
  bNg: p('b', 'n', 'g8'), bRh: p('b', 'r', 'h8'),
  bPa: p('b', 'p', 'a7'), bPb: p('b', 'p', 'b7'), bPc: p('b', 'p', 'c7'),
  bPd: p('b', 'p', 'd7'), bPe: p('b', 'p', 'e7'), bPf: p('b', 'p', 'f7'),
  bPg: p('b', 'p', 'g7'), bPh: p('b', 'p', 'h7'),
}

// The Opera Game. Castling encoded as two consecutive piece moves.
const MOVES: Array<[string, string]> = [
  ['e2', 'e4'], ['e7', 'e5'],
  ['g1', 'f3'], ['d7', 'd6'],
  ['d2', 'd4'], ['c8', 'g4'],
  ['d4', 'e5'], ['g4', 'f3'],
  ['d1', 'f3'], ['d6', 'e5'],
  ['f1', 'c4'], ['g8', 'f6'],
  ['f3', 'b3'], ['d8', 'e7'],
  ['b1', 'c3'], ['c7', 'c6'],
  ['c1', 'g5'], ['b7', 'b5'],
  ['c3', 'b5'], ['c6', 'b5'],
  ['c4', 'b5'], ['b8', 'd7'],
  ['e1', 'c1'], ['a1', 'd1'], // O-O-O
  ['a8', 'd8'],
  ['d1', 'd7'], ['d8', 'd7'],
  ['h1', 'd1'], ['e7', 'e6'],
  ['b5', 'd7'], ['f6', 'd7'],
  ['b3', 'b8'], ['d7', 'b8'],
  ['d1', 'd8'], // Rd8# mate
]

type Positions = Record<string, string | null>
interface Board {
  pos: Positions
  from: string | null
  to: string | null
}

const START: Positions = Object.fromEntries(
  Object.entries(PIECES).map(([id, def]) => [id, def.start]),
)

function squareToRC(square: string) {
  const file = square.charCodeAt(0) - 97
  const rank = Number(square[1])
  return { row: 8 - rank, col: file }
}

function applyMove(prev: Positions, [from, to]: [string, string]): Positions {
  const next = { ...prev }
  let moverId: string | null = null
  for (const [id, sq] of Object.entries(prev)) if (sq === from) moverId = id
  if (!moverId) return prev
  for (const [id, sq] of Object.entries(prev)) if (sq === to && id !== moverId) next[id] = null
  next[moverId] = to
  return next
}

export function HeroBoard() {
  const [board, setBoard] = useState<Board>({ pos: START, from: null, to: null })

  const prefersReduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useEffect(() => {
    if (prefersReduced) {
      let pos = { ...START }
      for (let i = 0; i < 12; i++) pos = applyMove(pos, MOVES[i])
      setBoard({ pos, from: null, to: null })
      return
    }

    // Local closure vars → nothing impure inside setState (StrictMode-safe).
    let step = 0
    let current: Positions = { ...START }
    setBoard({ pos: current, from: null, to: null })

    const id = window.setInterval(() => {
      if (step >= MOVES.length) {
        step = 0
        current = { ...START }
        setBoard({ pos: current, from: null, to: null })
        return
      }
      const [from, to] = MOVES[step]
      current = applyMove(current, MOVES[step])
      step += 1
      setBoard({ pos: current, from, to })
    }, 1150)

    return () => window.clearInterval(id)
  }, [prefersReduced])

  const cellStyle = (square: string) => {
    const { row, col } = squareToRC(square)
    return {
      transform: `translate(${col * 100}%, ${row * 100}%)`,
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="glow-gold absolute -inset-10 -z-10" />

      <motion.div
        initial={{ opacity: 0, rotateX: 16, y: 26 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="relative aspect-square overflow-hidden rounded-[20px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
      >
        {/* Squares */}
        <div className="grid h-full w-full grid-cols-8">
          {Array.from({ length: 64 }).map((_, i) => {
            const row = Math.floor(i / 8)
            const col = i % 8
            const isDark = (row + col) % 2 === 1
            return <div key={i} style={{ background: isDark ? DARK : LIGHT }} />
          })}
        </div>

        {/* Pieces */}
        {Object.entries(PIECES).map(([id, def]) => {
          const sq = board.pos[id]
          const captured = sq === null
          const svgKey = `${def.color}${def.type.toUpperCase()}`
          return (
            <span
              key={id}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 grid place-items-center"
              style={{
                width: '12.5%',
                height: '12.5%',
                transform: captured ? undefined : cellStyle(sq!).transform,
                transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease',
                opacity: captured ? 0 : 1,
                filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.35))',
              }}
            >
              <svg
                viewBox="0 0 45 45"
                style={{ width: '86%', height: '86%' }}
                dangerouslySetInnerHTML={{ __html: PIECE_SVG[svgKey] }}
              />
            </span>
          )
        })}
      </motion.div>

      {/* Caption row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-inverse/70 px-4 py-3 backdrop-blur-sm"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400">
            FIDE Trainer · National Arbiter
          </p>
          <p className="mt-0.5 font-display text-sm text-inverse-content">Dipak Dhuri</p>
        </div>
        <span className="flex items-center gap-2 text-[11px] font-medium text-inverse-content/60">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-gold-500" />
          </span>
          Live game
        </span>
      </motion.div>
    </div>
  )
}
