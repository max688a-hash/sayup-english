// @ts-nocheck
// 雅思 / 托福 进阶口语话题库（真实公开题型 · 零评分 · 开口为核心）
// ----------------------------------------------------------------------------
// 设计原则（对齐产品灵魂：反应试、模拟真实交流、初学者有脚手架）：
//   - 这里不是「背模板拿分」，而是把雅思 Part1/2/3、托福口语的真实题型，
//     当作「进阶真实交流话题」来练「开口表达」。
//   - 每条话题都给 scaffold（可直接用的句子开头 / 万能表达），
//     让没思路的人也能开口，而不是对着空白卡壳。
//   - 全程零评分：说出来就是进步。
//
// 题型来源（公开格式，非泄题）：
//   - IELTS Speaking: Part 1 (interview) / Part 2 (cue card, 1分钟准备+2分钟独白) / Part 3 (discussion)
//     —— Cambridge / IDP / British Council 公开考试格式
//   - TOEFL iBT Speaking: Independent Task（就熟悉话题表达观点）
//     —— ETS 公开考试格式
//
// 数据结构：
//   Part 1: { id, type:'ielts_part1', topic, topicZh, questions:[{en,zh}], scaffold:[{en,zh}] }
//   Part 2: { id, type:'ielts_part2', topic, topicZh, cue:{en,zh}, points:[{en,zh}], scaffold:[{en,zh}], followUp:[{en,zh}] }
//   TOEFL : { id, type:'toefl_independent', topic, topicZh, prompt:{en,zh}, scaffold:[{en,zh}] }

// ===========================================================================
// IELTS Speaking Part 1 —— 熟悉话题的简短问答（每题答 2–4 句即可）
// ===========================================================================
// 雅思 Part 3 · 深入讨论（补齐原本缺失的整个环节），分文件维护
import { IELTS_PART3 } from './speakingTopics2';

