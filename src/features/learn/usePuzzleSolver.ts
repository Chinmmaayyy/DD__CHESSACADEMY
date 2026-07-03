import { useCallback, useEffect, useRef, useState } from 'react'
import { Chess } from 'chess.js'
import type { PuzzleData } from './puzzleData'
import { bumpStreak, markSolved } from './puzzleData'

export type PuzzleOutcome = null | 'solved' | 'shown'

interface Move {
  from: string
  to: string
}

/** Drives a single puzzle: multi-move solving with auto opponent replies. */
export function usePuzzleSolver(puzzle: PuzzleData) {
  const gameRef = useRef(new Chess(puzzle.fen))
  const stepRef = useRef(0)
  const [fen, setFen] = useState(puzzle.fen)
  const [progress, setProgress] = useState(0)
  const [outcome, setOutcome] = useState<PuzzleOutcome>(null)
  const [wrong, setWrong] = useState(false)
  const [hint, setHint] = useState(false)
  const [lastMove, setLastMove] = useState<Move | null>(null)
  const timers = useRef<number[]>([])

  const playerMoveCount = Math.ceil(puzzle.moves.length / 2)

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  const restart = useCallback(() => {
    clearTimers()
    gameRef.current = new Chess(puzzle.fen)
    stepRef.current = 0
    setFen(puzzle.fen)
    setProgress(0)
    setOutcome(null)
    setWrong(false)
    setHint(false)
    setLastMove(null)
  }, [puzzle.fen])

  // Reset whenever the puzzle changes.
  useEffect(() => {
    restart()
    return clearTimers
  }, [restart])

  const applyUci = (uci: string) => {
    const from = uci.slice(0, 2)
    const to = uci.slice(2, 4)
    const promotion = uci[4]
    gameRef.current.move({ from, to, promotion })
    setFen(gameRef.current.fen())
    setLastMove({ from, to })
  }

  const finishSolve = (via: PuzzleOutcome) => {
    setOutcome(via)
    if (via === 'solved') {
      markSolved(puzzle.id)
      bumpStreak()
    }
  }

  /** Called on a player drop. Returns true if the move was accepted. */
  const attempt = (from: string, to: string): boolean => {
    if (outcome) return false
    const step = stepRef.current
    const expected = puzzle.moves[step]
    if (!expected) return false

    const promo = expected.length === 5 ? expected[4] : 'q'
    // Validate on a clone first so we never apply a wrong move.
    let mv
    try {
      const clone = new Chess(gameRef.current.fen())
      mv = clone.move({ from, to, promotion: promo })
    } catch {
      mv = null
    }
    if (!mv) {
      flashWrong()
      return false
    }
    const actual = mv.from + mv.to + (mv.promotion ?? '')
    if (actual !== expected) {
      flashWrong()
      return false
    }

    // Correct — apply the player's move.
    applyUci(expected)
    stepRef.current += 1
    setProgress(Math.ceil(stepRef.current / 2))
    setHint(false)

    if (stepRef.current >= puzzle.moves.length) {
      finishSolve('solved')
      return true
    }

    // Auto-play the opponent's reply.
    const t = window.setTimeout(() => {
      applyUci(puzzle.moves[stepRef.current])
      stepRef.current += 1
      if (stepRef.current >= puzzle.moves.length) finishSolve('solved')
    }, 380)
    timers.current.push(t)
    return true
  }

  const flashWrong = () => {
    setWrong(true)
    const t = window.setTimeout(() => setWrong(false), 650)
    timers.current.push(t)
  }

  const showSolution = () => {
    clearTimers()
    gameRef.current = new Chess(puzzle.fen)
    setFen(puzzle.fen)
    let i = 0
    const playNext = () => {
      if (i >= puzzle.moves.length) {
        finishSolve('shown')
        return
      }
      applyUci(puzzle.moves[i])
      i += 1
      const t = window.setTimeout(playNext, 550)
      timers.current.push(t)
    }
    playNext()
  }

  // Hint highlights the from-square of the next expected move.
  const hintSquare = hint && !outcome ? puzzle.moves[stepRef.current]?.slice(0, 2) : null

  return {
    fen,
    outcome,
    wrong,
    progress,
    playerMoveCount,
    lastMove,
    hintSquare,
    attempt,
    showSolution,
    restart,
    revealHint: () => setHint(true),
  }
}
