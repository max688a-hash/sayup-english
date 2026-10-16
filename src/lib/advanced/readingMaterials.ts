// @ts-nocheck
// 文档阅读资源 · 高频词汇识别加深模块
// ----------------------------------------------------------------------------
// 方法学溯源（红线七/九）：
//   Nation, I. S. P. (2001). Learning Vocabulary in Another Language.
//   Cambridge University Press.
//   —— 高频 2000 词覆盖约 80% 的日常文本；学习者应优先掌握这些词。
//
//   Krashen, S. D. (1993). The Power of Reading: Insights from the Research.
//   Libraries Unlimited.
//   —— 自由自主阅读 (Free Voluntary Reading, FVR) 是词汇附带习得的最有效方式。
//
//   Cobb, T. (2007). Computing the vocabulary demands of L2 reading.
//   Language Learning & Technology, 11(3), 38-63.
//   —— 文本词汇密度分析可量化阅读难度，指导分级阅读。
//
// 设计原则：
//   1. 每篇文章按 CEFR 分级，配真实日常主题
//   2. 高频词（Nation K1-K2 频段）在文中标注，点击可查看释义 + 例句
//   3. 阅读后输出词汇清单（新词 vs 已掌握词），与 SRS 对接
//   4. 零虚假数据（红线一）：文章为原创真实内容，非抄袭
//   5. 高频词频段标注基于 Nation (2001) BNC/COCA 频率表公开分级

// ============================================================
// 词频分级（基于 Nation 2001 BNC/COCA 频率带）
// ============================================================
// K1 = 最高频 1000 词（覆盖约 72% 文本）
// K2 = 次高频 1001-2000 词（额外覆盖 ~8%）
// K3 = 中频 2001-3000 词
// AWL = 学术词表 (Coxhead 2000)
// OFF = 超出前 3000 + AWL

export const FREQ_BANDS = {
  K1: { label: '最高频', color: '#22c55e', description: '最常用 1000 词（72% 覆盖率）' },
  K2: { label: '高频', color: '#3b82f6', description: '常用 1001-2000 词（+8%）' },
  K3: { label: '中频', color: '#f59e0b', description: '进阶 2001-3000 词' },
  AWL: { label: '学术', color: '#8b5cf6', description: '学术高频词表' },
  OFF: { label: '低频', color: '#ef4444', description: '超出常用范围' },
};

import { READING_MATERIALS_BATCH_2 } from './readingMaterials2';
import { READING_MATERIALS_BATCH_3 } from './readingMaterials3';

// ============================================================
// 阅读材料
// ============================================================
// 结构：
//   id, cefr, title, titleZh, topic, content (全文),
//   vocab: [{ word, pos, zh, freq, exampleEn, exampleZh }]
//     freq = 'K1' | 'K2' | 'K3' | 'AWL' | 'OFF'
//   comprehension: [{ question, questionZh, options, answer }]

