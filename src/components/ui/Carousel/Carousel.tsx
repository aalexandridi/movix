"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Children, useCallback, useEffect, useMemo, useState } from "react";

import styles from "./Carousel.module.css";
import ChevronRight from "@/components/icons/chevron-right";
import ChevronLeft from "@/components/icons/chevron-left";

interface CarouselProps {
  children: React.ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const childrenCount = Children.count(children);
  const hasMultipleSlides = childrenCount > 1;

  const scrollSnaps = useMemo(
    () => emblaApi?.scrollSnapList() ?? [],
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("init", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("init", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={styles.embla}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>{children}</div>
      </div>

      {hasMultipleSlides && (
        <>
          <button
            className={styles.prevButton}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft />
          </button>

          <button
            className={styles.nextButton}
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight />
          </button>

          <div className={styles.dots}>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === selectedIndex ? styles.dotActive : ""
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
