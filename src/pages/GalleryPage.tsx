import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Expand, Play } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { galleryImages, galleryVideo } from '@/data/gallery'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  useDocumentMeta({
    title: 'Gallery | DD Chess Academy, Dombivli',
    description:
      'Photos from DD Chess Academy — classes, tournaments, trophies and prize distributions across Dombivli, Nandivali, Thakurli and the Kalyan region.',
    canonicalPath: '/gallery',
  })

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % galleryImages.length))
      if (e.key === 'ArrowLeft')
        setLightbox((i) => (i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox])

  const current = lightbox !== null ? galleryImages[lightbox] : null

  return (
    <div className="bg-canvas pb-20 pt-28 lg:pb-28 lg:pt-36">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow inline-flex items-center gap-2 text-accent">📸 Academy Life</span>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold text-heading">
            Our Gallery
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            {galleryImages.length}+ moments from real classes, tournaments and trophy days at
            DD Chess Academy.
          </p>
        </div>

        {/* Featured video */}
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

        {/* Grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {galleryImages.map((item, i) => (
            <Reveal key={item.src} delay={(i % 4) * 0.04}>
              <button
                onClick={() => setLightbox(i)}
                className="group relative block aspect-square w-full overflow-hidden rounded-[16px] border border-hairline bg-inverse"
                aria-label={`View photo ${i + 1}`}
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
                {item.caption && (
                  <span className="absolute inset-x-0 bottom-0 p-3 text-left text-[13px] font-medium leading-tight text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {item.caption}
                  </span>
                )}
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
                setLightbox((i) => (i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length))
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
              {current.caption && (
                <figcaption className="mt-3 text-center text-sm text-white/80">
                  {current.caption}
                </figcaption>
              )}
            </motion.figure>
            <button
              className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i === null ? i : (i + 1) % galleryImages.length))
              }}
              aria-label="Next"
            >
              <ChevronRight className="size-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
