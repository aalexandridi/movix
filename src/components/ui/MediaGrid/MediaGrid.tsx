// /* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import EmblaContainer from "../Carousel/EmblaCarousel";
import styles from "./MediaGrid.module.css";

import { MediaGridProps } from "./MediaGrid.types";

export default function MediaGrid({
  variant = "grid",
  title,
  children,
  layoutClass = "default",
}: MediaGridProps) {
  if (variant === "carousel") {
    return (
      <div className={clsx("my-6", layoutClass)}>
        <h3 className="mb-2 text-md font-semibold">{title}</h3>

        <EmblaContainer layoutClass={layoutClass}>{children}</EmblaContainer>

        {/* <EmblaContainer>
          {media.map((item) => (
            <div key={item.id} className={styles.emblaSlide}>
              {details ? renderMedia(item, details) : renderMedia(item)}
            </div>
          ))}
        </EmblaContainer> */}
      </div>
    );
  }

  return (
    <div className={clsx("my-8 py-6", styles[layoutClass])}>
      {title && <h3 className="mb-2 text-md font-semibold">{title}</h3>}

      <div className={clsx(styles.grid, styles[layoutClass])}>
        {children}
        {/* {media.map((item) => (
          <div key={item.id}>{renderMedia(item)}</div>
        ))} */}
      </div>
    </div>
  );
}
