import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-[12px] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary:
    'bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-[var(--shadow-gold)] hover:-translate-y-0.5',
  secondary:
    'bg-solid text-solid-content hover:-translate-y-0.5 hover:brightness-110 shadow-[var(--shadow-soft)]',
  outline:
    'border border-gold-500/70 text-gold-600 hover:bg-gold-500/10 hover:border-gold-500',
  ghost: 'text-heading hover:bg-[color-mix(in_oklab,var(--color-heading)_8%,transparent)]',
  whatsapp:
    'bg-[color:var(--color-whatsapp)] text-white hover:brightness-105 hover:-translate-y-0.5 shadow-[var(--shadow-soft)]',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  loading?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    as?: 'button'
  }

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    as: 'a'
    href: string
  }

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const {
    variant = 'primary',
    size = 'md',
    loading = false,
    iconLeft,
    iconRight,
    children,
    className,
    ...rest
  } = props

  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {loading ? <Loader2 className="size-4 animate-spin" /> : iconLeft}
      {children}
      {!loading && iconRight}
    </>
  )

  if (props.as === 'a') {
    const { as: _as, ...anchorRest } = rest as ButtonAsAnchor
    return (
      <a className={classes} {...anchorRest}>
        {content}
      </a>
    )
  }

  const { as: _as, ...buttonRest } = rest as ButtonAsButton
  return (
    <button className={classes} disabled={loading} {...buttonRest}>
      {content}
    </button>
  )
}
