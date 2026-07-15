'use client'

// Floating WhatsApp button — phone number pulled live from the backend via
// useSiteContact, falls back to the static site.phone from site-data.ts.
// Shown only after the user scrolls 400 px, stacked just above the
// ScrollToTop button (bottom-[4.5rem] right-6).

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useSiteContact } from '@/hooks/use-site-contact'

/** Strip every non-digit character so wa.me gets a clean number */
function toWaNumber(raw: string) {
  return raw.replace(/\D/g, '')
}

export function WhatsAppButton() {
  const { phones } = useSiteContact()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const phone = phones[0]
  if (!phone) return null

  const waHref = `https://wa.me/${toWaNumber(phone)}`

  return (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        // Position — sits directly above the ScrollToTop button (11 + 6 + 6 = 23 → ~5.75rem, use 20)
        'fixed bottom-[4.5rem] right-6 z-40',
        'flex size-11 items-center justify-center rounded-full shadow-lg',
        'transition-all duration-300',
        // WhatsApp green brand colour
        'bg-[#25D366] text-white hover:bg-[#1ebe57]',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="size-6 fill-current"
        aria-hidden="true"
      >
        <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.37.637 4.59 1.747 6.51L2.667 29.333l7.02-1.72A13.27 13.27 0 0 0 16.003 29.333C23.363 29.333 29.333 23.363 29.333 16c0-7.363-5.97-13.333-13.33-13.333zm0 24.267a11.03 11.03 0 0 1-5.627-1.547l-.403-.24-4.17 1.023 1.053-3.997-.263-.41A10.96 10.96 0 0 1 5.003 16C5.003 9.92 9.923 5 16.003 5S27.003 9.92 27.003 16 22.083 26.934 16.003 26.934zm6.043-8.177c-.33-.167-1.957-.967-2.26-1.077-.303-.11-.523-.167-.743.167-.22.333-.857 1.077-1.05 1.297-.193.22-.387.247-.717.08-.33-.167-1.393-.513-2.653-1.637-.98-.873-1.643-1.95-1.837-2.28-.193-.33-.02-.51.147-.673.15-.147.33-.383.497-.577.167-.193.22-.33.33-.547.11-.22.053-.413-.027-.58-.08-.167-.743-1.793-1.017-2.457-.267-.643-.54-.557-.743-.567l-.633-.01a1.21 1.21 0 0 0-.877.413c-.303.333-1.153 1.127-1.153 2.747s1.18 3.187 1.343 3.407c.167.22 2.323 3.547 5.627 4.973.787.34 1.4.543 1.877.693.79.25 1.507.217 2.073.133.633-.093 1.957-.8 2.233-1.573.277-.773.277-1.437.193-1.573-.08-.137-.3-.22-.63-.387z" />
      </svg>
    </a>
  )
}
