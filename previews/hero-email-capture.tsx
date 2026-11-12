"use client"

import { useState } from "react"
import { Check, Loader2 } from "lucide-react"

export default function HeroEmailCapture() {
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)
  const [state, setState] = useState<"idle" | "pending" | "done">("idle")
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  return (
    <section className="mx-auto w-full max-w-2xl rounded-xl border bg-card px-6 py-12 text-center @xl:px-12">
      <h3 className="mx-auto max-w-md text-4xl font-semibold leading-tight tracking-tight">Release notes people actually open</h3>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">Turn merged pull requests into a changelog your customers can skim in a minute.</p>
      {state === "done" ? (
        <p role="status" className="mt-6 inline-flex items-center gap-2 text-sm font-medium"><Check className="size-4 text-success" aria-hidden />You are on the list. Nothing was sent.</p>
      ) : (
        <form noValidate onSubmit={(e) => { e.preventDefault(); setTouched(true); if (!valid) return; setState("pending"); window.setTimeout(() => setState("done"), 800) }} className="mx-auto mt-6 max-w-sm text-left">
          <label htmlFor="hec" className="mb-1.5 block text-sm font-medium">Work email</label>
          <div className="flex flex-col gap-2 @md:flex-row">
            <input id="hec" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched(true)} aria-invalid={touched && !valid} aria-describedby="hec-e" className="h-11 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 text-sm aria-[invalid=true]:border-destructive" />
            <button type="submit" disabled={state === "pending"} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-60">{state === "pending" && <Loader2 className="size-4 animate-spin" aria-hidden />}Join waitlist</button>
          </div>
          <p id="hec-e" className="mt-1 min-h-5 text-sm text-destructive">{touched && !valid ? "Enter an address like name@studio.com" : ""}</p>
        </form>
      )}
    </section>
  )
}
