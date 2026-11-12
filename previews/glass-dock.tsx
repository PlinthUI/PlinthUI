"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Camera, Folder, Mail, Music, Settings } from "lucide-react"

const APPS = [{ n: "Mail", i: Mail }, { n: "Calendar", i: Calendar }, { n: "Photos", i: Camera }, { n: "Music", i: Music }, { n: "Files", i: Folder }, { n: "Settings", i: Settings }]

export default function GlassDock() {
  const [hover, setHover] = useState<number | null>(null)
  const [open, setOpen] = useState("None")
  const scale = (i: number) => (hover === null ? 1 : Math.max(1, 1.5 - Math.abs(i - hover) * 0.22))
  return (
    <div className="relative isolate mx-auto grid min-h-[22rem] w-full max-w-lg content-end justify-items-center gap-3 overflow-hidden rounded-2xl p-5 text-neutral-50">
      <Image src="https://picsum.photos/seed/mountain-ridge-pastel-sky/1000/700" alt="" fill unoptimized sizes="560px" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/25" />
      <p className="rounded-lg bg-neutral-950/40 px-3 py-1 text-sm backdrop-blur-sm" aria-live="polite">Open app: {open}</p>
      <ul onPointerLeave={() => setHover(null)} className="flex items-end gap-2 rounded-3xl border border-white/30 bg-white/15 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl">
        {APPS.map(({ n, i: Icon }, k) => (
          <li key={n}>
            <button type="button" aria-label={n} onPointerEnter={() => setHover(k)} onFocus={() => setHover(k)} onBlur={() => setHover(null)} onClick={() => setOpen(n)} style={{ transform: `scale(${scale(k)})` }} className="grid size-12 origin-bottom place-items-center rounded-2xl border border-white/25 bg-white/20 transition-transform duration-150 ease-out hover:bg-white/30 motion-reduce:transition-none"><Icon className="size-5" aria-hidden /></button>
          </li>
        ))}
      </ul>
    </div>
  )
}
