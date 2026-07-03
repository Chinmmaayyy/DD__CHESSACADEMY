import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-[720px]',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'eyebrow inline-flex items-center gap-2',
            dark ? 'text-gold-400' : 'text-accent',
          )}
        >
          <span className="h-px w-6 bg-current opacity-60" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'mt-4 text-[clamp(1.9rem,4vw,2.75rem)] font-semibold',
          dark ? 'text-white' : 'text-heading',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-[17px] leading-relaxed',
            dark ? 'text-white/70' : 'text-muted',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
