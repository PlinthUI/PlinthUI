"use client"

import { useId, useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const TOPICS: Record<string, { q: string; a: string }[]> = {
  Billing: [
    { q: "Can I change plans mid cycle?", a: "Yes. Upgrades apply immediately and the difference is prorated on your next invoice." },
    { q: "Do you offer refunds?", a: "Annual plans can be refunded within 30 days of purchase." },
  ],
  Security: [
    { q: "Where is data stored?", a: "You choose a region when you create the workspace and it does not move afterwards." },
    { q: "Is single sign on supported?", a: "SAML single sign on is available on the Scale plan." },
  ],
  Product: [
    { q: "Is there an API?", a: "A REST API and webhooks are included on every plan." },
    { q: "Can I export my data?", a: "Everything exports as JSON or CSV from the workspace settings." },
  ],
}

export default function FaqSection() {
  const topics = Object.keys(TOPICS)
  const [topic, setTopic] = useState(topics[0])
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()

  return (
    <section className="mx-auto w-full max-w-2xl rounded-xl border bg-card p-5 @lg:p-8">
      <h3 className="text-2xl font-semibold tracking-tight">Questions, answered</h3>
      <div role="tablist" aria-label="FAQ topics" className="mt-4 flex gap-1 rounded-lg bg-secondary p-1">
        {topics.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={topic === t}
            onClick={() => {
              setTopic(t)
              setOpen(0)
            }}
            className={cn("h-10 flex-1 rounded-md text-sm font-medium", topic === t ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground")}
          >
            {t}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-3 divide-y">
        {TOPICS[topic].map((item, i) => (
          <div key={item.q}>
            <h4>
              <button type="button" aria-expanded={open === i} aria-controls={`${uid}-${i}`} onClick={() => setOpen(open === i ? null : i)} className="flex min-h-12 w-full items-center justify-between gap-3 text-left text-sm font-medium">
                {item.q}
                <Plus className={cn("size-4 shrink-0 transition-transform", open === i && "rotate-45")} aria-hidden />
              </button>
            </h4>
            <p id={`${uid}-${i}`} hidden={open !== i} className="pb-4 text-sm text-muted-foreground">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
