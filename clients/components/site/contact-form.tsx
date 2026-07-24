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
import { inquiryApi } from "@/lib/api"
import { toast } from "sonner"
import { Loader2, Send } from "lucide-react"

export function ContactForm() {
  const [service, setService] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const form = e.currentTarget
    const data = new FormData(form)

    const name = data.get("name") as string
    const phone = data.get("phone") as string
    const email = data.get("email") as string
    const message = data.get("message") as string

    try {
      await inquiryApi.submit({
        name,
        phone,
        email,
        service: service ?? undefined,
        message: message || undefined,
      })
      toast.success("Your pickup request has been received. We will get back to you as soon as possible.")
      form.reset()
      setService(null)
    } catch (error) {
      toast.error("Submission failed", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again or Call us directly.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-6 md:p-8">
      <h3 className="text-xl font-bold text-foreground">Contact Us for Pickup</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill out the form and we&apos;ll get back to you as soon as possible.
      </p>

      <FieldGroup className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input id="name" name="name" placeholder="Enter your full name" required disabled={isLoading} />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" required disabled={isLoading} />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="Enter your email address" required disabled={isLoading} />
        </Field>

        <Field>
          <FieldLabel>Service needed</FieldLabel>
          <Select value={service ?? undefined} onValueChange={setService} disabled={isLoading}>
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
            disabled={isLoading}
          />
          <FieldDescription>
            The more detail you provide, the faster we can quote your pickup.
          </FieldDescription>
        </Field>

        <Button
          type="submit"
          className="w-full rounded-none bg-gold font-semibold text-gold-foreground hover:bg-gold/90 disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send data-icon="inline-end" className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
