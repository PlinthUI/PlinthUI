"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DrawerSheet() {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const close = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) close.current?.focus()
  }, [open])

  function dismiss() {
    setOpen(false)
    trigger.current?.focus()
  }

  return (
    <div
      className="relative mx-auto h-72 w-full max-w-md overflow-hidden rounded-lg border bg-card"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) dismiss()
      }}
    >
      <div className="p-5" inert={open}>
        <h3 className="text-sm font-medium">Order #4821</h3>
        <p className="mt-1 text-sm text-muted-foreground">3 items, packed and waiting for pickup.</p>
        <button ref={trigger} type="button" onClick={() => setOpen(true)} className="mt-4 h-11 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          View details
        </button>
      </div>
      <div aria-hidden={!open} onClick={dismiss} className={cn("absolute inset-0 bg-foreground/30 transition-opacity duration-200", open ? "opacity-100" : "pointer-events-none opacity-0")} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Order details"
        inert={!open}
        className={cn("absolute inset-y-0 right-0 w-3/4 max-w-xs border-l bg-popover p-5 shadow-xl transition-transform duration-250 ease-out motion-reduce:transition-none", open ? "translate-x-0" : "translate-x-full")}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Order details</h3>
          <button ref={close} type="button" onClick={dismiss} aria-label="Close drawer" className="grid size-10 place-items-center rounded-md hover:bg-accent">
            <X className="size-4" aria-hidden />
          </button>
        </div>
        <dl className="mt-4 grid gap-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Customer</dt>
            <dd>Marta Lindholm</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Items</dt>
            <dd>Linen shirt, canvas tote, ceramic mug</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Status</dt>
            <dd>Ready for pickup</dd>
          </div>
        </dl>
      </aside>
    </div>
  )
}
