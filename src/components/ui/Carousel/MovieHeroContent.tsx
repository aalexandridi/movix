import Image from "next/image";
import { Movie } from "@/types/media";
import styles from "./Slide.module.css";
import { getDate, getTitleOrName } from "@/utils/media";
import { getLocale, getTranslations } from "next-intl/server";
import Button from "@/components/layout/Button/button";
import { createMoviesService } from "@/services/tmdb/movies";
import { getPosterUrl } from "@/services/tmdb/images";
import AddToWatchlistButton from "@/components/layout/Button/AddToWatchlistButton";
interface MovieSlideProps {
  media: Movie;
  genreMap: Map<number, string>;
}

export default async function MovieHeroContent({
  media,
  genreMap,
}: MovieSlideProps) {
  const c = await getTranslations("common");
  const genres = media.genre_ids
    .map((id) => genreMap.get(id))
    .filter(Boolean) as string[];

  const year = new Date(getDate(media)).getFullYear();
  const locale = await getLocale();
  const moviesService = createMoviesService(locale);
  const images = await moviesService.getImages(media.id.toString());
  const logo =
    images.logos.find(
      (logo: { iso_639_1: string }) => logo.iso_639_1 === locale,
    ) ??
    images.logos.find((logo: { iso_639_1: string }) => logo.iso_639_1 === "en");
  return (
    <div className="p-[5%_5%_20%_5%] md:p-[5%] p-[5%] text-white z-2 w-full md:max-w-[65%]">
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
      )}
      {!logo && <h1 className={styles.title}>{getTitleOrName(media)}</h1>}

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
        <AddToWatchlistButton
          media={media}
          showText={false}
          className="gap-0"
        ></AddToWatchlistButton>
      </div>
    </div>
  );
}
