import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { instructors } from '@/data/instructors'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

function Rating({ label, value }: { label: string; value?: number }) {
  return (
    <div className="rounded-lg border border-hairline bg-surface-2 px-1 py-1.5 text-center">
      <p className="font-display text-sm font-semibold text-heading tnum">{value ?? '—'}</p>
      <p className="text-[9px] uppercase tracking-wider text-muted">{label}</p>
    </div>
  )
}

export function CoachesPage() {
  useDocumentMeta({
    title: 'Our Coaches | DD Chess Academy, Dombivli',
    description:
      'Meet the DD Chess Academy coaching team — a National Arbiter, FIDE Trainer and rated coaches leading structured chess training across Dombivli and the Kalyan region.',
    canonicalPath: '/coaches',
  })

  return (
    <div className="bg-canvas pb-20 pt-28 lg:pb-28 lg:pt-36">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow inline-flex items-center gap-2 text-accent">👥 Our Team</span>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold text-heading">
            Meet Our Coaches
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            A dedicated, rated coaching team that makes professional chess training warm,
            structured and genuinely enjoyable for every student.
          </p>
        </div>

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
                      className="h-full w-full object-cover"
                      style={{ objectPosition: person.focus ?? 'top' }}
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center bg-inverse font-display text-6xl font-semibold text-gold-400">
                      {person.name.charAt(0)}
                    </span>
                  )}
                  {person.tags && person.tags.length > 0 && (
                    <div className="absolute inset-x-0 top-0 flex flex-wrap gap-1.5 bg-gradient-to-b from-navy-900/85 to-transparent p-3 pb-8">
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
                  <h2 className="font-display text-xl font-semibold text-heading">{person.name}</h2>
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
    </div>
  )
}
