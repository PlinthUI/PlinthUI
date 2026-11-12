"use client"

import Link from "next/link"
import { TriangleAlert } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div role="alert" className="mx-auto grid min-h-[60dvh] max-w-xl place-items-center px-4 py-16 text-center">
      <div>
        <TriangleAlert className="mx-auto size-9 text-warning" aria-hidden />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Something broke while loading this page</h1>
        <p className="mt-2 text-muted-foreground">Your saved collections are stored in this browser and were not touched. Try again, or head back to the explorer.</p>
        {error.digest && <p className="mt-2 font-mono text-xs text-muted-foreground">Reference {error.digest}</p>}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button onClick={reset}>Try again</Button>
          <Link href="/explore" className={cn(buttonVariants({ variant: "outline" }))}>
            Back to Explore
          </Link>
        </div>
      </div>
    </div>
  )
}
