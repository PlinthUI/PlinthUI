"use client"

import { useId, useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const ITEMS = [
  { q: "Can I use this in a private repo?", a: "Yes. Check the license shown on the entry and keep its notice with the code." },
  { q: "Does it work without JavaScript?", a: "Headers are real buttons. Content stays in the page so it can be found by search." },
  { q: "How do I open several at once?", a: "Turn on the option above the list. Otherwise opening one closes the others." },
]

export default function AccordionGroup() {
  const [multi, setMulti] = useState(false)
  const [open, setOpen] = useState<number[]>([0])
  const uid = useId()
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : multi ? [...o, i] : [i]))

  return (
    <div className="mx-auto w-full max-w-md">
      <label className="mb-3 flex min-h-9 cursor-pointer items-center gap-2 text-sm">
        <input type="checkbox" checked={multi} onChange={(e) => { setMulti(e.target.checked); if (!e.target.checked) setOpen((o) => o.slice(0, 1)) }} className="size-4 accent-[var(--primary)]" />
        Allow several open
      </label>
      <div className="divide-y rounded-lg border bg-card">
        {ITEMS.map((it, i) => (
          <div key={it.q}>
            <h3>
              <button type="button" aria-expanded={open.includes(i)} aria-controls={`${uid}-${i}`} onClick={() => toggle(i)} className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-medium hover:bg-accent/50">
                {it.q}
                <Plus className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open.includes(i) && "rotate-45")} aria-hidden />
              </button>
            </h3>
            <p id={`${uid}-${i}`} hidden={!open.includes(i)} className="px-4 pb-4 text-sm text-muted-foreground">{it.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
