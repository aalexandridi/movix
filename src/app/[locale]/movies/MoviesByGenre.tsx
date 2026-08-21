import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import { createMoviesService } from "@/services/tmdb/movies";
import { createGenreMaps, getCurrentDate } from "@/utils/media";
import { getLocale } from "next-intl/server";

export async function MoviesByGenre({ genre }: { genre: string }) {
  const locale = await getLocale();
  const moviesService = createMoviesService(locale);
  const genres = await moviesService.getFilters();
  const { nameToId } = createGenreMaps(genres.genres);

  const genreId = genre ? (nameToId.get(genre) ?? 0) : 0;

  const initial = await moviesService.discoverMovies(
    `with_genres=${genreId}&sort_by=popularity.desc&primary_release_date.lte=${getCurrentDate()}`,
  );

  return (
    <InfiniteMediaGrid
      key={genreId}
      initialMedia={initial.results}
      genre={genreId}
      mode="discover"
    />
  );
}
