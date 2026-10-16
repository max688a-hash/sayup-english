// @ts-nocheck
// 生活场景扩充 · P5 基础层增强
// ----------------------------------------------------------------------------
// 方法学溯源（红线七/九）：
//   Willis, J. (1996). A Framework for Task-Based Learning. Longman.
//   —— TBLT（任务型语言教学）：每个场景有一个明确的非语言任务目标
//      （如"成功办理登机"），任务完成即学习完成。
//
//   Long, M. H. (2015). Second Language Acquisition and Task-Based Language
//   Teaching. Wiley-Blackwell.
//   —— 任务型互动聚焦"意义协商"(negotiation of meaning)，比形式练习更有效。
//
// 设计原则：
//   1. 每个场景有 task（任务目标）+ 必要词汇 + 关键句型 + 对话脚本
//   2. 场景分 8 大类，覆盖日常生活高频情境
//   3. 与已有 rolePlayDialogues 关联（refDialogueId），不重复数据（红线一）
//   4. 新场景脚本独立，CEFR 分级
//   5. 场景来自真实生活需求调研，非编造学术场景（红线七）

// ============================================================
// 场景分类
// ============================================================
export const SCENE_CATEGORIES = [
  { id: 'food',      label: '餐饮',     icon: '🍽️', color: '#f59e0b' },
  { id: 'travel',    label: '出行',     icon: '✈️', color: '#3b82f6' },
  { id: 'shopping',  label: '购物',     icon: '🛍️', color: '#ec4899' },
  { id: 'health',    label: '健康',     icon: '🏥', color: '#22c55e' },
  { id: 'work',      label: '职场',     icon: '💼', color: '#8b5cf6' },
  { id: 'social',    label: '社交',     icon: '🤝', color: '#06b6d4' },
  { id: 'home',      label: '居住',     icon: '🏠', color: '#f97316' },
  { id: 'emergency', label: '紧急',     icon: '🚨', color: '#ef4444' },
];

// ============================================================
// 场景列表
// ============================================================
// refDialogueId: 关联已有 rolePlayDialogues.js 中的 id（已有数据不重建）
// dialogue:      新增场景自带对话脚本（无已有关联时使用）
//
// 结构与 rolePlayDialogues 兼容：
//   turns: [{ speaker: 'user'|'bot', text, zh }]

