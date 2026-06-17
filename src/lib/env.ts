function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env: ${key}`);
  return value;
}

export const tmdbConfig = Object.freeze({
  apiKey: getEnv("NEXT_PUBLIC_TMDB_API_KEY"),
  apiToken: getEnv("NEXT_PUBLIC_TMDB_API_TOKEN"),
  baseUrl: getEnv("NEXT_PUBLIC_TMDB_BASE_URL"),
});
