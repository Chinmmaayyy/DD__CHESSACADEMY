import { Phone } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { coach } from '@/data/coach'
import { ACADEMY } from '@/lib/constants'
import { whatsappLink, telLink } from '@/lib/utils'
import coachPhoto from '@/assets/dipak_sir.png'

function CredRow({ label, value, tone }: { label: string; value: string; tone?: 'gold' | 'green' }) {
  return (
    <div className="flex items-center justify-between border-b border-hairline py-2.5 last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span
        className={
          tone === 'gold'
            ? 'text-sm font-semibold text-accent'
            : tone === 'green'
              ? 'text-sm font-semibold text-success'
              : 'text-sm font-semibold text-heading tnum'
        }
      >
        {value}
      </span>
    </div>
  )
}

export function Coach() {
  const wa = whatsappLink(
    ACADEMY.whatsapp,
    `Hello! I would like to know more about coaching with ${coach.name}.`,
  )

  return (
    <Section id="coach" tone="ivory">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow inline-flex items-center gap-2 text-accent">
            ♟️ Meet Your Coach
          </span>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.75rem)] font-semibold text-heading">
            Learn from a Licensed Master
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
          {/* Left — portrait card */}
          <Reveal>
            <div className="rounded-[24px] border border-hairline bg-surface p-5 shadow-[var(--shadow-soft)]">
              <div className="relative overflow-hidden rounded-[18px]">
                <img
                  src={coachPhoto}
                  alt="Coach Dipak Dhuri, National Arbiter and FIDE Trainer"
                  className="aspect-4/5 w-full object-cover object-top"
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-navy-900/55 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm tnum">
                  FIDE ID: {coach.fideId}
                </span>
              </div>

              <h3 className="mt-5 text-center font-display text-2xl font-semibold text-heading">
                {coach.name}
              </h3>

              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className="rounded-full border border-gold-500/40 bg-gold-500/12 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent">
                  National Arbiter
                </span>
                <span className="rounded-full border border-royal-500/40 bg-royal-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                  FIDE Trainer
                </span>
              </div>

              {/* Ratings */}
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {coach.ratings.map((r) => (
                  <div
                    key={r.label}
                    className="rounded-2xl border border-hairline bg-canvas p-3 text-center"
                  >
                    <div className="text-lg leading-none">{r.icon}</div>
                    <p className="mt-1.5 font-display text-xl font-semibold text-heading tnum">
                      {r.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted">
                      {r.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — profile, credentials, philosophy */}
          <div className="flex flex-col gap-6">
            {/* Professional profile */}
            <Reveal>
              <div>
                <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-heading">
                  🏅 Professional Profile
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  With a legacy dating back to <strong className="text-heading">1978</strong>,
                  Coach Dipak Dhuri brings decades of strategic expertise to the chessboard.
                  As an officially licensed{' '}
                  <strong className="text-heading">National Arbiter</strong>, he combines
                  competitive prowess with a deep understanding of international chess
                  regulations.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  DD Chess Academy is built on his vision of making professional chess
                  accessible while maintaining the highest standards of the{' '}
                  <strong className="text-heading">FIDE (World Chess Federation)</strong>.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-heading">🗣️ Coaching in:</span>
                  {coach.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border border-hairline bg-surface-2 px-3 py-1 text-xs font-medium text-content"
                    >
                      {lang}
                    </span>
                  ))}
                  <span className="text-xs text-muted">+ several other Indian languages</span>
                </div>
              </div>
            </Reveal>

            {/* FIDE credentials */}
            <Reveal delay={0.05}>
              <div className="rounded-[20px] border border-hairline bg-surface p-6 shadow-[var(--shadow-soft)]">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-heading">
                  🎖️ FIDE Credentials
                </h3>
                <div className="mt-4 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                  <div>
                    <CredRow label="FIDE ID" value={coach.fideId} />
                    <CredRow label="Federation" value={`${coach.federationCode} · ${coach.federation}`} />
                    <CredRow label="Birth Year" value={String(coach.birthYear)} />
                    <CredRow label="Gender" value={coach.gender} />
                  </div>
                  <div>
                    <CredRow label="License Type" value={coach.licenseType} tone="gold" />
                    <CredRow
                      label="Status"
                      value={coach.licenseActive ? 'Active' : 'Inactive'}
                      tone="green"
                    />
                    <CredRow label="Licensed Since" value={coach.licensedSince} />
                    <CredRow label="Experience" value={`${coach.experienceYears}+ years`} />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Academy philosophy */}
            <Reveal delay={0.1}>
              <div className="rounded-[20px] border border-royal-500/20 bg-royal-500/[0.05] p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-heading">
                  🎯 Academy Philosophy
                </h3>
                <blockquote className="mt-3 border-l-2 border-gold-500 pl-4 font-display text-[17px] italic leading-relaxed text-heading">
                  "{coach.philosophy}"
                </blockquote>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-heading">♟️ Strategic Thinking</p>
                    <p className="mt-0.5 text-[13px] text-muted">Focus on long-term planning.</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-heading">🛡️ Character Building</p>
                    <p className="mt-0.5 text-[13px] text-muted">Patience and resilience.</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    as="a"
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    iconLeft={<WhatsAppIcon className="size-5" />}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    as="a"
                    href={telLink(ACADEMY.phoneRaw)}
                    variant="outline"
                    iconLeft={<Phone className="size-5" />}
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
