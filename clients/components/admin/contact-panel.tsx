'use client'

// Reusable Contact CRUD Panel

import { useEffect, useState } from 'react'
import { Plus, Pencil, Check, X, Loader2, ToggleLeft, ToggleRight } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ConfirmDelete } from '@/components/admin/confirm-delete'
import { contactApi, type ApiContact, type ContactType } from '@/lib/api'

type Props = {
  type: ContactType
  title: string          // e.g. "Email Addresses"
  valuePlaceholder: string // e.g. "pickup@askrap.ae"
  labelPlaceholder: string // e.g. "Main Office"
}

const BLANK = { label: '', value: '', isActive: true, order: 0 }

export function ContactPanel({ type, title, valuePlaceholder, labelPlaceholder }: Props) {
  const [items, setItems] = useState<ApiContact[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(BLANK)
  const [saving, setSaving] = useState(false)

  const fetchItems = async () => {
    try {
      const res = await contactApi.getByType(type)
      setItems(res.data)
    } catch {
      toast.error(`Failed to load ${title.toLowerCase()}.`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [type])

  const openCreate = () => {
    setEditingId(null)
    setForm(BLANK)
    setShowForm(true)
  }

  const openEdit = (item: ApiContact) => {
    setEditingId(item._id)
    setForm({ label: item.label, value: item.value, isActive: item.isActive, order: item.order })
    setShowForm(true)
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
        await contactApi.update(editingId, form)
        toast.success(`${title.slice(0, -1)} updated.`)
      } else {
        await contactApi.create({ type, ...form })
        toast.success(`${title.slice(0, -1)} created.`)
      }
      cancelForm()
      fetchItems()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (item: ApiContact) => {
    try {
      await contactApi.update(item._id, { isActive: !item.isActive })
      fetchItems()
    } catch {
      toast.error('Failed to update status.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await contactApi.delete(id)
      toast.success('Entry deleted.')
      fetchItems()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete.')
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage the {title.toLowerCase()} shown on your website.
          </p>
        </div>
        {!showForm && (
          <Button onClick={openCreate} className="gap-2">
            <Plus className="size-4" /> Add Entry
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <Card className="mb-6 p-6">
          <h2 className="mb-4 text-base font-semibold">{editingId ? `Edit Entry` : `New Entry`}</h2>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium font-semibold">
                {type === 'location' ? 'Location Name / Title *' : 'Label *'}
              </label>
              <Input
                placeholder={labelPlaceholder}
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium font-semibold">
                {type === 'location' ? 'Google Maps Link / Address *' : 'Value *'}
              </label>
              <Input
                placeholder={valuePlaceholder}
                value={form.value}
                onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                required
              />
              {type === 'location' && (
                <span className="text-xs text-muted-foreground">
                  Paste a share link from Google Maps (e.g. https://maps.app.goo.gl/...) or enter a physical address to query.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Display Order</label>
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                  className="size-4"
                />
                Active (visible on site)
              </label>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
              <Button type="submit" disabled={saving} className="gap-2">
                {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                {editingId ? 'Save Changes' : 'Create Entry'}
              </Button>
              <Button type="button" variant="outline" onClick={cancelForm} className="gap-2">
                <X className="size-4" /> Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Table */}
      <Card className="overflow-hidden p-0">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center text-sm text-muted-foreground">
            No {title.toLowerCase()} yet. Click &quot;Add Entry&quot; to create one.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b bg-secondary/40">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Label</th>
                <th className="px-5 py-3 text-left font-semibold">Value</th>
                <th className="px-5 py-3 text-left font-semibold">Order</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-secondary/20">
                  <td className="px-5 py-3 font-medium text-foreground">{item.label}</td>
                  <td className="px-5 py-3 text-muted-foreground">{item.value}</td>
                  <td className="px-5 py-3 text-muted-foreground">{item.order}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => toggleActive(item)}>
                      {item.isActive ? (
                        <Badge className="bg-emerald-100 text-emerald-700 gap-1">
                          <ToggleRight className="size-3" /> Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <ToggleLeft className="size-3" /> Inactive
                        </Badge>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="size-8" onClick={() => openEdit(item)}>
                        <Pencil className="size-4" />
                      </Button>
                      <ConfirmDelete label={item.label} onConfirm={() => handleDelete(item._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}
