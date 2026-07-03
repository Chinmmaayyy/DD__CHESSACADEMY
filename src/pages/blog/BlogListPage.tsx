import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { posts } from '@/data/blog'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export function BlogListPage() {
  useDocumentMeta({
    title: 'Chess Blog & Resources | DD Chess Academy, Dombivli',
    description:
      'Chess tips, guides and resources for parents and students from DD Chess Academy — the benefits of chess for children, choosing classes in Dombivli, beginner strategy and more.',
    canonicalPath: '/blog',
  })

  return (
    <div className="bg-canvas pt-28 pb-20 lg:pt-36 lg:pb-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow inline-flex items-center gap-2 text-accent">
            📚 Blog &amp; Resources
          </span>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold text-heading">
            Chess Tips, Guides &amp; Insights
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            Practical advice for parents and students — from the benefits of chess to
            beginner strategy and choosing the right academy.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08} className="h-full">
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-hairline bg-surface shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.cover}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-[50%_25%] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-navy-900"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{post.displayDate}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {post.readMinutes} min read
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-heading">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Read article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  )
}
