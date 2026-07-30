"use client";

import useEmblaCarousel from "embla-carousel-react";
import styles from "../MediaGrid/MediaGrid.module.css";
import { MediaGridLayout } from "../MediaGrid/MediaGrid.types";
import clsx from "clsx";
import { Children } from "react";

export default function EmblaContainer({
  children,
  layoutClass,
}: {
  children: React.ReactNode;
  layoutClass: MediaGridLayout;
}) {
  const canDrag = Children.count(children) > 1;
  const [emblaRef] = useEmblaCarousel({
    dragFree: false,
    active: canDrag,
  });

  return (
    <div className={clsx(styles.carouselWrapper, styles[layoutClass])}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>{children}</div>
      </div>
    </div>
  );
}
