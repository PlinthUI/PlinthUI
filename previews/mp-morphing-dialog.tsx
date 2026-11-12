"use client"

import { MorphingDialog, MorphingDialogClose, MorphingDialogContainer, MorphingDialogContent, MorphingDialogDescription, MorphingDialogImage, MorphingDialogSubtitle, MorphingDialogTitle, MorphingDialogTrigger } from "@/components/motion/morphing-dialog"
import { X } from "lucide-react"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="mx-auto w-fit">
      <MorphingDialog transition={{ type: "spring", bounce: 0.05, duration: 0.25 }}>
        <MorphingDialogTrigger style={{ borderRadius: "12px" }} className="flex w-60 flex-col overflow-hidden border bg-card text-left">
          <MorphingDialogImage src="https://picsum.photos/seed/morph-card-lake/600/400" alt="A quiet lake at dawn" className="h-32 w-full object-cover" />
          <div className="p-3"><MorphingDialogTitle className="text-sm font-semibold">Quiet lake</MorphingDialogTitle><MorphingDialogSubtitle className="text-xs text-muted-foreground">Tap to expand</MorphingDialogSubtitle></div>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent style={{ borderRadius: "20px" }} className="relative flex w-[min(92vw,26rem)] flex-col overflow-hidden border bg-popover">
            <MorphingDialogImage src="https://picsum.photos/seed/morph-card-lake/600/400" alt="A quiet lake at dawn" className="h-56 w-full object-cover" />
            <div className="p-5"><MorphingDialogTitle className="text-lg font-semibold">Quiet lake</MorphingDialogTitle><MorphingDialogSubtitle className="text-sm text-muted-foreground">Dawn, 5:40</MorphingDialogSubtitle>
              <MorphingDialogDescription disableLayoutAnimation variants={{ initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }}><p className="mt-3 text-sm text-muted-foreground">The card grows from where it was tapped into a full panel.</p></MorphingDialogDescription></div>
            <MorphingDialogClose className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/80" ><X className="size-4" aria-hidden /></MorphingDialogClose>
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    </div>
  )
}
