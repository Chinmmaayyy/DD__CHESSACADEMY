import { CalendarDays, MapPin, ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'
import { events } from '@/data/events'
import { cn } from '@/lib/utils'

export function Events() {
  return (
    <Section id="events" tone="light">
      <Container>
        <SectionHeading
          eyebrow="📅 Events & Tournaments"
          title="A Living, Competing Academy"
          description="Regular tournaments, camps and workshops give every student real competitive experience in a supportive setting."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {events.map((e, i) => (
            <Reveal key={e.title} delay={(i % 3) * 0.08} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-hairline bg-canvas transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]">
                {/* banner */}
                <div className="relative h-40 overflow-hidden bg-inverse">
                  {e.image ? (
                    <img
                      src={e.image}
                      alt={e.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="chess-grid absolute inset-0 opacity-40" />
                  )}
                  {/* readability scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/25 to-navy-900/40" />
                  <div className="absolute left-5 top-5">
                    <Badge variant={e.status === 'upcoming' ? 'gold' : 'dark'}>
                      {e.status === 'upcoming' ? 'Upcoming' : 'Past'}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/90">
                    <CalendarDays className="size-4" />
                    {e.date}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {e.format}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-heading">
                    {e.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                    {e.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <MapPin className="size-3.5" />
                      {e.venue}
                    </span>
                    {e.status === 'upcoming' && (
                      <a
                        href="#contact"
                        className={cn(
                          'inline-flex items-center gap-1 text-sm font-semibold text-heading transition-colors hover:text-accent',
                        )}
                      >
                        Register
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
