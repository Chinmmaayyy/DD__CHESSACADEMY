import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { posts } from '@/data/blog'

export function BlogTeaser() {
  const latest = posts.slice(0, 3)

  return (
    <Section id="blog" tone="ivory">
      <Container>
        <SectionHeading
          eyebrow="📚 From Our Blog"
          title="Chess Tips &amp; Guides for Parents"
          description="Free advice on the benefits of chess, choosing the right classes, and helping your child grow — straight from the academy."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08} className="h-full">
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-hairline bg-surface shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]"
              >
                <div className="h-40 overflow-hidden bg-surface-2">
                  <img
                    src={post.cover}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-[50%_20%] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{post.displayDate}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {post.readMinutes} min
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-heading">
                    {post.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Read more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button as="a" href="/blog" variant="outline" iconRight={<ArrowRight className="size-4" />}>
            Read all articles
          </Button>
        </div>
      </Container>
    </Section>
  )
}
