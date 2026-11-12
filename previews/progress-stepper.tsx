"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  { title: "Account", body: "Confirm the email that owns this workspace." },
  { title: "Workspace", body: "Name it and pick the region where data is stored." },
  { title: "Invite", body: "Add teammates by email. You can skip this and do it later." },
  { title: "Review", body: "Check the summary, then create the workspace." },
]

export default function ProgressStepper() {
  const [step, setStep] = useState(1)
  const done = step === STEPS.length

  return (
    <div className="mx-auto w-full max-w-md">
      <ol className="flex items-start">
        {STEPS.map((s, i) => {
          const state = i < step ? "complete" : i === step ? "current" : "upcoming"
          return (
            <li key={s.title} aria-current={state === "current" ? "step" : undefined} className="relative flex flex-1 flex-col items-center gap-1.5 text-center">
              {i > 0 && <span aria-hidden className={cn("absolute right-1/2 top-4 h-px w-full", i <= step ? "bg-primary" : "bg-border")} />}
              <span
                className={cn(
                  "relative z-10 grid size-8 place-items-center rounded-full border text-xs font-medium tnum",
                  state === "complete" && "border-primary bg-primary text-primary-foreground",
                  state === "current" && "border-primary bg-card text-primary",
                  state === "upcoming" && "bg-card text-muted-foreground"
                )}
              >
                {state === "complete" ? <Check className="size-4" aria-hidden /> : i + 1}
              </span>
              <span className={cn("text-xs", state === "upcoming" ? "text-muted-foreground" : "font-medium")}>
                {s.title}
                <span className="sr-only"> {state}</span>
              </span>
            </li>
          )
        })}
      </ol>
      <div className="mt-5 min-h-16 rounded-lg border bg-card p-4 text-sm" aria-live="polite">
        {done ? "Workspace created. You can close this wizard." : STEPS[step].body}
      </div>
      <div className="mt-3 flex justify-between">
        <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="h-11 rounded-lg border border-input px-4 text-sm font-medium hover:bg-accent disabled:opacity-40">
          Back
        </button>
        <button type="button" onClick={() => setStep(done ? 0 : step + 1)} className="h-11 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          {done ? "Start over" : step === STEPS.length - 1 ? "Create" : "Continue"}
        </button>
      </div>
    </div>
  )
}
