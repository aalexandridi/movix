import MediaPosterCard from "@/components/ui/Cards/MediaPosterCard";
import MediaGrid from "@/components/ui/MediaGrid/MediaGrid";
import { createMoviesService } from "@/services/tmdb/movies";
import { getLocale, getTranslations } from "next-intl/server";

export async function UpcomingMovies() {
  const [locale, c] = await Promise.all([
    getLocale(),
    getTranslations("common"),
  ]);
  const moviesService = createMoviesService(locale);

  const upcomingMovies = await moviesService.getUpcoming();

  return (
    <MediaGrid title={c("upcomingTheaters")} variant="carousel">
      {upcomingMovies.results.map((item) => (
        <MediaPosterCard key={item.id} media={item} />
      ))}
    </MediaGrid>
  );
}
