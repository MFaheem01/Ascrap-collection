'use client'

// Shared hook — fetches live contact info from the API.
// Falls back to static values from site-data.ts when the API is unavailable.
// Import this in any component that needs phones / emails / locations.

import { useEffect, useState } from 'react'
import { site } from '@/lib/site-data'
import { contactApi } from '@/lib/api'

export type LocationItem = { label: string; url: string }

export type SiteContact = {
  phones: string[]
  emails: string[]
  /** Plain display labels for simple use (header, etc.) */
  locations: string[]
  /** Full objects: label = human name, url = maps link */
  locationItems: LocationItem[]
  loading: boolean
}

export function useSiteContact(): SiteContact {
  const [phones, setPhones] = useState<string[]>([site.phone])
  const [emails, setEmails] = useState<string[]>([site.email])
  const [locations, setLocations] = useState<string[]>([site.address])
  const [locationItems, setLocationItems] = useState<LocationItem[]>([
    { label: site.address, url: '' },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    contactApi
      .getAll()
      .then((res) => {
        if (res.success && res.data.length > 0) {
          const active = res.data.filter((c) => c.isActive)
          const e = active.filter((c) => c.type === 'email').map((c) => c.value)
          const p = active.filter((c) => c.type === 'phone').map((c) => c.value)
          const lRaw = active.filter((c) => c.type === 'location')
          const l = lRaw.map((c) => c.label)
          const li: LocationItem[] = lRaw.map((c) => ({ label: c.label, url: c.value }))
          if (e.length > 0) setEmails(e)
          if (p.length > 0) setPhones(p)
          if (l.length > 0) {
            setLocations(l)
            setLocationItems(li)
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { phones, emails, locations, locationItems, loading }
}
