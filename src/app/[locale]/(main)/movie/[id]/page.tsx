import Slide from "@/components/ui/Carousel/Slide";
import { createMoviesService } from "@/services/tmdb/movies";
import { Movie, MovieDetails, PaginatedResponse } from "@/types/media";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import MovieDetailsTabs from "./MovieDetailsTabs";
import Carousel from "@/components/ui/Carousel/Carousel";
import { getDetailsHeroData } from "@/services/tmdb/hero";
import DetailsHeroContent from "@/components/ui/Carousel/DetailsHeroContent";
import MediaContainer from "@/components/layout/MediaContainer/MediaContainer";
import MediaGridSkeleton from "@/components/ui/MediaGrid/MediaGridSkeleton";
import { Suspense } from "react";
import { HeroCarousel } from "./HeroCarousel";
import { MovieContentExtra } from "./MovieContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const locale = await getLocale();

  const moviesService = createMoviesService(locale);

  const movie = await moviesService.getDetails(id);

  return {
    title: movie.title,
    description: movie.overview,
  };
}

const MoviePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const [locale, { id }] = await Promise.all([
    getLocale(),
    params,
    getTranslations("common"),
  ]);
  const moviesService = createMoviesService(locale);
  const movieDetails = await moviesService.getDetails(id, "videos");
  return (
    <MediaContainer
      hero={
        <Suspense
          fallback={
            <MediaGridSkeleton
              isHero={true}
              variant="carousel"
              count={10}
              layoutClass="default"
            />
          }
        >
          <HeroCarousel movieDetails={movieDetails} />
        </Suspense>
      }
    >
      <p className="mb-3 -mt-10 flex sm:hidden sm:mt-0">
        {movieDetails.overview}
      </p>

      <div className="flex gap-2 flex sm:hidden mb-8">
        {movieDetails.genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </div>
      <Suspense
        fallback={
          <div className=" h-[400px] w-full animate-pulse  bg-zinc-900/60" />
        }
      >
        <MovieContentExtra
          movieDetails={movieDetails}
          locale={locale}
        ></MovieContentExtra>
      </Suspense>
    </MediaContainer>
  );
};

export default MoviePage;
