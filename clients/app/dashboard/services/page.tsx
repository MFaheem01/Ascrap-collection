'use client'

// Services management page — card grid layout

import { useEffect, useState } from 'react'
import { Plus, Pencil, Check, X, Loader2, PackageOpen } from 'lucide-react'
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
import { servicesApi, type ApiService } from '@/lib/api'
import { UploadButton } from '@/lib/uploadthing'

const BLANK = {
  title: '',
  slug: '',
  description: '',
  icon: 'Recycle',
  isActive: true,
  order: 0,
  image: '',
  location: 'Dubai, UAE',
  rating: 5.0,
  price: 'Best Rates',
}

export default function ServicesPage() {
  const [services, setServices] = useState<ApiService[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(BLANK)
  const [saving, setSaving] = useState(false)

  const fetchServices = async () => {
    try {
      const res = await servicesApi.getAll()
      setServices(res.data)
    } catch {
      toast.error('Failed to load services.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchServices() }, [])

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: editingId ? f.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }))
  }

  const openCreate = () => {
    setEditingId(null)
    setForm(BLANK)
    setShowForm(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const openEdit = (s: ApiService) => {
    setEditingId(s._id)
    setForm({
      title: s.title,
      slug: s.slug,
      description: s.description,
      icon: s.icon,
      isActive: s.isActive,
      order: s.order,
      image: s.image || '',
    })
    setShowForm(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  const cancelForm = () => {
    setShowForm(false)
    setEditingId(null)
    setForm(BLANK)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingId) {
        await servicesApi.update(editingId, form)
        toast.success('Service updated.')
      } else {
        await servicesApi.create(form)
        toast.success('Service created.')
      }
      cancelForm()
      fetchServices()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (s: ApiService) => {
    try {
      await servicesApi.update(s._id, { isActive: !s.isActive })
      fetchServices()
    } catch {
      toast.error('Failed to update status.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await servicesApi.delete(id)
      toast.success('Service deleted.')
      fetchServices()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete.')
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Services</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {services.length} service{services.length !== 1 ? 's' : ''} total
          </p>
        </div>
        {!showForm && (
          <Button onClick={openCreate} className="gap-2 shrink-0">
            <Plus className="size-4" /> Add Service
          </Button>
        )}
      </div>

      {/* ── Create / Edit form ── */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Service' : 'New Service'}</CardTitle>
            <CardDescription>
              {editingId ? 'Update the details for this service.' : 'Fill in the details to create a new service.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="service-form" onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  placeholder="e.g. Metal Pickup"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Slug *</label>
                <Input
                  placeholder="e.g. metal-pickup"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-sm font-medium">Description *</label>
                <Input
                  placeholder="Short description of the service"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Icon (Lucide name)</label>
                <Input
                  placeholder="e.g. Recycle, Factory, Car"
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Display Order</label>
                <Input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-sm font-medium">Service Image</label>
                <div className="flex flex-wrap items-center gap-4">
                  {form.image ? (
                    <div className="relative size-16 overflow-hidden rounded-md border">
                      <img src={form.image} alt="Service preview" className="size-full object-cover" />
                      <button
                        type="button"
                        className="absolute right-0 top-0 rounded-bl-md bg-destructive p-1 text-destructive-foreground hover:bg-destructive/80"
                        onClick={() => setForm((f) => ({ ...f, image: '' }))}
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
                        setForm((f) => ({ ...f, image: res[0].url }))
                        toast.success('Image uploaded.')
                      }
                    }}
                    onUploadError={(error: Error) => toast.error(`Upload failed: ${error.message}`)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="gap-2">
            <Button type="submit" form="service-form" disabled={saving} className="gap-2">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              {editingId ? 'Save Changes' : 'Create Service'}
            </Button>
            <Button type="button" variant="outline" onClick={cancelForm} className="gap-2">
              <X className="size-4" /> Cancel
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* ── Services grid ── */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="size-7 animate-spin text-muted-foreground" />
        </div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <PackageOpen className="size-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No services yet. Click &ldquo;Add Service&rdquo; to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s._id} className="flex flex-col">
              {/* Cover image */}
              {s.image && (
                <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                  <img src={s.image} alt={s.title} className="size-full object-cover" />
                </div>
              )}

              <CardHeader className={s.image ? 'pt-3' : undefined}>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{s.title}</CardTitle>
                  <button
                    onClick={() => toggleActive(s)}
                    title="Toggle active"
                    className="shrink-0"
                  >
                    {s.isActive ? (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </button>
                </div>
                <CardDescription className="line-clamp-2">{s.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                <Separator />
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1">
                  <span><span className="font-medium text-foreground">Icon:</span> {s.icon}</span>
                  <span><span className="font-medium text-foreground">Order:</span> {s.order}</span>
                </div>
              </CardContent>

              <CardFooter className="mt-auto gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1.5"
                  onClick={() => openEdit(s)}
                >
                  <Pencil className="size-3.5" /> Edit
                </Button>
                <ConfirmDelete label={s.title} onConfirm={() => handleDelete(s._id)} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
