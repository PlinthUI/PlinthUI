"use client"

import { useMemo, useState } from "react"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PreviewProps } from "./types"

type Row = { name: string; stars: number; updated: string; license: string }
const ROWS: Row[] = [
  { name: "paperplane", stars: 4210, updated: "2026-10-28", license: "MIT" },
  { name: "quiet-router", stars: 1876, updated: "2026-09-14", license: "Apache-2.0" },
  { name: "ember-forms", stars: 9320, updated: "2026-11-03", license: "MIT" },
  { name: "lumen-charts", stars: 2754, updated: "2026-08-02", license: "ISC" },
  { name: "stackbar", stars: 640, updated: "2026-10-11", license: "MIT" },
  { name: "tessel", stars: 5188, updated: "2026-07-19", license: "Apache-2.0" },
  { name: "kiln-ui", stars: 3302, updated: "2026-11-09", license: "MIT" },
]
type Key = keyof Row

const COLS: { key: Key; label: string; numeric?: boolean }[] = [
  { key: "name", label: "Package" },
  { key: "stars", label: "Stars (mock)", numeric: true },
  { key: "updated", label: "Updated" },
  { key: "license", label: "License" },
]

export default function SortableTable({ variant = "default" }: PreviewProps) {
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({ key: "stars", dir: -1 })
  const [q, setQ] = useState("")
  const dense = variant === "dense"

  const rows = useMemo(() => {
    const filtered = ROWS.filter((r) => r.name.includes(q.trim().toLowerCase()))
    return [...filtered].sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir
    })
  }, [q, sort])

  function toggle(key: Key) {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }))
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <label className="sr-only" htmlFor="table-filter">
        Filter packages
      </label>
      <input
        id="table-filter"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter packages"
        className="mb-3 h-11 w-full rounded-lg border border-input bg-card px-3 text-sm focus-visible:border-primary sm:max-w-60"
      />
      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60">
            <tr>
              {COLS.map((c) => (
                <th key={c.key} scope="col" aria-sort={sort.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : "none"} className={cn("font-medium", c.numeric && "text-right")}>
                  <button type="button" onClick={() => toggle(c.key)} className={cn("inline-flex min-h-11 w-full items-center gap-1 px-3 hover:text-primary", c.numeric && "justify-end")}>
                    {c.label}
                    {sort.key === c.key ? sort.dir === 1 ? <ArrowUp className="size-3.5" aria-hidden /> : <ArrowDown className="size-3.5" aria-hidden /> : <ArrowUpDown className="size-3.5 opacity-40" aria-hidden />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t hover:bg-accent/40">
                <td className={cn("px-3 font-mono text-[13px]", dense ? "py-1.5" : "py-3")}>{r.name}</td>
                <td className={cn("px-3 text-right tnum", dense ? "py-1.5" : "py-3")}>{r.stars.toLocaleString("en-US")}</td>
                <td className={cn("px-3 tnum text-muted-foreground", dense ? "py-1.5" : "py-3")}>{r.updated}</td>
                <td className={cn("px-3", dense ? "py-1.5" : "py-3")}>{r.license}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-muted-foreground">
                  No package matches “{q}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
