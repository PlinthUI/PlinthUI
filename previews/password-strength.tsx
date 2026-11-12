"use client"

import { useId, useState } from "react"
import { Check, Circle, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

const RULES = [
  ["At least 10 characters", (v: string) => v.length >= 10],
  ["Upper and lower case", (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v)],
  ["A number", (v: string) => /\d/.test(v)],
  ["A symbol", (v: string) => /[^A-Za-z0-9]/.test(v)],
] as const
const LABELS = ["Too short", "Weak", "Fair", "Good", "Strong"]

export default function PasswordStrength() {
  const [v, setV] = useState("")
  const [show, setShow] = useState(false)
  const id = useId()
  const score = RULES.filter(([, t]) => t(v)).length
  return (
    <div className="mx-auto w-full max-w-sm">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">New password</label>
      <div className="relative">
        <input id={id} type={show ? "text" : "password"} value={v} onChange={(e) => setV(e.target.value)} autoComplete="new-password" className="h-11 w-full rounded-lg border border-input bg-card pl-3 pr-11 text-sm focus-visible:border-primary" />
        <button type="button" onClick={() => setShow(!show)} aria-pressed={show} aria-label={show ? "Hide password" : "Show password"} className="absolute right-0.5 top-0.5 grid size-10 place-items-center rounded-md text-muted-foreground hover:bg-accent">{show ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}</button>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden>{RULES.map((_, i) => <span key={i} className={cn("h-1.5 rounded-full", i < score ? "bg-primary" : "bg-border")} />)}</div>
      <p className="mt-2 text-sm font-medium" aria-live="polite">Strength: {v ? LABELS[score] : "Not set"}</p>
      <ul className="mt-2 grid gap-1.5 text-sm">
        {RULES.map(([l, t]) => { const ok = t(v); return <li key={l} className={cn("flex items-center gap-2", !ok && "text-muted-foreground")}>{ok ? <Check className="size-4 text-success" aria-hidden /> : <Circle className="size-4" aria-hidden />}{l}<span className="sr-only">{ok ? " met" : " not met"}</span></li> })}
      </ul>
    </div>
  )
}
