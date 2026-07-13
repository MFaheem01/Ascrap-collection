'use client'

// Home page services section

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/site/section-heading'
import { ServiceCard } from '@/components/site/service-card'
import { services as staticServices } from '@/lib/site-data'
import { servicesApi, type ApiService } from '@/lib/api'

export function ServicesSection() {
  const [services, setServices] = useState<any[]>(staticServices)

  useEffect(() => {
    servicesApi.getAll()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          // Use active services sorted by order
          const active = res.data.filter((s) => s.isActive).sort((a, b) => a.order - b.order)
          if (active.length > 0) {
            setServices(active)
          }
        }
      })
      .catch(() => {}) // Fall back silently to static data
  }, [])

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="What We Collect"
            title="Scrap Services Built Around You"
          />
          <Button
            render={<Link href="/services" />}
            className="rounded-none bg-gold font-semibold text-gold-foreground hover:bg-gold/90"
          >
            View All Services
            <RefreshCw data-icon="inline-end" />
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
