import Image from "next/image";
import { TvDetails, TvShow } from "@/types/media";
import styles from "./Slide.module.css";
import { getDate, getTitleOrName } from "@/utils/media";
import { getLocale, getTranslations } from "next-intl/server";
import Button from "@/components/layout/Button/button";
import { getPosterUrl } from "@/services/tmdb/images";
import { createTvShowsService } from "@/services/tmdb/shows";
import AddToWatchlistButton from "@/components/layout/Button/AddToWatchlistButton";
interface MovieSlideProps {
  media: TvShow;
  genreMap: Map<number, string>;
}

export default async function TvShowHeroContent({
  media,
  genreMap,
}: MovieSlideProps) {
  const c = await getTranslations("common");
  const genres = media.genre_ids
    .map((id) => genreMap.get(id))
    .filter(Boolean) as string[];

  const year = new Date(getDate(media)).getFullYear();
  const locale = await getLocale();
  const tvShowsService = createTvShowsService(locale);
  const [images, details] = await Promise.all([
    tvShowsService.getImages(media.id),
    tvShowsService.getTvShowDetails(media.id),
  ]);
  const tvDetails = details as TvDetails;
  //   const images = await tvShowsService.getImages(media.id);
  const logo =
    images.logos.find(
      (logo: { iso_639_1: string }) => logo.iso_639_1 === locale,
    ) ??
    images.logos.find((logo: { iso_639_1: string }) => logo.iso_639_1 === "en");
  const seasonsVerbal =
    tvDetails.number_of_seasons > 1 ? c("seasons") : c("season");
  return (
    <div className="p-[5%_5%_20%_5%] md:p-[5%] text-white z-2 w-full md:max-w-[65%]">
      {logo && (
        <Image
          className="h-auto w-auto max-h-20 sm:max-h-20 lg:max-h-24 xl:max-h-32 mb-4"
          // className="pb-8"
          width={500}
          height={200}
          priority
          alt="title image"
          src={getPosterUrl(logo.file_path)}
        ></Image>
        // <Image
        //   className="h-auto w-auto max-h-20 sm:max-h-20 lg:max-h-24 xl:max-h-32 mb-4"
        //   width={logo.width}
        //   height={logo.height}
        //   priority
        //   alt="title image"
        //   src={getPosterUrl(logo.file_path, "w780")}
        // ></Image>
      )}
      {!logo && <h1 className={styles.title}>{getTitleOrName(media)}</h1>}

      <div className={styles.genres} style={{ display: "flex", gap: "16px" }}>
        <span>
          {tvDetails.number_of_seasons} {seasonsVerbal}
        </span>
        <div className="flex gap-2">
          {genres.map((g) => (
            <span key={g}>{g}</span>
          ))}
        </div>

        {/* <span>Rate: {media.vote_average}</span> */}
      </div>

      <p className={styles.description}>{media.overview}</p>

      <div className={styles.actions}>
        <Button variant="primary" fontWeight="700">
          ▶ {c("play")}
        </Button>
        <AddToWatchlistButton
          media={media}
          showText={false}
        ></AddToWatchlistButton>
      </div>
    </div>
  );
}
