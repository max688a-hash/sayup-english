// @ts-nocheck
// 日常交流 · 第六批 · B2 深入表达（观点、职场、协商）

export const DAILY_EXCHANGES_BATCH_6 = [
  {
    id: 'dx-b2-salary',
    level: 'b2',
    emoji: '💰',
    title: 'Discussing a Raise',
    titleZh: '谈加薪',
    intro: 'You ask your manager about a salary review.',
    introZh: '向经理提出薪资回顾。',
    turns: [
      {
        bot: 'What would you like to discuss?',
        botZh: '你想聊什么？',
        altBots: [
          { en: 'You wanted to talk about compensation?', zh: '你想谈薪酬？（换说法）' },
        ],
        keywords: ['salary', 'raise', 'review', 'performance', 'year', 'contribution'],
        hints: [
          { en: 'I would like to discuss a salary review.', zh: '我想谈一下薪资回顾。' },
          { en: 'I believe my contributions justify a raise.', zh: '我认为我的贡献值得加薪。' },
        ],
      },
      {
        bot: 'We can offer a five percent increase.',
        botZh: '我们可以涨 5%。',
        altBots: [
          { en: 'The budget allows a modest bump this cycle.', zh: '本周期预算允许小幅上调。（换说法）' },
        ],
        keywords: ['accept', 'thank', 'negotiate', 'higher', 'think', 'fair', 'appreciate'],
        hints: [
          { en: 'Thank you. Could we discuss a slightly higher figure?', zh: '谢谢，能再商量高一点吗？' },
          { en: 'I appreciate that. I will think about it.', zh: '感谢，我会考虑一下。' },
        ],
      },
    ],
  },
  {
    id: 'dx-b2-project-delay',
    level: 'b2',
    emoji: '📊',
    title: 'Explaining a Delay',
    titleZh: '解释项目延期',
    intro: 'The client asks why the project is late.',
    introZh: '客户问项目为什么延期。',
    turns: [
      {
        bot: 'We expected delivery last Friday. What happened?',
        botZh: '我们预期上周五交付。发生了什么？',
        altBots: [
          { en: 'The timeline slipped. Can you walk me through it?', zh: '时间线滑了，能说说吗？' },
        ],
        keywords: ['delay', 'supplier', 'issue', 'team', 'fix', 'sorry', 'explain'],
        hints: [
          { en: 'We hit a supplier issue that delayed testing.', zh: '供应商出问题耽误了测试。' },
          { en: 'I apologize. Here is what we are doing to fix it.', zh: '抱歉，这是我们正在采取的补救措施。' },
        ],
      },
      {
        bot: 'When can we realistically expect it?',
        botZh: '按实际情况，我们什么时候能收到货？',
        keywords: ['wednesday', 'week', 'days', 'commit', 'update', 'friday'],
        hints: [
          { en: 'We can commit to next Wednesday with daily updates.', zh: '我们承诺下周三交付，并每日同步。' },
        ],
      },
    ],
  },
  {
    id: 'dx-b2-opinion-news',
    level: 'b2',
    emoji: '📰',
    title: 'Discussing the News',
    titleZh: '聊新闻观点',
    intro: 'A colleague shares an opinion about a news story.',
    introZh: '同事对新闻发表看法，你接话。',
    turns: [
      {
        bot: 'I think remote work hurts team culture.',
        botZh: '我觉得远程办公伤害团队文化。',
        altBots: [
          { en: 'Working from home makes people feel disconnected.', zh: '在家办公让人疏离。（同义）' },
        ],
        keywords: ['agree', 'disagree', 'think', 'depends', 'balance', 'office', 'flexible'],
        hints: [
          { en: 'I see your point, but I think it depends on the team.', zh: '我理解，但我觉得得看团队。' },
          { en: 'I partly agree. Hybrid might be the balance.', zh: '部分同意，混合办公可能是平衡。' },
        ],
      },
      {
        bot: 'Fair enough. What would you propose?',
        botZh: '有道理。你有什么建议？',
        keywords: ['hybrid', 'days', 'office', 'meeting', 'monthly', 'suggest'],
        hints: [
          { en: 'I would suggest two office days and monthly in-person meetings.', zh: '建议每周两天到岗加月度线下会。' },
        ],
      },
    ],
  },
  {
    id: 'dx-b2-landlord-contract',
    level: 'b2',
    emoji: '📝',
    title: 'Negotiating Lease Terms',
    titleZh: '协商租约条款',
    intro: 'You want to change a clause in your rental contract.',
    introZh: '想修改租约里的一条款。',
    turns: [
      {
        bot: 'The standard lease is twelve months, no changes.',
        botZh: '标准租约十二个月，不能改。',
        altBots: [
          { en: 'We usually do not modify the template.', zh: '我们通常不改模板。（换说法）' },
        ],
        keywords: ['clause', 'repair', 'responsibility', 'negotiate', 'understand', 'concern'],
        hints: [
          { en: 'I understand. My concern is the repair responsibility clause.', zh: '明白，我担心的是维修责任条款。' },
        ],
      },
      {
        bot: 'We might add a note about major repairs.',
        botZh: '重大维修我们可以加备注。',
        keywords: ['thank', 'acceptable', 'sign', 'works', 'appreciate'],
        hints: [
          { en: 'That works for me. Thank you for being flexible.', zh: '这样可以，谢谢灵活处理。' },
        ],
      },
    ],
  },
  {
    id: 'dx-b2-doctor-second',
    level: 'b2',
    emoji: '🩺',
    title: 'Second Medical Opinion',
    titleZh: '寻求第二诊疗意见',
    intro: 'You ask your doctor about another specialist.',
    introZh: '向医生咨询是否要再看专科。',
    turns: [
      {
        bot: 'Your test results are mostly normal.',
        botZh: '检查结果大体正常。',
        altBots: [
          { en: 'Nothing alarming showed up on the labs.', zh: '化验没发现异常。（换说法）' },
        ],
        keywords: ['still', 'worried', 'specialist', 'second', 'opinion', 'pain'],
        hints: [
          { en: 'I am still worried. Should I see a specialist?', zh: '我还是担心，要看专科吗？' },
        ],
      },
      {
        bot: 'A second opinion is reasonable. I can refer you.',
        botZh: '第二意见合理，我可以转诊。',
        keywords: ['thank', 'referral', 'when', 'appointment', 'appreciate'],
        hints: [
          { en: 'Thank you. How soon can I get an appointment?', zh: '谢谢，多久能约上？' },
        ],
      },
    ],
  },
  {
    id: 'dx-b2-flight-change',
    level: 'b2',
    emoji: '✈️',
    title: 'Flight Rebooking',
    titleZh: '航班改签协商',
    intro: 'Your flight was cancelled. You speak to the airline desk.',
    introZh: '航班取消，在柜台协商改签。',
    turns: [
      {
        bot: 'The next available flight is tomorrow morning.',
        botZh: '下一班是明天早上。',
        altBots: [
          { en: 'Earliest we can get you out is 6 AM tomorrow.', zh: '最早明早六点能走。（换说法）' },
        ],
        keywords: ['tonight', 'hotel', 'compensation', 'earlier', 'accept', 'options'],
        hints: [
          { en: 'Is there anything earlier tonight? I have a meeting tomorrow.', zh: '今晚还有更早的吗？我明天有会。' },
          { en: 'I will take tomorrow morning. Do you provide a hotel?', zh: '我坐明早的，提供酒店吗？' },
        ],
      },
      {
        bot: 'We can offer a voucher and a hotel for tonight.',
        botZh: '我们可以给代金券和今晚酒店。',
        keywords: ['thank', 'accept', 'details', 'email', 'confirmation'],
        hints: [{ en: 'Thank you. Please send confirmation to my email.', zh: '谢谢，请发确认到我邮箱。' }],
      },
    ],
  },
  {
    id: 'dx-b2-team-conflict',
    level: 'b2',
    emoji: '🤝',
    title: 'Mediating Team Conflict',
    titleZh: '调解同事分歧',
    intro: 'Two teammates disagree. You help find middle ground.',
    introZh: '两位同事有分歧，你帮忙找折中。',
    turns: [
      {
        bot: 'We cannot agree on the design direction.',
        botZh: '设计方案我们谈不拢。',
        keywords: ['understand', 'both', 'compromise', 'test', 'users', 'data'],
        hints: [
          { en: 'I understand both sides. Can we test two versions with users?', zh: '我理解双方，能用用户测两版吗？' },
        ],
      },
      {
        bot: 'That sounds fair. Who will run the test?',
        botZh: '听起来合理，谁来做测试？',
        keywords: ['volunteer', 'team', 'week', 'share', 'results', 'together'],
        hints: [
          { en: 'I can coordinate. We share results by Friday.', zh: '我来协调，周五前共享结果。' },
        ],
      },
    ],
  },
  {
    id: 'dx-b2-university-app',
    level: 'b2',
    emoji: '🎓',
    title: 'University Application Chat',
    titleZh: '留学申请咨询',
    intro: 'You ask an advisor about application deadlines.',
    introZh: '向顾问咨询申请截止日期。',
    turns: [
      {
        bot: 'Deadlines vary by program. Which field interests you?',
        botZh: '截止日期因项目而异，你感兴趣什么方向？',
        altBots: [
          { en: 'It depends on the department. What are you applying for?', zh: '看院系，你申请什么？' },
        ],
        keywords: ['business', 'engineering', 'deadline', 'january', 'documents', 'recommendation'],
        hints: [
          { en: 'Business analytics. When is the main deadline?', zh: '商业分析，主截止日期什么时候？' },
        ],
      },
      {
        bot: 'January fifteenth, with recommendation letters due a week earlier.',
        botZh: '一月十五日，推荐信提前一周。',
        keywords: ['thank', 'prepare', 'letters', 'checklist', 'portal'],
        hints: [
          { en: 'Thank you. I will prepare the letters and check the portal.', zh: '谢谢，我会准备推荐信并查系统。' },
        ],
      },
    ],
  },
];
