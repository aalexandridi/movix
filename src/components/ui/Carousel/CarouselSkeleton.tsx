import clsx from "clsx";
import stylesCarousel from "../Carousel/Carousel.module.css";
import { MediaGridLayout } from "../MediaGrid/MediaGrid.types";

export function CarouselSkeleton({
  title,
  isHero = false,
  layoutClass = "default",
}: {
  title?: string;
  isHero: boolean;
  layoutClass: MediaGridLayout;
}) {
  if (isHero) {
    return (
      <div className={stylesCarousel.heroSkeleton}>
        <div className="pointer-events-none absolute inset-0 bg-slide-overlay z-1" />
      </div>
    );
  }
  return (
    <div
      className={clsx(
        "my-6",
        stylesCarousel.carouselSkeletonContainer,
        stylesCarousel[layoutClass],
      )}
    >
      {title && <h3 className="mb-2 text-md font-semibold">{title}</h3>}

      <div className={stylesCarousel.carouselSkeleton} />
    </div>
  );
}
