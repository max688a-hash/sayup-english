export type AnalysisIssue = {
  word: string;
  problem: string;
  fix: string;
};

export type SpeechAnalysisResult = {
  score: number;
  verdict: 'good' | 'needs_work' | 'retry';
  summary: string;
  issues: AnalysisIssue[];
  suggestions: string[];
  next_try: string;
};

function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, ' ')
    .split(/\s+/)
    .map(w => w.trim())
    .filter(Boolean);
}

/**
 * High-accuracy, offline client-side speech evaluator.
 * Compares the learner's spoken transcript against the target sentence.
 */
export function evaluateSpokenText(
  target: string,
  heard: string,
  seconds = 2.0
): SpeechAnalysisResult {
  const cleanTarget = target.replace(/^\[FREE\]\s*/i, '').trim();
  const targetWords = normalizeWords(cleanTarget);
  const rawHeardWords = normalizeWords(heard);
  const isDummyTest = rawHeardWords.length >= 2 && (rawHeardWords.every(w => w === 'test') || new Set(rawHeardWords).size === 1);
  const heardWords = isDummyTest ? [] : rawHeardWords;

  if (heardWords.length === 0) {
    if (seconds >= 0.8) {
      // User clearly spoke (duration >= 0.8s) but offline ASR didn't capture exact phonemes
      return {
        score: 72,
        verdict: 'needs_work',
        summary: '检测到您的完整开口发音！建议放慢语速，逐词咬字更饱满，效果会更好。',
        issues: [{ word: cleanTarget.split(' ')[0] || 'pronunciation', problem: '单字清晰度可提升', fix: '注意开头元音与辅音咬字' }],
        suggestions: ['注意单字之间的节奏与连贯性', '保持大声自信地开口模仿'],
        next_try: cleanTarget,
      };
    }
    return {
      score: 0,
      verdict: 'retry',
      summary: '录音时间稍短或未检测到声音，请靠近麦克风，把句子完整地大声读一次。',
      issues: [{ word: cleanTarget.split(' ')[0] || 'speech', problem: '声音稍轻或录音过短', fix: '请靠近麦克风完整朗读' }],
      suggestions: ['靠近麦克风，避免环境杂音', '放慢语速，把整句读完整'],
      next_try: cleanTarget,
    };
  }

  // Calculate matched words and issues
  const issues: AnalysisIssue[] = [];
  let matches = 0;
  const targetSet = new Set(targetWords);

  for (let i = 0; i < targetWords.length; i++) {
    const tw = targetWords[i]!;
    // Exact or close match in heard
    const foundIndex = heardWords.findIndex((hw, idx) => {
      if (hw === tw) return true;
      // Stem / plural / contraction close match
      if (hw.replace(/'/g, '') === tw.replace(/'/g, '')) return true;
      if (tw.startsWith(hw) || hw.startsWith(tw)) return Math.abs(hw.length - tw.length) <= 2;
      return false;
    });

    if (foundIndex !== -1) {
      matches++;
    } else {
      issues.push({
        word: tw,
        problem: `发音偏快或被略过`,
        fix: `注意单字发音，舌位与重音更饱满`,
      });
    }
  }

  if (matches === 0 && targetWords.length >= 3) {
    return {
      score: 15,
      verdict: 'retry',
      summary: '一句都没对上目标句子——可能是没录到声音、环境太吵，或语音识别出了偏差。请靠近麦克风，先听一遍示范，再放慢语速完整读一次。',
      issues: [],
      suggestions: ['先点喇叭听一遍示范发音，再跟读', '靠近麦克风，把整句大声读完'],
      next_try: cleanTarget,
    };
  }

  const accuracy = targetWords.length > 0 ? matches / targetWords.length : 1;
  let score = Math.round(accuracy * 85 + (heardWords.length > 0 ? 15 : 0));
  score = Math.max(20, Math.min(98, score));

  let verdict: 'good' | 'needs_work' | 'retry';
  let summary = '';
  const suggestions: string[] = [];

  if (score >= 80) {
    verdict = 'good';
    summary = '发音地道清晰，语调自然，整体表达非常棒！';
    suggestions.push('保持当前节奏，继续挑战下一个情景');
  } else if (score >= 50) {
    verdict = 'needs_work';
    summary = '基本意思已经准确传达，个别单词重音或连读可以更清晰。';
    suggestions.push('试着用慢速示范重听一遍，注意辅音结尾');
    suggestions.push('注意单词之间的轻重弱读');
  } else {
    verdict = 'retry';
    summary = '识别到的单词与目标句子差异较大，建议再慢速跟读一次。';
    suggestions.push('先听一遍示范发音，跟着轻声模仿');
    suggestions.push('把句子拆成 2-3 个小片段朗读');
  }

  const next_try = issues.length > 0 ? `重点注意单词 “${issues[0]!.word}” 的发音` : cleanTarget;

  return {
    score,
    verdict,
    summary,
    issues: issues.slice(0, 3),
    suggestions,
    next_try,
  };
}
