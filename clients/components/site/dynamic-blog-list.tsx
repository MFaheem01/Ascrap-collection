'use client'

// Dynamic blog list — styled to match Al Adnan Scrap Buyer layout (brand-green + gold)

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CalendarDays, ArrowRight, Tag } from 'lucide-react'
import { blogsApi } from '@/lib/api'
import { staticBlogPosts } from '@/lib/blog-data'

export function DynamicBlogList() {
  const [posts, setPosts] = useState<any[]>(staticBlogPosts)

  useEffect(() => {
    blogsApi.getAll()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          const active = res.data
            .filter((b) => b.isPublished)
            .map((b) => ({
              id: b._id,
              slug: b.slug || b._id,
              title: b.title,
              excerpt: b.summary || (b.content ? b.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...' : ''),
              image: b.coverImage || '/about-2.png',
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
      .catch(() => { })
  }, [])

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post, i) => {
        const postUrl = `/blog/${post.slug || post.id}`
        return (
          <article
            key={post.title + i}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
          >
            {/* Cover Image Link */}
            <Link href={postUrl} className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/30 block">
              <img
                src={post.image || post.coverImage || '/about-2.png'}
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
            </Link>

            {/* Bottom green accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-gold to-primary/40" />

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-5">
              {/* Date */}
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <CalendarDays className="size-3 text-gold shrink-0" />
                <span>{post.date}</span>
              </div>

              {/* Title Link */}
              <h3 className="text-sm font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                <Link href={postUrl} className="hover:underline">
                  {post.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 flex-1">
                {post.excerpt || post.summary}
              </p>

              {/* Read more link */}
              <Link
                href={postUrl}
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold"
              >
                Read More
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}
