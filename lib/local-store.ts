"use client"

import { useSyncExternalStore } from "react"

/**
 * Tiny localStorage backed store. Every storage call is wrapped in try/catch,
 * so blocked or full storage degrades to in-memory state for the session.
 */
export function createLocalStore<T>(key: string, initial: T, parse: (raw: unknown) => T) {
  let state = initial
  let loaded = false
  let blocked = false
  const listeners = new Set<() => void>()

  function load() {
    if (loaded || typeof window === "undefined") return
    loaded = true
    try {
      const raw = window.localStorage.getItem(key)
      if (raw) state = parse(JSON.parse(raw))
    } catch {
      blocked = true
    }
  }

  function emit() {
    listeners.forEach((l) => l())
  }

  function onStorage(e: StorageEvent) {
    if (e.key !== key) return
    try {
      state = e.newValue ? parse(JSON.parse(e.newValue)) : initial
    } catch {
      state = initial
    }
    emit()
  }

  const store = {
    get: (): T => {
      load()
      return state
    },
    set(next: T) {
      load()
      state = next
      try {
        window.localStorage.setItem(key, JSON.stringify(next))
      } catch {
        blocked = true
      }
      emit()
    },
    subscribe(cb: () => void) {
      load()
      if (listeners.size === 0) window.addEventListener("storage", onStorage)
      listeners.add(cb)
      return () => {
        listeners.delete(cb)
        if (listeners.size === 0) window.removeEventListener("storage", onStorage)
      }
    },
    isBlocked: () => blocked,
    initial,
  }
  return store
}

export function useStore<T>(store: ReturnType<typeof createLocalStore<T>>): T {
  return useSyncExternalStore(store.subscribe, store.get, () => store.initial)
}

const noop = () => () => {}
/** false on the server and during hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false)
}
