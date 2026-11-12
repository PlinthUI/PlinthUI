"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

const SLIDES = [
  ["Morning ridge", "ridge-morning-fog"],
  ["Harbor lights", "harbor-lights-dusk"],
  ["Paper garden", "paper-garden-studio"],
  ["Night market", "night-market-lanterns"],
  ["Salt flats", "salt-flats-horizon"],
]

function Card({ title, seed, container }: { title: string; seed: string; container: React.RefObject<HTMLUListElement | null> }) {
  const el = useRef<HTMLLIElement>(null)
  const reduce = useReducedMotion()
  const { scrollXProgress } = useScroll({ target: el, container, axis: "x", offset: ["start end", "end start"] })
  const x = useTransform(scrollXProgress, [0, 1], ["-8%", "8%"])
  return (
    <li ref={el} className="w-[70%] shrink-0 snap-center @lg:w-[44%]">
      <div className="overflow-hidden rounded-xl">
        <motion.div style={reduce ? undefined : { x, scale: 1.2 }}>
          <Image src={`https://picsum.photos/seed/${seed}/700/900`} alt={title} width={700} height={900} unoptimized className="aspect-[4/5] w-full object-cover" />
        </motion.div>
      </div>
      <p className="mt-2 text-sm font-medium">{title}</p>
    </li>
  )
}

export default function HorizontalGallery() {
  const list = useRef<HTMLUListElement>(null)
  const { scrollXProgress } = useScroll({ container: list })
  return (
    <div className="mx-auto w-full max-w-2xl">
      <ul ref={list} tabIndex={0} aria-label="Gallery, scroll sideways" className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none]">
        {SLIDES.map(([t, s]) => <Card key={s} title={t} seed={s} container={list} />)}
      </ul>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary" aria-hidden>
        <motion.div style={{ scaleX: scrollXProgress }} className="h-full origin-left bg-foreground" />
      </div>
    </div>
  )
}
