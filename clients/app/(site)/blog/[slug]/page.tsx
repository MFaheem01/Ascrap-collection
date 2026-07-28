'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { PageBanner } from '@/components/site/page-banner'
import { getStaticPostBySlugOrId, type BlogPostItem } from '@/lib/blog-data'
import { blogsApi } from '@/lib/api'
import { CalendarDays, User, Tag, ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [post, setPost] = useState<BlogPostItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try static fallback first
    const staticPost = getStaticPostBySlugOrId(slug)
    if (staticPost) {
      setPost(staticPost)
    }

    // Fetch from backend API
    blogsApi.getAll()
      .then((res) => {
        if (res.success && res.data) {
          const apiPost = res.data.find((b) => b.slug === slug || b._id === slug)
          if (apiPost) {
            setPost({
              id: apiPost._id,
              slug: apiPost.slug || apiPost._id,
              title: apiPost.title,
              summary: apiPost.summary,
              content: apiPost.content,
              coverImage: apiPost.coverImage,
              date: apiPost.publishedAt
                ? new Date(apiPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : new Date(apiPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              tag: apiPost.tags?.[0] ?? 'News',
              author: apiPost.author || 'Al Adnan Team',
              readTime: '',
            })
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading && !post) {
    return (
      <>
        <PageBanner title="Article Details" breadcrumb="Blog Article" />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Loading article...</p>
        </div>
      </>
    )
  }

  if (!post) {
    return (
      <>
        <PageBanner title="Article Not Found" breadcrumb="Blog" />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground">Blog Post Not Found</h2>
          <p className="mt-2 text-muted-foreground">The article you are looking for does not exist or has been removed.</p>
          <div className="mt-6">
            <Link href="/blog" className={buttonVariants({ variant: 'default' })}>
              <ArrowLeft className="mr-2 size-4" /> Back to Blog
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageBanner title={post.title} breadcrumb="Article" />

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6">
          
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 mb-6"
          >
            <ArrowLeft className="size-4" /> Back to Blog
          </Link>

          {/* Clean Article Container */}
          <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Cover Image */}
            {post.coverImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary/20">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="size-full object-cover"
                />
                {post.tag && (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-foreground shadow">
                    <Tag className="size-3" />
                    {post.tag}
                  </span>
                )}
              </div>
            )}

            <div className="p-6 sm:p-8">
              {/* Title */}
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {post.title}
              </h1>

              {/* Meta Info: Author & Date */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground border-b border-border pb-4">
                {post.author && (
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <User className="size-4 text-primary" />
                    <span>{post.author}</span>
                  </div>
                )}
                {post.date && (
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="size-4 text-gold" />
                    <span>{post.date}</span>
                  </div>
                )}
              </div>

              {/* Summary */}
              {post.summary && (
                <div className="mt-6 rounded-xl bg-secondary/50 p-4 text-sm font-medium leading-relaxed text-foreground/90 border-l-4 border-gold">
                  {post.summary}
                </div>
              )}

              {/* Article Content */}
              {post.content && (
                <div
                  className="mt-6 text-foreground leading-relaxed text-sm sm:text-base prose prose-neutral dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </div>
          </article>

        </div>
      </section>
    </>
  )
}
