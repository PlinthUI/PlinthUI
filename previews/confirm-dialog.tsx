"use client"

import { useRef, useState } from "react"
import { AlertTriangle } from "lucide-react"

export default function ConfirmDialog() {
  const ref = useRef<HTMLDialogElement>(null)
  const [result, setResult] = useState("Nothing confirmed yet")
  return (
    <div className="mx-auto w-full max-w-sm text-center">
      <button type="button" onClick={() => ref.current?.showModal()} className="h-11 rounded-lg bg-destructive px-5 text-sm font-medium text-background">Delete project</button>
      <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">{result}</p>
      <dialog ref={ref} aria-labelledby="cd-t" onClick={(e) => { if (e.target === ref.current) ref.current?.close() }} className="m-auto w-[min(92vw,26rem)] rounded-xl border bg-popover p-0 text-left text-popover-foreground shadow-2xl backdrop:bg-foreground/40">
        <form method="dialog" className="p-5">
          <div className="flex gap-3"><AlertTriangle className="mt-0.5 size-5 text-destructive" aria-hidden /><div><h2 id="cd-t" className="font-semibold">Delete this project?</h2><p className="mt-1 text-sm text-muted-foreground">This removes the project and its 14 deploys. It cannot be undone.</p></div></div>
          <div className="mt-5 flex justify-end gap-2">
            <button value="cancel" onClick={() => setResult("Cancelled")} className="h-11 rounded-lg border px-4 text-sm font-medium hover:bg-accent">Cancel</button>
            <button value="confirm" onClick={() => setResult("Deleted (demo)")} className="h-11 rounded-lg bg-destructive px-4 text-sm font-medium text-background">Delete</button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
