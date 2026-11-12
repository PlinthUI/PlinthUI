"use client"

import { useId, useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const ITEMS = [
  { q: "Can I copy the code into a private repo?", a: "Yes for open source entries, under the terms of the license shown on the plaque. Premium entries link out instead." },
  { q: "Why does each entry show a license?", a: "Reuse rights differ by project. Showing the license beside the preview lets you decide before you install." },
  { q: "Do previews run third party code?", a: "In this demo every preview is first party code written for the project. A later phase renders previews in sandboxed frames." },
]

export default function Accordion() {
  const [multiple, setMultiple] = useState(false)
  const [open, setOpen] = useState<number[]>([0])
  const uid = useId()

  function toggle(i: number) {
    setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : multiple ? [...o, i] : [i]))
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <label className="mb-3 flex min-h-9 cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={multiple}
          onChange={(e) => {
            setMultiple(e.target.checked)
            if (!e.target.checked) setOpen((o) => o.slice(0, 1))
          }}
          className="size-4 accent-[var(--primary)]"
        />
        Allow several open at once
      </label>
      <div className="divide-y rounded-lg border bg-card">
        {ITEMS.map((it, i) => {
          const isOpen = open.includes(i)
          return (
            <div key={it.q}>
              <h3>
                <button
                  type="button"
                  id={`${uid}-h-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-p-${i}`}
                  onClick={() => toggle(i)}
                  className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-medium hover:bg-accent/50"
                >
                  {it.q}
                  <Plus className={cn("size-4 shrink-0 text-muted-foreground transition-transform duration-200", isOpen && "rotate-45")} aria-hidden />
                </button>
              </h3>
              <div id={`${uid}-p-${i}`} role="region" aria-labelledby={`${uid}-h-${i}`} hidden={!isOpen} className="px-4 pb-4 text-sm text-muted-foreground animate-in fade-in">
                {it.a}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
