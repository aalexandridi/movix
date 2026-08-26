import { createMoviesService } from "@/services/tmdb/movies";
import { Movie, MovieDetails, PaginatedResponse } from "@/types/media";
import MovieDetailsTabs from "./MovieDetailsTabs";

export const MovieContentExtra = async ({
  movieDetails,
  locale,
}: {
  movieDetails: MovieDetails;
  locale: string;
}) => {
  const moviesService = createMoviesService(locale);
  const [recommendations, credits]: [
    PaginatedResponse<Movie>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
  ] = await Promise.all([
    moviesService.getRecommendations(movieDetails.id),
    moviesService.getMovieCredits(movieDetails.id),
  ]);
  return (
    <MovieDetailsTabs
      details={movieDetails}
      recommendations={recommendations.results}
      cast={credits.cast}
      crew={credits.crew}
    />
  );
};
