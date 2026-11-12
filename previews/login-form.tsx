"use client"

import { useId, useState } from "react"
import { Check, Eye, EyeOff, KeyRound, Loader2 } from "lucide-react"
import type { PreviewProps } from "./types"

export default function LoginForm({ variant = "password" }: PreviewProps) {
  const emailOnly = variant === "email-only"
  const uid = useId()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [touched, setTouched] = useState({ email: false, password: false })
  const [status, setStatus] = useState<"idle" | "pending" | "done">("idle")

  const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "Enter a valid email address." : ""
  const passwordError = !emailOnly && password.length < 8 ? "Use at least 8 characters." : ""

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (emailError || passwordError) return
    setStatus("pending")
    window.setTimeout(() => setStatus("done"), 900)
  }

  if (status === "done")
    return (
      <div role="status" className="mx-auto flex w-full max-w-sm flex-col items-center gap-2 rounded-xl border bg-card p-8 text-center">
        <Check className="size-8 text-success" aria-hidden />
        <p className="font-medium">Signed in as {email}</p>
        <p className="text-sm text-muted-foreground">Demo only, nothing was sent.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-2 h-11 rounded-lg border px-4 text-sm font-medium hover:bg-accent">
          Sign out
        </button>
      </div>
    )

  return (
    <form onSubmit={submit} noValidate className="mx-auto w-full max-w-sm rounded-xl border bg-card p-6">
      <h3 className="text-lg font-semibold">Sign in</h3>
      <p className="mt-1 text-sm text-muted-foreground">{emailOnly ? "We will email you a one time link." : "Welcome back. Enter your details."}</p>
      <div className="mt-5 grid gap-4">
        <div>
          <label htmlFor={`${uid}-e`} className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input id={`${uid}-e`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, email: true }))} aria-invalid={touched.email && !!emailError} aria-describedby={`${uid}-ee`} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm aria-[invalid=true]:border-destructive" />
          <p id={`${uid}-ee`} className="mt-1 min-h-5 text-sm text-destructive">
            {touched.email ? emailError : ""}
          </p>
        </div>
        {!emailOnly && (
          <div>
            <label htmlFor={`${uid}-p`} className="mb-1.5 block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input id={`${uid}-p`} type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, password: true }))} aria-invalid={touched.password && !!passwordError} aria-describedby={`${uid}-pe`} className="h-11 w-full rounded-lg border border-input bg-background pl-3 pr-11 text-sm aria-[invalid=true]:border-destructive" />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show} className="absolute right-0.5 top-0.5 grid size-10 place-items-center rounded-md text-muted-foreground hover:bg-accent">
                {show ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
              </button>
            </div>
            <p id={`${uid}-pe`} className="mt-1 min-h-5 text-sm text-destructive">
              {touched.password ? passwordError : ""}
            </p>
          </div>
        )}
      </div>
      {!emailOnly && (
        <label className="mt-1 flex min-h-11 items-center gap-2 text-sm">
          <input type="checkbox" className="size-4 accent-[var(--primary)]" /> Keep me signed in
        </label>
      )}
      <button type="submit" disabled={status === "pending"} className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-70">
        {status === "pending" && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {emailOnly ? "Email me a link" : "Sign in"}
      </button>
      <button type="button" className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-input text-sm font-medium hover:bg-accent">
        <KeyRound className="size-4" aria-hidden /> Use a passkey
      </button>
    </form>
  )
}
