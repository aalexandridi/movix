import InfiniteMediaGrid from "@/components/ui/MediaGrid/InfiniteMediaGrid";
import { createMoviesService } from "@/services/tmdb/movies";
import { createTvShowsService } from "@/services/tmdb/shows";
import { createGenreMaps, getCurrentDate } from "@/utils/media";
import { getLocale } from "next-intl/server";

export async function MediaByGenre({
  genre,
  mediaType,
  title,
}: {
  genre: string;
  mediaType: "tv" | "movie";
  title?: string;
}) {
  const locale = await getLocale();
  const service =
    mediaType === "movie"
      ? createMoviesService(locale)
      : createTvShowsService(locale);
  const genres = await service.getGenres();
  const { nameToId } = createGenreMaps(genres.genres);

  const genreId = genre ? (nameToId.get(genre) ?? 0) : 0;

  const initial = await service.discover(
    `with_genres=${genreId}&sort_by=popularity.desc&primary_release_date.lte=${getCurrentDate()}`,
  );

  return (
    <InfiniteMediaGrid
      title={title}
      key={genreId}
      initialMedia={initial.results}
      genre={genreId}
      mode="discover"
      mediaType={mediaType}
    />
  );
}
