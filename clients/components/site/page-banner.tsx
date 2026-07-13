import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function PageBanner({
  title,
  breadcrumb,
}: {
  title: string
  breadcrumb: string
}) {
  return (
    <section className="border-b border-border bg-brand-green">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-brand-green-foreground text-balance sm:text-5xl">
          {title}
        </h1>
        <nav
          aria-label="Breadcrumb"
          className="mt-4 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Link href="/" className="text-gold transition-colors hover:text-gold/80">
            Home
          </Link>
          <ChevronRight className="size-4 text-brand-green-foreground/50" />
          <span className="text-brand-green-foreground/70">{breadcrumb}</span>
        </nav>
      </div>
    </section>
  )
}
