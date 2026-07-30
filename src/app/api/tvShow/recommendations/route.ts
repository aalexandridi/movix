import { createTvShowsService } from "@/services/tmdb/shows";
import { getLocale } from "next-intl/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = await getLocale();
  const movieId = searchParams.get("movieId") ?? "1";
  const pageNumber = Number(searchParams.get("page") ?? "1");
  const tvShowService = createTvShowsService(locale);
  const data = await tvShowService.getRecommendations(
    movieId,
    `page=${pageNumber}`,
  );

  return Response.json(data);
}
