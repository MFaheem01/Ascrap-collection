'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Phone, Mail, MapPin, Clock, RefreshCw, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { navLinks, site } from '@/lib/site-data'
import { BrandLogo } from '@/components/site/brand-logo'
import { useSiteContact } from '@/hooks/use-site-contact'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { phones, emails, locations } = useSiteContact()

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden bg-brand-green text-brand-green-foreground lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2.5 text-sm">
          <div className="flex items-center gap-6">
            {locations[0] && (
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-gold" />
                {locations[0]}
              </span>
            )}
            {emails[0] && (
              <a href={`mailto:${emails[0]}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail className="size-4 text-gold" />
                {emails[0]}
              </a>
            )}
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-gold" />
              {site.hours}
            </span>
          </div>
          <Button
            render={<Link href="/contact" />}
            className="rounded-none bg-gold font-semibold text-gold-foreground hover:bg-gold/90"
          >
            Contact Us
            <User data-icon="inline-end" />
          </Button>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <BrandLogo />

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-md px-4 py-2 text-sm font-semibold transition-colors',
                    active
                      ? 'text-primary'
                      : 'text-foreground/80 hover:text-primary',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
              <Phone className="size-5" />
            </span>
            <Link
              href="/contact"
              className="leading-tight hover:text-primary transition-colors"
            >
              <p className="text-xs text-muted-foreground">Have questions?</p>
              <Link href={`tel:${phones[0] ?? site.phone}`} className="text-sm font-bold text-foreground">{phones[0] ?? site.phone}</Link>
            </Link>
          </div>

          {/* Mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              }
            />
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-full flex-col gap-6 p-6">
                <BrandLogo />
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const active =
                      link.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(link.href)
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'rounded-md px-3 py-2.5 text-base font-semibold transition-colors',
                          active
                            ? 'bg-secondary text-primary'
                            : 'text-foreground/80 hover:bg-secondary hover:text-primary',
                        )}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
                      <Phone className="size-5" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-xs text-muted-foreground">
                        Have questions?
                      </p>
                      <p className="text-sm font-bold">{phones[0] ?? site.phone}</p>
                    </div>
                  </div>
                  <Button
                    render={<Link href="/contact" onClick={() => setOpen(false)} />}
                    className="w-full bg-gold font-semibold text-gold-foreground hover:bg-gold/90"
                  >
                    Request a Pickup
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
