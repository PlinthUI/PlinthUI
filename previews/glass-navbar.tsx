"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const LINKS = ["Home", "Work", "Journal", "Contact"]

export default function GlassNavbar() {
  const [active, setActive] = useState("Home")
  return (
    <div className="relative isolate mx-auto min-h-[24rem] w-full max-w-2xl overflow-hidden rounded-2xl">
      <Image src="https://picsum.photos/seed/canyon-light-rays/1200/800" alt="" fill unoptimized sizes="700px" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/30" />
      <nav aria-label="Main" className="mx-4 mt-4 flex items-center justify-between rounded-2xl border border-white/25 bg-white/15 px-3 py-2 text-neutral-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl">
        <span className="px-2 font-semibold">Canyon</span>
        <ul className="flex gap-1">
          {LINKS.map((l) => (
            <li key={l}><button type="button" aria-current={active === l ? "page" : undefined} onClick={() => setActive(l)} className={cn("h-10 rounded-xl px-3 text-sm transition-colors", active === l ? "bg-white/25 font-medium" : "hover:bg-white/15")}>{l}</button></li>
          ))}
        </ul>
      </nav>
      <div className="grid place-items-center px-6 py-20 text-center text-neutral-50">
        <h3 className="text-4xl font-semibold tracking-tight">{active}</h3>
        <p className="mt-2 max-w-xs text-neutral-100">The bar floats over the photo and blurs whatever passes behind it.</p>
      </div>
    </div>
  )
}
