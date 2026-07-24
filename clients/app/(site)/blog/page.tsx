import type { Metadata } from 'next'
import { PageBanner } from '@/components/site/page-banner'
import { SectionHeading } from '@/components/site/section-heading'

export const metadata: Metadata = {
  title: 'Blog — Al Adnan Scrap Buyer',
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
