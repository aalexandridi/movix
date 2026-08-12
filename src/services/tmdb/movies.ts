import { Movie, PaginatedResponse } from "@/types/media";
import { createTmdbClient } from "./client";

export function createMoviesService(locale: string) {
  const tmdb = createTmdbClient(locale);

  return {
    getTrending: (
      timeWindow: "week" | "day",
    ): Promise<PaginatedResponse<Movie>> =>
      tmdb.fetch(`/trending/movie/${timeWindow}`, 3600),

    getNowPlaying: (): Promise<PaginatedResponse<Movie>> =>
      tmdb.fetch("/movie/now_playing", 300),

    getPopular: (): Promise<PaginatedResponse<Movie>> =>
      tmdb.fetch("/movie/popular", 3600),

    getTopRated: (): Promise<PaginatedResponse<Movie>> =>
      tmdb.fetch("/movie/top_rated", 21600),

    getUpcoming: (): Promise<PaginatedResponse<Movie>> =>
      tmdb.fetch("/movie/upcoming", 3600),

    getFilters: () => tmdb.fetch("/genre/movie/list", 86400),

    getMovieById: (id: string) =>
      tmdb.fetch("/movie/", 3600, "&append_to_response=videos", id.toString()),

    discoverMovies: (query: string): Promise<PaginatedResponse<Movie>> =>
      tmdb.fetch("/discover/movie", 3600, `&${query}`),

    getRecommendations: (id: string | number, query?: string) =>
      tmdb.fetch(`/movie/${id}/recommendations`, 3600, `&${query}`),

    getMovieCredits: (id: string) => tmdb.fetch(`/movie/${id}/credits`, 3600),

    getImages: (id: string) => tmdb.fetch(`/movie/${id}/images`, 3600),
  };
}
