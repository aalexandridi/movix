import { createTmdbClient } from "./client";

export function createTvShowsService(locale: string) {
  const tmdb = createTmdbClient(locale);

  return {
    getPopular: () => tmdb.fetch("/tv/popular", 3600),

    getTopRated: () => tmdb.fetch("/tv/top_rated", 21600),

    getAiringToday: () => tmdb.fetch("/tv/airing_today", 300),

    getImages: (id: number) => tmdb.fetch(`/tv/${id}/images`, 3600),

    getGenres: () => tmdb.fetch("/genre/tv/list", 3600),

    getTvShowDeatils: (id: number) => tmdb.fetch(`/tv/${id}`, 3600),

    discoverShows: (query: string) =>
      tmdb.fetch("/discover/tv", 3600, `&${query}`),
  };
}
