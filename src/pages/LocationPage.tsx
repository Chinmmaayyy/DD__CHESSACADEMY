import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShieldCheck, MapPin, Star, Quote, Phone, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { getLocation } from '@/data/locations'
import { features } from '@/data/features'
import { testimonials } from '@/data/testimonials'
import { coach } from '@/data/coach'
import { ACADEMY } from '@/lib/constants'
import { whatsappLink, telLink } from '@/lib/utils'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

const SITE = 'https://ddchessacademy.in'

/** Render **bold** markers in the intro text. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') ? (
          <strong key={i} className="font-semibold text-heading">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

export function LocationPage() {
  const { slug } = useParams<{ slug: string }>()
  const loc = slug ? getLocation(slug) : undefined

  useDocumentMeta({
    title: loc?.metaTitle ?? 'Chess Classes | DD Chess Academy',
    description: loc?.metaDescription,
    canonicalPath: loc ? `/${loc.slug}` : '/',
  })

  // Local structured data (LocalBusiness + FAQ) for this area.
  useEffect(() => {
    if (!loc) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'SportsActivityLocation'],
        name: `DD Chess Academy — Chess Classes in ${loc.area}`,
        description: loc.metaDescription,
        url: `${SITE}/${loc.slug}`,
        telephone: '+91-99206-05578',
        areaServed: [loc.area, ...loc.nearby],
        knowsLanguage: ['Hindi', 'Marathi', 'English'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: loc.area,
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
        sport: 'Chess',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: loc.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ])
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [loc])

  if (!loc) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-canvas px-6 pt-28 text-center">
        <div>
          <p className="font-display text-3xl font-semibold text-heading">Page not found</p>
          <Button as="a" href="/" className="mt-6">
            Back home
          </Button>
        </div>
      </div>
    )
  }

  const wa = whatsappLink(
    ACADEMY.whatsapp,
    `Hello DD Chess Academy! I'd like to know about chess classes in ${loc.area}.`,
  )

  return (
    <div className="bg-canvas">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-14 lg:pt-36 lg:pb-20">
        <div className="chess-grid absolute inset-0 opacity-30 dark:opacity-70" />
        <div className="glow-gold absolute -right-40 -top-20 size-[480px] opacity-40 dark:opacity-100" />
        <Container className="relative">
          <div className="max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-2 text-accent">
              <ShieldCheck className="size-4" />
              Professional Chess Coaching · {loc.area}
            </span>
            <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.05] text-heading">
              {loc.h1}
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">{loc.heroSub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as="a" href="/#contact" size="lg">
                Book a Free Demo
              </Button>
              <Button
                as="a"
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="lg"
                iconLeft={<WhatsAppIcon className="size-5" />}
              >
                Chat on WhatsApp
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {['National Arbiter', 'FIDE Trainer', '20+ Years', 'Ages 5+'].map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-gold-500" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <Container className="pb-4">
        <div className="max-w-3xl space-y-4">
          {loc.intro.map((p, i) => (
            <p key={i} className="text-[16px] leading-relaxed text-content">
              <RichText text={p} />
            </p>
          ))}
          <p className="text-sm text-muted">
            Serving:{' '}
            {loc.nearby.map((n, i) => (
              <span key={n}>
                {n}
                {i < loc.nearby.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        </div>
      </Container>

      {/* Why choose */}
      <Container className="py-14">
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold text-heading">
          Why parents in {loc.area} choose DD Chess Academy
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.slice(0, 6).map((f, i) => {
            const Icon = f.icon
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.06} className="h-full">
                <div className="h-full rounded-2xl border border-hairline bg-surface p-6 shadow-[var(--shadow-soft)]">
                  <span className="grid size-11 place-items-center rounded-xl bg-inverse text-gold-500">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-heading">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>

      {/* Centres */}
      <section className="bg-surface py-14">
        <Container>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold text-heading">
            Our {loc.area} centre{loc.centres.length > 1 ? 's' : ''}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {loc.centres.map((c) => (
              <div
                key={`${c.name}-${c.area}`}
                className="overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-[var(--shadow-soft)]"
              >
                <iframe
                  title={`Map of ${c.name}, ${c.area}`}
                  src={c.embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-44 w-full grayscale-[0.15]"
                  style={{ border: 0 }}
                />
                <div className="flex items-start gap-3 p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-inverse text-gold-500">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-heading">{c.name}</p>
                    <p className="text-sm text-muted">{c.area}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Coach highlight */}
      <Container className="py-14">
        <div className="grid items-center gap-8 rounded-[24px] border border-hairline bg-surface p-6 shadow-[var(--shadow-soft)] sm:grid-cols-[auto_1fr] sm:p-8">
          <span className="grid size-20 place-items-center rounded-full border-2 border-gold-500/40 bg-inverse font-display text-3xl font-semibold text-gold-400">
            DD
          </span>
          <div>
            <h2 className="font-display text-2xl font-semibold text-heading">
              Learn from Coach Dipak Dhuri
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {coach.name} is a <strong className="text-heading">National Arbiter</strong> and{' '}
              <strong className="text-heading">FIDE Trainer</strong> (FIDE ID {coach.fideId}) with{' '}
              {coach.experienceYears}+ years of experience — bringing professional, structured chess
              coaching to {loc.area}.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {coach.ratings.map((r) => (
                <span
                  key={r.label}
                  className="rounded-full border border-hairline bg-surface-2 px-3 py-1 text-xs font-medium text-content tnum"
                >
                  {r.icon} {r.label} {r.value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Testimonials */}
      <Container className="pb-14">
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold text-heading">
          What our students say
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <figure
              key={t.author}
              className="flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6 shadow-[var(--shadow-soft)]"
            >
              <Quote className="size-6 text-gold-500/40" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-heading">
                "{t.review}"
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
                <span className="text-sm font-semibold text-heading">{t.author}</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      {/* FAQ */}
      <section className="bg-surface py-14">
        <Container>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold text-heading">
            Chess classes in {loc.area} — FAQs
          </h2>
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-hairline">
            {loc.faqs.map((f) => (
              <div key={f.q} className="py-5">
                <h3 className="flex items-start gap-2 font-display text-lg font-medium text-heading">
                  <ChevronRight className="mt-1 size-4 shrink-0 text-accent" />
                  {f.q}
                </h3>
                <p className="mt-2 pl-6 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Container className="py-16">
        <div className="relative overflow-hidden rounded-[28px] bg-inverse px-6 py-12 text-center text-inverse-content sm:px-12">
          <div className="chess-grid absolute inset-0 opacity-40" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold text-white">
              Start chess classes in {loc.area} today
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-inverse-content/70">
              Book a free demo class — no commitment, just come and play.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button as="a" href="/#contact" size="lg">
                Book a Free Demo
              </Button>
              <Button
                as="a"
                href={telLink(ACADEMY.phoneRaw)}
                variant="outline"
                size="lg"
                iconLeft={<Phone className="size-5" />}
              >
                Call {ACADEMY.phone}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
