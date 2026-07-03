import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Expand, Play } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { galleryImages, galleryCategories, galleryVideo } from '@/data/gallery'
import { cn } from '@/lib/utils'

export function Gallery() {
  const [active, setActive] = useState<(typeof galleryCategories)[number]>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered =
    active === 'All' ? galleryImages : galleryImages.filter((i) => i.category === active)

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % filtered.length))
      if (e.key === 'ArrowLeft')
        setLightbox((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, filtered.length])

  const current = lightbox !== null ? filtered[lightbox] : null

  return (
    <Section id="gallery" tone="ivory">
      <Container>
        <SectionHeading
          eyebrow="📸 Academy Life"
          title="Inside DD Chess Academy"
          description="Real classes, real tournaments, real trophies. A look at our students in action — and on the podium."
        />

        {/* Featured video frame — natural ratio, never cropped */}
        <Reveal>
          <figure className="mx-auto mt-12 w-fit max-w-3xl">
            <div className="overflow-hidden rounded-[24px] border border-hairline bg-inverse shadow-[var(--shadow-large)]">
              <video
                className="mx-auto block max-h-[70vh] w-auto max-w-full bg-inverse object-contain"
                src={galleryVideo.src}
                poster={galleryVideo.poster}
                controls
                preload="metadata"
                playsInline
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-center gap-2 text-sm text-muted">
              <Play className="size-4 text-accent" />
              {galleryVideo.caption}
            </figcaption>
          </figure>
        </Reveal>

        {/* Filters */}
        <Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-2.5">
            {galleryCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all',
                  active === c
                    ? 'bg-inverse text-inverse-content'
                    : 'border border-hairline bg-surface text-muted hover:text-heading',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Uniform tidy grid — equal tiles, cropped to fill, full image in lightbox */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <Reveal key={item.src} delay={(i % 4) * 0.05}>
              <button
                onClick={() => setLightbox(i)}
                className="group relative block aspect-square w-full overflow-hidden rounded-[16px] border border-hairline bg-inverse"
                aria-label={`View: ${item.caption}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-navy-900/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <Expand className="size-4" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-3 text-left text-[13px] font-medium leading-tight text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {current && lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-navy-900/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X className="size-6" />
            </button>
            <button
              className="absolute left-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="size-6" />
            </button>
            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={current.alt}
                className="mx-auto max-h-[78vh] w-auto rounded-xl object-contain"
              />
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {current.caption}
              </figcaption>
            </motion.figure>
            <button
              className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i === null ? i : (i + 1) % filtered.length))
              }}
              aria-label="Next"
            >
              <ChevronRight className="size-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
