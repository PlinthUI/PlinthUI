"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

const COLUMNS = ["To do", "In progress", "Done"] as const
type Card = { id: string; title: string; col: number }

const START: Card[] = [
  { id: "t1", title: "Audit focus rings", col: 0 },
  { id: "t2", title: "Write migration notes", col: 0 },
  { id: "t3", title: "Review table PR", col: 1 },
  { id: "t4", title: "Ship dark mode tokens", col: 2 },
]

export default function KanbanBoard() {
  const [cards, setCards] = useState(START)
  const [dragging, setDragging] = useState<string | null>(null)
  const [over, setOver] = useState<number | null>(null)
  const [note, setNote] = useState("")

  function move(id: string, col: number) {
    if (col < 0 || col >= COLUMNS.length) return
    const card = cards.find((c) => c.id === id)
    if (!card || card.col === col) return
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, col } : c)))
    setNote(`Moved ${card.title} to ${COLUMNS[col]}`)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="grid gap-3 @lg:grid-cols-3">
        {COLUMNS.map((name, col) => (
          <section
            key={name}
            aria-label={name}
            onDragOver={(e) => {
              e.preventDefault()
              setOver(col)
            }}
            onDragLeave={() => setOver(null)}
            onDrop={() => {
              if (dragging) move(dragging, col)
              setDragging(null)
              setOver(null)
            }}
            className={cn("rounded-lg border bg-secondary/50 p-2 transition-colors", over === col && "border-primary bg-primary/5")}
          >
            <h3 className="px-1.5 pb-2 text-sm font-medium">
              {name} <span className="text-muted-foreground tnum">{cards.filter((c) => c.col === col).length}</span>
            </h3>
            <ul className="grid min-h-16 gap-2">
              {cards
                .filter((c) => c.col === col)
                .map((c) => (
                  <li
                    key={c.id}
                    draggable
                    onDragStart={() => setDragging(c.id)}
                    onDragEnd={() => setDragging(null)}
                    className={cn("flex items-center gap-1 rounded-lg border bg-card p-1.5 text-sm shadow-sm", dragging === c.id && "opacity-50")}
                  >
                    <GripVertical className="size-4 shrink-0 cursor-grab text-muted-foreground" aria-hidden />
                    <span className="flex-1 px-1">{c.title}</span>
                    <button type="button" disabled={col === 0} onClick={() => move(c.id, col - 1)} aria-label={`Move ${c.title} left`} className="grid size-9 place-items-center rounded-md hover:bg-accent disabled:opacity-30">
                      <ArrowLeft className="size-4" aria-hidden />
                    </button>
                    <button type="button" disabled={col === COLUMNS.length - 1} onClick={() => move(c.id, col + 1)} aria-label={`Move ${c.title} right`} className="grid size-9 place-items-center rounded-md hover:bg-accent disabled:opacity-30">
                      <ArrowRight className="size-4" aria-hidden />
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-3 min-h-5 text-xs text-muted-foreground" aria-live="polite">
        {note || "Drag a card, or use the arrow buttons."}
      </p>
    </div>
  )
}
