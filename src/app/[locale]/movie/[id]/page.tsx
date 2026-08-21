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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const locale = await getLocale();

  const moviesService = createMoviesService(locale);

  const movie = await moviesService.getMovieById(id);

  return {
    title: movie.title,
    description: movie.overview,
  };
}

const MoviePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const [locale, { id }, c] = await Promise.all([
    getLocale(),
    params,
    getTranslations("common"),
  ]);
  const moviesService = createMoviesService(locale);
  const [movieDetails, recommendations, credits]: [
    MovieDetails,
    PaginatedResponse<Movie>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
  ] = await Promise.all([
    moviesService.getMovieById(id),
    moviesService.getRecommendations(id),
    moviesService.getMovieCredits(id),
  ]);
  const heroData = await getDetailsHeroData(movieDetails, locale);
  return (
    <MediaContainer
      hero={
        <Carousel>
          <Slide
            key={`slide-${movieDetails.id}`}
            backdropPath={movieDetails.backdrop_path}
            alt={movieDetails.id.toString()}
          >
            <DetailsHeroContent data={heroData} />
          </Slide>
        </Carousel>
      }
    >
      <p className="mb-3 -mt-10 flex sm:hidden sm:mt-0">
        {heroData.description}
      </p>

      <div className="flex gap-2 flex sm:hidden mb-8">
        {heroData.genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </div>
      <MovieDetailsTabs
        details={movieDetails}
        recommendations={recommendations.results}
        cast={credits.cast}
        crew={credits.crew}
      />
    </MediaContainer>
  );
};

export default MoviePage;
