"use client"

import { useId, useState } from "react"
import Image from "next/image"
import { Check, Loader2 } from "lucide-react"

export default function GlassLogin() {
  const id = useId()
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const [touched, setTouched] = useState(false)
  const [state, setState] = useState<"idle" | "pending" | "done">("idle")
  const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  const okPw = pw.length >= 8
  return (
    <div className="relative isolate mx-auto grid min-h-[30rem] w-full max-w-md place-items-center overflow-hidden rounded-2xl p-6">
      <Image src="https://picsum.photos/seed/night-forest-fog-path/900/1000" alt="" fill unoptimized sizes="450px" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-950/35" />
      <form noValidate onSubmit={(e) => { e.preventDefault(); setTouched(true); if (!okEmail || !okPw) return; setState("pending"); window.setTimeout(() => setState("done"), 900) }} className="w-full max-w-xs rounded-2xl border border-white/25 bg-white/12 p-6 text-neutral-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl">
        {state === "done" ? <p role="status" className="flex items-center gap-2 py-8"><Check className="size-5" aria-hidden />Signed in (demo)</p> : (
          <>
            <h3 className="text-xl font-semibold">Welcome back</h3>
            <p className="mt-1 text-sm text-neutral-200">Sign in to continue.</p>
            {[["Email", email, setEmail, "email", okEmail, "Enter a valid email."], ["Password", pw, setPw, "password", okPw, "Use at least 8 characters."]].map(([label, val, set, type, ok, err], i) => (
              <div key={label as string} className="mt-4">
                <label htmlFor={`${id}${i}`} className="mb-1.5 block text-sm font-medium">{label as string}</label>
                <input id={`${id}${i}`} type={type as string} value={val as string} onChange={(e) => (set as (v: string) => void)(e.target.value)} aria-invalid={touched && !ok} aria-describedby={`${id}${i}e`} className="h-11 w-full rounded-xl border border-white/30 bg-white/10 px-3 text-sm placeholder:text-neutral-300 focus-visible:border-white" />
                <p id={`${id}${i}e`} className="mt-1 min-h-5 text-xs text-neutral-100">{touched && !ok ? (err as string) : ""}</p>
              </div>
            ))}
            <button type="submit" disabled={state === "pending"} className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-neutral-50 font-medium text-neutral-950 disabled:opacity-70">{state === "pending" && <Loader2 className="size-4 animate-spin" aria-hidden />}Sign in</button>
          </>
        )}
      </form>
    </div>
  )
}
