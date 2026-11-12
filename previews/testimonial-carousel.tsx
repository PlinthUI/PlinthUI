"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const QUOTES = [
  { name: "Noor Haddad", role: "Design engineer, Brightwater Labs", quote: "We replaced three internal widgets in an afternoon and the review took ten minutes.", seed: "noor-haddad" },
  { name: "Callum Fraser", role: "Founder, Tidepool Notes", quote: "Seeing the license next to the preview ended a debate our team kept having.", seed: "callum-fraser" },
  { name: "Yuki Morimoto", role: "Frontend lead, Kōgen Studio", quote: "Comparing two tab implementations at phone width saved us a redesign.", seed: "yuki-morimoto" },
]

export default function TestimonialCarousel() {
  const scroller = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const root = scroller.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setIndex(Number((en.target as HTMLElement).dataset.i))
        })
      },
      { root, threshold: 0.6 }
    )
    root.querySelectorAll("li").forEach((li) => io.observe(li))
    return () => io.disconnect()
  }, [])

  function go(dir: 1 | -1) {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" })
  }

  return (
    <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-xl">
      <Image src="https://picsum.photos/seed/glass-harbor-evening/960/480" alt="" width={960} height={480} unoptimized className="absolute inset-0 size-full object-cover" />
      <div className="relative p-4">
        <ul ref={scroller} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]" aria-label="Customer quotes">
          {QUOTES.map((q, i) => (
            <li key={q.name} data-i={i} aria-roledescription="slide" aria-label={`${i + 1} of ${QUOTES.length}`} className="w-full shrink-0 snap-center px-1">
              <figure className="rounded-lg border border-white/20 bg-card/80 p-5 backdrop-blur-md">
                <blockquote className="text-base leading-relaxed">“{q.quote}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <Image src={`https://picsum.photos/seed/${q.seed}/80/80`} alt={`Portrait of ${q.name}`} width={40} height={40} unoptimized className="size-10 rounded-full object-cover" />
                  <span className="text-sm">
                    <span className="block font-medium">{q.name}</span>
                    <span className="block text-muted-foreground">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between">
          <p className="rounded-md bg-card/80 px-2 py-1 text-xs tnum backdrop-blur" aria-live="polite">
            {index + 1} of {QUOTES.length}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous quote" className="grid size-11 place-items-center rounded-lg bg-card/90 hover:bg-card">
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next quote" className="grid size-11 place-items-center rounded-lg bg-card/90 hover:bg-card">
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
