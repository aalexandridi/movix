import { createMoviesService } from "@/services/tmdb/movies";
import { getLocale } from "next-intl/server";
import GenresBarClient from "./GenresBarClient";
import { createTvShowsService } from "@/services/tmdb/shows";

export default async function GenresBar({
  forMovies = true,
}: {
  forMovies: boolean;
}) {
  const locale = await getLocale();

  const service = forMovies
    ? createMoviesService(locale)
    : createTvShowsService(locale);
  const genres = await service.getGenres();

  return <GenresBarClient genres={genres.genres} />;
}
