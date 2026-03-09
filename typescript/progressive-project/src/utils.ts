export function groupBy<T, K extends keyof T>(
  items: T[],
  key: K,
): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      const k = String(item[key]);
      acc[k] ??= [];
      acc[k].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}
