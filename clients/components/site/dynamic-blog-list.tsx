'use client'

// Dynamic blog list — styled to match Al Adnan Scrap Buyer layout (brand-green + gold)

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CalendarDays, ArrowRight, Tag } from 'lucide-react'
import { blogsApi } from '@/lib/api'

const staticPosts = [
  {
    title: 'How Scrap Metal Prices Are Set (and How to Get More)',
    excerpt: 'Understand the factors behind ferrous and non-ferrous pricing so you can time your pickups.',
    image: '/industry-manufacturing.png',
    date: 'Jun 28, 2023',
    tag: 'Pricing',
  },
  {
    title: 'A Business Guide to Responsible E-Waste Recycling',
    excerpt: 'From data destruction to certification, here is what every company should know.',
    image: '/banner-2.png',
    date: 'Jul 2, 2023',
    tag: 'E-Waste',
  },
  {
    title: 'Clearing a Construction Site: Scrap Removal Checklist',
    excerpt: 'Keep your crews moving with a simple plan for staging and collecting site metal.',
    image: '/industry-construction.png',
    date: 'Jul 4, 2023',
    tag: 'Construction',
  },
  {
    title: 'Ferrous vs Non-Ferrous: Know Your Metals',
    excerpt: 'A quick primer on identifying and separating the metals worth the most at the scale.',
    image: '/about-2.png',
    date: 'Jul 5, 2023',
    tag: 'Guide',
  },
  {
    title: 'What Happens to Your Old Appliances After Pickup',
    excerpt: 'Follow a refrigerator through the full Al Adnan Scrap Buyer recovery and recycling process.',
    image: '/banner-1.png',
    date: 'Jul 7, 2023',
    tag: 'Appliances',
  },
  {
    title: 'Salvage Yard Trends Shaping Auto Recycling',
    excerpt: 'How demand for parts and metals is changing the way vehicles get scrapped.',
    image: '/industry-automotive.png',
    date: 'Jul 8, 2023',
    tag: 'Automotive',
  },
]

export function DynamicBlogList() {
  const [posts, setPosts] = useState<any[]>(staticPosts)

  useEffect(() => {
    blogsApi.getAll()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          const active = res.data
            .filter((b) => b.isPublished)
            .map((b) => ({
              title: b.title,
              excerpt: b.summary || b.content.substring(0, 120),
              image: b.coverImage || '/images/about-2.png',
              date: b.publishedAt
                ? new Date(b.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              tag: b.tags?.[0] ?? 'News',
            }))
          if (active.length > 0) {
            setPosts(active)
          }
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post, i) => (
        <article
          key={post.title + i}
          className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
        >
          {/* Cover Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/30">
            <img
              src={post.image}
              alt={post.title}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Tag badge on top-left */}
            {post.tag && (
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-foreground shadow">
                <Tag className="size-2.5" />
                {post.tag}
              </span>
            )}
          </div>

          {/* Bottom green accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-gold to-primary/40" />

          {/* Content */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            {/* Date */}
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <CalendarDays className="size-3 text-gold shrink-0" />
              <span>{post.date}</span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 flex-1">
              {post.excerpt}
            </p>

            {/* Read more */}
            <Link
              href="/blog"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold"
            >
              Read More
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
