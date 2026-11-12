import "server-only"
import fs from "node:fs"
import path from "node:path"
import { ENTRIES } from "@/data/entries"
import { SOURCES } from "@/data/sources"
import type { ComponentEntry, EntryCard, Source } from "./schema"
import { toCard } from "./card"
import { searchEntries } from "./search"

/**
 * Single data seam. Phase 2 replaces the body of these functions with
 * Supabase queries. Pages and components only call this interface.
 */
export interface Repository {
  list(): Promise<EntryCard[]>
  get(slug: string): Promise<ComponentEntry | null>
  search(query: string): Promise<EntryCard[]>
  related(slug: string, limit?: number): Promise<EntryCard[]>
  sources(): Promise<Source[]>
}

/** Mock only: the demo reads the preview source from disk as its "code". */
function loadCode(e: ComponentEntry): ComponentEntry {
  if (!e.provenance.redistributable) {
    return { ...e, files: e.files.map(({ path: p, language }) => ({ path: p, language })) }
  }
  const file = path.join(process.cwd(), "previews", `${e.previewId}.tsx`)
  const code = fs.readFileSync(file, "utf8")
  return { ...e, files: e.files.map((f, i) => (i === 0 ? { ...f, code } : f)) }
}

export const repository: Repository = {
  async list() {
    return ENTRIES.map(toCard)
  },
  async get(slug) {
    const e = ENTRIES.find((x) => x.slug === slug)
    return e ? loadCode(e) : null
  },
  async search(query) {
    return searchEntries(ENTRIES.map(toCard), query)
  },
  async related(slug, limit = 4) {
    const base = ENTRIES.find((x) => x.slug === slug)
    if (!base) return []
    return ENTRIES.filter((x) => x.slug !== slug)
      .map((x) => {
        let s = 0
        if (x.category === base.category) s += 4
        s += x.tags.filter((t) => base.tags.includes(t)).length * 2
        if (x.style === base.style) s += 1
        return { x, s }
      })
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || b.x.popularity - a.x.popularity)
      .slice(0, limit)
      .map((r) => toCard(r.x))
  },
  async sources() {
    return SOURCES
  },
}
