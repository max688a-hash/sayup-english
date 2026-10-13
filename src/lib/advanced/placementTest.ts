// @ts-nocheck
// Ported from screens/PlacementTest.js
export const QUESTIONS = [
  {
    tier: 'a1',
    prompt: 'Choose the correct word: "I ___ a student."',
    options: ['am', 'is', 'are', 'be'],
  },
  {
    tier: 'a1',
    prompt: 'What does "apple" mean?',
    options: ['苹果', '香蕉', '橙子', '葡萄'],
  },
  {
    tier: 'a2',
    prompt: '"How ___ is this T-shirt?" — Choose the correct word for asking price.',
    options: ['much', 'many', 'old', 'far'],
  },
  {
    tier: 'a2',
    prompt: 'Which is the opposite of "cheap"?',
    options: ['expensive', 'small', 'heavy', 'fast'],
  },
  {
    tier: 'b1',
    prompt: 'Choose the correct word: "I would ___ you to take the early flight."',
    options: ['advise', 'advice', 'advisable', 'adviser'],
  },
  {
    tier: 'b1',
    prompt: '"Take a deep ___ and relax." Which word fits?',
    options: ['breath', 'breathe', 'breathing', 'breathed'],
  },
  {
    tier: 'b2',
    prompt: 'Climate change will ___ every aspect of our lives.',
    options: ['affect', 'effect', 'effective', 'affection'],
  },
  {
    tier: 'b2',
    prompt: 'Which word means "to evaluate"?',
    options: ['assess', 'access', 'excess', 'assert'],
  },
  {
    tier: 'c1',
    prompt: 'She received a sincere ___ on her presentation.',
    options: ['compliment', 'complement', 'complainer', 'compilation'],
  },
  {
    tier: 'c1',
    prompt: 'Which word means "about to happen"?',
    options: ['imminent', 'eminent', 'immanent', 'immediate'],
  },
];
export function recommendTier(correctByTier) {
  // correctByTier 形如 { a1: 2, a2: 2, b1: 2, b2: 2, c1: 2 } 每档最多 2 题
  // 策略：从高到低找到第一个 "该档全对 且 之前各档也都及格" 的档位
  const order = ['a1', 'a2', 'b1', 'b2', 'c1'];
  const pass = {};
  for (const t of order) pass[t] = (correctByTier[t] || 0) >= 2; // 该档 2/2 才通过

  // 找到最高通过档
  let highest = null;
  for (const t of order) if (pass[t]) highest = t;
  if (!highest) {
    // A1 都没全对 → 推荐 kids 或 a1
    const a1 = correctByTier.a1 || 0;
    return a1 >= 1 ? 'a1' : 'kids';
  }
  // 推荐下一档
  const idx = order.indexOf(highest);
  return idx < order.length - 1 ? order[idx + 1] : 'c1';
}
