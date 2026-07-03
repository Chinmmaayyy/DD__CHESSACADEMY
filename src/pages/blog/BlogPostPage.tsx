import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Clock, CalendarDays } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { getPost, posts } from '@/data/blog'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

const SITE = 'https://www.ddchessacademy.com'

const md = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-9 font-display text-2xl font-semibold text-heading" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-7 font-display text-xl font-semibold text-heading" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 text-[16px] leading-relaxed text-content" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[16px] leading-relaxed text-content" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-[16px] leading-relaxed text-content" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-heading" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="font-semibold text-accent underline underline-offset-2 hover:text-gold-500" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 rounded-r-xl border-l-4 border-gold-500 bg-surface-2 py-3 pl-4 pr-3 font-display text-[17px] italic leading-relaxed text-heading"
      {...props}
    />
  ),
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  useDocumentMeta({
    title: post ? `${post.title} | DD Chess Academy` : 'Article | DD Chess Academy',
    description: post?.description,
    canonicalPath: post ? `/blog/${post.slug}` : '/blog',
    image: post?.cover,
  })

  // Article structured data for rich results.
  useEffect(() => {
    if (!post) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: { '@type': 'Organization', name: post.author },
      publisher: { '@type': 'Organization', name: 'DD Chess Academy' },
      mainEntityOfPage: `${SITE}/blog/${post.slug}`,
    })
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [post])

  if (!post) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-canvas px-6 pt-28 text-center">
        <div>
          <p className="font-display text-3xl font-semibold text-heading">Article not found</p>
          <p className="mt-2 text-muted">This article may have moved.</p>
          <Button as="a" href="/blog" className="mt-6">
            Back to blog
          </Button>
        </div>
      </div>
    )
  }

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <article className="bg-canvas pb-20 pt-24 lg:pb-28 lg:pt-28">
      <Container>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" />
          All articles
        </Link>

        {/* Header */}
        <div className="mt-6 max-w-3xl">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-gold-500/30 bg-gold-500/15 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-tight text-heading">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              {post.displayDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {post.readMinutes} min read
            </span>
            <span>By {post.author}</span>
          </div>
        </div>

        {/* Cover — shown in full, never cropped */}
        <div className="mt-8">
          <img
            src={post.cover}
            alt={post.title}
            className="mx-auto w-full max-w-4xl rounded-[20px] border border-hairline shadow-[var(--shadow-soft)]"
          />
        </div>

        {/* Body */}
        <div className="mt-10 max-w-3xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>
            {post.body}
          </ReactMarkdown>

          {/* CTA */}
          <div className="mt-12 rounded-[20px] border border-hairline bg-surface p-6 text-center shadow-[var(--shadow-soft)] sm:p-8">
            <h3 className="font-display text-xl font-semibold text-heading">
              Ready to start your chess journey?
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Book a free demo class at DD Chess Academy and learn from a National Arbiter
              &amp; FIDE Trainer.
            </p>
            <Button as="a" href="/#contact" className="mt-5">
              Book a Free Demo
            </Button>
          </div>
        </div>

        {/* More articles */}
        {others.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-2xl font-semibold text-heading">Keep reading</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group flex gap-4 rounded-2xl border border-hairline bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                >
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="size-20 shrink-0 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-xs text-muted">{p.displayDate}</p>
                    <p className="mt-1 font-display font-semibold leading-snug text-heading group-hover:text-accent">
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  )
}
