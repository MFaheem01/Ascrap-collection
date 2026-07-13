'use client'

// Blogs management page — card grid layout

import { useEffect, useState } from 'react'
import { Plus, Pencil, Check, X, Loader2, BookOpen } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ConfirmDelete } from '@/components/admin/confirm-delete'
import { blogsApi, type ApiBlog } from '@/lib/api'
import { UploadButton } from '@/lib/uploadthing'

const BLANK = {
  title: '',
  slug: '',
  summary: '',
  content: '',
  coverImage: '',
  tags: [] as string[],
  isPublished: false,
}

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<ApiBlog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(BLANK)
  const [tagsInput, setTagsInput] = useState('')
  const [saving, setSaving] = useState(false)

  const fetchBlogs = async () => {
    try {
      const res = await blogsApi.getAll()
      setBlogs(res.data)
    } catch {
      toast.error('Failed to load blog posts.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBlogs() }, [])

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: editingId
        ? f.slug
        : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }))
  }

  const openCreate = () => {
    setEditingId(null)
    setForm(BLANK)
    setTagsInput('')
    setShowForm(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const openEdit = (b: ApiBlog) => {
    setEditingId(b._id)
    setForm({
      title: b.title,
      slug: b.slug,
      summary: b.summary,
      content: b.content,
      coverImage: b.coverImage,
      tags: b.tags,
      isPublished: b.isPublished,
    })
    setTagsInput(b.tags.join(', '))
    setShowForm(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingId(null)
    setForm(BLANK)
    setTagsInput('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
    const payload = { ...form, tags }
    try {
      if (editingId) {
        await blogsApi.update(editingId, payload)
        toast.success('Blog post updated.')
      } else {
        await blogsApi.create(payload)
        toast.success('Blog post created.')
      }
      cancelForm()
      fetchBlogs()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const togglePublished = async (b: ApiBlog) => {
    try {
      await blogsApi.update(b._id, { isPublished: !b.isPublished })
      fetchBlogs()
    } catch {
      toast.error('Failed to update status.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await blogsApi.delete(id)
      toast.success('Blog post deleted.')
      fetchBlogs()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete.')
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Blog Posts</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {blogs.length} post{blogs.length !== 1 ? 's' : ''} total
          </p>
        </div>
        {!showForm && (
          <Button onClick={openCreate} className="gap-2 shrink-0">
            <Plus className="size-4" /> Add Post
          </Button>
        )}
      </div>

      {/* ── Create / Edit form ── */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Blog Post' : 'New Blog Post'}</CardTitle>
            <CardDescription>
              {editingId ? 'Update the post details below.' : 'Fill in the fields to publish a new article.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="blog-form" onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  placeholder="Blog title"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Slug *</label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  required
                  placeholder="url-friendly-slug"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-sm font-medium">Summary</label>
                <Input
                  value={form.summary}
                  onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                  placeholder="Short excerpt shown in listings"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-sm font-medium">Content *</label>
                <textarea
                  className="min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  required
                  placeholder="Full blog content (HTML or plain text)"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-sm font-medium">Cover Image</label>
                <div className="flex flex-wrap items-center gap-4">
                  {form.coverImage ? (
                    <div className="relative size-16 overflow-hidden rounded-md border">
                      <img src={form.coverImage} alt="Cover" className="size-full object-cover" />
                      <button
                        type="button"
                        className="absolute right-0 top-0 rounded-bl-md bg-destructive p-1 text-destructive-foreground hover:bg-destructive/80"
                        onClick={() => setForm((f) => ({ ...f, coverImage: '' }))}
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex size-16 items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">
                      No Image
                    </div>
                  )}
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        setForm((f) => ({ ...f, coverImage: res[0].url }))
                        toast.success('Cover image uploaded.')
                      }
                    }}
                    onUploadError={(error: Error) => toast.error(`Upload failed: ${error.message}`)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="publish-toggle"
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
                  className="size-4 accent-primary"
                />
                <label htmlFor="publish-toggle" className="cursor-pointer text-sm font-medium">
                  Publish immediately
                </label>
              </div>
            </form>
          </CardContent>
          <CardFooter className="gap-2">
            <Button type="submit" form="blog-form" disabled={saving} className="gap-2">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              {editingId ? 'Save Changes' : 'Create Post'}
            </Button>
            <Button type="button" variant="outline" onClick={cancelForm} className="gap-2">
              <X className="size-4" /> Cancel
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* ── Blog cards grid ── */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="size-7 animate-spin text-muted-foreground" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <BookOpen className="size-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No posts yet. Click &ldquo;Add Post&rdquo; to write your first article.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <Card key={b._id} className="flex flex-col">
              {/* Cover image */}
              {b.coverImage && (
                <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                  <img src={b.coverImage} alt={b.title} className="size-full object-cover" />
                </div>
              )}

              <CardHeader className={b.coverImage ? 'pt-3' : undefined}>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-2 text-base leading-snug">{b.title}</CardTitle>
                  <button
                    onClick={() => togglePublished(b)}
                    title="Toggle published"
                    className="shrink-0"
                  >
                    {b.isPublished ? (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Published</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </button>
                </div>
                {b.summary && (
                  <CardDescription className="line-clamp-2">{b.summary}</CardDescription>
                )}
              </CardHeader>

              <CardContent className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                <Separator />
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1">
                  <span><span className="font-medium text-foreground">By:</span> {b.author}</span>
                  <span><span className="font-medium text-foreground">Date:</span> {formatDate(b.createdAt)}</span>
                  {b.tags?.length > 0 && (
                    <span className="col-span-2 flex flex-wrap gap-1 pt-0.5">
                      {b.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-secondary px-2 py-0.5">{tag}</span>
                      ))}
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="mt-auto gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5"
                  onClick={() => openEdit(b)}
                >
                  <Pencil className="size-3.5" /> Edit
                </Button>
                <ConfirmDelete label={b.title} onConfirm={() => handleDelete(b._id)} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
