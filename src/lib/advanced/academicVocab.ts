// @ts-nocheck
// 学术词汇（AWL）· 进阶表达词库 —— 免费、公开真实词表，零评分、开口造句
// ----------------------------------------------------------------------------
// 来源（公开学术成果，可引用，非泄题、非付费）：
//   Coxhead, A. (2000). A New Academic Word List. TESOL Quarterly, 34(2), 213–238.
//   —— 570 个学术词族（word families），覆盖学术语篇约 10% 的词汇。
//   本文件先收录 Sublist 1（频率最高的 60 词族）中最实用的一批，持续扩充。
//
// 灵魂对齐：不是背词应试，而是「学会一个进阶词 → 立刻用它开口造一句」。
//   每个词给：词性、准确中文释义、一个自然例句（en+zh）、一个造句脚手架。
//   IPA 由 data/wordIPA.js 运行时查（命中才显示，不编造）。
//
// 数据结构：{ w, pos, zh, example:{en,zh}, scaffold:{en,zh} }

export const AWL_SUBLIST1 = [
  {
    w: 'analyze', pos: 'v. 动词', zh: '分析；细致研究',
    example: { en: 'Scientists analyze the data before drawing conclusions.', zh: '科学家在下结论前会先分析数据。' },
    scaffold: { en: 'I usually analyze ____ before I decide.', zh: '我通常在决定前先分析 ____。' },
  },
  {
    w: 'approach', pos: 'n./v. 名词/动词', zh: '方法；着手处理；接近',
    example: { en: 'We need a new approach to solve this problem.', zh: '我们需要一种新方法来解决这个问题。' },
    scaffold: { en: 'A good approach to ____ is to ____.', zh: '处理 ____ 的一个好方法是 ____。' },
  },
  {
    w: 'area', pos: 'n. 名词', zh: '领域；地区；面积',
    example: { en: 'This is an area I would like to learn more about.', zh: '这是一个我想多了解的领域。' },
    scaffold: { en: 'The area I am most interested in is ____.', zh: '我最感兴趣的领域是 ____。' },
  },
  {
    w: 'assess', pos: 'v. 动词', zh: '评估；估量',
    example: { en: 'It is hard to assess the risk without more information.', zh: '没有更多信息很难评估风险。' },
    scaffold: { en: 'Before I start, I like to assess ____.', zh: '开始之前，我喜欢先评估 ____。' },
  },
  {
    w: 'assume', pos: 'v. 动词', zh: '假定；认为（理所当然）',
    example: { en: 'We should not assume that everyone agrees.', zh: '我们不该假定每个人都同意。' },
    scaffold: { en: 'People often assume that ____, but ____.', zh: '人们常假定 ____，但 ____。' },
  },
  {
    w: 'available', pos: 'adj. 形容词', zh: '可获得的；有空的',
    example: { en: 'More information is available online.', zh: '网上有更多可获取的信息。' },
    scaffold: { en: '____ is available whenever I need it.', zh: '我需要时 ____ 随时都能用到。' },
  },
  {
    w: 'benefit', pos: 'n./v. 名词/动词', zh: '益处；使受益',
    example: { en: 'Regular exercise has many health benefits.', zh: '规律运动有很多健康益处。' },
    scaffold: { en: 'One big benefit of ____ is ____.', zh: '____ 的一大好处是 ____。' },
  },
  {
    w: 'concept', pos: 'n. 名词', zh: '概念；观念',
    example: { en: 'The teacher explained the concept with a simple example.', zh: '老师用一个简单的例子解释了这个概念。' },
    scaffold: { en: 'The concept of ____ is easy once you ____.', zh: '一旦你 ____，____ 这个概念就很好懂。' },
  },
  {
    w: 'consistent', pos: 'adj. 形容词', zh: '一致的；始终如一的',
    example: { en: 'Her results were consistent every time.', zh: '她每次的结果都一致。' },
    scaffold: { en: 'To improve, you need to be consistent with ____.', zh: '要进步，你需要在 ____ 上保持坚持。' },
  },
  {
    w: 'context', pos: 'n. 名词', zh: '语境；背景；上下文',
    example: { en: 'The meaning of a word depends on its context.', zh: '一个词的意思取决于它的语境。' },
    scaffold: { en: 'In the context of ____, this means ____.', zh: '在 ____ 的语境下，这意味着 ____。' },
  },
  {
    w: 'create', pos: 'v. 动词', zh: '创造；产生',
    example: { en: 'They worked together to create something new.', zh: '他们一起合作创造了新东西。' },
    scaffold: { en: 'I would love to create ____.', zh: '我很想创造 ____。' },
  },
  {
    w: 'data', pos: 'n. 名词', zh: '数据；资料',
    example: { en: 'The data shows a clear trend.', zh: '数据显示出一个明显的趋势。' },
    scaffold: { en: 'According to the data, ____.', zh: '根据数据，____。' },
  },
  {
    w: 'define', pos: 'v. 动词', zh: '定义；界定',
    example: { en: 'It is important to define your goal clearly.', zh: '清楚地定义你的目标很重要。' },
    scaffold: { en: 'How would you define ____?', zh: '你会怎么定义 ____？' },
  },
  {
    w: 'environment', pos: 'n. 名词', zh: '环境；自然环境',
    example: { en: 'We should protect the environment for the future.', zh: '我们应为未来保护环境。' },
    scaffold: { en: 'A quiet environment helps me ____.', zh: '安静的环境帮助我 ____。' },
  },
  {
    w: 'establish', pos: 'v. 动词', zh: '建立；确立',
    example: { en: 'It takes time to establish trust.', zh: '建立信任需要时间。' },
    scaffold: { en: 'First, we need to establish ____.', zh: '首先，我们需要确立 ____。' },
  },
  {
    w: 'estimate', pos: 'v./n. 动词/名词', zh: '估计；估算',
    example: { en: 'Can you estimate how long it will take?', zh: '你能估计一下要花多久吗？' },
    scaffold: { en: 'I would estimate that ____.', zh: '我估计 ____。' },
  },
  {
    w: 'evidence', pos: 'n. 名词', zh: '证据；证明',
    example: { en: 'There is strong evidence to support this idea.', zh: '有有力的证据支持这个观点。' },
    scaffold: { en: 'The evidence suggests that ____.', zh: '证据表明 ____。' },
  },
  {
    w: 'factor', pos: 'n. 名词', zh: '因素；要素',
    example: { en: 'Price is an important factor when I choose.', zh: '我选择时，价格是一个重要因素。' },
    scaffold: { en: 'The main factor in ____ is ____.', zh: '____ 中最主要的因素是 ____。' },
  },
  {
    w: 'function', pos: 'n./v. 名词/动词', zh: '功能；作用；运作',
    example: { en: 'Each part has its own function.', zh: '每个部分都有自己的功能。' },
    scaffold: { en: 'The main function of ____ is to ____.', zh: '____ 的主要功能是 ____。' },
  },
  {
    w: 'identify', pos: 'v. 动词', zh: '识别；确认；找出',
    example: { en: 'First we need to identify the real problem.', zh: '首先我们需要找出真正的问题。' },
    scaffold: { en: 'It is important to identify ____ early.', zh: '尽早识别 ____ 很重要。' },
  },
  {
    w: 'indicate', pos: 'v. 动词', zh: '表明；指示',
    example: { en: 'The results indicate that the plan worked.', zh: '结果表明这个计划奏效了。' },
    scaffold: { en: 'This seems to indicate that ____.', zh: '这似乎表明 ____。' },
  },
  {
    w: 'individual', pos: 'n./adj. 名词/形容词', zh: '个人；个体的',
    example: { en: 'Every individual has the right to be heard.', zh: '每个人都有被倾听的权利。' },
    scaffold: { en: 'As an individual, I believe ____.', zh: '作为一个个体，我认为 ____。' },
  },
  {
    w: 'involve', pos: 'v. 动词', zh: '涉及；包含；使参与',
    example: { en: 'The job involves a lot of teamwork.', zh: '这份工作涉及大量团队合作。' },
    scaffold: { en: 'My daily routine involves ____.', zh: '我的日常包括 ____。' },
  },
  {
    w: 'issue', pos: 'n. 名词', zh: '议题；问题',
    example: { en: 'Climate change is a serious issue.', zh: '气候变化是一个严重的问题。' },
    scaffold: { en: 'One issue I care about is ____.', zh: '我关心的一个议题是 ____。' },
  },
  {
    w: 'method', pos: 'n. 名词', zh: '方法；办法',
    example: { en: 'This method is faster and more reliable.', zh: '这种方法更快也更可靠。' },
    scaffold: { en: 'My favourite method for ____ is ____.', zh: '我做 ____ 最喜欢的方法是 ____。' },
  },
  {
    w: 'occur', pos: 'v. 动词', zh: '发生；出现',
    example: { en: 'Mistakes often occur when we rush.', zh: '我们匆忙时常会出错。' },
    scaffold: { en: '____ usually occurs when ____.', zh: '____ 通常在 ____ 时发生。' },
  },
  {
    w: 'percent', pos: 'n. 名词', zh: '百分比；百分之……',
    example: { en: 'About eighty percent of people agreed.', zh: '大约百分之八十的人同意。' },
    scaffold: { en: 'A large percent of ____ is ____.', zh: '很大比例的 ____ 是 ____。' },
  },
  {
    w: 'policy', pos: 'n. 名词', zh: '政策；方针',
    example: { en: 'The company changed its return policy.', zh: '公司更改了退货政策。' },
    scaffold: { en: 'I think the policy on ____ should ____.', zh: '我认为关于 ____ 的政策应该 ____。' },
  },
  {
    w: 'process', pos: 'n./v. 名词/动词', zh: '过程；处理',
    example: { en: 'Learning a language is a slow process.', zh: '学语言是一个缓慢的过程。' },
    scaffold: { en: 'The process of ____ takes ____.', zh: '____ 的过程需要 ____。' },
  },
  {
    w: 'require', pos: 'v. 动词', zh: '需要；要求',
    example: { en: 'This task requires a lot of patience.', zh: '这项任务需要很大的耐心。' },
    scaffold: { en: 'To do ____ well, it requires ____.', zh: '要把 ____ 做好，需要 ____。' },
  },
  {
    w: 'research', pos: 'n./v. 名词/动词', zh: '研究；调查',
    example: { en: 'I did some research before buying it.', zh: '买之前我做了一些调查。' },
    scaffold: { en: 'I always do research before ____.', zh: '我总会在 ____ 之前做调查。' },
  },
  {
    w: 'significant', pos: 'adj. 形容词', zh: '重大的；显著的',
    example: { en: 'There was a significant change in the results.', zh: '结果有了显著的变化。' },
    scaffold: { en: 'A significant part of my life is ____.', zh: '我生活中很重要的一部分是 ____。' },
  },
  {
    w: 'similar', pos: 'adj. 形容词', zh: '相似的；类似的',
    example: { en: 'Our opinions are quite similar.', zh: '我们的观点相当相似。' },
    scaffold: { en: '____ is similar to ____ because ____.', zh: '____ 和 ____ 相似，因为 ____。' },
  },
  {
    w: 'source', pos: 'n. 名词', zh: '来源；出处',
    example: { en: 'Always check the source of the information.', zh: '一定要核实信息的来源。' },
    scaffold: { en: 'My main source of ____ is ____.', zh: '我 ____ 的主要来源是 ____。' },
  },
  {
    w: 'specific', pos: 'adj. 形容词', zh: '具体的；特定的',
    example: { en: 'Can you give a specific example?', zh: '你能给一个具体的例子吗？' },
    scaffold: { en: 'To be specific, I mean ____.', zh: '具体来说，我指的是 ____。' },
  },
  {
    w: 'structure', pos: 'n./v. 名词/动词', zh: '结构；构造',
    example: { en: 'A clear structure makes writing easier to follow.', zh: '清晰的结构让文章更易读懂。' },
    scaffold: { en: 'The structure of ____ is made up of ____.', zh: '____ 的结构由 ____ 组成。' },
  },
  {
    w: 'theory', pos: 'n. 名词', zh: '理论；学说',
    example: { en: 'In theory, the plan should work.', zh: '理论上，这个计划应该行得通。' },
    scaffold: { en: 'My theory is that ____.', zh: '我的理论是 ____。' },
  },
  {
    w: 'vary', pos: 'v. 动词', zh: '变化；不同',
    example: { en: 'Prices vary from shop to shop.', zh: '价格因店而异。' },
    scaffold: { en: '____ can vary depending on ____.', zh: '____ 会因 ____ 而不同。' },
  },
];

