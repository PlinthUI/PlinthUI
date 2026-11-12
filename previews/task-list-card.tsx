"use client"

import { useState } from "react"
import { Check, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Task = { id: number; title: string; done: boolean }

export default function TaskListCard() {
  const [tasks, setTasks] = useState<Task[]>([{ id: 1, title: "Review pull request", done: true }, { id: 2, title: "Write release notes", done: false }, { id: 3, title: "Update pricing page", done: false }])
  const [draft, setDraft] = useState("")
  const done = tasks.filter((t) => t.done).length
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0
  const add = (e: React.FormEvent) => { e.preventDefault(); const t = draft.trim(); if (!t) return; setTasks([...tasks, { id: Date.now(), title: t, done: false }]); setDraft("") }

  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border bg-card p-4">
      <div className="flex items-baseline justify-between"><h3 className="font-semibold">Today</h3><p className="text-sm text-muted-foreground tnum" aria-live="polite">{done} of {tasks.length} done</p></div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Completion"><div className="h-full origin-left bg-primary transition-transform duration-300 motion-reduce:transition-none" style={{ transform: `scaleX(${pct / 100})`, width: "100%" }} /></div>
      <ul className="mt-3 grid gap-1">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-1">
            <button type="button" role="checkbox" aria-checked={t.done} onClick={() => setTasks(tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))} className="flex min-h-11 flex-1 items-center gap-3 rounded-lg px-2 text-left text-sm hover:bg-accent">
              <span className={cn("grid size-5 place-items-center rounded-md border", t.done && "border-primary bg-primary text-primary-foreground")}>{t.done && <Check className="size-3.5" aria-hidden />}</span>
              <span className={cn(t.done && "text-muted-foreground line-through")}>{t.title}</span>
            </button>
            <button type="button" aria-label={`Delete ${t.title}`} onClick={() => setTasks(tasks.filter((x) => x.id !== t.id))} className="grid size-10 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-destructive"><Trash2 className="size-4" aria-hidden /></button>
          </li>
        ))}
      </ul>
      <form onSubmit={add} className="mt-3 flex gap-2">
        <label htmlFor="tl-new" className="sr-only">New task</label>
        <input id="tl-new" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a task" className="h-11 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 text-sm" />
        <button type="submit" aria-label="Add task" className="grid size-11 place-items-center rounded-lg bg-primary text-primary-foreground"><Plus className="size-4" aria-hidden /></button>
      </form>
    </div>
  )
}
