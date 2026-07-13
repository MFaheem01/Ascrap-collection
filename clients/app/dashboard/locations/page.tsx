'use client'

// Locations management page

import { ContactPanel } from '@/components/admin/contact-panel'

export default function LocationsPage() {
  return (
    <ContactPanel
      type="location"
      title="Locations"
      labelPlaceholder="e.g. Dubai Warehouse"
      valuePlaceholder="e.g. https://maps.app.goo.gl/... or Dubai Investment Park"
    />
  )
}
