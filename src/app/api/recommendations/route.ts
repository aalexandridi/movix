// app/api/recommendations/route.ts

import { createRecommendationService } from "@/services/tmdb/recommendation";
import { getLocale } from "next-intl/server";

export async function POST(req: Request) {
  const { watchlist } = await req.json();

  if (!watchlist?.length) {
    return Response.json([]);
  }

  const locale = await getLocale();

  const service = createRecommendationService(locale);

  const recommendations = await service.getRecommendations(watchlist, 10);

  return Response.json(recommendations);
}
