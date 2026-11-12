"use client";

/*
 * Source: Animata, https://animata.design (https://github.com/codse/animata)
 * Licence: MIT, Copyright (c) Animata. Included unmodified apart from this notice.
 * See THIRD_PARTY_NOTICES.md.
 */

import { useEffect, useId } from "react";

import { useSplitRevealInternal } from "./context";
import type {
  SplitRevealTaskDefinition,
  SplitRevealTaskGenerator,
  SplitRevealTaskRun,
} from "./types";

export type SplitRevealTaskProps = {
  run?: SplitRevealTaskRun;
  generator?: SplitRevealTaskGenerator;
};

export function SplitRevealTask({ run, generator }: SplitRevealTaskProps) {
  const id = useId();
  const { registerTask } = useSplitRevealInternal();

  useEffect(() => {
    const task: SplitRevealTaskDefinition = {
      run,
      generator,
    };

    if (!task.run && !task.generator) {
      return;
    }

    return registerTask(id, task);
  }, [id, registerTask, run, generator]);

  return null;
}
