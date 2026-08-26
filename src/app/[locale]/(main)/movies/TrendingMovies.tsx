import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import MediaPosterCardSkeleton from "@/components/ui/Cards/MediaPosterCardSkeleton/MediaPosterCardSkeleton";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { createMoviesService } from "@/services/tmdb/movies";
import { sortByPopularity } from "@/utils/media";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function TrendingMovies() {
  const [locale, c] = await Promise.all([
    getLocale(),
    getTranslations("common"),
  ]);
  const moviesService = createMoviesService(locale);

  const moviesTrending = await moviesService.getTrending("week");

  const movies = sortByPopularity(moviesTrending.results);

  return (
    <MediaGrid title={c("trendingMoviesThisWeek")} variant="carousel">
      {movies.map((item) => (
        <Suspense
          key={"trendingMovies" + item.id}
          fallback={<MediaPosterCardSkeleton></MediaPosterCardSkeleton>}
        >
          <MediaPosterCard media={item} />
        </Suspense>
      ))}
    </MediaGrid>
  );
}
