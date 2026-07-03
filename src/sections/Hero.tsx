import { motion } from 'framer-motion'
import { ChevronDown, ShieldCheck } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { HeroBoard } from './HeroBoard'
import { ACADEMY, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants'
import { whatsappLink } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'
import type { Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.6, ease: EASE_OUT },
  }),
}

const trustBadges = ['National Arbiter', 'FIDE Trainer', '20+ Years', 'Ages 5+']

export function Hero() {
  const wa = whatsappLink(ACADEMY.whatsapp, WHATSAPP_DEFAULT_MESSAGE)

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-canvas pt-28 pb-12 text-content lg:pt-36 lg:pb-16"
    >
      {/* background texture + glows */}
      <div className="chess-grid absolute inset-0 opacity-70" />
      <div className="glow-gold absolute -right-40 -top-20 size-[520px]" />
      <div className="glow-gold absolute -left-40 top-1/2 size-[440px] opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-canvas" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div>
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="eyebrow inline-flex items-center gap-2 text-accent"
            >
              <ShieldCheck className="size-4" />
              Professional Chess Coaching · {ACADEMY.serviceArea}
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.05] text-heading"
            >
              Where Future <br />
              <span className="text-gold-gradient">Chess Champions</span> Begin
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted"
            >
              Professional chess coaching for children and adults under National
              Arbiter &amp; FIDE Trainer <strong className="text-heading">Dipak Dhuri</strong>.
              From complete beginners to tournament players.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button as="a" href="#contact" size="lg">
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
            </motion.div>

            {/* Trust badges */}
            <motion.ul
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
            >
              {trustBadges.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-muted">
                  <span className="size-1.5 rounded-full bg-gold-500" />
                  {b}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeroBoard />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#stats"
          aria-label="Scroll to see more"
          className="mx-auto mt-12 hidden w-fit flex-col items-center gap-1.5 text-muted transition-colors hover:text-accent lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown className="size-5" />
          </motion.span>
        </motion.a>
      </Container>
    </section>
  )
}
