import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { faqs } from '@/data/faqs'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq" tone="light">
      <Container>
        <SectionHeading
          eyebrow="❓ FAQ"
          title="Questions Parents Often Ask"
          description="Everything you need to know before booking a free demo. Still curious? Message us on WhatsApp."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <Reveal key={faq.question} delay={i * 0.04}>
                <div className="border-b border-hairline">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={cn(
                        'font-display text-lg font-medium transition-colors',
                        isOpen ? 'text-accent' : 'text-heading',
                      )}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        'grid size-8 shrink-0 place-items-center rounded-full border transition-colors',
                        isOpen
                          ? 'border-gold-500 bg-gold-500 text-navy-900'
                          : 'border-hairline text-heading',
                      )}
                    >
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-12 text-[15px] leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
