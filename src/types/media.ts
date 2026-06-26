export interface MediaBase {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
}

export interface Movie extends MediaBase {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface TvShow extends MediaBase {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export type Media = Movie | TvShow;

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface WatchlistItem {
  media: Media;
  addedAt: number; // timestamp
}

export interface Genre {
  id: number;
  name: string;
}
