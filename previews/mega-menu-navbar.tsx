"use client"

import { useRef, useState } from "react"
import { BookOpen, ChevronDown, Layers, ShieldCheck, Workflow } from "lucide-react"
import { cn } from "@/lib/utils"

const ITEMS = [
  { title: "Release notes", body: "Draft from merged pull requests", icon: BookOpen },
  { title: "Workflows", body: "Approvals before anything ships", icon: Workflow },
  { title: "Libraries", body: "Shared snippets and tokens", icon: Layers },
  { title: "Audit trail", body: "Who changed what, and when", icon: ShieldCheck },
]

export default function MegaMenuNavbar() {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  return (
    <div ref={root} className="relative mx-auto h-72 w-full max-w-3xl overflow-hidden rounded-xl border bg-card"
      onKeyDown={(e) => { if (e.key === "Escape" && open) { setOpen(false); trigger.current?.focus() } }}
      onBlur={(e) => { if (!root.current?.contains(e.relatedTarget as Node)) setOpen(false) }}>
      <nav aria-label="Main" className="flex h-14 items-center gap-1 border-b px-3">
        <span className="mr-3 font-semibold">Docket</span>
        <button ref={trigger} type="button" aria-expanded={open} aria-controls="mm-panel" onClick={() => setOpen(!open)} className={cn("inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm hover:bg-accent", open && "bg-accent")}>
          Products <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
        {["Docs", "Pricing"].map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()} className="hidden h-10 items-center rounded-md px-3 text-sm hover:bg-accent @md:inline-flex">{l}</a>)}
        <button type="button" className="ml-auto h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">Get started</button>
      </nav>
      <div id="mm-panel" hidden={!open} className="absolute inset-x-3 top-16 z-10 rounded-xl border bg-popover p-3 shadow-xl animate-in fade-in slide-in-from-top-1">
        <ul className="grid gap-1 @md:grid-cols-2">
          {ITEMS.map(({ title, body, icon: Icon }) => (
            <li key={title}><a href="#" onClick={(e) => e.preventDefault()} className="flex gap-3 rounded-lg p-3 hover:bg-accent"><Icon className="mt-0.5 size-5 shrink-0" aria-hidden /><span className="text-sm"><span className="block font-medium">{title}</span><span className="block text-muted-foreground">{body}</span></span></a></li>
          ))}
        </ul>
      </div>
      <div className="p-6 text-sm text-muted-foreground">Page content sits below the bar.</div>
    </div>
  )
}
