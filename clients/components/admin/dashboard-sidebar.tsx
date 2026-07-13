'use client'

// Dashboard sidebar using ShadCN Sidebar primitives + auth-aware nav

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Wrench,
  FileText,
  Mail,
  Phone,
  MapPin,
  Settings,
  LogOut,
  Recycle,
  ChevronsUpDown,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/context/auth-context'
import { site } from '@/lib/site-data'

const navItems = [
  { label: 'Overview',  href: '/dashboard',          icon: LayoutDashboard },
  { label: 'Services',  href: '/dashboard/services',  icon: Wrench },
  { label: 'Blogs',     href: '/dashboard/blogs',     icon: FileText },
  { label: 'Emails',    href: '/dashboard/emails',    icon: Mail },
  { label: 'Phones',    href: '/dashboard/phones',    icon: Phone },
  { label: 'Locations', href: '/dashboard/locations', icon: MapPin },
  { label: 'Account',   href: '/dashboard/account',   icon: Settings },
]

function UserFooter() {
  const { email, clearAuth } = useAuth()
  const router = useRouter()
  const { isMobile } = useSidebar()

  const initials = email ? email.slice(0, 2).toUpperCase() : 'AD'

  const handleLogout = () => {
    clearAuth()
    router.push('/dashboard/login')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="aria-expanded:bg-muted"
                tooltip="Account"
              />
            }
          >
            <Avatar className="size-8 rounded-lg shrink-0">
              <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Admin</span>
              <span className="truncate text-xs text-sidebar-foreground/60">{email}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4 shrink-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
            className="w-56"
          >
            <div className="flex items-center gap-2 px-2 py-2 text-sm">
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 leading-tight">
                <span className="truncate font-medium">Admin</span>
                <span className="truncate text-xs text-muted-foreground">{email}</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/dashboard/account')}>
              <Settings />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
            >
              <LogOut />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* ── Brand header ── */}
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={site.name}
              render={<Link href="/" />}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <Recycle className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold">{site.name}</span>
                <span className="truncate text-xs text-sidebar-foreground/60">Admin Panel</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── Navigation ── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive =
                item.href === '/dashboard'
                  ? pathname === '/dashboard'
                  : pathname.startsWith(item.href)
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.label}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ── User footer ── */}
      <SidebarFooter className="border-t border-sidebar-border">
        <UserFooter />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
