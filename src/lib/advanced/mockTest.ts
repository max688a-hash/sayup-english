// @ts-nocheck
// 迷你模拟考 · M6
// ----------------------------------------------------------------------------
// 诚实声明：
//   压缩卷，不是完整 2h45 真题。顺序仍是 L→R→W→S。
//   听力复用一篇真题级讲座（~500 词）+ 10 题；阅读复用一篇真题级短文（~800 词）+ 13 题。
//   写作/口语仍自评。Band 为比例估算。题量仍小于真题 L40+R40。
//
import { ACADEMIC_LISTENING } from './academicListening';
import { ACADEMIC_READING } from './academicReading';
import { WRITING_TASKS } from './academicWriting';

export const MOCK_SECTIONS = [
  { key: 'listening', name: 'Listening', nameZh: '听力', timeMin: 12, autoScored: true },
  { key: 'reading', name: 'Reading', nameZh: '阅读', timeMin: 20, autoScored: true },
  { key: 'writing', name: 'Writing', nameZh: '写作', timeMin: 20, autoScored: false },
  { key: 'speaking', name: 'Speaking', nameZh: '口语', timeMin: 5, autoScored: false },
];

export const MOCK_LISTENING_LECTURE_IDS = ['alf-sound'];

export const MOCK_LISTENING_QUESTIONS = [
  {
    id: 'ml-q1', lectureId: 'alf-sound', type: 'tfng',
    prompt: 'Sound can travel through a vacuum.',
    promptZh: '声音可以在真空中传播。',
    answer: 'false',
    explainZh: '讲座明确说声音需要介质，无法穿过真空。',
  },
  {
    id: 'ml-q2', lectureId: 'alf-sound', type: 'tfng',
    prompt: 'According to the lecture, space is completely silent.',
    promptZh: '讲座认为太空是完全寂静的。',
    answer: 'true',
    explainZh: '讲座：despite what films suggest, space is completely silent.',
  },
  {
    id: 'ml-q3', lectureId: 'alf-sound', type: 'mcq',
    prompt: 'In air at room temperature, sound travels at roughly:',
    promptZh: '在室温空气中，声速大约是：',
    options: ['34 metres per second', '340 metres per second', '3,400 metres per second', 'the speed of light'],
    answer: 1,
    explainZh: '讲座：roughly three hundred and forty metres per second.',
  },
  {
    id: 'ml-q4', lectureId: 'alf-sound', type: 'tfng',
    prompt: 'Frequency is measured in decibels.',
    promptZh: '频率以分贝衡量。',
    answer: 'false',
    explainZh: '频率以赫兹衡量；分贝衡量的是响度/振幅。',
  },
  {
    id: 'ml-q5', lectureId: 'alf-sound', type: 'mcq',
    prompt: 'Amplitude is perceived as:',
    promptZh: '振幅被感知为：',
    options: ['pitch', 'loudness', 'echo', 'resonance'],
    answer: 1,
    explainZh: '讲座：amplitude … which we perceive as loudness.',
  },
  {
    id: 'ml-q6', lectureId: 'alf-sound', type: 'gap',
    prompt: 'An increase of ten decibels represents roughly a ____ increase in intensity.',
    promptZh: '增加十分贝大约代表强度 ____ 增大。',
    answer: 'tenfold', accept: ['tenfold', 'ten-fold', 'ten fold'],
    explainZh: '讲座：roughly a tenfold increase in intensity.',
  },
  {
    id: 'ml-q7', lectureId: 'alf-sound', type: 'tfng',
    prompt: 'Hair cells in the cochlea grow back after they are destroyed.',
    promptZh: '耳蜗里的毛细胞被破坏后还能再长出来。',
    answer: 'false',
    explainZh: '讲座：these hair cells do not grow back once they are destroyed.',
  },
  {
    id: 'ml-q8', lectureId: 'alf-sound', type: 'mcq',
    prompt: 'Bats locate objects by:',
    promptZh: '蝙蝠如何定位物体？',
    options: ['resonance in the outer ear', 'the Doppler effect only', 'echolocation', 'measuring decibels'],
    answer: 2,
    explainZh: '讲座：Bats and dolphins … echolocation.',
  },
  {
    id: 'ml-q9', lectureId: 'alf-sound', type: 'gap',
    prompt: 'The outer ear acts like a ____, gathering the pressure waves.',
    promptZh: '外耳像一个 ____，收集压力波。',
    answer: 'funnel', accept: ['funnel'],
    explainZh: '讲座：The outer ear acts like a funnel.',
  },
  {
    id: 'ml-q10', lectureId: 'alf-sound', type: 'tfng',
    prompt: 'A healthy young person can typically hear frequencies up to twenty thousand hertz.',
    promptZh: '健康年轻人通常能听到高达两万赫兹的频率。',
    answer: 'true',
    explainZh: '讲座：from about twenty hertz up to twenty thousand hertz.',
  },
];

export const MOCK_READING_PASSAGE_ID = 'arf-urban-heat';

// —— 写作：复用一篇雅思 Task 2（计时 + 字数，自评不自动打分）——
export const MOCK_WRITING_TASK_ID = 'w-ielts-t2-technology';

// —— 口语：3 段简短提问（计时，录音自评，不自动打分）——
export const MOCK_SPEAKING = {
  parts: [
    { en: 'Level 1: Tell me about the town or city where you live.', zh: '1 级：谈谈你居住的城镇或城市。' },
    { en: 'Level 2: Describe a skill you would like to learn. Say what it is, why you want to learn it, and how you would learn it.', zh: '2 级：描述一个你想学的技能。说它是什么、为什么想学、你会怎么学。' },
    { en: 'Level 3: Do you think schools should teach more practical skills? Why or why not?', zh: '3 级：你认为学校应该教更多实用技能吗？为什么？' },
  ],
};

// —— 解析器：从复用数据里取出本次模考用到的具体内容 ——
export function getMockLectures() {
  return MOCK_LISTENING_LECTURE_IDS
    .map((id) => ACADEMIC_LISTENING.find((l) => l.id === id))
    .filter(Boolean);
}
export function getMockReadingPassage() {
  return ACADEMIC_READING.find((p) => p.id === MOCK_READING_PASSAGE_ID) || null;
}
export function getMockWritingTask() {
  return WRITING_TASKS.find((t) => t.id === MOCK_WRITING_TASK_ID) || null;
}

// —— 语芽 1–6 级（程序内分级，不是校外考试分数）——
export function estimateLevel(correct, total) {
  if (!total) return { level: null, note: '无题目' };
  const pct = (correct / total) * 100;
  let level;
  if (pct >= 90) level = 6;
  else if (pct >= 75) level = 5;
  else if (pct >= 60) level = 4;
  else if (pct >= 45) level = 3;
  else if (pct >= 30) level = 2;
  else level = 1;
  return { level, note: '语芽程序内 1–6 级' };
}

export const MOCK_META = {
  source: '语芽程序内练习卷 · 顺序 听→读→写→说。',
  note: '迷你压缩卷：一篇长篇听力 10 题 + 一篇长篇阅读 13 题自动判分并给出 1–6 级；写作+口语自评。',
};

export function countMockQuestions() {
  const passage = getMockReadingPassage();
  const readingQ = passage ? passage.questions.length : 0;
  return { listening: MOCK_LISTENING_QUESTIONS.length, reading: readingQ };
}
