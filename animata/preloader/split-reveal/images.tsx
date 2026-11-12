"use client";

/*
 * Source: Animata, https://animata.design (https://github.com/codse/animata)
 * Licence: MIT, Copyright (c) Animata. Included unmodified apart from this notice.
 * See THIRD_PARTY_NOTICES.md.
 */

import { useCallback, useMemo } from "react";

import { preloadImages } from "./preload-images";
import { SplitRevealTask } from "./task";
import type { SplitRevealTaskContext } from "./types";

export type SplitRevealImagesProps = {
  urls: string[];
};

export function SplitRevealImages({ urls }: SplitRevealImagesProps) {
  const uniqueUrls = useMemo(() => [...new Set(urls.filter(Boolean))], [urls]);

  const run = useCallback(
    ({ report, signal }: SplitRevealTaskContext) => {
      if (signal.aborted) {
        return Promise.resolve();
      }

      return preloadImages(uniqueUrls, (next) => {
        if (!signal.aborted) {
          report(next);
        }
      });
    },
    [uniqueUrls],
  );

  return <SplitRevealTask run={run} />;
}
