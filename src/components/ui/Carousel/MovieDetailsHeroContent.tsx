import Image from "next/image";
import { MovieDetails } from "@/types/media";
import styles from "./Slide.module.css";
import { getLocale, getTranslations } from "next-intl/server";
import Button from "@/components/layout/Button/button";
import { createMoviesService } from "@/services/tmdb/movies";
import { getPosterUrl } from "@/services/tmdb/images";
import AddToWatchlistButton from "@/components/layout/Button/AddToWatchlistButton";
import TrailerButton from "@/components/layout/Button/TrailerButton";
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
  console.log("logo==", logo);
  return (
    <div className="p-[5%] text-white z-2 w-full md:max-w-[75%]">
      {logo !== undefined ? (
        <Image
          className="h-auto w-auto max-h-20 sm:max-h-20 lg:max-h-24 xl:max-h-32 mb-4"
          // className="pb-8"
          width={500}
          height={200}
          priority
          alt="title image1111"
          src={getPosterUrl(logo.file_path)}
        ></Image>
      ) : (
        <h1 className={styles.title}>{media.title}</h1>
      )}
      {/* {!logo && <h1 className={styles.title}>{media.title}</h1>} */}

      <div
        className={styles.genres}
        style={{ display: "flex", gap: "16px", marginBottom: " 0.5rem" }}
      >
        <span>{media.runtime} minutes</span>
        <span>{year}</span>
      </div>

      <div className="flex flex-col gap-2 mb-2">
        <Button
          variant="primary"
          fontWeight="700"
          className="w-full sm:w-80 lg:w-60"
        >
          ▶ {c("watchNow")}
        </Button>
        <div className="flex gap-2">
          <AddToWatchlistButton
            media={media}
            className="w-fit"
            variant="tertiary"
            horizontal={false}
          ></AddToWatchlistButton>
          <TrailerButton
            media={media}
            className="w-fit"
            variant="tertiary"
            horizontal={false}
          ></TrailerButton>
        </div>
        {/* <AddToWatchlistButton media={media}></AddToWatchlistButton> */}
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