export const IELTS_PART1 = [
  {
    id: 'p1-hometown',
    type: 'ielts_part1',
    topic: 'Hometown',
    topicZh: '家乡',
    questions: [
      { en: 'Where is your hometown?', zh: '你的家乡在哪里？' },
      { en: 'What do you like most about your hometown?', zh: '你最喜欢家乡的什么？' },
      { en: 'Has your hometown changed much in recent years?', zh: '近些年你的家乡变化大吗？' },
      { en: 'Would you like to live there in the future?', zh: '将来你想住在那里吗？' },
    ],
    scaffold: [
      { en: 'My hometown is a city called ____, in the ____ of China.', zh: '我的家乡是一个叫 ____ 的城市，在中国的 ____ 部。' },
      { en: 'What I like most is ____, because ____.', zh: '我最喜欢的是 ____，因为 ____。' },
      { en: 'It has changed a lot. For example, ____.', zh: '它变化很大。比如说 ____。' },
    ],
  },
  {
    id: 'p1-work-study',
    type: 'ielts_part1',
    topic: 'Work or Study',
    topicZh: '工作或学习',
    questions: [
      { en: 'Do you work or are you a student?', zh: '你是工作还是在读书？' },
      { en: 'Why did you choose that job or subject?', zh: '你为什么选这份工作 / 这个专业？' },
      { en: 'What do you find most difficult about it?', zh: '你觉得其中最难的是什么？' },
      { en: 'What would you like to do in the future?', zh: '将来你想做什么？' },
    ],
    scaffold: [
      { en: 'At the moment I work as a ____. / I am studying ____.', zh: '我目前是一名 ____。/ 我在学 ____。' },
      { en: 'I chose it because I am interested in ____.', zh: '我选它是因为我对 ____ 感兴趣。' },
      { en: 'The hardest part is ____, but I am getting better.', zh: '最难的部分是 ____，不过我在进步。' },
    ],
  },
  {
    id: 'p1-hobbies',
    type: 'ielts_part1',
    topic: 'Hobbies & Free Time',
    topicZh: '爱好与空闲时间',
    questions: [
      { en: 'What do you usually do in your free time?', zh: '空闲时你通常做什么？' },
      { en: 'Is there a hobby you would like to try?', zh: '有没有你想尝试的爱好？' },
      { en: 'Do you prefer spending free time alone or with others?', zh: '空闲时你更喜欢独处还是和别人一起？' },
    ],
    scaffold: [
      { en: 'In my free time, I usually ____.', zh: '空闲时我通常 ____。' },
      { en: "I'd love to try ____ one day.", zh: '我很想有一天试试 ____。' },
      { en: 'It depends, but most of the time I prefer ____.', zh: '看情况，不过大多数时候我更喜欢 ____。' },
    ],
  },
  {
    id: 'p1-food',
    type: 'ielts_part1',
    topic: 'Food & Cooking',
    topicZh: '食物与烹饪',
    questions: [
      { en: 'What kind of food do you like?', zh: '你喜欢什么样的食物？' },
      { en: 'Do you prefer eating at home or eating out?', zh: '你更喜欢在家吃还是出去吃？' },
      { en: 'Can you cook? Who taught you?', zh: '你会做饭吗？谁教你的？' },
    ],
    scaffold: [
      { en: 'I really enjoy ____ food, especially ____.', zh: '我很喜欢 ____ 的食物，尤其是 ____。' },
      { en: 'I prefer ____ because ____.', zh: '我更喜欢 ____，因为 ____。' },
      { en: 'I can cook a few simple dishes. My ____ taught me.', zh: '我会做几道简单的菜，是我 ____ 教的。' },
    ],
  },
  {
    id: 'p1-travel',
    type: 'ielts_part1',
    topic: 'Travel & Transport',
    topicZh: '旅行与交通',
    questions: [
      { en: 'How do you usually travel to work or school?', zh: '你通常怎么去上班 / 上学？' },
      { en: 'Do you enjoy travelling to new places?', zh: '你喜欢去新地方旅行吗？' },
      { en: 'Where would you like to travel next?', zh: '你接下来想去哪里旅行？' },
    ],
    scaffold: [
      { en: 'I usually get there by ____, which takes about ____.', zh: '我通常坐 ____ 去，大约要 ____。' },
      { en: 'I love travelling because it lets me ____.', zh: '我喜欢旅行，因为它让我能 ____。' },
      { en: 'The next place I want to visit is ____.', zh: '我接下来想去的地方是 ____。' },
    ],
  },
  {
    id: 'p1-technology',
    type: 'ielts_part1',
    topic: 'Technology & Phones',
    topicZh: '科技与手机',
    questions: [
      { en: 'How often do you use your phone every day?', zh: '你每天用手机的频率有多高？' },
      { en: 'What do you mainly use it for?', zh: '你主要用它来做什么？' },
      { en: 'Could you live without the internet for a week?', zh: '你能一周不用网络吗？' },
    ],
    scaffold: [
      { en: 'To be honest, I use my phone ____ a day.', zh: '说实话，我每天用手机 ____。' },
      { en: 'I mainly use it for ____ and ____.', zh: '我主要用它来 ____ 和 ____。' },
      { en: 'It would be hard, because I rely on it for ____.', zh: '会很难，因为我靠它来 ____。' },
    ],
  },
  {
    id: 'p1-music',
    type: 'ielts_part1',
    topic: 'Music',
    topicZh: '音乐',
    questions: [
      { en: 'What kind of music do you enjoy?', zh: '你喜欢哪种音乐？' },
      { en: 'Do you ever listen to music while working or studying?', zh: '工作或学习时你会听音乐吗？' },
      { en: 'Has the music you like changed over the years?', zh: '这些年你喜欢的音乐变了吗？' },
    ],
    scaffold: [
      { en: 'I mostly listen to ____, like ____.', zh: '我主要听 ____，比如 ____。' },
      { en: 'I often play music when I ____.', zh: '我经常在 ____ 的时候放音乐。' },
      { en: 'My taste has changed a bit; I used to like ____.', zh: '我的口味变了一些，以前我喜欢 ____。' },
    ],
  },
  {
    id: 'p1-exercise',
    type: 'ielts_part1',
    topic: 'Sports & Exercise',
    topicZh: '运动与锻炼',
    questions: [
      { en: 'Do you do any sports or exercise?', zh: '你做运动或锻炼吗？' },
      { en: 'How do you usually keep fit?', zh: '你通常怎么保持身材 / 健康？' },
      { en: 'Did you play more sports when you were younger?', zh: '你小时候运动更多吗？' },
    ],
    scaffold: [
      { en: 'I try to ____ a few times a week.', zh: '我尽量每周 ____ 几次。' },
      { en: 'To keep fit, I usually ____.', zh: '为了保持健康，我通常 ____。' },
      { en: 'When I was younger, I used to ____.', zh: '小时候，我以前会 ____。' },
    ],
  },
  {
    id: 'p1-weather',
    type: 'ielts_part1',
    topic: 'Weather & Seasons',
    topicZh: '天气与季节',
    questions: [
      { en: 'What is the weather like where you live?', zh: '你住的地方天气怎么样？' },
      { en: 'Which season do you like best?', zh: '你最喜欢哪个季节？' },
      { en: 'Does the weather affect your mood?', zh: '天气会影响你的心情吗？' },
    ],
    scaffold: [
      { en: 'Where I live, it is usually ____ in ____.', zh: '我住的地方，____ 季通常 ____。' },
      { en: 'My favourite season is ____ because ____.', zh: '我最喜欢的季节是 ____，因为 ____。' },
      { en: 'Honestly, the weather does affect me; when it is ____, I feel ____.', zh: '说实话天气确实影响我，____ 的时候我会觉得 ____。' },
    ],
  },
  {
    id: 'p1-shopping',
    type: 'ielts_part1',
    topic: 'Shopping',
    topicZh: '购物',
    questions: [
      { en: 'Do you enjoy shopping?', zh: '你喜欢购物吗？' },
      { en: 'Do you prefer shopping online or in stores?', zh: '你更喜欢网购还是去店里买？' },
      { en: 'What was the last thing you bought for yourself?', zh: '你最近给自己买的东西是什么？' },
    ],
    scaffold: [
      { en: 'It depends on what I am buying, but generally I ____.', zh: '看买什么，不过总体来说我 ____。' },
      { en: 'I prefer ____ shopping because ____.', zh: '我更喜欢 ____ 购物，因为 ____。' },
      { en: 'The last thing I bought was ____.', zh: '我最近买的东西是 ____。' },
    ],
  },
  {
    id: 'p1-home',
    type: 'ielts_part1',
    topic: 'Home & Accommodation',
    topicZh: '住处',
    questions: [
      { en: 'Do you live in a house or an apartment?', zh: '你住的是房子还是公寓？' },
      { en: 'What is your favourite room in your home?', zh: '你家里最喜欢的房间是哪个？' },
      { en: 'Is there anything you would like to change about your home?', zh: '你的家有什么想改变的地方吗？' },
      { en: 'Would you like to move somewhere else in the future?', zh: '将来你想搬到别的地方吗？' },
    ],
    scaffold: [
      { en: 'At the moment I live in a ____ with ____.', zh: '我目前住在一个 ____，和 ____ 一起。' },
      { en: 'My favourite room is the ____ because ____.', zh: '我最喜欢的房间是 ____，因为 ____。' },
      { en: 'If I could, I would change ____.', zh: '如果可以，我想改变 ____。' },
    ],
  },
  {
    id: 'p1-family',
    type: 'ielts_part1',
    topic: 'Family',
    topicZh: '家人',
    questions: [
      { en: 'Do you come from a big family or a small one?', zh: '你来自大家庭还是小家庭？' },
      { en: 'Who are you closest to in your family?', zh: '家里你和谁最亲近？' },
      { en: 'Do you spend a lot of time with your family?', zh: '你和家人相处的时间多吗？' },
      { en: 'In what ways has your family influenced you?', zh: '你的家人在哪些方面影响了你？' },
    ],
    scaffold: [
      { en: 'I come from a fairly ____ family.', zh: '我来自一个比较 ____ 的家庭。' },
      { en: 'I am closest to my ____, because ____.', zh: '我和我的 ____ 最亲，因为 ____。' },
      { en: 'We usually spend time together by ____.', zh: '我们通常通过 ____ 一起度过时间。' },
    ],
  },
  {
    id: 'p1-daily-routine',
    type: 'ielts_part1',
    topic: 'Daily Routine',
    topicZh: '日常作息',
    questions: [
      { en: 'What does a typical day look like for you?', zh: '你典型的一天是怎样的？' },
      { en: 'Are you a morning person or a night person?', zh: '你是早起型还是夜猫子？' },
      { en: 'Is your routine different at the weekend?', zh: '你周末的作息不一样吗？' },
      { en: 'Is there anything you would like to change about your routine?', zh: '你的作息有什么想改变的吗？' },
    ],
    scaffold: [
      { en: 'On a typical day, I usually ____ and then ____.', zh: '典型的一天，我通常 ____，然后 ____。' },
      { en: 'I am definitely more of a ____ person.', zh: '我绝对更偏 ____ 型。' },
      { en: 'At the weekend, I tend to ____ instead.', zh: '周末我往往会改为 ____。' },
    ],
  },
  {
    id: 'p1-reading',
    type: 'ielts_part1',
    topic: 'Reading',
    topicZh: '阅读',
    questions: [
      { en: 'Do you enjoy reading in your free time?', zh: '空闲时你喜欢阅读吗？' },
      { en: 'What kind of books do you like most?', zh: '你最喜欢哪类书？' },
      { en: 'Do you prefer paper books or e-books?', zh: '你更喜欢纸质书还是电子书？' },
      { en: 'Did you read a lot when you were a child?', zh: '你小时候读书多吗？' },
    ],
    scaffold: [
      { en: 'I do enjoy reading, especially ____.', zh: '我确实喜欢阅读，尤其是 ____。' },
      { en: 'I prefer ____ books because ____.', zh: '我更喜欢 ____ 书，因为 ____。' },
      { en: 'As a child, I used to read ____.', zh: '小时候，我常读 ____。' },
    ],
  },
  {
    id: 'p1-festivals',
    type: 'ielts_part1',
    topic: 'Festivals',
    topicZh: '节日',
    questions: [
      { en: 'What is the most important festival in your country?', zh: '你们国家最重要的节日是什么？' },
      { en: 'How do people usually celebrate it?', zh: '人们通常怎么庆祝它？' },
      { en: 'What is your favourite festival, and why?', zh: '你最喜欢的节日是什么？为什么？' },
      { en: 'Do you think festivals are as important as they used to be?', zh: '你认为节日还像以前那样重要吗？' },
    ],
    scaffold: [
      { en: 'The most important festival here is ____.', zh: '这里最重要的节日是 ____。' },
      { en: 'People usually celebrate it by ____.', zh: '人们通常通过 ____ 来庆祝。' },
      { en: 'My favourite is ____ because ____.', zh: '我最喜欢的是 ____，因为 ____。' },
    ],
  },
  {
    id: 'p1-animals',
    type: 'ielts_part1',
    topic: 'Animals & Pets',
    topicZh: '动物与宠物',
    questions: [
      { en: 'Do you have any pets at the moment?', zh: '你现在养宠物吗？' },
      { en: 'Did you have any pets when you were young?', zh: '你小时候养过宠物吗？' },
      { en: 'Do you think keeping pets is good for children?', zh: '你觉得养宠物对孩子好吗？' },
      { en: 'What is your favourite animal?', zh: '你最喜欢的动物是什么？' },
    ],
    scaffold: [
      { en: 'At the moment I ____ a pet — a ____.', zh: '目前我 ____ 宠物——一只 ____。' },
      { en: 'When I was young, we had ____.', zh: '我小时候，我们养过 ____。' },
      { en: 'My favourite animal is the ____ because ____.', zh: '我最喜欢的动物是 ____，因为 ____。' },
    ],
  },
];

