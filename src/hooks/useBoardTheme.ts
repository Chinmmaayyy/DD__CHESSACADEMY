import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import {
  BOARD_THEMES,
  DEFAULT_BOARD_THEME,
  type BoardTheme,
} from '@/features/learn/boardTheme'

const STORAGE_KEY = 'dd-board-theme'

/** Board colour scheme, persisted so it follows the student across all boards. */
export function useBoardTheme() {
  const [id, setId] = useState<string>(() => {
    if (typeof window === 'undefined') return DEFAULT_BOARD_THEME
    return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_BOARD_THEME
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, id)
  }, [id])

  const theme: BoardTheme = BOARD_THEMES.find((t) => t.id === id) ?? BOARD_THEMES[0]
  const setTheme = useCallback((next: string) => setId(next), [])

  const lightSquareStyle: CSSProperties = { backgroundColor: theme.light }
  const darkSquareStyle: CSSProperties = { backgroundColor: theme.dark }

  return { theme, themeId: theme.id, setTheme, lightSquareStyle, darkSquareStyle }
}
