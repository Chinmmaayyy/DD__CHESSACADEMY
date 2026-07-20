import { useEffect } from 'react'

const SITE = 'https://ddchessacademy.in'

interface Meta {
  title: string
  description?: string
  /** Path beginning with "/" — used for canonical + og:url. */
  canonicalPath?: string
  image?: string
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Lightweight per-route SEO — sets document.title, description, canonical and
 * Open Graph tags on mount. (Google renders client JS, so this is indexed.)
 */
export function useDocumentMeta({ title, description, canonicalPath, image }: Meta) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
    upsertMeta('property', 'og:title', title)
    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
    }
    if (canonicalPath) {
      const url = SITE + canonicalPath
      upsertMeta('property', 'og:url', url)
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', url)
    }
    if (image) upsertMeta('property', 'og:image', image.startsWith('http') ? image : SITE + image)
    return () => {
      document.title = prevTitle
    }
  }, [title, description, canonicalPath, image])
}