export const READING_MATERIALS = [
  // ==================== A1 ====================
  {
    id: 'read-a1-daily',
    cefr: 'A1',
    title: 'My Morning Routine',
    titleZh: '我的早晨日常',
    topic: '日常生活',
    content: `Every morning, I wake up at seven o'clock. I brush my teeth and wash my face. Then I eat breakfast. I usually have bread and milk. After breakfast, I put on my shoes and go to school. I walk to school with my friend Lily. We talk and laugh on the way. School starts at eight thirty. I like mornings because everything feels fresh and new.`,
    vocab: [
      { word: 'wake', pos: 'v.', zh: '醒来', freq: 'K1', exampleEn: 'I wake up early every day.', exampleZh: '我每天早起。' },
      { word: 'brush', pos: 'v.', zh: '刷', freq: 'K1', exampleEn: 'Brush your teeth before bed.', exampleZh: '睡前刷牙。' },
      { word: 'breakfast', pos: 'n.', zh: '早餐', freq: 'K1', exampleEn: 'What did you have for breakfast?', exampleZh: '你早餐吃了什么？' },
      { word: 'usually', pos: 'adv.', zh: '通常', freq: 'K1', exampleEn: 'I usually go to bed at ten.', exampleZh: '我通常十点睡觉。' },
      { word: 'fresh', pos: 'adj.', zh: '清新的', freq: 'K2', exampleEn: 'The air is fresh after rain.', exampleZh: '雨后空气很清新。' },
    ],
    comprehension: [
      { question: 'What time does the writer wake up?', questionZh: '作者几点醒？', options: ['6:00', '7:00', '8:00', '9:00'], answer: 1 },
      { question: 'What does the writer eat for breakfast?', questionZh: '作者早餐吃什么？', options: ['Rice and soup', 'Bread and milk', 'Eggs and juice', 'Nothing'], answer: 1 },
      { question: 'How does the writer go to school?', questionZh: '作者怎么去上学？', options: ['By bus', 'By bike', 'On foot', 'By car'], answer: 2 },
    ],
  },

  {
    id: 'read-a1-pet',
    cefr: 'A1',
    title: 'My Dog Max',
    titleZh: '我的狗 Max',
    topic: '宠物',
    content: `I have a dog. His name is Max. He is brown and white. Max is very friendly. He likes to play with a ball in the park. Every afternoon, I take Max for a walk. He runs and jumps. Sometimes he chases birds, but he never catches them. Max sleeps on a small bed next to mine. He is my best friend.`,
    vocab: [
      { word: 'friendly', pos: 'adj.', zh: '友好的', freq: 'K1', exampleEn: 'She is a very friendly person.', exampleZh: '她是个非常友善的人。' },
      { word: 'afternoon', pos: 'n.', zh: '下午', freq: 'K1', exampleEn: 'I have class this afternoon.', exampleZh: '我今天下午有课。' },
      { word: 'chase', pos: 'v.', zh: '追', freq: 'K2', exampleEn: 'The cat chased the mouse.', exampleZh: '猫追老鼠。' },
      { word: 'catch', pos: 'v.', zh: '抓住', freq: 'K1', exampleEn: 'Can you catch the ball?', exampleZh: '你能接住球吗？' },
      { word: 'next to', pos: 'prep.', zh: '在…旁边', freq: 'K1', exampleEn: 'Sit next to me.', exampleZh: '坐我旁边。' },
    ],
    comprehension: [
      { question: 'What color is Max?', questionZh: 'Max 是什么颜色？', options: ['Black', 'Brown and white', 'White', 'Grey'], answer: 1 },
      { question: 'What does Max like to play with?', questionZh: 'Max 喜欢玩什么？', options: ['A stick', 'A ball', 'A bone', 'A toy'], answer: 1 },
    ],
  },

  // ==================== A2 ====================
  {
    id: 'read-a2-travel',
    cefr: 'A2',
    title: 'A Weekend in Beijing',
    titleZh: '北京周末游',
    topic: '旅行',
    content: `Last weekend, my family and I visited Beijing. We took the high-speed train from Shanghai. It only took about four and a half hours. On Saturday, we went to the Great Wall. It was amazing but very tiring. We climbed many steps. My legs hurt after that! On Sunday, we visited the Forbidden City. It was huge and beautiful. We also tried Beijing roast duck for dinner. It was delicious. I want to go back again next year.`,
    vocab: [
      { word: 'visited', pos: 'v.', zh: '参观了', freq: 'K1', exampleEn: 'We visited the museum yesterday.', exampleZh: '我们昨天参观了博物馆。' },
      { word: 'amazing', pos: 'adj.', zh: '惊人的', freq: 'K2', exampleEn: 'The view from the top was amazing.', exampleZh: '山顶的景色令人惊叹。' },
      { word: 'tiring', pos: 'adj.', zh: '累人的', freq: 'K2', exampleEn: 'The long walk was very tiring.', exampleZh: '长途步行很累人。' },
      { word: 'climbed', pos: 'v.', zh: '爬了', freq: 'K2', exampleEn: 'We climbed the mountain together.', exampleZh: '我们一起爬了山。' },
      { word: 'huge', pos: 'adj.', zh: '巨大的', freq: 'K2', exampleEn: 'The building is huge.', exampleZh: '这栋楼很大。' },
      { word: 'delicious', pos: 'adj.', zh: '美味的', freq: 'K2', exampleEn: 'This cake is delicious!', exampleZh: '这蛋糕真好吃！' },
    ],
    comprehension: [
      { question: 'How did they travel to Beijing?', questionZh: '他们怎么去的北京？', options: ['By plane', 'By car', 'By high-speed train', 'By bus'], answer: 2 },
      { question: 'What did they do on Saturday?', questionZh: '他们周六做了什么？', options: ['Visited the Forbidden City', 'Went to the Great Wall', 'Tried roast duck', 'Went shopping'], answer: 1 },
      { question: 'What food did they try?', questionZh: '他们尝了什么食物？', options: ['Noodles', 'Dumplings', 'Roast duck', 'Hot pot'], answer: 2 },
    ],
  },

  {
    id: 'read-a2-job',
    cefr: 'A2',
    title: 'My First Day at Work',
    titleZh: '上班第一天',
    topic: '职场',
    content: `Today was my first day at a new company. I was nervous but excited. I arrived at the office at 8:50, ten minutes early. My manager, Mr. Wang, showed me around the office. He introduced me to my team. Everyone was very nice and welcoming. My desk was near the window, which I liked. In the afternoon, I had a meeting with my team. We talked about a new project. I didn't understand everything, but I took notes. After work, I felt tired but happy. I think I will enjoy working here.`,
    vocab: [
      { word: 'nervous', pos: 'adj.', zh: '紧张的', freq: 'K2', exampleEn: 'She was nervous before the exam.', exampleZh: '她考试前很紧张。' },
      { word: 'arrived', pos: 'v.', zh: '到达了', freq: 'K1', exampleEn: 'The train arrived on time.', exampleZh: '火车准时到达了。' },
      { word: 'introduced', pos: 'v.', zh: '介绍了', freq: 'K2', exampleEn: 'He introduced himself to the class.', exampleZh: '他向全班介绍了自己。' },
      { word: 'welcoming', pos: 'adj.', zh: '热情的', freq: 'K2', exampleEn: 'The host was very welcoming.', exampleZh: '主人非常热情。' },
      { word: 'project', pos: 'n.', zh: '项目', freq: 'K2', exampleEn: 'We started a new project today.', exampleZh: '我们今天开始了一个新项目。' },
      { word: 'notes', pos: 'n.', zh: '笔记', freq: 'K1', exampleEn: 'Take notes during the lecture.', exampleZh: '上课时做笔记。' },
    ],
    comprehension: [
      { question: 'How did the writer feel on the first day?', questionZh: '作者第一天感觉如何？', options: ['Angry', 'Nervous but excited', 'Bored', 'Sad'], answer: 1 },
      { question: 'Where was the writer\'s desk?', questionZh: '作者的桌子在哪？', options: ['Near the door', 'Near the window', 'In the corner', 'Next to the manager'], answer: 1 },
    ],
  },

  // ==================== B1 ====================
  {
    id: 'read-b1-health',
    cefr: 'B1',
    title: 'The Benefits of Regular Exercise',
    titleZh: '规律运动的好处',
    topic: '健康',
    content: `Regular exercise is one of the best things you can do for your health. Research shows that people who exercise at least 30 minutes a day are less likely to suffer from heart disease, diabetes, and depression. Exercise helps your body stay strong and your mind stay sharp.

You don't need to go to a gym or run a marathon. Simple activities like walking, cycling, or swimming can make a big difference. The key is consistency — doing a little bit every day is much better than doing a lot once a week.

Exercise also improves your sleep quality. People who are physically active tend to fall asleep faster and sleep more deeply. Additionally, exercise releases chemicals in the brain called endorphins, which make you feel happier and more relaxed.

If you're just starting out, begin with 10 minutes a day and gradually increase the duration. The most important step is the first one — just get moving.`,
    vocab: [
      { word: 'regular', pos: 'adj.', zh: '规律的', freq: 'K1', exampleEn: 'Regular meals are important for health.', exampleZh: '规律饮食对健康很重要。' },
      { word: 'research', pos: 'n.', zh: '研究', freq: 'K2', exampleEn: 'The research took three years.', exampleZh: '这项研究花了三年。' },
      { word: 'suffer', pos: 'v.', zh: '遭受', freq: 'K2', exampleEn: 'Many people suffer from stress.', exampleZh: '很多人承受压力。' },
      { word: 'consistency', pos: 'n.', zh: '一致性/坚持', freq: 'K3', exampleEn: 'Success requires consistency.', exampleZh: '成功需要坚持。' },
      { word: 'physically', pos: 'adv.', zh: '身体上', freq: 'K2', exampleEn: 'He is physically fit.', exampleZh: '他身体很好。' },
      { word: 'endorphins', pos: 'n.', zh: '内啡肽', freq: 'OFF', exampleEn: 'Exercise releases endorphins.', exampleZh: '运动释放内啡肽。' },
      { word: 'gradually', pos: 'adv.', zh: '逐渐地', freq: 'K2', exampleEn: 'The pain gradually went away.', exampleZh: '疼痛逐渐消失了。' },
      { word: 'duration', pos: 'n.', zh: '持续时间', freq: 'AWL', exampleEn: 'The duration of the flight is 3 hours.', exampleZh: '飞行时间为 3 小时。' },
    ],
    comprehension: [
      { question: 'How long should you exercise each day according to the article?', questionZh: '文章建议每天运动多久？', options: ['10 minutes', '20 minutes', '30 minutes', '60 minutes'], answer: 2 },
      { question: 'What are endorphins?', questionZh: '内啡肽是什么？', options: ['A type of exercise', 'Chemicals in the brain', 'A kind of food', 'A disease'], answer: 1 },
      { question: 'What is the key to effective exercise?', questionZh: '有效运动的关键是什么？', options: ['Going to a gym', 'Running marathons', 'Consistency', 'Expensive equipment'], answer: 2 },
    ],
  },

  {
    id: 'read-b1-tech',
    cefr: 'B1',
    title: 'How Social Media Changed Communication',
    titleZh: '社交媒体如何改变沟通',
    topic: '科技',
    content: `Social media has completely changed the way people communicate. Twenty years ago, if you wanted to contact a friend in another country, you had to write a letter or make an expensive phone call. Now, you can send a message, share a photo, or even have a video call instantly — all for free.

However, social media has also created new problems. Many people spend too much time scrolling through their feeds instead of having real conversations. Studies show that excessive social media use can lead to feelings of loneliness and anxiety.

Another concern is privacy. When you post something online, it stays there forever. Employers, schools, and even strangers can access your personal information. It's important to think carefully before sharing anything on the internet.

Despite these challenges, social media remains a powerful tool for staying connected, sharing ideas, and even learning new things. The key is to use it wisely and not let it control your life.`,
    vocab: [
      { word: 'communicate', pos: 'v.', zh: '交流', freq: 'K2', exampleEn: 'It\'s important to communicate clearly.', exampleZh: '清楚交流很重要。' },
      { word: 'instantly', pos: 'adv.', zh: '即时地', freq: 'K2', exampleEn: 'The message was delivered instantly.', exampleZh: '消息即时送达。' },
      { word: 'scrolling', pos: 'v.', zh: '滚动浏览', freq: 'K3', exampleEn: 'Stop scrolling and go to bed.', exampleZh: '别刷手机了，去睡觉。' },
      { word: 'excessive', pos: 'adj.', zh: '过度的', freq: 'K3', exampleEn: 'Excessive sugar is bad for you.', exampleZh: '过多的糖对你有害。' },
      { word: 'loneliness', pos: 'n.', zh: '孤独感', freq: 'K2', exampleEn: 'Loneliness is a growing problem.', exampleZh: '孤独感是一个日益严重的问题。' },
      { word: 'privacy', pos: 'n.', zh: '隐私', freq: 'K2', exampleEn: 'Everyone deserves privacy.', exampleZh: '每个人都值得拥有隐私。' },
      { word: 'access', pos: 'v.', zh: '访问/获取', freq: 'AWL', exampleEn: 'You can access the file online.', exampleZh: '你可以在线获取该文件。' },
      { word: 'despite', pos: 'prep.', zh: '尽管', freq: 'K2', exampleEn: 'Despite the rain, we went out.', exampleZh: '尽管下雨，我们还是出门了。' },
    ],
    comprehension: [
      { question: 'What problem can excessive social media use cause?', questionZh: '过度使用社交媒体会导致什么问题？', options: ['Better sleep', 'More friends', 'Loneliness and anxiety', 'Better grades'], answer: 2 },
      { question: 'What is a concern about posting online?', questionZh: '在网上发帖有什么顾虑？', options: ['It\'s too slow', 'Privacy issues', 'It costs money', 'Poor internet'], answer: 1 },
    ],
  },

  // ==================== B2 ====================
  {
    id: 'read-b2-economy',
    cefr: 'B2',
    title: 'The Rise of Remote Work',
    titleZh: '远程工作的兴起',
    topic: '经济与职场',
    content: `The COVID-19 pandemic accelerated a trend that was already underway: the shift toward remote work. Before 2020, only about 5% of full-time employees worked from home regularly. By 2023, that figure had risen to over 25%, and many companies adopted hybrid models that combine in-office and remote work.

Proponents of remote work argue that it increases productivity, reduces commuting time, and improves work-life balance. Employees save money on transportation and meals, while companies can reduce overhead costs by downsizing office space.

Critics, however, point out several drawbacks. Remote workers may struggle with isolation, difficulty separating work from personal life, and reduced opportunities for spontaneous collaboration. New employees, in particular, may find it challenging to build relationships and absorb company culture without face-to-face interaction.

The future likely lies in a hybrid approach. Organizations that can effectively blend remote and in-person work will have a competitive advantage in attracting and retaining talent. The key challenge is creating systems that maintain team cohesion and accountability regardless of where people work.`,
    vocab: [
      { word: 'accelerated', pos: 'v.', zh: '加速了', freq: 'AWL', exampleEn: 'Technology accelerated the change.', exampleZh: '技术加速了变革。' },
      { word: 'proponents', pos: 'n.', zh: '支持者', freq: 'K3', exampleEn: 'Proponents of the plan spoke first.', exampleZh: '计划的支持者先发了言。' },
      { word: 'productivity', pos: 'n.', zh: '生产力', freq: 'AWL', exampleEn: 'Her productivity increased this month.', exampleZh: '她这个月的效率提高了。' },
      { word: 'overhead', pos: 'n.', zh: '管理费用', freq: 'K3', exampleEn: 'Overhead costs are rising.', exampleZh: '管理费用在上涨。' },
      { word: 'isolation', pos: 'n.', zh: '隔离/孤立', freq: 'AWL', exampleEn: 'Social isolation affects mental health.', exampleZh: '社交孤立影响心理健康。' },
      { word: 'spontaneous', pos: 'adj.', zh: '自发的', freq: 'K3', exampleEn: 'It was a spontaneous decision.', exampleZh: '那是一个即兴的决定。' },
      { word: 'cohesion', pos: 'n.', zh: '凝聚力', freq: 'AWL', exampleEn: 'Team cohesion is important for success.', exampleZh: '团队凝聚力对成功很重要。' },
      { word: 'accountability', pos: 'n.', zh: '问责制', freq: 'AWL', exampleEn: 'There must be accountability for results.', exampleZh: '结果必须有人负责。' },
    ],
    comprehension: [
      { question: 'What percentage of employees worked from home before 2020?', questionZh: '2020 年之前有多少员工在家办公？', options: ['About 5%', 'About 15%', 'About 25%', 'About 50%'], answer: 0 },
      { question: 'What is a drawback of remote work mentioned in the article?', questionZh: '文章提到的远程工作缺点是什么？', options: ['Higher salary', 'Isolation', 'Better productivity', 'Less commuting'], answer: 1 },
      { question: 'What approach does the article suggest for the future?', questionZh: '文章建议未来采用什么方式？', options: ['Fully remote', 'Fully in-office', 'Hybrid', 'Freelance'], answer: 2 },
    ],
  },

  // ==================== A2 · 日常交流主题 ====================
  {
    id: 'read-a2-market',
    cefr: 'A2',
    title: 'At the Supermarket',
    titleZh: '在超市',
    topic: '日常生活',
    content: `Last Saturday I went to the supermarket near my home. I needed milk, eggs, and some fruit. The store was busy, but the lines moved quickly. I asked a worker, "Excuse me, where is the bread?" She smiled and said, "Aisle three, on the left." I thanked her and found everything I needed. At the checkout, I paid with my phone. The total was not too expensive. I carried the bags home and made lunch for my family. It was a simple trip, but I practiced useful words for shopping and asking for help.`,
    vocab: [
      { word: 'supermarket', pos: 'n.', zh: '超市', freq: 'K2', exampleEn: 'We shop at the supermarket on Sundays.', exampleZh: '我们周日去超市买东西。' },
      { word: 'aisle', pos: 'n.', zh: '货架通道', freq: 'K3', exampleEn: 'The milk is in aisle five.', exampleZh: '牛奶在第五通道。' },
      { word: 'checkout', pos: 'n.', zh: '收银台', freq: 'K3', exampleEn: 'There is a long line at checkout.', exampleZh: '收银台排队很长。' },
      { word: 'expensive', pos: 'adj.', zh: '贵的', freq: 'K2', exampleEn: 'This jacket is too expensive.', exampleZh: '这件夹克太贵了。' },
    ],
    comprehension: [
      { question: 'What did the writer ask the worker?', questionZh: '作者问了店员什么？', options: ['Where is the bread', 'What time do you close', 'Do you have coffee', 'How much is this'], answer: 0 },
      { question: 'How did the writer pay?', questionZh: '作者怎么付款？', options: ['Cash only', 'Credit card', 'Phone', 'Check'], answer: 2 },
    ],
    speakLine: 'Tell a friend what you bought at a store last week.',
    speakLineZh: '用英语告诉朋友你上周在店里买了什么。',
  },
  {
    id: 'read-a2-plans',
    cefr: 'A2',
    title: 'Making Weekend Plans',
    titleZh: '安排周末',
    topic: '社交交流',
    content: `On Friday afternoon, my friend Lin sent me a message: "Are you free this weekend?" I replied, "Yes! What do you want to do?" She suggested going to a new café and then taking a walk in the park. I said that sounded great. We agreed to meet at ten on Saturday morning. I asked if I should bring anything, and she said, "Just yourself." On Saturday, the weather was sunny. We talked about work, movies, and travel. It was easy and fun. Making plans in English does not have to be perfect. The important thing is to understand each other and enjoy the time together.`,
    vocab: [
      { word: 'weekend', pos: 'n.', zh: '周末', freq: 'K1', exampleEn: 'What are you doing this weekend?', exampleZh: '这周末你做什么？' },
      { word: 'suggested', pos: 'v.', zh: '建议', freq: 'K2', exampleEn: 'She suggested a good restaurant.', exampleZh: '她推荐了一家不错的餐厅。' },
      { word: 'agreed', pos: 'v.', zh: '同意', freq: 'K2', exampleEn: 'We agreed to meet at six.', exampleZh: '我们约好六点见。' },
      { word: 'weather', pos: 'n.', zh: '天气', freq: 'K1', exampleEn: 'The weather is nice today.', exampleZh: '今天天气很好。' },
    ],
    comprehension: [
      { question: 'What did Lin suggest doing?', questionZh: 'Lin 建议做什么？', options: ['Study at home', 'Café and park walk', 'Go to the gym', 'Watch a movie at home'], answer: 1 },
      { question: 'When did they meet?', questionZh: '他们几点见面？', options: ['Friday night', 'Saturday at ten', 'Sunday morning', 'Saturday at six'], answer: 1 },
    ],
    speakLine: 'Invite a friend to do something this weekend.',
    speakLineZh: '用英语邀请朋友这周末一起做件事。',
  },
  {
    id: 'read-a1-bus',
    cefr: 'A1',
    title: 'Taking the Bus',
    titleZh: '坐公交',
    topic: '日常生活',
    content: `I take the bus to work every day. The bus stop is near my home. I wait about five minutes. The bus is sometimes crowded, but it is cheap. I pay with my phone card. When I get off, I say thank you to the driver. Many people on the bus read books or listen to music. I like the bus because I can rest and look out the window.`,
    vocab: [
      { word: 'bus', pos: 'n.', zh: '公交车', freq: 'K1', exampleEn: 'The bus is late today.', exampleZh: '今天公交车晚点了。' },
      { word: 'crowded', pos: 'adj.', zh: '拥挤的', freq: 'K2', exampleEn: 'The train is crowded.', exampleZh: '地铁很挤。' },
      { word: 'driver', pos: 'n.', zh: '司机', freq: 'K1', exampleEn: 'The driver was friendly.', exampleZh: '司机很友好。' },
    ],
    comprehension: [
      { question: 'How does the writer pay?', questionZh: '作者怎么付车费？', options: ['Cash', 'Phone card', 'Credit card', 'Ticket'], answer: 1 },
      { question: 'Why does the writer like the bus?', questionZh: '作者为什么喜欢公交？', options: ['It is fast', 'Can rest and look out', 'It is empty', 'Free'], answer: 1 },
    ],
    speakLine: 'Say how you go to work or school.',
    speakLineZh: '说你上班或上学怎么去。',
  },
  {
    id: 'read-a1-feel',
    cefr: 'A1',
    title: 'How Do You Feel?',
    titleZh: '你感觉怎么样',
    topic: '健康',
    content: `Today I do not feel well. I have a headache and I am very tired. My friend asks, "Are you okay?" I say, "Not really. I need some rest." She says, "Do you want some water?" I say yes. She is very kind. In the afternoon, I sleep for one hour. After that, I feel better. If you are sick, drink water and rest. It helps.`,
    vocab: [
      { word: 'headache', pos: 'n.', zh: '头疼', freq: 'K2', exampleEn: 'I have a bad headache.', exampleZh: '我头疼得厉害。' },
      { word: 'tired', pos: 'adj.', zh: '累的', freq: 'K1', exampleEn: 'I am tired after work.', exampleZh: '下班后我很累。' },
      { word: 'rest', pos: 'n./v.', zh: '休息', freq: 'K1', exampleEn: 'You need more rest.', exampleZh: '你需要多休息。' },
    ],
    comprehension: [
      { question: 'How does the writer feel in the morning?', questionZh: '作者早上感觉如何？', options: ['Great', 'Not well', 'Hungry', 'Excited'], answer: 1 },
      { question: 'What helps the writer feel better?', questionZh: '什么让作者好受些？', options: ['Medicine only', 'Water and rest', 'Coffee', 'Exercise'], answer: 1 },
    ],
    speakLine: 'Tell someone you do not feel well today.',
    speakLineZh: '告诉别人说今天你不太舒服。',
  },
  {
    id: 'read-b1-silk-road',
    cefr: 'B1',
    title: 'The Silk Road',
    titleZh: '丝绸之路',
    topic: '历史与贸易',
    content: `The Silk Road was an ancient network of trade routes. It connected China with the West. People traded silk, spices, and ideas along these paths. Traveling was dangerous because of harsh deserts and bandits. However, the trade brought great wealth and cultural exchange to many countries.`,
    vocab: [
      { word: 'ancient', pos: 'adj.', zh: '古代的', freq: 'K2', exampleEn: 'They found ancient ruins.', exampleZh: '他们发现了古代遗迹。' },
      { word: 'network', pos: 'n.', zh: '网络', freq: 'K2', exampleEn: 'A network of roads.', exampleZh: '道路网络。' },
      { word: 'routes', pos: 'n.', zh: '路线', freq: 'K2', exampleEn: 'Which route is faster?', exampleZh: '哪条路线更快？' },
      { word: 'spices', pos: 'n.', zh: '香料', freq: 'K3', exampleEn: 'Spices make food tasty.', exampleZh: '香料使食物美味。' },
      { word: 'harsh', pos: 'adj.', zh: '严酷的', freq: 'K3', exampleEn: 'The winter is harsh.', exampleZh: '冬天很严酷。' },
      { word: 'bandits', pos: 'n.', zh: '强盗', freq: 'OFF', exampleEn: 'Bandits attacked them.', exampleZh: '强盗袭击了他们。' },
      { word: 'wealth', pos: 'n.', zh: '财富', freq: 'K2', exampleEn: 'He has great wealth.', exampleZh: '他拥有巨大的财富。' },
      { word: 'exchange', pos: 'n.', zh: '交流', freq: 'K2', exampleEn: 'Cultural exchange is good.', exampleZh: '文化交流很好。' },
    ],
    comprehension: [
      { question: 'What was traded on the Silk Road?', questionZh: '丝绸之路上交易了什么？', options: ['Only silk', 'Silk, spices, and ideas', 'Animals', 'Water'], answer: 1 },
      { question: 'Why was traveling dangerous?', questionZh: '为什么旅行很危险？', options: ['Because of wild animals', 'Because of harsh deserts and bandits', 'Because of the cold', 'Because of storms'], answer: 1 },
    ]
  },
  {
    id: 'read-a2-bees',
    cefr: 'A2',
    title: 'The Importance of Bees',
    titleZh: '蜜蜂的重要性',
    topic: '自然与环境',
    content: `Bees are very important for our planet. They help plants grow by carrying pollen from one flower to another. Without bees, we would not have many fruits and vegetables. Sadly, bee populations are decreasing due to pollution and loss of habitat. We must protect them.`,
    vocab: [
      { word: 'important', pos: 'adj.', zh: '重要的', freq: 'K1', exampleEn: 'This is important.', exampleZh: '这很重要。' },
      { word: 'planet', pos: 'n.', zh: '星球', freq: 'K2', exampleEn: 'We must protect our planet.', exampleZh: '我们必须保护我们的星球。' },
      { word: 'pollen', pos: 'n.', zh: '花粉', freq: 'OFF', exampleEn: 'Bees carry pollen.', exampleZh: '蜜蜂携带花粉。' },
      { word: 'populations', pos: 'n.', zh: '种群数量', freq: 'K2', exampleEn: 'The population is growing.', exampleZh: '种群数量在增长。' },
      { word: 'decreasing', pos: 'v.', zh: '减少', freq: 'K3', exampleEn: 'The number is decreasing.', exampleZh: '数量在减少。' },
      { word: 'pollution', pos: 'n.', zh: '污染', freq: 'K2', exampleEn: 'Air pollution is bad.', exampleZh: '空气污染很严重。' },
      { word: 'habitat', pos: 'n.', zh: '栖息地', freq: 'AWL', exampleEn: 'Animals need a habitat.', exampleZh: '动物需要栖息地。' },
      { word: 'protect', pos: 'v.', zh: '保护', freq: 'K2', exampleEn: 'Protect your eyes.', exampleZh: '保护你的眼睛。' },
    ],
    comprehension: [
      { question: 'What do bees carry between flowers?', questionZh: '蜜蜂在花之间携带什么？', options: ['Water', 'Leaves', 'Pollen', 'Seeds'], answer: 2 },
      { question: 'Why are bee populations decreasing?', questionZh: '为什么蜜蜂数量在减少？', options: ['They are too old', 'Due to pollution and loss of habitat', 'They fly too far', 'People eat them'], answer: 1 },
    ]
  },
  {
    id: 'read-b2-climate-change',
    cefr: 'B2',
    title: 'Understanding Climate Change',
    titleZh: '理解气候变化',
    topic: '科学与环境',
    content: `Climate change is one of the most pressing issues of our time. It refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to burning fossil fuels like coal, oil, and gas. Burning fossil fuels generates greenhouse gas emissions that act like a blanket wrapped around the Earth, trapping the sun's heat and raising temperatures. Consequences include intense droughts, water scarcity, severe fires, rising sea levels, flooding, melting polar ice, catastrophic storms, and declining biodiversity.`,
    vocab: [
      { word: 'pressing', pos: 'adj.', zh: '紧迫的', freq: 'K3', exampleEn: 'It is a pressing issue.', exampleZh: '这是一个紧迫的问题。' },
      { word: 'shifts', pos: 'n.', zh: '转变/变化', freq: 'K2', exampleEn: 'There are shifts in the market.', exampleZh: '市场发生了转变。' },
      { word: 'driver', pos: 'n.', zh: '驱动因素', freq: 'K2', exampleEn: 'Technology is a key driver.', exampleZh: '技术是一个关键的驱动因素。' },
      { word: 'primarily', pos: 'adv.', zh: '主要地', freq: 'AWL', exampleEn: 'It is primarily made of wood.', exampleZh: '它主要是用木头做的。' },
      { word: 'emissions', pos: 'n.', zh: '排放物', freq: 'AWL', exampleEn: 'We must reduce carbon emissions.', exampleZh: '我们必须减少碳排放。' },
      { word: 'trapping', pos: 'v.', zh: '困住', freq: 'K3', exampleEn: 'The heat is trapping inside.', exampleZh: '热量被困在里面了。' },
      { word: 'consequences', pos: 'n.', zh: '后果', freq: 'AWL', exampleEn: 'You must face the consequences.', exampleZh: '你必须面对后果。' },
      { word: 'biodiversity', pos: 'n.', zh: '生物多样性', freq: 'OFF', exampleEn: 'Biodiversity is important for the ecosystem.', exampleZh: '生物多样性对生态系统很重要。' },
    ],
    comprehension: [
      { question: 'What is the main driver of climate change since the 1800s?', questionZh: '1800年代以来气候变化的主要驱动因素是什么？', options: ['Natural shifts', 'Human activities', 'Solar flares', 'Volcanic eruptions'], answer: 1 },
      { question: 'What do greenhouse gas emissions act like?', questionZh: '温室气体排放物起到了什么作用？', options: ['A blanket trapping heat', 'A cooling fan', 'A mirror reflecting sunlight', 'A sponge absorbing water'], answer: 0 },
    ]
  },
  {
    id: 'read-c1-ai-future',
    cefr: 'C1',
    title: 'The Future of Artificial Intelligence',
    titleZh: '人工智能的未来',
    topic: '科技与社会',
    content: `Artificial Intelligence (AI) has transcended its origins in science fiction to become a ubiquitous force shaping modern society. From sophisticated algorithms that curate our social media feeds to autonomous vehicles navigating complex urban environments, AI's applications are vast and transformative. However, this rapid proliferation brings forth profound ethical dilemmas. Concerns regarding data privacy, algorithmic bias, and the potential displacement of human labor are at the forefront of contemporary discourse. As we stand on the precipice of achieving Artificial General Intelligence (AGI), society must meticulously establish robust regulatory frameworks to ensure that AI augmentation serves to elevate human potential rather than undermine it.`,
    vocab: [
      { word: 'transcended', pos: 'v.', zh: '超越', freq: 'OFF', exampleEn: 'She transcended all expectations.', exampleZh: '她超越了所有人的期望。' },
      { word: 'ubiquitous', pos: 'adj.', zh: '无所不在的', freq: 'OFF', exampleEn: 'Smartphones have become ubiquitous.', exampleZh: '智能手机已经变得无处不在。' },
      { word: 'sophisticated', pos: 'adj.', zh: '复杂的/高级的', freq: 'AWL', exampleEn: 'They use sophisticated technology.', exampleZh: '他们使用高级的技术。' },
      { word: 'proliferation', pos: 'n.', zh: '激增/扩散', freq: 'OFF', exampleEn: 'The proliferation of fake news is worrying.', exampleZh: '假新闻的激增令人担忧。' },
      { word: 'dilemmas', pos: 'n.', zh: '困境/两难', freq: 'OFF', exampleEn: 'We face ethical dilemmas.', exampleZh: '我们面临伦理困境。' },
      { word: 'precipice', pos: 'n.', zh: '悬崖/险境', freq: 'OFF', exampleEn: 'We are on the precipice of a disaster.', exampleZh: '我们正处于灾难的边缘。' },
      { word: 'meticulously', pos: 'adv.', zh: '一丝不苟地', freq: 'OFF', exampleEn: 'He planned the trip meticulously.', exampleZh: '他一丝不苟地计划了这次旅行。' },
      { word: 'augmentation', pos: 'n.', zh: '增强/增加', freq: 'OFF', exampleEn: 'Human augmentation through technology.', exampleZh: '通过技术增强人类。' },
    ],
    comprehension: [
      { question: 'What is a major ethical concern mentioned in the text?', questionZh: '文中提到的一个主要的伦理担忧是什么？', options: ['The cost of hardware', 'Algorithmic bias', 'Slow internet speeds', 'Lack of social media feeds'], answer: 1 },
      { question: 'What must society establish to manage AI development?', questionZh: '社会必须建立什么来管理AI的发展？', options: ['More autonomous vehicles', 'Robust regulatory frameworks', 'New science fiction books', 'Larger data centers'], answer: 1 },
    ]
  },

  // ==================== 新增内容 (系统自动扩充) ====================
  {
    id: 'read-a1-family',
    cefr: 'A1',
    title: 'My Family',
    titleZh: '我的家庭',
    topic: '家庭与朋友',
    content: `I have a small family. There are four people in my family: my father, my mother, my brother, and me. My father is a doctor. He works in a hospital. My mother is a teacher. She works in a school. My brother is a student. He is ten years old. We live in a nice house. On Sundays, we usually go to the park together. We play games and have a picnic. I love my family very much.`,
    vocab: [
      { word: 'family', pos: 'n.', zh: '家庭', freq: 'K1', exampleEn: 'I love my family.', exampleZh: '我爱我的家人。' },
      { word: 'hospital', pos: 'n.', zh: '医院', freq: 'K1', exampleEn: 'He works in a hospital.', exampleZh: '他在医院工作。' },
      { word: 'teacher', pos: 'n.', zh: '老师', freq: 'K1', exampleEn: 'She is a good teacher.', exampleZh: '她是一位好老师。' },
      { word: 'student', pos: 'n.', zh: '学生', freq: 'K1', exampleEn: 'He is a new student.', exampleZh: '他是个新生。' },
      { word: 'picnic', pos: 'n.', zh: '野餐', freq: 'K2', exampleEn: 'We had a picnic in the park.', exampleZh: '我们在公园里野餐。' },
    ],
    comprehension: [
      { question: 'How many people are in the family?', questionZh: '家里有几口人？', options: ['Three', 'Four', 'Five', 'Six'], answer: 1 },
      { question: 'What is the father\'s job?', questionZh: '爸爸的工作是什么？', options: ['Teacher', 'Doctor', 'Student', 'Driver'], answer: 1 },
      { question: 'What do they do on Sundays?', questionZh: '他们周日做什么？', options: ['Watch TV', 'Go to the park', 'Clean the house', 'Go shopping'], answer: 1 },
    ],
    speakLine: 'Tell me about your family.',
    speakLineZh: '跟我说说你的家庭。',
  },
  {
    id: 'read-a2-restaurant',
    cefr: 'A2',
    title: 'Dinner at a Restaurant',
    titleZh: '在餐厅吃晚餐',
    topic: '餐饮与社交',
    content: `Last night, my friends and I went to a new Italian restaurant in the city center. We booked a table near the window. The waiter gave us the menu and asked what we wanted to drink. I ordered a glass of orange juice. For the main course, I chose spaghetti with tomato sauce, and my friends ordered pizza. The food arrived quickly and it was very hot. We talked and laughed while eating. After the meal, we asked for the bill. It was not very expensive, so we left a good tip. It was a wonderful evening.`,
    vocab: [
      { word: 'restaurant', pos: 'n.', zh: '餐厅', freq: 'K1', exampleEn: 'We ate at a nice restaurant.', exampleZh: '我们在一家不错的餐厅吃饭。' },
      { word: 'menu', pos: 'n.', zh: '菜单', freq: 'K2', exampleEn: 'Can I see the menu, please?', exampleZh: '能给我看看菜单吗？' },
      { word: 'ordered', pos: 'v.', zh: '点餐/订购', freq: 'K1', exampleEn: 'I ordered a book online.', exampleZh: '我在网上订了一本书。' },
      { word: 'arrived', pos: 'v.', zh: '到达', freq: 'K1', exampleEn: 'The train arrived late.', exampleZh: '火车晚点了。' },
      { word: 'bill', pos: 'n.', zh: '账单', freq: 'K1', exampleEn: 'Can we have the bill?', exampleZh: '买单。' },
      { word: 'tip', pos: 'n.', zh: '小费', freq: 'K2', exampleEn: 'He left a big tip.', exampleZh: '他留了很大一笔小费。' },
    ],
    comprehension: [
      { question: 'What kind of food did they eat?', questionZh: '他们吃了什么风味的食物？', options: ['Chinese', 'Mexican', 'Italian', 'Indian'], answer: 2 },
      { question: 'What did the writer order for the main course?', questionZh: '作者主菜点了什么？', options: ['Pizza', 'Spaghetti', 'Salad', 'Steak'], answer: 1 },
      { question: 'Why did they leave a good tip?', questionZh: '他们为什么留了丰厚的小费？', options: ['Because the food was cold', 'Because it was not very expensive', 'Because they had no small change', 'Because the waiter asked for it'], answer: 1 },
    ],
    speakLine: 'Describe your favorite restaurant.',
    speakLineZh: '描述你最喜欢的餐厅。',
  },
  {
    id: 'read-b1-smartphone',
    cefr: 'B1',
    title: 'Life Without a Smartphone',
    titleZh: '没有智能手机的生活',
    topic: '科技与生活',
    content: `Can you imagine going a whole day without your smartphone? Last weekend, I decided to do a digital detox. I turned off my phone on Friday night and didn't turn it back on until Sunday morning. At first, it was very difficult. I kept reaching for my pocket to check my messages or look at social media. However, after a few hours, I started to feel more relaxed. I read a book, went for a long walk, and had a great conversation with my roommate without any distractions. I realized that we often miss the beautiful things around us because we are always staring at a screen. Now, I try to spend at least two hours a day away from my phone.`,
    vocab: [
      { word: 'imagine', pos: 'v.', zh: '想象', freq: 'K2', exampleEn: 'I can\'t imagine life without music.', exampleZh: '我无法想象没有音乐的生活。' },
      { word: 'detox', pos: 'n.', zh: '排毒', freq: 'OFF', exampleEn: 'A digital detox is good for your mind.', exampleZh: '数字排毒对你的心理有好处。' },
      { word: 'relaxed', pos: 'adj.', zh: '放松的', freq: 'K2', exampleEn: 'I feel relaxed after a bath.', exampleZh: '洗澡后我感觉很放松。' },
      { word: 'conversation', pos: 'n.', zh: '对话', freq: 'K2', exampleEn: 'We had an interesting conversation.', exampleZh: '我们进行了一次有趣的对话。' },
      { word: 'distractions', pos: 'n.', zh: '分心事物', freq: 'K3', exampleEn: 'I need to study without distractions.', exampleZh: '我需要在没有干扰的情况下学习。' },
      { word: 'staring', pos: 'v.', zh: '盯着看', freq: 'K2', exampleEn: 'Stop staring at me.', exampleZh: '别盯着我看。' },
    ],
    comprehension: [
      { question: 'How long did the writer turn off their phone?', questionZh: '作者关机了多久？', options: ['One hour', 'From Friday night to Sunday morning', 'A whole week', 'Only on Saturday afternoon'], answer: 1 },
      { question: 'How did the writer feel at first?', questionZh: '作者起初感觉如何？', options: ['Relaxed', 'Bored', 'Difficult', 'Happy'], answer: 2 },
      { question: 'What did the writer realize?', questionZh: '作者意识到了什么？', options: ['Smartphones are completely useless', 'We miss beautiful things when staring at screens', 'Reading books is boring', 'Social media is essential'], answer: 1 },
    ],
    speakLine: 'What would you do if you didn\'t have a smartphone for a day?',
    speakLineZh: '如果你一天没有智能手机，你会做什么？',
  },
  {
    id: 'read-b2-space',
    cefr: 'B2',
    title: 'The Future of Space Tourism',
    titleZh: '太空旅游的未来',
    topic: '科学与探索',
    content: `For decades, traveling to space was an exclusive privilege reserved for highly trained astronauts. However, the dawn of commercial spaceflight is rapidly changing this paradigm. Private companies are now investing billions of dollars to make space tourism a reality for ordinary citizens. While current ticket prices are astronomical, often exceeding hundreds of thousands of dollars, experts predict that costs will eventually decrease as technology advances and economies of scale are achieved.

Supporters of space tourism argue that it will inspire a new generation of engineers and scientists, while also funding further exploration of our solar system. On the other hand, critics raise valid concerns about the environmental impact of frequent rocket launches, particularly the emission of black carbon into the upper atmosphere. Furthermore, the lack of comprehensive international regulations governing commercial spaceflight poses significant safety and legal challenges. Despite these hurdles, it seems inevitable that within our lifetime, spending a vacation in orbit will become more than just a science fiction fantasy.`,
    vocab: [
      { word: 'exclusive', pos: 'adj.', zh: '独有的/专用的', freq: 'AWL', exampleEn: 'This is an exclusive club.', exampleZh: '这是一家高级私人俱乐部。' },
      { word: 'privilege', pos: 'n.', zh: '特权', freq: 'K3', exampleEn: 'Education is a right, not a privilege.', exampleZh: '教育是一项权利，而不是特权。' },
      { word: 'paradigm', pos: 'n.', zh: '范式/模式', freq: 'AWL', exampleEn: 'There is a paradigm shift in education.', exampleZh: '教育模式正在发生转变。' },
      { word: 'astronomical', pos: 'adj.', zh: '极其巨大的/天文数字的', freq: 'OFF', exampleEn: 'The cost was astronomical.', exampleZh: '花费是天文数字。' },
      { word: 'inevitable', pos: 'adj.', zh: '不可避免的', freq: 'AWL', exampleEn: 'Change is inevitable.', exampleZh: '改变是不可避免的。' },
      { word: 'comprehensive', pos: 'adj.', zh: '全面的', freq: 'AWL', exampleEn: 'We need a comprehensive plan.', exampleZh: '我们需要一个全面的计划。' },
      { word: 'hurdles', pos: 'n.', zh: '障碍', freq: 'OFF', exampleEn: 'There are many hurdles to overcome.', exampleZh: '有许多障碍需要克服。' },
    ],
    comprehension: [
      { question: 'What is a major criticism of space tourism mentioned in the text?', questionZh: '文中提到对太空旅游的一个主要批评是什么？', options: ['It is too boring', 'It will inspire too many engineers', 'The environmental impact of rocket launches', 'The rockets are too slow'], answer: 2 },
      { question: 'Why are ticket prices expected to decrease?', questionZh: '为什么预计票价会下降？', options: ['Because nobody wants to go', 'Due to technological advances and economies of scale', 'Because governments will pay for it', 'Because the trips will be shorter'], answer: 1 },
      { question: 'What poses significant safety and legal challenges?', questionZh: '什么带来了重大的安全和法律挑战？', options: ['The lack of international regulations', 'The training of astronauts', 'The size of the rockets', 'The distance to other planets'], answer: 0 },
    ],
  },
  {
    id: 'read-c1-psychology',
    cefr: 'C1',
    title: 'The Psychology of Procrastination',
    titleZh: '拖延症的心理学',
    topic: '心理学与个人成长',
    content: `Procrastination is frequently mischaracterized as a simple failure of time management or a manifestation of inherent laziness. However, contemporary psychological research posits that it is fundamentally an issue of emotional regulation. When faced with a task that elicits negative emotions—such as anxiety, boredom, or feelings of incompetence—individuals often resort to procrastination as a maladaptive coping mechanism. By deferring the task, they achieve temporary relief from these aversive emotional states, albeit at the cost of long-term stress and compromised performance.

To effectively combat procrastination, one must pivot from punitive self-discipline to strategies that address the underlying emotional friction. Techniques such as self-compassion, cognitive reframing, and dividing overwhelming projects into manageable, non-threatening components have proven significantly more efficacious than conventional scheduling tools. Acknowledging that procrastination is a vulnerability to negative affect rather than a moral failing is the crucial first step toward fostering sustained productivity.`,
    vocab: [
      { word: 'mischaracterized', pos: 'v.', zh: '错误地描述', freq: 'OFF', exampleEn: 'His actions were mischaracterized by the media.', exampleZh: '他的行为被媒体错误地描述了。' },
      { word: 'manifestation', pos: 'n.', zh: '表现/显现', freq: 'AWL', exampleEn: 'The disease has various manifestations.', exampleZh: '这种疾病有多种表现形式。' },
      { word: 'inherent', pos: 'adj.', zh: '固有的/内在的', freq: 'AWL', exampleEn: 'There are inherent risks in this business.', exampleZh: '这项业务存在固有的风险。' },
      { word: 'maladaptive', pos: 'adj.', zh: '适应不良的', freq: 'OFF', exampleEn: 'Procrastination is a maladaptive behavior.', exampleZh: '拖延是一种适应不良的行为。' },
      { word: 'aversive', pos: 'adj.', zh: '令人厌恶的', freq: 'OFF', exampleEn: 'Aversive stimuli can cause stress.', exampleZh: '令人厌恶的刺激会引起压力。' },
      { word: 'punitive', pos: 'adj.', zh: '惩罚性的', freq: 'OFF', exampleEn: 'Punitive measures are not always effective.', exampleZh: '惩罚性措施并不总是有效的。' },
      { word: 'efficacious', pos: 'adj.', zh: '有效的', freq: 'OFF', exampleEn: 'The medicine is highly efficacious.', exampleZh: '这种药非常有效。' },
    ],
    comprehension: [
      { question: 'How is procrastination fundamentally described in contemporary research?', questionZh: '当代研究从根本上如何描述拖延症？', options: ['A failure of time management', 'A manifestation of inherent laziness', 'An issue of emotional regulation', 'A lack of intelligence'], answer: 2 },
      { question: 'What is a recommended strategy to combat procrastination?', questionZh: '建议用什么策略来对抗拖延症？', options: ['Punitive self-discipline', 'Conventional scheduling tools', 'Dividing projects into manageable components', 'Ignoring the task completely'], answer: 2 },
    ],
  },

  ...READING_MATERIALS_BATCH_2,
  ...READING_MATERIALS_BATCH_3,
];

// ============================================================
// 工具函数
// ============================================================
export function getReadingsByCefr(cefr) {
  return READING_MATERIALS.filter((r) => r.cefr === cefr);
}

export function getReadingById(id) {
  return READING_MATERIALS.find((r) => r.id === id) || null;
}

// 从文章 content 中查找 vocab 中的词并返回高亮位置
export function highlightVocabInText(content, vocabList) {
  const result = [];
  const words = content.split(/(\s+|[.,!?;:'"()\-—])/);
  for (const token of words) {
    const clean = token.toLowerCase().replace(/[^a-z]/g, '');
    const match = vocabList.find(
      (v) => clean === v.word.toLowerCase() || clean === v.word.toLowerCase() + 's' || clean === v.word.toLowerCase() + 'ed' || clean === v.word.toLowerCase() + 'ing'
    );
    result.push({
      text: token,
      vocab: match || null,
    });
  }
  return result;
}
