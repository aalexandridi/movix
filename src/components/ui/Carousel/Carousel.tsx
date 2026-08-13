"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { Children, useEffect } from "react";
import clsx from "clsx";
import styles from "./Carousel.module.css";
import CarouselControls from "./CarouselControls";
import { MediaGridLayout } from "../MediaGrid/MediaGrid.types";
type CarouselProps = {
  children: React.ReactNode;

  options?: EmblaOptionsType;
  hero?: boolean;
  layoutClass?: MediaGridLayout;

  showDots?: boolean;

  className?: string;
  viewportClassName?: string;
  containerClassName?: string;
  resetKey?: string;
};

export default function Carousel({
  children,
  options,
  hero = true,
  showDots = false,
  layoutClass = "default",
  resetKey,
  className,
  viewportClassName,
  containerClassName,
}: CarouselProps) {
  const canDrag = Children.count(children) > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
    active: canDrag,
    startIndex: 0,
    ...options,
  });

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.scrollTo(0, true);
  }, [emblaApi, resetKey]);

  return (
    <div
      className={clsx(
        "group",
        styles.carouselWrapper,
        hero && "h-screen",
        className,
      )}
    >
      <div
        ref={emblaRef}
        className={clsx(
          hero ? styles.viewport : clsx(styles.embla, styles[layoutClass]),
          viewportClassName,
        )}
      >
        <div
          className={clsx(
            hero ? styles.container : styles.emblaContainer,
            containerClassName,
          )}
        >
          {!hero &&
            Children.map(children, (child) => (
              <div className={styles.emblaSlide}>{child}</div>
            ))}

          {hero && children}
        </div>
      </div>

      {(canDrag || showDots) && (
        <CarouselControls
          hero={hero}
          emblaApi={emblaApi}
          showNavigation={canDrag}
          showDots={showDots}
          slideCount={Children.count(children)}
        />
      )}
    </div>
  );
}
