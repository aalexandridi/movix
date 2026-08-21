// services/tmdb/hero.ts

import { getDate, isTvShow } from "@/utils/media";
import { createMoviesService } from "./movies";
import { createTvShowsService } from "./shows";
import {
  Media,
  MediaDetails,
  Movie,
  MovieDetails,
  TvDetails,
  TvShow,
} from "@/types/media";
import { getTranslations } from "next-intl/server";

export interface HeroData {
  media: Media;
  logoPath?: string;
  genres: string[];
  year: number;
  seasons?: number;
  seasonLabel?: string;
  isTv: boolean;
}

export type DetailsHeroData = {
  media: MediaDetails;
  logoPath?: string;
  posterPath?: string;

  duration: number;
  durationLabel: string;
  year: number;

  genres: {
    id: number;
    name: string;
  }[];

  description: string;
};

export async function getMovieHeroData(
  media: Movie,
  genreMap: Map<number, string>,
  locale: string,
) {
  const moviesService = createMoviesService(locale);

  const images = await moviesService.getImages(media.id.toString());

  const logo =
    images.logos.find(
      (logo: { iso_639_1: string }) => logo.iso_639_1 === locale,
    ) ??
    images.logos.find((logo: { iso_639_1: string }) => logo.iso_639_1 === "en");

  return {
    media,
    logoPath: logo?.file_path,
    genres: media.genre_ids
      .map((id) => genreMap.get(id))
      .filter(Boolean) as string[],
    year: new Date(getDate(media)).getFullYear(),
    isTv: false,
  };
}

export async function getTvHeroData(
  media: TvShow,
  genreMap: Map<number, string>,
  locale: string,
) {
  const c = await getTranslations("common");
  const tvService = createTvShowsService(locale);

  const [images, details] = await Promise.all([
    tvService.getImages(media.id),
    tvService.getTvShowDetails(media.id),
  ]);

  const tvDetails = details as TvDetails;

  const logo =
    images.logos.find(
      (logo: { iso_639_1: string }) => logo.iso_639_1 === locale,
    ) ??
    images.logos.find((logo: { iso_639_1: string }) => logo.iso_639_1 === "en");

  return {
    media,
    logoPath: logo?.file_path,
    genres: media.genre_ids
      .map((id) => genreMap.get(id))
      .filter(Boolean) as string[],
    year: new Date(getDate(media)).getFullYear(),
    seasons: tvDetails.number_of_seasons,
    seasonLabel: tvDetails.number_of_seasons === 1 ? c("season") : c("seasons"),
    isTv: true,
  };
}

export async function getHeroData(
  media: Media,
  genreMap: Map<number, string>,
  locale: string,
): Promise<HeroData> {
  if (isTvShow(media)) {
    return getTvHeroData(media, genreMap, locale);
  }

  return getMovieHeroData(media, genreMap, locale);
}

export async function getMovieDetailsHeroData(
  media: MovieDetails,
  locale: string,
): Promise<DetailsHeroData> {
  const c = await getTranslations("common");
  const moviesService = createMoviesService(locale);

  const images = await moviesService.getImages(media.id.toString());

  const logo =
    images.logos.find(
      (logo: { iso_639_1: string }) => logo.iso_639_1 === locale,
    ) ??
    images.logos.find((logo: { iso_639_1: string }) => logo.iso_639_1 === "en");

  return {
    media,
    logoPath: logo?.file_path,
    posterPath: media.poster_path ?? "",
    duration: media.runtime ?? 0,
    durationLabel: c("minutes"),
    year: new Date(media.release_date).getFullYear(),
    genres: media.genres,
    description: media.overview,
  };
}

export async function getTvDetailsHeroData(
  media: TvDetails,
  locale: string,
): Promise<DetailsHeroData> {
  const c = await getTranslations("common");
  const tvService = createTvShowsService(locale);

  const images = await tvService.getImages(media.id);

  const logo =
    images.logos.find(
      (logo: { iso_639_1: string }) => logo.iso_639_1 === locale,
    ) ??
    images.logos.find((logo: { iso_639_1: string }) => logo.iso_639_1 === "en");

  return {
    media,
    logoPath: logo?.file_path,
    posterPath: media.poster_path ?? "",
    duration: media.number_of_seasons,
    durationLabel: media.number_of_seasons === 1 ? c("season") : c("seasons"),
    year: new Date(media.first_air_date).getFullYear(),
    genres: media.genres,
    description:
      media.seasons.find((season) => season.season_number === 1)?.overview ??
      media.overview,
  };
}

export async function getDetailsHeroData(
  media: MediaDetails,
  locale: string,
): Promise<DetailsHeroData> {
  const isTv = isTvShow(media);

  if (isTv) {
    return getTvDetailsHeroData(media, locale);
  }

  return getMovieDetailsHeroData(media, locale);
}
