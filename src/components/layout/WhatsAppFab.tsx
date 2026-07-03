import { motion } from 'framer-motion'
import { ACADEMY, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants'
import { whatsappLink } from '@/lib/utils'
import { logToSheet } from '@/lib/sheets'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

export function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappLink(ACADEMY.whatsapp, WHATSAPP_DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => logToSheet({ type: 'whatsapp_click', source: 'fab' })}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 hidden size-14 place-items-center rounded-full bg-[color:var(--color-whatsapp)] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] lg:grid"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-whatsapp)] opacity-20" />
      <WhatsAppIcon className="size-7" />
    </motion.a>
  )
}