export const LIFE_SCENES = [
  // ==================== 餐饮 ====================
  {
    id: 'scene-cafe',
    category: 'food',
    cefr: 'A1',
    title: '咖啡店点单',
    titleEn: 'Ordering Coffee',
    icon: '☕',
    task: '成功点一杯你想喝的咖啡',
    taskEn: 'Successfully order a coffee you want',
    keyPhrases: ['I\'d like…', 'What size?', 'Small / Medium / Large', 'That\'s all'],
    refDialogueId: 'cafe-order-1',
  },
  {
    id: 'scene-restaurant-book',
    category: 'food',
    cefr: 'A2',
    title: '餐厅预订',
    titleEn: 'Restaurant Reservation',
    icon: '🍽️',
    task: '电话预订今晚的餐厅位置',
    taskEn: 'Book a table for tonight by phone',
    keyPhrases: ['I\'d like to make a reservation', 'What time?', 'How many people?', 'Under my name'],
    refDialogueId: 'restaurant-booking-1',
  },
  {
    id: 'scene-street-food',
    category: 'food',
    cefr: 'A1',
    title: '路边小吃',
    titleEn: 'Street Food Stall',
    icon: '🌮',
    task: '在路边摊买一份食物',
    taskEn: 'Buy food from a street vendor',
    keyPhrases: ['How much is this?', 'One, please', 'Is it spicy?', 'Take-away'],
    dialogue: {
      userRole: '顾客',
      botRole: '摊主',
      turns: [
        { speaker: 'user', text: 'Hi! How much is one taco?', zh: '你好！一个 taco 多少钱？' },
        { speaker: 'bot', text: 'Two dollars each, or three for five.', zh: '两美元一个，三个五美元。' },
        { speaker: 'user', text: 'I\'ll have three, please. Are they spicy?', zh: '我要三个。辣吗？' },
        { speaker: 'bot', text: 'A little bit. Want extra sauce?', zh: '有一点点。要加酱吗？' },
        { speaker: 'user', text: 'Yes, please!', zh: '好的！' },
        { speaker: 'bot', text: 'Here you go. Enjoy!', zh: '给你，好吃！' },
      ],
    },
  },

  // ==================== 出行 ====================
  {
    id: 'scene-taxi',
    category: 'travel',
    cefr: 'A1',
    title: '打出租车',
    titleEn: 'Taking a Taxi',
    icon: '🚕',
    task: '告诉司机目的地并到达',
    taskEn: 'Tell the driver your destination and arrive',
    keyPhrases: ['Can you take me to…?', 'How long?', 'How much?', 'Keep the change'],
    refDialogueId: 'taxi-ride-1',
  },
  {
    id: 'scene-airport',
    category: 'travel',
    cefr: 'A2',
    title: '机场值机',
    titleEn: 'Airport Check-in',
    icon: '✈️',
    task: '在值机柜台办理登机手续',
    taskEn: 'Check in at the airport counter',
    keyPhrases: ['I\'d like to check in', 'Window or aisle?', 'Any luggage to check?', 'boarding pass'],
    dialogue: {
      userRole: '旅客',
      botRole: '值机人员',
      turns: [
        { speaker: 'bot', text: 'Good morning. May I see your passport and booking reference?', zh: '早上好，请出示您的护照和预订号。' },
        { speaker: 'user', text: 'Here you go. I\'m on the 10:30 flight to London.', zh: '给您。我乘 10:30 飞伦敦的航班。' },
        { speaker: 'bot', text: 'Do you prefer a window or aisle seat?', zh: '您想要靠窗还是靠过道？' },
        { speaker: 'user', text: 'Window, please.', zh: '靠窗，谢谢。' },
        { speaker: 'bot', text: 'Any checked luggage today?', zh: '今天有托运行李吗？' },
        { speaker: 'user', text: 'Just this one suitcase.', zh: '就这一个箱子。' },
        { speaker: 'bot', text: 'Great. Here\'s your boarding pass. Gate B12, boarding at 10:00.', zh: '好的。这是您的登机牌，B12 登机口，10 点开始登机。' },
        { speaker: 'user', text: 'Thank you!', zh: '谢谢！' },
      ],
    },
  },
  {
    id: 'scene-hotel',
    category: 'travel',
    cefr: 'A2',
    title: '酒店入住',
    titleEn: 'Hotel Check-in',
    icon: '🏨',
    task: '在前台办理入住并了解酒店设施',
    taskEn: 'Check in and learn about hotel facilities',
    keyPhrases: ['I have a reservation', 'May I see your ID?', 'What time is breakfast?', 'Here\'s your key'],
    refDialogueId: 'hotel-checkin-1',
  },
  {
    id: 'scene-directions',
    category: 'travel',
    cefr: 'A1',
    title: '问路',
    titleEn: 'Asking Directions',
    icon: '🗺️',
    task: '找到去地铁站的路',
    taskEn: 'Find your way to the subway station',
    keyPhrases: ['Where is…?', 'Go straight', 'Turn left / right', 'How far?'],
    refDialogueId: 'ask-directions-1',
  },

  // ==================== 购物 ====================
  {
    id: 'scene-grocery',
    category: 'shopping',
    cefr: 'A1',
    title: '超市购物',
    titleEn: 'Grocery Shopping',
    icon: '🛒',
    task: '在超市找到所有需要的东西并结账',
    taskEn: 'Find everything you need and check out',
    keyPhrases: ['Where can I find…?', 'Do you need a bag?', 'Cash or card?', 'receipt'],
    refDialogueId: 'grocery-1',
  },
  {
    id: 'scene-clothes',
    category: 'shopping',
    cefr: 'A2',
    title: '买衣服',
    titleEn: 'Buying Clothes',
    icon: '👕',
    task: '找到合适尺码的衣服并购买',
    taskEn: 'Find your size and buy a piece of clothing',
    keyPhrases: ['Do you have this in…?', 'Can I try it on?', 'It fits / doesn\'t fit', 'I\'ll take it'],
    dialogue: {
      userRole: '顾客',
      botRole: '店员',
      turns: [
        { speaker: 'user', text: 'Hi, do you have this jacket in a size M?', zh: '你好，这件夹克有 M 码吗？' },
        { speaker: 'bot', text: 'Let me check… Yes! Here it is.', zh: '我查查……有的！给你。' },
        { speaker: 'user', text: 'Can I try it on?', zh: '可以试穿吗？' },
        { speaker: 'bot', text: 'Sure, the fitting rooms are on the left.', zh: '当然，试衣间在左边。' },
        { speaker: 'user', text: 'It fits perfectly. How much is it?', zh: '很合身。多少钱？' },
        { speaker: 'bot', text: 'It\'s 299 yuan. We also have a 20% discount today.', zh: '299 元，今天还打 8 折。' },
        { speaker: 'user', text: 'Great, I\'ll take it!', zh: '太好了，我买了！' },
      ],
    },
  },

  // ==================== 健康 ====================
  {
    id: 'scene-doctor',
    category: 'health',
    cefr: 'B1',
    title: '看医生',
    titleEn: 'Doctor Visit',
    icon: '🩺',
    task: '向医生描述症状并获取治疗建议',
    taskEn: 'Describe symptoms and get treatment advice',
    keyPhrases: ['I\'ve had a headache', 'How long?', 'Any other symptoms?', 'I\'ll prescribe…'],
    refDialogueId: 'doctor-visit-1',
  },
  {
    id: 'scene-pharmacy',
    category: 'health',
    cefr: 'A2',
    title: '药店买药',
    titleEn: 'At the Pharmacy',
    icon: '💊',
    task: '描述症状并买到合适的药',
    taskEn: 'Describe symptoms and buy the right medicine',
    keyPhrases: ['I have a cold', 'Do you have…?', 'How often should I take it?', 'prescription'],
    dialogue: {
      userRole: '顾客',
      botRole: '药剂师',
      turns: [
        { speaker: 'user', text: 'Hi, I have a sore throat and a runny nose.', zh: '你好，我喉咙痛还流鼻涕。' },
        { speaker: 'bot', text: 'Do you have a fever?', zh: '发烧吗？' },
        { speaker: 'user', text: 'A little, about 37.5 degrees.', zh: '有点，大概 37.5 度。' },
        { speaker: 'bot', text: 'I recommend these cold tablets. Take two, three times a day.', zh: '我推荐这个感冒药。每次两片，一天三次。' },
        { speaker: 'user', text: 'Do I need a prescription?', zh: '需要处方吗？' },
        { speaker: 'bot', text: 'No, it\'s over the counter. That\'ll be 28 yuan.', zh: '不需要，这是非处方药。一共 28 元。' },
      ],
    },
  },
  {
    id: 'scene-gym',
    category: 'health',
    cefr: 'A2',
    title: '健身房咨询',
    titleEn: 'Gym Membership',
    icon: '🏋️',
    task: '了解健身房会员方案并办卡',
    taskEn: 'Learn about gym plans and sign up',
    keyPhrases: ['How much is a membership?', 'monthly / yearly', 'free trial', 'personal trainer'],
    dialogue: {
      userRole: '顾客',
      botRole: '前台',
      turns: [
        { speaker: 'user', text: 'Hi, I\'m interested in joining the gym.', zh: '你好，我想办健身卡。' },
        { speaker: 'bot', text: 'Sure! We have monthly and yearly plans.', zh: '好的！我们有月卡和年卡。' },
        { speaker: 'user', text: 'How much is the monthly plan?', zh: '月卡多少钱？' },
        { speaker: 'bot', text: '199 yuan per month, or 1,599 for a whole year.', zh: '月卡 199 元，年卡 1599 元。' },
        { speaker: 'user', text: 'Can I try it for a day first?', zh: '可以先体验一天吗？' },
        { speaker: 'bot', text: 'Of course! We offer a free one-day trial. Let me show you around.', zh: '当然！我们提供一天免费体验。我带你参观一下。' },
      ],
    },
  },

  // ==================== 职场 ====================
  {
    id: 'scene-interview',
    category: 'work',
    cefr: 'B1',
    title: '工作面试',
    titleEn: 'Job Interview',
    icon: '💼',
    task: '通过面试展示你的能力和经验',
    taskEn: 'Present your skills and experience in an interview',
    keyPhrases: ['Tell me about yourself', 'I have X years of experience', 'Why this company?', 'Any questions?'],
    refDialogueId: 'job-interview-1',
  },
  {
    id: 'scene-meeting',
    category: 'work',
    cefr: 'B1',
    title: '参加会议',
    titleEn: 'Team Meeting',
    icon: '📋',
    task: '在团队会议中汇报进展并提出建议',
    taskEn: 'Report progress and suggest ideas in a meeting',
    keyPhrases: ['I\'d like to update you on…', 'In my opinion…', 'I suggest…', 'Any objections?'],
    dialogue: {
      userRole: '组员',
      botRole: '组长',
      turns: [
        { speaker: 'bot', text: 'Let\'s start the meeting. Any updates on the project?', zh: '会议开始吧。项目有什么进展？' },
        { speaker: 'user', text: 'Yes, I finished the first draft of the report.', zh: '有的，我完成了报告的初稿。' },
        { speaker: 'bot', text: 'Great. When can we review it?', zh: '很好，什么时候可以评审？' },
        { speaker: 'user', text: 'I can share it by tomorrow morning.', zh: '明天上午可以分享。' },
        { speaker: 'bot', text: 'Perfect. Any issues or blockers?', zh: '好的。有什么问题或阻碍吗？' },
        { speaker: 'user', text: 'I\'m waiting for data from the marketing team.', zh: '我在等市场部的数据。' },
        { speaker: 'bot', text: 'I\'ll follow up with them. Anything else?', zh: '我跟进一下。还有别的吗？' },
        { speaker: 'user', text: 'That\'s all for now. Thanks.', zh: '暂时就这些，谢谢。' },
      ],
    },
  },
  {
    id: 'scene-negotiation',
    category: 'work',
    cefr: 'B2',
    title: '商务谈判',
    titleEn: 'Business Negotiation',
    icon: '🤝',
    task: '与供应商就价格和条款达成共识',
    taskEn: 'Reach agreement on price and terms with a supplier',
    keyPhrases: ['We were hoping for…', 'That\'s quite steep', 'If you commit to…', 'Let me discuss with my team'],
    refDialogueId: 'business-negotiation-1',
  },

  // ==================== 社交 ====================
  {
    id: 'scene-self-intro',
    category: 'social',
    cefr: 'A1',
    title: '自我介绍',
    titleEn: 'Self Introduction',
    icon: '👋',
    task: '在新环境中介绍自己并认识新朋友',
    taskEn: 'Introduce yourself and make a new friend',
    keyPhrases: ['My name is…', 'I\'m from…', 'Nice to meet you', 'What do you do?'],
    refDialogueId: 'self-intro-1',
  },
  {
    id: 'scene-party',
    category: 'social',
    cefr: 'A2',
    title: '派对闲聊',
    titleEn: 'Small Talk at a Party',
    icon: '🎉',
    task: '在派对上和陌生人愉快地聊几分钟',
    taskEn: 'Have a nice chat with someone at a party',
    keyPhrases: ['How do you know…?', 'What do you do?', 'Have you tried the…?', 'It was nice talking to you'],
    dialogue: {
      userRole: '来宾',
      botRole: '来宾',
      turns: [
        { speaker: 'bot', text: 'Hi! Great party, isn\'t it? How do you know the host?', zh: '嗨！派对不错吧？你怎么认识主人的？' },
        { speaker: 'user', text: 'We\'re college friends. How about you?', zh: '我们是大学同学，你呢？' },
        { speaker: 'bot', text: 'We work in the same company. What do you do?', zh: '我们在同一家公司。你是做什么的？' },
        { speaker: 'user', text: 'I\'m a teacher. I teach math.', zh: '我是老师，教数学。' },
        { speaker: 'bot', text: 'Cool! Have you tried the cake? It\'s amazing.', zh: '酷！你尝了蛋糕吗？超好吃。' },
        { speaker: 'user', text: 'Not yet, I\'ll go get some. Nice talking to you!', zh: '还没，我去拿一块。聊得很开心！' },
      ],
    },
  },

  // ==================== 居住 ====================
  {
    id: 'scene-rent',
    category: 'home',
    cefr: 'B1',
    title: '租房看房',
    titleEn: 'Apartment Viewing',
    icon: '🏠',
    task: '参观公寓并了解租赁条款',
    taskEn: 'View an apartment and learn about lease terms',
    keyPhrases: ['How much is the rent?', 'Is it furnished?', 'utilities included?', 'lease term'],
    dialogue: {
      userRole: '租客',
      botRole: '房东',
      turns: [
        { speaker: 'bot', text: 'Welcome! Let me show you around. This is the living room.', zh: '欢迎！我带你看看。这是客厅。' },
        { speaker: 'user', text: 'It\'s nice and bright. How much is the rent?', zh: '挺亮堂的。租金多少？' },
        { speaker: 'bot', text: '3,500 yuan per month. Utilities are separate.', zh: '每月 3500 元。水电另算。' },
        { speaker: 'user', text: 'Is it furnished?', zh: '有家具吗？' },
        { speaker: 'bot', text: 'Basic furniture is included — bed, sofa, and a desk.', zh: '有基本家具——床、沙发和书桌。' },
        { speaker: 'user', text: 'How long is the minimum lease?', zh: '最短租期多久？' },
        { speaker: 'bot', text: 'One year, with a two-month deposit.', zh: '一年起租，押二付一。' },
        { speaker: 'user', text: 'I\'ll think about it and let you know tomorrow.', zh: '我考虑一下，明天告诉你。' },
      ],
    },
  },
  {
    id: 'scene-repair',
    category: 'home',
    cefr: 'A2',
    title: '报修',
    titleEn: 'Reporting a Repair',
    icon: '🔧',
    task: '向房东报告需要维修的问题',
    taskEn: 'Report a maintenance issue to the landlord',
    keyPhrases: ['Something is broken', 'The faucet is leaking', 'Could you send someone?', 'When can it be fixed?'],
    dialogue: {
      userRole: '租客',
      botRole: '房东',
      turns: [
        { speaker: 'user', text: 'Hi, I\'m calling about a problem in my apartment.', zh: '你好，我打电话说下公寓里的问题。' },
        { speaker: 'bot', text: 'Sure, what happened?', zh: '好的，怎么了？' },
        { speaker: 'user', text: 'The kitchen faucet is leaking badly.', zh: '厨房水龙头漏水漏得很厉害。' },
        { speaker: 'bot', text: 'I\'ll send a plumber tomorrow morning. Is that okay?', zh: '我明天上午派个水管工来，可以吗？' },
        { speaker: 'user', text: 'Could it be today? Water is all over the floor.', zh: '能今天来吗？地上全是水。' },
        { speaker: 'bot', text: 'Let me try. I\'ll call you back in 30 minutes.', zh: '我试试看，30 分钟后回电话。' },
      ],
    },
  },

  // ==================== 紧急 ====================
  {
    id: 'scene-emergency-911',
    category: 'emergency',
    cefr: 'A2',
    title: '拨打急救电话',
    titleEn: 'Calling Emergency Services',
    icon: '🚑',
    task: '清楚地报告紧急情况和你的位置',
    taskEn: 'Clearly report the emergency and your location',
    keyPhrases: ['I need an ambulance', 'My address is…', 'Someone is hurt', 'Please hurry'],
    dialogue: {
      userRole: '报警人',
      botRole: '调度员',
      turns: [
        { speaker: 'bot', text: '911, what\'s your emergency?', zh: '911，请说明紧急情况。' },
        { speaker: 'user', text: 'I need an ambulance! My friend fell and hit his head.', zh: '我需要救护车！我朋友摔倒撞到了头。' },
        { speaker: 'bot', text: 'Is he conscious?', zh: '他有意识吗？' },
        { speaker: 'user', text: 'Yes, but he\'s bleeding a lot.', zh: '有，但流了很多血。' },
        { speaker: 'bot', text: 'What\'s your address?', zh: '你的地址是什么？' },
        { speaker: 'user', text: '88 Pine Street, apartment 302.', zh: '松树街 88 号，302 室。' },
        { speaker: 'bot', text: 'Help is on the way. Keep him still and press a clean cloth on the wound.', zh: '救援正在路上。让他别动，用干净布按住伤口。' },
        { speaker: 'user', text: 'Okay, thank you!', zh: '好的，谢谢！' },
      ],
    },
  },
  {
    id: 'scene-lost-passport',
    category: 'emergency',
    cefr: 'B1',
    title: '护照丢失',
    titleEn: 'Lost Passport',
    icon: '📕',
    task: '在领事馆报告护照丢失并申请补办',
    taskEn: 'Report a lost passport and apply for a replacement',
    keyPhrases: ['I lost my passport', 'When and where?', 'police report', 'temporary travel document'],
    dialogue: {
      userRole: '游客',
      botRole: '领事馆工作人员',
      turns: [
        { speaker: 'user', text: 'Excuse me, I lost my passport yesterday.', zh: '你好，我昨天丢了护照。' },
        { speaker: 'bot', text: 'I\'m sorry to hear that. Do you have a police report?', zh: '很遗憾。你有报警记录吗？' },
        { speaker: 'user', text: 'Yes, I filed one this morning. Here\'s a copy.', zh: '有的，今天早上报的。这是副本。' },
        { speaker: 'bot', text: 'Good. Do you have any other ID? Driver\'s license, maybe?', zh: '好的。有其他证件吗？比如驾照？' },
        { speaker: 'user', text: 'I have my driver\'s license and a photo copy of my passport.', zh: '我有驾照和护照复印件。' },
        { speaker: 'bot', text: 'We can issue a temporary travel document. It takes about two days.', zh: '我们可以签发临时旅行证件。大概需要两天。' },
        { speaker: 'user', text: 'That would be great. What documents do I need?', zh: '太好了。我需要提供什么材料？' },
        { speaker: 'bot', text: 'Fill out this form, two photos, and the police report. The fee is 25 dollars.', zh: '填这个表、两张照片和报警记录。费用 25 美元。' },
      ],
    },
  },
];

// ============================================================
// 工具函数
// ============================================================
export function getScenesByCategory(catId) {
  return LIFE_SCENES.filter((s) => s.category === catId);
}

export function getSceneByCefr(cefr) {
  return LIFE_SCENES.filter((s) => s.cefr === cefr);
}

export function getSceneById(id) {
  return LIFE_SCENES.find((s) => s.id === id) || null;
}
