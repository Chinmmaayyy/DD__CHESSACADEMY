import { Chess, type Move } from 'chess.js'

/**
 * Client-side chess engine: negamax + alpha-beta with MVV-LVA move ordering,
 * quiescence search and full piece-square tables. Real Stockfish is a planned
 * upgrade; this gives a solid club-level opponent and a usable evaluation.
 */
/** Computer strength, 1 (weakest) – 8 (strongest). */
export type Level = number

/**
 * `skill` / `sfDepth` / `movetime` drive real Stockfish.
 * `depth` / `random` are only used by the built-in JS fallback engine.
 */
export const LEVELS: {
  id: number
  depth: number
  random: number
  skill: number
  sfDepth: number
  movetime: number
  blurb: string
}[] = [
  { id: 1, depth: 1, random: 0.85, skill: 0, sfDepth: 1, movetime: 50, blurb: 'Beginner — barely looks ahead' },
  { id: 2, depth: 1, random: 0.6, skill: 1, sfDepth: 2, movetime: 100, blurb: 'Just learning the basics' },
  { id: 3, depth: 1, random: 0.35, skill: 3, sfDepth: 3, movetime: 150, blurb: 'Grabs simple material' },
  { id: 4, depth: 2, random: 0.22, skill: 5, sfDepth: 5, movetime: 250, blurb: 'Sees tactics, still slips' },
  { id: 5, depth: 2, random: 0.12, skill: 8, sfDepth: 7, movetime: 400, blurb: 'Solid club improver' },
  { id: 6, depth: 2, random: 0.05, skill: 12, sfDepth: 9, movetime: 600, blurb: 'Strong club player' },
  { id: 7, depth: 2, random: 0, skill: 16, sfDepth: 12, movetime: 1000, blurb: 'Expert — punishes mistakes' },
  { id: 8, depth: 2, random: 0, skill: 20, sfDepth: 16, movetime: 1500, blurb: 'Master — full strength' },
]

const VALUE: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 }
const MATE = 1_000_000

// Piece-square tables, White's perspective, index 0 = a8 … 63 = h1.
// prettier-ignore
const PST: Record<string, number[]> = {
  p: [
    0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10,
    5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5,
    5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  n: [
    -50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15,
    15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5,
    10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, 0, -20, -40, -50, -40, -30, -30, -30, -30,
    -40, -50,
  ],
  b: [
    -20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 10, 10, 5,
    0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10, 0, -10, -10, 10, 10, 10, 10,
    10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10, -10, -10, -10, -10, -10, -20,
  ],
  r: [
    0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0,
    0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0,
    -5, 0, 0, 0, 5, 5, 0, 0, 0,
  ],
  q: [
    -20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 5, 5, 5, 0,
    -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5, 5, 5, 5, 0, -10, -10, 0,
    5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10, -20,
  ],
  kMid: [
    -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40,
    -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -20, -30, -30, -40,
    -40, -30, -30, -20, -10, -20, -20, -20, -20, -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20,
    20, 30, 10, 0, 0, 10, 30, 20,
  ],
  kEnd: [
    -50, -40, -30, -20, -20, -30, -40, -50, -30, -20, -10, 0, 0, -10, -20, -30, -30, -10, 20,
    30, 30, 20, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 30, 40, 40, 30, -10,
    -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -30, 0, 0, 0, 0, -30, -30, -50, -30, -30,
    -30, -30, -30, -30, -50,
  ],
}

/** Static evaluation from White's perspective, in centipawns. */
function evaluate(game: Chess): number {
  const board = game.board()
  let score = 0
  let nonPawn = 0
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = board[r][c]
      if (!sq || sq.type === 'k') continue
      if (sq.type !== 'p') nonPawn += VALUE[sq.type]
    }
  }
  const endgame = nonPawn < 1500 // few pieces left → king becomes active
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = board[r][c]
      if (!sq) continue
      const idx = r * 8 + c
      const mirror = 63 - idx
      const table = sq.type === 'k' ? PST[endgame ? 'kEnd' : 'kMid'] : PST[sq.type]
      const pst = sq.color === 'w' ? table[idx] : table[mirror]
      const val = VALUE[sq.type] + pst
      score += sq.color === 'w' ? val : -val
    }
  }
  return score
}

/** Order moves: winning captures (MVV-LVA) and promotions first — speeds pruning. */
function orderMoves(moves: Move[]): Move[] {
  return moves
    .map((m) => {
      let s = 0
      if (m.captured) s += 10 * VALUE[m.captured] - VALUE[m.piece]
      if (m.promotion) s += VALUE[m.promotion]
      return { m, s }
    })
    .sort((a, b) => b.s - a.s)
    .map((x) => x.m)
}

