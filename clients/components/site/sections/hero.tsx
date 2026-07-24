import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-green">
      <Image
        src="/hero-scrap.png"
        alt="Worker loading scrap metal into a collection truck"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green/95 via-brand-green/70 to-brand-green/20" />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-24 lg:min-h-[640px]">
        <div className="max-w-2xl">
          <span className="font-script text-2xl text-gold">
            Fast & Reliable Scrap Collection
          </span>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-green-foreground text-balance sm:text-5xl lg:text-6xl">
            Turning Your Scrap Into{' '}
            <span className="text-gold underline decoration-4 underline-offset-8">
              Real Value
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-green-foreground/80">
            Metal, electronics, appliances, and industrial waste, we pick it up.
            Contact us for a quick and responsible collection in minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              render={<Link href="/contact" />}
              className="h-12 rounded-none bg-gold px-7 text-base font-semibold text-gold-foreground hover:bg-gold/90"
            >
              Contact Us
              <RefreshCw data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/services" />}
              className="h-12 rounded-none border-brand-green-foreground/30 bg-transparent px-7 text-base font-semibold text-brand-green-foreground hover:bg-brand-green-foreground/10 hover:text-brand-green-foreground"
            >
              Our Services
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
