'use client'

// Dynamic services list component

import { useEffect, useState } from 'react'
import { ServiceCard } from '@/components/site/service-card'
import { services as staticServices } from '@/lib/site-data'
import { servicesApi } from '@/lib/api'

export function DynamicServicesList() {
  const [services, setServices] = useState<any[]>(staticServices)

  useEffect(() => {
    servicesApi.getAll()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          const active = res.data.filter((s) => s.isActive).sort((a, b) => a.order - b.order)
          if (active.length > 0) {
            setServices(active)
          }
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  )
}
