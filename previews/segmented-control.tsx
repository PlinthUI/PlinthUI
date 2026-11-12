"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { PreviewProps } from "./types"

const OPTIONS = ["Day", "Week", "Month", "Year"]

export default function SegmentedControl({ variant = "default" }: PreviewProps) {
  const [index, setIndex] = useState(1)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const compact = variant === "compact"

  function onKeyDown(e: React.KeyboardEvent) {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (index + dir + OPTIONS.length) % OPTIONS.length
    setIndex(next)
    refs.current[next]?.focus()
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        role="radiogroup"
        aria-label="Report range"
        onKeyDown={onKeyDown}
        className={cn("relative grid grid-cols-4 rounded-lg bg-secondary p-1", compact ? "text-xs" : "text-sm")}
      >
        <span
          aria-hidden
          className="absolute inset-y-1 left-1 rounded-md bg-card shadow-sm transition-transform duration-200 ease-out motion-reduce:transition-none"
          style={{ width: "calc((100% - 0.5rem) / 4)", transform: `translateX(${index * 100}%)` }}
        />
        {OPTIONS.map((o, i) => (
          <button
            key={o}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={index === i}
            tabIndex={index === i ? 0 : -1}
            onClick={() => setIndex(i)}
            className={cn(
              "relative z-10 rounded-md font-medium transition-colors",
              compact ? "h-9" : "h-11",
              index === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {o}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground" aria-live="polite">
        Showing the last {OPTIONS[index].toLowerCase()}
      </p>
    </div>
  )
}
