import { CalendarCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { ACADEMY, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants'
import { whatsappLink } from '@/lib/utils'

/**
 * Sticky bottom action bar for mobile (spec v2/v7: "sticky mobile enquire button").
 * Hidden on desktop, where the WhatsApp FAB takes over.
 */
export function MobileCtaBar() {
  const wa = whatsappLink(ACADEMY.whatsapp, WHATSAPP_DEFAULT_MESSAGE)

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-canvas/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex gap-3 px-4 py-3">
        <Button
          as="a"
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          className="flex-1"
          iconLeft={<WhatsAppIcon className="size-5" />}
        >
          WhatsApp
        </Button>
        <Button
          as="a"
          href="#contact"
          className="flex-1"
          iconLeft={<CalendarCheck className="size-5" />}
        >
          Book Demo
        </Button>
      </div>
    </div>
  )
}
