"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "overview", label: "Overview", body: "Build size, last deploy and who owns this project." },
  { id: "activity", label: "Activity", body: "Every deploy and rollback, newest first." },
  { id: "settings", label: "Settings", body: "Domains, variables and the danger zone." },
]

export default function AnimatedTabs() {
  const [i, setI] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(e: React.KeyboardEvent) {
    const n = e.key === "ArrowRight" ? (i + 1) % TABS.length : e.key === "ArrowLeft" ? (i - 1 + TABS.length) % TABS.length : e.key === "Home" ? 0 : e.key === "End" ? TABS.length - 1 : -1
    if (n < 0) return
    e.preventDefault()
    setI(n)
    refs.current[n]?.focus()
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div role="tablist" aria-label="Project" onKeyDown={onKeyDown} className="relative grid grid-cols-3 rounded-lg bg-secondary p-1">
        <span aria-hidden className="absolute inset-y-1 left-1 rounded-md bg-card shadow-sm transition-transform duration-250 ease-out motion-reduce:transition-none" style={{ width: "calc((100% - 0.5rem) / 3)", transform: `translateX(${i * 100}%)` }} />
        {TABS.map((t, k) => (
          <button key={t.id} ref={(el) => { refs.current[k] = el }} role="tab" id={`at-${t.id}`} aria-selected={i === k} aria-controls={`ap-${t.id}`} tabIndex={i === k ? 0 : -1} onClick={() => setI(k)} className={cn("relative z-10 h-11 text-sm font-medium transition-colors", i === k ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t, k) => (
        <p key={t.id} role="tabpanel" id={`ap-${t.id}`} aria-labelledby={`at-${t.id}`} hidden={i !== k} className="px-1 pt-4 text-sm text-muted-foreground">
          {t.body}
        </p>
      ))}
    </div>
  )
}
