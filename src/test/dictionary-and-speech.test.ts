import { describe, expect, it } from 'vitest';
import { lookupWord, isEnglishWord } from '@/lib/dictionary';
import { evaluateSpokenText } from '@/lib/speech-evaluator';

describe('Dictionary & Word Lookup System', () => {
  it('correctly identifies valid English words vs punctuation and whitespace', () => {
    expect(isEnglishWord('latte')).toBe(true);
    expect(isEnglishWord("I'd")).toBe(true);
    expect(isEnglishWord('coffee,')).toBe(true);
    expect(isEnglishWord('...')).toBe(false);
    expect(isEnglishWord('')).toBe(false);
  });

  it('looks up vocabulary from built-in dictionary with phonetic and Chinese definition', async () => {
    const latte = await lookupWord('latte');
    expect(latte).not.toBeNull();
    expect(latte?.word.toLowerCase()).toBe('latte');
    expect(latte?.meaning).toContain('拿铁');

    const hot = await lookupWord('hot');
    expect(hot).not.toBeNull();
    expect(hot?.meaning).toBeDefined();
  });

  it('handles plural and inflected forms via lemmatization', async () => {
    const cups = await lookupWord('cups');
    expect(cups).not.toBeNull();
    expect(cups?.baseWord?.toLowerCase()).toBe('cup');
  });
});

describe('Speech Recognition & Evaluator Fallback', () => {
  it('evaluates accurate speech correctly with high score', () => {
    const result = evaluateSpokenText("I'd like a latte, please.", "I would like a latte please", 2.5);
    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.verdict).toBe('good');
  });

  it('evaluates completely mismatched speech with retry verdict', () => {
    const result = evaluateSpokenText("Sure! Would you like it hot or iced?", "Something completely different", 1.5);
    expect(result.score).toBeLessThan(60);
    expect(result.verdict).toBe('retry');
  });

  it('handles empty heard text gracefully without crashing', () => {
    const result = evaluateSpokenText("Hello world", "", 0);
    expect(result.score).toBe(0);
    expect(result.verdict).toBe('retry');
    expect(result.issues.length).toBeGreaterThan(0);
  });
});
