import Image from "next/image";
import { TvDetails } from "@/types/media";
import styles from "./Slide.module.css";
import { getLocale, getTranslations } from "next-intl/server";
import Button from "@/components/layout/Button/button";
import { getPosterUrl } from "@/services/tmdb/images";
import { createTvShowsService } from "@/services/tmdb/shows";
import AddToWatchlistButton from "@/components/layout/Button/AddToWatchlistButton";
import TrailerButton from "@/components/layout/Button/TrailerButton";

interface MovieSlideProps {
  media: TvDetails;
}

export default async function TvShowDetailsHeroContent({
  media,
}: MovieSlideProps) {
  const c = await getTranslations("common");
  const genres = media.genres;

  const year = new Date(media.first_air_date).getFullYear();

  const locale = await getLocale();
  const showService = createTvShowsService(locale);
  const images = await showService.getImages(media.id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logo = images.logos.find((logo: any) => logo.iso_639_1 === "en");
  return (
    <div className="p-[5%] text-white z-2 w-full md:max-w-[75%]">
      {logo && (
        <Image
          width={logo.width}
          height={logo.height}
          priority
          alt="title image"
          src={getPosterUrl(logo.file_path, "w500")}
          className="h-auto w-auto max-h-20 sm:max-h-20 lg:max-h-24 xl:max-h-32 mb-4"
        ></Image>
      )}
      {!logo && <h1 className={styles.title}>{media.name}</h1>}

      <div
        className={styles.genres}
        style={{ display: "flex", gap: "16px", marginBottom: " 0.5rem" }}
      >
        <span>{media.number_of_seasons} Seasons</span>
        <span>{year}</span>
      </div>

      <div className="flex flex-col gap-2 mb-2">
        <Button variant="primary" fontWeight="700" className="w-60">
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
      </div>

      <p className={styles.description} style={{ marginBottom: "0.8rem" }}>
        {media.seasons.find((season) => season.season_number === 1)?.overview ||
          media.overview}
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
