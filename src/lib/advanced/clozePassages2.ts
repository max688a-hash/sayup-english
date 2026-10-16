// @ts-nocheck
// 完形填空语料 II — 扩量批次(A1–C1, 含 C1 新增等级)
// ------------------------------------------------------------
// 与 clozePassages.js 同结构: text 用 [[n]] 标空, blanks 给每空选项与正确下标。
// 编写标准(高标准, 非凑数):
//   1. 每空考一个明确知识点(时态/主谓一致/介词/连词/词性/搭配), 不靠猜
//   2. 干扰项必须"看起来合理"(同族词形或近义词), 不放明显错项
//   3. 短文自成语境, 是真实生活/职场/学术场景, 不是拼凑句子
//   4. zh 提示写清"考什么", 让学习者错了能懂为什么

export const CLOZE_PASSAGES_2 = [
  // ==================== A1 ====================
  {
    id: 'cloze2-a1-school',
    level: 'a1',
    title: 'My School Day',
    titleZh: '我的学校一天',
    text: "I [[1]] to school at eight. My teacher [[2]] very kind. We [[3]] English in the morning. After class, I [[4]] lunch with my friends.",
    blanks: [
      { n: 1, options: ['go', 'goes', 'going'], answer: 0, zh: '去(I 用原形)' },
      { n: 2, options: ['is', 'are', 'am'], answer: 0, zh: '是(teacher 单数)' },
      { n: 3, options: ['study', 'studies', 'studying'], answer: 0, zh: '学习(We 用原形)' },
      { n: 4, options: ['eat', 'eats', 'ate'], answer: 0, zh: '吃(一般现在时)' },
    ],
  },
  {
    id: 'cloze2-a1-weather',
    level: 'a1',
    title: 'Today the Weather',
    titleZh: '今天的天气',
    text: "Today it [[1]] sunny and warm. I want to go [[2]] the park. I will take my dog [[3]] me. We [[4]] play together.",
    blanks: [
      { n: 1, options: ['is', 'are', 'be'], answer: 0, zh: '是(it 用 is)' },
      { n: 2, options: ['to', 'at', 'in'], answer: 0, zh: '去某地用 to' },
      { n: 3, options: ['with', 'for', 'of'], answer: 0, zh: '和我一起用 with' },
      { n: 4, options: ['will', 'are', 'do'], answer: 0, zh: '将会(will play)' },
    ],
  },
  {
    id: 'cloze2-a1-home',
    level: 'a1',
    title: 'My Room',
    titleZh: '我的房间',
    text: "There [[1]] a bed and a desk in my room. My books [[2]] on the desk. I like to read [[3]] night. My room [[4]] small but clean.",
    blanks: [
      { n: 1, options: ['is', 'are', 'be'], answer: 0, zh: 'There is + 单数(a bed)' },
      { n: 2, options: ['are', 'is', 'am'], answer: 0, zh: '是(books 复数)' },
      { n: 3, options: ['at', 'in', 'on'], answer: 0, zh: 'at night 固定搭配' },
      { n: 4, options: ['is', 'are', 'has'], answer: 0, zh: '是(room 单数)' },
    ],
  },
  // ==================== A2 ====================
  {
    id: 'cloze2-a2-doctor',
    level: 'a2',
    title: 'At the Doctor',
    titleZh: '看医生',
    text: "I [[1]] not feel well yesterday. I [[2]] to the doctor in the afternoon. She said I [[3]] rest for two days. Now I [[4]] much better.",
    blanks: [
      { n: 1, options: ['did', 'do', 'was'], answer: 0, zh: '过去否定 did not feel' },
      { n: 2, options: ['went', 'go', 'goes'], answer: 0, zh: '去(过去式)' },
      { n: 3, options: ['should', 'am', 'will'], answer: 0, zh: '应该(should rest)' },
      { n: 4, options: ['feel', 'feels', 'felt'], answer: 0, zh: '感觉(现在 I 用原形)' },
    ],
  },
  {
    id: 'cloze2-a2-travel',
    level: 'a2',
    title: 'A Trip by Train',
    titleZh: '一次火车旅行',
    text: "Last summer we [[1]] to the mountains by train. The trip [[2]] about five hours. We [[3]] a lot of photos on the way. It was [[4]] than we expected.",
    blanks: [
      { n: 1, options: ['traveled', 'travel', 'travels'], answer: 0, zh: '旅行(过去式)' },
      { n: 2, options: ['took', 'take', 'takes'], answer: 0, zh: '花费时间(过去式)' },
      { n: 3, options: ['took', 'make', 'did'], answer: 0, zh: 'take photos 固定搭配' },
      { n: 4, options: ['better', 'good', 'best'], answer: 0, zh: '比较级 + than' },
    ],
  },
  {
    id: 'cloze2-a2-phone',
    level: 'a2',
    title: 'A New Phone',
    titleZh: '一部新手机',
    text: "I have [[1]] used this phone for two years. The battery [[2]] very quickly now. I am thinking [[3]] buying a new one. But good phones are [[4]] expensive.",
    blanks: [
      { n: 1, options: ['already', 'yet', 'ever'], answer: 0, zh: '已经(现在完成用 already)' },
      { n: 2, options: ['dies', 'die', 'died'], answer: 0, zh: '耗尽(battery 第三人称)' },
      { n: 3, options: ['of', 'to', 'for'], answer: 0, zh: 'think of doing 固定搭配' },
      { n: 4, options: ['too', 'very much', 'so much'], answer: 0, zh: '太(too + 形容词)' },
    ],
  },
  {
    id: 'cloze2-a2-cooking',
    level: 'a2',
    title: 'Learning to Cook',
    titleZh: '学做菜',
    text: "My mother [[1]] me how to cook last year. At first I [[2]] afraid of the hot oil. Now I can cook [[3]] than my brother. Cooking is [[4]] relaxing for me.",
    blanks: [
      { n: 1, options: ['taught', 'teach', 'teaches'], answer: 0, zh: '教(过去式)' },
      { n: 2, options: ['was', 'were', 'am'], answer: 0, zh: '是(I 过去式用 was)' },
      { n: 3, options: ['better', 'good', 'well'], answer: 0, zh: '比较级 + than' },
      { n: 4, options: ['really', 'real', 'reality'], answer: 0, zh: '副词修饰形容词' },
    ],
  },
  // ==================== B1 ====================
  {
    id: 'cloze2-b1-interview',
    level: 'b1',
    title: 'A Job Interview',
    titleZh: '一场面试',
    text: "I [[1]] for the position two weeks ago. Yesterday they invited me [[2]] an interview. The manager asked what [[3]] me suitable for the role. I explained that I am both reliable and [[4]].",
    blanks: [
      { n: 1, options: ['applied', 'apply', 'applying'], answer: 0, zh: '申请(过去式)' },
      { n: 2, options: ['to', 'for', 'in'], answer: 0, zh: '邀请某人参加(invite sb to an interview)' },
      { n: 3, options: ['makes', 'make', 'making'], answer: 0, zh: 'what 作主语用第三人称' },
      { n: 4, options: ['hardworking', 'hardly', 'hardness'], answer: 0, zh: '形容词(并列 reliable)' },
    ],
  },
  {
    id: 'cloze2-b1-fitness',
    level: 'b1',
    title: 'Getting Fit',
    titleZh: '开始健身',
    text: "I have been going to the gym [[1]] March. At first it was hard to [[2]] motivated. [[3]], I now enjoy training three times a week. Regular exercise has had a positive [[4]] on my sleep.",
    blanks: [
      { n: 1, options: ['since', 'for', 'from'], answer: 0, zh: 'since + 时间点' },
      { n: 2, options: ['stay', 'staying', 'stayed'], answer: 0, zh: 'hard to + 动词原形' },
      { n: 3, options: ['However', 'Because', 'Although'], answer: 0, zh: '转折连接词(独立句首)' },
      { n: 4, options: ['effect', 'affect', 'effective'], answer: 0, zh: 'have an effect on(名词)' },
    ],
  },
  {
    id: 'cloze2-b1-online',
    level: 'b1',
    title: 'Studying Online',
    titleZh: '在线学习',
    text: "Online courses allow students [[1]] study at their own pace. [[2]] you need is a stable internet connection. If I [[3]] more free time, I would take two courses at once. The main [[4]] is that you must manage your own time.",
    blanks: [
      { n: 1, options: ['to', 'for', 'that'], answer: 0, zh: '允许某人做(allow sb to do)' },
      { n: 2, options: ['All', 'Everything', 'What all'], answer: 0, zh: 'All you need is... 句型' },
      { n: 3, options: ['had', 'have', 'will have'], answer: 0, zh: '虚拟条件 if I had' },
      { n: 4, options: ['drawback', 'benefit', 'reason'], answer: 0, zh: '缺点(语境: must manage)' },
    ],
  },
  {
    id: 'cloze2-b1-neighbour',
    level: 'b1',
    title: 'A Helpful Neighbour',
    titleZh: '热心的邻居',
    text: "My neighbour is the kind of person [[1]] always helps others. Last winter, when my car [[2]] start, he drove me to work. I was really [[3]] for his help. Since then we [[4]] become good friends.",
    blanks: [
      { n: 1, options: ['who', 'which', 'whose'], answer: 0, zh: '定语从句指人用 who' },
      { n: 2, options: ["wouldn't", "didn't", "isn't"], answer: 0, zh: '(车)就是不肯启动' },
      { n: 3, options: ['grateful', 'gratefully', 'gratitude'], answer: 0, zh: 'be grateful for(形容词)' },
      { n: 4, options: ['have', 'has', 'had'], answer: 0, zh: '现在完成(we have become)' },
    ],
  },
  {
    id: 'cloze2-b1-shopping-online',
    level: 'b1',
    title: 'Returning an Order',
    titleZh: '退换订单',
    text: "The jacket I ordered online did not [[1]] me, so I decided to return it. I contacted customer service and they [[2]] me a return label. They said the refund [[3]] take up to seven days. Overall, I was satisfied [[4]] the service.",
    blanks: [
      { n: 1, options: ['fit', 'fits', 'fitting'], answer: 0, zh: '否定句 did not + 原形' },
      { n: 2, options: ['sent', 'send', 'sends'], answer: 0, zh: '发送(过去式)' },
      { n: 3, options: ['would', 'will', 'is'], answer: 0, zh: '过去将来(said 后用 would)' },
      { n: 4, options: ['with', 'of', 'for'], answer: 0, zh: 'be satisfied with 固定搭配' },
    ],
  },
  // ==================== B2 ====================
  {
    id: 'cloze2-b2-remote',
    level: 'b2',
    title: 'The Rise of Remote Work',
    titleZh: '远程办公的兴起',
    text: "Remote work has [[1]] the expectations of many employees. Companies that fail to offer flexibility risk [[2]] their best staff. [[3]], managers worry about weaker team communication. The challenge is finding a balance that is [[4]] to both sides.",
    blanks: [
      { n: 1, options: ['reshaped', 'reshape', 'reshaping'], answer: 0, zh: '现在完成 has + 过去分词' },
      { n: 2, options: ['losing', 'to lose', 'lose'], answer: 0, zh: 'risk + doing 固定搭配' },
      { n: 3, options: ['Nevertheless', 'Therefore', 'Moreover'], answer: 0, zh: '让步转折(前后相反)' },
      { n: 4, options: ['acceptable', 'accepted', 'acceptance'], answer: 0, zh: '形容词(be acceptable to)' },
    ],
  },
  {
    id: 'cloze2-b2-city',
    level: 'b2',
    title: 'Cities and Public Transport',
    titleZh: '城市与公共交通',
    text: "Many cities are investing heavily [[1]] public transport. [[2]] cars remain popular, buses and metros move far more people per hour. Unless governments [[3]] in reliable networks, congestion will continue to worsen. The long-term [[4]] are both economic and environmental.",
    blanks: [
      { n: 1, options: ['in', 'on', 'for'], answer: 0, zh: 'invest in 固定搭配' },
      { n: 2, options: ['Although', 'Despite', 'However'], answer: 0, zh: '让步从句连词(接句子)' },
      { n: 3, options: ['invest', 'invests', 'invested'], answer: 0, zh: 'unless + 一般现在时' },
      { n: 4, options: ['benefits', 'benefit', 'beneficial'], answer: 0, zh: '名词复数(are 后)' },
    ],
  },
  {
    id: 'cloze2-b2-ai',
    level: 'b2',
    title: 'Living with Automation',
    titleZh: '与自动化共存',
    text: "Automation is expected [[1]] replace many routine tasks. Workers who keep learning are less [[2]] to be affected. [[3]] of losing their jobs, some employees now focus on skills machines cannot copy. Creativity and empathy remain [[4]] valuable.",
    blanks: [
      { n: 1, options: ['to', 'for', 'that'], answer: 0, zh: '被预期会(be expected to do)' },
      { n: 2, options: ['likely', 'like', 'alike'], answer: 0, zh: 'be likely to 固定搭配' },
      { n: 3, options: ['Instead', 'Because', 'Except'], answer: 0, zh: 'instead of doing 固定搭配' },
      { n: 4, options: ['highly', 'high', 'height'], answer: 0, zh: '副词修饰形容词 valuable' },
    ],
  },
  {
    id: 'cloze2-b2-health',
    level: 'b2',
    title: 'Sleep and Performance',
    titleZh: '睡眠与表现',
    text: "Researchers have long [[1]] that sleep affects memory. Students who sleep fewer than six hours tend [[2]] worse on tests. [[3]] popular belief, catching up at weekends does not fully repair the damage. Consistent sleep habits are therefore [[4]] than occasional long nights.",
    blanks: [
      { n: 1, options: ['argued', 'argue', 'arguing'], answer: 0, zh: '现在完成 have + 过去分词' },
      { n: 2, options: ['to perform', 'performing', 'perform'], answer: 0, zh: '倾向于(tend to do)' },
      { n: 3, options: ['Contrary to', 'Because of', 'According to'], answer: 0, zh: '与...相反' },
      { n: 4, options: ['more useful', 'usefuller', 'most useful'], answer: 0, zh: '比较级 + than' },
    ],
  },
  // ==================== C1 ====================
  {
    id: 'cloze2-c1-research',
    level: 'c1',
    title: 'Interpreting Research Findings',
    titleZh: '解读研究结论',
    text: "The study found a correlation between screen time and anxiety, but correlation does not [[1]] causation. The authors were careful to [[2]] that other factors may be involved. [[3]], the sample was drawn from a single university, which limits how far the results can be generalised. Further work is [[4]] before firm conclusions are drawn.",
    blanks: [
      { n: 1, options: ['imply', 'implies', 'implying'], answer: 0, zh: 'does not + 原形' },
      { n: 2, options: ['acknowledge', 'acknowledgement', 'acknowledged'], answer: 0, zh: 'be careful to + 原形' },
      { n: 3, options: ['Furthermore', 'Nevertheless', 'Otherwise'], answer: 0, zh: '追加同向论点' },
      { n: 4, options: ['required', 'require', 'requiring'], answer: 0, zh: '被动 is required' },
    ],
  },
  {
    id: 'cloze2-c1-policy',
    level: 'c1',
    title: 'Weighing Up Policy',
    titleZh: '权衡政策',
    text: "Any policy inevitably [[1]] a trade-off between competing interests. Subsidising fuel may ease pressure on households, [[2]] it can also delay the shift to cleaner energy. Policymakers must therefore [[3]] short-term relief against long-term goals. [[4]] such tensions is rarely straightforward.",
    blanks: [
      { n: 1, options: ['involves', 'involve', 'involving'], answer: 0, zh: 'policy 单数主语' },
      { n: 2, options: ['whereas', 'therefore', 'moreover'], answer: 0, zh: '对比连词' },
      { n: 3, options: ['weigh', 'weighs', 'weighing'], answer: 0, zh: 'must + 原形' },
      { n: 4, options: ['Resolving', 'Resolve', 'Resolved'], answer: 0, zh: '动名词作主语' },
    ],
  },
  {
    id: 'cloze2-c1-language',
    level: 'c1',
    title: 'How Adults Learn Languages',
    titleZh: '成年人如何学语言',
    text: "It is often [[1]] that adults cannot acquire a second language as well as children. In practice, adults compensate [[2]] their analytical skills and life experience. What tends to [[3]] progress is not age but limited exposure to real communication. [[4]] enough meaningful input, adult learners can reach a very high level.",
    blanks: [
      { n: 1, options: ['assumed', 'assume', 'assuming'], answer: 0, zh: '被动 It is assumed that' },
      { n: 2, options: ['with', 'of', 'to'], answer: 0, zh: 'compensate with(凭借)' },
      { n: 3, options: ['limit', 'limits', 'limiting'], answer: 0, zh: 'tends to + 原形' },
      { n: 4, options: ['Given', 'Giving', 'Give'], answer: 0, zh: 'Given + 名词(考虑到/若有)' },
    ],
  },
  {
    id: 'cloze2-c1-work',
    level: 'c1',
    title: 'The Value of Deep Work',
    titleZh: '深度工作的价值',
    text: "Constant notifications make sustained concentration increasingly [[1]] to achieve. Employees who protect blocks of uninterrupted time consistently [[2]] higher-quality output. [[3]] this is widely acknowledged, few organisations design their culture around it. The cost of endless interruption is [[4]] underestimated.",
    blanks: [
      { n: 1, options: ['difficult', 'difficulty', 'difficultly'], answer: 0, zh: '形容词(make sth difficult)' },
      { n: 2, options: ['produce', 'produces', 'producing'], answer: 0, zh: 'Employees who... 复数谓语' },
      { n: 3, options: ['While', 'Despite', 'However'], answer: 0, zh: '让步连词接从句' },
      { n: 4, options: ['routinely', 'routine', 'routines'], answer: 0, zh: '副词修饰被动动词' },
    ],
  },
];
