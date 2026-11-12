"use client"

import CartCard from "@/components/cards/CartCard"

/** Thin preview wrapper. The component itself lives in components/cards/. */
export default function Preview() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <CartCard image="https://picsum.photos/seed/trail-shoe-product/800/800" />
    </div>
  )
}