export const AWL_SUBLIST2 = [
  {
    w: 'achieve', pos: 'v. 动词', zh: '实现；达成',
    example: { en: 'With practice, you can achieve almost any goal.', zh: '通过练习，你几乎能实现任何目标。' },
    scaffold: { en: 'I would like to achieve ____ this year.', zh: '今年我想实现 ____。' },
  },
  {
    w: 'acquire', pos: 'v. 动词', zh: '获得；习得',
    example: { en: 'Children acquire language naturally by listening.', zh: '孩子通过听自然地习得语言。' },
    scaffold: { en: 'I hope to acquire ____.', zh: '我希望习得 ____。' },
  },
  {
    w: 'affect', pos: 'v. 动词', zh: '影响',
    example: { en: 'The weather can affect how I feel.', zh: '天气会影响我的感受。' },
    scaffold: { en: '____ really affects my ____.', zh: '____ 真的会影响我的 ____。' },
  },
  {
    w: 'appropriate', pos: 'adj. 形容词', zh: '合适的；恰当的',
    example: { en: 'It is important to use appropriate language at work.', zh: '在工作中使用恰当的语言很重要。' },
    scaffold: { en: 'I think ____ is appropriate for ____.', zh: '我觉得 ____ 对 ____ 来说是合适的。' },
  },
  {
    w: 'aspect', pos: 'n. 名词', zh: '方面；层面',
    example: { en: 'My favourite aspect of the job is the people.', zh: '这份工作我最喜欢的方面是同事。' },
    scaffold: { en: 'One important aspect of ____ is ____.', zh: '____ 的一个重要方面是 ____。' },
  },
  {
    w: 'category', pos: 'n. 名词', zh: '类别；范畴',
    example: { en: 'These products fall into three main categories.', zh: '这些产品分为三大类别。' },
    scaffold: { en: '____ belongs to the category of ____.', zh: '____ 属于 ____ 这一类。' },
  },
  {
    w: 'community', pos: 'n. 名词', zh: '社区；群体',
    example: { en: 'A strong community supports its members.', zh: '一个强大的社区会支持它的成员。' },
    scaffold: { en: 'In my community, people often ____.', zh: '在我的社区里，人们常常 ____。' },
  },
  {
    w: 'complex', pos: 'adj. 形容词', zh: '复杂的',
    example: { en: 'The problem is more complex than it looks.', zh: '这个问题比看起来更复杂。' },
    scaffold: { en: '____ is quite complex because ____.', zh: '____ 相当复杂，因为 ____。' },
  },
  {
    w: 'conclude', pos: 'v. 动词', zh: '得出结论；总结',
    example: { en: 'From the results, we can conclude that the method works.', zh: '从结果看，我们可以得出这个方法有效的结论。' },
    scaffold: { en: 'I would conclude that ____.', zh: '我会得出结论 ____。' },
  },
  {
    w: 'consequence', pos: 'n. 名词', zh: '后果；结果',
    example: { en: 'Every choice has consequences.', zh: '每个选择都有后果。' },
    scaffold: { en: 'One consequence of ____ is ____.', zh: '____ 的一个后果是 ____。' },
  },
  {
    w: 'culture', pos: 'n. 名词', zh: '文化',
    example: { en: 'Travelling helps you understand other cultures.', zh: '旅行帮助你理解其他文化。' },
    scaffold: { en: 'In my culture, it is common to ____.', zh: '在我的文化里，____ 很常见。' },
  },
  {
    w: 'design', pos: 'n./v. 名词/动词', zh: '设计',
    example: { en: 'Good design makes a product easy to use.', zh: '好的设计让产品易于使用。' },
    scaffold: { en: 'I really like the design of ____.', zh: '我很喜欢 ____ 的设计。' },
  },
  {
    w: 'evaluate', pos: 'v. 动词', zh: '评价；评估',
    example: { en: 'We need to evaluate the results carefully.', zh: '我们需要仔细评估结果。' },
    scaffold: { en: 'To evaluate ____, I would look at ____.', zh: '要评估 ____，我会看 ____。' },
  },
  {
    w: 'focus', pos: 'n./v. 名词/动词', zh: '专注；焦点',
    example: { en: 'It is hard to focus when there is noise.', zh: '有噪音时很难专注。' },
    scaffold: { en: 'Right now my main focus is ____.', zh: '现在我主要专注于 ____。' },
  },
  {
    w: 'impact', pos: 'n. 名词', zh: '影响；冲击',
    example: { en: 'Social media has a big impact on young people.', zh: '社交媒体对年轻人有很大影响。' },
    scaffold: { en: '____ has a strong impact on ____.', zh: '____ 对 ____ 有很大影响。' },
  },
  {
    w: 'maintain', pos: 'v. 动词', zh: '维持；保持',
    example: { en: 'It takes effort to maintain good habits.', zh: '保持好习惯需要努力。' },
    scaffold: { en: 'To maintain ____, I try to ____.', zh: '为了保持 ____，我尽量 ____。' },
  },
  {
    w: 'obtain', pos: 'v. 动词', zh: '获得；取得',
    example: { en: 'You can obtain more details from the website.', zh: '你可以从网站获取更多细节。' },
    scaffold: { en: 'I obtained ____ by ____.', zh: '我通过 ____ 获得了 ____。' },
  },
  {
    w: 'positive', pos: 'adj. 形容词', zh: '积极的；正面的',
    example: { en: 'She always keeps a positive attitude.', zh: '她总是保持积极的态度。' },
    scaffold: { en: 'A positive thing about ____ is ____.', zh: '____ 的一个正面之处是 ____。' },
  },
  {
    w: 'potential', pos: 'n./adj. 名词/形容词', zh: '潜力；潜在的',
    example: { en: 'This idea has great potential.', zh: '这个想法有巨大的潜力。' },
    scaffold: { en: 'I see a lot of potential in ____.', zh: '我看到 ____ 有很大的潜力。' },
  },
  {
    w: 'previous', pos: 'adj. 形容词', zh: '先前的；之前的',
    example: { en: 'My previous job was very different.', zh: '我之前的工作非常不同。' },
    scaffold: { en: 'In my previous ____, I ____.', zh: '在我之前的 ____ 里，我 ____。' },
  },
  {
    w: 'range', pos: 'n. 名词', zh: '范围；幅度',
    example: { en: 'The shop sells a wide range of products.', zh: '这家店出售种类繁多的产品。' },
    scaffold: { en: 'There is a wide range of ____.', zh: '有各种各样的 ____。' },
  },
  {
    w: 'region', pos: 'n. 名词', zh: '地区；区域',
    example: { en: 'This dish is popular in the northern region.', zh: '这道菜在北部地区很受欢迎。' },
    scaffold: { en: 'In my region, people usually ____.', zh: '在我所在的地区，人们通常 ____。' },
  },
  {
    w: 'resource', pos: 'n. 名词', zh: '资源',
    example: { en: 'Water is a precious natural resource.', zh: '水是宝贵的自然资源。' },
    scaffold: { en: 'A useful resource for ____ is ____.', zh: '对 ____ 有用的一个资源是 ____。' },
  },
  {
    w: 'strategy', pos: 'n. 名词', zh: '策略；战略',
    example: { en: 'We need a clear strategy to win.', zh: '我们需要清晰的策略才能取胜。' },
    scaffold: { en: 'My strategy for ____ is to ____.', zh: '我应对 ____ 的策略是 ____。' },
  },
];

