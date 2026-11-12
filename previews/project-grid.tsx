"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const PROJECTS = [
  { name: "UNBLUFF", tag: "AI / Education", group: "AI" },
  { name: "PRYSM", tag: "AI / Compliance", group: "AI" },
  { name: "DriftCheck", tag: "Dev Tools / CLI", group: "Dev tools" },
  { name: "Buy or Wait?", tag: "Agent / Claude Code", group: "AI" },
  { name: "Aquaverse", tag: "Aquaculture / FastAPI", group: "Web" },
  { name: "VAYU", tag: "ISRO BAH 2026", group: "AI" },
  { name: "PRYSM Engine", tag: "Agent Security", group: "Dev tools" },
  { name: "AUTO-BUILDER", tag: "Claude Code", group: "Dev tools" },
  { name: "GradeMIND v2", tag: "AI Grading", group: "AI" },
  { name: "BeforeCOOK", tag: "AI Agent", group: "AI" },
  { name: "Secure Support RAG", tag: "RAG", group: "AI" },
  { name: "Drishta", tag: "Education AI", group: "AI" },
  { name: "AHAL AI", tag: "Dev Tools", group: "Dev tools" },
  { name: "Vidiyal", tag: "Hackathon Winner", group: "Web" },
  { name: "Frame In Goa", tag: "Web App", group: "Web" },
  { name: "CrowderaNGO", tag: "Web Template", group: "Web" },
]
const GROUPS = ["All", "AI", "Dev tools", "Web"]

export default function ProjectGrid() {
  const [group, setGroup] = useState("All")
  const shown = PROJECTS.filter((p) => group === "All" || p.group === group)

  return (
    <section className="mx-auto w-full max-w-3xl rounded-xl border bg-card p-5 @xl:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">Selected work</h3>
          <p className="mt-1 text-sm text-muted-foreground">One through-line: a deterministic core with an LLM language layer.</p>
        </div>
        <div role="radiogroup" aria-label="Filter projects" className="flex gap-1 rounded-lg bg-secondary p-1">
          {GROUPS.map((g) => (
            <button key={g} role="radio" aria-checked={group === g} onClick={() => setGroup(g)} className={cn("h-9 rounded-md px-3 text-sm font-medium", group === g ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground")}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-2 @lg:grid-cols-4" aria-live="polite">
        {shown.map((p) => (
          <li key={p.name}>
            <a href="#" onClick={(e) => e.preventDefault()} className="group relative grid min-h-24 content-end overflow-hidden rounded-lg border bg-background p-3 focus-visible:outline-2">
              <Image src={`https://picsum.photos/seed/${p.name.replace(/\W+/g, "-").toLowerCase()}/320/200`} alt="" width={320} height={200} unoptimized className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <span className="relative rounded-md bg-background/85 px-1.5 py-1 backdrop-blur-sm">
                <span className="block text-sm font-medium leading-tight">{p.name}</span>
                <span className="block text-xs text-muted-foreground">{p.tag}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
