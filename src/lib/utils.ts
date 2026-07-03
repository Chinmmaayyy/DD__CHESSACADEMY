/** Tiny classNames joiner (no external dep). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/** Build a wa.me link with a prefilled message. */
export function whatsappLink(phone: string, message: string): string {
  const clean = phone.replace(/[^\d]/g, '')
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
}

/** Build a tel: link. */
export function telLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`
}
