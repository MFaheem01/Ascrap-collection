'use client'

// Our Location section — location data managed from Dashboard → Locations

import Link from 'next/link'
import { MapPin, ExternalLink, Clock, PhoneCall } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { useSiteContact } from '@/hooks/use-site-contact'
import { site } from '@/lib/site-data'

function toEmbedUrl(url: string): string {
  if (!url) return DEFAULT_MAP_EMBED

  // Already an embed URL
  if (url.includes('google.com/maps/embed')) return url

  // If it's a google map link (place, coordinates, search, etc.)
  if (url.includes('google.com/maps') || url.includes('maps.google') || url.includes('goo.gl/maps')) {
    // Extract query search term from the URL if possible
    try {
      const u = new URL(url)
      const q =
        u.searchParams.get('q') ||
        u.searchParams.get('query') ||
        // /maps/place/LABEL/@lat,lng  — grab the place part
        u.pathname.replace('/maps/place/', '').split('/')[0]
      if (q) {
        return `https://www.google.com/maps?q=${encodeURIComponent(decodeURIComponent(q))}&output=embed`
      }
    } catch {
      // ignore parse errors
    }
    return `https://www.google.com/maps?q=${encodeURIComponent(url)}&output=embed`
  }

  // If it's not a URL at all (just an address text like "Dubai Investment Park, UAE")
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://www.google.com/maps?q=${encodeURIComponent(url)}&output=embed`
  }

  return url
}

const DEFAULT_MAP_EMBED =
  'https://www.openstreetmap.org/export/embed.html?bbox=55.15%2C25.05%2C55.40%2C25.30&layer=mapnik'

export function LocationSection() {
  const { locationItems, loading } = useSiteContact()

  // Primary location for map embed (first active one with a URL)
  const primaryLocation = locationItems.find((l) => l.url) ?? locationItems[0]
  const mapSrc = primaryLocation?.url ? toEmbedUrl(primaryLocation.url) : DEFAULT_MAP_EMBED

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Find Us"
            title="Our Location"
          />
          <a
            href={primaryLocation?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-none bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90 shrink-0"
          >
            Open in Google Maps
            <ExternalLink className="size-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Map embed — takes 2/3 width on large screens */}
          <div className="overflow-hidden lg:col-span-2">
            <div className="relative h-[420px] w-full overflow-hidden border border-border">
              <iframe
                key={mapSrc}
                title="Our location map"
                src={mapSrc}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Info panel — 1/3 width */}
          <div className="flex flex-col gap-4">
            {/* Location cards — dynamic from dashboard */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Our Locations
              </p>

              {loading ? (
                // Skeleton placeholders
                Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded-none border border-border bg-muted"
                  />
                ))
              ) : locationItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">No locations listed.</p>
              ) : (
                locationItems.map((loc) => (
                  <div
                    key={loc.label}
                    className="group flex items-start gap-3 border border-border bg-secondary/40 p-4 transition-shadow hover:shadow-sm"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                      <MapPin className="size-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-snug">
                        {loc.label}
                      </p>
                      {loc.url && (
                        <a
                          href={loc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          View on map
                          <ExternalLink className="size-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Working hours */}
            <div className="flex items-start gap-3 border border-border bg-secondary/40 p-4">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                <Clock className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Working Hours</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{site.hours}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-2 border-l-2 border-gold bg-primary/5 py-4 pl-5 pr-4">
              <p className="text-sm font-semibold text-foreground">
                Need a pickup from your location?
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                We serve multiple areas — contact us to check coverage.
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <PhoneCall className="size-3.5" />
                Contact us now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
