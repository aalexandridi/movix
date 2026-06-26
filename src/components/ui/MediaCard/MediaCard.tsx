import Image from "next/image";

import { Media } from "@/types/media";

import styles from "./MediaCard.module.css";
import { getPosterUrl } from "@/services/tmdb/images";
import Link from "next/link";
import { getTitleOrName } from "@/utils/media";
import PosterImage from "../PosterImage/PosterImage";

interface MediaCardProps {
  media: Media;
}

function isMovie(media: Media) {
  return "title" in media;
}

export default function MediaCard({ media }: MediaCardProps) {
  const title = getTitleOrName(media);

  const releaseDate = isMovie(media)
    ? media.release_date
    : media.first_air_date;

  return (
    <Link href={`/movie/${media.id}`} aria-label="my-stuff">
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
          {/* <Image
            src={
              media.poster_path
                ? getPosterUrl(media.poster_path, "w500")
                : "/images/poster-placeholder.webp"
            }
            alt={title}
            fill
            sizes="(max-width: 768px) 45vw, 220px"
          /> */}
        </div>

        {/* <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.meta}>
          <span>⭐ {media.vote_average.toFixed(1)}</span>
          <span>{releaseDate?.slice(0, 4)}</span>
        </div>
      </div> */}
      </article>
    </Link>
  );
}
