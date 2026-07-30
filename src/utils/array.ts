import { CrewMember, Media } from "@/types/media";

export function limitItems<T>(items: T[], limit: number = 3) {
  if (!Array.isArray(items)) return [];
  return items.slice(0, limit);
}

export function mergeArrays<T, U>(a: T[], b: U[]): Array<T | U> {
  return [...a, ...b];
}

export function limitAndMergeArrays<T>(
  limit: number = 3,
  ...arrays: T[][]
): T[] {
  return arrays.flatMap((array) => limitItems(array, limit));
}

export function limitAndMergeUniqueById<T extends Media>(
  limit: number,
  ...arrays: T[][]
): T[] {
  const seen = new Set<number>();
  const result: T[] = [];

  for (const array of arrays) {
    let added = 0;

    for (const item of array) {
      if (seen.has(item.id)) continue;

      seen.add(item.id);
      result.push(item);
      added++;

      if (added === limit) break;
    }
  }

  return result;
}

export function uniqueNamesByJob(crew: CrewMember[], jobs: string[]) {
  return [
    ...new Map(
      crew.filter((c) => jobs.includes(c.job)).map((c) => [c.id, c.name]),
    ).values(),
  ];
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]; // don't mutate original

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
