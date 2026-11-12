"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { PreviewProps } from "./types"

const TABS = [
  { id: "overview", label: "Overview", body: "Build size, last deploy and the owners of this project at a glance." },
  { id: "activity", label: "Activity", body: "Every deploy, rollback and config change, newest first." },
  { id: "settings", label: "Settings", body: "Domains, environment variables and the danger zone." },
]

export default function TabsUnderline({ variant = "underline" }: PreviewProps) {
  const [index, setIndex] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const pill = variant === "pill"

  function onKeyDown(e: React.KeyboardEvent) {
    let next = index
    if (e.key === "ArrowRight") next = (index + 1) % TABS.length
    else if (e.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = TABS.length - 1
    else return
    e.preventDefault()
    setIndex(next)
    refs.current[next]?.focus()
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div role="tablist" aria-label="Project sections" onKeyDown={onKeyDown} className={cn("relative grid grid-cols-3", pill ? "rounded-lg bg-secondary p-1" : "border-b")}>
        <span
          aria-hidden
          className={cn(
            "absolute transition-transform duration-250 ease-out motion-reduce:transition-none",
            pill ? "inset-y-1 left-1 rounded-md bg-card shadow-sm" : "bottom-[-1px] left-0 h-0.5 bg-primary"
          )}
          style={{
            width: pill ? "calc((100% - 0.5rem) / 3)" : "33.3333%",
            transform: `translateX(${index * 100}%)`,
          }}
        />
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={index === i}
            aria-controls={`panel-${t.id}`}
            tabIndex={index === i ? 0 : -1}
            onClick={() => setIndex(i)}
            className={cn(
              "relative z-10 h-11 text-sm font-medium transition-colors",
              index === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={index !== i} className="pt-4 text-sm text-muted-foreground">
          {t.body}
        </div>
      ))}
    </div>
  )
}
