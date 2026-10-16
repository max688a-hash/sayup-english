// @ts-nocheck
// 重音 / 连读节拍训练（B2 跃迁的关键）
// ----------------------------------------------------------
// 英语是「重音节拍语言」（stress-timed），中文是「音节节拍语言」（syllable-timed）。
// 中国学习者最大的瓶颈：把每个音节都念得一样长，结果听起来像机器人。
//
// 数据结构：
//   {
//     id, level: 'A2' | 'B1' | 'B2' | 'C1',
//     en: 完整句子（书面）,
//     spoken: 口语连读后的发音脚本（拼读），用于显示
//     beats: [{ word, stressed: bool, schwa?: bool }]
//       - stressed: 重读 → 大、长、高
//       - schwa: 弱读为 /ə/（the, of, to, a, and...）
//     liaisons: [{ from: idx, to: idx, kind: 'consonant_vowel' | 'samesound' | 'reduction', note }]
//       - 连读规则：辅音+元音 / 同音脱落 / 缩音（wanna, gonna）
//     zh: 中文意思
//   }

export const STRESS_LEVELS = ['A2', 'B1', 'B2', 'C1'];
export const STRESS_LEVEL_LABELS = {
  A2: 'A2 入门节拍',
  B1: 'B1 日常连读',
  B2: 'B2 自然语流',
  C1: 'C1 母语级',
};

const S = (word, opts = {}) => ({ word, stressed: !!opts.s, schwa: !!opts.w });