export const AWL_SUBLIST3 = [
  {
    w: 'alternative', pos: 'n./adj. 名词/形容词', zh: '替代方案；另一选择的',
    example: { en: 'If the train is full, we can look for an alternative.', zh: '如果火车满了，我们可以找个替代方案。' },
    scaffold: { en: 'A good alternative to ____ would be ____.', zh: '____ 的一个好替代选择是 ____。' },
  },
  {
    w: 'circumstance', pos: 'n. 名词', zh: '情况；情形',
    example: { en: 'Under normal circumstances, I would agree.', zh: '在正常情况下，我会同意。' },
    scaffold: { en: 'In that circumstance, I would ____.', zh: '在那种情况下，我会 ____。' },
  },
  {
    w: 'component', pos: 'n. 名词', zh: '组成部分；零件',
    example: { en: 'Trust is a key component of any friendship.', zh: '信任是任何友谊的关键组成部分。' },
    scaffold: { en: 'An important component of ____ is ____.', zh: '____ 的一个重要组成部分是 ____。' },
  },
  {
    w: 'considerable', pos: 'adj. 形容词', zh: '相当大的；可观的',
    example: { en: 'She spent a considerable amount of time on it.', zh: '她在这上面花了相当多的时间。' },
    scaffold: { en: 'It takes considerable ____ to ____.', zh: '要 ____ 需要相当多的 ____。' },
  },
  {
    w: 'constant', pos: 'adj. 形容词', zh: '持续的；恒定的',
    example: { en: 'Learning a language requires constant practice.', zh: '学语言需要持续的练习。' },
    scaffold: { en: 'The constant ____ makes it hard to ____.', zh: '持续的 ____ 让 ____ 变得困难。' },
  },
  {
    w: 'contribute', pos: 'v. 动词', zh: '贡献；促成',
    example: { en: 'Everyone can contribute something to the team.', zh: '每个人都能为团队贡献一些东西。' },
    scaffold: { en: 'I can contribute ____ to ____.', zh: '我可以为 ____ 贡献 ____。' },
  },
  {
    w: 'core', pos: 'n./adj. 名词/形容词', zh: '核心；最重要的',
    example: { en: 'Honesty is at the core of good communication.', zh: '诚实是良好沟通的核心。' },
    scaffold: { en: 'The core of ____ is ____.', zh: '____ 的核心是 ____。' },
  },
  {
    w: 'demonstrate', pos: 'v. 动词', zh: '证明；演示',
    example: { en: 'The teacher demonstrated how to solve it step by step.', zh: '老师一步步演示了如何解决它。' },
    scaffold: { en: 'This clearly demonstrates that ____.', zh: '这清楚地证明了 ____。' },
  },
  {
    w: 'dominate', pos: 'v. 动词', zh: '支配；主导',
    example: { en: 'One team dominated the entire match.', zh: '一支队伍主导了整场比赛。' },
    scaffold: { en: '____ tends to dominate ____.', zh: '____ 往往主导着 ____。' },
  },
  {
    w: 'emphasis', pos: 'n. 名词', zh: '强调；重点',
    example: { en: 'Our school places great emphasis on reading.', zh: '我们学校非常重视阅读。' },
    scaffold: { en: 'I would put more emphasis on ____.', zh: '我会更强调 ____。' },
  },
  {
    w: 'ensure', pos: 'v. 动词', zh: '确保；保证',
    example: { en: 'Please ensure that the door is locked.', zh: '请确保门锁好了。' },
    scaffold: { en: 'To ensure ____, I always ____.', zh: '为了确保 ____，我总是 ____。' },
  },
  {
    w: 'exclude', pos: 'v. 动词', zh: '排除；不包括',
    example: { en: 'The price excludes delivery.', zh: '这个价格不包括运费。' },
    scaffold: { en: 'We should not exclude ____ because ____.', zh: '我们不该排除 ____，因为 ____。' },
  },
  {
    w: 'framework', pos: 'n. 名词', zh: '框架；体系',
    example: { en: 'The plan gives us a clear framework to follow.', zh: '这个计划给了我们一个清晰的框架可循。' },
    scaffold: { en: '____ provides a useful framework for ____.', zh: '____ 为 ____ 提供了有用的框架。' },
  },
  {
    w: 'fund', pos: 'n./v. 名词/动词', zh: '资金；资助',
    example: { en: 'The government funds public schools.', zh: '政府资助公立学校。' },
    scaffold: { en: 'If I had the funds, I would ____.', zh: '如果我有资金，我会 ____。' },
  },
  {
    w: 'illustrate', pos: 'v. 动词', zh: '说明；举例阐明',
    example: { en: 'Let me illustrate my point with an example.', zh: '让我用一个例子来说明我的观点。' },
    scaffold: { en: 'This example illustrates how ____.', zh: '这个例子说明了 ____ 是如何 ____。' },
  },
  {
    w: 'imply', pos: 'v. 动词', zh: '暗示；意味着',
    example: { en: 'His silence seemed to imply agreement.', zh: '他的沉默似乎暗示着同意。' },
    scaffold: { en: 'That does not necessarily imply ____.', zh: '那并不一定意味着 ____。' },
  },
  {
    w: 'initial', pos: 'adj. 形容词', zh: '最初的；开始的',
    example: { en: 'My initial reaction was surprise.', zh: '我最初的反应是惊讶。' },
    scaffold: { en: 'My initial thought about ____ was ____.', zh: '我对 ____ 最初的想法是 ____。' },
  },
  {
    w: 'instance', pos: 'n. 名词', zh: '例子；实例',
    example: { en: 'For instance, many people learn better by doing.', zh: '例如，许多人通过实践学得更好。' },
    scaffold: { en: 'For instance, ____.', zh: '举个例子，____。' },
  },
  {
    w: 'justify', pos: 'v. 动词', zh: '证明……正当；为……辩护',
    example: { en: 'You need facts to justify such a claim.', zh: '你需要事实来证明这样的说法是正当的。' },
    scaffold: { en: 'I can justify ____ by saying ____.', zh: '我可以通过 ____ 来证明 ____ 是合理的。' },
  },
  {
    w: 'outcome', pos: 'n. 名词', zh: '结果；结局',
    example: { en: 'The outcome of the meeting was positive.', zh: '会议的结果是积极的。' },
    scaffold: { en: 'The best possible outcome would be ____.', zh: '最好的结果会是 ____。' },
  },
  {
    w: 'sequence', pos: 'n. 名词', zh: '顺序；一系列',
    example: { en: 'The steps must be done in the right sequence.', zh: '这些步骤必须按正确的顺序完成。' },
    scaffold: { en: 'The sequence of ____ is: first ____, then ____.', zh: '____ 的顺序是：先 ____，然后 ____。' },
  },
  {
    w: 'shift', pos: 'n./v. 名词/动词', zh: '转变；转移；轮班',
    example: { en: 'There has been a shift towards online learning.', zh: '出现了一种向在线学习的转变。' },
    scaffold: { en: 'I noticed a shift in ____.', zh: '我注意到 ____ 发生了转变。' },
  },
  {
    w: 'sufficient', pos: 'adj. 形容词', zh: '足够的',
    example: { en: 'We did not have sufficient time to finish.', zh: '我们没有足够的时间完成。' },
    scaffold: { en: '____ is sufficient for ____.', zh: '____ 对 ____ 来说足够了。' },
  },
  {
    w: 'technique', pos: 'n. 名词', zh: '技巧；方法',
    example: { en: 'She taught me a useful technique for memorising words.', zh: '她教了我一个记单词的实用技巧。' },
    scaffold: { en: 'A helpful technique for ____ is ____.', zh: '____ 的一个有用技巧是 ____。' },
  },
  {
    w: 'valid', pos: 'adj. 形容词', zh: '有效的；有根据的',
    example: { en: 'That is a valid point worth discussing.', zh: '那是一个值得讨论的合理观点。' },
    scaffold: { en: 'I think that is a valid ____ because ____.', zh: '我认为那是一个合理的 ____，因为 ____。' },
  },
];

