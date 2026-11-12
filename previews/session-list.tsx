"use client"

import SessionList from "@/components/lists/SessionList"

/** Thin preview wrapper. The component itself lives in components/lists/. */
export default function Preview() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <SessionList />
    </div>
  )
}
