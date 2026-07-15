import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { ScrollToTop } from '@/components/site/scroll-to-top'
import { WhatsAppButton } from '@/components/site/whatsapp-button'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      {/* Floating action stack — WhatsApp above, ScrollToTop below */}
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  )
}
