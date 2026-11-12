"use client"

import { useState } from "react"
import { TriangleAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import { PACKAGE_MANAGERS, setPackageManager, toAddCommand, toRunCommand, usePackageManager } from "@/lib/pm"
import { CopyButton } from "./copy-button"

function Command({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border bg-card pl-4 pr-1.5">
      <code className="overflow-x-auto py-3 font-mono text-[13px] whitespace-nowrap">{text}</code>
      <CopyButton text={text} />
    </div>
  )
}

export function InstallPanel({ cli, manual, path, sourceName }: { cli?: string; manual?: string[]; path: string; sourceName: string }) {
  const pm = usePackageManager()
  const [mode, setMode] = useState<"cli" | "manual">("cli")

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <div role="radiogroup" aria-label="Install method" className="inline-flex rounded-lg bg-secondary p-1">
          {(["cli", "manual"] as const).map((m) => (
            <button key={m} role="radio" aria-checked={mode === m} onClick={() => setMode(m)} className={cn("h-9 rounded-md px-3 text-sm font-medium", mode === m ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground")}>
              {m === "cli" ? "CLI" : "Manual"}
            </button>
          ))}
        </div>
        <div role="radiogroup" aria-label="Package manager" className="inline-flex rounded-lg border p-0.5">
          {PACKAGE_MANAGERS.map((p) => (
            <button key={p} role="radio" aria-checked={pm === p} onClick={() => setPackageManager(p)} className={cn("h-10 rounded-md px-3 font-mono text-[13px]", pm === p ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {mode === "cli" ? (
        <div className="grid grid-cols-1 gap-2">
          <p className="text-sm text-muted-foreground">Run this in your project root. It adds the file below and its dependencies.</p>
          {cli ? <Command text={toRunCommand(cli, pm)} /> : null}
          <p className="font-mono text-[13px] text-muted-foreground">Creates {path}</p>
        </div>
      ) : (
        <ol className="grid grid-cols-1 gap-4 text-sm">
          <li className="grid grid-cols-1 gap-2">
            <span className="font-medium">1. Install the dependencies</span>
            {(manual && manual.length ? manual : ["npm install react"]).map((m) => (
              <Command key={m} text={toAddCommand(m, pm)} />
            ))}
          </li>
          <li className="grid grid-cols-1 gap-1">
            <span className="font-medium">2. Copy the code</span>
            <span className="text-muted-foreground">
              Create <code className="font-mono text-[13px] text-foreground">{path}</code> and paste the file from the Code tab.
            </span>
          </li>
          <li className="grid grid-cols-1 gap-1">
            <span className="font-medium">3. Import it</span>
            <span className="text-muted-foreground">Use the default export from your page or component.</span>
          </li>
        </ol>
      )}

      <div role="note" className="flex gap-3 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm">
        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
        <p>
          Always review third party code before installing it. This entry comes from {sourceName}. PlinthUI does not audit it.
        </p>
      </div>
    </div>
  )
}
