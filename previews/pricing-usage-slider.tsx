"use client"

import { useId, useState } from "react"

const TIERS = [
  { upTo: 100_000, rate: 0, label: "Free allowance" },
  { upTo: 1_000_000, rate: 0.4, label: "Growth" },
  { upTo: Infinity, rate: 0.25, label: "Volume" },
]

function estimate(requests: number) {
  let total = 0
  let from = 0
  let tier = TIERS[0]
  for (const t of TIERS) {
    if (requests > from) {
      const chunk = Math.min(requests, t.upTo) - from
      total += (chunk / 1000) * t.rate
      tier = t
    }
    from = t.upTo
  }
  return { total, tier }
}

export default function PricingUsageSlider() {
  const [requests, setRequests] = useState(450_000)
  const id = useId()
  const { total, tier } = estimate(requests)

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border bg-card p-5">
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium">
        Monthly requests
        <output htmlFor={id} className="tnum text-base">
          {requests.toLocaleString("en-US")}
        </output>
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={2_000_000}
        step={50_000}
        value={requests}
        onChange={(e) => setRequests(Number(e.target.value))}
        className="my-4 h-11 w-full accent-[var(--primary)]"
      />
      <div className="flex items-end justify-between border-t pt-4">
        <div>
          <p className="text-sm text-muted-foreground">Estimated bill</p>
          <p className="text-3xl font-semibold tnum" aria-live="polite">
            ${total.toFixed(2)}
            <span className="text-sm font-normal text-muted-foreground"> / month</span>
          </p>
        </div>
        <p className="text-right text-sm text-muted-foreground">
          Tier: <span className="font-medium text-foreground">{tier.label}</span>
          <br />
          <span className="tnum">${tier.rate.toFixed(2)} per 1,000</span>
        </p>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Rates are mock and rounded.</p>
    </div>
  )
}
