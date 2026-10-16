// @ts-nocheck
// 零评判口语模式 · 话题提示库
// ----------------------------------------------------------------------------
// 方法学溯源（红线七）：
//   Krashen, S. D. (1982). Principles and Practice in Second Language
//   Acquisition. Pergamon Press.
//   —— 情感过滤假说 (Affective Filter Hypothesis)：焦虑越低，语言习得越高效。
//
//   Dörnyei, Z. (2001). Motivational Strategies in the Language Classroom.
//   Cambridge University Press.
//   —— 低风险口语任务（low-stakes speaking tasks）显著提升开口意愿。
//
// 设计原则：
//   1. 话题按 CEFR 分级，每级递进难度但永远不评判发音/语法
//   2. 每个话题附中文翻译（消除理解焦虑）
//   3. 建议时长为"软指标"——鼓励多说，但不强制
//   4. 内置鼓励语，随机轮换，不重复不机械
//   5. 零虚假数据（红线一）：话题均为真实日常情境，无编造学术场景

export const PROMPT_CATEGORIES = [
  { id: 'daily', label: '日常一句', labelEn: 'Daily Line', icon: 'chatbubble', color: '#22c55e' },
  { id: 'warmup', label: '暖身', labelEn: 'Warmup', icon: 'sunny', color: '#fbbf24' },
  { id: 'self', label: '自我表达', labelEn: 'About Me', icon: 'person', color: '#60a5fa' },
  { id: 'opinion', label: '说说看法', labelEn: 'Opinion', icon: 'chatbubble-ellipses', color: '#a78bfa' },
  { id: 'story', label: '讲个故事', labelEn: 'Tell a Story', icon: 'book', color: '#34d399' },
  { id: 'imagine', label: '开脑洞', labelEn: 'Imagine', icon: 'rocket', color: '#f472b6' },
];

