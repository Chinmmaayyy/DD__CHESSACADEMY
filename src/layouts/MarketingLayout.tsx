import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { MobileCtaBar } from '@/components/layout/MobileCtaBar'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { ScrollProgress } from '@/components/layout/ScrollProgress'

export function MarketingLayout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="bg-canvas">
        <Outlet />
      </main>
      <Footer />

      <WhatsAppFab />
      <ScrollToTop />
      <MobileCtaBar />
      <div className="h-[72px] lg:hidden" aria-hidden="true" />
    </>
  )
}
