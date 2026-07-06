import { Link } from 'react-router-dom'
import { Play, ArrowRight, Expand } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { galleryImages, galleryVideo } from '@/data/gallery'

export function Gallery() {
  const preview = galleryImages.slice(0, 8)

  return (
    <Section id="gallery" tone="ivory">
      <Container>
        <SectionHeading
          eyebrow="📸 Academy Life"
          title="Inside DD Chess Academy"
          description="Real classes, real tournaments, real trophies. A look at our students in action — and on the podium."
        />

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

        {/* Preview grid — links to the full gallery page */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {preview.map((item, i) => (
            <Reveal key={item.src} delay={(i % 4) * 0.05}>
              <Link
                to="/gallery"
                className="group relative block aspect-square w-full overflow-hidden rounded-[16px] border border-hairline bg-inverse"
                aria-label="Open full gallery"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-navy-900/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="size-6 text-white" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            as="a"
            href="/gallery"
            variant="outline"
            iconRight={<ArrowRight className="size-4" />}
          >
            View Full Gallery ({galleryImages.length} photos)
          </Button>
        </div>
      </Container>
    </Section>
  )
}
