import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import MediaPosterCardSkeleton from "@/components/ui/Cards/MediaPosterCardSkeleton/MediaPosterCardSkeleton";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { createMultiService } from "@/services/tmdb/multi";
import { Movie, TvShow } from "@/types/media";
import { limitAndMergeArrays } from "@/utils/array";
import { sortByPopularity } from "@/utils/media";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function TopToday() {
  const [locale, c] = await Promise.all([
    getLocale(),
    getTranslations("common"),
  ]);

  const multiService = createMultiService(locale);

  const trending = await multiService.getTrending("day");

  const candidates = trending.results.filter(
    (item) =>
      (item.media_type === "movie" || item.media_type === "tv") &&
      item.backdrop_path,
  );
  const topTen = limitAndMergeArrays<Movie | TvShow>(
    10,
    sortByPopularity(candidates),
  );

  return (
    <MediaGrid title={c("topToday")} variant="carousel">
      {topTen.map((item) => (
        <Suspense
          key={"topToday" + item.id}
          fallback={<MediaPosterCardSkeleton></MediaPosterCardSkeleton>}
        >
          <MediaPosterCard media={item} />
        </Suspense>
      ))}
    </MediaGrid>
  );
}