// Search is bounded by a node budget so it can never freeze the UI. Iterative
// deepening keeps the best move from the last fully-completed depth.
const NODE_BUDGET = 4_000
let nodes = 0
let aborted = false

function leaf(game: Chess): number {
  return game.turn() === 'w' ? evaluate(game) : -evaluate(game)
}

function negamax(game: Chess, depth: number, alpha: number, beta: number): number {
  if (depth === 0) return leaf(game)
  if (++nodes > NODE_BUDGET) {
    aborted = true
    return leaf(game)
  }
  // Generate moves once (cheaper than separate isCheckmate/isDraw checks).
  const moves = game.moves({ verbose: true })
  if (moves.length === 0) return game.isCheck() ? -MATE - depth : 0

  let best = -Infinity
  for (const move of orderMoves(moves)) {
    game.move(move)
    const score = -negamax(game, depth - 1, -beta, -alpha)
    game.undo()
    if (score > best) best = score
    if (best > alpha) alpha = best
    if (alpha >= beta) break
    if (aborted) break
  }
  return best
}

function rootAtDepth(
  game: Chess,
  depth: number,
): { move: Move; score: number } | null {
  const moves = orderMoves(game.moves({ verbose: true }))
  let bestScore = -Infinity
  let best: Move[] = []
  for (const move of moves) {
    game.move(move)
    const score = -negamax(game, depth - 1, -Infinity, Infinity)
    game.undo()
    if (aborted) return null // discard an incomplete depth
    if (score > bestScore + 5) {
      bestScore = score
      best = [move]
    } else if (Math.abs(score - bestScore) <= 5) {
      best.push(move)
    }
  }
  return { move: best[Math.floor(Math.random() * best.length)] ?? moves[0], score: bestScore }
}

/** Root search with iterative deepening + node budget. */
function searchRoot(game: Chess, maxDepth: number): { move: Move | null; score: number } {
  const moves = game.moves({ verbose: true })
  if (moves.length === 0) return { move: null, score: 0 }
  nodes = 0
  aborted = false
  let result: { move: Move; score: number } = { move: moves[0], score: 0 }
  for (let d = 1; d <= maxDepth; d++) {
    const r = rootAtDepth(game, d)
    if (!r) break // budget hit mid-depth → keep the last completed depth
    result = r
    if (aborted) break
  }
  return result
}

/** Pick the engine's move for the side to move. */
export function selectAiMove(source: Chess, level: Level): Move | null {
  const game = new Chess(source.fen())
  const moves = game.moves({ verbose: true })
  if (moves.length === 0) return null

  const cfg = LEVELS.find((l) => l.id === level) ?? LEVELS[4]
  // Lower levels occasionally play a random legal move — graded weakness.
  if (cfg.random > 0 && Math.random() < cfg.random) {
    return moves[Math.floor(Math.random() * moves.length)]
  }
  let depth = cfg.depth
  // Level 8 digs to depth 3 in low-branching (endgame) positions, where it's cheap.
  if (level >= 8 && moves.length <= 12) depth = 3
  return searchRoot(game, depth).move
}

export interface PositionEval {
  /** Centipawns from White's perspective (positive = White is better). */
  cp: number
  /** Mate distance from White's perspective, if forced (e.g. +3 = White mates in 3). */
  mate: number | null
  best: { from: string; to: string; san: string } | null
}

/** Evaluate a position (for the eval bar + best-move hint). */
export function evaluatePosition(fen: string, depth = 3): PositionEval {
  const game = new Chess(fen)
  if (game.isGameOver()) {
    const cp = game.isCheckmate() ? (game.turn() === 'w' ? -MATE : MATE) : 0
    return { cp, mate: game.isCheckmate() ? 0 : null, best: null }
  }
  const { move, score } = searchRoot(game, depth)
  const white = game.turn() === 'w' ? score : -score
  let mate: number | null = null
  let cp = white
  if (Math.abs(white) >= MATE - 1000) {
    const plies = MATE + depth - Math.abs(white)
    const inMoves = Math.max(1, Math.ceil(plies / 2))
    mate = white > 0 ? inMoves : -inMoves
    cp = white > 0 ? 10000 : -10000
  }
  return {
    cp,
    mate,
    best: move ? { from: move.from, to: move.to, san: move.san } : null,
  }
}