export const FREE_SPEAK_PROMPTS = [
  // ==================== 日常一句（A1–A2）====================
  {
    id: 'd01',
    category: 'daily',
    cefr: 'A1',
    en: 'Answer: Do you like coffee? Say yes or no and why.',
    zh: '回答：你喜欢咖啡吗？说喜不喜欢，简单说说原因。',
    timeHint: 20,
  },
  {
    id: 'd02',
    category: 'daily',
    cefr: 'A1',
    en: 'Answer: Do you have time this evening?',
    zh: '回答：你今晚有空吗？',
    timeHint: 15,
  },
  {
    id: 'd03',
    category: 'daily',
    cefr: 'A1',
    en: 'Say what you want for lunch using "I would like…"',
    zh: '用 I would like… 说午饭想吃什么。',
    timeHint: 20,
  },
  {
    id: 'd04',
    category: 'daily',
    cefr: 'A1',
    en: 'Ask where the bathroom is.',
    zh: '问洗手间在哪里。',
    timeHint: 15,
  },
  {
    id: 'd05',
    category: 'daily',
    cefr: 'A2',
    en: 'Answer: How much is it? Make up a price.',
    zh: '回答多少钱（自己编一个价钱）。',
    timeHint: 20,
  },
  {
    id: 'd06',
    category: 'daily',
    cefr: 'A2',
    en: 'Invite a friend: "Let\'s …" (eat / walk / watch a movie).',
    zh: '用 Let\'s… 邀请朋友（吃饭/散步/看电影）。',
    timeHint: 25,
  },
  {
    id: 'd07',
    category: 'daily',
    cefr: 'A2',
    en: 'Say you are sorry for being late.',
    zh: '为迟到道歉。',
    timeHint: 20,
  },
  {
    id: 'd08',
    category: 'daily',
    cefr: 'A2',
    en: 'At a shop: ask if they have a smaller size.',
    zh: '在店里问有没有小一号。',
    timeHint: 20,
  },
  {
    id: 'd09',
    category: 'daily',
    cefr: 'A2',
    en: 'Explain one symptom: headache / cough / tired.',
    zh: '说一种不舒服：头疼/咳嗽/累。',
    timeHint: 25,
  },
  {
    id: 'd10',
    category: 'daily',
    cefr: 'B1',
    en: 'Complain politely: this is not what I ordered.',
    zh: '礼貌投诉：这不是我点的。',
    timeHint: 30,
  },

  // ==================== Warmup (A1) ====================
  {
    id: 'w01',
    category: 'warmup',
    cefr: 'A1',
    en: 'Say your name and where you are from.',
    zh: '说你的名字和你来自哪里。',
    timeHint: 15,
  },
  {
    id: 'w02',
    category: 'warmup',
    cefr: 'A1',
    en: 'What day is it today? What is the weather like?',
    zh: '今天星期几？天气怎么样？',
    timeHint: 15,
  },
  {
    id: 'w03',
    category: 'warmup',
    cefr: 'A1',
    en: 'Count from 1 to 20 out loud.',
    zh: '大声从 1 数到 20。',
    timeHint: 15,
  },
  {
    id: 'w04',
    category: 'warmup',
    cefr: 'A1',
    en: 'Say three things you can see right now.',
    zh: '说三个你现在能看到的东西。',
    timeHint: 15,
  },
  {
    id: 'w05',
    category: 'warmup',
    cefr: 'A2',
    en: 'Describe what you had for breakfast today.',
    zh: '描述你今天早饭吃了什么。',
    timeHint: 20,
  },
  {
    id: 'w06',
    category: 'warmup',
    cefr: 'A2',
    en: 'Introduce a family member. What do they look like?',
    zh: '介绍一位家人。他/她长什么样？',
    timeHint: 25,
  },

  // ==================== Self-Expression (A2–B1) ====================
  {
    id: 's01',
    category: 'self',
    cefr: 'A2',
    en: 'What is your favorite food? Why do you like it?',
    zh: '你最喜欢的食物是什么？为什么喜欢？',
    timeHint: 25,
  },
  {
    id: 's02',
    category: 'self',
    cefr: 'A2',
    en: 'What do you usually do after work or school?',
    zh: '下班/放学后你通常做什么？',
    timeHint: 25,
  },
  {
    id: 's03',
    category: 'self',
    cefr: 'A2',
    en: 'Describe your room. What is in it?',
    zh: '描述你的房间。里面有什么？',
    timeHint: 30,
  },
  {
    id: 's04',
    category: 'self',
    cefr: 'B1',
    en: 'What kind of music do you enjoy? Describe a song you like.',
    zh: '你喜欢什么类型的音乐？描述一首你喜欢的歌。',
    timeHint: 40,
  },
  {
    id: 's05',
    category: 'self',
    cefr: 'B1',
    en: 'What is the best gift you have ever received?',
    zh: '你收到过最好的礼物是什么？',
    timeHint: 40,
  },
  {
    id: 's06',
    category: 'self',
    cefr: 'B1',
    en: 'If you have a free weekend, how would you spend it?',
    zh: '如果有一个空闲的周末，你会怎么度过？',
    timeHint: 45,
  },

  // ==================== Opinion (B1) ====================
  {
    id: 'o01',
    category: 'opinion',
    cefr: 'B1',
    en: 'Do you think pets are good for children? Why or why not?',
    zh: '你觉得养宠物对小孩好吗？为什么？',
    timeHint: 45,
  },
  {
    id: 'o02',
    category: 'opinion',
    cefr: 'B1',
    en: 'Is it better to live in a big city or a small town?',
    zh: '住大城市和小城镇，哪个更好？',
    timeHint: 45,
  },
  {
    id: 'o03',
    category: 'opinion',
    cefr: 'B1',
    en: 'What is one thing you wish you could change about your daily routine?',
    zh: '你希望改变日常生活中的哪一件事？',
    timeHint: 45,
  },
  {
    id: 'o04',
    category: 'opinion',
    cefr: 'B1',
    en: 'Do you prefer cooking at home or eating out? Explain.',
    zh: '你更喜欢自己做饭还是外面吃？说说原因。',
    timeHint: 40,
  },
  {
    id: 'o05',
    category: 'opinion',
    cefr: 'B1',
    en: 'What makes a good friend?',
    zh: '什么样的人算好朋友？',
    timeHint: 45,
  },

  // ==================== Story (A2–B1) ====================
  {
    id: 'st01',
    category: 'story',
    cefr: 'A2',
    en: 'Tell me about your last vacation. Where did you go?',
    zh: '说说你上次假期。你去了哪里？',
    timeHint: 40,
  },
  {
    id: 'st02',
    category: 'story',
    cefr: 'A2',
    en: 'Describe your morning today from when you woke up.',
    zh: '描述你今天早上从起床开始做了什么。',
    timeHint: 35,
  },
  {
    id: 'st03',
    category: 'story',
    cefr: 'B1',
    en: 'Tell me about a time when something funny happened to you.',
    zh: '讲一件发生在你身上的有趣的事。',
    timeHint: 60,
  },
  {
    id: 'st04',
    category: 'story',
    cefr: 'B1',
    en: 'Describe the happiest day you can remember.',
    zh: '描述你记忆中最开心的一天。',
    timeHint: 60,
  },
  {
    id: 'st05',
    category: 'story',
    cefr: 'B1',
    en: 'Tell me about someone who helped you a lot.',
    zh: '说说一个曾经帮了你很多的人。',
    timeHint: 60,
  },
  {
    id: 'st06',
    category: 'story',
    cefr: 'B1',
    en: 'What happened the last time you were very surprised?',
    zh: '你上次非常惊讶是什么时候？发生了什么？',
    timeHint: 50,
  },

  // ==================== Imagine (B1–B2) ====================
  {
    id: 'im01',
    category: 'imagine',
    cefr: 'B1',
    en: 'If you could live anywhere in the world, where would it be? Why?',
    zh: '如果你能住在世界上任何地方，你会住哪里？为什么？',
    timeHint: 60,
  },
  {
    id: 'im02',
    category: 'imagine',
    cefr: 'B1',
    en: 'If you had a superpower, what would it be? What would you do with it?',
    zh: '如果你有超能力，你想要什么？你会用它做什么？',
    timeHint: 60,
  },
  {
    id: 'im03',
    category: 'imagine',
    cefr: 'B1',
    en: 'Imagine you are a tour guide. Describe your city to a visitor.',
    zh: '假设你是导游。向游客介绍你的城市。',
    timeHint: 60,
  },
  {
    id: 'im04',
    category: 'imagine',
    cefr: 'B1',
    en: 'You just won a million dollars. What do you do first?',
    zh: '你刚中了一百万美元。你第一件事做什么？',
    timeHint: 60,
  },
  {
    id: 'im05',
    category: 'imagine',
    cefr: 'B2',
    en: 'If you could have dinner with any person, living or dead, who would it be and what would you talk about?',
    zh: '如果能和任何人（在世的或已故的）一起吃晚饭，你会选谁？你们会聊什么？',
    timeHint: 90,
  },
  {
    id: 'im06',
    category: 'imagine',
    cefr: 'B2',
    en: 'Describe the world 50 years from now. What will be different?',
    zh: '描述 50 年后的世界。会有什么不同？',
    timeHint: 90,
  },
];

