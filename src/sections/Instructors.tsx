import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { instructors } from '@/data/instructors'

function Rating({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-lg border border-hairline bg-surface-2 px-1 py-1.5 text-center">
      <p className="font-display text-sm font-semibold text-heading tnum">{value ?? '—'}</p>
      <p className="text-[9px] uppercase tracking-wider text-muted">{label}</p>
    </div>
  )
}

export function Instructors() {
  return (
    <Section id="instructors" tone="light">
      <Container>
        <SectionHeading
          eyebrow="👥 Our Team"
          title="Meet Our Instructors"
          description="A dedicated, rated coaching team that makes professional chess training warm, structured and genuinely enjoyable for every student."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((person, i) => (
            <Reveal key={person.name} delay={(i % 3) * 0.08} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-[22px] border border-hairline bg-surface shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]">
                {/* Portrait */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center bg-inverse font-display text-6xl font-semibold text-gold-400">
                      {person.name.charAt(0)}
                    </span>
                  )}
                  {person.tags && person.tags.length > 0 && (
                    <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 bg-gradient-to-t from-navy-900/85 to-transparent p-3 pt-8">
                      {person.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gold-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold text-heading">{person.name}</h3>
                  <p className="mt-0.5 text-sm font-semibold text-accent">{person.title}</p>

                  {person.ratings && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <Rating label="Std" value={person.ratings.std} />
                      <Rating label="Rapid" value={person.ratings.rapid} />
                      <Rating label="Blitz" value={person.ratings.blitz} />
                    </div>
                  )}

                  <blockquote className="mt-4 flex-1 border-t border-hairline pt-4 text-sm italic leading-relaxed text-muted">
                    “{person.quote}”
                  </blockquote>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
