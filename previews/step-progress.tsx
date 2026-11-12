"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = ["Account", "Workspace", "Invite", "Review"]

export default function StepProgress() {
  const [step, setStep] = useState(1)
  return (
    <div className="mx-auto w-full max-w-md">
      <ol className="flex">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className="relative flex flex-1 flex-col items-center gap-1 text-center">
            {i > 0 && <span aria-hidden className={cn("absolute right-1/2 top-4 h-px w-full", i <= step ? "bg-primary" : "bg-border")} />}
            <span className={cn("relative z-10 grid size-8 place-items-center rounded-full border text-xs tnum", i < step && "border-primary bg-primary text-primary-foreground", i === step && "border-primary bg-card", i > step && "bg-card text-muted-foreground")}>
              {i < step ? <Check className="size-4" aria-hidden /> : i + 1}
            </span>
            <span className="text-xs">{s}<span className="sr-only">{i < step ? " done" : i === step ? " current" : " upcoming"}</span></span>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex justify-between">
        <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="h-11 rounded-lg border px-4 text-sm font-medium hover:bg-accent disabled:opacity-40">Back</button>
        <button type="button" onClick={() => setStep(step === STEPS.length ? 0 : step + 1)} className="h-11 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">{step === STEPS.length ? "Start over" : "Continue"}</button>
      </div>
    </div>
  )
}
