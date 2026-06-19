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
