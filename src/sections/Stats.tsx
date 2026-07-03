import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { useCountUp } from '@/hooks/useCountUp'
import { stats } from '@/data/stats'
import type { Stat } from '@/types'

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, value } = useCountUp(stat.value)
  const Icon = stat.icon
  return (
    <Reveal delay={index * 0.08}>
      <div className="group h-full rounded-[20px] border border-hairline bg-surface p-6 shadow-[var(--shadow-medium)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[var(--shadow-large)]">
        <span className="grid size-11 place-items-center rounded-xl bg-gold-500/12 text-accent">
          <Icon className="size-5" />
        </span>
        <p className="mt-5 font-display text-4xl font-semibold tnum text-gold-gradient">
          <span ref={ref}>{value}</span>
          {stat.suffix}
        </p>
        <p className="mt-2 text-sm font-semibold text-heading">{stat.label}</p>
        <p className="mt-1 text-xs text-muted">{stat.caption}</p>
      </div>
    </Reveal>
  )
}

export function Stats() {
  return (
    <section id="stats" className="bg-canvas pb-20 pt-2 lg:pb-28">
      <Container>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
