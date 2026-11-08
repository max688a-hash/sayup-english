import { VOCAB_THEMES } from '@/lib/advanced/vocabCorpus';
import { VOCAB_THEMES_2 } from '@/lib/advanced/vocabCorpus2';
import { VOCAB_THEMES_3 } from '@/lib/advanced/vocabCorpus3';
import { VOCAB_THEMES_4 } from '@/lib/advanced/vocabCorpus4';
import { VOCAB_THEMES_5 } from '@/lib/advanced/vocabCorpus5';
import { WORD_IPA } from '@/lib/advanced/wordIPA';
import { KIDS_SETS } from '@/lib/advanced/kidsSets';
import { VOCAB_EXAMPLES_A2_REVIEWED } from '@/lib/advanced/vocabExamples_a2_reviewed';
import { VOCAB_EXAMPLES_B1_REVIEWED } from '@/lib/advanced/vocabExamples_b1_reviewed';
import { VOCAB_EXAMPLES_B2_REVIEWED } from '@/lib/advanced/vocabExamples_b2_reviewed';
import { VOCAB_EXAMPLES_C1_REVIEWED } from '@/lib/advanced/vocabExamples_c1_reviewed';
import type { Word } from '@/lib/speaking-content';

export type MainVocabWord = Word & {
  theme?: string;
  themeZh?: string;
  emoji?: string;
};

// 汇聚已复审的真实地道例句库 (2142 条高质量例句)
const REVIEWED_EXAMPLES: Record<string, { ex: string; exZh?: string }> = {
  ...(VOCAB_EXAMPLES_A2_REVIEWED as Record<string, { ex: string; exZh?: string }>),
  ...(VOCAB_EXAMPLES_B1_REVIEWED as Record<string, { ex: string; exZh?: string }>),
  ...(VOCAB_EXAMPLES_B2_REVIEWED as Record<string, { ex: string; exZh?: string }>),
  ...(VOCAB_EXAMPLES_C1_REVIEWED as Record<string, { ex: string; exZh?: string }>),
};

// 预先聚合 3500+ 分级主词库
const ALL_THEMES = [
  ...VOCAB_THEMES,
  ...VOCAB_THEMES_2,
  ...VOCAB_THEMES_3,
  ...VOCAB_THEMES_4,
  ...VOCAB_THEMES_5,
];

const cachedWords: MainVocabWord[] = [];
const seenWords = new Set<string>();

for (const theme of ALL_THEMES) {
  const lvl = ((theme.level || 'a1').toUpperCase()) as 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  if (!theme.words) continue;

  for (const item of theme.words) {
    const w = item.w.trim();
    if (!w) continue;
    const lower = w.toLowerCase();
    if (seenWords.has(lower)) continue;
    seenWords.add(lower);

    // 音标优先匹配 WORD_IPA，若无则使用标准拼音占位
    const ipa = (WORD_IPA as Record<string, string>)[lower] || `/${lower}/`;

    // 优先匹配经过复审的真实语料例句，若无可回退到情景造句
    const reviewed = REVIEWED_EXAMPLES[lower] || REVIEWED_EXAMPLES[w];
    const exampleSentence = reviewed?.ex || `I practice using the word "${w}" every day.`;

    cachedWords.push({
      word: w,
      phonetic: ipa,
      meaning: item.z || '日常常用单词',
      example: exampleSentence,
      level: lvl,
      theme: theme.theme,
      themeZh: theme.themeZh,
      emoji: theme.emoji,
    });
  }
}

/**
 * 获取全量 3500 词库
 */
export function getMainVocabWords(): MainVocabWord[] {
  return cachedWords;
}

// 缓存儿童模式 220+ 绘本词库
let cachedKidsWords: MainVocabWord[] | null = null;

/**
 * 获取儿童模式 220+ 绘本与生活词汇
 */
export function getKidsVocabWords(): MainVocabWord[] {
  if (cachedKidsWords) return cachedKidsWords;
  const list: MainVocabWord[] = [];
  const seen = new Set<string>();

  if (Array.isArray(KIDS_SETS)) {
    for (const set of KIDS_SETS) {
      if (!set.items) continue;
      for (const item of set.items) {
        const w = (item.word || '').trim();
        if (!w) continue;
        const lower = w.toLowerCase();
        if (seen.has(lower)) continue;
        seen.add(lower);

        const ipa = (WORD_IPA as Record<string, string>)[lower] || `/${lower}/`;
        list.push({
          word: w,
          phonetic: ipa,
          meaning: item.zh || '基础词汇',
          example: set.scenes?.[0]?.en || `Look at the cute ${w}!`,
          level: 'A1',
          theme: set.theme,
          themeZh: set.themeZh,
          emoji: item.emoji,
        });
      }
    }
  }

  cachedKidsWords = list;
  return cachedKidsWords;
}

/**
 * 按 CEFR 等级筛选词汇
 */
export function getVocabByLevel(level: string): MainVocabWord[] {
  if (!level || level === '全部') return cachedWords;
  return cachedWords.filter(w => w.level.toUpperCase() === level.toUpperCase());
}