export const STRESS_DRILLS = [
  // ============ A2：感受重读 vs 弱读 ============
  {
    id: 'a2_001',
    level: 'A2',
    en: 'I want to go to the store.',
    spoken: "I WANna GO to the STORE",
    beats: [
      S('I', { s: false }),
      S('want', { s: true }),
      S('to', { w: true }),
      S('go', { s: true }),
      S('to', { w: true }),
      S('the', { w: true }),
      S('store', { s: true }),
    ],
    liaisons: [
      { from: 1, to: 2, kind: 'reduction', note: 'want to → wanna' },
    ],
    zh: '我想去那家店。',
  },
  {
    id: 'a2_002',
    level: 'A2',
    en: 'What are you doing?',
    spoken: "WHAT-cha DOin'?",
    beats: [
      S('what', { s: true }),
      S('are', { w: true }),
      S('you', { w: true }),
      S('doing', { s: true }),
    ],
    liaisons: [
      { from: 0, to: 2, kind: 'reduction', note: 'what are you → whatcha' },
    ],
    zh: '你在干嘛？',
  },
  {
    id: 'a2_003',
    level: 'A2',
    en: 'I am going to call you.',
    spoken: "I'm GONna CALL you",
    beats: [
      S('I', { w: true }),
      S('am', { w: true }),
      S('going', { s: true }),
      S('to', { w: true }),
      S('call', { s: true }),
      S('you', { w: true }),
    ],
    liaisons: [
      { from: 2, to: 3, kind: 'reduction', note: 'going to → gonna' },
    ],
    zh: '我会给你打电话。',
  },
  {
    id: 'a2_004',
    level: 'A2',
    en: 'Have you got a minute?',
    spoken: "have-ya GOT-a MINute?",
    beats: [
      S('have', { w: true }),
      S('you', { w: true }),
      S('got', { s: true }),
      S('a', { w: true }),
      S('minute', { s: true }),
    ],
    liaisons: [
      { from: 2, to: 3, kind: 'consonant_vowel', note: "got a → 'gotta'" },
    ],
    zh: '你有空吗？',
  },
  {
    id: 'a2_005',
    level: 'A2',
    en: 'Let me know what you think.',
    spoken: "LEMme KNOW whatcha THINK",
    beats: [
      S('let', { w: true }),
      S('me', { w: true }),
      S('know', { s: true }),
      S('what', { s: true }),
      S('you', { w: true }),
      S('think', { s: true }),
    ],
    liaisons: [
      { from: 0, to: 1, kind: 'reduction', note: 'let me → lemme' },
      { from: 3, to: 4, kind: 'reduction', note: 'what you → whatcha' },
    ],
    zh: '告诉我你的想法。',
  },

  // ============ B1：日常对话连读 ============
  {
    id: 'b1_001',
    level: 'B1',
    en: 'Could you give me a hand?',
    spoken: "COULDja GIMme a HAND?",
    beats: [
      S('could', { s: true }),
      S('you', { w: true }),
      S('give', { s: true }),
      S('me', { w: true }),
      S('a', { w: true }),
      S('hand', { s: true }),
    ],
    liaisons: [
      { from: 0, to: 1, kind: 'reduction', note: 'could you → couldja' },
      { from: 2, to: 3, kind: 'reduction', note: 'give me → gimme' },
    ],
    zh: '能帮我个忙吗？',
  },
  {
    id: 'b1_002',
    level: 'B1',
    en: "I don't know what to do.",
    spoken: "I dunno whaTTa DO",
    beats: [
      S('I', { w: true }),
      S('dont', { w: true }),
      S('know', { s: true }),
      S('what', { s: true }),
      S('to', { w: true }),
      S('do', { s: true }),
    ],
    liaisons: [
      { from: 1, to: 2, kind: 'reduction', note: "don't know → dunno" },
      { from: 3, to: 4, kind: 'reduction', note: 'what to → whatta' },
    ],
    zh: '我不知道该怎么办。',
  },
  {
    id: 'b1_003',
    level: 'B1',
    en: 'It is an apple.',
    spoken: "iTS-a-NAPple",
    beats: [
      S('its', { w: true }),
      S('an', { w: true }),
      S('apple', { s: true }),
    ],
    liaisons: [
      { from: 0, to: 1, kind: 'consonant_vowel', note: "it's-an → /ɪtsən/" },
      { from: 1, to: 2, kind: 'consonant_vowel', note: 'an apple → /ə-næpl/（n 接管下一词）' },
    ],
    zh: '这是一个苹果。',
  },
  {
    id: 'b1_004',
    level: 'B1',
    en: 'Do you want to come over?',
    spoken: "D'ya WANna come OVer?",
    beats: [
      S('do', { w: true }),
      S('you', { w: true }),
      S('want', { s: true }),
      S('to', { w: true }),
      S('come', { s: true }),
      S('over', { s: true }),
    ],
    liaisons: [
      { from: 0, to: 1, kind: 'reduction', note: "do you → d'ya / dja" },
      { from: 2, to: 3, kind: 'reduction', note: 'want to → wanna' },
    ],
    zh: '你想过来吗？',
  },
  {
    id: 'b1_005',
    level: 'B1',
    en: "I'll pick you up at eight.",
    spoken: "I'll PICK-jew UP at EIGHT",
    beats: [
      S('Ill', { w: true }),
      S('pick', { s: true }),
      S('you', { w: true }),
      S('up', { s: true }),
      S('at', { w: true }),
      S('eight', { s: true }),
    ],
    liaisons: [
      { from: 1, to: 2, kind: 'consonant_vowel', note: 'pick you → /pɪk-juː/（k+y 软化为 /tʃ/）' },
      { from: 3, to: 4, kind: 'consonant_vowel', note: 'up at → /ʌp-æt/' },
    ],
    zh: '我八点来接你。',
  },
  {
    id: 'b1_006',
    level: 'B1',
    en: 'What did you do last night?',
    spoken: "WHAdjew DO last NIGHT?",
    beats: [
      S('what', { s: true }),
      S('did', { w: true }),
      S('you', { w: true }),
      S('do', { s: true }),
      S('last', { w: true }),
      S('night', { s: true }),
    ],
    liaisons: [
      { from: 0, to: 2, kind: 'reduction', note: 'what did you → whadjew' },
    ],
    zh: '昨晚你做了什么？',
  },

  // ============ B2：自然语流（中国学习者最难） ============
  {
    id: 'b2_001',
    level: 'B2',
    en: "I should have told you earlier.",
    spoken: "I SHOULDa TOLD-jew EARlier",
    beats: [
      S('I', { w: true }),
      S('should', { s: true }),
      S('have', { w: true }),
      S('told', { s: true }),
      S('you', { w: true }),
      S('earlier', { s: true }),
    ],
    liaisons: [
      { from: 1, to: 2, kind: 'reduction', note: "should have → shoulda（不是 'should of'!）" },
      { from: 3, to: 4, kind: 'consonant_vowel', note: 'told you → /toʊl-dʒu/' },
    ],
    zh: '我应该早点告诉你。',
  },
  {
    id: 'b2_002',
    level: 'B2',
    en: 'Could have been worse.',
    spoken: "COULDa-been WORSE",
    beats: [
      S('could', { s: true }),
      S('have', { w: true }),
      S('been', { w: true }),
      S('worse', { s: true }),
    ],
    liaisons: [
      { from: 0, to: 1, kind: 'reduction', note: 'could have → coulda' },
    ],
    zh: '本来可能更糟。',
  },
  {
    id: 'b2_003',
    level: 'B2',
    en: 'I have to admit I was wrong.',
    spoken: "I HAFta adMIT I was WRONG",
    beats: [
      S('I', { w: true }),
      S('have', { s: true }),
      S('to', { w: true }),
      S('admit', { s: true }),
      S('I', { w: true }),
      S('was', { w: true }),
      S('wrong', { s: true }),
    ],
    liaisons: [
      { from: 1, to: 2, kind: 'reduction', note: 'have to → hafta（清化为 /f/）' },
    ],
    zh: '我必须承认我错了。',
  },
  {
    id: 'b2_004',
    level: 'B2',
    en: 'Get out of here!',
    spoken: "geDDouDDa HERE",
    beats: [
      S('get', { s: true }),
      S('out', { s: true }),
      S('of', { w: true }),
      S('here', { s: true }),
    ],
    liaisons: [
      { from: 0, to: 1, kind: 'consonant_vowel', note: 'get out → /ɡɛɾ-aʊt/（t 浊化为 /ɾ/ flap）' },
      { from: 1, to: 2, kind: 'reduction', note: 'out of → outta /aʊɾə/' },
    ],
    zh: '别开玩笑了！',
  },
  {
    id: 'b2_005',
    level: 'B2',
    en: 'A lot of people think so.',
    spoken: "a LOTTa PEOple THINK so",
    beats: [
      S('a', { w: true }),
      S('lot', { s: true }),
      S('of', { w: true }),
      S('people', { s: true }),
      S('think', { s: true }),
      S('so', { w: true }),
    ],
    liaisons: [
      { from: 1, to: 2, kind: 'reduction', note: 'lot of → lotta' },
    ],
    zh: '很多人都这么觉得。',
  },

  // ============ C1：母语级长句 ============
  {
    id: 'c1_001',
    level: 'C1',
    en: 'I would have come if I had known.',
    spoken: "I'da COME if I'da KNOWN",
    beats: [
      S('I', { w: true }),
      S('would', { w: true }),
      S('have', { w: true }),
      S('come', { s: true }),
      S('if', { w: true }),
      S('I', { w: true }),
      S('had', { w: true }),
      S('known', { s: true }),
    ],
    liaisons: [
      { from: 0, to: 2, kind: 'reduction', note: "I would have → I'da /aɪdə/" },
      { from: 5, to: 6, kind: 'reduction', note: "I had → I'da" },
    ],
    zh: '要是我知道就会来了。',
  },
  {
    id: 'c1_002',
    level: 'C1',
    en: "What's the matter with you?",
    spoken: "WHATsa MAtter WITH-ya?",
    beats: [
      S('whats', { s: true }),
      S('the', { w: true }),
      S('matter', { s: true }),
      S('with', { w: true }),
      S('you', { w: true }),
    ],
    liaisons: [
      { from: 0, to: 1, kind: 'reduction', note: "what's the → whatsa" },
      { from: 3, to: 4, kind: 'reduction', note: 'with you → withya' },
    ],
    zh: '你怎么了？',
  },
];

export const getStressDrillsByLevel = (lvl) => STRESS_DRILLS.filter((d) => d.level === lvl);
