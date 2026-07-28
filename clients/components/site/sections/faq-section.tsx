'use client'

// FAQ section — Frequently Asked Questions

import { Phone } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Do you offer free pickup in Dubai?',
    answer:
      'Yes. Pickup, transportation, and weighing are free for all scrap types we collect, from single household items to industrial loads.',
  },
  {
    question: 'What types of scrap do you buy?',
    answer:
      'We buy copper, iron, steel, and aluminium scrap, along with refrigerators, chillers, washing machines, water coolers, batteries, and e-waste.',
  },
  {
    question: 'How is the price determined?',
    answer:
      'Prices are based on the current daily market rate for each metal type, verified through digital weighing at the time of collection.',
  },
  {
    question: 'Do you collect from homes and businesses?',
    answer:
      'Yes. We serve homeowners, contractors, and factories, with same-day pickup for smaller jobs and scheduled collection for industrial volumes.',
  },
  {
    question: 'Is data destroyed on e-waste devices?',
    answer:
      'Yes. Any device that may hold data, including computers, servers, and hard drives, is processed with certified data destruction.',
  },
]

export function FaqSection() {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <SectionHeading
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
        />

        {/* Accordion list */}
        <div className="mt-12 lg:mx-auto lg:max-w-3xl">
          <Accordion openMultiple={false}>
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={String(i)} className="border border-border bg-background mb-3 last:mb-0 rounded-none">
                <AccordionTrigger className="px-6 py-5 text-sm font-semibold text-foreground sm:text-base hover:no-underline hover:text-primary [&>svg]:text-gold gap-4 rounded-none">
                  <span className="flex size-7 shrink-0 items-center justify-center bg-primary text-xs font-extrabold text-primary-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-muted-foreground border-t border-border pt-4">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom contact note */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 bg-primary px-8 py-7 sm:flex-row lg:mx-auto lg:max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-green text-gold">
              <Phone className="size-6" />
            </span>
            <div>
              <span className="font-script text-lg text-gold">Still have questions?</span>
              <p className="text-sm font-bold text-primary-foreground">
                +971 56 700 9562 &nbsp;·&nbsp; 24/7 &nbsp;·&nbsp; Dubai & surrounding UAE areas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
