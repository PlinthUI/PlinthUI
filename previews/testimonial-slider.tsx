"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const QUOTES = [
  { name: "Noor Haddad", role: "Design engineer, Brightwater Labs", quote: "We replaced three internal widgets in an afternoon and the review took ten minutes." },
  { name: "Callum Fraser", role: "Founder, Tidepool Notes", quote: "Seeing the license beside the preview ended a debate our team kept having." },
  { name: "Yuki Morimoto", role: "Frontend lead, Kogen Studio", quote: "Comparing two tab designs at phone width saved us a redesign." },
]

export default function TestimonialSlider() {
  const list = useRef<HTMLUListElement>(null)
  const [i, setI] = useState(0)
  useEffect(() => {
    const root = list.current
    if (!root) return
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setI(Number((e.target as HTMLElement).dataset.i))), { root, threshold: 0.6 })
    root.querySelectorAll("li").forEach((li) => io.observe(li))
    return () => io.disconnect()
  }, [])
  const go = (d: number) => list.current?.scrollBy({ left: d * list.current.clientWidth, behavior: "smooth" })
  return (
    <div className="mx-auto w-full max-w-xl">
      <ul ref={list} aria-label="Customer quotes" className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]">
        {QUOTES.map((q, k) => (
          <li key={q.name} data-i={k} aria-roledescription="slide" aria-label={`${k + 1} of ${QUOTES.length}`} className="w-full shrink-0 snap-center px-1">
            <figure className="rounded-xl border bg-card p-6">
              <blockquote className="text-lg leading-relaxed">“{q.quote}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-sm">
                <span className="grid size-10 place-items-center rounded-full bg-secondary font-semibold">{q.name.split(" ").map((p) => p[0]).join("")}</span>
                <span><span className="block font-medium">{q.name}</span><span className="block text-muted-foreground">{q.role}</span></span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground tnum" aria-live="polite">{i + 1} of {QUOTES.length}</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous quote" className="grid size-11 place-items-center rounded-lg border hover:bg-accent"><ChevronLeft className="size-4" aria-hidden /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next quote" className="grid size-11 place-items-center rounded-lg border hover:bg-accent"><ChevronRight className="size-4" aria-hidden /></button>
        </div>
      </div>
    </div>
  )
}
