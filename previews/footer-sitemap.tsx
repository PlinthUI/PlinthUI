"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const GROUPS = [
  { title: "Product", links: ["Overview", "Changelog", "Roadmap", "Status"] },
  { title: "Developers", links: ["Documentation", "API reference", "Webhooks", "Community"] },
  { title: "Company", links: ["About", "Careers", "Press kit", "Contact"] },
  { title: "Legal", links: ["Terms", "Privacy", "Security", "Licenses"] },
]

export default function FooterSitemap() {
  const [open, setOpen] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  return (
    <footer className="mx-auto w-full max-w-3xl rounded-xl border bg-card p-5 @lg:p-8">
      <div className="grid gap-6 @lg:grid-cols-[1.2fr_2fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) setDone(true)
          }}
        >
          <label htmlFor="foot-email" className="text-sm font-medium">
            Monthly product notes
          </label>
          {done ? (
            <p className="mt-2 flex items-center gap-2 text-sm" role="status">
              <Check className="size-4 text-success" aria-hidden /> Subscribed in this demo.
            </p>
          ) : (
            <div className="mt-2 flex gap-2">
              <input id="foot-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@studio.com" className="h-11 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 text-sm" />
              <button type="submit" className="h-11 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Subscribe
              </button>
            </div>
          )}
        </form>
        <nav aria-label="Footer" className="grid gap-x-4 @lg:grid-cols-4">
          {GROUPS.map((g) => (
            <div key={g.title} className="border-b @lg:border-0">
              <h4>
                <button type="button" aria-expanded={open === g.title} onClick={() => setOpen(open === g.title ? null : g.title)} className="flex min-h-11 w-full items-center justify-between text-sm font-medium @lg:pointer-events-none @lg:min-h-9">
                  {g.title}
                  <ChevronDown className={cn("size-4 transition-transform @lg:hidden", open === g.title && "rotate-180")} aria-hidden />
                </button>
              </h4>
              <ul className={cn("pb-3 @lg:block", open === g.title ? "block" : "hidden")}>
                {g.links.map((l) => (
                  <li key={l}>
                    <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex min-h-9 items-center text-sm text-muted-foreground hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <p className="mt-6 border-t pt-4 text-xs text-muted-foreground">Docket Labs. Sample footer for a demo product.</p>
    </footer>
  )
}
