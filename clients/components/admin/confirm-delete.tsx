'use client'

// Delete confirmation button

import { useState } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  label: string
  onConfirm: () => Promise<void>
}

export function ConfirmDelete({ label, onConfirm }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    await onConfirm()
    setLoading(false)
    setOpen(false)
  }

  if (!open) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-8 text-destructive hover:bg-destructive/10"
        onClick={() => setOpen(true)}
        title={`Delete ${label}`}
      >
        <Trash2 className="size-4" />
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-1.5">
      <span className="text-xs font-medium text-destructive">Delete?</span>
      <Button
        size="sm"
        variant="destructive"
        className="h-7 px-2 text-xs"
        disabled={loading}
        onClick={handleConfirm}
      >
        {loading ? <Loader2 className="size-3 animate-spin" /> : 'Yes'}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="h-7 px-2 text-xs"
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
    </div>
  )
}
