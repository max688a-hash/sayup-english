import { describe, it, expect } from 'vitest';
import { WORD_IMAGES } from '@/lib/word-images';

// docs/image-gap-list.md 列出的 110 个缺图词：每个都必须在 App 里能找到对应照片
const GAP_WORDS = 'account agreement allergic apartment appointment arrange athletic automatic band bold borrow brain breath buy celebrate cheap cheek class collect college compare connect cook correct courage deadline delayed delighted desert dessert detail dime discount email evening examine find fun gain gap gun headline help hit hold homework hop housework hurry invite label land late leather live look loose lose love main meal meeting money morning network night older order pain password personal platform principal prize protect quiet quit remember rent repair repeat rest retail return salty sample say scandal see sick sign size spicy stick suit suite sweep sweet talk thick time toffee wash weakness weather weekday weekend word work worry'.split(' ');

describe('word images', () => {
  it('covers all 110 gap words', () => {
    expect(GAP_WORDS).toHaveLength(110);
    expect(GAP_WORDS.filter(w => !WORD_IMAGES[w])).toEqual([]);
  });
  it('keeps confusable pairs on different photos', () => {
    const pairs: [string, string][] = [['desert', 'dessert'], ['suit', 'suite'], ['loose', 'lose'], ['quiet', 'quit'], ['look', 'see']];
    for (const [a, b] of pairs) {
      expect(WORD_IMAGES[a]).not.toBe(WORD_IMAGES[b]);
    }
  });
});
