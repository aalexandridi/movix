import "server-only";

function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing env: ${key}`);
  }

  return value;
}

export const tmdbConfig = Object.freeze({
  apiKey: getEnv("TMDB_API_KEY"),
  apiToken: getEnv("TMDB_API_TOKEN"),
  baseUrl: getEnv("TMDB_BASE_URL"),
});