// ===========================================================================
// IELTS Speaking Part 2 —— Cue card：1 分钟准备 + 2 分钟独白
//   points = 卡片上的 "You should say" 引导点
//   followUp = Part 3 风格的延伸讨论
// ===========================================================================
export const IELTS_PART2 = [
  {
    id: 'p2-person-admire',
    type: 'ielts_part2',
    topic: 'Describe a person you admire',
    topicZh: '描述一个你敬佩的人',
    cue: {
      en: 'Describe a person you admire. You should say who the person is, how you know them, what they are like, and explain why you admire them.',
      zh: '描述一个你敬佩的人。说明：这个人是谁、你怎么认识 ta、ta 是个怎样的人，并解释你为什么敬佩 ta。',
    },
    points: [
      { en: 'Who the person is', zh: '这个人是谁' },
      { en: 'How you know them', zh: '你怎么认识 ta' },
      { en: 'What they are like', zh: 'ta 是个怎样的人' },
      { en: 'Why you admire them', zh: '你为什么敬佩 ta' },
    ],
    scaffold: [
      { en: 'The person I really admire is ____.', zh: '我非常敬佩的人是 ____。' },
      { en: 'I have known them for ____ years.', zh: '我认识 ta 已经 ____ 年了。' },
      { en: 'What makes them special is that they ____.', zh: 'ta 特别之处在于 ta ____。' },
      { en: 'I admire them most because ____.', zh: '我最敬佩 ta 是因为 ____。' },
    ],
    followUp: [
      { en: 'Do you think young people today have good role models?', zh: '你认为今天的年轻人有好的榜样吗？' },
      { en: 'Why do some people become famous without real talent?', zh: '为什么有些人没有真本事也能出名？' },
    ],
  },
  {
    id: 'p2-place-relax',
    type: 'ielts_part2',
    topic: 'Describe a place where you feel relaxed',
    topicZh: '描述一个让你放松的地方',
    cue: {
      en: 'Describe a place where you feel relaxed. You should say where it is, how often you go there, what you do there, and explain why it makes you feel relaxed.',
      zh: '描述一个让你放松的地方。说明：它在哪、你多久去一次、你在那做什么，并解释为什么它让你放松。',
    },
    points: [
      { en: 'Where it is', zh: '它在哪里' },
      { en: 'How often you go there', zh: '你多久去一次' },
      { en: 'What you do there', zh: '你在那做什么' },
      { en: 'Why it makes you relaxed', zh: '为什么它让你放松' },
    ],
    scaffold: [
      { en: 'The place I want to talk about is ____.', zh: '我想讲的地方是 ____。' },
      { en: 'I go there about ____ a week / month.', zh: '我大约每周 / 每月去 ____ 次。' },
      { en: 'When I am there, I usually ____.', zh: '在那里时，我通常 ____。' },
      { en: 'It relaxes me because ____.', zh: '它让我放松，因为 ____。' },
    ],
    followUp: [
      { en: 'Why do people feel more stressed in modern life?', zh: '为什么现代生活中人们感到更有压力？' },
      { en: 'Is it better to relax in nature or in the city?', zh: '在大自然里放松还是在城市里放松更好？' },
    ],
  },
  {
    id: 'p2-skill-learn',
    type: 'ielts_part2',
    topic: 'Describe a skill you would like to learn',
    topicZh: '描述一项你想学的技能',
    cue: {
      en: 'Describe a skill you would like to learn. You should say what the skill is, how you would learn it, how long it might take, and explain why you want to learn it.',
      zh: '描述一项你想学的技能。说明：是什么技能、你打算怎么学、可能要多久，并解释你为什么想学它。',
    },
    points: [
      { en: 'What the skill is', zh: '是什么技能' },
      { en: 'How you would learn it', zh: '你打算怎么学' },
      { en: 'How long it might take', zh: '可能要多久' },
      { en: 'Why you want to learn it', zh: '为什么想学它' },
    ],
    scaffold: [
      { en: 'A skill I would really like to learn is ____.', zh: '我很想学的一项技能是 ____。' },
      { en: 'I would probably learn it by ____.', zh: '我大概会通过 ____ 来学它。' },
      { en: 'I think it would take me about ____.', zh: '我觉得大概要花我 ____。' },
      { en: 'I want to learn it because ____.', zh: '我想学它是因为 ____。' },
    ],
    followUp: [
      { en: 'Is it easier to learn new skills as an adult or as a child?', zh: '成年后学新技能更容易还是小时候更容易？' },
      { en: 'Should schools teach more practical skills?', zh: '学校应该教更多实用技能吗？' },
    ],
  },
  {
    id: 'p2-memorable-day',
    type: 'ielts_part2',
    topic: 'Describe a memorable day in your life',
    topicZh: '描述你生命中难忘的一天',
    cue: {
      en: 'Describe a memorable day in your life. You should say when it happened, where you were, who you were with, and explain why it was memorable.',
      zh: '描述你生命中难忘的一天。说明：它发生在什么时候、你在哪、和谁一起，并解释为什么难忘。',
    },
    points: [
      { en: 'When it happened', zh: '什么时候发生的' },
      { en: 'Where you were', zh: '你在哪里' },
      { en: 'Who you were with', zh: '和谁一起' },
      { en: 'Why it was memorable', zh: '为什么难忘' },
    ],
    scaffold: [
      { en: 'One day I will never forget is ____.', zh: '我永远不会忘记的一天是 ____。' },
      { en: 'It happened about ____ ago.', zh: '那大约发生在 ____ 之前。' },
      { en: 'I was with ____ at the time.', zh: '当时我和 ____ 在一起。' },
      { en: 'It was special because ____.', zh: '它特别是因为 ____。' },
    ],
    followUp: [
      { en: 'Why do people remember some days but forget others?', zh: '为什么人们记得某些日子却忘了其他的？' },
      { en: 'Are special days more important than ordinary days?', zh: '特别的日子比平凡的日子更重要吗？' },
    ],
  },
  {
    id: 'p2-useful-object',
    type: 'ielts_part2',
    topic: 'Describe a useful object you own',
    topicZh: '描述一件你拥有的有用物品',
    cue: {
      en: 'Describe a useful object you own. You should say what it is, how you got it, how often you use it, and explain why it is so useful to you.',
      zh: '描述一件你拥有的有用物品。说明：它是什么、你怎么得到的、你多久用一次，并解释为什么它对你这么有用。',
    },
    points: [
      { en: 'What it is', zh: '它是什么' },
      { en: 'How you got it', zh: '你怎么得到的' },
      { en: 'How often you use it', zh: '你多久用一次' },
      { en: 'Why it is so useful', zh: '为什么它这么有用' },
    ],
    scaffold: [
      { en: 'The object I want to describe is my ____.', zh: '我想描述的物品是我的 ____。' },
      { en: 'I got it ____ ago, as a ____.', zh: '我在 ____ 前得到它，作为 ____。' },
      { en: 'I use it almost ____.', zh: '我几乎 ____ 都在用它。' },
      { en: 'It is so useful because it helps me ____.', zh: '它这么有用，是因为它帮我 ____。' },
    ],
    followUp: [
      { en: 'Do you think people today own too many things?', zh: '你觉得现在的人拥有的东西太多了吗？' },
      { en: 'How has technology changed the objects we use daily?', zh: '科技如何改变了我们日常使用的物品？' },
    ],
  },
  {
    id: 'p2-book-film',
    type: 'ielts_part2',
    topic: 'Describe a book or film you enjoyed',
    topicZh: '描述一本你喜欢的书或一部电影',
    cue: {
      en: 'Describe a book or film you enjoyed. You should say what it was, what it was about, when you read or watched it, and explain why you enjoyed it.',
      zh: '描述一本你喜欢的书或一部电影。说明：它是什么、讲什么、你什么时候读 / 看的，并解释你为什么喜欢它。',
    },
    points: [
      { en: 'What it was', zh: '它是什么' },
      { en: 'What it was about', zh: '它讲的是什么' },
      { en: 'When you read or watched it', zh: '你什么时候读 / 看的' },
      { en: 'Why you enjoyed it', zh: '你为什么喜欢它' },
    ],
    scaffold: [
      { en: 'I would like to talk about a ____ called ____.', zh: '我想聊一部叫 ____ 的 ____。' },
      { en: 'It is about ____.', zh: '它讲的是 ____。' },
      { en: 'I read / watched it ____ ago.', zh: '我在 ____ 前读 / 看的。' },
      { en: 'I really enjoyed it because ____.', zh: '我很喜欢它，因为 ____。' },
    ],
    followUp: [
      { en: 'Do you think people read less than they used to?', zh: '你觉得人们读书比过去少了吗？' },
      { en: 'Are films a better way to tell stories than books?', zh: '电影比书更适合讲故事吗？' },
    ],
  },
  {
    id: 'p2-journey',
    type: 'ielts_part2',
    topic: 'Describe a journey you remember well',
    topicZh: '描述一段你记忆深刻的旅程',
    cue: {
      en: 'Describe a journey you remember well. You should say where you went, how you travelled, who you went with, and explain why you remember it well.',
      zh: '描述一段你记忆深刻的旅程。说明：你去了哪、怎么去的、和谁一起，并解释你为什么记得很清楚。',
    },
    points: [
      { en: 'Where you went', zh: '你去了哪里' },
      { en: 'How you travelled', zh: '你怎么去的' },
      { en: 'Who you went with', zh: '和谁一起' },
      { en: 'Why you remember it well', zh: '为什么记得很清楚' },
    ],
    scaffold: [
      { en: 'The journey I remember most is when I went to ____.', zh: '我记得最清楚的旅程是我去 ____ 的那次。' },
      { en: 'We travelled there by ____.', zh: '我们坐 ____ 去的。' },
      { en: 'I went with ____.', zh: '我和 ____ 一起去的。' },
      { en: 'I remember it so well because ____.', zh: '我记得这么清楚，是因为 ____。' },
    ],
    followUp: [
      { en: 'Why do people enjoy travelling to faraway places?', zh: '为什么人们喜欢去遥远的地方旅行？' },
      { en: 'Is the journey or the destination more important?', zh: '旅程本身和目的地，哪个更重要？' },
    ],
  },
  {
    id: 'p2-gift',
    type: 'ielts_part2',
    topic: 'Describe a gift you gave to someone',
    topicZh: '描述一件你送给别人的礼物',
    cue: {
      en: 'Describe a gift you gave to someone. You should say what it was, who you gave it to, why you chose it, and explain how they felt about it.',
      zh: '描述一件你送给别人的礼物。说明：它是什么、你送给了谁、你为什么选它，并解释对方对它的感受。',
    },
    points: [
      { en: 'What the gift was', zh: '礼物是什么' },
      { en: 'Who you gave it to', zh: '你送给了谁' },
      { en: 'Why you chose it', zh: '你为什么选它' },
      { en: 'How they felt about it', zh: '对方的感受' },
    ],
    scaffold: [
      { en: 'A gift I remember giving is ____.', zh: '我记得送过的一件礼物是 ____。' },
      { en: 'I gave it to my ____.', zh: '我把它送给了我的 ____。' },
      { en: 'I chose it because ____.', zh: '我选它是因为 ____。' },
      { en: 'They were really ____ when they got it.', zh: '收到时他们非常 ____。' },
    ],
    followUp: [
      { en: 'Do people spend too much money on gifts nowadays?', zh: '现在人们在礼物上花的钱太多了吗？' },
      { en: 'Is it better to give a gift or to give money?', zh: '送礼物好还是直接给钱好？' },
    ],
  },
  {
    id: 'p2-place-visit',
    type: 'ielts_part2',
    topic: 'Describe a place you would like to visit',
    topicZh: '描述一个你想去的地方',
    cue: {
      en: 'Describe a place you would like to visit in the future. You should say where it is, how you learned about it, what you would do there, and explain why you want to go.',
      zh: '描述一个你将来想去的地方。说明：它在哪、你怎么知道它的、你会在那做什么，并解释你为什么想去。',
    },
    points: [
      { en: 'Where it is', zh: '它在哪里' },
      { en: 'How you learned about it', zh: '你怎么知道它的' },
      { en: 'What you would do there', zh: '你会在那做什么' },
      { en: 'Why you want to go', zh: '你为什么想去' },
    ],
    scaffold: [
      { en: 'A place I would love to visit is ____.', zh: '我很想去的一个地方是 ____。' },
      { en: 'I first heard about it from ____.', zh: '我最初是从 ____ 知道它的。' },
      { en: 'If I went there, I would ____.', zh: '如果我去了，我会 ____。' },
      { en: 'I really want to go because ____.', zh: '我很想去，因为 ____。' },
    ],
    followUp: [
      { en: 'Why do so many people want to travel abroad?', zh: '为什么这么多人想出国旅行？' },
      { en: 'Do you think travel really broadens the mind?', zh: '你认为旅行真的能开阔眼界吗？' },
    ],
  },
  {
    id: 'p2-advice',
    type: 'ielts_part2',
    topic: 'Describe useful advice you received',
    topicZh: '描述你收到的有用建议',
    cue: {
      en: 'Describe a piece of useful advice someone gave you. You should say who gave it, what the advice was, when they gave it, and explain how it helped you.',
      zh: '描述别人给你的一条有用建议。说明：谁给的、建议是什么、什么时候给的，并解释它如何帮助了你。',
    },
    points: [
      { en: 'Who gave it to you', zh: '谁给你的' },
      { en: 'What the advice was', zh: '建议是什么' },
      { en: 'When they gave it', zh: '什么时候给的' },
      { en: 'How it helped you', zh: '它如何帮了你' },
    ],
    scaffold: [
      { en: 'The best advice I ever got came from my ____.', zh: '我得到过最好的建议来自我的 ____。' },
      { en: 'They told me that I should ____.', zh: '他们告诉我应该 ____。' },
      { en: 'It was around the time when I ____.', zh: '那大约是在我 ____ 的时候。' },
      { en: 'It really helped me because ____.', zh: '它真的帮了我，因为 ____。' },
    ],
    followUp: [
      { en: 'Do young people today listen to advice from older people?', zh: '如今的年轻人会听长辈的建议吗？' },
      { en: 'Is advice from family or from friends more useful?', zh: '家人的建议和朋友的建议，哪个更有用？' },
    ],
  },
  {
    id: 'p2-decision',
    type: 'ielts_part2',
    topic: 'Describe a difficult decision you made',
    topicZh: '描述一个你做过的艰难决定',
    cue: {
      en: 'Describe a difficult decision you once made. You should say what it was, when you made it, why it was difficult, and explain whether it was the right choice.',
      zh: '描述一个你曾做过的艰难决定。说明：是什么决定、什么时候做的、为什么难，并解释它是否是正确的选择。',
    },
    points: [
      { en: 'What the decision was', zh: '是什么决定' },
      { en: 'When you made it', zh: '什么时候做的' },
      { en: 'Why it was difficult', zh: '为什么难' },
      { en: 'Whether it was the right choice', zh: '是否是正确选择' },
    ],
    scaffold: [
      { en: 'A difficult decision I had to make was ____.', zh: '我不得不做的一个艰难决定是 ____。' },
      { en: 'It happened when ____.', zh: '那发生在我 ____ 的时候。' },
      { en: 'It was hard because ____.', zh: '它难在 ____。' },
      { en: 'Looking back, I think it was ____.', zh: '现在回头看，我认为那是 ____。' },
    ],
    followUp: [
      { en: 'Should important decisions be made quickly or slowly?', zh: '重要决定应该快做还是慢做？' },
      { en: 'Is it better to decide alone or to ask others for help?', zh: '独自决定好，还是求助他人更好？' },
    ],
  },
  {
    id: 'p2-help',
    type: 'ielts_part2',
    topic: 'Describe a time you helped someone',
    topicZh: '描述一次你帮助别人的经历',
    cue: {
      en: 'Describe a time when you helped someone. You should say who you helped, what the situation was, what you did, and explain how you felt afterwards.',
      zh: '描述一次你帮助别人的经历。说明：你帮了谁、当时是什么情况、你做了什么，并解释你事后的感受。',
    },
    points: [
      { en: 'Who you helped', zh: '你帮了谁' },
      { en: 'What the situation was', zh: '当时是什么情况' },
      { en: 'What you did', zh: '你做了什么' },
      { en: 'How you felt afterwards', zh: '事后你的感受' },
    ],
    scaffold: [
      { en: 'I once helped my ____.', zh: '我曾经帮助过我的 ____。' },
      { en: 'The situation was that ____.', zh: '当时的情况是 ____。' },
      { en: 'What I did was ____.', zh: '我做的是 ____。' },
      { en: 'Afterwards, I felt ____.', zh: '事后，我感到 ____。' },
    ],
    followUp: [
      { en: 'Why do some people avoid helping strangers?', zh: '为什么有些人不愿帮助陌生人？' },
      { en: 'Should schools teach students to help others?', zh: '学校应该教学生帮助他人吗？' },
    ],
  },
];

