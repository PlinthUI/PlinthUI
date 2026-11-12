"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Lock, PackageOpen } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import type { ComponentEntry } from "@/lib/schema"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/time"
import { SOURCE_BY_ID } from "@/data/sources"
import { CodeBlock } from "./code-block"
import { InstallPanel } from "./install-panel"
import { Plaque } from "./plaque"
import { PlinthStage, STAGE_WIDTHS, type StageWidth } from "./plinth-stage"
import { WidthSwitch } from "./width-switch"

export const TABS = [
  { id: "preview", label: "Preview" },
  { id: "code", label: "Code" },
  { id: "install", label: "Install" },
  { id: "props", label: "Props" },
  { id: "source", label: "Source and license" },
] as const
type TabId = (typeof TABS)[number]["id"]
export const TAB_EVENT = "plinth:tab"

const LICENSE_SUMMARY: Record<string, string> = {
  MIT: "Permits use, copying, modification and redistribution, including commercially, as long as the copyright and license notice stay with the code.",
  "Apache-2.0": "Permits use, modification and redistribution, including commercially, with attribution, a copy of the license and a statement of changes. Includes a patent grant.",
  ISC: "A short permissive license. Permits use, copying, modification and redistribution as long as the notice is kept.",
  Proprietary: "Not open source. Reuse is governed by the source's own terms. PlinthUI does not display or redistribute the code.",
}

