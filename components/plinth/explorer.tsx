"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LayoutGrid, List, Search, SearchX, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CATEGORIES } from "@/lib/categories"
import { SOURCES } from "@/data/sources"
import { SEARCH_SUGGESTIONS, searchEntries } from "@/lib/search"
import type { EntryCard } from "@/lib/schema"
import { cn } from "@/lib/utils"
import { type Facet, FilterRail } from "./filter-rail"
import { ItemCard } from "./item-card"

const PAGE_SIZE = 24
const FACET_KEYS = ["kind", "category", "source", "license", "fw", "style"] as const
type FacetKey = (typeof FACET_KEYS)[number]
type Selected = Record<FacetKey, string[]>

const SORTS = [
  { id: "relevance", label: "Relevance" },
  { id: "popular", label: "Most popular (mock)" },
  { id: "newest", label: "Recently updated" },
  { id: "title", label: "Title A to Z" },
]

const FW_LABEL: Record<string, string> = { react: "React", next: "Next.js", vue: "Vue", svelte: "Svelte", html: "HTML" }
const KIND_LABEL: Record<string, string> = { component: "Components", section: "Sections" }
const LICENSE_LABEL: Record<string, string> = { open: "Open source", premium: "Premium" }

const matchers: Record<FacetKey, (e: EntryCard, v: string[]) => boolean> = {
  kind: (e, v) => v.includes(e.kind),
  category: (e, v) => v.includes(e.category),
  source: (e, v) => v.includes(e.sourceId),
  license: (e, v) => v.includes(e.redistributable ? "open" : "premium"),
  fw: (e, v) => e.frameworks.some((f) => v.includes(f)),
  style: (e, v) => v.includes(e.style),
}

function labelFor(key: FacetKey, value: string) {
  if (key === "kind") return KIND_LABEL[value] ?? value
  if (key === "source") return SOURCES.find((s) => s.id === value)?.name ?? value
  if (key === "license") return LICENSE_LABEL[value] ?? value
  if (key === "fw") return FW_LABEL[value] ?? value
  return value
}

function passes(e: EntryCard, sel: Selected, skip?: FacetKey) {
  return FACET_KEYS.every((k) => k === skip || sel[k].length === 0 || matchers[k](e, sel[k]))
}

