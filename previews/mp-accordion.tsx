"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/motion/accordion"

const ITEMS = [["one", "What is a primitive?", "A small building block you compose into your own interface."], ["two", "Can I restyle it?", "Yes. Every part takes a className and you control the markup."], ["three", "Does it respect reduced motion?", "Pass your own transition and variants to tune or remove movement."]]
/** Demo for the primitive in components/motion/. */
export default function Preview() {
  const [v, setV] = useState<React.Key | null>("one")
  return (
    <Accordion className="mx-auto w-full max-w-md divide-y rounded-xl border bg-card" transition={{ type: "spring", stiffness: 260, damping: 28 }} expandedValue={v} onValueChange={setV}>
      {ITEMS.map(([id, q, a]) => (
        <AccordionItem key={id} value={id} className="px-4">
          <AccordionTrigger className="w-full py-3 text-left text-sm font-medium"><span className="flex items-center justify-between">{q}<Plus className="size-4" aria-hidden /></span></AccordionTrigger>
          <AccordionContent><p className="pb-3 text-sm text-muted-foreground">{a}</p></AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
