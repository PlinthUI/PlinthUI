"use client"

import { useRef, useState } from "react"
import { FileText, UploadCloud, X } from "lucide-react"
import { cn } from "@/lib/utils"

const kb = (n: number) => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`)

export default function FileDropzone() {
  const input = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [over, setOver] = useState(false)

  const add = (list: FileList | null) => list && setFiles((f) => [...f, ...Array.from(list)])

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files) }}
        className={cn("grid place-items-center gap-1 rounded-xl border border-dashed p-6 text-center transition-colors", over && "border-primary bg-primary/5")}
      >
        <UploadCloud className="size-6 text-muted-foreground" aria-hidden />
        <p className="text-sm">Drop files here or</p>
        <button type="button" onClick={() => input.current?.click()} className="h-10 rounded-lg border px-4 text-sm font-medium hover:bg-accent">Choose files</button>
        <input ref={input} type="file" multiple className="sr-only" tabIndex={-1} aria-label="Choose files" onChange={(e) => { add(e.target.files); e.target.value = "" }} />
      </div>
      <ul className="mt-3 grid gap-1.5" aria-live="polite">
        {files.map((f, i) => (
          <li key={`${f.name}-${i}`} className="flex min-h-11 items-center gap-2 rounded-lg border bg-card pl-3 pr-1 text-sm">
            <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <span className="min-w-0 flex-1 truncate">{f.name}</span>
            <span className="text-xs text-muted-foreground tnum">{kb(f.size)}</span>
            <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, k) => k !== i))} className="grid size-9 place-items-center rounded-md hover:bg-accent"><X className="size-4" aria-hidden /></button>
          </li>
        ))}
        {files.length === 0 && <li className="text-center text-xs text-muted-foreground">No files yet. Nothing is uploaded anywhere.</li>}
      </ul>
    </div>
  )
}
