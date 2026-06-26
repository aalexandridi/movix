import Image from "next/image";
import { Media } from "@/types/media";
import styles from "./Slide.module.css";
import { getDate, getTitleOrName } from "@/utils/media";
import { getTranslations } from "next-intl/server";
import Button from "@/components/layout/Button/button";
import { getPosterUrl } from "@/services/tmdb/images";
// import { createMoviesService } from "@/services/tmdb/movies";
// import { getLocale } from "next-intl/server";
interface MediaSlideProps {
  media: Media;
  genreMap: Map<number, string>;
}

export default async function Slide({ media, genreMap }: MediaSlideProps) {
  const c = await getTranslations("common");
  const genres = media.genre_ids
    .map((id) => genreMap.get(id))
    .filter(Boolean) as string[];

  const year = new Date(getDate(media)).getFullYear();

  return (
    <div className={styles.slide}>
      {/* Background image */}
      <Image
        src={getPosterUrl(media.backdrop_path)}
        alt={getTitleOrName(media)}
        fill
        priority
        className={styles.image}
      />

      {/* Dark cinematic gradient */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>{getTitleOrName(media)}</h1>

        <div className={styles.genres} style={{ display: "flex", gap: "8px" }}>
          <span>{year}</span>
          {genres.map((g) => (
            <span key={g}>{g}</span>
          ))}
          {/* <span>Rate: {media.vote_average}</span> */}
        </div>

        <p className={styles.description}>{media.overview}</p>

        <div className={styles.actions}>
          <Button variant="primary" fontWeight="700">
            ▶ {c("play")}
          </Button>
          <Button variant="secondary" fontWeight="500">
            {c("moreInfo")}
          </Button>
        </div>
      </div>
    </div>
  );
}
