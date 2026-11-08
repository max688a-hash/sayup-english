import { describe, expect, it } from 'vitest';
import { getMainVocabWords, getVocabByLevel, getKidsVocabWords } from '@/lib/main-vocab';
import { scenes } from '@/lib/speaking-content';

describe('Main 3500+ Corpus Integration', () => {
  it('loads over 3000 authentic vocabulary entries across CEFR tiers', () => {
    const all = getMainVocabWords();
    expect(all.length).toBeGreaterThanOrEqual(3000);

    const a1 = getVocabByLevel('A1');
    expect(a1.length).toBeGreaterThanOrEqual(500);

    const b1 = getVocabByLevel('B1');
    expect(b1.length).toBeGreaterThanOrEqual(500);

    const c1 = getVocabByLevel('C1');
    expect(c1.length).toBeGreaterThanOrEqual(300);
  });

  it('ensures words contain valid phonetic, meaning and levels', () => {
    const all = getMainVocabWords();
    const coffee = all.find(w => w.word.toLowerCase() === 'coffee');
    expect(coffee).toBeDefined();
    expect(coffee?.meaning).toBeDefined();
    expect(coffee?.phonetic).toBeDefined();

    // 严防死守形式主义：核验真实例句挂载，拒绝全量模板字符串
    const realExamples = all.filter(w => w.example && !w.example.startsWith('I practice using the word'));
    expect(realExamples.length).toBeGreaterThanOrEqual(2000);
  });

  it('loads over 200 kids words with emojis and themes', () => {
    const kids = getKidsVocabWords();
    expect(kids.length).toBeGreaterThanOrEqual(200);
    const apple = kids.find(w => w.word.toLowerCase() === 'apple');
    expect(apple).toBeDefined();
    expect(apple?.emoji).toBe('🍎');
  });

  it('ensures dialogues are complete with 6 interactive turns', () => {
    const cafe = scenes.find(s => s.id === 'cafe');
    expect(cafe).toBeDefined();
    expect(cafe?.turns.length).toBe(6);
    expect(cafe?.replies.length).toBe(6);
    expect(cafe?.options.length).toBe(6);
  });
});
