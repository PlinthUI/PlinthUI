"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { AlertTriangle, Bookmark, Download, FolderPlus, Pencil, Trash2, Upload, X } from "lucide-react"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SAVED_ID, collectionsApi, useCollections, type Collection } from "@/lib/collections"
import { cn } from "@/lib/utils"
import { EntryPicker } from "./entry-picker"
import { useEntries } from "./entries-provider"
import { ItemCard } from "./item-card"

export function CollectionsManager() {
  const { collections, hydrated } = useCollections()
  const entries = useEntries()
  const [activeId, setActiveId] = useState(SAVED_ID)
  const [newName, setNewName] = useState("")
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState("")
  const [confirmDelete, setConfirmDelete] = useState<Collection | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const active = collections.find((c) => c.id === activeId) ?? collections[0]
  useEffect(() => {
    if (!collections.some((c) => c.id === activeId)) setActiveId(SAVED_ID)
  }, [collections, activeId])

  const items = useMemo(() => (active ? active.items.map((s) => entries.find((e) => e.slug === s)).filter((e): e is NonNullable<typeof e> => !!e) : []), [active, entries])

  if (!hydrated || !active) return <CollectionsSkeleton />

  function create(e: React.FormEvent) {
    e.preventDefault()
    const c = collectionsApi.create(newName)
    if (c) {
      setActiveId(c.id)
      setNewName("")
      toast.success(`Created ${c.name}`)
    }
  }

  function exportJson() {
    const blob = new Blob([collectionsApi.exportJson()], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "plinthui-collections.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  async function importFile(file: File) {
    try {
      const n = collectionsApi.importJson(await file.text())
      toast.success(`Imported ${n} ${n === 1 ? "collection" : "collections"}`)
    } catch {
      toast.error("That file is not a PlinthUI collections export. Nothing was changed.")
    }
  }

  return (
    <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[18rem_1fr]">
      <aside aria-label="Your collections" className="grid content-start gap-5">
        {collectionsApi.isBlocked() && (
          <p role="alert" className="flex gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden /> Browser storage is blocked. Collections last until you close this tab. Export to keep them.
          </p>
        )}
        <ul className="grid gap-1">
          {collections.map((c) => (
            <li key={c.id}>
              <button type="button" aria-current={c.id === active.id ? "true" : undefined} onClick={() => setActiveId(c.id)} className={cn("flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-left text-sm", c.id === active.id ? "bg-secondary font-medium" : "hover:bg-accent")}>
                <span className="inline-flex items-center gap-2 truncate">
                  {c.id === SAVED_ID && <Bookmark className="size-4" aria-hidden />}
                  {c.name}
                </span>
                <span className="text-xs text-muted-foreground tnum">{c.items.length}</span>
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={create} className="grid gap-2">
          <label htmlFor="new-collection" className="text-sm font-medium">
            New collection
          </label>
          <div className="flex gap-2">
            <input id="new-collection" value={newName} onChange={(e) => setNewName(e.target.value)} maxLength={60} placeholder="Name it" className="h-11 min-w-0 flex-1 rounded-lg border border-input bg-card px-3 text-sm focus-visible:border-primary" />
            <Button type="submit" disabled={!newName.trim()}>
              <FolderPlus aria-hidden /> Create
            </Button>
          </div>
        </form>
        <div className="grid gap-2 border-t pt-5">
          <p className="text-sm font-medium">Backup</p>
          <Button variant="outline" onClick={exportJson}>
            <Download aria-hidden /> Export JSON
          </Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            <Upload aria-hidden /> Import JSON
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            tabIndex={-1}
            aria-label="Import collections file"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) importFile(f)
              e.target.value = ""
            }}
          />
        </div>
      </aside>

      <section aria-label={active.name} className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {renaming ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                collectionsApi.rename(active.id, renameValue)
                setRenaming(false)
              }}
              className="flex items-center gap-2"
            >
              <label htmlFor="rename" className="sr-only">
                Collection name
              </label>
              <input id="rename" autoFocus value={renameValue} onChange={(e) => setRenameValue(e.target.value)} maxLength={60} className="h-11 rounded-lg border border-input bg-card px-3 text-lg font-semibold" />
              <Button type="submit" disabled={!renameValue.trim()}>
                Save name
              </Button>
              <Button type="button" variant="ghost" onClick={() => setRenaming(false)}>
                Cancel
              </Button>
            </form>
          ) : (
            <h2 className="text-2xl font-semibold tracking-tight">{active.name}</h2>
          )}
          {active.id !== SAVED_ID && !renaming && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setRenameValue(active.name)
                  setRenaming(true)
                }}
              >
                <Pencil aria-hidden /> Rename
              </Button>
              <Button variant="destructive" onClick={() => setConfirmDelete(active)}>
                <Trash2 aria-hidden /> Delete
              </Button>
            </div>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground tnum">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>

        {items.length === 0 ? (
          <div className="mt-6 grid gap-6 rounded-xl border border-dashed p-6 md:grid-cols-2">
            <div>
              <Bookmark className="size-7 text-muted-foreground" aria-hidden />
              <h3 className="mt-3 text-lg font-semibold">This collection is empty</h3>
              <p className="mt-1 text-sm text-muted-foreground">Add components here, or use the bookmark on any card in Explore.</p>
              <Link href="/explore" className={cn(buttonVariants({ variant: "outline" }), "mt-4")}>
                Browse components
              </Link>
            </div>
            <EntryPicker onPick={(s) => collectionsApi.toggleIn(active.id, s)} />
          </div>
        ) : (
          <>
            <ul className="mt-6 grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((e, i) => (
                <li key={e.slug} className="grid gap-2">
                  <ItemCard entry={e} index={i} />
                  <Button variant="outline" size="sm" className="justify-self-start" onClick={() => collectionsApi.removeItem(active.id, e.slug)}>
                    <X aria-hidden /> Remove from {active.name}
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-10 max-w-md border-t pt-6">
              <EntryPicker exclude={active.items} onPick={(s) => collectionsApi.toggleIn(active.id, s)} label={`Add to ${active.name}`} />
            </div>
          </>
        )}
      </section>

      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {confirmDelete?.name}?</DialogTitle>
            <DialogDescription>The collection is removed from this browser. You can undo right after.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Keep it
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!confirmDelete) return
                const gone = collectionsApi.remove(confirmDelete.id)
                setConfirmDelete(null)
                if (gone) toast(`Deleted ${gone.name}`, { action: { label: "Undo", onClick: () => collectionsApi.restore(gone) } })
              }}
            >
              Delete collection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function CollectionsSkeleton() {
  return (
    <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[18rem_1fr]" role="status" aria-label="Loading collections">
      <div className="space-y-2" aria-hidden>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-11 animate-pulse rounded-lg bg-muted/70" />
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-hidden>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="aspect-[16/10] animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
      <span className="sr-only">Loading collections</span>
    </div>
  )
}
