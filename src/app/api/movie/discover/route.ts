import { createMoviesService } from "@/services/tmdb/movies";
import { getCurrentDate } from "@/utils/media";
import { getLocale } from "next-intl/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = await getLocale();
  const genreId = searchParams.get("genreId");
  const pageNumber = Number(searchParams.get("page") ?? "1");
  const moviesService = createMoviesService(locale);
  const data = await moviesService.discoverMovies(
    `with_genres=${genreId}&page=${pageNumber}&sort_by=popularity.desc&primary_release_date.gte=${getCurrentDate()}`,
  );

  return Response.json(data);
}
