"use client"

import { cn } from "@/lib/utils"

export type FacetOption = { value: string; label: string; count: number }
export type Facet = { key: string; title: string; options: FacetOption[] }

export function FilterRail({ facets, selected, onToggle, idPrefix = "rail" }: { facets: Facet[]; selected: Record<string, string[]>; onToggle: (key: string, value: string) => void; idPrefix?: string }) {
  return (
    <div className="grid gap-6">
      {facets.map((f) => (
        <fieldset key={f.key}>
          <legend className="mb-2 font-mono text-[13px] text-muted-foreground">{f.title}</legend>
          <ul className="grid">
            {f.options.map((o) => {
              const checked = selected[f.key]?.includes(o.value) ?? false
              const id = `${idPrefix}-${f.key}-${o.value.replace(/\W+/g, "-")}`
              const disabled = o.count === 0 && !checked
              return (
                <li key={o.value}>
                  <label htmlFor={id} className={cn("flex min-h-10 cursor-pointer items-center gap-2.5 rounded-md px-2 text-sm hover:bg-accent", disabled && "cursor-not-allowed opacity-45 hover:bg-transparent")}>
                    <input id={id} type="checkbox" checked={checked} disabled={disabled} onChange={() => onToggle(f.key, o.value)} className="size-4 accent-[var(--primary)]" />
                    <span className="flex-1">{o.label}</span>
                    <span className="text-xs text-muted-foreground tnum">{o.count}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  )
}
