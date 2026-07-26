import { createMoviesService } from "@/services/tmdb/movies";
import { getLocale } from "next-intl/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = await getLocale();
  const movieId = searchParams.get("movieId") ?? "1";
  const pageNumber = Number(searchParams.get("page") ?? "1");
  const moviesService = createMoviesService(locale);
  const data = await moviesService.getMovieRecommendations(
    movieId,
    `page=${pageNumber}`,
  );

  return Response.json(data);
}
