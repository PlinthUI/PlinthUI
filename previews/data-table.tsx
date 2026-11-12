"use client"

import { useMemo, useState } from "react"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Row = { name: string; owner: string; updated: string; size: number }
const ROWS: Row[] = [
  { name: "quarterly-report.pdf", owner: "Ilse", updated: "2026-10-28", size: 2400 },
  { name: "brand-assets.zip", owner: "Tomasz", updated: "2026-09-14", size: 48200 },
  { name: "onboarding.md", owner: "Ruth", updated: "2026-11-03", size: 12 },
  { name: "pricing-v3.fig", owner: "Maren", updated: "2026-08-02", size: 9100 },
  { name: "roadmap.csv", owner: "Kenji", updated: "2026-10-11", size: 64 },
]
type Key = keyof Row
const COLS: { key: Key; label: string; num?: boolean }[] = [{ key: "name", label: "File" }, { key: "owner", label: "Owner" }, { key: "updated", label: "Updated" }, { key: "size", label: "Size (KB)", num: true }]

export default function DataTable() {
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({ key: "updated", dir: -1 })
  const [q, setQ] = useState("")
  const rows = useMemo(() => ROWS.filter((r) => r.name.includes(q.toLowerCase())).sort((a, b) => (a[sort.key] < b[sort.key] ? -1 : a[sort.key] > b[sort.key] ? 1 : 0) * sort.dir), [q, sort])
  return (
    <div className="mx-auto w-full max-w-xl">
      <label className="sr-only" htmlFor="dt-q">Filter files</label>
      <input id="dt-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter files" className="mb-3 h-11 w-full rounded-lg border border-input bg-card px-3 text-sm sm:max-w-60" />
      <div className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60"><tr>
            {COLS.map((c) => (
              <th key={c.key} scope="col" aria-sort={sort.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
                <button type="button" onClick={() => setSort((s) => (s.key === c.key ? { key: c.key, dir: s.dir === 1 ? -1 : 1 } : { key: c.key, dir: 1 }))} className={cn("inline-flex min-h-11 w-full items-center gap-1 px-3 font-medium hover:text-primary", c.num && "justify-end")}>
                  {c.label}{sort.key === c.key ? (sort.dir === 1 ? <ArrowUp className="size-3.5" aria-hidden /> : <ArrowDown className="size-3.5" aria-hidden />) : <ArrowUpDown className="size-3.5 opacity-40" aria-hidden />}
                </button>
              </th>
            ))}
          </tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t hover:bg-accent/40">
                <td className="px-3 py-3 font-mono text-[13px]">{r.name}</td><td className="px-3 py-3">{r.owner}</td><td className="px-3 py-3 tnum text-muted-foreground">{r.updated}</td><td className="px-3 py-3 text-right tnum">{r.size.toLocaleString("en-US")}</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={4} className="px-3 py-8 text-center text-muted-foreground">No file matches “{q}”.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