// ===========================================================================
// TOEFL iBT Speaking · Independent Task —— 就熟悉话题表达观点（45 秒）
// ===========================================================================
export const TOEFL_INDEPENDENT = [
  {
    id: 'tf-online-learning',
    type: 'toefl_independent',
    topic: 'Online vs classroom learning',
    topicZh: '在线学习 vs 课堂学习',
    prompt: {
      en: 'Some people prefer studying online, while others prefer studying in a traditional classroom. Which do you prefer and why? Use details and examples.',
      zh: '有人喜欢在线学习，有人喜欢传统课堂学习。你更喜欢哪种？为什么？请用细节和例子说明。',
    },
    scaffold: [
      { en: 'Personally, I prefer ____ for two main reasons.', zh: '就我个人而言，我更喜欢 ____，主要有两个原因。' },
      { en: 'First, ____. For example, ____.', zh: '首先，____。比如说，____。' },
      { en: 'Second, ____. That is why I believe ____.', zh: '其次，____。这就是为什么我认为 ____。' },
    ],
  },
  {
    id: 'tf-city-countryside',
    type: 'toefl_independent',
    topic: 'Living in a city or the countryside',
    topicZh: '住在城市还是乡村',
    prompt: {
      en: 'Do you think it is better to live in a big city or in the countryside? Explain your choice with specific reasons and examples.',
      zh: '你认为住在大城市好还是乡村好？用具体的理由和例子解释你的选择。',
    },
    scaffold: [
      { en: 'I would rather live in ____ than in ____.', zh: '比起 ____，我更愿意住在 ____。' },
      { en: 'The main reason is that ____.', zh: '主要原因是 ____。' },
      { en: 'On top of that, ____.', zh: '除此之外，____。' },
    ],
  },
  {
    id: 'tf-money-time',
    type: 'toefl_independent',
    topic: 'Saving money vs enjoying now',
    topicZh: '存钱 vs 当下享受',
    prompt: {
      en: 'Some people save money for the future, while others prefer to spend it and enjoy life now. Which approach do you agree with? Why?',
      zh: '有人为未来存钱，有人喜欢花钱享受当下。你认同哪种做法？为什么？',
    },
    scaffold: [
      { en: 'I tend to agree with people who ____.', zh: '我比较认同那些 ____ 的人。' },
      { en: 'This is mainly because ____.', zh: '这主要是因为 ____。' },
      { en: 'However, I also think a balance matters, because ____.', zh: '不过我也认为平衡很重要，因为 ____。' },
    ],
  },
  {
    id: 'tf-teamwork',
    type: 'toefl_independent',
    topic: 'Working alone vs in a team',
    topicZh: '独立工作 vs 团队合作',
    prompt: {
      en: 'Do you prefer to work alone or as part of a team? Use specific reasons and examples to support your answer.',
      zh: '你更喜欢独立工作还是团队合作？用具体理由和例子支持你的回答。',
    },
    scaffold: [
      { en: 'When it comes to work, I prefer ____.', zh: '说到工作，我更喜欢 ____。' },
      { en: 'One clear advantage is that ____.', zh: '一个明显的好处是 ____。' },
      { en: 'A good example of this is when ____.', zh: '一个很好的例子是当 ____ 的时候。' },
    ],
  },
  {
    id: 'tf-technology-life',
    type: 'toefl_independent',
    topic: 'Has technology made life better?',
    topicZh: '科技让生活更好了吗',
    prompt: {
      en: 'Some people believe technology has made our lives better, while others think it has created new problems. What is your opinion? Give reasons and examples.',
      zh: '有人认为科技让生活更好，有人认为它带来了新问题。你的观点是什么？给出理由和例子。',
    },
    scaffold: [
      { en: 'In my opinion, technology has mostly ____ our lives.', zh: '在我看来，科技总体上让我们的生活 ____。' },
      { en: 'For instance, it allows us to ____.', zh: '比如，它让我们能够 ____。' },
      { en: 'That said, one downside is ____.', zh: '话虽如此，一个缺点是 ____。' },
    ],
  },
  {
    id: 'tf-learn-from-failure',
    type: 'toefl_independent',
    topic: 'Do we learn more from failure or success?',
    topicZh: '我们从失败还是成功中学到更多',
    prompt: {
      en: 'Some people say we learn more from our failures than from our successes. Do you agree or disagree? Use specific reasons and examples.',
      zh: '有人说我们从失败中学到的比从成功中学到的更多。你同意吗？用具体理由和例子说明。',
    },
    scaffold: [
      { en: 'I tend to agree that we learn more from ____.', zh: '我倾向于认为我们从 ____ 中学到更多。' },
      { en: 'The reason is that failure forces us to ____.', zh: '原因是失败迫使我们去 ____。' },
      { en: 'For example, once I ____, and it taught me ____.', zh: '比如，有一次我 ____，它教会了我 ____。' },
    ],
  },
  {
    id: 'tf-travel-or-save',
    type: 'toefl_independent',
    topic: 'Spend on experiences or things?',
    topicZh: '把钱花在体验还是物品上',
    prompt: {
      en: 'When people have extra money, some spend it on experiences such as travel, while others buy things they want. Which do you think is better? Why?',
      zh: '当人们有余钱时，有人花在旅行等体验上，有人买想要的东西。你认为哪种更好？为什么？',
    },
    scaffold: [
      { en: 'If I had extra money, I would rather spend it on ____.', zh: '如果我有余钱，我更愿意花在 ____ 上。' },
      { en: 'This is because experiences / things give me ____.', zh: '这是因为体验 / 物品带给我 ____。' },
      { en: 'For example, ____.', zh: '比如说，____。' },
    ],
  },
  {
    id: 'tf-good-friend',
    type: 'toefl_independent',
    topic: 'The most important quality in a friend',
    topicZh: '朋友最重要的品质',
    prompt: {
      en: 'What do you think is the most important quality of a good friend? Use specific reasons and examples to support your answer.',
      zh: '你认为一个好朋友最重要的品质是什么？用具体理由和例子支持你的回答。',
    },
    scaffold: [
      { en: 'To me, the most important quality in a friend is ____.', zh: '对我来说，朋友最重要的品质是 ____。' },
      { en: 'This matters because ____.', zh: '这很重要，因为 ____。' },
      { en: 'For instance, a friend of mine once ____.', zh: '比如，我的一个朋友曾经 ____。' },
    ],
  },
  {
    id: 'tf-study-abroad',
    type: 'toefl_independent',
    topic: 'Studying at home or abroad',
    topicZh: '在国内还是出国学习',
    prompt: {
      en: 'Some students prefer to study in their own country, while others prefer to study abroad. Which do you think is better, and why?',
      zh: '有些学生喜欢在本国学习，有些喜欢出国学习。你认为哪种更好？为什么？',
    },
    scaffold: [
      { en: 'I believe studying ____ is better for most students.', zh: '我认为对大多数学生来说，在 ____ 学习更好。' },
      { en: 'The main reason is that ____.', zh: '主要原因是 ____。' },
      { en: 'For example, ____.', zh: '比如，____。' },
    ],
  },
  {
    id: 'tf-first-impression',
    type: 'toefl_independent',
    topic: 'Are first impressions reliable?',
    topicZh: '第一印象可靠吗',
    prompt: {
      en: 'Some people believe first impressions are usually correct, while others disagree. What is your opinion? Give reasons and examples.',
      zh: '有人认为第一印象通常是对的，有人不同意。你的看法是什么？给出理由和例子。',
    },
    scaffold: [
      { en: 'In my opinion, first impressions are ____ reliable.', zh: '在我看来，第一印象 ____ 可靠。' },
      { en: 'I think this because ____.', zh: '我这样认为是因为 ____。' },
      { en: 'A good example is when I ____.', zh: '一个很好的例子是当我 ____ 的时候。' },
    ],
  },
  {
    id: 'tf-books-vs-experience',
    type: 'toefl_independent',
    topic: 'Learning from books or experience',
    topicZh: '从书本还是经验中学习',
    prompt: {
      en: 'Do you think people learn more from books or from real-life experience? Use specific reasons and examples to explain your view.',
      zh: '你认为人们从书本还是从现实经验中学到更多？用具体理由和例子解释你的观点。',
    },
    scaffold: [
      { en: 'I think we learn more from ____.', zh: '我认为我们从 ____ 中学到更多。' },
      { en: 'The reason is that ____.', zh: '原因是 ____。' },
      { en: 'For example, once I ____ and it taught me ____.', zh: '比如，有一次我 ____，它教会了我 ____。' },
    ],
  },
];

