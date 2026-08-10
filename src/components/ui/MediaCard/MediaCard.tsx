import { Media, MediaDetails } from "@/types/media";

import styles from "./MediaCard.module.css";
import { getPosterUrl } from "@/services/tmdb/images";
import Link from "next/link";
import { getTitleOrName, isMovie } from "@/utils/media";
import PosterImage from "../PosterImage/PosterImage";

interface MediaCardProps {
  media: Media | MediaDetails;
}

export default function MediaCard({ media }: MediaCardProps) {
  const title = getTitleOrName(media);
  const url = isMovie(media) ? /movie/ : /tvShow/;

  return (
    <Link href={`${url}${media.id}`} aria-label="my-stuff">
      <article className={styles.card}>
        <div className={styles.poster}>
          <PosterImage
            src={
              media.poster_path
                ? getPosterUrl(media.poster_path, "w500")
                : "/images/poster-placeholder.webp"
            }
            alt={title}
          ></PosterImage>
        </div>
      </article>
    </Link>
  );
}
