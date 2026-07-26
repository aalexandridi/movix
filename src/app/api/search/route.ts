// import { createSearchService } from "";
import { createMultiService } from "@/services/tmdb/multi";
import { getLocale } from "next-intl/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query")?.trim();
  console.log("api query==", query);
  const pageNumber = Number(searchParams.get("page") ?? "1");

  if (!query) {
    return Response.json({ results: [] });
  }

  const locale = await getLocale();
  const service = createMultiService(locale);

  const data = await service.searchMedia(query, `page=${pageNumber}`);

  return Response.json(data);
}
