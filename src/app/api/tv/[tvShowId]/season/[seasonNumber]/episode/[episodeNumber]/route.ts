import { createTvShowsService } from "@/services/tmdb/shows";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      tvShowId: string;
      seasonNumber: string;
      episodeNumber: string;
    }>;
  },
) {
  const { tvShowId, seasonNumber, episodeNumber } = await params;

  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "en";

  const tvShowService = createTvShowsService(locale);

  const episodeDetails = await tvShowService.getEpisodeDetails(
    Number(tvShowId),
    Number(seasonNumber),
    Number(episodeNumber),
  );

  return NextResponse.json(episodeDetails);
}
