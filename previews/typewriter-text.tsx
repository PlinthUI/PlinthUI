"use client"

import { useEffect, useState } from "react"

const PHRASES = ["Find the right component.", "Check the license first.", "Compare before you install."]

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
    const delay = !deleting && count === full.length ? 1400 : deleting ? 28 : 55
    const t = window.setTimeout(() => {
      if (!deleting && count < full.length) setCount(count + 1)
      else if (!deleting) setDeleting(true)
      else if (count > 0) setCount(count - 1)
      else {
        setDeleting(false)
        setPhrase((phrase + 1) % PHRASES.length)
      }
    }, delay)
    return () => window.clearTimeout(t)
  }, [count, deleting, phrase, reduced])

  const text = reduced ? PHRASES[0] : PHRASES[phrase].slice(0, count)

  return (
    <div className="mx-auto w-full max-w-md text-center">
      <p className="sr-only">{PHRASES.join(" ")}</p>
      <p aria-hidden className="min-h-16 text-3xl font-semibold tracking-tight">
        {text}
        {!reduced && <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-1 bg-primary" />}
      </p>
    </div>
  )
}
