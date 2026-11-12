"use client"

import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/motion/image-comparison"

/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <ImageComparison className="mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-xl border" enableHover springOptions={{ bounce: 0, duration: 0 }}>
      <ImageComparisonImage src="https://picsum.photos/seed/before-street-day/800/500" alt="Street by day" position="left" />
      <ImageComparisonImage src="https://picsum.photos/seed/after-street-night/800/500?grayscale" alt="Street in grayscale" position="right" />
      <ImageComparisonSlider className="w-0.5 bg-white/60" />
    </ImageComparison>
  )
}
