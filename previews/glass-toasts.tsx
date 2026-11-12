"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Bell, X } from "lucide-react"

type T = { id: number; text: string }
const TEXTS = ["Build 214 passed", "New comment on the table PR", "Deploy finished in 48 s", "Invite accepted by Ilse"]

function Toast({ t, onClose }: { t: T; onClose: () => void }) {
  useEffect(() => { const x = window.setTimeout(onClose, 4500); return () => window.clearTimeout(x) }, [onClose])
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-white/25 bg-white/15 py-2 pl-3 pr-1.5 text-sm text-neutral-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-xl animate-in slide-in-from-right-4 fade-in">
      <Bell className="size-4 shrink-0" aria-hidden /><span className="flex-1">{t.text}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss" className="grid size-9 place-items-center rounded-lg hover:bg-white/15"><X className="size-4" aria-hidden /></button>
    </li>
  )
}

export default function GlassToasts() {
  const [list, setList] = useState<T[]>([])
  const [n, setN] = useState(0)
  const push = () => { setList((l) => [...l, { id: Date.now(), text: TEXTS[n % TEXTS.length] }].slice(-3)); setN(n + 1) }
  return (
    <div className="relative isolate mx-auto min-h-[22rem] w-full max-w-md overflow-hidden rounded-2xl p-5">
      <Image src="https://picsum.photos/seed/aurora-window-view/900/700" alt="" fill unoptimized sizes="450px" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/35" />
      <button type="button" onClick={push} className="h-11 rounded-xl border border-white/30 bg-white/15 px-4 text-sm font-medium text-neutral-50 backdrop-blur-md hover:bg-white/25">Show notification</button>
      <ul aria-live="polite" className="absolute inset-x-5 bottom-5 grid gap-2">{list.map((t) => <Toast key={t.id} t={t} onClose={() => setList((l) => l.filter((x) => x.id !== t.id))} />)}</ul>
    </div>
  )
}
