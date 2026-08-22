import clsx from "clsx";
import styles from "./MediaGrid.module.css";
import Carousel from "../Carousel/Carousel";
import { MediaGridLayout } from "./MediaGrid.types";
import SlideSkeleton from "../Carousel/SlideSkeleton";
import MediaPosterCardSkeleton from "../Cards/MediaPosterCardSkeleton/MediaPosterCardSkeleton";
import MediaCardSkeleton from "../Cards/MediaCardSkeleton/MediaCardSkeleton";

type MediaGridSkeletonProps = {
  count?: number;
  variant?: "grid" | "carousel";
  layoutClass?: MediaGridLayout;
  title?: string;
  isHero?: boolean;
};

export default function MediaGridSkeleton({
  count = 12,
  variant = "grid",
  layoutClass = "default",
  title,
  isHero = false,
}: MediaGridSkeletonProps) {
  if (variant === "carousel") {
    return isHero ? (
      <Carousel layoutClass={layoutClass} hero={isHero}>
        <SlideSkeleton />
      </Carousel>
    ) : (
      <div className={clsx("my-6", layoutClass)}>
        {title && <h3 className="mb-2 text-md font-semibold">{title}</h3>}

        <Carousel layoutClass={layoutClass} hero={isHero}>
          {Array.from({ length: count }).map((_, i) => (
            <MediaPosterCardSkeleton key={i} />
          ))}
        </Carousel>
      </div>
    );
  }

  return (
    <div className={clsx("my-8 py-6", styles[layoutClass])}>
      {title && <h3 className="mb-2 text-md font-semibold">{title}</h3>}

      <div className={clsx(styles.grid, styles[layoutClass])}>
        {Array.from({ length: count }).map((_, i) =>
          // eslint-disable-next-line react/jsx-key
          layoutClass === "episodes" ? (
            <MediaCardSkeleton key={i} />
          ) : (
            <MediaPosterCardSkeleton key={i}></MediaPosterCardSkeleton>
          ),
        )}
      </div>
    </div>
  );
}
