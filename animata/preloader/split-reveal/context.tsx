"use client";

/*
 * Source: Animata, https://animata.design (https://github.com/codse/animata)
 * Licence: MIT, Copyright (c) Animata. Included unmodified apart from this notice.
 * See THIRD_PARTY_NOTICES.md.
 */

import { createContext, use } from "react";

import type { SplitRevealContextValue, SplitRevealInternalContextValue } from "./types";

export const SplitRevealContext = createContext<SplitRevealContextValue | null>(null);
export const SplitRevealInternalContext = createContext<SplitRevealInternalContextValue | null>(
  null,
);

export function useSplitReveal() {
  const context = use(SplitRevealContext);
  if (!context) {
    throw new Error("SplitReveal primitives must be used within <SplitReveal>.");
  }
  return context;
}

export function useSplitRevealInternal() {
  const context = use(SplitRevealInternalContext);
  if (!context) {
    throw new Error("SplitReveal.Task and SplitReveal.Images must be used within <SplitReveal>.");
  }
  return context;
}
