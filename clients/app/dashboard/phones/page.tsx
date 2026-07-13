'use client'

// Phones management page

import { ContactPanel } from '@/components/admin/contact-panel'

export default function PhonesPage() {
  return (
    <ContactPanel
      type="phone"
      title="Phone Numbers"
      labelPlaceholder="e.g. WhatsApp"
      valuePlaceholder="e.g. +971 55 123 4567"
    />
  )
}
