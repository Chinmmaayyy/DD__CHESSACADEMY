import { MapPin, Navigation, Phone } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { branches } from '@/data/branches'
import { ACADEMY } from '@/lib/constants'
import { telLink } from '@/lib/utils'

export function Branches() {
  return (
    <Section id="branches" tone="ivory">
      <Container>
        <SectionHeading
          eyebrow="📍 Our Locations"
          title="Convenient Centres Near You"
          description="Find a class close to home. Every centre offers the same structured coaching and warm learning environment."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {branches.map((b, i) => (
            <Reveal key={`${b.name}-${b.area}`} delay={(i % 4) * 0.08} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-hairline bg-surface shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]">
                {/* Live embedded map */}
                <div className="relative h-40 w-full overflow-hidden border-b border-hairline bg-canvas">
                  <iframe
                    title={`Map of ${b.name}, ${b.area}`}
                    src={b.embedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full grayscale-[0.15]"
                    style={{ border: 0 }}
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-inverse text-gold-500">
                    <MapPin className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-heading">
                    {b.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{b.area}</p>
                  <div className="mt-auto pt-5">
                    <Button
                      as="a"
                      href={b.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      iconLeft={<Navigation className="size-4" />}
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Call band */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[20px] border border-hairline bg-surface p-6 sm:flex-row">
            <p className="text-center text-sm text-muted sm:text-left">
              Not sure which centre suits you best? We'll help you pick the right batch and schedule.
            </p>
            <Button
              as="a"
              href={telLink(ACADEMY.phoneRaw)}
              iconLeft={<Phone className="size-4" />}
              className="shrink-0"
            >
              Call {ACADEMY.phone}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
