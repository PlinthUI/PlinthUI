"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ExternalLink, GitCompareArrows, Link2, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { MAX_COMPARE, compareApi, useCompareList } from "@/lib/compare"
import type { EntryCard } from "@/lib/schema"
import { formatDate } from "@/lib/time"
import { SOURCE_BY_ID } from "@/data/sources"
import { copyText } from "./copy-button"
import { EntryPicker } from "./entry-picker"
import { Plaque } from "./plaque"
import { PlinthStage, STAGE_WIDTHS, type StageWidth } from "./plinth-stage"
import { WidthSwitch } from "./width-switch"

export type CompareItem = { entry: EntryCard; sizeClass: string }

const PRESETS = [
  { label: "Three pricing tables", items: ["pricing-cards-toggle", "pricing-usage-slider", "pricing-comparison-table"] },
  { label: "Three sign in flows", items: ["login-form", "magic-link-flow", "two-factor-card"] },
  { label: "Three ways to layer UI", items: ["modal-dialog", "drawer-sheet", "context-menu"] },
  { label: "Tabs, segments, accordion", items: ["tabs-underline", "segmented-control", "accordion"] },
]

export function ComparePresets() {
  return (
    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
      {PRESETS.map((p) => (
        <li key={p.label}>
          <Link href={`/compare?items=${p.items.join(",")}`} className="flex min-h-12 items-center justify-between rounded-lg border bg-card px-4 text-sm font-medium hover:bg-accent">
            {p.label}
            <GitCompareArrows className="size-4 text-muted-foreground" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function CompareView({ items }: { items: CompareItem[] }) {
  const router = useRouter()
  const tray = useCompareList()
  const [width, setWidth] = useState<StageWidth>("full")
  const slugs = items.map((i) => i.entry.slug)

  const go = (next: string[]) => {
    compareApi.set(next)
    router.replace(next.length ? `/compare?items=${next.join(",")}` : "/compare", { scroll: false })
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_24rem]">
        <section>
          <div className="grid place-items-center rounded-xl border border-dashed px-6 py-16 text-center">
            <GitCompareArrows className="size-8 text-muted-foreground" aria-hidden />
            <h2 className="mt-3 text-lg font-semibold">Nothing to compare yet</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">Pick up to three entries, or start from a set that already shares a job.</p>
            {tray.length > 0 && (
              <Button className="mt-4" onClick={() => go(tray)}>
                Use my {tray.length} saved for compare
              </Button>
            )}
          </div>
          <ComparePresets />
        </section>
        <EntryPicker onPick={(s) => go([s])} />
      </div>
    )
  }

  const rows: { label: string; render: (i: CompareItem) => React.ReactNode }[] = [
    { label: "Source", render: (i) => SOURCE_BY_ID[i.entry.sourceId]?.name },
    { label: "License", render: (i) => `${i.entry.license}${i.entry.redistributable ? "" : " (premium)"}` },
    { label: "Framework", render: (i) => i.entry.frameworks.join(", ") },
    { label: "Dependencies", render: (i) => i.entry.dependencies.join(", ") },
    { label: "Size class", render: (i) => i.sizeClass },
    { label: "Style", render: (i) => i.entry.style },
    { label: "Kind", render: (i) => (i.entry.kind === "section" ? "Section" : "Component") },
    { label: "Last updated", render: (i) => <span className="tnum">{formatDate(i.entry.updatedAt)}</span> },
  ]

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <WidthSwitch value={width} onChange={setWidth} />
          <span className="font-mono text-xs text-muted-foreground tnum" aria-live="polite">
            {STAGE_WIDTHS[width].px ? `${STAGE_WIDTHS[width].px} px` : "Full width"} for all
          </span>
        </div>
        <Button
          variant="outline"
          onClick={async () => {
            const ok = await copyText(window.location.href)
            if (ok) toast.success("Link copied")
            else toast.error("Copy was blocked. Copy the address bar instead.")
          }}
        >
          <Link2 aria-hidden /> Copy link
        </Button>
      </div>

      <ul className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:overflow-visible lg:px-0" aria-label="Items being compared">
        {items.map((i) => (
          <li key={i.entry.slug} className="w-[88%] shrink-0 snap-center sm:w-[70%] lg:w-auto">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold">
                  <Link href={`/c/${i.entry.slug}`} className="hover:text-primary">
                    {i.entry.title}
                  </Link>
                </h2>
                <p className="text-[13px] text-muted-foreground">{i.entry.category}</p>
              </div>
              <Button variant="ghost" size="icon" className="-mr-2 -mt-1" aria-label={`Remove ${i.entry.title} from comparison`} onClick={() => go(slugs.filter((s) => s !== i.entry.slug))}>
                <X aria-hidden />
              </Button>
            </div>
            <PlinthStage previewId={i.entry.previewId} width={width} plaque={<Plaque entry={i.entry} />} />
          </li>
        ))}
        {items.length < MAX_COMPARE && (
          <li className="w-[88%] shrink-0 snap-center sm:w-[70%] lg:w-auto">
            <div className="rounded-xl border border-dashed p-4">
              <EntryPicker exclude={slugs} onPick={(s) => go([...slugs, s])} label={`Add a ${items.length === 1 ? "second" : "third"} item`} />
            </div>
          </li>
        )}
      </ul>

      <h2 className="mb-3 mt-10 text-xl font-semibold">Attributes</h2>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <caption className="sr-only">Attribute comparison</caption>
          <thead className="bg-secondary/50">
            <tr>
              <td className="w-40 px-4 py-3" />
              {items.map((i) => (
                <th key={i.entry.slug} scope="col" className="px-4 py-3 font-medium">
                  {i.entry.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t align-top">
                <th scope="row" className="px-4 py-3 font-normal text-muted-foreground">
                  {r.label}
                </th>
                {items.map((i) => (
                  <td key={i.entry.slug} className="px-4 py-3">
                    {r.render(i)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t">
              <th scope="row" className="px-4 py-3 font-normal text-muted-foreground">
                Original
              </th>
              {items.map((i) => (
                <td key={i.entry.slug} className="px-4 py-3">
                  <a href={SOURCE_BY_ID[i.entry.sourceId]?.url} target="_blank" rel="noreferrer" className="inline-flex min-h-9 items-center gap-1 text-primary underline-offset-2 hover:underline">
                    View at source <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
