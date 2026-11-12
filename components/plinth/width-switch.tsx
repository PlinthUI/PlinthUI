"use client"

import { Monitor, Smartphone, Tablet } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StageWidth } from "./plinth-stage"

const OPTIONS = [
  { id: "mobile", label: "Mobile width, 375 pixels", icon: Smartphone },
  { id: "tablet", label: "Tablet width, 768 pixels", icon: Tablet },
  { id: "full", label: "Full width", icon: Monitor },
] as const

export function WidthSwitch({ value, onChange }: { value: StageWidth; onChange: (w: StageWidth) => void }) {
  function onKeyDown(e: React.KeyboardEvent) {
    const i = OPTIONS.findIndex((o) => o.id === value)
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0
    if (!d) return
    e.preventDefault()
    const next = OPTIONS[(i + d + OPTIONS.length) % OPTIONS.length].id
    onChange(next)
    ;(e.currentTarget.querySelector(`[data-id="${next}"]`) as HTMLElement | null)?.focus()
  }
  return (
    <div role="radiogroup" aria-label="Preview width" onKeyDown={onKeyDown} className="inline-flex rounded-lg border bg-card p-0.5">
      {OPTIONS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          role="radio"
          data-id={id}
          aria-checked={value === id}
          aria-label={label}
          tabIndex={value === id ? 0 : -1}
          onClick={() => onChange(id)}
          className={cn("grid size-11 place-items-center rounded-md transition-colors sm:size-10", value === id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground")}
        >
          <Icon className="size-4" aria-hidden />
        </button>
      ))}
    </div>
  )
}
