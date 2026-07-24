'use client'

import Link from 'next/link'
import { Phone, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/lib/site-data'
import { useSiteContact } from '@/hooks/use-site-contact'

export function CtaSection() {
  const { phones } = useSiteContact()

  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-14 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-5">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-green text-gold">
            <Phone className="size-7" />
          </span>
          <div>
            <span className="font-script text-xl text-gold">
              Have any questions?
            </span>
            <p className="text-3xl font-extrabold text-primary-foreground sm:text-4xl">
              {phones[0] ?? site.phone}
            </p>
          </div>
        </div>
        <p className="max-w-md text-center text-primary-foreground/80 lg:text-left">
          Ready to clear that scrap? Get a fast quote or free estimation for a pickup that works for you.
        </p>
        <Button
          size="lg"
          render={<Link href="/contact" />}
          className="h-12 rounded-none bg-gold px-7 text-base font-semibold text-gold-foreground hover:bg-gold/90"
        >
          Contact Us
          <RefreshCw data-icon="inline-end" />
        </Button>
      </div>
    </section>
  )
}
