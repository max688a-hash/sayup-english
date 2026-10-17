import { describe, expect, it } from 'vitest';
import { summarizePractice, waveformPeaks } from '@/lib/learning-results';

describe('Real learning results', () => {
  it('does not invent a score when there is no recorded speech', () => {
    expect(summarizePractice([{ id: 'silent', score: 99, heard: '', created_at: '2026-10-17T10:00:00Z' }])).toEqual({ count: 0, average: null, trend: [] });
  });
  it('calculates daily averages from actual scores without implying improvement', () => {
    const result = summarizePractice([
      { id: 'a', score: 90, heard: 'hello', created_at: '2026-10-16T09:00:00Z' },
      { id: 'b', score: 70, heard: 'hello again', created_at: '2026-10-16T10:00:00Z' },
      { id: 'c', score: 60, heard: 'goodbye', created_at: '2026-10-17T10:00:00Z' },
    ]);
    expect(result.average).toBe(73);
    expect(result.trend.map(x => x.score)).toEqual([80, 60]);
  });
  it('derives the waveform only from microphone samples', () => {
    expect(waveformPeaks([new Float32Array([0, -0.5, 0.25, 1])], 2)).toEqual([0.5, 1]);
    expect(waveformPeaks([])).toEqual([]);
    expect(waveformPeaks([new Float32Array(4)], 2)).toEqual([0, 0]);
  });
});