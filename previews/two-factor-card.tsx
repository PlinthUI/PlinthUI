"use client"

import { useState } from "react"
import { ShieldCheck, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

const METHODS = [
  { id: "app", label: "Authenticator app", hint: "Open your app and enter the 6 digit code." },
  { id: "sms", label: "Text message", hint: "We sent a code to the number ending in 42." },
]

export default function TwoFactorCard() {
  const [method, setMethod] = useState("app")
  const [code, setCode] = useState("")
  const [state, setState] = useState<"idle" | "error" | "ok">("idle")
  const current = METHODS.find((m) => m.id === method)!

  function verify(e: React.FormEvent) {
    e.preventDefault()
    setState(/^\d{6}$/.test(code) ? "ok" : "error")
  }

  return (
    <form onSubmit={verify} noValidate className="mx-auto w-full max-w-sm rounded-xl border bg-card p-6">
      <div className="flex items-center gap-2">
        {state === "ok" ? <ShieldCheck className="size-5 text-success" aria-hidden /> : <Smartphone className="size-5 text-primary" aria-hidden />}
        <h3 className="font-semibold">{state === "ok" ? "You are verified" : "Two step verification"}</h3>
      </div>
      {state !== "ok" && (
        <>
          <div role="radiogroup" aria-label="Verification method" className="mt-4 grid grid-cols-2 gap-1 rounded-lg bg-secondary p-1">
            {METHODS.map((m) => (
              <button key={m.id} type="button" role="radio" aria-checked={method === m.id} onClick={() => { setMethod(m.id); setState("idle") }} className={cn("min-h-11 rounded-md px-2 text-xs font-medium", method === m.id ? "bg-card shadow-sm" : "text-muted-foreground")}>
                {m.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{current.hint}</p>
          <label htmlFor="tf-code" className="mb-1.5 mt-4 block text-sm font-medium">
            Verification code
          </label>
          <input id="tf-code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(e) => { setCode(e.target.value.replace(/\D/g, "")); setState("idle") }} aria-invalid={state === "error"} aria-describedby="tf-err" className="h-12 w-full rounded-lg border border-input bg-background text-center font-mono text-xl tracking-[0.5em] aria-[invalid=true]:border-destructive" />
          <p id="tf-err" className="mt-1 min-h-5 text-sm text-destructive" aria-live="polite">
            {state === "error" ? "Enter all 6 digits." : ""}
          </p>
          <button type="submit" className="mt-1 h-11 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Verify
          </button>
        </>
      )}
      {state === "ok" && <p className="mt-3 text-sm text-muted-foreground">Code accepted. This is a demo, no account was involved.</p>}
    </form>
  )
}
