"use client"

import { useState } from "react"
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const ROLES = ["AI engineer", "Full-system builder"]

export default function PortfolioHero() {
  const [open, setOpen] = useState(false)

  return (
    <section className="mx-auto grid w-full max-w-3xl gap-8 rounded-xl border bg-card p-6 @2xl:grid-cols-[1.4fr_1fr] @2xl:p-10">
      <div className="grid content-center gap-5">
        <h3 className="text-4xl font-semibold leading-[1.05] tracking-tight @xl:text-5xl">Shreekumar B</h3>
        <p className="flex flex-wrap gap-2" aria-label="Roles">
          {ROLES.map((r) => (
            <span key={r} className="rounded-md border px-2.5 py-1 text-sm">
              {r}
            </span>
          ))}
        </p>
        <p className="max-w-md text-muted-foreground">Models, backends and interfaces, shipped as one system. The LLM stays out of the decisions that have to be right.</p>
        <div className="flex flex-wrap gap-2">
          <a href="#resume" onClick={(e) => e.preventDefault()} className="group inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]">
            View résumé <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
          <a href="#contact" onClick={(e) => e.preventDefault()} className="group inline-flex h-11 items-center gap-2 rounded-lg border px-5 text-sm font-medium transition-transform hover:bg-accent active:scale-[0.98]">
            Email me <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>
      </div>
      <div className="self-end rounded-xl border bg-background p-4">
        <button type="button" aria-expanded={open} aria-controls="now-detail" onClick={() => setOpen(!open)} className="flex min-h-11 w-full items-center justify-between text-left">
          <span>
            <span className="block text-xs text-muted-foreground">Now building</span>
            <span className="block text-lg font-semibold">PRYSM</span>
          </span>
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
        <p id="now-detail" hidden={!open} className="mt-2 border-t pt-3 text-sm text-muted-foreground">
          A continuous compliance operating system with a deterministic core and an LLM language layer.
        </p>
      </div>
    </section>
  )
}
