"use client"

import { useEffect, useState } from "react"

export default function SkeletonLoader() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!loading) return
    const t = window.setTimeout(() => setLoading(false), 1800)
    return () => window.clearTimeout(t)
  }, [loading])
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="rounded-xl border bg-card p-4" aria-busy={loading}>
        {loading ? (
          <div className="flex gap-3" role="status" aria-label="Loading profile">
            <div className="size-12 animate-pulse rounded-full bg-muted" />
            <div className="flex-1 space-y-2"><div className="h-4 w-1/2 animate-pulse rounded bg-muted" /><div className="h-3 w-full animate-pulse rounded bg-muted" /><div className="h-3 w-4/5 animate-pulse rounded bg-muted" /></div>
          </div>
        ) : (
          <div className="flex gap-3">
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">NH</div>
            <div><h3 className="font-semibold">Noor Haddad</h3><p className="text-sm text-muted-foreground">Design engineer. Writes about tokens and keyboard paths.</p></div>
          </div>
        )}
      </div>
      <button type="button" onClick={() => setLoading(true)} disabled={loading} className="mt-3 h-10 rounded-lg border px-3 text-sm hover:bg-accent disabled:opacity-50">Reload</button>
    </div>
  )
}
