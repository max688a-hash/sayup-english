export type ScoredPractice = { id: string; score: number; heard: string; created_at: string };

export function summarizePractice(records: ScoredPractice[]) {
  const valid = records.filter(r => r.heard.trim() && Number.isFinite(r.score) && r.score >= 0 && r.score <= 100 && Number.isFinite(Date.parse(r.created_at)));
  const daily = new Map<string, { sum: number; count: number }>();
  for (const r of valid) {
    const day = r.created_at.slice(0, 10);
    const previous = daily.get(day) ?? { sum: 0, count: 0 };
    daily.set(day, { sum: previous.sum + r.score, count: previous.count + 1 });
  }
  return {
    count: valid.length,
    average: valid.length ? Math.round(valid.reduce((sum, r) => sum + r.score, 0) / valid.length) : null,
    trend: [...daily].sort(([a], [b]) => a.localeCompare(b)).map(([day, value]) => ({ day, score: Math.round(value.sum / value.count), count: value.count })),
  };
}

/** Peak amplitudes only; never keeps audio samples or speech content. */
export function waveformPeaks(chunks: readonly Float32Array[], bins = 80): number[] {
  const length = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  if (!length) return [];
  const result = Array.from({ length: Math.min(bins, length) }, () => 0);
  let offset = 0;
  for (const chunk of chunks) for (const sample of chunk) {
    const bin = Math.min(result.length - 1, Math.floor(offset++ * result.length / length));
    result[bin] = Math.max(result[bin] ?? 0, Math.min(1, Math.abs(sample)));
  }
  return result;
}