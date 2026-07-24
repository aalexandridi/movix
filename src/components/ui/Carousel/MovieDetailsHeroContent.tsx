import Image from "next/image";
import { Media, Movie, MovieDetails } from "@/types/media";
import styles from "./Slide.module.css";
import { getDate, getTitleOrName } from "@/utils/media";
import { getTranslations } from "next-intl/server";
import Button from "@/components/layout/Button/button";
// import { createMoviesService } from "@/services/tmdb/movies";
// import { getLocale } from "next-intl/server";
interface MovieSlideProps {
  media: MovieDetails;
}

export default async function MovieHeroContent({ media }: MovieSlideProps) {
  const c = await getTranslations("common");
  const genres = media.genres;

  const year = new Date(media.release_date).getFullYear();

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{media.original_title}</h1>

      <div
        className={styles.genres}
        style={{ display: "flex", gap: "16px", marginBottom: " 0.5rem" }}
      >
        <span>{media.runtime} minutes</span>
        <span>{year}</span>
      </div>

      <div className={styles.actions} style={{ marginBottom: "1.5rem" }}>
        <Button variant="primary" fontWeight="700">
          ▶ {c("watchNow")}
        </Button>
      </div>

      <p className={styles.description} style={{ marginBottom: "0.8rem" }}>
        {media.overview}
      </p>
      <div className={styles.genres} style={{ display: "flex", gap: "8px" }}>
        {genres.map((g) => (
          <span key={g.id}>{g.name}</span>
        ))}
        {/* <span>Rate: {media.vote_average}</span> */}
      </div>
    </div>
  );
}
