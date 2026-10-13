// @ts-nocheck
// 雅思口语 Part 3 · 深入讨论(补齐缺失的整个考试环节)
// ----------------------------------------------------------------------------
// 背景: 原口语库有 Part1(16)/Part2(12)/托福(11), 但 IELTS Part 3 为 0 —— 而真实雅思口语
//   考试 Part 2 独白之后必接 Part 3 抽象讨论。本文件补齐这一整个环节。
//
// Part 3 特点(与 Part 1 不同): 问题更抽象、要求比较/推测/评价, 答案更长(每题 4–6 句),
//   需要「表明观点 + 给理由 + 举例 + 让步」。因此 scaffold 侧重"论证型"万能表达。
//
// 结构复用 Part 1(多题轮答): { id, type:'ielts_part3', topic, topicZh, questions:[{en,zh}], scaffold:[{en,zh}] }
//   屏幕按 isPart1 分支渲染(已在 IeltsSpeaking.js 放行 ielts_part3)。
//
// 题型来源: Cambridge / IDP / British Council 公开的 IELTS Speaking Part 3 讨论格式(非泄题)。
// 话题与常见 Part 2 卡片配对, 便于"独白 → 讨论"衔接。

export const IELTS_PART3 = [
  {
    id: 'p3-technology-society',
    type: 'ielts_part3',
    topic: 'Technology and Society',
    topicZh: '科技与社会',
    questions: [
      { en: 'How has technology changed the way people communicate?', zh: '科技如何改变了人们的沟通方式？' },
      { en: 'Do you think people rely too much on their phones these days?', zh: '你认为如今人们太依赖手机了吗？' },
      { en: 'What are the disadvantages of doing everything online?', zh: '凡事都在网上进行有什么坏处？' },
      { en: 'Will face-to-face conversation become less common in the future?', zh: '面对面交谈将来会变少吗？' },
      { en: 'Should there be limits on how much technology children use?', zh: '是否应该限制儿童使用科技的时长？' },
    ],
    scaffold: [
      { en: 'On the one hand ____, but on the other hand ____.', zh: '一方面 ____，但另一方面 ____。' },
      { en: 'I would argue that ____, mainly because ____.', zh: '我认为 ____，主要因为 ____。' },
      { en: 'A good example of this is ____.', zh: '一个很好的例子是 ____。' },
      { en: 'While that may be true, we should also consider ____.', zh: '虽然那也许没错，但我们也该考虑 ____。' },
    ],
  },
  {
    id: 'p3-education',
    type: 'ielts_part3',
    topic: 'Education and Learning',
    topicZh: '教育与学习',
    questions: [
      { en: 'What makes a good teacher, in your opinion?', zh: '在你看来，怎样才算一位好老师？' },
      { en: 'Is it better to study alone or in a group?', zh: '独自学习和小组学习哪个更好？' },
      { en: 'Do you think exams are a fair way to measure ability?', zh: '你认为考试是衡量能力的公平方式吗？' },
      { en: 'How might schools be different in fifty years?', zh: '五十年后学校可能有何不同？' },
      { en: 'Should students learn practical skills as well as academic subjects?', zh: '学生除了学术科目，是否也该学实用技能？' },
    ],
    scaffold: [
      { en: 'In my view, the most important thing is ____.', zh: '在我看来，最重要的是 ____。' },
      { en: 'It really depends on ____.', zh: '这真的取决于 ____。' },
      { en: 'One clear advantage of ____ is that ____.', zh: '____ 的一个明显好处是 ____。' },
      { en: 'I suspect that in the future ____.', zh: '我猜将来 ____。' },
    ],
  },
  {
    id: 'p3-work-careers',
    type: 'ielts_part3',
    topic: 'Work and Careers',
    topicZh: '工作与职业',
    questions: [
      { en: 'Why do some people change careers in the middle of their lives?', zh: '为什么有些人会在中年转行？' },
      { en: 'Is a high salary more important than job satisfaction?', zh: '高薪比工作满意度更重要吗？' },
      { en: 'How has the idea of a "job for life" changed?', zh: '“一份工作干一辈子”的观念发生了怎样的变化？' },
      { en: 'Do you think working from home is here to stay?', zh: '你认为居家办公会长期存在吗？' },
      { en: 'What skills will be most valuable in the future job market?', zh: '未来就业市场上哪些技能最有价值？' },
    ],
    scaffold: [
      { en: 'There are several reasons for this. Firstly, ____.', zh: '这有几个原因。首先，____。' },
      { en: 'Personally, I would say ____ matters more, because ____.', zh: '就我个人而言，我认为 ____ 更重要，因为 ____。' },
      { en: 'Compared with the past, ____.', zh: '与过去相比，____。' },
      { en: 'It seems likely that ____.', zh: '看起来很可能 ____。' },
    ],
  },
  {
    id: 'p3-environment',
    type: 'ielts_part3',
    topic: 'The Environment',
    topicZh: '环境',
    questions: [
      { en: 'Whose responsibility is it to protect the environment?', zh: '保护环境是谁的责任？' },
      { en: 'Can individual actions really make a difference?', zh: '个人的行动真的能带来改变吗？' },
      { en: 'Why do people find it hard to change their habits?', zh: '为什么人们很难改变自己的习惯？' },
      { en: 'Should governments force companies to be greener?', zh: '政府是否应强制企业更环保？' },
      { en: 'Are you optimistic about the future of the planet?', zh: '你对地球的未来乐观吗？' },
    ],
    scaffold: [
      { en: 'I believe the responsibility is shared between ____ and ____.', zh: '我认为责任由 ____ 和 ____ 共同承担。' },
      { en: 'Although one person cannot ____, collectively we ____.', zh: '虽然一个人无法 ____，但集体上我们 ____。' },
      { en: 'The main reason, I think, is that ____.', zh: '我认为主要原因是 ____。' },
      { en: 'To be honest, I am cautiously optimistic because ____.', zh: '老实说，我持谨慎乐观，因为 ____。' },
    ],
  },
  {
    id: 'p3-media-news',
    type: 'ielts_part3',
    topic: 'Media and News',
    topicZh: '媒体与新闻',
    questions: [
      { en: 'How do most people get their news nowadays?', zh: '如今大多数人怎样获取新闻？' },
      { en: 'Why do you think fake news spreads so quickly?', zh: '你认为假新闻为何传播得如此之快？' },
      { en: 'Should social media companies control what people post?', zh: '社交媒体公司是否应管控用户发布的内容？' },
      { en: 'Is advertising a positive or negative influence on society?', zh: '广告对社会的影响是正面还是负面？' },
      { en: 'Do celebrities have too much influence on young people?', zh: '名人对年轻人的影响是否过大？' },
    ],
    scaffold: [
      { en: 'These days, most people tend to ____.', zh: '如今，大多数人往往 ____。' },
      { en: 'One reason might be that ____.', zh: '一个原因可能是 ____。' },
      { en: "I can see both sides, but on balance I think ____.", zh: '两方面我都理解，但权衡之下我认为 ____。' },
      { en: 'It has both benefits and drawbacks. For instance, ____.', zh: '它有利也有弊。比如，____。' },
    ],
  },
  {
    id: 'p3-family-relationships',
    type: 'ielts_part3',
    topic: 'Family and Relationships',
    topicZh: '家庭与人际关系',
    questions: [
      { en: 'How have families changed over the past few decades?', zh: '过去几十年里家庭发生了怎样的变化？' },
      { en: 'Do you think grandparents should help raise children?', zh: '你认为祖辈是否应帮忙带孩子？' },
      { en: 'Why do some people prefer to live alone?', zh: '为什么有些人更愿意独居？' },
      { en: 'Is it easier to make friends as a child or as an adult?', zh: '小时候和成年后，哪个更容易交朋友？' },
      { en: 'How important is it to keep in touch with old friends?', zh: '与老朋友保持联系有多重要？' },
    ],
    scaffold: [
      { en: 'Over the years, families have become ____.', zh: '这些年来，家庭变得 ____。' },
      { en: 'I would say it has both advantages and disadvantages.', zh: '我认为这既有好处也有坏处。' },
      { en: 'Some people prefer this because ____.', zh: '有些人偏好这样，是因为 ____。' },
      { en: 'In my experience, ____.', zh: '以我的经验，____。' },
    ],
  },
  {
    id: 'p3-money-consumerism',
    type: 'ielts_part3',
    topic: 'Money and Consumerism',
    topicZh: '金钱与消费',
    questions: [
      { en: 'Do you think people spend money more carelessly than in the past?', zh: '你认为人们花钱比过去更随意了吗？' },
      { en: 'Why are some people willing to pay a lot for brand names?', zh: '为什么有些人愿意为名牌花大价钱？' },
      { en: 'Should children be taught how to manage money at school?', zh: '学校是否应教孩子如何理财？' },
      { en: 'Does having more money make people happier?', zh: '钱越多人就越快乐吗？' },
      { en: 'Is it better to save money or to enjoy it now?', zh: '把钱存起来更好，还是现在享受更好？' },
    ],
    scaffold: [
      { en: 'It seems to me that ____.', zh: '在我看来 ____。' },
      { en: 'People do this partly because ____.', zh: '人们这么做，部分是因为 ____。' },
      { en: 'Up to a point, yes, but ____.', zh: '在一定程度上是的，但 ____。' },
      { en: 'I would strike a balance by ____.', zh: '我会通过 ____ 来取得平衡。' },
    ],
  },
  {
    id: 'p3-travel-culture',
    type: 'ielts_part3',
    topic: 'Travel and Culture',
    topicZh: '旅行与文化',
    questions: [
      { en: 'Why do people enjoy travelling to other countries?', zh: '人们为什么喜欢去别的国家旅行？' },
      { en: 'Does tourism always benefit local communities?', zh: '旅游业总是有利于当地社区吗？' },
      { en: 'Can you really understand a culture just by visiting it?', zh: '仅靠走访就能真正了解一种文化吗？' },
      { en: 'How has cheap air travel changed the way we see the world?', zh: '廉价航空如何改变了我们看世界的方式？' },
      { en: 'Is it important to learn the language before visiting a country?', zh: '去一个国家之前学它的语言重要吗？' },
    ],
    scaffold: [
      { en: 'I think the main appeal is ____.', zh: '我认为主要的吸引力在于 ____。' },
      { en: 'Not necessarily, because ____.', zh: '不一定，因为 ____。' },
      { en: 'To some extent yes, however ____.', zh: '在某种程度上是的，然而 ____。' },
      { en: 'What I have noticed is that ____.', zh: '我注意到的是 ____。' },
    ],
  },
  {
    id: 'p3-health-lifestyle',
    type: 'ielts_part3',
    topic: 'Health and Lifestyle',
    topicZh: '健康与生活方式',
    questions: [
      { en: 'Why do so many people find it hard to stay healthy?', zh: '为什么这么多人难以保持健康？' },
      { en: 'Should the government do more to encourage exercise?', zh: '政府是否应更多地鼓励人们锻炼？' },
      { en: 'Do you think modern life is more stressful than in the past?', zh: '你认为现代生活比过去更有压力吗？' },
      { en: 'How can people find a balance between work and rest?', zh: '人们如何在工作与休息之间取得平衡？' },
      { en: 'Is it the individual or society that should promote healthy living?', zh: '推动健康生活的应是个人还是社会？' },
    ],
    scaffold: [
      { en: 'A major factor here is ____.', zh: '这里一个主要因素是 ____。' },
      { en: 'I firmly believe that ____.', zh: '我坚信 ____。' },
      { en: 'In some ways it is, but in other ways ____.', zh: '在某些方面是的，但在另一些方面 ____。' },
      { en: 'One practical way to do this is ____.', zh: '做到这点的一个实际办法是 ____。' },
    ],
  },
  {
    id: 'p3-cities-living',
    type: 'ielts_part3',
    topic: 'Cities and Living',
    topicZh: '城市与居住',
    questions: [
      { en: 'What are the main advantages of living in a big city?', zh: '住在大城市的主要好处是什么？' },
      { en: 'Why are more and more people moving to cities?', zh: '为什么越来越多的人涌入城市？' },
      { en: 'What problems does rapid city growth cause?', zh: '城市快速扩张会带来哪些问题？' },
      { en: 'How could cities be made more pleasant to live in?', zh: '如何让城市更宜居？' },
      { en: 'Do you think everyone will live in cities in the future?', zh: '你认为将来所有人都会住在城市里吗？' },
    ],
    scaffold: [
      { en: 'The biggest advantage, I would say, is ____.', zh: '我认为最大的好处是 ____。' },
      { en: 'This trend is largely driven by ____.', zh: '这一趋势主要由 ____ 推动。' },
      { en: 'One serious problem is ____, which leads to ____.', zh: '一个严重的问题是 ____，这会导致 ____。' },
      { en: 'A possible solution would be to ____.', zh: '一个可能的解决办法是 ____。' },
    ],
  },
  {
    id: 'p3-art-creativity',
    type: 'ielts_part3',
    topic: 'Art and Creativity',
    topicZh: '艺术与创造力',
    questions: [
      { en: 'Why is art important in society?', zh: '艺术在社会中为何重要？' },
      { en: 'Should art be a compulsory subject at school?', zh: '艺术是否应成为学校的必修课？' },
      { en: 'Can creativity be taught, or is it something people are born with?', zh: '创造力是可以教的，还是天生的？' },
      { en: 'Do you think governments should fund the arts?', zh: '你认为政府应资助艺术吗？' },
      { en: 'Has technology made people more or less creative?', zh: '科技让人们更有创造力还是更缺乏创造力？' },
    ],
    scaffold: [
      { en: 'Art plays an important role because ____.', zh: '艺术起着重要作用，因为 ____。' },
      { en: 'I would strongly support this, since ____.', zh: '我强烈支持这一点，因为 ____。' },
      { en: 'I tend to think it is a mix of both.', zh: '我倾向于认为两者兼有。' },
      { en: 'On balance, the effect has been ____.', zh: '总的来说，其影响是 ____。' },
    ],
  },
  {
    id: 'p3-change-future',
    type: 'ielts_part3',
    topic: 'Change and the Future',
    topicZh: '变化与未来',
    questions: [
      { en: 'Do people generally welcome change or resist it?', zh: '人们通常是欢迎变化还是抗拒变化？' },
      { en: 'Why are older people sometimes uncomfortable with new technology?', zh: '为什么年长者有时对新技术感到不适应？' },
      { en: 'Is it possible to predict what life will be like in the future?', zh: '有可能预测未来的生活是什么样吗？' },
      { en: 'What kind of changes would you most like to see in your country?', zh: '你最希望在你的国家看到怎样的变化？' },
      { en: 'Are all changes a sign of progress?', zh: '所有的变化都是进步的标志吗？' },
    ],
    scaffold: [
      { en: 'In general, I think people tend to ____.', zh: '总的来说，我认为人们往往 ____。' },
      { en: 'This is understandable, given that ____.', zh: '这是可以理解的，鉴于 ____。' },
      { en: 'It is difficult to say for certain, but ____.', zh: '很难确定，但 ____。' },
      { en: 'Not always; sometimes change simply means ____.', zh: '并非总是如此；有时变化只是意味着 ____。' },
    ],
  },
];
