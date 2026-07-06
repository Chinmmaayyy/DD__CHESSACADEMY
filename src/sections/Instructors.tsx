import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { instructors } from '@/data/instructors'

export function Instructors() {
  return (
    <Section id="instructors" tone="light">
      <Container>
        <SectionHeading
          eyebrow="👥 Our Team"
          title="Meet Our Instructors"
          description="A dedicated coaching team that makes professional chess training warm, structured and genuinely enjoyable for every student."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((person, i) => (
            <Reveal key={`${person.name}-${i}`} delay={(i % 3) * 0.08} className="h-full">
              <div className="flex h-full flex-col items-center rounded-[22px] border border-hairline bg-surface p-7 text-center shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]">
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="size-24 rounded-full border-2 border-gold-500/40 object-cover object-top"
                  />
                ) : (
                  <span className="grid size-24 place-items-center rounded-full border-2 border-gold-500/40 bg-inverse font-display text-3xl font-semibold text-gold-400">
                    {person.name.charAt(0)}
                  </span>
                )}

                <h3 className="mt-5 font-display text-xl font-semibold text-heading">
                  {person.name}
                </h3>
                <p className="mt-0.5 text-sm font-semibold text-accent">{person.title}</p>

                {person.tags && person.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {person.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-sm leading-relaxed text-muted">{person.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
