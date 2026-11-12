"use client"

import type { PreviewProps } from "./types"

export default function BorderBeam({ variant = "slow" }: PreviewProps) {
  const seconds = variant === "fast" ? 2.5 : 6

  return (
    <div className="mx-auto w-full max-w-xs">
      <div className="relative overflow-hidden rounded-xl p-px">
        <div aria-hidden className="absolute left-1/2 top-1/2 size-[220%] -translate-x-1/2 -translate-y-1/2">
          <div
            className="size-full"
            style={{
              background: "conic-gradient(from 0deg, transparent 0 72%, var(--primary) 100%)",
              animation: `beam-spin ${seconds}s linear infinite`,
            }}
          />
        </div>
        <div className="relative rounded-[11px] bg-card p-5">
          <h3 className="font-medium">Deploy is ready</h3>
          <p className="mt-1 text-sm text-muted-foreground">Build 214 passed every check and can go live.</p>
          <button type="button" className="mt-4 h-11 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Promote to production
          </button>
        </div>
      </div>
    </div>
  )
}
