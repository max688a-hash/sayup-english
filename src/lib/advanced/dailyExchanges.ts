// @ts-nocheck
// 日常交流 · 高频真实场景（交流优先：达意即可）
// 每场景 3–4 轮：听对方 → 开口回应 → 达意评判

import { DAILY_EXCHANGES_BATCH_2 } from './dailyExchanges2';
import { DAILY_EXCHANGES_BATCH_3 } from './dailyExchanges3';
import { DAILY_EXCHANGES_BATCH_4, getFeaturedDaily } from './dailyExchanges4';
import { DAILY_EXCHANGES_BATCH_5 } from './dailyExchanges5';
import { DAILY_EXCHANGES_BATCH_6 } from './dailyExchanges6';
import { DAILY_EXCHANGES_BATCH_7 } from './dailyExchanges7';

export { getFeaturedDaily };

export const DAILY_LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1'];

export const DAILY_LEVEL_LABELS = {
  a1: 'A1 · 生存交流',
  a2: 'A2 · 日常熟练',
  b1: 'B1 · 流利闲聊',
  b2: 'B2 · 深入表达',
  c1: 'C1 · 高阶运用',
};

export const DAILY_EXCHANGES = [
  {
    id: 'dx-greet',
    level: 'a1',
    emoji: '👋',
    title: 'Morning Chat',
    titleZh: '早晨寒暄',
    intro: 'You bump into a neighbor in the elevator.',
    introZh: '电梯里遇到邻居，随口聊两句。',
    turns: [
      {
        bot: 'Good morning! How are you today?',
        botZh: '早上好！你今天怎么样？',
        keywords: ['good', 'fine', 'well', 'great', 'thanks', 'morning'],
        hints: [{ en: "I'm fine, thanks. And you?", zh: '我挺好，谢谢。你呢？' }],
        options: [
          { en: "I'm fine, thanks. And you?", zh: '我挺好，谢谢。你呢？' },
          { en: 'Pretty good! How about you?', zh: '挺好的！你呢？' },
          { en: 'A little tired, honestly.', zh: '说实话，有点累。' },
        ],
      },
      {
        bot: "I'm good too. Busy day ahead?",
        botZh: '我也挺好。今天忙吗？',
        keywords: ['yes', 'no', 'busy', 'work', 'school', 'little', 'not'],
        hints: [{ en: 'A little busy, but okay.', zh: '有点忙，还行。' }],
        options: [
          { en: 'A little busy, but okay.', zh: '有点忙，还行。' },
          { en: 'Not really, pretty relaxed.', zh: '还好，挺轻松的。' },
          { en: 'Yeah, super busy today!', zh: '是啊，今天超忙！' },
        ],
      },
      {
        bot: 'Have a nice day then!',
        botZh: '那祝你今天愉快！',
        keywords: ['you', 'too', 'thanks', 'nice', 'day', 'bye', 'see'],
        hints: [{ en: 'You too! See you later.', zh: '你也是！回头见。' }],
        options: [
          { en: 'You too! See you later.', zh: '你也是！回头见。' },
          { en: 'Thanks, you too!', zh: '谢谢，你也是！' },
          { en: 'Take care! Bye.', zh: '保重！再见。' },
        ],
      },
    ],
  },
  {
    id: 'dx-coffee',
    level: 'a1',
    emoji: '☕',
    title: 'Coffee Order',
    titleZh: '咖啡店点单',
    intro: 'You are at a café counter.',
    introZh: '站在咖啡店柜台前点饮料。',
    turns: [
      {
        bot: 'Hi! What can I get for you?',
        botZh: '你好！想喝点什么？',
        keywords: ['coffee', 'latte', 'tea', 'water', 'please', 'want', 'like'],
        hints: [{ en: "I'd like a latte, please.", zh: '请给我一杯拿铁。' }],
      },
      {
        bot: 'Hot or iced?',
        botZh: '热的还是冰的？',
        keywords: ['hot', 'iced', 'warm', 'cold', 'ice'],
        hints: [{ en: 'Hot, please.', zh: '热的，谢谢。' }],
      },
      {
        bot: 'Anything else?',
        botZh: '还要别的吗？',
        keywords: ['no', 'nothing', 'that', 'all', 'thanks', 'just'],
        hints: [{ en: "No, that's all. Thanks.", zh: '不用了，就这些，谢谢。' }],
      },
    ],
  },
  {
    id: 'dx-directions',
    level: 'a1',
    emoji: '🗺️',
    title: 'Ask Directions',
    titleZh: '问路',
    intro: 'You are lost and ask someone on the street.',
    introZh: '在街上迷路了，向路人问路。',
    turns: [
      {
        bot: 'Can I help you?',
        botZh: '需要帮忙吗？',
        altBots: [
          { en: 'You look lost.', zh: '你好像迷路了。（换说法）' },
          { en: 'Need help finding something?', zh: '需要帮忙找什么吗？' },
        ],
        keywords: ['yes', 'help', 'lost', 'find', 'where', 'station', 'subway'],
        hints: [
          { en: 'Yes, where is the subway station?', zh: '是的，地铁站在哪？' },
          { en: 'Yes. How do I get to the subway?', zh: '是的，地铁怎么走？（换种问法）' },
        ],
      },
      {
        bot: "It's two blocks that way. About five minutes on foot.",
        botZh: '往那边走两个街区，步行大约五分钟。',
        altBots: [
          { en: 'Just keep walking that way—you cannot miss it.', zh: '往那边一直走，肯定能找到。' },
          { en: 'See the red sign? The entrance is right there.', zh: '看到红牌了吗？入口就在那儿。' },
        ],
        keywords: ['thank', 'thanks', 'got', 'understand', 'okay', 'ok'],
        hints: [{ en: 'Thank you so much!', zh: '太感谢了！' }],
      },
    ],
  },
  {
    id: 'dx-restaurant',
    level: 'a2',
    emoji: '🍽️',
    title: 'At a Restaurant',
    titleZh: '餐厅吃饭',
    intro: 'The waiter comes to your table.',
    introZh: '服务员来到你桌前。',
    turns: [
      {
        bot: 'Are you ready to order?',
        botZh: '可以点餐了吗？',
        keywords: ['yes', 'ready', 'order', 'menu', 'minute', 'need'],
        hints: [{ en: 'Yes, I think we are ready.', zh: '好了，我们可以点了。' }],
      },
      {
        bot: 'What would you like to drink?',
        botZh: '想喝点什么？',
        keywords: ['water', 'juice', 'beer', 'wine', 'tea', 'cola', 'please'],
        hints: [{ en: 'Two waters, please.', zh: '请来两杯水。' }],
      },
      {
        bot: 'Anything to start with?',
        botZh: '要先来点前菜吗？',
        keywords: ['salad', 'soup', 'bread', 'no', 'just', 'main'],
        hints: [{ en: "We'll start with a salad.", zh: '我们先来一份沙拉。' }],
      },
      {
        bot: 'Perfect. I will be right back.',
        botZh: '好的，我马上回来。',
        keywords: ['thank', 'thanks', 'great', 'okay'],
        hints: [{ en: 'Thanks!', zh: '谢谢！' }],
      },
    ],
  },
  {
    id: 'dx-shopping',
    level: 'a2',
    emoji: '🛍️',
    title: 'Clothes Shopping',
    titleZh: '买衣服',
    intro: 'You are trying on a jacket in a store.',
    introZh: '在店里试一件夹克。',
    turns: [
      {
        bot: 'How does it fit?',
        botZh: '合身吗？',
        keywords: ['good', 'big', 'small', 'tight', 'loose', 'perfect', 'little'],
        hints: [{ en: "It's a little big.", zh: '有点大。' }],
      },
      {
        bot: 'We have a smaller size. Want to try it?',
        botZh: '有小一号的，要试试吗？',
        keywords: ['yes', 'please', 'sure', 'try', 'okay', 'ok'],
        hints: [{ en: 'Yes, please.', zh: '好的，麻烦。' }],
      },
      {
        bot: 'Much better?',
        botZh: '这次好多了吧？',
        keywords: ['yes', 'better', 'perfect', 'love', 'take', 'buy'],
        hints: [{ en: "Yes, I'll take it.", zh: '嗯，我买了。' }],
      },
    ],
  },
  {
    id: 'dx-phone',
    level: 'a2',
    emoji: '📞',
    title: 'Phone Call',
    titleZh: '打电话',
    intro: 'You call a friend to change plans.',
    introZh: '给朋友打电话改约会时间。',
    turns: [
      {
        bot: 'Hey! What is up?',
        botZh: '嘿！怎么了？',
        keywords: ['hi', 'hey', 'sorry', 'call', 'change', 'plans', 'tonight'],
        hints: [{ en: 'Hey, can we change our plans tonight?', zh: '嘿，今晚的计划能改一下吗？' }],
      },
      {
        bot: 'Sure. What time works for you?',
        botZh: '可以。你几点方便？',
        keywords: ['seven', 'eight', 'tomorrow', 'later', 'weekend', 'pm', 'am'],
        hints: [{ en: 'How about tomorrow at seven?', zh: '明天七点怎么样？' }],
      },
      {
        bot: 'Sounds good. See you then!',
        botZh: '行，到时候见！',
        keywords: ['see', 'thanks', 'great', 'perfect', 'bye'],
        hints: [{ en: 'Perfect, see you then!', zh: '好，到时候见！' }],
      },
    ],
  },
  {
    id: 'dx-work-small',
    level: 'b1',
    emoji: '💼',
    title: 'Office Small Talk',
    titleZh: '办公室闲聊',
    intro: 'Monday morning at the coffee machine.',
    introZh: '周一早上，在咖啡机旁和同事搭话。',
    turns: [
      {
        bot: 'Rough start to the week?',
        botZh: '这周开头够呛吧？',
        keywords: ['yeah', 'yes', 'busy', 'monday', 'tired', 'little', 'bit'],
        hints: [{ en: 'Yeah, a bit busy already.', zh: '是啊，已经有点忙了。' }],
      },
      {
        bot: 'Any fun plans for the weekend?',
        botZh: '周末有什么好玩的安排吗？',
        keywords: ['maybe', 'visit', 'family', 'rest', 'movie', 'hike', 'nothing'],
        hints: [{ en: 'Maybe visit my parents.', zh: '可能去看看父母。' }],
      },
      {
        bot: 'That sounds nice. Good luck today!',
        botZh: '不错。今天加油！',
        keywords: ['thanks', 'you', 'too', 'appreciate', 'cheers'],
        hints: [{ en: 'Thanks, you too!', zh: '谢谢，你也是！' }],
      },
    ],
  },
  {
    id: 'dx-apology',
    level: 'b1',
    emoji: '🙏',
    title: 'Sorry & Fix It',
    titleZh: '道歉与补救',
    intro: 'You are late for a meeting with a colleague.',
    introZh: '和同事开会迟到了。',
    turns: [
      {
        bot: 'We already started. Everything okay?',
        botZh: '我们已经开始了。没事吧？',
        keywords: ['sorry', 'late', 'traffic', 'apologize', 'my', 'fault'],
        hints: [{ en: "I'm really sorry I'm late.", zh: '真的很抱歉我迟到了。' }],
      },
      {
        bot: 'No worries. Want to catch up after?',
        botZh: '没事。会后要对一下吗？',
        keywords: ['yes', 'sure', 'please', 'thanks', 'appreciate', 'coffee'],
        hints: [{ en: 'Yes, thanks for understanding.', zh: '好的，谢谢理解。' }],
      },
    ],
  },
  ...DAILY_EXCHANGES_BATCH_2,
  ...DAILY_EXCHANGES_BATCH_3,
  ...DAILY_EXCHANGES_BATCH_4,
  ...DAILY_EXCHANGES_BATCH_5,
  ...DAILY_EXCHANGES_BATCH_6,
  ...DAILY_EXCHANGES_BATCH_7,
];

export function getDailyCount() {
  return DAILY_EXCHANGES.length;
}

export function getDailyByLevel(level) {
  return DAILY_EXCHANGES.filter((d) => d.level === level);
}

export function getDailyById(id) {
  return DAILY_EXCHANGES.find((d) => d.id === id) || null;
}
