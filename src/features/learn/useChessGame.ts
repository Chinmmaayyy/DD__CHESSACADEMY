import { useCallback, useRef, useState } from 'react'
import { Chess, type Move, type Square } from 'chess.js'

export interface GameStatus {
  isGameOver: boolean
  isCheckmate: boolean
  isDraw: boolean
  isStalemate: boolean
  inCheck: boolean
  turn: 'w' | 'b'
  winner: 'White' | 'Black' | null
}

function readStatus(game: Chess): GameStatus {
  const isCheckmate = game.isCheckmate()
  return {
    isGameOver: game.isGameOver(),
    isCheckmate,
    isDraw: game.isDraw(),
    isStalemate: game.isStalemate(),
    inCheck: game.inCheck(),
    turn: game.turn(),
    winner: isCheckmate ? (game.turn() === 'w' ? 'Black' : 'White') : null,
  }
}

/** Thin reactive wrapper around a chess.js instance. */
export function useChessGame(initialFen?: string) {
  const gameRef = useRef(new Chess(initialFen))
  const [fen, setFen] = useState(gameRef.current.fen())
  const [status, setStatus] = useState<GameStatus>(readStatus(gameRef.current))
  const [history, setHistory] = useState<string[]>([])

  const sync = useCallback(() => {
    const g = gameRef.current
    setFen(g.fen())
    setStatus(readStatus(g))
    setHistory(g.history())
  }, [])

  const move = useCallback(
    (m: { from: string; to: string; promotion?: string }): Move | null => {
      try {
        const result = gameRef.current.move(m)
        sync()
        return result
      } catch {
        return null
      }
    },
    [sync],
  )

  const undo = useCallback(() => {
    gameRef.current.undo()
    sync()
  }, [sync])

  const reset = useCallback(
    (nextFen?: string) => {
      gameRef.current = new Chess(nextFen)
      sync()
    },
    [sync],
  )

  const legalTargets = useCallback((square: string): string[] => {
    return gameRef.current
      .moves({ square: square as Square, verbose: true })
      .map((m) => m.to)
  }, [])

  return { game: gameRef, fen, status, history, move, undo, reset, legalTargets, sync }
}
