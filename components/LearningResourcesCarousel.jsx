"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LearningResourcesCarousel({ resources = [] }) {
  console.log("Resources:", resources);
  const autoplay = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <Carousel
        loop
        plugins={[autoplay.current]}
        className="relative w-full overflow-visible px-4 min-h-[280px]"
      >
        <CarouselContent className="flex gap-4">
          {resources?.map((res, idx) => (
            <CarouselItem
              key={idx}
              className="flex-none sm:basis-full md:basis-1/2 lg:basis-1/3 px-2"
            >
              <Card className="h-full hover:shadow-lg transition transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    {res.link ? (
                      <a
                        href={res.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-700 dark:text-slate-200 hover:underline"
                      >
                        {res.name}
                      </a>
                    ) : (
                      res.name
                    )}
                  </CardTitle>
                  <CardDescription className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">{res.type}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {res.description}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <CarouselPrevious className="z-20 p-2 bg-white/70 dark:bg-black/50 rounded-full shadow hover:bg-white dark:hover:bg-black transition" />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <CarouselNext className="z-20 p-2 bg-white/70 dark:bg-black/50 rounded-full shadow hover:bg-white dark:hover:bg-black transition" />
        </div>
      </Carousel>
    </div>
  )
}
