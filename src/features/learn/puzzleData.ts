import raw from '@/data/puzzles.generated.json'

export type Tier = 'Beginner' | 'Intermediate' | 'Advanced'

export interface PuzzleData {
  id: string
  n: number
  fen: string
  /** Solution in UCI, alternating solver / opponent, solver moves first. */
  moves: string[]
  san: string[]
  rating: number
  tier: Tier
  sideToMove: 'White' | 'Black'
  themes: string[]
}

export const allPuzzles = raw as PuzzleData[]

export const tiers: Tier[] = ['Beginner', 'Intermediate', 'Advanced']

/** Distinct, human-friendly themes present in the set. */
export const allThemes = Array.from(
  new Set(allPuzzles.flatMap((p) => p.themes)),
).sort()

export function tierColor(tier: Tier): string {
  return tier === 'Beginner'
    ? 'text-emerald-400'
    : tier === 'Intermediate'
      ? 'text-gold-400'
      : 'text-rose-400'
}

export function prettyTheme(theme: string): string {
  return theme
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^\w/, (c) => c.toUpperCase())
}

/** Deterministic "puzzle of the day". */
export function getDailyPuzzle(date = new Date()): PuzzleData {
  const start = new Date(date.getFullYear(), 0, 0)
  const day = Math.floor((date.getTime() - start.getTime()) / 86400000)
  return allPuzzles[day % allPuzzles.length]
}

/* ----------------------------- localStorage ----------------------------- */

const SOLVED_KEY = 'dd_solved_puzzles'
const STREAK_KEY = 'dd_puzzle_streak'
const STREAK_DATE_KEY = 'dd_puzzle_last'

export function getSolvedSet(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(SOLVED_KEY) ?? '[]'))
  } catch {
    return new Set()
  }
}

export function isSolved(id: string): boolean {
  return getSolvedSet().has(id)
}

export function markSolved(id: string): void {
  const set = getSolvedSet()
  set.add(id)
  localStorage.setItem(SOLVED_KEY, JSON.stringify([...set]))
}

export function getStreak(): number {
  const n = Number(localStorage.getItem(STREAK_KEY) ?? '0')
  return Number.isFinite(n) ? n : 0
}

/** Bump the streak at most once per calendar day. Returns the new streak. */
export function bumpStreak(): number {
  const today = new Date().toISOString().slice(0, 10)
  const last = localStorage.getItem(STREAK_DATE_KEY)
  if (last === today) return getStreak()

  // Continue streak if last solve was yesterday, else restart at 1.
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  const next = last === yesterday ? getStreak() + 1 : 1
  localStorage.setItem(STREAK_KEY, String(next))
  localStorage.setItem(STREAK_DATE_KEY, today)
  return next
}
