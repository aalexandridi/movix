// /* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import styles from "./MediaGrid.module.css";

import { MediaGridProps } from "./MediaGrid.types";
import Carousel from "../Carousel/Carousel";

export default function MediaGrid({
  variant = "grid",
  title,
  children,
  layoutClass = "default",
  resetKey,
}: MediaGridProps) {
  if (variant === "carousel") {
    return (
      <div className={clsx("my-6", layoutClass)}>
        <h3 className="mb-2 text-md font-semibold">{title}</h3>
        <Carousel resetKey={resetKey} layoutClass={layoutClass} hero={false}>
          {children}
        </Carousel>
      </div>
    );
  }

  return (
    <div className={clsx("my-8 py-6", styles[layoutClass])}>
      {title && <h3 className="mb-2 text-md font-semibold">{title}</h3>}

      <div className={clsx(styles.grid, styles[layoutClass])}>{children}</div>
    </div>
  );
}
