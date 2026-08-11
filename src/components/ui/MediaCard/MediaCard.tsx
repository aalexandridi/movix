import { Media, MediaDetails } from "@/types/media";

import styles from "./MediaCard.module.css";
import { getPosterUrl } from "@/services/tmdb/images";
import Link from "next/link";
import { getTitleOrName, isMovie } from "@/utils/media";
import PosterImage from "../PosterImage/PosterImage";
import MenuDots from "../EpisodeCard/MenuDots";

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
          {/* <div className="h-full relative overflow-visible"> */}
          <PosterImage
            src={
              media.poster_path
                ? getPosterUrl(media.poster_path, "w500")
                : "/images/poster-placeholder.webp"
            }
            alt={title}
          >
            <div className="bg-card-overlay absolute inset-0" />
            <div className="absolute right-0 top-2">
              <MenuDots media={media} episode={null}></MenuDots>
            </div>
          </PosterImage>
          {/* </div> */}
        </div>
      </article>
    </Link>
  );
}
