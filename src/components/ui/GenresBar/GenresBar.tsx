import { createMoviesService } from "@/services/tmdb/movies";
import { getLocale } from "next-intl/server";
import GenresBarClient from "./GenresBarClient";

export default async function GenresBar() {
  const locale = await getLocale();

  const moviesService = createMoviesService(locale);
  const genres = await moviesService.getFilters();

  return <GenresBarClient genres={genres.genres} />;
}
