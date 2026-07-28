import Image from "next/image";
import { MovieDetails } from "@/types/media";
import styles from "./Slide.module.css";
import { getLocale, getTranslations } from "next-intl/server";
import Button from "@/components/layout/Button/button";
import { createMoviesService } from "@/services/tmdb/movies";
import { getPosterUrl } from "@/services/tmdb/images";
interface MovieSlideProps {
  media: MovieDetails;
}

export default async function MovieDetailsHeroContent({
  media,
}: MovieSlideProps) {
  const c = await getTranslations("common");
  const genres = media.genres;

  const year = new Date(media.release_date).getFullYear();

  const locale = await getLocale();
  const moviesService = createMoviesService(locale);
  const images = await moviesService.getImages(media.id.toString());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logo = images.logos.find((logo: any) => logo.iso_639_1 === "en");
  return (
    <div className={styles.content}>
      {logo && (
        <Image
          className="pb-8"
          width={500}
          height={200}
          priority
          alt="title image"
          src={getPosterUrl(logo.file_path)}
        ></Image>
      )}
      {!logo && <h1 className={styles.title}>{media.original_title}</h1>}

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
