import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { features } from '@/data/features'

export function WhyChoose() {
  return (
    <Section id="why" tone="ivory">
      <Container>
        <SectionHeading
          eyebrow="⭐ Why DD Chess"
          title="Why Parents Choose DD Chess Academy"
          description="We focus on much more than winning games. Chess develops concentration, confidence, discipline and decision-making skills that benefit students throughout life."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <article className="group h-full rounded-[20px] border border-hairline bg-surface p-7 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]">
                  <span className="grid size-12 place-items-center rounded-xl bg-inverse text-gold-500 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-heading">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                    {f.description}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
