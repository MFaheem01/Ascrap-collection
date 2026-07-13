'use client'

// Admin dashboard overview page

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Wrench,
  FileText,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  TrendingUp,
  Activity,
  RefreshCw,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { servicesApi, blogsApi, contactApi } from '@/lib/api'

type Stats = {
  services: number
  blogs: number
  emails: number
  phones: number
  locations: number
}

const sections = [
  {
    label: 'Services',
    key: 'services' as const,
    href: '/dashboard/services',
    icon: Wrench,
    description: 'Active scrap collection services',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    ring: 'ring-emerald-200 dark:ring-emerald-800',
    trend: '+2 this month',
  },
  {
    label: 'Blogs',
    key: 'blogs' as const,
    href: '/dashboard/blogs',
    icon: FileText,
    description: 'Published blog articles',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    ring: 'ring-blue-200 dark:ring-blue-800',
    trend: 'Content updated',
  },
  {
    label: 'Emails',
    key: 'emails' as const,
    href: '/dashboard/emails',
    icon: Mail,
    description: 'Contact email addresses',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    ring: 'ring-amber-200 dark:ring-amber-800',
    trend: 'Synced to site',
  },
  {
    label: 'Phones',
    key: 'phones' as const,
    href: '/dashboard/phones',
    icon: Phone,
    description: 'Contact phone numbers',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    ring: 'ring-violet-200 dark:ring-violet-800',
    trend: 'Synced to site',
  },
  {
    label: 'Locations',
    key: 'locations' as const,
    href: '/dashboard/locations',
    icon: MapPin,
    description: 'Service area locations',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    ring: 'ring-rose-200 dark:ring-rose-800',
    trend: 'Updated recently',
  },
]

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ services: 0, blogs: 0, emails: 0, phones: 0, locations: 0 })
  const [loading, setLoading] = useState(true)
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date())

  const fetchStats = () => {
    setLoading(true)
    Promise.all([
      servicesApi.getAll(),
      blogsApi.getAll(),
      contactApi.getByType('email'),
      contactApi.getByType('phone'),
      contactApi.getByType('location'),
    ])
      .then(([svc, blg, em, ph, loc]) => {
        setStats({
          services: svc.count,
          blogs: blg.count,
          emails: em.count,
          phones: ph.count,
          locations: loc.count,
        })
        setLastRefreshed(new Date())
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchStats() }, [])

  const totalItems = Object.values(stats).reduce((a, b) => a + b, 0)

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Page heading */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your website content — services, blogs, and contact info.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 shrink-0"
          onClick={fetchStats}
          disabled={loading}
        >
          <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Summary banner */}
      <Card className="bg-primary text-primary-foreground border-0 shadow-md">
        <CardContent className="flex items-center justify-between gap-4 py-5 px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/15">
              <Activity className="size-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-foreground/80">Total Content Items</p>
              {loading ? (
                <Skeleton className="mt-1 h-7 w-16 bg-primary-foreground/20" />
              ) : (
                <p className="text-3xl font-bold">{totalItems}</p>
              )}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-primary-foreground/70 text-sm">
            <TrendingUp className="size-4" />
            <span>All content synced to your website</span>
          </div>
        </CardContent>
      </Card>

      {/* Stat cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {sections.map((s) => (
          <Link key={s.key} href={s.href} className="group">
            <Card className={`h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ring-1 ${s.ring}`}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className={`flex size-10 items-center justify-center rounded-lg ring-1 ${s.bg} ${s.color} ${s.ring}`}>
                    <s.icon className="size-5" />
                  </div>
                  <ArrowUpRight className={`size-4 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-muted-foreground`} />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                {loading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  <p className="text-3xl font-bold text-foreground">{stats[s.key]}</p>
                )}
                <p className="text-sm font-medium text-foreground mt-0.5">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Separator />

      {/* Footer note */}
      <p className="mt-auto text-xs text-muted-foreground/60">
        Last refreshed: {lastRefreshed.toLocaleTimeString()}
      </p>
    </div>
  )
}