export const AWL_SUBLIST4 = [
  {
    w: 'access', pos: 'n./v. 名词/动词', zh: '获取；进入（权）',
    example: { en: 'Students have free access to the online library.', zh: '学生可以免费使用在线图书馆。' },
    scaffold: { en: 'Everyone should have access to ____.', zh: '每个人都应该能获得 ____。' },
  },
  {
    w: 'adequate', pos: 'adj. 形容词', zh: '足够的；胜任的',
    example: { en: 'The room was small but adequate for two people.', zh: '房间不大，但供两个人住足够了。' },
    scaffold: { en: '____ is adequate for ____.', zh: '____ 对 ____ 来说足够了。' },
  },
  {
    w: 'annual', pos: 'adj. 形容词', zh: '每年的；年度的',
    example: { en: 'The company holds an annual meeting every spring.', zh: '公司每年春天举行一次年度会议。' },
    scaffold: { en: 'My favourite annual event is ____.', zh: '我最喜欢的年度活动是 ____。' },
  },
  {
    w: 'apparent', pos: 'adj. 形容词', zh: '显然的；表面上的',
    example: { en: 'It soon became apparent that he was right.', zh: '很快就显然可见他是对的。' },
    scaffold: { en: 'It is apparent that ____.', zh: '显然 ____。' },
  },
  {
    w: 'attitude', pos: 'n. 名词', zh: '态度',
    example: { en: 'A positive attitude helps you learn faster.', zh: '积极的态度能帮你学得更快。' },
    scaffold: { en: 'My attitude towards ____ is ____.', zh: '我对 ____ 的态度是 ____。' },
  },
  {
    w: 'commit', pos: 'v. 动词', zh: '承诺；投入；犯（错/罪）',
    example: { en: 'She committed herself to finishing the course.', zh: '她下定决心要完成这门课程。' },
    scaffold: { en: 'I am willing to commit to ____.', zh: '我愿意投入/承诺去 ____。' },
  },
  {
    w: 'communicate', pos: 'v. 动词', zh: '交流；传达',
    example: { en: 'Good leaders communicate their ideas clearly.', zh: '优秀的领导者能清晰地传达想法。' },
    scaffold: { en: 'The best way to communicate ____ is ____.', zh: '传达 ____ 的最佳方式是 ____。' },
  },
  {
    w: 'concentrate', pos: 'v. 动词', zh: '集中（注意力）；专注',
    example: { en: 'It is hard to concentrate in a noisy room.', zh: '在嘈杂的房间里很难集中注意力。' },
    scaffold: { en: 'I concentrate best when ____.', zh: '当 ____ 时我最能集中。' },
  },
  {
    w: 'contrast', pos: 'n./v. 名词/动词', zh: '对比；形成对照',
    example: { en: 'In contrast to his brother, he is very quiet.', zh: '与他哥哥形成对比，他非常安静。' },
    scaffold: { en: 'In contrast to ____, ____.', zh: '与 ____ 相比，____。' },
  },
  {
    w: 'debate', pos: 'n./v. 名词/动词', zh: '辩论；争论',
    example: { en: 'There is a long debate about this issue.', zh: '关于这个问题存在长期的争论。' },
    scaffold: { en: 'People often debate whether ____.', zh: '人们常常争论是否 ____。' },
  },
  {
    w: 'despite', pos: 'prep. 介词', zh: '尽管',
    example: { en: 'Despite the rain, they went for a walk.', zh: '尽管下雨，他们还是去散步了。' },
    scaffold: { en: 'Despite ____, I still ____.', zh: '尽管 ____，我仍然 ____。' },
  },
  {
    w: 'domestic', pos: 'adj. 形容词', zh: '国内的；家庭的',
    example: { en: 'Domestic flights are usually cheaper than international ones.', zh: '国内航班通常比国际航班便宜。' },
    scaffold: { en: 'One domestic ____ I know is ____.', zh: '我知道的一个国内/家庭 ____ 是 ____。' },
  },
  {
    w: 'emerge', pos: 'v. 动词', zh: '出现；显现',
    example: { en: 'New problems emerged as the project grew.', zh: '随着项目扩大，新问题不断出现。' },
    scaffold: { en: 'A new ____ has emerged because ____.', zh: '一个新的 ____ 出现了，因为 ____。' },
  },
  {
    w: 'error', pos: 'n. 名词', zh: '错误',
    example: { en: 'The report contained several small errors.', zh: '报告里有几处小错误。' },
    scaffold: { en: 'A common error is to ____.', zh: '一个常见的错误是 ____。' },
  },
  {
    w: 'goal', pos: 'n. 名词', zh: '目标',
    example: { en: 'My main goal this year is to speak more fluently.', zh: '我今年的主要目标是说得更流利。' },
    scaffold: { en: 'My goal is to ____.', zh: '我的目标是 ____。' },
  },
  {
    w: 'hence', pos: 'adv. 副词', zh: '因此；由此',
    example: { en: 'The data were incomplete; hence the delay.', zh: '数据不完整，因此延误了。' },
    scaffold: { en: '____, hence ____.', zh: '____，因此 ____。' },
  },
  {
    w: 'implement', pos: 'v. 动词', zh: '实施；执行',
    example: { en: 'The school implemented a new reading programme.', zh: '学校实施了一项新的阅读计划。' },
    scaffold: { en: 'To implement ____, we first need ____.', zh: '要实施 ____，我们首先需要 ____。' },
  },
  {
    w: 'investigate', pos: 'v. 动词', zh: '调查；研究',
    example: { en: 'Scientists are investigating the cause of the disease.', zh: '科学家正在调查这种疾病的成因。' },
    scaffold: { en: 'Researchers investigate ____ in order to ____.', zh: '研究者调查 ____，以便 ____。' },
  },
  {
    w: 'obvious', pos: 'adj. 形容词', zh: '明显的；显而易见的',
    example: { en: 'The answer was obvious once she explained it.', zh: '她一解释，答案就显而易见了。' },
    scaffold: { en: 'The obvious solution to ____ is ____.', zh: '____ 的显而易见的解决办法是 ____。' },
  },
  {
    w: 'option', pos: 'n. 名词', zh: '选择；选项',
    example: { en: 'We have two options: stay or leave.', zh: '我们有两个选择：留下或离开。' },
    scaffold: { en: 'The best option for me would be ____.', zh: '对我来说最好的选择会是 ____。' },
  },
  {
    w: 'overall', pos: 'adj./adv. 形容词/副词', zh: '总体的；总体上',
    example: { en: 'Overall, the trip was a great success.', zh: '总体上，这次旅行非常成功。' },
    scaffold: { en: 'Overall, I think ____.', zh: '总体上，我认为 ____。' },
  },
  {
    w: 'predict', pos: 'v. 动词', zh: '预测；预言',
    example: { en: 'It is difficult to predict the weather accurately.', zh: '要准确预测天气很难。' },
    scaffold: { en: 'I predict that ____ will ____.', zh: '我预测 ____ 会 ____。' },
  },
  {
    w: 'professional', pos: 'adj./n. 形容词/名词', zh: '专业的；专业人士',
    example: { en: 'She gave a very professional presentation.', zh: '她做了一场非常专业的演示。' },
    scaffold: { en: 'A professional ____ should always ____.', zh: '一名专业的 ____ 应该始终 ____。' },
  },
  {
    w: 'promote', pos: 'v. 动词', zh: '促进；提升；晋升',
    example: { en: 'The campaign promotes healthy eating.', zh: '这项活动促进健康饮食。' },
    scaffold: { en: 'This helps promote ____.', zh: '这有助于促进 ____。' },
  },
  {
    w: 'resolve', pos: 'v. 动词', zh: '解决；下定决心',
    example: { en: 'They finally resolved the disagreement.', zh: '他们最终解决了分歧。' },
    scaffold: { en: 'To resolve ____, both sides should ____.', zh: '要解决 ____，双方都应该 ____。' },
  },
];

// 加厚批次：Sublist 5 + 6（分文件维护，便于继续扩量与审计）
import { AWL_SUBLIST5, AWL_SUBLIST6 } from './academicVocab2';

// 合并：练习时按 Sublist1 → 2 → 3 → 4 → 5 → 6 顺序（频率由高到低）
export const ACADEMIC_WORDS = [
  ...AWL_SUBLIST1, ...AWL_SUBLIST2, ...AWL_SUBLIST3, ...AWL_SUBLIST4,
  ...AWL_SUBLIST5, ...AWL_SUBLIST6,
];

export const ACADEMIC_VOCAB_META = {
  source: 'Coxhead, A. (2000). A New Academic Word List. TESOL Quarterly, 34(2), 213–238.',
  sublist: 'Sublist 1–6（频率最高的六组学术词族精选，持续扩充至 570 词族）',
};

export function countAcademicWords() {
  return ACADEMIC_WORDS.length;
}
