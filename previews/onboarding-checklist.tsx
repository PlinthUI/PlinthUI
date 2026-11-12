"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const TASKS = ["Create your workspace", "Invite a teammate", "Connect a repository", "Publish your first note"]

export default function OnboardingChecklist() {
  const [done, setDone] = useState<Set<number>>(new Set([0]))
  const toggle = (i: number) => setDone((d) => { const n = new Set(d); if (n.has(i)) n.delete(i); else n.add(i); return n })
  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border bg-card p-5">
      <div className="flex items-baseline justify-between"><h3 className="font-semibold">Get started</h3><p className="text-sm text-muted-foreground tnum" aria-live="polite">{done.size} of {TASKS.length} done</p></div>
      <ul className="mt-3 grid gap-1">
        {TASKS.map((t, i) => (
          <li key={t}>
            <button type="button" role="checkbox" aria-checked={done.has(i)} onClick={() => toggle(i)} className="flex min-h-11 w-full items-center gap-3 rounded-lg px-2 text-left text-sm hover:bg-accent">
              <span className={cn("grid size-5 place-items-center rounded-full border", done.has(i) && "border-primary bg-primary text-primary-foreground")}>{done.has(i) && <Check className="size-3.5" aria-hidden />}</span>
              <span className={cn(done.has(i) && "text-muted-foreground line-through")}>{t}</span>
            </button>
          </li>
        ))}
      </ul>
      {done.size === TASKS.length && <p role="status" className="mt-3 rounded-lg bg-secondary px-3 py-2 text-sm">All set. You can hide this checklist.</p>}
    </div>
  )
}
