import Image from "next/image";
import { Movie, TvDetails, TvShow } from "@/types/media";
import styles from "./Slide.module.css";
import { getDate, getTitleOrName } from "@/utils/media";
import { getLocale, getTranslations } from "next-intl/server";
import Button from "@/components/layout/Button/button";
import Link from "next/link";
import { createMoviesService } from "@/services/tmdb/movies";
import { getPosterUrl } from "@/services/tmdb/images";
import { createTvShowsService } from "@/services/tmdb/shows";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logo = images.logos.find((logo: any) => logo.iso_639_1 === "en");
  return (
    <div className={styles.content}>
      {logo && (
        <Image
          className="h-auto w-auto max-h-20 sm:max-h-20 lg:max-h-24 xl:max-h-32 mb-4"
          width={logo.width}
          height={logo.height}
          priority
          alt="title image"
          src={getPosterUrl(logo.file_path, "w780")}
        ></Image>
      )}
      {!logo && <h1 className={styles.title}>{getTitleOrName(media)}</h1>}

      <div className={styles.genres} style={{ display: "flex", gap: "16px" }}>
        <span>{tvDetails.number_of_seasons} Seasons</span>
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
        <Link href={`/tvShow/${media.id}`}>
          <Button variant="secondary" fontWeight="500">
            {c("moreInfo")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
