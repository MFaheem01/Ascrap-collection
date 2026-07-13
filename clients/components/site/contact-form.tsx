"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { services } from "@/lib/site-data"
import { toast } from "sonner"
import { RefreshCw } from "lucide-react"

export function ContactForm() {
  const [service, setService] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast.success("Request received", {
      description: "Our team will reach out to schedule your scrap pickup shortly.",
    })
    e.currentTarget.reset()
    setService(null)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-6 md:p-8">
      <h3 className="text-xl font-bold text-foreground">Request a Pickup</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill out the form and we&apos;ll get back to you within one business day.
      </p>

      <FieldGroup className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input id="name" name="name" placeholder="Jane Doe" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" required />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="jane@company.com" required />
        </Field>

        <Field>
          <FieldLabel>Service needed</FieldLabel>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {services.map((s) => (
                  <SelectItem key={s.slug} value={s.slug}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="message">Details</FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about the type and volume of scrap, and your preferred pickup date."
          />
          <FieldDescription>
            The more detail you provide, the faster we can quote your pickup.
          </FieldDescription>
        </Field>

        <Button
          type="submit"
          className="w-full rounded-none bg-gold font-semibold text-gold-foreground hover:bg-gold/90"
        >
          Submit Request
          <RefreshCw data-icon="inline-end" />
        </Button>
      </FieldGroup>
    </form>
  )
}
