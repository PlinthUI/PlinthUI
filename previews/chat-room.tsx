"use client"

import { useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

type Msg = { id: number; from: "me" | "them"; text: string }
const REPLIES = ["Sounds good. I will send the draft over.", "Can we move that to Thursday?", "Great, thanks for the update.", "Noted. Anything blocking you?"]

export default function ChatRoom() {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 1, from: "them", text: "Did the build go out?" }, { id: 2, from: "me", text: "Yes, build 214 is live." }])
  const [text, setText] = useState("")
  const [typing, setTyping] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  const n = useRef(3)
  useEffect(() => { end.current?.scrollIntoView({ block: "nearest" }) }, [msgs, typing])

  function send(e: React.FormEvent) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setMsgs((m) => [...m, { id: n.current++, from: "me", text: t }]); setText(""); setTyping(true)
    window.setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { id: n.current++, from: "them", text: REPLIES[n.current % REPLIES.length] }]) }, 1200)
  }

  return (
    <div className="mx-auto flex h-80 w-full max-w-sm flex-col overflow-hidden rounded-xl border bg-card">
      <div className="border-b px-4 py-3 text-sm font-semibold">Release channel</div>
      <ul className="flex-1 space-y-2 overflow-y-auto p-3" aria-live="polite" aria-label="Messages">
        {msgs.map((m) => <li key={m.id} className={cn("max-w-[80%] rounded-2xl px-3 py-2 text-sm", m.from === "me" ? "ml-auto rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-secondary")}>{m.text}</li>)}
        {typing && <li className="w-14 rounded-2xl rounded-bl-md bg-secondary px-3 py-2 text-sm text-muted-foreground" aria-label="They are typing">…</li>}
        <div ref={end} />
      </ul>
      <form onSubmit={send} className="flex gap-2 border-t p-2">
        <label htmlFor="cr-t" className="sr-only">Message</label>
        <input id="cr-t" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" className="h-11 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 text-sm" />
        <button type="submit" aria-label="Send" disabled={!text.trim()} className="grid size-11 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40"><Send className="size-4" aria-hidden /></button>
      </form>
    </div>
  )
}
