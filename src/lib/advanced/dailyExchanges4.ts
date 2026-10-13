// @ts-nocheck
// 日常交流 · 第四批：专治「背了六年只会一句，换说法就听不懂」
// 每轮含 altBots：同一意思的不同英文说法，练耳朵不是背课本

export const DAILY_EXCHANGES_BATCH_4 = [
  {
    id: 'dx-bus-station-real',
    level: 'a1',
    emoji: '🚌',
    featured: true,
    title: 'Find the Bus Station',
    titleZh: '找公交站（第一课·推荐）',
    intro: 'School taught you one sentence. Real people say it differently.',
    introZh:
      '课本只教 Where is the bus station? 真人会换着说——听不懂就没法接话。这里专练「同一种意思，不同英文」。',
    turns: [
      {
        bot: 'Can I help you?',
        botZh: '需要帮忙吗？',
        altBots: [
          { en: 'You look lost. Need a hand?', zh: '你好像迷路了，要帮忙吗？' },
          { en: 'Are you looking for something?', zh: '你在找什么吗？' },
        ],
        keywords: ['yes', 'bus', 'station', 'stop', 'find', 'looking', 'where', 'how', 'get'],
        hints: [
          { en: 'Yes. Where is the bus station?', zh: '是的，公交站在哪？（课本句）' },
          { en: "I'm looking for the bus stop.", zh: '我在找公交站。（换种说法）' },
          { en: 'How do I get to the bus station?', zh: '怎么去公交站？（换种说法）' },
        ],
      },
      {
        bot: 'The bus stop is just around the corner.',
        botZh: '公交站就在拐角那边。',
        altBots: [
          { en: 'Go straight and turn right—you will see it.', zh: '直走右转就能看到。（不是课本那句）' },
          { en: "It's about a two-minute walk from here.", zh: '从这里走大约两分钟。' },
          { en: "You can't miss it.", zh: '你不会找不到的 / 肯定找得到。（口语：就在眼前）' },
        ],
        keywords: ['thank', 'thanks', 'got', 'okay', 'ok', 'see', 'understand', 'corner'],
        hints: [
          { en: 'Thank you! I think I got it.', zh: '谢谢，我应该明白了。' },
          { en: 'Thanks. So I go straight and turn right?', zh: '谢谢，所以我直走右转？' },
        ],
      },
      {
        bot: 'Line 5 goes to the city center.',
        botZh: '5 路车去市中心。',
        altBots: [
          { en: 'Take the number five bus for downtown.', zh: '坐 5 路车去市区。（换说法）' },
          { en: 'If you want downtown, grab the five.', zh: '要去市区就坐 5 路。（更口语）' },
        ],
        keywords: ['thanks', 'thank', 'five', 'bus', 'center', 'downtown', 'take'],
        hints: [
          { en: 'Thanks! I will take line 5.', zh: '谢谢，我坐 5 路。' },
          { en: 'Got it. Thank you so much!', zh: '明白了，非常感谢！' },
        ],
      },
    ],
  },
  {
    id: 'dx-ask-directions-varied',
    level: 'a1',
    emoji: '🗺️',
    featured: true,
    title: 'Directions — Same Meaning',
    titleZh: '问路·听懂换说法',
    intro: 'Someone gives directions. They never use your textbook words.',
    introZh: '指路时没人会按你课本里的句子说。先听懂意思，再开口谢。',
    turns: [
      {
        bot: 'The subway is two blocks north.',
        botZh: '地铁在北边两个街区。',
        altBots: [
          { en: 'Head north for about five minutes—you will hit the station.', zh: '往北走大约五分钟就到站。' },
          { en: 'Walk up this street; the entrance is on your left.', zh: '沿这条街往上走，入口在你左手边。' },
        ],
        keywords: ['thank', 'thanks', 'north', 'got', 'okay', 'left', 'see'],
        hints: [
          { en: 'Thank you! I will head north.', zh: '谢谢，我往北走。' },
          { en: 'Thanks, I think I see it now.', zh: '谢谢，我好像明白了。' },
        ],
      },
      {
        bot: 'You are welcome! Have a good day.',
        botZh: '不客气！祝你有美好的一天。',
        altBots: [
          { en: 'No problem. Take care!', zh: '没事，保重！（同义告别）' },
          { en: 'Anytime. Good luck!', zh: '随时问。祝顺利！' },
        ],
        keywords: ['you', 'too', 'thanks', 'bye', 'good', 'day', 'same'],
        hints: [
          { en: 'You too. Thanks again!', zh: '你也是，再次感谢！' },
          { en: 'Thanks. Have a good one!', zh: '谢谢，你也一样！' },
        ],
      },
    ],
  },
];

export function getFeaturedDaily() {
  return DAILY_EXCHANGES_BATCH_4.filter((d) => d.featured);
}
