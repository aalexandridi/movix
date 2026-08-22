import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { createMoviesService } from "@/services/tmdb/movies";
import { sortByPopularity } from "@/utils/media";
import { getLocale, getTranslations } from "next-intl/server";

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
        <MediaPosterCard key={item.id} media={item} />
      ))}
    </MediaGrid>
  );
}
