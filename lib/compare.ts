"use client"

import { createLocalStore, useStore } from "./local-store"

export const MAX_COMPARE = 3

const store = createLocalStore<string[]>("plinth.compare.v1", [], (raw) => {
  if (!Array.isArray(raw)) return []
  return raw.filter((x): x is string => typeof x === "string").slice(0, MAX_COMPARE)
})

export const compareApi = {
  toggle(slug: string): "added" | "removed" | "full" {
    const cur = store.get()
    if (cur.includes(slug)) {
      store.set(cur.filter((x) => x !== slug))
      return "removed"
    }
    if (cur.length >= MAX_COMPARE) return "full"
    store.set([...cur, slug])
    return "added"
  },
  remove(slug: string) {
    store.set(store.get().filter((x) => x !== slug))
  },
  clear() {
    store.set([])
  },
  set(slugs: string[]) {
    store.set(slugs.slice(0, MAX_COMPARE))
  },
}

export function useCompareList() {
  return useStore(store)
}
