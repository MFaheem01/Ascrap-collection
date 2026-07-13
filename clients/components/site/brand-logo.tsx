import Link from 'next/link'
import { Recycle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site-data'

export function BrandLogo({
  className,
  onDark = false,
}: {
  className?: string
  onDark?: boolean
}) {
  return (
    <Link href="/" className={cn('flex items-center gap-2.5', className)}>
      <span className="flex size-10 items-center justify-center rounded-md bg-gold text-gold-foreground">
        <Recycle className="size-6" />
      </span>
      <span
        className={cn(
          'text-xl font-extrabold uppercase tracking-tight',
          onDark ? 'text-brand-green-foreground' : 'text-foreground',
        )}
      >
        {site.name}
      </span>
    </Link>
  )
}
