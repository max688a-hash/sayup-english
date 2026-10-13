// @ts-nocheck
// 日常交流 · 第五批 · B1 扩充（流利闲聊 / 投诉 / 办事）

export const DAILY_EXCHANGES_BATCH_5 = [
  {
    id: 'dx-b1-noise',
    level: 'b1',
    emoji: '🔊',
    title: 'Noisy Neighbor',
    titleZh: '邻居太吵',
    intro: 'You talk to your neighbor about loud music at night.',
    introZh: '邻居晚上音乐太吵，你去沟通。',
    turns: [
      {
        bot: 'Oh hi! Is everything okay?',
        botZh: '哦嗨！没事吧？',
        altBots: [
          { en: 'Hey, you wanted to talk?', zh: '嘿，你想聊聊？（换说法）' },
          { en: 'Sorry, was the music too loud?', zh: '抱歉，音乐太大声了吗？' },
        ],
        keywords: ['music', 'loud', 'night', 'sleep', 'sorry', 'quiet'],
        hints: [
          { en: 'The music is a bit loud at night.', zh: '晚上音乐有点吵。' },
          { en: 'Could you turn it down after ten?', zh: '十点以后能小声点吗？' },
        ],
      },
      {
        bot: 'I did not realize. I will keep it down.',
        botZh: '我没意识到，我会小声的。',
        altBots: [
          { en: 'My bad. I will use headphones.', zh: '我的错，我会戴耳机。（换说法）' },
        ],
        keywords: ['thanks', 'thank', 'appreciate', 'understand', 'okay'],
        hints: [{ en: 'Thanks, I appreciate it.', zh: '谢谢，麻烦了。' }],
      },
    ],
  },
  {
    id: 'dx-b1-doctor',
    level: 'b1',
    emoji: '🩺',
    title: 'At the Clinic',
    titleZh: '诊所看医生',
    intro: 'You describe how you feel to a doctor.',
    introZh: '向医生描述症状。',
    turns: [
      {
        bot: 'What seems to be the problem today?',
        botZh: '今天哪里不舒服？',
        altBots: [
          { en: 'How are you feeling?', zh: '你感觉怎么样？（换说法）' },
          { en: 'Tell me your symptoms.', zh: '说说你的症状。' },
        ],
        keywords: ['headache', 'fever', 'cough', 'sore', 'throat', 'days', 'feel'],
        hints: [
          { en: 'I have had a headache for two days.', zh: '我头疼两天了。' },
          { en: 'I feel dizzy and tired.', zh: '我头晕、很累。' },
        ],
      },
      {
        bot: 'Any fever or cough?',
        botZh: '发烧或咳嗽吗？',
        keywords: ['little', 'fever', 'no', 'cough', 'yes', 'slight'],
        hints: [{ en: 'A slight fever, no cough.', zh: '有点低烧，不咳嗽。' }],
      },
      {
        bot: 'Take this medicine twice a day.',
        botZh: '这药一天吃两次。',
        keywords: ['thanks', 'how', 'long', 'food', 'before', 'understand'],
        hints: [{ en: 'Thanks. Should I take it with food?', zh: '谢谢。要饭后吃吗？' }],
      },
    ],
  },
  {
    id: 'dx-b1-bank',
    level: 'b1',
    emoji: '🏦',
    title: 'Bank Card Issue',
    titleZh: '银行卡出问题',
    intro: 'Your card was declined. You ask at the bank counter.',
    introZh: '刷卡失败，去银行柜台咨询。',
    turns: [
      {
        bot: 'How can I help you today?',
        botZh: '今天有什么可以帮您？',
        altBots: [
          { en: 'What brings you in?', zh: '什么事找我们？（换说法）' },
        ],
        keywords: ['card', 'declined', 'work', 'blocked', 'account', 'problem'],
        hints: [
          { en: 'My card was declined this morning.', zh: '今早我的卡刷不了。' },
          { en: 'I think my card is blocked.', zh: '我觉得卡被锁了。' },
        ],
      },
      {
        bot: 'Let me check your account. It looks fine now.',
        botZh: '我查一下……账户现在正常了。',
        keywords: ['thanks', 'why', 'happen', 'again', 'okay', 'relief'],
        hints: [{ en: 'Thanks. Do you know why it happened?', zh: '谢谢。知道是什么原因吗？' }],
      },
    ],
  },
  {
    id: 'dx-b1-rent',
    level: 'b1',
    emoji: '🏠',
    title: 'Apartment Viewing',
    titleZh: '租房看房',
    intro: 'You visit an apartment and ask the landlord questions.',
    introZh: '看房时向房东提问。',
    turns: [
      {
        bot: 'Feel free to look around.',
        botZh: '随便看看。',
        keywords: ['rent', 'month', 'utilities', 'included', 'how', 'much'],
        hints: [
          { en: 'How much is the rent per month?', zh: '月租多少？' },
          { en: 'Are utilities included?', zh: '水电包在房租里吗？' },
        ],
      },
      {
        bot: 'Fifteen hundred, utilities not included.',
        botZh: '一千五，不含水电。',
        altBots: [
          { en: 'It is 1500 a month plus bills.', zh: '每月1500加账单。（换说法）' },
        ],
        keywords: ['deposit', 'contract', 'when', 'move', 'okay', 'think'],
        hints: [{ en: 'Is there a deposit? When can I move in?', zh: '要押金吗？什么时候能入住？' }],
      },
    ],
  },
  {
    id: 'dx-b1-deadline',
    level: 'b1',
    emoji: '💼',
    title: 'Work Deadline',
    titleZh: '同事聊进度',
    intro: 'A colleague asks about your project deadline.',
    introZh: '同事问你项目进度。',
    turns: [
      {
        bot: 'Are we still on track for Friday?',
        botZh: '周五还能按时交吗？',
        altBots: [
          { en: 'How is the report going?', zh: '报告进展如何？（换说法）' },
          { en: 'Will you make the deadline?', zh: '赶得上截止日期吗？' },
        ],
        keywords: ['yes', 'almost', 'need', 'day', 'extension', 'finish', 'behind'],
        hints: [
          { en: 'Almost done. I need one more day.', zh: '快好了，还要一天。' },
          { en: 'A bit behind. Can we push to Monday?', zh: '有点落后，能延到周一吗？' },
        ],
      },
      {
        bot: 'Okay, let me know if you need help.',
        botZh: '好的，需要帮忙说一声。',
        keywords: ['thanks', 'will', 'appreciate', 'team', 'sure'],
        hints: [{ en: 'Thanks, I will let you know.', zh: '谢谢，有需要我告诉你。' }],
      },
    ],
  },
  {
    id: 'dx-b1-cancel',
    level: 'b1',
    emoji: '📅',
    title: 'Cancel Appointment',
    titleZh: '取消预约',
    intro: 'You call to cancel a dentist appointment.',
    introZh: '打电话取消牙医预约。',
    turns: [
      {
        bot: 'Dental clinic, how may I help you?',
        botZh: '牙科诊所，有什么可以帮您？',
        keywords: ['cancel', 'appointment', 'tomorrow', 'reschedule', 'sorry'],
        hints: [
          { en: 'I need to cancel my appointment tomorrow.', zh: '我想取消明天的预约。' },
          { en: 'Sorry, can I reschedule for next week?', zh: '抱歉，能改到下周吗？' },
        ],
      },
      {
        bot: 'Sure. What day works for you?',
        botZh: '好的。您哪天方便？',
        keywords: ['wednesday', 'thursday', 'morning', 'afternoon', 'next', 'week'],
        hints: [{ en: 'Next Wednesday morning, please.', zh: '下周三上午吧。' }],
      },
      {
        bot: 'Done. We will see you then.',
        botZh: '好了，那天见。',
        keywords: ['thanks', 'thank', 'see', 'you'],
        hints: [{ en: 'Thank you. See you then.', zh: '谢谢，那天见。' }],
      },
    ],
  },
  {
    id: 'dx-b1-package',
    level: 'b1',
    emoji: '📦',
    title: 'Lost Package',
    titleZh: '快递丢了',
    intro: 'Your package shows delivered but you did not receive it.',
    introZh: '显示已签收但没收到包裹。',
    turns: [
      {
        bot: 'Customer service, what is the tracking number?',
        botZh: '客服，运单号是多少？',
        keywords: ['number', 'delivered', 'not', 'received', 'door', 'here'],
        hints: [
          { en: 'It says delivered but I did not get it.', zh: '显示送达了但我没收到。' },
        ],
      },
      {
        bot: 'We will investigate and call you back within twenty-four hours.',
        botZh: '我们会调查，24小时内回电。',
        altBots: [
          { en: 'Let us look into it and get back to you tomorrow.', zh: '我们查一下明天回复你。（换说法）' },
        ],
        keywords: ['thanks', 'okay', 'wait', 'appreciate', 'phone'],
        hints: [{ en: 'Okay, thanks. I will wait for your call.', zh: '好的谢谢，我等你们电话。' }],
      },
    ],
  },
  {
    id: 'dx-b1-fitness-class',
    level: 'b1',
    emoji: '🧘',
    title: 'Group Fitness Class',
    titleZh: '团课咨询',
    intro: 'You ask about joining a yoga class at the gym.',
    introZh: '在健身房咨询瑜伽团课。',
    turns: [
      {
        bot: 'First time here? Our beginner class is at six.',
        botZh: '第一次来？零基础课六点。',
        keywords: ['beginner', 'yes', 'first', 'time', 'join', 'need', 'mat'],
        hints: [
          { en: 'Yes, first time. Do I need my own mat?', zh: '是的第一次，要自己带垫子吗？' },
        ],
      },
      {
        bot: 'We provide mats. Just arrive ten minutes early.',
        botZh: '我们提供垫子，提前十分钟到就行。',
        keywords: ['thanks', 'register', 'pay', 'drop', 'in', 'book'],
        hints: [{ en: 'Great. Do I need to book online?', zh: '好的，要在网上预约吗？' }],
      },
    ],
  },
  {
    id: 'dx-b1-experience',
    level: 'b1',
    emoji: '👔',
    title: 'Talking About Experience',
    titleZh: '聊工作经历',
    intro: 'Someone asks about your work experience at a networking event.',
    introZh: '社交场合有人问你工作经验。',
    turns: [
      {
        bot: 'So what do you do for work?',
        botZh: '你是做什么工作的？',
        altBots: [
          { en: 'What is your background?', zh: '你的背景是什么？（换说法）' },
          { en: 'Which industry are you in?', zh: '你在哪个行业？' },
        ],
        keywords: ['marketing', 'engineer', 'teacher', 'years', 'company', 'work'],
        hints: [
          { en: 'I work in marketing, about five years.', zh: '我做市场营销，大概五年了。' },
        ],
      },
      {
        bot: 'Interesting! What do you like most about it?',
        botZh: '有意思！你最喜欢哪一点？',
        keywords: ['team', 'creative', 'challenge', 'learn', 'people', 'travel'],
        hints: [
          { en: 'I like working with creative people.', zh: '我喜欢和创意型同事合作。' },
          { en: 'I enjoy the challenge and learning new things.', zh: '我喜欢挑战和学习新东西。' },
        ],
      },
      {
        bot: 'Sounds like a great fit for you.',
        botZh: '听起来很适合你。',
        keywords: ['thanks', 'yes', 'think', 'so', 'nice', 'meet'],
        hints: [{ en: 'Thanks. Nice meeting you!', zh: '谢谢，很高兴认识你！' }],
      },
    ],
  },
];
