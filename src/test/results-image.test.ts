import { afterEach, describe, expect, it, vi } from 'vitest';
import { createResultsImage } from '@/lib/results-image';

afterEach(() => vi.restoreAllMocks());
describe('Private results image', () => {
  it('exports 1080 by 1920 summary only, excluding account and speech fields', async () => {
    const labels: string[] = [];
    const ctx = { fillRect: vi.fn(), fillText: (text: string) => labels.push(text), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), stroke: vi.fn(), arc: vi.fn(), fill: vi.fn() };
    Object.defineProperty(document, 'fonts', { configurable: true, value: { ready: Promise.resolve() } });
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx as unknown as CanvasRenderingContext2D);
    let size: number[] = [];
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (this: HTMLCanvasElement, cb) {
      size = [this.width, this.height]; cb(new Blob(['png'], { type: 'image/png' }));
    });
    const data = { from: '2026-10-01', to: '2026-10-18', count: 3, average: 80, days: ['2026-10-18'], trend: [{ day: '2026-10-18', score: 80, count: 3 }], email: 'private@example.com', heard: 'private transcript', userId: 'secret-user' };
    const blob = await createResultsImage(data, document.createElement('div'));
    expect(size).toEqual([1080, 1920]);
    expect(blob.type).toBe('image/png');
    expect(labels).toContain('80');
    expect(labels.join(' ')).not.toContain(data.email);
    expect(labels.join(' ')).not.toContain(data.heard);
    expect(labels.join(' ')).not.toContain(data.userId);
    expect(labels).toContain('本次暂无录音波形');
  });
});