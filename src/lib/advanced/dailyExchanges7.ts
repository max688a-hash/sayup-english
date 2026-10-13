// @ts-nocheck
// 日常交流 · 第七批 · C1 高阶运用（推回、澄清、拒绝加戏、协商）
// 能开口办事：不是闲聊加长句，是把难办的事说清楚。

export const DAILY_EXCHANGES_BATCH_7 = [
  {
    id: 'dx-c1-unrealistic-deadline',
    level: 'c1',
    emoji: '📅',
    title: 'An Unrealistic Deadline',
    titleZh: '推回不切实际的截止日',
    intro: 'Your manager wants the report on Friday. The data will not be ready.',
    introZh: '经理要周五交报告，数据来不及。你必须把风险说清楚。',
    turns: [
      {
        bot: 'Can you have the full report on my desk by Friday?',
        botZh: '周五能把完整报告放到我桌上吗？',
        altBots: [
          { en: 'I need this wrapped up before the weekend. Is that realistic?', zh: '周末前要收尾。这个现实吗？（换说法）' },
        ],
        keywords: ['friday', 'concern', 'data', 'risk', 'later', 'monday', 'not', 'ready'],
        hints: [
          { en: 'I am concerned Friday is not realistic given the data lag.', zh: '考虑到数据滞后，周五恐怕不现实。' },
          { en: 'I can do a draft on Friday, but the full report needs Monday.', zh: '周五能出草稿，完整报告得周一。' },
        ],
      },
      {
        bot: 'What is actually blocking you?',
        botZh: '到底卡在哪？',
        altBots: [
          { en: 'Walk me through the constraint.', zh: '把限制条件讲清楚。（换说法）' },
        ],
        keywords: ['vendor', 'data', 'quality', 'check', 'cannot', 'sign', 'off', 'until'],
        hints: [
          { en: 'The vendor file lands Thursday, and I cannot sign off until I have checked it.', zh: '供应商文件周四才到，核对完我才能签字。' },
        ],
      },
      {
        bot: 'So what can I tell the client today?',
        botZh: '那我今天怎么跟客户说？',
        keywords: ['draft', 'monday', 'full', 'flag', 'risk', 'commit'],
        hints: [
          { en: 'Tell them we will share a draft Friday and commit to the full version Monday.', zh: '告诉他们周五出草稿，完整版周一交付。' },
        ],
      },
    ],
  },
  {
    id: 'dx-c1-disagree-meeting',
    level: 'c1',
    emoji: '🗣️',
    title: 'Disagreeing in a Meeting',
    titleZh: '会上有理有据地反对',
    intro: 'A colleague wants to launch next week. You see a legal risk.',
    introZh: '同事主张下周上线，你看到合规风险，必须当场说。',
    turns: [
      {
        bot: 'I think we should just launch next week and fix issues later.',
        botZh: '我觉得下周先上线，问题以后再修。',
        altBots: [
          { en: 'Ship it. We can iterate after it is live.', zh: '先发出去，上线后再迭代。（换说法）' },
        ],
        keywords: ['see', 'risk', 'legal', 'compliance', 'would', 'hold', 'until'],
        hints: [
          { en: 'I see the urgency, but I would hold the launch until legal has signed off.', zh: '我理解着急，但在法务签字前我会暂缓上线。' },
        ],
      },
      {
        bot: 'We have already delayed twice. Are you overthinking this?',
        botZh: '已经拖了两次了。你是不是想太多？',
        keywords: ['not', 'overthinking', 'exposure', 'clause', 'cannot', 'undo'],
        hints: [
          { en: 'I am not overthinking it. The clause on user data cannot be undone after launch.', zh: '不是想太多。用户数据条款上线后收不回来。' },
        ],
      },
      {
        bot: 'Fine. What do you propose instead?',
        botZh: '行。那你建议怎么办？',
        keywords: ['soft', 'launch', 'legal', 'week', 'internal', 'preview'],
        hints: [
          { en: 'A closed preview this week, and a public launch once legal clears it.', zh: '本周内部预览，法务过了再公开上线。' },
        ],
      },
    ],
  },
  {
    id: 'dx-c1-extension-request',
    level: 'c1',
    emoji: '🎓',
    title: 'Requesting an Extension',
    titleZh: '向导师申请延期',
    intro: 'Your essay is due tomorrow. You need three more days for a reason that holds up.',
    introZh: '论文明天截止。你要用站得住的理由申请再宽限三天。',
    turns: [
      {
        bot: 'The deadline is tomorrow. Is everything on track?',
        botZh: '明天截止。都顺利吗？',
        altBots: [
          { en: 'I assume you are submitting on time?', zh: '我默认你会按时交？（换说法）' },
        ],
        keywords: ['extension', 'three', 'days', 'archive', 'access', 'need'],
        hints: [
          { en: 'I need to request a three-day extension. The archive I depend on was down all week.', zh: '我想申请延期三天。我依赖的档案库一周都打不开。' },
        ],
      },
      {
        bot: 'Why should I treat this as exceptional rather than poor planning?',
        botZh: '为什么这是特殊情况，而不是你计划不周？',
        keywords: ['documented', 'outage', 'started', 'early', 'not', 'planning'],
        hints: [
          { en: 'I started two weeks early. The outage is documented, and I can show the timestamps.', zh: '我两周前就开始了。故障有记录，我可以出示时间戳。' },
        ],
      },
      {
        bot: 'If I grant this, I will not grant another one this term.',
        botZh: '如果这次批了，这学期不会再批第二次。',
        keywords: ['understand', 'enough', 'thursday', 'submit', 'thank'],
        hints: [
          { en: 'I understand. Thursday will be enough, and I will submit without further delay.', zh: '明白。周四足够，不会再拖。' },
        ],
      },
    ],
  },
  {
    id: 'dx-c1-vague-brief',
    level: 'c1',
    emoji: '📎',
    title: 'A Vague Client Brief',
    titleZh: '把含糊需求问清楚',
    intro: 'The client emailed: "Make it more premium." You cannot start until that means something.',
    introZh: '客户只说「再高级一点」。你必须问到能开工的程度。',
    turns: [
      {
        bot: 'Can you just make the whole thing feel more premium?',
        botZh: '能不能让整体再高级一点？',
        altBots: [
          { en: 'It still feels a bit cheap. Elevate it.', zh: '还是有点廉价。提一提档次。（换说法）' },
        ],
        keywords: ['premium', 'mean', 'type', 'color', 'copy', 'which'],
        hints: [
          { en: 'Happy to. When you say premium, do you mean the type, the colour, or the copy?', zh: '可以。你说的高级，是指字体、颜色，还是文案？' },
        ],
      },
      {
        bot: 'I do not know. Just make it look expensive.',
        botZh: '我也不清楚。看起来贵就行。',
        keywords: ['example', 'brand', 'reference', 'compare', 'show'],
        hints: [
          { en: 'Could you send one brand we should be compared with? That will lock the direction.', zh: '能否给一个要对标的品牌？方向就能定下来。' },
        ],
      },
      {
        bot: 'Think Aesop, not a supermarket flyer.',
        botZh: '往 Aesop 靠，别像超市传单。',
        keywords: ['clear', 'restraint', 'paper', 'type', 'draft', 'tomorrow'],
        hints: [
          { en: 'That is clear. I will send a restrained type-and-paper draft tomorrow.', zh: '清楚了。我明天出一版克制的字体和纸感草稿。' },
        ],
      },
    ],
  },
  {
    id: 'dx-c1-scope-creep',
    level: 'c1',
    emoji: '🚧',
    title: 'Declining Extra Scope',
    titleZh: '拒绝加戏仍把事办成',
    intro: 'The client wants three extra pages this week, unpaid. You must decline without burning the relationship.',
    introZh: '客户要本周白加三页。你要拒绝，还要把合作留下。',
    turns: [
      {
        bot: 'While you are in the file, can you add three more pages this week?',
        botZh: '反正你在改文件，这周再加三页可以吗？',
        altBots: [
          { en: 'It is only a little extra. You are already in there.', zh: '就多一点点。你反正在里面改。（换说法）' },
        ],
        keywords: ['outside', 'scope', 'cannot', 'week', 'quote', 'phase'],
        hints: [
          { en: 'That sits outside this phase. I cannot absorb it this week without slipping the launch.', zh: '这超出本阶段范围。这周硬加会拖累上线。' },
        ],
      },
      {
        bot: 'We have always been flexible with each other.',
        botZh: '我们一向互相通融的。',
        keywords: ['value', 'relationship', 'hours', 'quote', 'next', 'sprint'],
        hints: [
          { en: 'I value the relationship. I can quote those pages as a next-sprint add-on.', zh: '我很看重合作。这三页可以按下一轮加项报价。' },
        ],
      },
      {
        bot: 'If we pay, how soon can you start?',
        botZh: '如果付钱，你多快能开始？',
        keywords: ['monday', 'after', 'launch', 'two', 'days', 'once'],
        hints: [
          { en: 'Once this launch is signed off, I can start the extra pages on Monday.', zh: '这次上线签完，加页周一开始。' },
        ],
      },
    ],
  },
  {
    id: 'dx-c1-performance-review',
    level: 'c1',
    emoji: '📋',
    title: 'A Performance Review',
    titleZh: '绩效面谈里谈证据',
    intro: 'Your manager says you lack "visibility." You need examples, not a fight.',
    introZh: '经理说你「存在感不够」。你要用事实谈，而不是吵。',
    turns: [
      {
        bot: 'The main theme this year is that you need more visibility.',
        botZh: '今年的主线是：你需要更高的存在感。',
        altBots: [
          { en: 'People do not always see the impact of your work.', zh: '别人不一定看得到你工作的影响。（换说法）' },
        ],
        keywords: ['visibility', 'mean', 'example', 'stakeholder', 'which'],
        hints: [
          { en: 'Can you give me a specific example of where visibility was missing?', zh: '能否给一个存在感不够的具体例子？' },
        ],
      },
      {
        bot: 'The board did not know you owned the migration.',
        botZh: '董事会不知道迁移是你负责的。',
        keywords: ['fair', 'credit', 'present', 'next', 'update', 'own'],
        hints: [
          { en: 'That is fair. I will present the next update myself so the ownership is obvious.', zh: '说得对。下次进展我亲自讲，权责就清楚。' },
        ],
      },
      {
        bot: 'What support do you need from me?',
        botZh: '你需要我怎么支持？',
        keywords: ['invite', 'forum', 'slot', 'agenda', 'introduce'],
        hints: [
          { en: 'A standing slot on the leadership agenda would help more than generic advice.', zh: '在管理层议程上给一个固定时段，比空泛建议有用。' },
        ],
      },
    ],
  },
  {
    id: 'dx-c1-sensitive-complaint',
    level: 'c1',
    emoji: '⚖️',
    title: 'A Sensitive Complaint',
    titleZh: '处理敏感投诉',
    intro: 'A customer says a staff member was dismissive. You represent the company.',
    introZh: '顾客说店员态度轻慢。你代表公司接话。',
    turns: [
      {
        bot: 'Your colleague made me feel as if my complaint did not matter.',
        botZh: '你们同事让我觉得我的投诉根本不重要。',
        altBots: [
          { en: 'I was spoken to as if I were wasting their time.', zh: '说话的口气像我在浪费他们时间。（换说法）' },
        ],
        keywords: ['sorry', 'hear', 'take', 'seriously', 'look', 'into'],
        hints: [
          { en: 'I am sorry you were made to feel that. We take this seriously and I will look into it.', zh: '很抱歉让你有这种感受。我们当回事，我会查。' },
        ],
      },
      {
        bot: 'I want to know what you will actually do, not a script.',
        botZh: '我想知道你具体会做什么，不要套话。',
        keywords: ['review', 'recording', 'follow', 'tomorrow', 'call', 'manager'],
        hints: [
          { en: 'I will review the recording today and call you tomorrow with what we found.', zh: '我今天核对录音，明天打电话告诉你结果。' },
        ],
      },
      {
        bot: 'And if it happened the way I said?',
        botZh: '如果真像我说的那样呢？',
        keywords: ['apology', 'training', 'credit', 'put', 'right'],
        hints: [
          { en: 'Then we will put it right: an apology from the manager, and a credit on your account.', zh: '那我们会纠正：经理道歉，并给你账户补偿。' },
        ],
      },
    ],
  },
  {
    id: 'dx-c1-hybrid-work',
    level: 'c1',
    emoji: '🏠',
    title: 'Negotiating Hybrid Work',
    titleZh: '协商混合办公',
    intro: 'Policy just shifted to four days in office. You have a reason to keep two days remote.',
    introZh: '新规要四天到岗。你有理由保住两天远程。',
    turns: [
      {
        bot: 'From next month everyone is in four days a week. Any issue?',
        botZh: '下月起每人一周到岗四天。有问题吗？',
        altBots: [
          { en: 'The new baseline is four days on site.', zh: '新的底线是四天到公司。（换说法）' },
        ],
        keywords: ['propose', 'two', 'remote', 'care', 'output', 'unchanged'],
        hints: [
          { en: 'I would like to propose two remote days. My output has been unchanged on those days.', zh: '我想申请两天远程。那两天我的产出没有下降。' },
        ],
      },
      {
        bot: 'If I make an exception, others will ask for the same.',
        botZh: '如果给你破例，别人也会来要。',
        keywords: ['care', 'responsibility', 'role', 'not', 'preference', 'cover'],
        hints: [
          { en: 'This is a care responsibility, not a preference, and I can cover core meetings in person.', zh: '这是照护责任，不是个人偏好，核心会议我可以到场。' },
        ],
      },
      {
        bot: 'I can do a three-month trial. We review the numbers.',
        botZh: '可以试行三个月，用数字复盘。',
        keywords: ['trial', 'review', 'metrics', 'accept', 'thank', 'fair'],
        hints: [
          { en: 'A three-month trial with a review on delivery metrics is fair. Thank you.', zh: '三个月试行、按交付指标复盘，公平。谢谢。' },
        ],
      },
    ],
  },
];
