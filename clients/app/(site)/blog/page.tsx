import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, ArrowRight } from 'lucide-react'
import { PageBanner } from '@/components/site/page-banner'
import { SectionHeading } from '@/components/site/section-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Blog — ScrapWorks',
  description: 'Guides and news on scrap metal pricing, recycling, and collection.',
}

import { DynamicBlogList } from '@/components/site/dynamic-blog-list'

export default function BlogPage() {
  return (
    <>
      <PageBanner title="News & Insights" breadcrumb="Blog" />
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="From the Yard"
            title="Latest Scrap & Recycling News"
          />
          <DynamicBlogList />
        </div>
      </section>
    </>
  )
}
