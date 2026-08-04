"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ChevronLeft from "@/components/icons/chevron-left";
import ChevronRight from "@/components/icons/chevron-right";
import styles from "./CarouselControls.module.css";
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
  const scrollSnaps = useMemo(
    () => emblaApi?.scrollSnapList() ?? [],
    [emblaApi],
  );

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
              className={clsx(styles.prev, hero ? "left-[2%]" : "left-[-4%]")}
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ChevronLeft />
            </button>
          )}

          {(hero || canScrollNext) && (
            <button
              className={clsx(styles.next, hero ? "right-[2%]" : "right-[-4%]")}
              onClick={() => emblaApi?.scrollNext()}
            >
              <ChevronRight />
            </button>
          )}
        </>
      )}

      {showDots && (
        <div className={styles.dots}>
          {dots?.map((_: unknown, index: number) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={clsx(
                styles.dot,
                selected === index && styles.activeDot,
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}
