"use client"

import { useEffect, useRef, useState } from "react"
import { Copy, FolderInput, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

const ITEMS = [
  { label: "Rename", icon: Pencil },
  { label: "Duplicate", icon: Copy },
  { label: "Move to…", icon: FolderInput },
  { label: "Delete", icon: Trash2 },
]

export default function ContextMenu() {
  const area = useRef<HTMLDivElement>(null)
  const menu = useRef<HTMLUListElement>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [active, setActive] = useState(0)
  const [last, setLast] = useState("No action yet")

  function openAt(x: number, y: number) {
    const box = area.current?.getBoundingClientRect()
    if (!box) return
    setPos({ x: Math.min(x, box.width - 176), y: Math.min(y, box.height - 176) })
    setActive(0)
  }

  useEffect(() => {
    if (pos) menu.current?.focus()
  }, [pos])

  function close() {
    setPos(null)
    area.current?.focus()
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        ref={area}
        tabIndex={0}
        aria-label="File area. Press Shift and F10 or the context menu key for actions."
        onContextMenu={(e) => {
          e.preventDefault()
          const box = e.currentTarget.getBoundingClientRect()
          openAt(e.clientX - box.left, e.clientY - box.top)
        }}
        onKeyDown={(e) => {
          if ((e.shiftKey && e.key === "F10") || e.key === "ContextMenu") {
            e.preventDefault()
            openAt(24, 24)
          }
        }}
        className="relative grid h-52 place-items-center rounded-lg border border-dashed bg-card text-sm text-muted-foreground"
      >
        Right click anywhere in this area
        {pos && (
          <ul
            ref={menu}
            role="menu"
            tabIndex={-1}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setPos(null)
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setActive((a) => (a + 1) % ITEMS.length)
              } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setActive((a) => (a - 1 + ITEMS.length) % ITEMS.length)
              } else if (e.key === "Escape") {
                e.stopPropagation()
                close()
              } else if (e.key === "Enter") {
                setLast(ITEMS[active].label)
                close()
              }
            }}
            style={{ left: pos.x, top: pos.y }}
            className="absolute z-10 w-44 rounded-lg border bg-popover p-1 text-left text-popover-foreground shadow-lg outline-none animate-in fade-in zoom-in-95"
          >
            {ITEMS.map(({ label, icon: Icon }, i) => (
              <li
                key={label}
                role="menuitem"
                aria-current={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  setLast(label)
                  close()
                }}
                className={cn("flex h-10 cursor-pointer items-center gap-2 rounded-md px-2.5 text-sm", i === active && "bg-accent", label === "Delete" && "text-destructive")}
              >
                <Icon className="size-4" aria-hidden /> {label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground" aria-live="polite">
        Last action: {last}
      </p>
    </div>
  )
}
