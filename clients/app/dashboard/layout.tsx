'use client'

// Admin dashboard layout — ShadCN Sidebar + auth guard

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AuthProvider, useAuth } from '@/context/auth-context'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/components/admin/dashboard-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'

// ─── Route → breadcrumb label map ──────────────────────────────────────────
const ROUTE_LABELS: Record<string, string> = {
  '/dashboard':           'Overview',
  '/dashboard/services':  'Services',
  '/dashboard/blogs':     'Blogs',
  '/dashboard/emails':    'Emails',
  '/dashboard/phones':    'Phones',
  '/dashboard/locations': 'Locations',
  '/dashboard/account':   'Account',
}

// Auth guard: redirects to login if unauthenticated
function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/dashboard/login') {
      router.replace('/dashboard/login')
    }
  }, [isAuthenticated, pathname, router])

  if (!isAuthenticated && pathname !== '/dashboard/login') return null
  return <>{children}</>
}

// Top header bar with sidebar toggle + breadcrumb
function DashboardHeader() {
  const pathname = usePathname()
  const label = ROUTE_LABELS[pathname] ?? 'Dashboard'

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <span className="text-muted-foreground text-sm">Dashboard</span>
          </BreadcrumbItem>
          {label !== 'Overview' && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{label}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
          {label === 'Overview' && (
            <BreadcrumbItem className="md:hidden">
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}

// Shell: sidebar + content area (skipped for login page)
function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/dashboard/login'

  if (isLoginPage) return <>{children}</>

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <DashboardShell>{children}</DashboardShell>
      </AuthGuard>
    </AuthProvider>
  )
}
