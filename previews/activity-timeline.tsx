"use client"

import { useState } from "react"
import { ChevronDown, GitCommitHorizontal, RotateCcw, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const EVENTS = [
  { day: "Today", id: "a", icon: Rocket, title: "Deployed to production", time: "09:42", detail: "Build 214 finished in 48 seconds. 3 routes changed, no new warnings." },
  { day: "Today", id: "b", icon: GitCommitHorizontal, title: "Merged: tighten table spacing", time: "08:15", detail: "Reviewed by Ilse Varga. Touches 2 files, +18 and -6 lines." },
  { day: "Yesterday", id: "c", icon: RotateCcw, title: "Rolled back build 211", time: "17:30", detail: "Rolled back after a failing health check on the image route." },
  { day: "Yesterday", id: "d", icon: Rocket, title: "Deployed to preview", time: "11:04", detail: "Preview URL shared with the design review channel." },
]

export default function ActivityTimeline() {
  const [open, setOpen] = useState<string | null>("a")
  const days = Array.from(new Set(EVENTS.map((e) => e.day)))

  return (
    <div className="mx-auto w-full max-w-sm">
      {days.map((day) => (
        <section key={day} className="mb-4 last:mb-0">
          <h3 className="mb-2 text-xs font-medium text-muted-foreground">{day}</h3>
          <ol className="relative ml-4 border-l pl-6">
            {EVENTS.filter((e) => e.day === day).map(({ id, icon: Icon, title, time, detail }) => (
              <li key={id} className="relative pb-3 last:pb-0">
                <span className="absolute -left-[37px] top-1 grid size-6 place-items-center rounded-full border bg-card">
                  <Icon className="size-3.5 text-muted-foreground" aria-hidden />
                </span>
                <button
                  type="button"
                  aria-expanded={open === id}
                  onClick={() => setOpen(open === id ? null : id)}
                  className="flex min-h-9 w-full items-center justify-between gap-2 rounded-md text-left text-sm font-medium hover:text-primary"
                >
                  <span>{title}</span>
                  <span className="flex items-center gap-1 font-normal text-muted-foreground tnum">
                    {time}
                    <ChevronDown className={cn("size-4 transition-transform", open === id && "rotate-180")} aria-hidden />
                  </span>
                </button>
                {open === id && <p className="mt-1 text-sm text-muted-foreground animate-in fade-in">{detail}</p>}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}
