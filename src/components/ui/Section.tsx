import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  tone?: 'light' | 'ivory' | 'dark'
}

/** Standard section wrapper enforcing the vertical rhythm (128 / 72 / 56px). */
export function Section({ id, children, className, tone = 'ivory' }: SectionProps) {
  const tones = {
    light: 'bg-surface text-content',
    ivory: 'bg-canvas text-content',
    dark: 'bg-inverse text-inverse-content',
  }
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 py-14 sm:py-20 lg:py-28',
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  )
}
