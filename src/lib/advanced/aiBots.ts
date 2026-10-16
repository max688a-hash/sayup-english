// @ts-nocheck
// AI Bot 对话脚本（P2）
// ----------------------------------------------------------
// 每个 bot = 一个分支对话剧本，玩家通过语音 / 选项推进
// 节点字段：
//   botEn / botZh    机器人这一轮的英文 + 中文
//   branches[].hint  显示给用户的「建议你怎么说」按钮文本
//   branches[].hintZh   中文翻译
//   branches[].expectKeywords  STT 命中关键词集合（任意命中即过）
//   branches[].expectPhrase    完整短语强信号（命中即满分）
//   branches[].goto  跳到的下一个节点 id
//   fallback         未命中任何分支时的兜底节点 id
//   end              终点节点
//
// 关键词只用最高频的核心词；用户多说也无所谓。

export const AI_BOTS = [
  // ========================================================
  // 1. 咖啡店点单 · A1
  // ========================================================
  {
    id: 'bot-coffee',
    name: 'Sarah · Barista',
    nameZh: '咖啡店店员 Sarah',
    emoji: '☕',
    level: 'a1',
    intro: 'You walk into a busy coffee shop. Sarah greets you from behind the counter.',
    introZh: '你走进一家热闹的咖啡店，柜台后的 Sarah 跟你打招呼。',
    startNodeId: 'n1',
    nodes: {
      n1: {
        botEn: "Hi there! What can I get for you today?",
        botZh: '你好！今天想喝点什么？',
        branches: [
          { hint: 'Ask for coffee', hintZh: '点一杯咖啡', expectKeywords: ['coffee', 'latte', 'americano', 'cappuccino'], goto: 'n2_coffee' },
          { hint: 'Ask for tea', hintZh: '点一杯茶', expectKeywords: ['tea'], goto: 'n2_tea' },
          { hint: 'Ask for water', hintZh: '只要水', expectKeywords: ['water'], goto: 'n2_water' },
        ],
        fallback: 'n2_coffee',
      },
      n2_coffee: {
        botEn: 'Sure! What size — small, medium, or large?',
        botZh: '好的，要什么大小？小杯、中杯还是大杯？',
        branches: [
          { hint: 'Small', hintZh: '小杯', expectKeywords: ['small'], goto: 'n3_size' },
          { hint: 'Medium', hintZh: '中杯', expectKeywords: ['medium'], goto: 'n3_size' },
          { hint: 'Large', hintZh: '大杯', expectKeywords: ['large', 'big'], goto: 'n3_size' },
        ],
        fallback: 'n3_size',
      },
      n2_tea: {
        botEn: 'Of course. We have green, black, and herbal. Which one?',
        botZh: '好的，我们有绿茶、红茶和花草茶，要哪个？',
        branches: [
          { hint: 'Green tea', hintZh: '绿茶', expectKeywords: ['green'], goto: 'n3_size' },
          { hint: 'Black tea', hintZh: '红茶', expectKeywords: ['black'], goto: 'n3_size' },
          { hint: 'Herbal tea', hintZh: '花草茶', expectKeywords: ['herbal'], goto: 'n3_size' },
        ],
        fallback: 'n3_size',
      },
      n2_water: {
        botEn: 'No problem. Still or sparkling?',
        botZh: '没问题，要矿泉水还是气泡水？',
        branches: [
          { hint: 'Still', hintZh: '矿泉水', expectKeywords: ['still'], goto: 'n4_pay' },
          { hint: 'Sparkling', hintZh: '气泡水', expectKeywords: ['sparkling'], goto: 'n4_pay' },
        ],
        fallback: 'n4_pay',
      },
      n3_size: {
        botEn: 'Anything else? Maybe a cookie or muffin?',
        botZh: '还要别的吗？比如一块饼干或者松饼？',
        branches: [
          { hint: 'Yes, a cookie', hintZh: '要一块饼干', expectKeywords: ['cookie', 'yes'], goto: 'n4_pay' },
          { hint: 'A muffin', hintZh: '要个松饼', expectKeywords: ['muffin'], goto: 'n4_pay' },
          { hint: 'No thanks', hintZh: '不用了，谢谢', expectKeywords: ['no', 'thanks'], goto: 'n4_pay' },
        ],
        fallback: 'n4_pay',
      },
      n4_pay: {
        botEn: "That'll be five dollars. Cash or card?",
        botZh: '一共五美元。现金还是刷卡？',
        branches: [
          { hint: 'Card, please', hintZh: '刷卡', expectKeywords: ['card', 'credit'], goto: 'n5_done' },
          { hint: 'Cash', hintZh: '现金', expectKeywords: ['cash'], goto: 'n5_done' },
        ],
        fallback: 'n5_done',
      },
      n5_done: {
        botEn: 'Great. Your order will be ready in two minutes. Have a nice day!',
        botZh: '好的，两分钟内您的订单就好。祝您愉快！',
        end: true,
      },
    },
  },

  // ========================================================
  // 2. 餐厅吃饭 · A2
  // ========================================================
  {
    id: 'bot-restaurant',
    name: 'Mike · Waiter',
    nameZh: '餐厅服务员 Mike',
    emoji: '🍽️',
    level: 'a2',
    intro: 'You and a friend sit down at a nice Italian restaurant. Mike comes over with menus.',
    introZh: '你和朋友坐在一家不错的意大利餐厅，服务员 Mike 拿着菜单走过来。',
    startNodeId: 'n1',
    nodes: {
      n1: {
        botEn: 'Good evening! Welcome. Have you been here before?',
        botZh: '晚上好，欢迎光临！您之前来过吗？',
        branches: [
          { hint: "It's our first time", hintZh: '第一次来', expectKeywords: ['first', 'no'], goto: 'n2_intro' },
          { hint: "We've been before", hintZh: '来过几次', expectKeywords: ['yes', 'before'], goto: 'n2_short' },
        ],
        fallback: 'n2_intro',
      },
      n2_intro: {
        botEn: 'Wonderful. Tonight our chef recommends the seafood pasta. Can I get you something to drink?',
        botZh: '太好了。今晚厨师推荐海鲜意面，先来点喝的吗？',
        branches: [
          { hint: 'Red wine', hintZh: '红酒', expectKeywords: ['red', 'wine'], goto: 'n3_food' },
          { hint: 'Sparkling water', hintZh: '气泡水', expectKeywords: ['sparkling', 'water'], goto: 'n3_food' },
          { hint: 'Just tap water', hintZh: '白水就好', expectKeywords: ['tap', 'water'], goto: 'n3_food' },
        ],
        fallback: 'n3_food',
      },
      n2_short: {
        botEn: 'Welcome back! Same wine as last time?',
        botZh: '欢迎再次光临！还要上次的那款酒吗？',
        branches: [
          { hint: 'Yes please', hintZh: '好的', expectKeywords: ['yes', 'please'], goto: 'n3_food' },
          { hint: 'Something different', hintZh: '换一个', expectKeywords: ['different', 'else'], goto: 'n3_food' },
        ],
        fallback: 'n3_food',
      },
      n3_food: {
        botEn: 'And to eat? May I recommend the seafood pasta or the steak?',
        botZh: '吃的呢？可以推荐海鲜意面或牛排。',
        branches: [
          { hint: "I'll have the pasta", hintZh: '我要意面', expectKeywords: ['pasta', 'seafood'], goto: 'n4_pasta' },
          { hint: 'Steak, medium rare', hintZh: '牛排五分熟', expectKeywords: ['steak'], goto: 'n4_steak' },
          { hint: "Anything vegetarian?", hintZh: '有素的吗？', expectKeywords: ['vegetarian', 'vegan'], goto: 'n4_veg' },
        ],
        fallback: 'n4_pasta',
      },
      n4_pasta: {
        botEn: 'Excellent choice. Any allergies I should know about?',
        botZh: '好选择！有什么过敏需要我注意的吗？',
        branches: [
          { hint: 'No allergies', hintZh: '没有过敏', expectKeywords: ['no'], goto: 'n5_drink' },
          { hint: 'Allergic to peanuts', hintZh: '花生过敏', expectKeywords: ['peanut', 'allergy', 'allergic'], goto: 'n5_drink' },
        ],
        fallback: 'n5_drink',
      },
      n4_steak: {
        botEn: 'Got it — medium rare. Would you like a side of fries or salad?',
        botZh: '明白了，五分熟。要薯条还是沙拉做配菜？',
        branches: [
          { hint: 'Fries', hintZh: '薯条', expectKeywords: ['fries', 'french'], goto: 'n5_drink' },
          { hint: 'Salad', hintZh: '沙拉', expectKeywords: ['salad'], goto: 'n5_drink' },
        ],
        fallback: 'n5_drink',
      },
      n4_veg: {
        botEn: 'Of course. We have a great mushroom risotto and a vegetable lasagna.',
        botZh: '当然，我们有蘑菇烩饭和蔬菜千层面，都很不错。',
        branches: [
          { hint: 'Risotto, please', hintZh: '烩饭', expectKeywords: ['risotto', 'mushroom'], goto: 'n5_drink' },
          { hint: 'Lasagna', hintZh: '千层面', expectKeywords: ['lasagna'], goto: 'n5_drink' },
        ],
        fallback: 'n5_drink',
      },
      n5_drink: {
        botEn: 'Perfect. Your food will be ready in about fifteen minutes. Enjoy your evening!',
        botZh: '好的，菜大概十五分钟就好。祝您用餐愉快！',
        end: true,
      },
    },
  },

  // ========================================================
  // 3. 酒店前台 · A2
  // ========================================================
  {
    id: 'bot-hotel',
    name: 'Emma · Receptionist',
    nameZh: '酒店前台 Emma',
    emoji: '🏨',
    level: 'a2',
    intro: 'You arrive at a hotel lobby with a small suitcase. Emma greets you at the front desk.',
    introZh: '你拖着小行李箱走进酒店大堂，前台 Emma 微笑迎接。',
    startNodeId: 'n1',
    nodes: {
      n1: {
        botEn: 'Welcome to the Grand Hotel. Do you have a reservation?',
        botZh: '欢迎光临大酒店，您有预订吗？',
        branches: [
          { hint: 'Yes, under my name', hintZh: '有，用我名字订的', expectKeywords: ['yes', 'reservation', 'booking'], goto: 'n2_yes' },
          { hint: 'No, walk-in', hintZh: '没有，临时来的', expectKeywords: ['no'], goto: 'n2_no' },
        ],
        fallback: 'n2_yes',
      },
      n2_yes: {
        botEn: 'Wonderful. May I see your passport, please?',
        botZh: '太好了，麻烦出示一下您的护照？',
        branches: [
          { hint: 'Here you go', hintZh: '给您', expectKeywords: ['here', 'go', 'sure'], goto: 'n3_room' },
        ],
        fallback: 'n3_room',
      },
      n2_no: {
        botEn: 'No problem. We have a single room and a double room available tonight.',
        botZh: '没问题。今晚我们有一间单人房和一间双人房。',
        branches: [
          { hint: 'Single room, please', hintZh: '单人房', expectKeywords: ['single'], goto: 'n3_room' },
          { hint: 'Double, with a view', hintZh: '双人房，要有景观的', expectKeywords: ['double', 'view'], goto: 'n3_room' },
        ],
        fallback: 'n3_room',
      },
      n3_room: {
        botEn: 'Your room is on the seventh floor. Breakfast is included from seven to ten.',
        botZh: '您的房间在七楼。早餐七点到十点免费供应。',
        branches: [
          { hint: 'Is there WiFi?', hintZh: '有 WiFi 吗？', expectKeywords: ['wifi', 'internet'], goto: 'n4_wifi' },
          { hint: 'When is checkout?', hintZh: '几点退房？', expectKeywords: ['checkout', 'check', 'out'], goto: 'n4_checkout' },
          { hint: 'Thanks, that is all', hintZh: '谢谢，没问题了', expectKeywords: ['thanks', 'thank'], goto: 'n5_done' },
        ],
        fallback: 'n5_done',
      },
      n4_wifi: {
        botEn: "Yes, free WiFi. The password is on your key card.",
        botZh: '有，免费 WiFi，密码在房卡上。',
        branches: [
          { hint: 'Got it, thanks', hintZh: '知道了，谢谢', expectKeywords: ['got', 'thanks'], goto: 'n5_done' },
        ],
        fallback: 'n5_done',
      },
      n4_checkout: {
        botEn: 'Checkout is at noon. You can leave bags with us if you need to.',
        botZh: '中午十二点退房，需要的话可以把行李寄存在前台。',
        branches: [
          { hint: 'Perfect, thanks', hintZh: '好的，谢谢', expectKeywords: ['perfect', 'thanks'], goto: 'n5_done' },
        ],
        fallback: 'n5_done',
      },
      n5_done: {
        botEn: 'Have a wonderful stay. Just call zero for anything!',
        botZh: '祝您住得愉快，有任何需要按零联系我们！',
        end: true,
      },
    },
  },

  // ========================================================
  // 4. 求职面试 · B1
  // ========================================================
  {
    id: 'bot-interview',
    name: 'Jen · Recruiter',
    nameZh: '招聘经理 Jen',
    emoji: '💼',
    level: 'b1',
    intro: 'You sit down for a video interview at a tech company. Jen smiles and starts the conversation.',
    introZh: '你和一家科技公司视频面试，招聘经理 Jen 微笑着开始谈话。',
    startNodeId: 'n1',
    nodes: {
      n1: {
        botEn: 'Hi! Thanks for joining. Could you start by telling me about yourself?',
        botZh: '你好！谢谢参加面试。先简单介绍一下你自己吧？',
        branches: [
          { hint: 'Talk about your work background', hintZh: '聊工作背景', expectKeywords: ['work', 'experience', 'years'], goto: 'n2_work' },
          { hint: 'Talk about your studies', hintZh: '聊学历', expectKeywords: ['study', 'university', 'degree'], goto: 'n2_study' },
        ],
        fallback: 'n2_work',
      },
      n2_work: {
        botEn: "Great. Why are you looking for a new role right now?",
        botZh: '好。你为什么现在想换工作？',
        branches: [
          { hint: 'Want bigger challenges', hintZh: '想要更有挑战的工作', expectKeywords: ['challenge', 'grow', 'bigger'], goto: 'n3_skills' },
          { hint: 'Career change', hintZh: '想转行', expectKeywords: ['change', 'switch', 'new'], goto: 'n3_skills' },
        ],
        fallback: 'n3_skills',
      },
      n2_study: {
        botEn: 'Interesting. What did you focus on during your studies?',
        botZh: '挺有意思。你读书时主要专注什么领域？',
        branches: [
          { hint: 'Computer science', hintZh: '计算机', expectKeywords: ['computer', 'science', 'cs'], goto: 'n3_skills' },
          { hint: 'Business', hintZh: '商科', expectKeywords: ['business', 'marketing'], goto: 'n3_skills' },
        ],
        fallback: 'n3_skills',
      },
      n3_skills: {
        botEn: 'What do you consider your top three skills?',
        botZh: '你觉得自己最强的三项技能是什么？',
        branches: [
          { hint: 'Communication & teamwork', hintZh: '沟通和团队', expectKeywords: ['communication', 'team', 'people'], goto: 'n4_q' },
          { hint: 'Problem solving', hintZh: '解决问题', expectKeywords: ['problem', 'solve', 'analytical'], goto: 'n4_q' },
        ],
        fallback: 'n4_q',
      },
      n4_q: {
        botEn: 'Do you have any questions for me?',
        botZh: '你有什么想问我的吗？',
        branches: [
          { hint: 'Ask about the team', hintZh: '问团队情况', expectKeywords: ['team', 'people', 'colleague'], goto: 'n5_team' },
          { hint: 'Ask about culture', hintZh: '问公司文化', expectKeywords: ['culture', 'company'], goto: 'n5_culture' },
          { hint: 'No questions', hintZh: '暂时没有', expectKeywords: ['no', 'questions', 'good'], goto: 'n5_close' },
        ],
        fallback: 'n5_close',
      },
      n5_team: {
        botEn: "It's a tight team of eight, mostly senior, very collaborative.",
        botZh: '我们是一个八人小团队，大多是资深成员，协作氛围很好。',
        branches: [
          { hint: 'Sounds great', hintZh: '听起来不错', expectKeywords: ['great', 'sounds', 'good'], goto: 'n5_close' },
        ],
        fallback: 'n5_close',
      },
      n5_culture: {
        botEn: 'We value autonomy, async work, and direct feedback.',
        botZh: '我们提倡自主、异步协作、直接反馈的文化。',
        branches: [
          { hint: 'That fits me well', hintZh: '挺适合我的', expectKeywords: ['fit', 'me', 'good'], goto: 'n5_close' },
        ],
        fallback: 'n5_close',
      },
      n5_close: {
        botEn: "Perfect. We'll get back to you within a week. Thanks for your time!",
        botZh: '好的，我们一周内会给你回复。感谢你今天的时间！',
        end: true,
      },
    },
  },

  // ========================================================
  // 5. 看医生 · A2
  // ========================================================
  {
    id: 'bot-doctor',
    name: 'Dr. Lee',
    nameZh: '李医生',
    emoji: '🩺',
    level: 'a2',
    intro: "You walk into the doctor's office, feeling a bit unwell.",
    introZh: '你走进医生的诊室，感觉有些不舒服。',
    startNodeId: 'n1',
    nodes: {
      n1: {
        botEn: 'Good morning. What seems to be the problem today?',
        botZh: '早上好，今天哪里不舒服？',
        branches: [
          { hint: 'Sore throat', hintZh: '喉咙痛', expectKeywords: ['throat', 'sore'], goto: 'n2_cold' },
          { hint: 'Headache', hintZh: '头疼', expectKeywords: ['headache', 'head'], goto: 'n2_head' },
          { hint: 'Stomachache', hintZh: '肚子疼', expectKeywords: ['stomach', 'belly'], goto: 'n2_stomach' },
        ],
        fallback: 'n2_cold',
      },
      n2_cold: {
        botEn: 'How long have you had it? And do you have a fever?',
        botZh: '已经多久了？有发烧吗？',
        branches: [
          { hint: 'Two days, mild fever', hintZh: '两天了，有点发烧', expectKeywords: ['two', 'days', 'fever'], goto: 'n3_meds' },
          { hint: 'Just today, no fever', hintZh: '今天才开始，没烧', expectKeywords: ['today', 'no', 'fever'], goto: 'n3_meds' },
        ],
        fallback: 'n3_meds',
      },
      n2_head: {
        botEn: 'How bad is the pain? Any nausea or sensitivity to light?',
        botZh: '疼得厉害吗？有没有恶心或者怕光？',
        branches: [
          { hint: 'Mild, no other symptoms', hintZh: '不太疼，没别的症状', expectKeywords: ['mild', 'no'], goto: 'n3_meds' },
          { hint: 'Bad, with nausea', hintZh: '挺疼，还恶心', expectKeywords: ['nausea', 'bad'], goto: 'n3_meds' },
        ],
        fallback: 'n3_meds',
      },
      n2_stomach: {
        botEn: 'When did it start? Have you eaten anything unusual?',
        botZh: '什么时候开始的？吃了什么不寻常的东西吗？',
        branches: [
          { hint: 'Last night, ate seafood', hintZh: '昨晚吃了海鲜', expectKeywords: ['seafood', 'last', 'night'], goto: 'n3_meds' },
          { hint: 'This morning, nothing special', hintZh: '今早开始，没什么特别', expectKeywords: ['morning', 'nothing'], goto: 'n3_meds' },
        ],
        fallback: 'n3_meds',
      },
      n3_meds: {
        botEn: "Alright. I'll prescribe some medicine. Are you allergic to anything?",
        botZh: '好的，我给你开点药。你有什么过敏吗？',
        branches: [
          { hint: 'No allergies', hintZh: '没有', expectKeywords: ['no'], goto: 'n4_done' },
          { hint: 'Allergic to penicillin', hintZh: '青霉素过敏', expectKeywords: ['penicillin', 'allergic'], goto: 'n4_done' },
        ],
        fallback: 'n4_done',
      },
      n4_done: {
        botEn: 'Take the medicine three times a day, drink plenty of water, and rest. Feel better soon!',
        botZh: '一天吃三次，多喝水，多休息。早日康复！',
        end: true,
      },
    },
  },

  // ========================================================
  // 6. 旅行社咨询 · B1
  // ========================================================
  {
    id: 'bot-travel',
    name: 'Tom · Travel Agent',
    nameZh: '旅行顾问 Tom',
    emoji: '✈️',
    level: 'b1',
    intro: 'You step into a travel agency to plan a trip. Tom invites you to sit down.',
    introZh: '你走进旅行社想规划一次旅行，Tom 招呼你坐下。',
    startNodeId: 'n1',
    nodes: {
      n1: {
        botEn: 'Hi! Where are you thinking of going?',
        botZh: '你好！你想去哪里？',
        branches: [
          { hint: 'Somewhere in Europe', hintZh: '欧洲', expectKeywords: ['europe'], goto: 'n2_europe' },
          { hint: 'Beach in Asia', hintZh: '亚洲海边', expectKeywords: ['asia', 'beach'], goto: 'n2_asia' },
          { hint: 'I have no idea', hintZh: '还没想好', expectKeywords: ['no', 'idea', 'know'], goto: 'n2_open' },
        ],
        fallback: 'n2_open',
      },
      n2_europe: {
        botEn: "Lovely. Are you more into history or food?",
        botZh: '挺好。你比较喜欢历史还是美食？',
        branches: [
          { hint: 'History', hintZh: '历史', expectKeywords: ['history', 'old', 'culture'], goto: 'n3_dur' },
          { hint: 'Food', hintZh: '美食', expectKeywords: ['food', 'eat'], goto: 'n3_dur' },
        ],
        fallback: 'n3_dur',
      },
      n2_asia: {
        botEn: 'Nice! Are you looking for a relaxing beach or something more active?',
        botZh: '不错！想要放松的海边，还是比较活跃的？',
        branches: [
          { hint: 'Just relax', hintZh: '彻底放松', expectKeywords: ['relax', 'chill', 'rest'], goto: 'n3_dur' },
          { hint: 'Diving and adventure', hintZh: '潜水探险', expectKeywords: ['diving', 'adventure', 'active'], goto: 'n3_dur' },
        ],
        fallback: 'n3_dur',
      },
      n2_open: {
        botEn: 'No worries. Whats your budget — under, around, or over two thousand dollars?',
        botZh: '没事，你的预算大概是？两千美元以下，左右，还是更多？',
        branches: [
          { hint: 'Under two thousand', hintZh: '两千以下', expectKeywords: ['under', 'less', 'cheap'], goto: 'n3_dur' },
          { hint: 'Around two thousand', hintZh: '两千左右', expectKeywords: ['around', 'about'], goto: 'n3_dur' },
          { hint: 'No real limit', hintZh: '没什么限制', expectKeywords: ['no', 'limit', 'flexible'], goto: 'n3_dur' },
        ],
        fallback: 'n3_dur',
      },
      n3_dur: {
        botEn: 'How long can you travel for?',
        botZh: '你能玩多久？',
        branches: [
          { hint: 'Less than a week', hintZh: '一周以内', expectKeywords: ['week', 'short', 'less'], goto: 'n4_send' },
          { hint: 'About two weeks', hintZh: '两周左右', expectKeywords: ['two', 'weeks'], goto: 'n4_send' },
          { hint: 'A whole month', hintZh: '一整个月', expectKeywords: ['month'], goto: 'n4_send' },
        ],
        fallback: 'n4_send',
      },
      n4_send: {
        botEn: "Got it. I'll email you three options by tomorrow. What's your address?",
        botZh: '明白了，明天我把三个方案发邮件给你。邮箱是？',
        branches: [
          { hint: 'Give your email', hintZh: '说出邮箱', expectKeywords: ['email', 'gmail', 'at'], goto: 'n5_done' },
          { hint: 'Send by message instead', hintZh: '发短信吧', expectKeywords: ['message', 'text', 'phone'], goto: 'n5_done' },
        ],
        fallback: 'n5_done',
      },
      n5_done: {
        botEn: "Perfect. I'll be in touch by tomorrow evening. Excited for you!",
        botZh: '完美，明天晚上前联系你，替你高兴！',
        end: true,
      },
    },
  },

  // ========================================================
  // 7. 朋友闲聊 · A2
  // ========================================================
  {
    id: 'bot-friend',
    name: 'Alex · Friend',
    nameZh: '老朋友 Alex',
    emoji: '👋',
    level: 'a2',
    intro: 'You bump into your old friend Alex on the street. They look excited to see you.',
    introZh: '你在街上偶遇老朋友 Alex，他看到你特别开心。',
    startNodeId: 'n1',
    nodes: {
      n1: {
        botEn: "Hey! Long time no see! How have you been?",
        botZh: '嘿！好久不见！最近怎么样？',
        branches: [
          { hint: 'Pretty good', hintZh: '挺好的', expectKeywords: ['good', 'great', 'fine'], goto: 'n2_good' },
          { hint: 'Been busy', hintZh: '挺忙的', expectKeywords: ['busy', 'crazy'], goto: 'n2_busy' },
          { hint: 'Not great honestly', hintZh: '说实话不太好', expectKeywords: ['not', 'bad', 'tired'], goto: 'n2_bad' },
        ],
        fallback: 'n2_good',
      },
      n2_good: {
        botEn: 'That is awesome to hear! Whats new with you?',
        botZh: '太棒了！最近有什么新鲜事吗？',
        branches: [
          { hint: 'New job', hintZh: '换新工作了', expectKeywords: ['job', 'work'], goto: 'n3_share' },
          { hint: 'Just moved', hintZh: '刚搬家', expectKeywords: ['moved', 'house', 'apartment'], goto: 'n3_share' },
          { hint: 'Nothing big', hintZh: '没什么大事', expectKeywords: ['nothing', 'same'], goto: 'n3_plan' },
        ],
        fallback: 'n3_plan',
      },
      n2_busy: {
        botEn: 'I get it, life can be wild. Any chance you have time for coffee soon?',
        botZh: '懂的，生活有时挺疯。最近有空一起喝咖啡吗？',
        branches: [
          { hint: 'Yes, this weekend', hintZh: '可以，这周末', expectKeywords: ['yes', 'weekend', 'sure'], goto: 'n3_plan' },
          { hint: "Maybe next month", hintZh: '可能下个月', expectKeywords: ['next', 'month', 'later'], goto: 'n3_plan' },
        ],
        fallback: 'n3_plan',
      },
      n2_bad: {
        botEn: "I'm sorry to hear that. Want to talk about it?",
        botZh: '听到这个我很难过，想聊聊吗？',
        branches: [
          { hint: 'Maybe later', hintZh: '以后再说吧', expectKeywords: ['later', 'maybe', 'not now'], goto: 'n3_plan' },
          { hint: 'Yes, I do', hintZh: '想聊', expectKeywords: ['yes', 'talk'], goto: 'n3_share' },
        ],
        fallback: 'n3_plan',
      },
      n3_share: {
        botEn: "That sounds like a lot. Tell me more next time we hang out?",
        botZh: '听起来挺有的聊。下次见面再细说？',
        branches: [
          { hint: 'For sure', hintZh: '一定', expectKeywords: ['sure', 'yes'], goto: 'n4_done' },
        ],
        fallback: 'n4_done',
      },
      n3_plan: {
        botEn: "Let's do Saturday. I know a great new ramen place. My treat?",
        botZh: '那就周六？我知道一家新开的拉面店，我请客。',
        branches: [
          { hint: 'Sounds great', hintZh: '太好了', expectKeywords: ['great', 'sounds'], goto: 'n4_done' },
          { hint: "Let me check and confirm", hintZh: '我看下时间再回你', expectKeywords: ['check', 'confirm', 'later'], goto: 'n4_done' },
        ],
        fallback: 'n4_done',
      },
      n4_done: {
        botEn: "Awesome. I'll text you. Take care of yourself!",
        botZh: '太棒了，我会给你发短信。保重啊！',
        end: true,
      },
    },
  },

  // ========================================================
  // 8. 客服电话 · B2
  // ========================================================
  {
    id: 'bot-support',
    name: 'Anna · Customer Support',
    nameZh: '客服 Anna',
    emoji: '☎️',
    level: 'b2',
    intro: 'You call customer support because your new phone keeps restarting.',
    introZh: '你的新手机老是自动重启，于是打了客服电话。',
    startNodeId: 'n1',
    nodes: {
      n1: {
        botEn: 'Thanks for calling support. What can I help you with today?',
        botZh: '感谢致电客服，请问您今天遇到什么问题？',
        branches: [
          { hint: 'Phone keeps restarting', hintZh: '手机一直重启', expectKeywords: ['restart', 'reboot', 'phone'], goto: 'n2_restart' },
          { hint: 'Battery dies fast', hintZh: '电池掉电太快', expectKeywords: ['battery', 'dies', 'drain'], goto: 'n2_battery' },
        ],
        fallback: 'n2_restart',
      },
      n2_restart: {
        botEn: "I'm sorry to hear that. When did this start happening?",
        botZh: '抱歉给您添麻烦了，这是什么时候开始的？',
        branches: [
          { hint: 'After a recent update', hintZh: '最近系统更新后', expectKeywords: ['update', 'after'], goto: 'n3_steps' },
          { hint: "It's been doing it for weeks", hintZh: '已经好几周了', expectKeywords: ['weeks', 'long'], goto: 'n3_steps' },
        ],
        fallback: 'n3_steps',
      },
      n2_battery: {
        botEn: 'Got it. Can you tell me what apps you use most?',
        botZh: '明白。能告诉我您主要用哪些 app 吗？',
        branches: [
          { hint: 'Mostly social media', hintZh: '主要是社交软件', expectKeywords: ['social', 'media', 'instagram', 'tiktok'], goto: 'n3_steps' },
          { hint: 'Video calls and games', hintZh: '视频通话和游戏', expectKeywords: ['video', 'call', 'game'], goto: 'n3_steps' },
        ],
        fallback: 'n3_steps',
      },
      n3_steps: {
        botEn: "Let's try a soft reset. Hold the power button for ten seconds. Did that help?",
        botZh: '我们先试试软重启，长按电源键 10 秒。有改善吗？',
        branches: [
          { hint: 'Yes, it works now', hintZh: '好了！', expectKeywords: ['yes', 'works', 'fixed'], goto: 'n4_done_ok' },
          { hint: "No, still the same", hintZh: '还是一样', expectKeywords: ['no', 'same', 'still'], goto: 'n4_escalate' },
        ],
        fallback: 'n4_escalate',
      },
      n4_done_ok: {
        botEn: 'Glad to hear it! If it happens again, please call back. Have a great day!',
        botZh: '太好了！如果再出现请再联系我们。祝您愉快！',
        end: true,
      },
      n4_escalate: {
        botEn: "I'll escalate this to our engineering team. They'll email you in 24 hours. Sound okay?",
        botZh: '我会上报到工程团队，他们 24 小时内邮件联系您，可以吗？',
        branches: [
          { hint: 'Yes, please', hintZh: '可以', expectKeywords: ['yes', 'please', 'okay'], goto: 'n5_done' },
        ],
        fallback: 'n5_done',
      },
      n5_done: {
        botEn: 'Thank you for your patience. Have a good rest of your day!',
        botZh: '感谢您的耐心，祝您接下来一天顺利！',
        end: true,
      },
    },
  },
];

export const BOT_LEVELS = ['a1', 'a2', 'b1', 'b2'];
export const BOT_LEVEL_LABELS = {
  a1: 'A1 入门', a2: 'A2 日常', b1: 'B1 进阶', b2: 'B2 高阶',
};

export function getBotsByLevel(level) {
  return AI_BOTS.filter((b) => b.level === level);
}

export function getBotById(id) {
  return AI_BOTS.find((b) => b.id === id);
}