export function Explorer({ entries }: { entries: EntryCard[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const q = params.get("q") ?? ""
  const view = params.get("view") === "list" ? "list" : "grid"
  const sort = params.get("sort") ?? (q ? "relevance" : "popular")
  const selected = useMemo<Selected>(() => {
    const out = {} as Selected
    FACET_KEYS.forEach((k) => (out[k] = (params.get(k) ?? "").split(",").filter(Boolean)))
    return out
  }, [params])

  const [draft, setDraft] = useState(q)
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [sheetOpen, setSheetOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const update = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString())
      Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
      const qs = next.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
      setLimit(PAGE_SIZE)
    },
    [params, pathname, router]
  )

  useEffect(() => setDraft(q), [q])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  function onSearch(v: string) {
    setDraft(v)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => update({ q: v.trim() || null, sort: null }), 180)
  }

  function toggle(key: string, value: string) {
    const k = key as FacetKey
    const cur = selected[k]
    const next = cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value]
    update({ [k]: next.join(",") || null })
  }

  const searched = useMemo(() => (q.trim() ? searchEntries(entries, q, 500) : entries), [entries, q])

  const results = useMemo(() => {
    const list = searched.filter((e) => passes(e, selected))
    if (sort === "relevance" && q.trim()) return list
    const copy = [...list]
    if (sort === "newest") copy.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    else if (sort === "title") copy.sort((a, b) => a.title.localeCompare(b.title))
    else copy.sort((a, b) => b.popularity - a.popularity)
    return copy
  }, [searched, selected, sort, q])

  const facets = useMemo<Facet[]>(() => {
    const count = (key: FacetKey, get: (e: EntryCard) => string[]) => {
      const m = new Map<string, number>()
      searched.filter((e) => passes(e, selected, key)).forEach((e) => get(e).forEach((v) => m.set(v, (m.get(v) ?? 0) + 1)))
      return m
    }
    const mk = (key: FacetKey, title: string, values: string[], get: (e: EntryCard) => string[]): Facet => {
      const m = count(key, get)
      return { key, title, options: values.map((v) => ({ value: v, label: labelFor(key, v), count: m.get(v) ?? 0 })) }
    }
    return [
      mk("kind", "Kind", ["component", "section"], (e) => [e.kind]),
      mk("category", "Category", CATEGORIES.map((c) => c.id), (e) => [e.category]),
      mk("source", "Source", SOURCES.map((s) => s.id), (e) => [e.sourceId]),
      mk("license", "License kind", ["open", "premium"], (e) => [e.redistributable ? "open" : "premium"]),
      mk("fw", "Framework", ["react", "next", "vue", "svelte", "html"], (e) => e.frameworks),
      mk("style", "Style", ["minimal", "glass", "animated", "bold", "brutalist", "playful"], (e) => [e.style]),
    ]
  }, [searched, selected])

  const chips = FACET_KEYS.flatMap((k) => selected[k].map((v) => ({ key: k, value: v, label: labelFor(k, v) })))
  const clearAll = () => update({ ...Object.fromEntries(FACET_KEYS.map((k) => [k, null])), q: null, sort: null })
  const shown = results.slice(0, limit)

  const rail = <FilterRail facets={facets} selected={selected} onToggle={toggle} idPrefix={sheetOpen ? "sheet" : "rail"} />

  return (
    <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[16rem_1fr]">
      <aside aria-label="Filters" className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pr-2">{rail}</div>
      </aside>

      <section aria-label="Results" className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-0 flex-1 basis-64">
            <Search className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" aria-hidden />
            <label htmlFor="explore-search" className="sr-only">
              Search components
            </label>
            <input
              id="explore-search"
              type="search"
              value={draft}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search by name, tag, category or source"
              className="h-11 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm focus-visible:border-primary"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort</span>
            <select value={sort} onChange={(e) => update({ sort: e.target.value })} className="h-11 rounded-lg border border-input bg-card px-2 text-sm">
              {SORTS.filter((s) => s.id !== "relevance" || q.trim()).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <div role="radiogroup" aria-label="Density" className="inline-flex rounded-lg border bg-card p-0.5">
            {([["grid", LayoutGrid, "Grid view"], ["list", List, "List view"]] as const).map(([id, Icon, label]) => (
              <button key={id} role="radio" aria-checked={view === id} aria-label={label} onClick={() => update({ view: id === "grid" ? null : id })} className={cn("grid size-10 place-items-center rounded-md", view === id ? "bg-secondary" : "text-muted-foreground hover:text-foreground")}>
                <Icon className="size-4" aria-hidden />
              </button>
            ))}
          </div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger render={<Button variant="outline" className="lg:hidden" />}>
              <SlidersHorizontal aria-hidden /> Filters{chips.length > 0 && <span className="tnum">({chips.length})</span>}
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>{results.length} results</SheetDescription>
              </SheetHeader>
              <div className="px-4 pb-6">{rail}</div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <p className="mr-1 text-sm text-muted-foreground tnum" aria-live="polite">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          {chips.map((c) => (
            <button key={c.key + c.value} onClick={() => toggle(c.key, c.value)} className="inline-flex h-9 items-center gap-1 rounded-md border bg-card pl-2.5 pr-1.5 text-sm hover:bg-accent" aria-label={`Remove filter ${c.label}`}>
              {c.label} <X className="size-3.5" aria-hidden />
            </button>
          ))}
          {(chips.length > 0 || q) && (
            <Button variant="link" size="sm" onClick={clearAll}>
              Clear all
            </Button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="mt-10 grid place-items-center rounded-xl border border-dashed px-6 py-16 text-center">
            <SearchX className="size-8 text-muted-foreground" aria-hidden />
            <h2 className="mt-3 text-lg font-semibold">Nothing matches that</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">Remove a filter or try one of these searches.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SEARCH_SUGGESTIONS.map((s) => (
                <Link key={s} href={`/explore?q=${encodeURIComponent(s)}`} className="inline-flex h-10 items-center rounded-lg border px-3 text-sm hover:bg-accent">
                  {s}
                </Link>
              ))}
            </div>
            <Button className="mt-5" variant="outline" onClick={clearAll}>
              Clear search and filters
            </Button>
          </div>
        ) : (
          <>
            <ul className={cn("mt-5 grid gap-x-5 gap-y-9", view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
              {shown.map((e, i) => (
                <li key={e.slug}>
                  <ItemCard entry={e} layout={view} index={i} />
                </li>
              ))}
            </ul>
            {results.length > shown.length && (
              <div className="mt-10 flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground tnum">
                  Showing {shown.length} of {results.length}
                </p>
                <Button variant="outline" onClick={() => setLimit(limit + PAGE_SIZE)}>
                  Show more
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
