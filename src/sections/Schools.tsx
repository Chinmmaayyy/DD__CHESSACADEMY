import { School2 } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { schools } from '@/data/schools'

export function Schools() {
  return (
    <Section id="schools" tone="light">
      <Container>
        <SectionHeading
          eyebrow="🏫 School Programs"
          title="Trusted by Leading Schools"
          description="Coach Dipak Dhuri conducts chess coaching at some of the region's most respected schools — bringing structured, professional training right into the classroom."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {schools.map((school, i) => (
            <Reveal key={school.name} delay={(i % 3) * 0.08} className="h-full">
              <div className="flex h-full items-center gap-3.5 rounded-2xl border border-hairline bg-surface p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[var(--shadow-medium)]">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-inverse text-gold-500">
                  <School2 className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold leading-snug text-heading">{school.name}</p>
                  {school.area && <p className="text-xs text-muted">{school.area}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
