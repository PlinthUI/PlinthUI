import { useEffect, type RefObject } from "react"

/** Calls handler when a pointer press lands outside the referenced element. */
export default function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const on = (event: MouseEvent | TouchEvent) => {
      const el = ref.current
      if (!el || el.contains(event.target as Node)) return
      handler(event)
    }
    document.addEventListener("mousedown", on)
    document.addEventListener("touchstart", on)
    return () => {
      document.removeEventListener("mousedown", on)
      document.removeEventListener("touchstart", on)
    }
  }, [ref, handler])
}
