"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"

const CODE = "npm install @example/ui"

export default function CopySnippet() {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle")
  useEffect(() => { if (state === "idle") return; const t = window.setTimeout(() => setState("idle"), 1800); return () => window.clearTimeout(t) }, [state])
  async function copy() {
    try { await navigator.clipboard.writeText(CODE); setState("done") } catch { setState("failed") }
  }
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="flex items-center justify-between gap-2 rounded-xl border bg-card pl-4 pr-1.5">
        <code className="overflow-x-auto py-3 font-mono text-[13px] whitespace-nowrap">{CODE}</code>
        <button type="button" onClick={copy} className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-medium hover:bg-accent">
          {state === "done" ? <Check className="size-4 text-success" aria-hidden /> : <Copy className="size-4" aria-hidden />}
          <span aria-live="polite">{state === "done" ? "Copied" : state === "failed" ? "Blocked" : "Copy"}</span>
        </button>
      </div>
      {state === "failed" && <p className="mt-2 text-sm text-muted-foreground">The browser blocked clipboard access. Select the text and copy it manually.</p>}
    </div>
  )
}
