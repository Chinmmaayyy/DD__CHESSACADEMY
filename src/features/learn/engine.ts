import { Chess, type Move } from 'chess.js'

/** Client-side chess engine (negamax + alpha-beta). Stockfish is a future upgrade. */
export type Level = 'beginner' | 'easy' | 'intermediate' | 'advanced'

export const LEVELS: { id: Level; label: string; depth: number; blurb: string }[] = [
  { id: 'beginner', label: 'Beginner', depth: 0, blurb: 'Random legal moves' },
  { id: 'easy', label: 'Easy', depth: 1, blurb: 'Grabs material' },
  { id: 'intermediate', label: 'Intermediate', depth: 2, blurb: 'Looks a move ahead' },
  { id: 'advanced', label: 'Advanced', depth: 3, blurb: 'Calculates deeper' },
]

const VALUE: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 }

// Small piece-square table (pawns + knights) to encourage sensible development.
// Indexed from white's perspective, rank 8 → rank 1.
const PAWN_PST = [
  0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10,
  5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5,
  5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0,
]
const KNIGHT_PST = [
  -50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15,
  15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5,
  10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, 0, -20, -40, -50, -40, -30, -30, -30, -30,
  -40, -50,
]

/** Static evaluation from White's perspective (centipawns). */
function evaluate(game: Chess): number {
  const board = game.board()
  let score = 0
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = board[r][c]
      if (!sq) continue
      const idx = r * 8 + c
      const base = VALUE[sq.type]
      let pst = 0
      if (sq.type === 'p') pst = sq.color === 'w' ? PAWN_PST[idx] : PAWN_PST[63 - idx]
      else if (sq.type === 'n') pst = sq.color === 'w' ? KNIGHT_PST[idx] : KNIGHT_PST[63 - idx]
      const val = base + pst
      score += sq.color === 'w' ? val : -val
    }
  }
  return score
}

function negamax(game: Chess, depth: number, alpha: number, beta: number): number {
  if (game.isGameOver()) {
    if (game.isCheckmate()) return -100000 - depth // being mated is bad; prefer later mates
    return 0 // stalemate / draw
  }
  if (depth === 0) {
    const e = evaluate(game)
    return game.turn() === 'w' ? e : -e
  }
  let best = -Infinity
  for (const move of game.moves({ verbose: true })) {
    game.move(move)
    const score = -negamax(game, depth - 1, -beta, -alpha)
    game.undo()
    if (score > best) best = score
    if (best > alpha) alpha = best
    if (alpha >= beta) break
  }
  return best
}

/** Pick the engine's move for the side to move. */
export function selectAiMove(source: Chess, level: Level): Move | null {
  const game = new Chess(source.fen())
  const moves = game.moves({ verbose: true })
  if (moves.length === 0) return null

  const depth = LEVELS.find((l) => l.id === level)?.depth ?? 1
  if (depth === 0) return moves[Math.floor(Math.random() * moves.length)]

  let bestScore = -Infinity
  let best: Move[] = []
  for (const move of moves) {
    game.move(move)
    const score = -negamax(game, depth - 1, -Infinity, Infinity)
    game.undo()
    if (score > bestScore + 5) {
      bestScore = score
      best = [move]
    } else if (Math.abs(score - bestScore) <= 5) {
      best.push(move)
    }
  }
  // Small randomness among near-equal moves for variety.
  return best[Math.floor(Math.random() * best.length)] ?? moves[0]
}