export function Workbench({ entry, codeHtml, codeText }: { entry: ComponentEntry; codeHtml: string | null; codeText: string | null }) {
  const [tab, setTab] = useState<TabId>("preview")
  const [width, setWidth] = useState<StageWidth>("full")
  const [variant, setVariant] = useState(entry.variants?.[0]?.id)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const root = useRef<HTMLDivElement>(null)
  const source = SOURCE_BY_ID[entry.provenance.sourceId]
  const locked = !entry.provenance.redistributable

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1) as TabId
      if (TABS.some((t) => t.id === h)) setTab(h)
    }
    const onTab = (e: Event) => {
      const id = (e as CustomEvent<TabId>).detail
      setTab(id)
      window.history.replaceState(null, "", `#${id}`)
      root.current?.scrollIntoView({ block: "start" })
    }
    fromHash()
    window.addEventListener("hashchange", fromHash)
    window.addEventListener(TAB_EVENT, onTab)
    return () => {
      window.removeEventListener("hashchange", fromHash)
      window.removeEventListener(TAB_EVENT, onTab)
    }
  }, [])

  function select(id: TabId) {
    setTab(id)
    window.history.replaceState(null, "", `#${id}`)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const i = TABS.findIndex((t) => t.id === tab)
    let n = i
    if (e.key === "ArrowRight") n = (i + 1) % TABS.length
    else if (e.key === "ArrowLeft") n = (i - 1 + TABS.length) % TABS.length
    else if (e.key === "Home") n = 0
    else if (e.key === "End") n = TABS.length - 1
    else return
    e.preventDefault()
    select(TABS[n].id)
    refs.current[n]?.focus()
  }

  return (
    <div ref={root} id="workbench" className="scroll-mt-24">
      <div role="tablist" aria-label="Component sections" onKeyDown={onKeyDown} className="flex gap-1 overflow-x-auto border-b [scrollbar-width:none]">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => select(t.id)}
            className={cn("relative inline-flex h-11 shrink-0 items-center gap-1.5 px-3 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:bottom-[-1px] after:h-0.5 after:rounded-full", tab === t.id ? "text-foreground after:bg-primary" : "text-muted-foreground after:bg-transparent hover:text-foreground")}
          >
            {t.id === "code" && locked && <Lock className="size-3.5" aria-hidden />}
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id="panel-preview" aria-labelledby="tab-preview" hidden={tab !== "preview"} className="pt-5">
        {tab === "preview" && (
          <>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              {entry.variants && entry.variants.length > 0 ? (
                <div role="radiogroup" aria-label="Variants" className="flex flex-wrap gap-1.5">
                  {entry.variants.map((v) => (
                    <button key={v.id} role="radio" aria-checked={variant === v.id} onClick={() => setVariant(v.id)} className={cn("h-9 rounded-md border px-3 text-sm", variant === v.id ? "border-primary bg-primary/10 font-medium text-primary" : "hover:bg-accent")}>
                      {v.title}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">One variant.</p>
              )}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground tnum" aria-live="polite">
                  {STAGE_WIDTHS[width].px ? `${STAGE_WIDTHS[width].px} px` : "Full width"}
                </span>
                <WidthSwitch value={width} onChange={setWidth} />
              </div>
            </div>
            <PlinthStage previewId={entry.previewId} variant={variant} width={width} plaque={<Plaque entry={{ sourceId: entry.provenance.sourceId, license: entry.provenance.license, frameworks: entry.frameworks, redistributable: entry.provenance.redistributable }} />} />
          </>
        )}
      </div>

      <div role="tabpanel" id="panel-code" aria-labelledby="tab-code" hidden={tab !== "code"} className="pt-5">
        {locked ? (
          <div className="grid place-items-center gap-3 rounded-xl border border-dashed px-6 py-14 text-center">
            <Lock className="size-7 text-muted-foreground" aria-hidden />
            <h3 className="text-lg font-semibold">Code is not shown for premium entries</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              {source?.name} licenses this under {entry.provenance.license} terms that do not allow redistribution, so PlinthUI links to the original instead of copying it.
            </p>
            <a href={entry.provenance.sourceUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants())}>
              View at source <ExternalLink aria-hidden />
            </a>
          </div>
        ) : (
          <div className="grid gap-3">
            {entry.files.map((f) => (
              <CodeBlock key={f.path} path={f.path} html={codeHtml ?? ""} code={codeText ?? ""} />
            ))}
            <p className="text-sm text-muted-foreground">Imports use the default shadcn alias. Adjust the paths to your project.</p>
          </div>
        )}
      </div>

      <div role="tabpanel" id="panel-install" aria-labelledby="tab-install" hidden={tab !== "install"} className="pt-5">
        {locked ? (
          <div className="rounded-xl border border-dashed px-6 py-10 text-center">
            <PackageOpen className="mx-auto size-7 text-muted-foreground" aria-hidden />
            <h3 className="mt-3 text-lg font-semibold">Install from the source</h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">Premium entries have no install command here. Follow {source?.name}&apos;s own instructions after checking its license.</p>
          </div>
        ) : (
          <InstallPanel cli={entry.install.cli} manual={entry.install.manual} path={entry.files[0]?.path ?? ""} sourceName={source?.name ?? entry.provenance.sourceId} />
        )}
      </div>

      <div role="tabpanel" id="panel-props" aria-labelledby="tab-props" hidden={tab !== "props"} className="pt-5">
        {entry.props && entry.props.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border bg-card">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  {["Prop", "Type", "Default", "Description"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-2.5 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entry.props.map((p) => (
                  <tr key={p.name} className="border-t align-top">
                    <td className="px-4 py-3 font-mono text-[13px]">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-[13px] text-muted-foreground">{p.type}</td>
                    <td className="px-4 py-3 font-mono text-[13px] text-muted-foreground">{p.default ?? "none"}</td>
                    <td className="px-4 py-3">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed px-6 py-10 text-center">
            <h3 className="text-lg font-semibold">No props</h3>
            <p className="mt-1 text-sm text-muted-foreground">This entry is self contained. Edit the file after copying it to change content or behavior.</p>
          </div>
        )}
      </div>

      <div role="tabpanel" id="panel-source" aria-labelledby="tab-source" hidden={tab !== "source"} className="pt-5">
        <div className="grid gap-4 md:grid-cols-2">
          <dl className="grid gap-3 rounded-xl border bg-card p-5 text-sm">
            <div>
              <dt className="text-muted-foreground">Source</dt>
              <dd className="font-medium">{source?.name}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Author</dt>
              <dd className="font-mono">{entry.provenance.author}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Last updated</dt>
              <dd className="tnum">{formatDate(entry.updatedAt)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Original page</dt>
              <dd>
                <a href={entry.provenance.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-9 items-center gap-1 text-primary underline-offset-2 hover:underline">
                  View at source <ExternalLink className="size-3.5" aria-hidden />
                </a>
              </dd>
            </div>
          </dl>
          <div className="rounded-xl border bg-card p-5 text-sm">
            <p className="flex items-center gap-2 font-medium">
              {locked && <Lock className="size-4" aria-hidden />} {entry.provenance.license}
              <span className={cn("rounded-md px-2 py-0.5 text-xs", locked ? "bg-warning/15 text-warning" : "bg-success/15 text-success")}>{locked ? "Not redistributable" : "Redistributable"}</span>
            </p>
            <p className="mt-2 text-muted-foreground">{LICENSE_SUMMARY[entry.provenance.license]}</p>
            {entry.provenance.attribution && <p className="mt-3 border-t pt-3">{entry.provenance.attribution}</p>}
            <p className="mt-3 text-xs text-muted-foreground">This is a plain language summary, not legal advice. Demo data: confirm the real license with the project.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
