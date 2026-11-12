// @ts-nocheck: upstream typings target React 18. No runtime change.
'use client';

/*
 * Source: Motion-Primitives by ibelick, https://motion-primitives.com
 * Licence: MIT, Copyright (c) 2024 ibelick. Included unmodified apart from this notice.
 * See THIRD_PARTY_NOTICES.md.
 */

import { motion, SpringOptions, useScroll, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';
import { RefObject } from 'react';

export type ScrollProgressProps = {
  className?: string;
  springOptions?: SpringOptions;
  containerRef?: RefObject<HTMLDivElement>;
};

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
};

export function ScrollProgress({
  className,
  springOptions,
  containerRef,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: Boolean(containerRef?.current),
  });

  const scaleX = useSpring(scrollYProgress, {
    ...DEFAULT_SPRING_OPTIONS,
    ...(springOptions ?? {}),
  });

  return (
    <motion.div
      className={cn('inset-x-0 top-0 h-1 origin-left', className)}
      style={{
        scaleX,
      }}
    />
  );
}
