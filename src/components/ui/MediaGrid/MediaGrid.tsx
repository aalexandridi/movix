"use client";

import useEmblaCarousel from "embla-carousel-react";

import MediaCard from "../MediaCard/MediaCard";
import styles from "./MediaGrid.module.css";

import { MediaGridProps } from "./MediaGrid.types";

export default function MediaGrid({
  media,
  variant = "grid",
  title,
  classNames = "",
}: MediaGridProps) {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
  });

  if (variant === "carousel") {
    return (
      <div className="my-6">
        <h3 className="mb-2 text-md font-semibold">{title}</h3>
        <div className={styles.carouselWrapper}>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {media.map((item) => (
                <div key={item.id} className={styles.emblaSlide}>
                  <MediaCard media={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-8 py-6`}>
      {title && <h3 className="mb-2 text-md font-semibold">{title}</h3>}
      <div className={`${styles.grid}`}>
        {media.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </div>
    </div>
  );
}
