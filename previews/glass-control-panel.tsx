"use client"

import { useState } from "react"
import Image from "next/image"
import { Moon, Sun, Volume2, Wifi } from "lucide-react"
import { cn } from "@/lib/utils"

function Toggle({ on, set, label, icon: Icon }: { on: boolean; set: (v: boolean) => void; label: string; icon: typeof Wifi }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => set(!on)} className={cn("flex h-20 flex-col items-start justify-between rounded-2xl border p-3 text-left text-sm font-medium transition-colors", on ? "border-white/60 bg-white/30" : "border-white/25 bg-white/10 hover:bg-white/15")}>
      <Icon className="size-5" aria-hidden />{label}<span className="sr-only">{on ? "on" : "off"}</span>
    </button>
  )
}

export default function GlassControlPanel() {
  const [wifi, setWifi] = useState(true)
  const [dark, setDark] = useState(false)
  const [bright, setBright] = useState(70)
  const [vol, setVol] = useState(40)
  return (
    <div className="relative isolate mx-auto grid min-h-[26rem] w-full max-w-md place-items-center overflow-hidden rounded-2xl p-6">
      <Image src="https://picsum.photos/seed/sea-cliffs-soft-light/900/900" alt="" fill unoptimized sizes="450px" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/30" />
      <section aria-label="Quick settings" className="w-full max-w-xs rounded-3xl border border-white/25 bg-white/12 p-4 text-neutral-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl">
        <div className="grid grid-cols-2 gap-3"><Toggle on={wifi} set={setWifi} label="Wi-Fi" icon={Wifi} /><Toggle on={dark} set={setDark} label="Dark mode" icon={dark ? Moon : Sun} /></div>
        {[["Brightness", bright, setBright, Sun], ["Volume", vol, setVol, Volume2]].map(([l, v, s, Icon]) => {
          const I = Icon as typeof Sun
          return (
            <label key={l as string} className="mt-3 block rounded-2xl border border-white/25 bg-white/10 p-3 text-sm">
              <span className="flex items-center justify-between"><span className="flex items-center gap-2"><I className="size-4" aria-hidden />{l as string}</span><span className="tnum">{v as number}%</span></span>
              <input type="range" min={0} max={100} value={v as number} onChange={(e) => (s as (n: number) => void)(Number(e.target.value))} className="mt-2 h-8 w-full accent-white" />
            </label>
          )
        })}
      </section>
    </div>
  )
}
