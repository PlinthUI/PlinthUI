"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Loader2 } from "lucide-react"

export default function HeroWaitlist() {
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<"idle" | "pending" | "done">("idle")
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  const error = touched && !valid ? "Enter an address like name@studio.com" : ""

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    setStatus("pending")
    window.setTimeout(() => setStatus("done"), 800)
  }

  return (
    <section className="grid w-full max-w-4xl items-center gap-6 rounded-xl border bg-card p-5 @2xl:grid-cols-2 @2xl:p-8">
      <div>
        <h3 className="text-3xl font-semibold leading-tight tracking-tight">Release notes people actually open</h3>
        <p className="mt-3 text-muted-foreground">Docket turns merged pull requests into a changelog your customers can skim in a minute.</p>
        {status === "done" ? (
          <p className="mt-5 flex items-center gap-2 text-sm font-medium" role="status">
            <Check className="size-4 text-success" aria-hidden /> You are on the list. Nothing was sent in this demo.
          </p>
        ) : (
          <form onSubmit={submit} noValidate className="mt-5">
            <label htmlFor="waitlist-email" className="mb-2 block text-sm font-medium">
              Work email
            </label>
            <div className="flex flex-col gap-2 @md:flex-row">
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                aria-invalid={!!error}
                aria-describedby="waitlist-error"
                className="h-11 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 text-sm aria-[invalid=true]:border-destructive"
              />
              <button type="submit" disabled={status === "pending"} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
                {status === "pending" && <Loader2 className="size-4 animate-spin" aria-hidden />} Join waitlist
              </button>
            </div>
            <p id="waitlist-error" className="mt-2 min-h-5 text-sm text-destructive">
              {error}
            </p>
          </form>
        )}
      </div>
      <Image src="https://picsum.photos/seed/workshop-desk-morning-light/640/480" alt="A desk by a window with a laptop and notebooks" width={640} height={480} unoptimized className="aspect-[4/3] w-full rounded-lg object-cover" />
    </section>
  )
}
