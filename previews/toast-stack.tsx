"use client"

import { useEffect, useState } from "react"
import { Trash2, Undo2, X } from "lucide-react"

type F = { id: number; name: string }
type T = { id: number; file: F; index: number }

function Toast({ t, onUndo, onClose }: { t: T; onUndo: () => void; onClose: () => void }) {
  const [paused, setPaused] = useState(false)
  useEffect(() => { if (paused) return; const x = window.setTimeout(onClose, 5000); return () => window.clearTimeout(x) }, [paused, onClose])
  return (
    <li onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} className="flex items-center gap-2 rounded-lg border bg-popover p-2 pl-3 text-sm shadow-lg animate-in slide-in-from-bottom-2 fade-in">
      <span className="flex-1 truncate">Deleted {t.file.name}</span>
      <button type="button" onClick={onUndo} className="inline-flex h-9 items-center gap-1 rounded-md px-2.5 font-medium hover:bg-accent"><Undo2 className="size-3.5" aria-hidden />Undo</button>
      <button type="button" onClick={onClose} aria-label="Dismiss" className="grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-accent"><X className="size-4" aria-hidden /></button>
    </li>
  )
}

export default function ToastStack() {
  const [files, setFiles] = useState<F[]>([{ id: 1, name: "launch-notes.md" }, { id: 2, name: "pricing-v3.fig" }, { id: 3, name: "q4-roadmap.pdf" }])
  const [toasts, setToasts] = useState<T[]>([])
  const remove = (f: F) => { const index = files.findIndex((x) => x.id === f.id); setFiles((fs) => fs.filter((x) => x.id !== f.id)); setToasts((ts) => [...ts, { id: Date.now() + f.id, file: f, index }].slice(-3)) }
  const undo = (t: T) => { setFiles((fs) => { const n = [...fs]; n.splice(Math.min(t.index, n.length), 0, t.file); return n }); setToasts((ts) => ts.filter((x) => x.id !== t.id)) }
  return (
    <div className="mx-auto w-full max-w-sm">
      <ul className="divide-y rounded-lg border bg-card">
        {files.map((f) => <li key={f.id} className="flex min-h-12 items-center justify-between px-3 text-sm"><span className="font-mono text-[13px]">{f.name}</span><button type="button" onClick={() => remove(f)} aria-label={`Delete ${f.name}`} className="grid size-10 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-destructive"><Trash2 className="size-4" aria-hidden /></button></li>)}
        {files.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted-foreground">All files deleted. Undo from a toast.</li>}
      </ul>
      <ul aria-live="polite" className="mt-3 flex min-h-14 flex-col gap-2">{toasts.map((t) => <Toast key={t.id} t={t} onUndo={() => undo(t)} onClose={() => setToasts((ts) => ts.filter((x) => x.id !== t.id))} />)}</ul>
    </div>
  )
}
