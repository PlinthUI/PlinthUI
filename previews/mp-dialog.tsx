"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/motion/dialog"
import { X } from "lucide-react"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="mx-auto w-fit">
      <Dialog transition={{ type: "spring", bounce: 0.05, duration: 0.25 }}>
        <DialogTrigger className="h-11 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground">Open dialog</DialogTrigger>
        <DialogContent className="w-full max-w-sm rounded-xl border bg-popover p-6 text-popover-foreground">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Share this project</DialogTitle>
            <DialogDescription className="mt-1 text-sm text-muted-foreground">Anyone with the link can view it.</DialogDescription>
          </DialogHeader>
          <DialogClose className="absolute right-3 top-3 grid size-9 place-items-center rounded-md hover:bg-accent" aria-label="Close"><X className="size-4" aria-hidden /></DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
