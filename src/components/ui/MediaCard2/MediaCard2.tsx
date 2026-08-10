import { Episode, Media, MediaDetails } from "@/types/media";

import styles from "../MediaCard/MediaCard.module.css";
import { getPosterUrl } from "@/services/tmdb/images";
import Link from "next/link";
import { isMovie, isTvShow } from "@/utils/media";
import Image from "next/image";

interface MediaCardProps {
  media: MediaDetails | Media;
  episode?: Episode | null;
}
export default function MediaCard2({ media, episode }: MediaCardProps) {
  let title = "";
  let url = "";
  let description = "";
  let backdropPath = "";
  let query = "";

  if (episode) {
    title = isTvShow(media) ? media.name : episode.name;
    url = `/tvShow/${media.id}`;
    description = `S${episode.season_number} E${episode.episode_number}`;
    backdropPath = episode.still_path || "";
    query = episode.season_number > 1 ? `?season=${episode.season_number}` : "";
  } else if (isMovie(media)) {
    title = media.title;
    url = `/movie/${media.id}`;
    description = media.release_date
      ? String(new Date(media.release_date).getFullYear())
      : "";
    backdropPath = media.backdrop_path || "";
  } else if (isTvShow(media)) {
    title = media.name;
    url = `/tvShow/${media.id}`;
    description = media.first_air_date
      ? String(new Date(media.first_air_date).getFullYear())
      : "";
    backdropPath = media.backdrop_path || "";
  }

  return (
    <Link href={`${url}${query}`} aria-label="my-stuff">
      <div
        className="
        group
        flex
        w-full
        flex-col
        overflow-visible
        text-left
        transition
        hover:bg-zinc-900
      "
      >
        <div
          className="relative aspect-video w-full border-b-2
  border-transparent
  group-hover:border-white/90 transition duration-300"
        >
          <Image
            src={
              backdropPath
                ? getPosterUrl(backdropPath, "w780")
                : "/images/poster-placeholder.webp"
            }
            alt={media.id.toString()}
            fill
            className="object-cover"
          />
          <div className={styles.overlay} />
        </div>

        <div className="py-2">
          <div className=" flex items-center justify-between">
            <h3 className="font-bold text-general-text-mid group-hover:text-white text-sm">
              {title}
            </h3>
          </div>

          <div className="font-light text-sm leading-6 text-general-text-mid group-hover:text-white">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
}
