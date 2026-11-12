"use client"

import { useState } from "react"
import { Pause, Play } from "lucide-react"

const WORDS = ["Models", "Backends", "Interfaces", "Systems"]
const PAGES = ["Home", "Work", "Signals", "About", "Stack", "Contact"]
const FOLLOW = ["GitHub", "LinkedIn", "Résumé", "Email"]

export default function MarqueeFooter() {
  const [paused, setPaused] = useState(false)
  const row = [...WORDS, ...WORDS, ...WORDS, ...WORDS]

  return (
    <footer className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border bg-card">
      <div className="grid gap-6 p-6 @lg:grid-cols-2 @xl:p-8">
        <nav aria-label="Pages">
          <h3 className="mb-2 text-sm text-muted-foreground">Pages</h3>
          <ul className="grid grid-cols-2 gap-x-4">
            {PAGES.map((p) => (
              <li key={p}>
                <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex min-h-10 items-center text-sm hover:text-primary">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Follow">
          <h3 className="mb-2 text-sm text-muted-foreground">Follow on</h3>
          <ul className="grid grid-cols-2 gap-x-4">
            {FOLLOW.map((p) => (
              <li key={p}>
                <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex min-h-10 items-center text-sm hover:text-primary">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="relative border-t py-4">
        <div className="flex w-max gap-10 whitespace-nowrap text-5xl font-semibold tracking-tight @xl:text-7xl" aria-hidden style={{ animation: "marquee 24s linear infinite", animationPlayState: paused ? "paused" : "running" }}>
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10">
              {row.map((w, i) => (
                <span key={`${k}-${i}`} className={i % 2 ? "text-muted-foreground" : ""}>
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="sr-only">{WORDS.join(", ")}</p>
        <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? "Play marquee" : "Pause marquee"} className="absolute right-3 top-3 grid size-10 place-items-center rounded-lg border bg-card/90 hover:bg-accent">
          {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
        </button>
      </div>
      <p className="border-t px-6 py-3 text-xs text-muted-foreground">© 2026 Shreekumar B. Coimbatore, India.</p>
    </footer>
  )
}
