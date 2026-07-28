import type { Metadata } from 'next'
import { ContactClient } from './contact-client'

export const metadata: Metadata = {
  title: 'Contact Al Adnan Scrap Buyer | Free Quote, Dubai',
  description:
    'Contact Al Adnan Scrap Buyer for a free quote on metal, copper, aluminum, or e-waste pickup. Fast response and same-day service.',
}

export default function ContactPage() {
  return <ContactClient />
}
