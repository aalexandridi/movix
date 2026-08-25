import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import MediaPosterCardSkeleton from "@/components/ui/Cards/MediaPosterCardSkeleton/MediaPosterCardSkeleton";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { createMoviesService } from "@/services/tmdb/movies";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function TopRatedMovies() {
  const [locale, c] = await Promise.all([
    getLocale(),
    getTranslations("common"),
  ]);
  const moviesService = createMoviesService(locale);

  const movies = await moviesService.getTopRated();

  return (
    <MediaGrid title={c("topRatedMovies")} variant="carousel">
      {movies.results.map((item) => (
        <Suspense
          key={"topRatedMovies" + item.id}
          fallback={<MediaPosterCardSkeleton></MediaPosterCardSkeleton>}
        >
          <MediaPosterCard key={item.id} media={item} />
        </Suspense>
      ))}
    </MediaGrid>
  );
}
