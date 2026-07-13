'use client'

// Emails management page

import { ContactPanel } from '@/components/admin/contact-panel'

export default function EmailsPage() {
  return (
    <ContactPanel
      type="email"
      title="Email Addresses"
      labelPlaceholder="e.g. Main Office"
      valuePlaceholder="e.g. pickup@askrap.ae"
    />
  )
}
