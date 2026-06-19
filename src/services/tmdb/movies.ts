import { Movie, PaginatedResponse } from "@/types/media";
import { createTmdbClient } from "./client";

export function createMoviesService(locale: string) {
  const tmdb = createTmdbClient(locale);

  return {
    getNowPlaying: () => tmdb.fetch("/movie/now_playing", 300),

    getPopular: (): Promise<PaginatedResponse<Movie>> =>
      tmdb.fetch("/movie/popular", 3600),

    getTopRated: () => tmdb.fetch("/movie/top_rated", 21600),

    getUpcoming: () => tmdb.fetch("/movie/upcoming", 3600),
  };
}
