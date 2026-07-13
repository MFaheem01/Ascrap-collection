import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { PageBanner } from '@/components/site/page-banner'
import { SectionHeading } from '@/components/site/section-heading'
import { ServiceCard } from '@/components/site/service-card'
import { DynamicServicesList } from '@/components/site/dynamic-services-list'

const CtaSection = dynamic(() =>
  import('@/components/site/sections/cta-section').then((m) => m.CtaSection),
)

export const metadata: Metadata = {
  title: 'Services — ScrapWorks',
  description:
    'Scrap metal pickup, industrial scrap, e-waste, appliance removal, cardboard, and vehicle scrap collection.',
}

export default function ServicesPage() {
  return (
    <>
      <PageBanner title="Our Services" breadcrumb="Services" />
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="What We Collect"
            title="Full-Service Scrap Collection"
          />
          <DynamicServicesList />
        </div>
      </section>
      <CtaSection />
    </>
  )
}
