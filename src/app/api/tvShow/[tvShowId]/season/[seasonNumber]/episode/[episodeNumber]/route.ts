import { createTvShowsService } from "@/services/tmdb/shows";
import { getLocale } from "next-intl/server";
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
  const locale = await getLocale();
  const tvShowService = createTvShowsService(locale);

  const episodeDetails = await tvShowService.getEpisodeDetails(
    Number(tvShowId),
    Number(seasonNumber),
    Number(episodeNumber),
  );

  return NextResponse.json(episodeDetails);
}
