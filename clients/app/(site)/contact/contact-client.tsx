'use client'

// Contact page client component — fetches emails, phones, and locations from API

import dynamic from 'next/dynamic'
import { PageBanner } from '@/components/site/page-banner'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useSiteContact } from '@/hooks/use-site-contact'
import Link from 'next/link'

const ContactForm = dynamic(() =>
  import('@/components/site/contact-form').then((m) => m.ContactForm),
)

/** Convert any Maps URL or address string to an iframe-embeddable URL.
 *  maps.app.goo.gl short links can't be embedded, so we use the
 *  location label (address text) as the ?q= search query instead.
 */
function toEmbedUrl(url: string, fallbackAddress: string): string {
  const DEFAULT =
    `https://www.google.com/maps?q=${encodeURIComponent(fallbackAddress)}&output=embed`

  if (!url && !fallbackAddress) return DEFAULT

  // Already an embed URL
  if (url?.includes('google.com/maps/embed')) return url

  // Any Google Maps link — convert to embed using the address as query
  if (
    url?.includes('google.com/maps') ||
    url?.includes('maps.google') ||
    url?.includes('goo.gl/maps') ||
    url?.includes('maps.app.goo.gl')
  ) {
    return `https://www.google.com/maps?q=${encodeURIComponent(fallbackAddress || url)}&output=embed`
  }

  // Plain text address
  if (!url?.startsWith('http')) {
    return `https://www.google.com/maps?q=${encodeURIComponent(url || fallbackAddress)}&output=embed`
  }

  // Unknown URL — fall back to address query
  if (fallbackAddress) return DEFAULT

  return url
}

export function ContactClient() {
  const { phones, emails, locationItems } = useSiteContact()
  const primaryLocation = locationItems[0]
  const mapSrc = primaryLocation
    ? toEmbedUrl(primaryLocation.url, primaryLocation.label)
    : 'https://www.google.com/maps?q=Dubai+UAE&output=embed'

  return (
    <>
      <PageBanner title="Contact Us" breadcrumb="Contact" />

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="font-script text-2xl text-primary">Have any questions?</p>
              <h2 className="mt-1 text-pretty text-3xl font-bold text-foreground md:text-4xl">
                We&apos;re Here to Help You Recycle Smarter
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Whether you have a one-time haul or need a recurring commercial
                collection route, our team is ready to build a plan that fits your
                schedule and volume.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                {/* Emails */}
                <div className="flex items-start gap-4 rounded-lg border bg-card p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Email</p>
                    {emails.map((e) => (
                      <Link
                        key={e}
                        href={`mailto:${e}`}
                        className="mt-0.5 block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {e}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-4 rounded-lg border bg-card p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Phone</p>
                    {phones.map((p) => (
                      <Link
                        key={p}
                        href={`tel:${p.replace(/\s/g, '')}`}
                        className="mt-0.5 block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {p}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div className="flex items-start gap-4 rounded-lg border bg-card p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Location</p>
                    {locationItems.map((loc) =>
                      loc.url ? (
                        <a
                          key={loc.label}
                          href={loc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {loc.label}
                        </a>
                      ) : (
                        <p key={loc.label} className="mt-0.5 text-sm text-muted-foreground">
                          {loc.label}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border">
                <iframe
                  key={mapSrc}
                  title="Facility location map"
                  src={mapSrc}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
