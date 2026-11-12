"use client"

import { useRef, useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PreviewProps } from "./types"

export default function ModalDialog({ variant = "default" }: PreviewProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const [result, setResult] = useState("Nothing confirmed yet")
  const destructive = variant === "destructive"

  return (
    <div className="mx-auto w-full max-w-sm text-center">
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className={cn(
          "h-11 rounded-lg px-5 text-sm font-medium",
          destructive ? "bg-destructive text-background hover:bg-destructive/90" : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {destructive ? "Delete project" : "Invite teammate"}
      </button>
      <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
        {result}
      </p>
      <dialog
        ref={ref}
        aria-labelledby="dlg-title"
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close()
        }}
        className="m-auto w-[min(92vw,26rem)] rounded-xl border bg-popover p-0 text-popover-foreground text-left shadow-2xl backdrop:bg-foreground/40"
      >
        <form method="dialog" className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              {destructive && <AlertTriangle className="mt-0.5 size-5 text-destructive" aria-hidden />}
              <div>
                <h2 id="dlg-title" className="text-base font-semibold">
                  {destructive ? "Delete this project?" : "Invite a teammate"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {destructive ? "This removes the project and its 14 deploys. It cannot be undone." : "They will get editor access to the workspace."}
                </p>
              </div>
            </div>
            <button value="cancel" aria-label="Close" className="grid size-9 shrink-0 place-items-center rounded-md hover:bg-accent">
              <X className="size-4" aria-hidden />
            </button>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button value="cancel" onClick={() => setResult("Cancelled")} className="h-11 rounded-lg border border-input px-4 text-sm font-medium hover:bg-accent">
              Cancel
            </button>
            <button
              value="confirm"
              onClick={() => setResult(destructive ? "Project deleted (demo)" : "Invite sent (demo)")}
              className={cn("h-11 rounded-lg px-4 text-sm font-medium", destructive ? "bg-destructive text-background" : "bg-primary text-primary-foreground")}
            >
              {destructive ? "Delete" : "Send invite"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
