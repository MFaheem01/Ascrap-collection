import Image from 'next/image'
import { SectionHeading } from '@/components/site/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { industries } from '@/lib/site-data'

export function IndustriesSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Industries We Serve" title="Solutions by Industry" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {industries.map((industry) => (
            <Card
              key={industry.title}
              className="group overflow-hidden rounded-none border-border p-0 pb-6 transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-col gap-3 px-6 text-center">
                <h3 className="text-xl font-bold text-foreground">
                  {industry.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
              </CardContent>
              <span className="mx-6 h-1 bg-primary" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
