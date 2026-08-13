import MovieDetailsHeroContent from "@/components/ui/Carousel/MovieDetailsHeroContent";
import SlideLayout from "@/components/ui/Carousel/SlideLayout";
import { createMoviesService } from "@/services/tmdb/movies";
import { Movie, MovieDetails, PaginatedResponse } from "@/types/media";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import MovieDetailsTabs from "./MovieDetailsTabs";
import MediaHeroLayout from "@/components/layout/MediaHeroLayout/MediaHeroLayout";
import Carousel from "@/components/ui/Carousel/Carousel";

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
  const [locale, { id }] = await Promise.all([getLocale(), params]);
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
  return (
    <MediaHeroLayout
      hero={
        <Carousel>
          <SlideLayout
            key={`slide-${movieDetails.id}`}
            backdropPath={movieDetails.backdrop_path}
            alt={movieDetails.id.toString()}
          >
            <MovieDetailsHeroContent media={movieDetails} />
          </SlideLayout>
        </Carousel>
      }
    >
      <MovieDetailsTabs
        details={movieDetails}
        recommendations={recommendations.results}
        cast={credits.cast}
        crew={credits.crew}
      />
    </MediaHeroLayout>
  );
};

export default MoviePage;
