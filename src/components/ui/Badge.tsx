import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  variant?: 'gold' | 'dark' | 'light'
  className?: string
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const styles = {
    gold: 'bg-gold-500/12 text-accent border border-gold-500/30',
    dark: 'bg-white/10 text-gold-300 border border-white/15',
    light: 'bg-surface-2 text-heading border border-hairline',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
