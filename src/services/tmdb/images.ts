const IMAGE_BASE = "https://image.tmdb.org/t/p";
export function getPosterUrl(
  path: string | null,
  size: "w185" | "w342" | "w500" | "w780" | "original" = "original",
) {
  if (!path) return "/images/poster-placeholder.png";

  return `${IMAGE_BASE}/${size}${path}`;
}
