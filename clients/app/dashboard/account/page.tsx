'use client'

// Account settings page

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { authApi } from '@/lib/api'
import { useAuth } from '@/context/auth-context'

export default function AccountPage() {
  const { email, setAuth } = useAuth()
  const [newEmail, setNewEmail] = useState(email ?? '')
  const [updatingEmail, setUpdatingEmail] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [updatingPassword, setUpdatingPassword] = useState(false)

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdatingEmail(true)
    try {
      await authApi.updateEmail(newEmail)
      setAuth(localStorage.getItem('askrap_token') ?? '', newEmail)
      toast.success('Email updated successfully.')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to update email.')
    } finally {
      setUpdatingEmail(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdatingPassword(true)
    try {
      await authApi.updatePassword(currentPassword, newPassword)
      toast.success('Password updated successfully.')
      setCurrentPassword('')
      setNewPassword('')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to update password.')
    } finally {
      setUpdatingPassword(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Update your login email and password.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email Form */}
        <Card className="p-6">
          <h2 className="mb-4 text-base font-semibold text-foreground">Update Email</h2>
          <form onSubmit={handleUpdateEmail} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={updatingEmail} className="w-fit gap-2">
              {updatingEmail ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              Save Email
            </Button>
          </form>
        </Card>

        {/* Password Form */}
        <Card className="p-6">
          <h2 className="mb-4 text-base font-semibold text-foreground">Update Password</h2>
          <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Current Password</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">New Password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Minimum 6 characters"
              />
            </div>
            <Button type="submit" disabled={updatingPassword} className="w-fit gap-2">
              {updatingPassword ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              Save Password
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
