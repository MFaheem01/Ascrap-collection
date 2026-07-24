import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { SectionHeading } from '@/components/site/section-heading'

const skills = [
  { label: 'Metal Recovery Rate', value: 94 },
  { label: 'On-Time Collections', value: 88 },
]

const points = [
  'Licensed, insured & fully compliant',
  'Instant fair-market scrap quotes',
  'Same-day and scheduled pickups',
  'Certified data destruction for e-waste',
]

export function AboutSection() {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-md">
            <Image
              src="/about-1.png"
              alt="Worker sorting scrap metal"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-md">
            <Image
              src="/about-2.png"
              alt="Crane lifting steel at a scrap yard"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Get to Know Us"
            title="We're Leaders in Scrap Collection & Recycling"
          />
          <p className="mt-5 leading-relaxed text-muted-foreground">
            For over a decade, Al Adnan Scrap Buyer has helped homes, contractors, and
            factories turn unwanted metal and materials into value. Our fleet and
            trained crews make responsible recycling simple and profitable.
          </p>

          <div className="mt-8 flex flex-col gap-5">
            {skills.map((skill) => (
              <div key={skill.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-foreground">{skill.label}</span>
                  <span className="text-primary">{skill.value}%</span>
                </div>
                <Progress value={skill.value} />
              </div>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm">
                <CheckCircle2 className="size-5 shrink-0 text-gold" />
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>

          <Button
            render={<Link href="/about" />}
            className="mt-8 rounded-none bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          >
            More About Us
          </Button>
        </div>
      </div>
    </section>
  )
}
