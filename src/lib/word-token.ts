/** Pure token cleanup; no dictionary or lesson data needed for sentence rendering. */
export function cleanWordToken(raw: string): string {
  return raw.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/gi, '').trim();
}