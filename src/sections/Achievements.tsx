import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { achievements } from '@/data/achievements'

export function Achievements() {
  return (
    <Section id="achievements" tone="light">
      <Container>
        <SectionHeading
          eyebrow="🏆 Student Success"
          title="Every Student Has a Story of Progress"
          description="From a child's first tournament medal to a beginner earning their first rating — we celebrate growth at every level."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => {
            const Icon = a.icon
            return (
              <Reveal key={a.title} delay={(i % 4) * 0.08}>
                <div className="group h-full rounded-[20px] border border-hairline bg-canvas p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:bg-surface">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-gold-500/12 text-accent">
                      <Icon className="size-6" />
                    </span>
                    <span className="text-xs font-semibold text-muted">{a.year}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-heading">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {a.detail}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
