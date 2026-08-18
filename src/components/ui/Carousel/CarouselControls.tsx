"use client";

import { useCallback, useEffect, useState } from "react";
import ChevronLeft from "@/components/icons/chevron-left";
import ChevronRight from "@/components/icons/chevron-right";
import clsx from "clsx";
import type { EmblaCarouselType } from "embla-carousel";

export default function CarouselControls({
  emblaApi,
  showNavigation,
  showDots,
  hero,
  slideCount,
}: {
  emblaApi: EmblaCarouselType | undefined;
  showNavigation: boolean;
  showDots: boolean;
  hero: boolean;
  slideCount: number;
}) {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selected, setSelected] = useState(0);

  const dots = Array.from({ length: slideCount });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelected(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <>
      {showNavigation && (
        <>
          {(hero || canScrollPrev) && (
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className={clsx(
                "absolute top-1/2 z-10 -translate-y-1/2",
                "cursor-pointer rounded-full border-none text-white",
                "opacity-0 transition-opacity duration-200",
                "group-hover:opacity-100",
                hero ? "left-[2%]" : "left-[-4%]",
              )}
            >
              <ChevronLeft />
            </button>
          )}

          {(hero || canScrollNext) && (
            <button
              onClick={() => emblaApi?.scrollNext()}
              className={clsx(
                "absolute top-1/2 z-10 -translate-y-1/2",
                "cursor-pointer rounded-full border-none text-white",
                "opacity-0 transition-opacity duration-200",
                "group-hover:opacity-100",
                hero ? "right-[2%]" : "right-[-4%]",
              )}
            >
              <ChevronRight />
            </button>
          )}
        </>
      )}

      {showDots && (
        <div className="mt-[-5.5%] flex justify-center gap-[14px]">
          {dots.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={clsx(
                "h-3 w-3 cursor-pointer rounded-full border-none",
                "bg-white opacity-50",
                "transition-transform duration-200",
                selected === index && "scale-[1.2] opacity-100",
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}
