import Image from 'next/image'
import Link from 'next/link'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { stats } from '@/lib/site-data'

export function WhyChooseSection() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-green">
      <div className="mx-auto max-w-7xl px-6 pt-20">
        <div className="grid items-stretch gap-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-6 bg-primary p-10 text-primary-foreground lg:p-12">
            <span className="font-script text-2xl text-gold">Why Choose Us</span>
            <h2 className="text-3xl font-extrabold leading-tight text-balance sm:text-4xl">
              We Only Provide Quality Scrap Services
            </h2>
            <p className="leading-relaxed text-primary-foreground/80">
              Transparent pricing, punctual crews, and full recycling
              documentation on every job. From a single appliance to a full
              industrial container, we handle it all.
            </p>
            <Button
              render={<Link href="/contact" />}
              className="w-fit rounded-none bg-gold font-semibold text-gold-foreground hover:bg-gold/90"
            >
              Book Now
              <RefreshCw data-icon="inline-end" />
            </Button>
          </div>
          <div className="relative min-h-[280px]">
            <Image
              src="/images/why-choose.png"
              alt="Scrap collection truck lifting a metal container"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-gold pl-5">
              <p className="text-5xl font-extrabold text-brand-green-foreground">
                {stat.value}
              </p>
              <p className="mt-2 font-semibold text-gold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
