// utils/mediaCard.ts

import { Episode, Media, MediaDetails, TvDetails } from "@/types/media";
import { getTitleOrName, isMovie, isTvShow } from "./media";

export type MediaCardData = {
  title: string;
  subtitle?: string;
  description?: string;
  imagePath?: string;
  href: string;
  menuMedia: MediaDetails | Media;
  episode?: Episode;
  airDate?: string;
};

export function getMediaCardData(
  media: MediaDetails | Media,
  episode?: Episode | null,
  insideShow: boolean = false,
): MediaCardData {
  if (episode) {
    return {
      title: insideShow
        ? `E${episode.episode_number}: ${episode.name}`
        : getTitleOrName(media),
      subtitle: !insideShow
        ? `S${episode.season_number} E${episode.episode_number}: ${episode.name}`
        : episode.runtime != null
          ? `${episode.runtime} min`
          : undefined,
      description: insideShow ? episode.overview : "",
      imagePath: episode.still_path ?? undefined,
      href: `/tvShow/${media.id}${
        episode.season_number > 1 ? `?season=${episode.season_number}` : ""
      }`,
      menuMedia: media,
      episode,
      airDate: String(new Date(episode.air_date).getFullYear()),
    };
  }

  if (isMovie(media)) {
    return {
      title: media.title,
      subtitle: media.release_date
        ? String(new Date(media.release_date).getFullYear())
        : undefined,
      imagePath: media.backdrop_path ?? undefined,
      href: `/movie/${media.id}`,
      menuMedia: media,
    };
  }

  if (isTvShow(media)) {
    return {
      title: media.name,
      subtitle: media.first_air_date
        ? String(new Date(media.first_air_date).getFullYear())
        : undefined,
      imagePath: media.backdrop_path ?? undefined,
      href: `/tvShow/${media.id}`,
      menuMedia: media,
    };
  }

  throw new Error("Unsupported media type");
}