// ============================================================
// 工具函数
// ============================================================

export function getPromptsByCategory(category) {
  return FREE_SPEAK_PROMPTS.filter((p) => p.category === category);
}

export function getPromptsByCefr(cefr) {
  return FREE_SPEAK_PROMPTS.filter((p) => p.cefr === cefr);
}

export function getRandomPrompt(category) {
  const pool = category
    ? FREE_SPEAK_PROMPTS.filter((p) => p.category === category)
    : FREE_SPEAK_PROMPTS;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ============================================================
// 鼓励语库（Krashen 情感过滤：低焦虑 + 正向反馈）
// ============================================================
export const ENCOURAGEMENTS = [
  '你刚才开口说了英文！这本身就是进步。',
  '语言是交流的工具——你刚才就在交流。',
  '不在乎发音对不对，在乎你敢不敢说。你敢了。',
  '每次开口都在给大脑建新连接。继续！',
  '母语者小时候也是磕磕绊绊说出来的。你比他们快。',
  '说得多比说得"好"重要一万倍。',
  '你的大脑刚才处理了一次真实语言输出。这是记忆最深的学习方式。',
  '没有人在评判你。这里只有你和你的进步。',
  '今天说了，明天就更容易说了。',
  '研究表明：开口说 30 秒比默读 30 分钟更有效。你做到了。',
  '你离流利又近了一步。每一次录音都算数。',
  '别想着"说对"——想着"说了"。你赢了。',
];

export function getRandomEncouragement() {
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
}
