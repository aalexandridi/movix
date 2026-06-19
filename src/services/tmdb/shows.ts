import { createTmdbClient } from "./client";

export function createTvShowsService(locale: string) {
  const tmdb = createTmdbClient(locale);

  return {
    getPopular: () => tmdb.fetch("/tv/popular", 3600),

    getTopRated: () => tmdb.fetch("/tv/top_rated", 21600),

    getAiringToday: () => tmdb.fetch("/tv/airing_today", 300),
  };
}
