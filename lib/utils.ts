import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Linear interpolation. From Animata (MIT, Copyright (c) Animata), see THIRD_PARTY_NOTICES.md.
export function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b
}

// Distance between two points. From Animata (MIT, Copyright (c) Animata), see THIRD_PARTY_NOTICES.md.
export function getDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1)
}
