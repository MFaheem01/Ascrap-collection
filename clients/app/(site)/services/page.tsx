import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { PageBanner } from '@/components/site/page-banner'
import { SectionHeading } from '@/components/site/section-heading'
import { DynamicServicesList } from '@/components/site/dynamic-services-list'

const FaqSection = dynamic(() =>
  import('@/components/site/sections/faq-section').then((m) => m.FaqSection),
)
const CtaSection = dynamic(() =>
  import('@/components/site/sections/cta-section').then((m) => m.CtaSection),
)

export const metadata: Metadata = {
  title: 'Scrap Buying Services | Al Adnan Scrap Buyer, Dubai',
  description:
    'Explore Al Adnan scrap services, from copper and steel to old appliances, batteries, and e-waste. Free pickup and same-day payment across the UAE.',
}

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        title="Our Services"
        breadcrumb="Services"
        description="Al Adnan buys and collects scrap metal, appliances, batteries, and e-waste across Dubai and the UAE. Every pickup includes free transportation, on-the-spot digital weighing, and instant cash payment, with no hidden fees."
      />
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="What We Collect"
            title="Full-Service Scrap Collection"
          />
          <DynamicServicesList />
        </div>
      </section>
      <FaqSection />
      <CtaSection />
    </>
  )
}
