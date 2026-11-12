"use client"

import { useId, useState } from "react"
import { Check, Eye, EyeOff, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const RULES = [
  { id: "len", label: "At least 10 characters", test: (v: string) => v.length >= 10 },
  { id: "case", label: "Upper and lower case", test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { id: "num", label: "A number", test: (v: string) => /\d/.test(v) },
  { id: "sym", label: "A symbol", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
]
const LABELS = ["Too short", "Weak", "Fair", "Good", "Strong"]

export default function PasswordStrength() {
  const [value, setValue] = useState("")
  const [show, setShow] = useState(false)
  const id = useId()
  const score = RULES.filter((r) => r.test(value)).length

  return (
    <div className="mx-auto w-full max-w-sm">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        New password
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-describedby={`${id}-rules`}
          autoComplete="new-password"
          className="h-11 w-full rounded-lg border border-input bg-card pl-3 pr-11 text-sm focus-visible:border-primary"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="absolute right-0.5 top-0.5 grid size-10 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          {show ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
        </button>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden>
        {RULES.map((_, i) => (
          <span key={i} className={cn("h-1.5 rounded-full transition-colors", i < score ? "bg-primary" : "bg-border")} />
        ))}
      </div>
      <p id={`${id}-rules`} className="sr-only">
        Password rules
      </p>
      <p className="mt-2 text-sm font-medium" aria-live="polite">
        Strength: {value ? LABELS[score] : "Not set"}
      </p>
      <ul className="mt-2 grid gap-1.5 text-sm">
        {RULES.map((r) => {
          const ok = r.test(value)
          return (
            <li key={r.id} className={cn("flex items-center gap-2", ok ? "text-foreground" : "text-muted-foreground")}>
              {ok ? <Check className="size-4 text-success" aria-hidden /> : <Circle className="size-4" aria-hidden />}
              {r.label}
              <span className="sr-only">{ok ? "met" : "not met"}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
