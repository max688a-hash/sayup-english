import DICT from '@/lib/content-i18n.json';
import type { Lang } from '@/lib/i18n';

// Current learner language for content pages (course, stories, pronunciation coach).
// SpeakingApp sets it and remounts content on change; Chinese text is the lookup key.
let current: Lang = 'zh';
export function setContentLang(l: Lang) { current = l; }
export function getContentLang() { return current; }

const maps = DICT as unknown as Record<'vi' | 'ja', Record<string, string>>;
export function tr(zh: string | null | undefined, ...args: unknown[]): string {
  if (zh == null) return '';
  const base = current === 'zh' ? zh : (maps[current]?.[zh] ?? zh);
  return args.length ? base.replace(/\{(\d+)\}/g, (_, i) => String(args[Number(i)] ?? '')) : base;
}
