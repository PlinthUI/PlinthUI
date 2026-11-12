"use client"

import { useEffect, useState } from "react"

const PHRASES = ["Ship the whole system.", "Keep the model honest.", "Test what you promise."]

export default function TypewriterText() {
  const [phrase, setPhrase] = useState(0)
  const [count, setCount] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  useEffect(() => {
    if (reduced) return
    const full = PHRASES[phrase]
    const hold = !deleting && count === full.length
    const t = window.setTimeout(
      () => {
        if (hold) setDeleting(true)
        else if (!deleting) setCount(count + 1)
        else if (count > 0) setCount(count - 1)
        else {
          setDeleting(false)
          setPhrase((phrase + 1) % PHRASES.length)
        }
      },
      hold ? 1400 : deleting ? 30 : 60
    )
    return () => window.clearTimeout(t)
  }, [count, deleting, phrase, reduced])

  return (
    <div className="mx-auto w-full max-w-md text-center">
      <p className="sr-only">{PHRASES.join(" ")}</p>
      <p aria-hidden className="min-h-16 text-3xl font-semibold tracking-tight">
        {reduced ? PHRASES[0] : PHRASES[phrase].slice(0, count)}
        {!reduced && <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-1 bg-primary" />}
      </p>
    </div>
  )
}
