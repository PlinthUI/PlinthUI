"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { MailCheck } from "lucide-react"

export default function MagicLinkFlow() {
  const [step, setStep] = useState<"email" | "sent">("email")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [wait, setWait] = useState(0)

  useEffect(() => {
    if (wait <= 0) return
    const t = window.setTimeout(() => setWait((w) => w - 1), 1000)
    return () => window.clearTimeout(t)
  }, [wait])

  function send(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError("Enter a valid email address.")
      return
    }
    setError("")
    setStep("sent")
    setWait(30)
  }

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl">
      <Image src="https://picsum.photos/seed/misty-pier-sunrise/800/520" alt="" width={800} height={520} unoptimized className="absolute inset-0 size-full object-cover" />
      <div className="relative grid place-items-center p-6">
        <div className="w-full max-w-xs rounded-xl border border-white/25 bg-card/80 p-5 backdrop-blur-lg">
          {step === "email" ? (
            <form onSubmit={send} noValidate>
              <h3 className="font-semibold">Sign in without a password</h3>
              <label htmlFor="ml-email" className="mb-1.5 mt-4 block text-sm font-medium">
                Email
              </label>
              <input id="ml-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} aria-describedby="ml-err" className="h-11 w-full rounded-lg border border-input bg-background/80 px-3 text-sm aria-[invalid=true]:border-destructive" />
              <p id="ml-err" className="mt-1 min-h-5 text-sm text-destructive">
                {error}
              </p>
              <button type="submit" className="mt-1 h-11 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Send link
              </button>
            </form>
          ) : (
            <div role="status" className="text-center">
              <MailCheck className="mx-auto size-8 text-primary" aria-hidden />
              <h3 className="mt-2 font-semibold">Check your inbox</h3>
              <p className="mt-1 break-all text-sm text-muted-foreground">A sign in link was prepared for {email}. Nothing was sent in this demo.</p>
              <button type="button" disabled={wait > 0} onClick={() => setWait(30)} className="mt-4 h-11 w-full rounded-lg border border-input text-sm font-medium hover:bg-accent disabled:opacity-50 tnum">
                {wait > 0 ? `Resend in ${wait}s` : "Resend link"}
              </button>
              <button type="button" onClick={() => setStep("email")} className="mt-1 inline-flex min-h-11 items-center text-sm text-primary underline-offset-4 hover:underline">
                Use a different email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
