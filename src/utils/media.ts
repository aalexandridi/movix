import { Media, Movie, TvShow, Genre } from "@/types/media";

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

export function toGenreMap(genres: Genre[]) {
  return new Map(genres.map((g) => [g.id, g.name]));
}

export function createGenreMaps(genres: Genre[]) {
  const idToName = new Map<number, string>();
  const nameToId = new Map<string, number>();

  for (const g of genres) {
    idToName.set(g.id, g.name);
    nameToId.set(g.name.toLowerCase(), g.id);
  }

  return { idToName, nameToId };
}

// export function sortByPopularity<T extends Media>(media: Array<T>): T[] {
//   return media.sort((a, b) => b.popularity - a.popularity);
// }

export function sortByPopularity<T extends Media>(media: T[]): T[] {
  return [...media].sort((a, b) => b.popularity - a.popularity);
}

export function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}
