import { Media, Movie, TvShow } from "@/types/media";

export function isMovie(media: Media): media is Movie {
  return "title" in media;
}

export function isTvShow(media: Media): media is TvShow {
  return "name" in media;
}

export function getTitleOrName(media: Media): string {
  return isMovie(media) ? media.title : media.name;
}

export function getDate(media: Media): string {
  return isMovie(media) ? media.release_date : media.first_air_date;
}

export function toGenreMap(genres: { id: number; name: string }[]) {
  return new Map(genres.map((g) => [g.id, g.name]));
}

export function sortByPopularity(media: Array<Media>) {
  return media.sort((a, b) => b.popularity - a.popularity);
}
