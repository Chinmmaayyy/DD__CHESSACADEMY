import type { CSSProperties } from 'react'

/** Brand board colours (matches the hero board). */
export const darkSquareStyle: CSSProperties = { backgroundColor: '#1f5a48' }
export const lightSquareStyle: CSSProperties = { backgroundColor: '#efe6cd' }

/** Dot shown on legal target squares. */
export const legalDotStyle: CSSProperties = {
  background:
    'radial-gradient(circle, rgba(11,18,32,0.28) 20%, transparent 22%)',
}
/** Dot for a legal capture (ring). */
export const legalCaptureStyle: CSSProperties = {
  background:
    'radial-gradient(circle, transparent 55%, rgba(212,175,55,0.55) 56%)',
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
