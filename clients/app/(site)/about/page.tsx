import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Leaf, ShieldCheck, Users } from 'lucide-react'
import { PageBanner } from '@/components/site/page-banner'
import { SectionHeading } from '@/components/site/section-heading'
import { AboutSection } from '@/components/site/sections/about-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const WhyChooseSection = dynamic(() =>
  import('@/components/site/sections/why-choose-section').then(
    (m) => m.WhyChooseSection,
  ),
)
const CtaSection = dynamic(() =>
  import('@/components/site/sections/cta-section').then((m) => m.CtaSection),
)

export const metadata: Metadata = {
  title: 'About — Al Adnan Scrap Buyer',
  description:
    'Learn how Al Adnan Scrap Buyer recycles metal, electronics, and industrial materials responsibly.',
}

const values = [
  {
    icon: Leaf,
    title: 'Sustainability First',
    body: 'Every ton we recover keeps material out of landfill and back into the supply chain.',
  },
  {
    icon: ShieldCheck,
    title: 'Fully Compliant',
    body: 'Licensed, insured, and audited — with full documentation on every collection.',
  },
  {
    icon: Users,
    title: 'People-Powered',
    body: 'Trained, courteous crews who treat your site and your time with respect.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Al Adnan Scrap Buyer" breadcrumb="About" />
      <AboutSection />

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="What Drives Us" title="Our Core Values" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="rounded-none border-border">
                <CardHeader>
                  <span className="flex size-14 items-center justify-center rounded-md bg-secondary text-primary">
                    <value.icon className="size-7" />
                  </span>
                  <CardTitle className="pt-2 text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseSection />
      <CtaSection />
    </>
  )
}
