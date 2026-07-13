'use client'

// Free Pickup promotional section

import Link from 'next/link'
import {
  Truck,
  PhoneCall,
  ClipboardList,
  BadgeCheck,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/site/section-heading'

const steps = [
  {
    icon: PhoneCall,
    title: 'Call or Book Online',
    description: 'Reach out via phone or fill our quick online form — takes less than a minute.',
  },
  {
    icon: ClipboardList,
    title: 'Get a Free Quote',
    description: 'We assess your scrap and give you a fair, transparent price — no hidden fees.',
  },
  {
    icon: Truck,
    title: 'We Collect & Pay You',
    description: 'Our crew arrives on time, loads everything, and pays you on the spot.',
  },
  {
    icon: BadgeCheck,
    title: 'Certified Recycling',
    description: 'Every item is responsibly recycled with full compliance documentation.',
  },
]

export function FreePickupSection() {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading row */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="100% Free Service"
            title="Free Scrap Pickup — Right at Your Door"
          />
          <Button
            render={<Link href="/contact" />}
            className="rounded-none bg-gold font-semibold text-gold-foreground hover:bg-gold/90 shrink-0"
          >
            Schedule a Pickup
            <RefreshCw data-icon="inline-end" />
          </Button>
        </div>

        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
          We make scrap removal effortless. No transportation hassle, no waiting — just
          schedule a slot and our team does the rest. Homes, factories, and construction
          sites all welcome.
        </p>

        {/* Steps grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group relative flex flex-col gap-4 border border-border bg-background p-6 transition-shadow hover:shadow-md"
            >
              {/* Step number */}
              <span className="absolute right-5 top-5 text-5xl font-extrabold text-muted-foreground/10 leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="flex size-12 items-center justify-center rounded-none bg-primary text-primary-foreground">
                <step.icon className="size-6" />
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <span className="mt-auto h-0.5 w-10 bg-gold transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Highlight banner */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 bg-primary px-8 py-7 sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-green text-gold">
              <Truck className="size-7" />
            </span>
            <div>
              <span className="font-script text-xl text-gold">Zero Cost to You</span>
              <p className="text-lg font-bold text-primary-foreground">
                Pickup is completely free — we pay you for your scrap!
              </p>
            </div>
          </div>
          <Button
            size="lg"
            render={<Link href="/contact" />}
            className="h-12 shrink-0 rounded-none bg-gold px-7 text-base font-semibold text-gold-foreground hover:bg-gold/90"
          >
            Book Free Pickup
            <RefreshCw data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  )
}
