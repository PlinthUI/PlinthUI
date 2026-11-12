"use client"

import { useEffect, useRef, useState } from "react"

/** Mounts once the element nears the viewport. Used to lazy mount previews. */
export function useInView<T extends Element>(rootMargin = "240px") {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, seen])

  return [ref, seen] as const
}
