"use client"

import BalanceCard from "@/components/cards/BalanceCard"

/** Thin preview wrapper. The component itself lives in components/cards/. */
export default function Preview() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <BalanceCard />
    </div>
  )
}
