"use client"

import { useEffect, useRef, useState } from "react"
import { Bell, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const START = [
  { id: 1, text: "Build 214 finished", time: "2 min ago" },
  { id: 2, text: "Ilse commented on the table PR", time: "1 h ago" },
  { id: 3, text: "Preview link was opened 12 times", time: "Yesterday" },
]

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(new Set([1, 2]))
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const on = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("pointerdown", on)
    return () => document.removeEventListener("pointerdown", on)
  }, [open])

  return (
    <div ref={root} className="relative mx-auto h-64 w-full max-w-sm" onKeyDown={(e) => { if (e.key === "Escape" && open) { setOpen(false); trigger.current?.focus() } }}>
      <button ref={trigger} type="button" aria-expanded={open} aria-controls="bell-panel" aria-label={`Notifications, ${unread.size} unread`} onClick={() => setOpen(!open)} className="relative ml-auto grid size-11 place-items-center rounded-lg border bg-card hover:bg-accent">
        <Bell className="size-4" aria-hidden />
        {unread.size > 0 && <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-xs text-primary-foreground tnum">{unread.size}</span>}
      </button>
      <div id="bell-panel" hidden={!open} className="absolute right-0 top-13 z-10 w-72 rounded-xl border bg-popover p-2 shadow-lg animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between px-2 py-1">
          <h3 className="text-sm font-semibold">Notifications</h3>
          <button type="button" onClick={() => setUnread(new Set())} className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-xs hover:bg-accent"><CheckCheck className="size-3.5" aria-hidden />Mark all read</button>
        </div>
        <ul>
          {START.map((n) => (
            <li key={n.id} className={cn("rounded-lg px-2 py-2 text-sm", unread.has(n.id) && "bg-accent")}>
              <p className={cn(unread.has(n.id) && "font-medium")}>{n.text}</p>
              <p className="text-xs text-muted-foreground">{n.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
