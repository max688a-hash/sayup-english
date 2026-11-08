import { describe, expect, it, beforeEach } from 'vitest';
import {
  loadKnownWords,
  saveKnownWords,
  loadGuestMistakes,
  updateGuestMistake,
  calculateRealStats,
} from '@/lib/storage';

describe('Storage & Learning Progress Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists known words independently for adult and kids modes', () => {
    expect(loadKnownWords(false)).toEqual([]);
    expect(loadKnownWords(true)).toEqual([]);

    saveKnownWords(false, ['coffee', 'latte']);
    saveKnownWords(true, ['cat', 'apple']);

    expect(loadKnownWords(false)).toEqual(['coffee', 'latte']);
    expect(loadKnownWords(true)).toEqual(['cat', 'apple']);
  });

  it('records mistakes when score < 60 and removes when retried >= 60', () => {
    updateGuestMistake("I'd like a latte, please.", 45, 'I like latte', 'latte · 发音不准');
    let mistakes = loadGuestMistakes();
    expect(mistakes.length).toBe(1);
    expect(mistakes[0]?.score).toBe(45);

    // Retrying and getting 85 removes it from mistake book
    updateGuestMistake("I'd like a latte, please.", 85, "I'd like a latte please", null);
    mistakes = loadGuestMistakes();
    expect(mistakes.length).toBe(0);
  });

  it('calculates real streak based on practice dates', () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const stats = calculateRealStats([yesterday, today]);
    expect(stats.streak).toBeGreaterThanOrEqual(2);
    expect(stats.todayMinutes).toBeGreaterThanOrEqual(1);
  });
});
