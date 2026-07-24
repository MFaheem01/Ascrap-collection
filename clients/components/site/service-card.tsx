'use client'

// Service card — styled to match Al Adnan Scrap Buyer layout (brand-green + gold accent system)

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function ServiceCard({ service }: { service: any }) {
  const imageSrc = service.image || service.coverImage || '/images/industry-manufacturing.png'

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/30">
        <img
          src={imageSrc}
          alt={service.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Green overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Bottom green accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-gold to-primary/40" />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Title */}
        <h3 className="text-base font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 flex-1">
          {service.description}
        </p>

        {/* Learn more link */}
        <Link
          href="/services"
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold"
        >
          Learn More
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
