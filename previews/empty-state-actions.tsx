"use client"

import { useState } from "react"
import { FolderPlus, Inbox } from "lucide-react"

export default function EmptyStateActions() {
  const [items, setItems] = useState<string[]>([])
  return (
    <div className="mx-auto w-full max-w-sm">
      {items.length === 0 ? (
        <div className="grid place-items-center gap-2 rounded-xl border border-dashed p-8 text-center">
          <Inbox className="size-7 text-muted-foreground" aria-hidden />
          <h3 className="font-semibold">No projects yet</h3>
          <p className="text-sm text-muted-foreground">Create one to start tracking deploys, or import an existing repository.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => setItems(["First project"])} className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"><FolderPlus className="size-4" aria-hidden />New project</button>
            <button type="button" className="h-11 rounded-lg border px-4 text-sm font-medium hover:bg-accent">Import</button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-4">
          <ul className="grid gap-2">{items.map((i) => <li key={i} className="rounded-lg border px-3 py-2 text-sm">{i}</li>)}</ul>
          <button type="button" onClick={() => setItems([])} className="mt-3 h-10 rounded-lg border px-3 text-sm hover:bg-accent">Reset to empty</button>
        </div>
      )}
    </div>
  )
}
