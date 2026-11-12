"use client"

import { useState } from "react"
import { Check, Download, Loader2, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

type Status = "idle" | "pending" | "done"

const base =
  "inline-flex h-11 min-w-36 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-[transform,background-color] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50"

export default function PressableButtons() {
  const [status, setStatus] = useState<Status>("idle")

  function run() {
    if (status !== "idle") return
    setStatus("pending")
    window.setTimeout(() => setStatus("done"), 1200)
    window.setTimeout(() => setStatus("idle"), 2800)
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={run}
        aria-busy={status === "pending"}
        className={cn(base, "bg-primary text-primary-foreground hover:bg-primary/90")}
      >
        {status === "idle" && (
          <>
            <Rocket className="size-4" aria-hidden /> Deploy
          </>
        )}
        {status === "pending" && (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden /> Deploying…
          </>
        )}
        {status === "done" && (
          <>
            <Check className="size-4" aria-hidden /> Deployed
          </>
        )}
      </button>
      <button type="button" className={cn(base, "border border-input bg-card hover:bg-accent")}>
        <Download className="size-4" aria-hidden /> Export
      </button>
      <button type="button" className={cn(base, "hover:bg-accent")}>
        Cancel
      </button>
      <button type="button" disabled className={cn(base, "bg-secondary text-secondary-foreground")}>
        Unavailable
      </button>
      <p className="sr-only" aria-live="polite">
        {status === "done" ? "Deployment finished" : ""}
      </p>
    </div>
  )
}
