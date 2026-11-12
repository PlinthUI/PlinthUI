"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

export default function GlassModal() {
  const ref = useRef<HTMLDialogElement>(null)
  const [msg, setMsg] = useState("No action yet")
  return (
    <div className="relative isolate mx-auto grid min-h-[22rem] w-full max-w-md place-items-center overflow-hidden rounded-2xl p-6 text-center text-neutral-50">
      <Image src="https://picsum.photos/seed/dusk-city-glass-towers/900/700" alt="" fill unoptimized sizes="450px" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/35" />
      <div>
        <button type="button" onClick={() => ref.current?.showModal()} className="h-12 rounded-xl border border-white/30 bg-white/15 px-6 font-medium backdrop-blur-md hover:bg-white/25">Open dialog</button>
        <p className="mt-3 text-sm text-neutral-100" aria-live="polite">{msg}</p>
      </div>
      <dialog ref={ref} aria-labelledby="gm-t" onClick={(e) => { if (e.target === ref.current) ref.current?.close() }} className="m-auto w-[min(92vw,24rem)] rounded-2xl border border-white/30 bg-neutral-900/50 p-0 text-left text-neutral-50 shadow-2xl backdrop-blur-2xl backdrop:bg-neutral-950/40 backdrop:backdrop-blur-sm">
        <form method="dialog" className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div><h2 id="gm-t" className="text-lg font-semibold">Share this view</h2><p className="mt-1 text-sm text-neutral-200">Anyone with the link can look, but not edit.</p></div>
            <button value="cancel" aria-label="Close" className="grid size-10 shrink-0 place-items-center rounded-lg hover:bg-white/15"><X className="size-4" aria-hidden /></button>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button value="cancel" onClick={() => setMsg("Cancelled")} className="h-11 rounded-xl border border-white/30 px-4 text-sm font-medium hover:bg-white/10">Cancel</button>
            <button value="ok" onClick={() => setMsg("Link copied (demo)")} className="h-11 rounded-xl bg-neutral-50 px-4 text-sm font-medium text-neutral-950">Copy link</button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
