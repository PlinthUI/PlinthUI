"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MapPin, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GlassProfileCard() {
  const [liked, setLiked] = useState(false)
  const [followed, setFollowed] = useState(false)
  return (
    <div className="relative isolate mx-auto grid min-h-[26rem] w-full max-w-md place-items-center overflow-hidden rounded-2xl p-6">
      <Image src="https://picsum.photos/seed/misty-lake-sunrise-wide/900/900" alt="" fill unoptimized sizes="450px" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/30" />
      <article className="w-full max-w-xs rounded-2xl border border-white/25 bg-white/15 p-5 text-neutral-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="grid size-14 place-items-center rounded-full border border-white/30 bg-white/20 text-lg font-semibold">MK</span>
          <div>
            <h3 className="font-semibold leading-tight">Maren Koskinen</h3>
            <p className="flex items-center gap-1 text-sm text-neutral-100"><MapPin className="size-3.5" aria-hidden />Tromso, Norway</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-neutral-100">Landscape photographer chasing quiet light. Currently shooting the northern fjords.</p>
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[["Photos", "248"], ["Followers", "12.4k"], ["Prints", "36"]].map(([k, v]) => <div key={k} className="rounded-xl border border-white/20 bg-white/10 py-2"><dd className="font-semibold tnum">{v}</dd><dt className="text-xs text-neutral-200">{k}</dt></div>)}
        </dl>
        <div className="mt-4 flex gap-2">
          <button type="button" aria-pressed={followed} onClick={() => setFollowed(!followed)} className={cn("h-11 flex-1 rounded-xl text-sm font-medium transition-colors", followed ? "border border-white/40 bg-white/10" : "bg-neutral-50 text-neutral-950")}>{followed ? "Following" : "Follow"}</button>
          <button type="button" aria-label="Message" className="grid size-11 place-items-center rounded-xl border border-white/30 bg-white/10 hover:bg-white/20"><MessageCircle className="size-4" aria-hidden /></button>
          <button type="button" aria-pressed={liked} aria-label={liked ? "Unlike" : "Like"} onClick={() => setLiked(!liked)} className="grid size-11 place-items-center rounded-xl border border-white/30 bg-white/10 hover:bg-white/20"><Heart className={cn("size-4", liked && "fill-neutral-50")} aria-hidden /></button>
        </div>
      </article>
    </div>
  )
}
