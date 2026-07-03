import type { CSSProperties } from 'react'

/** Brand board colours (matches the hero board). */
export const darkSquareStyle: CSSProperties = { backgroundColor: '#1f5a48' }
export const lightSquareStyle: CSSProperties = { backgroundColor: '#efe6cd' }

/** Whether a square (e.g. "e4") is a dark square — a1 is dark. */
export function isDarkSquare(square: string): boolean {
  const file = square.charCodeAt(0) - 97 // a → 0
  const rank = Number(square[1]) - 1 // 1 → 0
  return (file + rank) % 2 === 0
}

/**
 * Dot shown on a legal (non-capture) target square. Colour adapts to the square
 * so it stays clearly visible on both the dark-green and cream squares.
 */
export function legalDot(square: string): CSSProperties {
  const color = isDarkSquare(square) ? 'rgba(240,242,236,0.55)' : 'rgba(11,18,32,0.34)'
  return { background: `radial-gradient(circle, ${color} 21%, transparent 23%)` }
}

/** Ring shown on a legal capture (a target square holding an enemy piece). */
export function legalCapture(square: string): CSSProperties {
  const color = isDarkSquare(square) ? 'rgba(255,214,102,0.85)' : 'rgba(184,149,43,0.8)'
  return {
    background: `radial-gradient(circle, transparent 56%, ${color} 58%, transparent 82%)`,
  }
}

/** Static fallbacks (kept for compatibility). */
export const legalDotStyle: CSSProperties = {
  background: 'radial-gradient(circle, rgba(11,18,32,0.3) 21%, transparent 23%)',
}
export const legalCaptureStyle: CSSProperties = {
  background: 'radial-gradient(circle, transparent 56%, rgba(212,175,55,0.6) 58%, transparent 82%)',
}
export const selectedSquareStyle: CSSProperties = {
  backgroundColor: 'rgba(212,175,55,0.45)',
}
export const lastMoveStyle: CSSProperties = {
  backgroundColor: 'rgba(212,175,55,0.28)',
}
export const checkSquareStyle: CSSProperties = {
  background: 'radial-gradient(circle, rgba(239,68,68,0.75) 40%, transparent 75%)',
}
