"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

const ALL = ["Design", "Engineering", "Research", "Marketing", "Support", "Finance", "Legal"]

export default function ChipGroup() {
  const [on, setOn] = useState<string[]>(["Design", "Research"])
  const [removed, setRemoved] = useState<string[]>([])
  const shown = ALL.filter((c) => !removed.includes(c))
  const toggle = (c: string) => setOn((o) => (o.includes(c) ? o.filter((x) => x !== c) : [...o, c]))
  return (
    <div className="mx-auto w-full max-w-md">
      <p id="chips-l" className="mb-2 text-sm font-medium">Teams</p>
      <ul role="group" aria-labelledby="chips-l" className="flex flex-wrap gap-2">
        {shown.map((c) => (
          <li key={c} className="flex">
            <button type="button" aria-pressed={on.includes(c)} onClick={() => toggle(c)} className={cn("inline-flex h-10 items-center gap-1.5 rounded-l-full border px-3.5 text-sm transition-colors", on.includes(c) ? "border-primary bg-primary text-primary-foreground" : "hover:bg-accent")}>
              {on.includes(c) && <Check className="size-3.5" aria-hidden />}{c}
            </button>
            <button type="button" aria-label={`Remove ${c}`} onClick={() => { setRemoved([...removed, c]); setOn(on.filter((x) => x !== c)) }} className="grid h-10 w-9 place-items-center rounded-r-full border border-l-0 text-muted-foreground hover:bg-accent hover:text-foreground"><X className="size-3.5" aria-hidden /></button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">{on.length ? `Selected: ${on.join(", ")}` : "Nothing selected"}</p>
      {removed.length > 0 && <button type="button" onClick={() => setRemoved([])} className="mt-1 inline-flex min-h-10 items-center text-sm text-primary underline-offset-4 hover:underline">Restore {removed.length} removed</button>}
    </div>
  )
}
