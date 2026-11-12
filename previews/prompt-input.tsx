"use client"

import { useRef, useState } from "react"
import { ArrowUp, Paperclip } from "lucide-react"

const MAX = 400

export default function PromptInput() {
  const ta = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState("")
  const [sent, setSent] = useState<string[]>([])
  const fit = () => { const el = ta.current; if (!el) return; el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight, 160) + "px" }
  const send = () => { const t = text.trim(); if (!t) return; setSent((s) => [...s, t]); setText(""); requestAnimationFrame(fit) }

  return (
    <div className="mx-auto w-full max-w-md">
      <ul aria-live="polite" className="mb-3 grid gap-2">{sent.slice(-3).map((s, i) => <li key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-secondary px-3 py-2 text-sm">{s}</li>)}</ul>
      <div className="rounded-2xl border bg-card p-2 focus-within:border-primary">
        <label htmlFor="pi" className="sr-only">Message</label>
        <textarea id="pi" ref={ta} rows={1} maxLength={MAX} value={text} placeholder="Write a message. Enter sends, Shift+Enter adds a line."
          onChange={(e) => { setText(e.target.value); fit() }}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
          className="max-h-40 w-full resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground" />
        <div className="flex items-center justify-between">
          <button type="button" aria-label="Attach a file" className="grid size-10 place-items-center rounded-lg text-muted-foreground hover:bg-accent"><Paperclip className="size-4" aria-hidden /></button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground tnum">{text.length}/{MAX}</span>
            <button type="button" onClick={send} disabled={!text.trim()} aria-label="Send message" className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-95 disabled:opacity-40"><ArrowUp className="size-4" aria-hidden /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
