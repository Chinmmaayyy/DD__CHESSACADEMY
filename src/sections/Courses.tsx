import { Check, ArrowRight, Star } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { courses } from '@/data/courses'
import { cn } from '@/lib/utils'
import type { Course } from '@/types'

function LevelMeter({ level }: { level: number }) {
  return (
    <div className="flex gap-1" aria-label={`Difficulty ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={cn(
            'h-1.5 w-6 rounded-full',
            n <= level ? 'bg-gold-500' : 'bg-surface-2',
          )}
        />
      ))}
    </div>
  )
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const level = index + 1
  const recommended = course.recommended
  return (
    <Reveal delay={index * 0.1} className="h-full">
      <article
        className={cn(
          'relative flex h-full flex-col rounded-[22px] border p-7 transition-all duration-300 hover:-translate-y-1.5',
          recommended
            ? 'border-gold-500/40 bg-inverse text-inverse-content shadow-[var(--shadow-large)]'
            : 'border-hairline bg-surface text-content shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]',
        )}
      >
        {recommended && (
          <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-900">
            <Star className="size-3.5 fill-navy-900" />
            Most Popular
          </span>
        )}

        <div className="flex items-center justify-between">
          <span
            className={cn(
              'eyebrow',
              recommended ? 'text-gold-400' : 'text-accent',
            )}
          >
            {course.level}
          </span>
          <LevelMeter level={level} />
        </div>

        <h3
          className={cn(
            'mt-4 font-display text-2xl font-semibold',
            recommended ? 'text-inverse-content' : 'text-heading',
          )}
        >
          {course.title}
        </h3>

        <div
          className={cn(
            'mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs',
            recommended ? 'text-inverse-content/60' : 'text-muted',
          )}
        >
          <span>Age: {course.ageGroup}</span>
          <span>·</span>
          <span>{course.duration}</span>
        </div>

        <p
          className={cn(
            'mt-4 text-[15px] leading-relaxed',
            recommended ? 'text-inverse-content/70' : 'text-muted',
          )}
        >
          {course.description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {course.topics.map((t) => (
            <li key={t} className="flex items-center gap-2.5 text-sm">
              <Check
                className={cn(
                  'size-4 shrink-0',
                  recommended ? 'text-gold-400' : 'text-accent',
                )}
              />
              <span className={recommended ? 'text-inverse-content/85' : 'text-heading'}>{t}</span>
            </li>
          ))}
        </ul>

        <div
          className={cn(
            'mt-6 rounded-xl p-3.5 text-[13px] leading-snug',
            recommended
              ? 'bg-white/5 text-inverse-content/70'
              : 'bg-canvas text-muted',
          )}
        >
          <span className="font-semibold">Outcome: </span>
          {course.outcome}
        </div>

        <div className="mt-6 pt-1">
          <Button
            as="a"
            href="#contact"
            variant={recommended ? 'primary' : 'outline'}
            className="w-full"
            iconRight={<ArrowRight className="size-4" />}
          >
            Enquire About {course.title}
          </Button>
        </div>
      </article>
    </Reveal>
  )
}

export function Courses() {
  return (
    <Section id="courses" tone="ivory">
      <Container>
        <SectionHeading
          eyebrow="🎓 Our Programs"
          title="A Clear Path From First Move to Champion"
          description="Three structured levels, each designed to build on the last. Every student is placed where they will grow the fastest."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3 md:items-stretch">
          {courses.map((c, i) => (
            <CourseCard key={c.slug} course={c} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
