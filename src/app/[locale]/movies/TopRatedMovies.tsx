import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { createMoviesService } from "@/services/tmdb/movies";
import { getLocale, getTranslations } from "next-intl/server";

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
        <MediaPosterCard key={item.id} media={item} />
      ))}
    </MediaGrid>
  );
}
