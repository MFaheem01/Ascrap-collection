'use client'

// Site footer — contact info fetched live from API

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { BrandLogo } from '@/components/site/brand-logo'
import { navLinks, services, site } from '@/lib/site-data'
import { socialIcons } from '@/components/site/social-icons'
import { useSiteContact } from '@/hooks/use-site-contact'

export function SiteFooter() {
  const { phones, emails, locationItems } = useSiteContact()


  return (
    <footer className="bg-brand-green text-brand-green-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <BrandLogo onDark />
          <p className="text-sm leading-relaxed text-brand-green-foreground/70">
            Turning scrap into value. ScrapWorks collects, sorts, and recycles
            metal, electronics, and industrial waste with fast, reliable pickups.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm text-brand-green-foreground/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold">Services</h3>
          <ul className="flex flex-col gap-3 text-sm text-brand-green-foreground/70">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href="/services" className="transition-colors hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold">Contact</h3>
          <ul className="flex flex-col gap-4 text-sm text-brand-green-foreground/70">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-gold" />
              <div className="flex flex-col gap-0.5">
                {phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">{p}</a>
                ))}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-gold" />
              <div className="flex flex-col gap-0.5">
                {emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="hover:text-gold transition-colors">{e}</a>
                ))}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gold" />
              <div className="flex flex-col gap-0.5">
                {locationItems.map((loc) =>
                  loc.url ? (
                    <a
                      key={loc.label}
                      href={loc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold transition-colors"
                    >
                      {loc.label}
                    </a>
                  ) : (
                    <span key={loc.label}>{loc.label}</span>
                  )
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-brand-green-foreground/70 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Fast, responsible scrap collection &amp; recycling.</p>
        </div>
      </div>
    </footer>
  )
}
