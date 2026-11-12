"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PreviewProps } from "./types"

const PLANS = [
  { name: "Solo", monthly: 12, seats: "1 seat", blurb: "For one person shipping side projects.", features: ["5 projects", "Community support"] },
  { name: "Team", monthly: 39, seats: "Up to 10 seats", blurb: "For small teams that review together.", features: ["Unlimited projects", "Review workflows", "Priority support"], featured: true },
  { name: "Studio", monthly: 99, seats: "Up to 40 seats", blurb: "For agencies with several clients.", features: ["Client workspaces", "Audit log", "Single sign on"] },
]

export default function PricingCardsToggle({ variant = "monthly" }: PreviewProps) {
  const [annual, setAnnual] = useState(variant === "annual")

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-5 flex items-center justify-center gap-3 text-sm">
        <span className={cn(!annual ? "font-medium" : "text-muted-foreground")}>Monthly</span>
        <button
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label="Bill annually"
          onClick={() => setAnnual(!annual)}
          className="relative h-7 w-12 rounded-full border border-input bg-secondary transition-colors aria-checked:border-primary aria-checked:bg-primary"
        >
          <span className={cn("absolute left-0.5 top-0.5 size-5 rounded-full bg-card shadow transition-transform duration-200", annual && "translate-x-5")} />
        </button>
        <span className={cn(annual ? "font-medium" : "text-muted-foreground")}>
          Annual <span className="ml-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs text-primary">20% off</span>
        </span>
      </div>
      <ul className="grid gap-3 @lg:grid-cols-3">
        {PLANS.map((p) => {
          const price = annual ? Math.round(p.monthly * 0.8) : p.monthly
          return (
            <li key={p.name} className={cn("flex flex-col rounded-xl border bg-card p-5", p.featured && "border-primary ring-1 ring-primary")}>
              <h3 className="text-sm font-semibold">{p.name}</h3>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tnum">${price}</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground tnum">{annual ? `Billed $${price * 12} yearly` : "Billed monthly"}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.blurb}</p>
              <ul className="mt-4 grid flex-1 content-start gap-2 text-sm">
                <li className="font-medium">{p.seats}</li>
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-4 text-primary" aria-hidden /> {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={cn(
                  "mt-5 h-11 rounded-lg text-sm font-medium transition-[transform,background-color] active:scale-[0.98]",
                  p.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input hover:bg-accent"
                )}
              >
                Choose {p.name}
              </button>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-center text-xs text-muted-foreground">Prices are mock.</p>
    </div>
  )
}
