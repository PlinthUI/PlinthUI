import { useEffect } from "react"

/** Locks page scroll while enabled. Pass isDisabled to release it. */
export function usePreventScroll({ isDisabled = false }: { isDisabled?: boolean } = {}) {
  useEffect(() => {
    if (isDisabled) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isDisabled])
}
