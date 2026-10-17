import { describe, it, expect } from 'vitest';
import { canEmbed } from '@/components/in-app-browser';
import { getAllResources } from '@/lib/advanced/externalResources';

describe('外链在 App 内的打开方式', () => {
  it('YouTube、TED 等拒绝嵌入的网站不放进页内框（避免「拒绝连线」空白页）', () => {
    for (const u of ['https://www.youtube.com/@engvid', 'https://www.ted.com/talks', 'https://ed.ted.com/', 'https://www.engvid.com/', 'https://www.speakenglishwithvanessa.com/', 'https://learnenglish.britishcouncil.org/']) expect(canEmbed(u)).toBe(false);
  });
  it('实测可嵌入的网站在页内显示', () => {
    expect(canEmbed('https://www.bbc.co.uk/learningenglish')).toBe(true);
    expect(canEmbed('https://www.gutenberg.org/')).toBe(true);
  });
  it('资源 id 不重复', () => {
    const ids = getAllResources().map((r: { id: string }) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
