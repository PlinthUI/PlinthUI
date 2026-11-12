import Link from "next/link"
import { SearchX } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[60dvh] max-w-xl place-items-center px-4 py-16 text-center">
      <div>
        <SearchX className="mx-auto size-9 text-muted-foreground" aria-hidden />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">That page is not on the shelf</h1>
        <p className="mt-2 text-muted-foreground">The address may be misspelled, or the component was renamed. Search for it or browse everything.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link href="/explore" className={cn(buttonVariants())}>
            Browse components
          </Link>
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
