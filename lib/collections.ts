"use client"

import { z } from "zod"
import { createLocalStore, useHydrated, useStore } from "./local-store"

const CollectionSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(60),
  items: z.array(z.string()),
  createdAt: z.string(),
})
const StateSchema = z.object({ collections: z.array(CollectionSchema) })
export type Collection = z.infer<typeof CollectionSchema>
type State = z.infer<typeof StateSchema>

export const SAVED_ID = "saved"
const initial: State = { collections: [{ id: SAVED_ID, name: "Saved", items: [], createdAt: "2026-11-12T00:00:00.000Z" }] }

function parse(raw: unknown): State {
  const s = StateSchema.parse(raw)
  return s.collections.some((c) => c.id === SAVED_ID) ? s : { collections: [...initial.collections, ...s.collections] }
}

const store = createLocalStore<State>("plinth.collections.v1", initial, parse)
const uid = () => Math.random().toString(36).slice(2, 9)

export const collectionsApi = {
  toggleSaved(slug: string) {
    const s = store.get()
    store.set({
      collections: s.collections.map((c) =>
        c.id === SAVED_ID ? { ...c, items: c.items.includes(slug) ? c.items.filter((x) => x !== slug) : [...c.items, slug] } : c
      ),
    })
  },
  toggleIn(collectionId: string, slug: string) {
    const s = store.get()
    store.set({
      collections: s.collections.map((c) =>
        c.id === collectionId ? { ...c, items: c.items.includes(slug) ? c.items.filter((x) => x !== slug) : [...c.items, slug] } : c
      ),
    })
  },
  create(name: string) {
    const clean = name.trim().slice(0, 60)
    if (!clean) return null
    const c: Collection = { id: uid(), name: clean, items: [], createdAt: new Date().toISOString() }
    store.set({ collections: [...store.get().collections, c] })
    return c
  },
  rename(id: string, name: string) {
    const clean = name.trim().slice(0, 60)
    if (!clean || id === SAVED_ID) return
    store.set({ collections: store.get().collections.map((c) => (c.id === id ? { ...c, name: clean } : c)) })
  },
  remove(id: string) {
    if (id === SAVED_ID) return null
    const s = store.get()
    const gone = s.collections.find((c) => c.id === id) ?? null
    store.set({ collections: s.collections.filter((c) => c.id !== id) })
    return gone
  },
  restore(c: Collection) {
    store.set({ collections: [...store.get().collections, c] })
  },
  removeItem(id: string, slug: string) {
    store.set({ collections: store.get().collections.map((c) => (c.id === id ? { ...c, items: c.items.filter((x) => x !== slug) } : c)) })
  },
  exportJson() {
    return JSON.stringify({ app: "plinthui", version: 1, collections: store.get().collections }, null, 2)
  },
  /** Merges by id. Returns the number of collections imported, or throws on bad input. */
  importJson(text: string) {
    const data = z.object({ collections: z.array(CollectionSchema) }).parse(JSON.parse(text))
    const current = store.get().collections
    const byId = new Map(current.map((c) => [c.id, c]))
    data.collections.forEach((c) => {
      const existing = byId.get(c.id)
      byId.set(c.id, existing ? { ...existing, items: Array.from(new Set([...existing.items, ...c.items])) } : c)
    })
    store.set({ collections: Array.from(byId.values()) })
    return data.collections.length
  },
  isBlocked: () => store.isBlocked(),
}

export function useCollections() {
  const state = useStore(store)
  const hydrated = useHydrated()
  return { collections: state.collections, hydrated }
}

export function useIsSaved(slug: string) {
  const { collections } = useCollections()
  return collections.find((c) => c.id === SAVED_ID)?.items.includes(slug) ?? false
}
