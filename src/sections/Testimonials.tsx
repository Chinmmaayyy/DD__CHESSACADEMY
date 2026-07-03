import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type TransitionEvent,
} from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { testimonials } from '@/data/testimonials'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/types'

const GAP = 24
const ROTATE_MS = 5000
const N = testimonials.length
// Three copies so the track can always advance forward into a fresh copy and be
// silently re-centred at the seam — giving a seamless infinite loop.
const SLIDES = [...testimonials, ...testimonials, ...testimonials]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < rating ? 'size-4 fill-gold-500 text-gold-500' : 'size-4 text-muted'}
        />
      ))}
    </div>
  )
}

function Slide({ t, active, width }: { t: Testimonial; active: boolean; width: number }) {
  return (
    <figure
      style={{ width }}
      aria-hidden={!active}
      className={cn(
        'flex shrink-0 flex-col justify-between rounded-[24px] border p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-9',
        active
          ? 'scale-100 border-gold-500/50 bg-surface opacity-100 shadow-[var(--shadow-large)]'
          : 'scale-[0.9] border-hairline bg-surface opacity-40 shadow-[var(--shadow-soft)]',
      )}
    >
      <div>
        <Quote className="size-8 text-gold-500/50" />
        <blockquote className="mt-4 text-[17px] leading-relaxed text-heading sm:text-lg">
          "{t.review}"
        </blockquote>
      </div>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-hairline pt-5">
        <span className="grid size-12 place-items-center rounded-full bg-inverse font-display text-lg font-semibold text-gold-400">
          {t.author.charAt(0)}
        </span>
        <div className="flex-1">
          <p className="font-semibold text-heading">{t.author}</p>
          <p className="text-xs text-muted">
            {t.relation}
            {t.student ? ` · ${t.student}` : ''}
          </p>
        </div>
        <Stars rating={t.rating} />
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  const [active, setActive] = useState(N) // start in the middle copy
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [wrapW, setWrapW] = useState(0)
  const [cardW, setCardW] = useState(560)

  const realActive = ((active % N) + N) % N

  // Measure viewport so the active card is centred with neighbours peeking.
  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      setWrapW(w)
      setCardW(Math.min(Math.round(w * 0.82), 600))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const next = useCallback(() => setActive((a) => a + 1), [])
  const prev = useCallback(() => setActive((a) => a - 1), [])
  const goTo = useCallback(
    (i: number) => setActive((a) => a - (((a % N) + N) % N) + i),
    [],
  )

  // Auto-advance; pause on hover / hidden tab.
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(next, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [paused, next, active])

  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  // After a jump with transitions off, re-enable them on the next frame.
  useEffect(() => {
    if (animate) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(id)
  }, [animate])

  // At the seam, snap back into the middle copy without animating. Only react to
  // the track's own transform transition (ignore bubbling scale/opacity from cards).
  const handleEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (active >= 2 * N) {
      setAnimate(false)
      setActive(active - N)
    } else if (active < N) {
      setAnimate(false)
      setActive(active + N)
    }
  }

  const offset = wrapW > 0 ? wrapW / 2 - (active * (cardW + GAP) + cardW / 2) : 0

  return (
    <Section id="testimonials" tone="ivory">
      <Container>
        <SectionHeading
          eyebrow="💬 Testimonials"
          title="What Parents & Students Say"
          description="The trust of our families is our greatest achievement. Here is what they have to share."
        />

        <div
          ref={wrapRef}
          className="relative mt-14 overflow-hidden py-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          role="group"
          aria-roledescription="carousel"
          aria-label="Testimonials"
        >
          <div
            className="flex items-center"
            style={{
              gap: GAP,
              transform: `translateX(${offset}px)`,
              transition: animate
                ? 'transform 0.7s cubic-bezier(0.22,1,0.36,1)'
                : 'none',
            }}
            onTransitionEnd={handleEnd}
          >
            {SLIDES.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i % N)}
                tabIndex={i === active ? -1 : 0}
                aria-label={`Show review from ${t.author}`}
                className="shrink-0 cursor-pointer p-0 text-left focus:outline-none"
              >
                <Slide t={t} active={i === active} width={cardW} />
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="grid size-10 place-items-center rounded-full border border-hairline text-heading transition-colors hover:border-gold-500/60 hover:text-accent"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.author}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === realActive}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === realActive ? 'w-8 bg-gold-500' : 'w-2 bg-hairline hover:bg-muted',
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="grid size-10 place-items-center rounded-full border border-hairline text-heading transition-colors hover:border-gold-500/60 hover:text-accent"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </Container>
    </Section>
  )
}