// ===========================================================================
// 分组（供 UI 列表）
// ===========================================================================
export const SPEAKING_GROUPS = [
  {
    id: 'ielts_part1',
    title: '1 级 · 简短问答',
    titleEn: 'Level 1 · Short answers',
    desc: '熟悉话题快问快答 · 每题答 2–4 句 · 练「张口就来」',
    items: IELTS_PART1,
  },
  {
    id: 'ielts_part2',
    title: '2 级 · 话题独白',
    titleEn: 'Level 2 · Talk',
    desc: '看卡片 · 1 分钟想 · 连续说 1–2 分钟 · 练「成段表达」',
    items: IELTS_PART2,
  },
  {
    id: 'ielts_part3',
    title: '3 级 · 深入讨论',
    titleEn: 'Level 3 · Discussion',
    desc: '抽象话题深入讨论 · 表明观点 + 给理由 + 举例 · 练「有深度地说」',
    items: IELTS_PART3,
  },
  {
    id: 'toefl_independent',
    title: '4 级 · 观点表达',
    titleEn: 'Level 4 · Opinion',
    desc: '就熟悉话题表达观点 · 练「有理有据地说」',
    items: TOEFL_INDEPENDENT,
  },
];

export function countSpeakingItems() {
  return IELTS_PART1.length + IELTS_PART2.length + IELTS_PART3.length + TOEFL_INDEPENDENT.length;
}
