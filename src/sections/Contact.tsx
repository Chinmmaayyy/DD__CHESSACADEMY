import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { ACADEMY, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants'
import { whatsappLink, telLink } from '@/lib/utils'

export function Contact() {
  const wa = whatsappLink(ACADEMY.whatsapp, WHATSAPP_DEFAULT_MESSAGE)

  const contactItems = [
    {
      icon: Phone,
      label: 'Call us',
      value: ACADEMY.phone,
      href: telLink(ACADEMY.phoneRaw),
    },
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: 'Chat instantly',
      href: wa,
      external: true,
    },
    {
      icon: Mail,
      label: 'Email',
      value: ACADEMY.email,
      href: `mailto:${ACADEMY.email}`,
    },
  ]

  return (
    <Section id="contact" tone="ivory" className="relative overflow-hidden">
      <Container className="relative">
        {/* CTA banner */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-inverse px-6 py-12 text-center text-inverse-content sm:px-12 sm:py-14">
            <div className="chess-grid absolute inset-0 opacity-40" />
            <div className="glow-gold absolute -left-20 top-0 size-72" />
            <div className="relative">
              <span className="eyebrow text-gold-400">🚀 Start Your Chess Journey Today</span>
              <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.8rem,4vw,2.75rem)] font-semibold text-white">
                Ready to Make the First Move?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-inverse-content/70">
                Speak with us to find the right batch and schedule a free demo class. No
                commitment — just come and play.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Form + info */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Info column */}
          <div className="flex flex-col gap-4">
            <Reveal>
              <h3 className="font-display text-2xl font-semibold text-heading">
                Get in touch
              </h3>
              <p className="mt-2 text-muted">
                Choose whatever is easiest for you. We reply fast.
              </p>
            </Reveal>

            {contactItems.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.label} delay={i * 0.06}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-gold-500/40 hover:shadow-[var(--shadow-soft)]"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-inverse text-gold-500">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted">
                        {item.label}
                      </p>
                      <p className="font-semibold text-heading">{item.value}</p>
                    </div>
                  </a>
                </Reveal>
              )
            })}

            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-hairline bg-surface p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-heading">
                  <Clock className="size-4 text-accent" />
                  Class Timings
                </p>
                <p className="mt-1.5 text-sm text-muted">
                  <span className="font-semibold text-heading">7:00 PM – 8:30 PM</span> · daily
                  batches. We'll help you find a slot that fits.
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                  <MapPin className="size-4 text-accent" />
                  {branchesSummary()}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

function branchesSummary() {
  return '4 centres across Dombivli, Nandivali & Thakurli'
}
