"use client"

import { Carousel, CarouselContent, CarouselIndicator, CarouselItem, CarouselNavigation } from "@/components/motion/carousel"

const SLIDES = ["ridge-fog-carousel", "harbor-dusk-carousel", "paper-garden-carousel", "salt-flat-carousel"]
/** Demo for the primitive in components/motion/. */
export default function Preview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <Carousel>
        <CarouselContent>
          {SLIDES.map((s, i) => <CarouselItem key={s}><div className="overflow-hidden rounded-xl border"><img src={`https://picsum.photos/seed/${s}/800/500`} alt={`Slide ${i + 1}`} className="aspect-[8/5] w-full object-cover" /></div></CarouselItem>)}
        </CarouselContent>
        <CarouselNavigation alwaysShow />
        <CarouselIndicator />
      </Carousel>
    </div>
  )
}
