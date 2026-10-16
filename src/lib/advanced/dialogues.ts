// @ts-nocheck
// 情景对话：两人三~五轮的真实场景脚本
//   结构：
//     id/title/titleZh/level/icon
//     turns: 交替的 A/B 对白数组
//       { speaker: 'A' | 'B', en, zh }
//     userRole: 'A' | 'B'   用户扮演哪一方（练 speaking 时只说这一方的台词）
//
// 覆盖 CEFR 等级：a1 / a2 / b1 / b2 / c1

export const DIALOGUES = [
  // ============ A1 免费 ============
  {
    id: 'd-greet-1',
    title: 'First Meeting',
    titleZh: '初次见面',
    level: 'a1',
    icon: '👋',
    userRole: 'B',
    turns: [
      { speaker: 'A', en: "Hi! My name is Tom. What's your name?", zh: '嗨！我叫 Tom，你叫什么名字？' },
      { speaker: 'B', en: "I'm Anna. Nice to meet you.",            zh: '我叫 Anna，很高兴认识你。' },
      { speaker: 'A', en: "Where are you from, Anna?",              zh: 'Anna，你是哪里人？' },
      { speaker: 'B', en: "I'm from China. And you?",               zh: '我来自中国，你呢？' },
      { speaker: 'A', en: "I'm from the US. Welcome!",              zh: '我来自美国，欢迎你！' },
    ],
  },
  {
    id: 'd-family-1',
    title: 'My Family',
    titleZh: '介绍家人',
    level: 'a1',
    icon: '👨‍👩‍👧',
    userRole: 'A',
    turns: [
      { speaker: 'A', en: "I have a big family. How about you?",     zh: '我家人很多，你呢？' },
      { speaker: 'B', en: "I have a mom, a dad, and a little brother.", zh: '我有妈妈、爸爸和一个弟弟。' },
      { speaker: 'A', en: "That's nice. Do you live together?",      zh: '真好，你们住在一起吗？' },
      { speaker: 'B', en: "Yes, we all live in the same house.",     zh: '是的，我们都住在同一个房子里。' },
    ],
  },
  {
    id: 'd-hobby-1',
    title: 'Hobbies',
    titleZh: '聊爱好',
    level: 'a1',
    icon: '🎨',
    userRole: 'A',
    turns: [
      { speaker: 'A', en: "What do you like to do in your free time?", zh: '你空闲时喜欢做什么？' },
      { speaker: 'B', en: "I like to read books and play soccer.",     zh: '我喜欢看书和踢足球。' },
      { speaker: 'A', en: "Cool! I like soccer too. Let's play sometime.", zh: '酷！我也喜欢足球，有空一起踢吧。' },
      { speaker: 'B', en: "Sounds great! How about this weekend?",     zh: '好啊！这个周末怎么样？' },
    ],
  },

  // ============ A2 (付费) ============
  {
    id: 'd-cafe-1',
    title: 'Ordering Coffee',
    titleZh: '咖啡店点单',
    level: 'a2',
    icon: '☕',
    userRole: 'A',
    turns: [
      { speaker: 'A', en: "Hi, I'd like a large latte, please.",       zh: '你好，我要一杯大杯拿铁。' },
      { speaker: 'B', en: "Sure. Hot or iced?",                         zh: '好的，热的还是冰的？' },
      { speaker: 'A', en: "Iced, with less sugar.",                     zh: '冰的，少糖。' },
      { speaker: 'B', en: "Anything else? A muffin maybe?",             zh: '还要别的吗？来个松饼？' },
      { speaker: 'A', en: "No, that's it. How much is it?",             zh: '不用了，多少钱？' },
      { speaker: 'B', en: "That'll be 35 yuan. Card or cash?",          zh: '总共 35 元，刷卡还是现金？' },
    ],
  },
  {
    id: 'd-shop-1',
    title: 'Buying a T-shirt',
    titleZh: '买 T 恤',
    level: 'a2',
    icon: '👕',
    userRole: 'A',
    turns: [
      { speaker: 'A', en: "Excuse me, do you have this in medium?",    zh: '请问这件有中号吗？' },
      { speaker: 'B', en: "Let me check… Yes, here you go.",            zh: '我查查…有的，给你。' },
      { speaker: 'A', en: "Can I try it on?",                           zh: '我能试一下吗？' },
      { speaker: 'B', en: "Of course, the fitting room is over there.", zh: '当然可以，试衣间在那边。' },
      { speaker: 'A', en: "It fits. I'll take it. How much?",           zh: '合身，我买了，多少钱？' },
      { speaker: 'B', en: "129 yuan. Would you like a receipt?",        zh: '129 元，要开发票吗？' },
    ],
  },
  {
    id: 'd-dir-1',
    title: 'Asking Directions',
    titleZh: '问路',
    level: 'a2',
    icon: '🗺️',
    userRole: 'A',
    turns: [
      { speaker: 'A', en: "Excuse me, how do I get to the subway station?", zh: '打扰一下，地铁站怎么走？' },
      { speaker: 'B', en: "Go straight two blocks, then turn right.",        zh: '直走两个街区，然后右转。' },
      { speaker: 'A', en: "Is it far?",                                      zh: '远吗？' },
      { speaker: 'B', en: "About a ten-minute walk.",                        zh: '大约步行十分钟。' },
      { speaker: 'A', en: "Great, thanks a lot!",                            zh: '太好了，非常感谢！' },
    ],
  },

  // ============ B1 (付费) ============
  {
    id: 'd-work-1',
    title: 'Job Interview',
    titleZh: '工作面试',
    level: 'b1',
    icon: '💼',
    userRole: 'B',
    turns: [
      { speaker: 'A', en: "Tell me a little about yourself.",             zh: '请简单介绍一下你自己。' },
      { speaker: 'B', en: "I have three years of experience in marketing.", zh: '我有三年的市场营销经验。' },
      { speaker: 'A', en: "What's your biggest strength?",                 zh: '你最大的优势是什么？' },
      { speaker: 'B', en: "I'm good at teamwork and solving problems quickly.", zh: '我擅长团队协作和快速解决问题。' },
      { speaker: 'A', en: "Why do you want to work here?",                 zh: '你为什么想来这里工作？' },
      { speaker: 'B', en: "Your company is a leader in this industry.",    zh: '贵公司是这个行业的领头羊。' },
    ],
  },
  {
    id: 'd-travel-1',
    title: 'Hotel Check-in',
    titleZh: '酒店入住',
    level: 'b1',
    icon: '🏨',
    userRole: 'A',
    turns: [
      { speaker: 'A', en: "Hi, I have a reservation under the name Chen.", zh: '你好，我以陈的名字预订了房间。' },
      { speaker: 'B', en: "Welcome. Could I see your ID, please?",         zh: '欢迎，请出示一下您的身份证件。' },
      { speaker: 'A', en: "Sure. Is breakfast included?",                  zh: '好的，早餐包含吗？' },
      { speaker: 'B', en: "Yes, from 7 to 10 on the second floor.",        zh: '是的，早上 7 点到 10 点在二楼。' },
      { speaker: 'A', en: "Actually, could I have a room with a view?",              zh: '其实，能给我一个有景观的房间吗？' },
      { speaker: 'B', en: "Let me upgrade you to a city-view room.",       zh: '我帮您升级到城景房。' },
    ],
  },

  // ============ B2 (付费) ============
  {
    id: 'd-opinion-1',
    title: 'Talking About News',
    titleZh: '聊新闻话题',
    level: 'b2',
    icon: '📰',
    userRole: 'B',
    turns: [
      { speaker: 'A', en: "Did you see the news about the new AI tool?",    zh: '你看到关于新 AI 工具的新闻了吗？' },
      { speaker: 'B', en: "Yes, it's impressive but also a bit concerning.", zh: '看到了，很惊艳但也有点令人担忧。' },
      { speaker: 'A', en: "Concerning? In what way?",                        zh: '担忧？哪方面？' },
      { speaker: 'B', en: "Honestly, some jobs might be replaced over time.",          zh: '老实说，长期看有些工作可能会被替代。' },
      { speaker: 'A', en: "That's a fair point. Any solutions?",             zh: '有道理。有什么解决办法吗？' },
      { speaker: 'B', en: "We need to keep learning new skills continuously.", zh: '我们需要持续学习新技能。' },
    ],
  },

  // ============ C1 (付费) ============
  {
    id: 'd-debate-1',
    title: 'Remote Work Debate',
    titleZh: '远程工作辩论',
    level: 'c1',
    icon: '💻',
    userRole: 'A',
    turns: [
      { speaker: 'A', en: "I believe remote work significantly boosts productivity.", zh: '我认为远程工作能显著提升效率。' },
      { speaker: 'B', en: "That's debatable; it depends on the nature of the job.",   zh: '这点可商榷，要看工作性质。' },
      { speaker: 'A', en: "For creative tasks, flexibility often outweighs the drawbacks.", zh: '对创造性工作，灵活性通常优于缺点。' },
      { speaker: 'B', en: "Yet collaboration and culture can suffer without in-person contact.", zh: '但失去面对面接触，团队协作和文化会受影响。' },
      { speaker: 'A', en: "That said, a hybrid model might strike the best balance.",             zh: '话虽如此，混合模式也许能找到最佳平衡。' },
    ],
  },
  // ============ 扩展对话 (40+) ============
  // ---- A2 日常 ----
  {
    id: 'd-supermarket', title: 'At the Supermarket', titleZh: '在超市', level: 'a2', icon: '🛒', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Excuse me, where can I find the milk?", zh: '不好意思，牛奶在哪儿？' },
      { speaker: 'B', en: "Aisle five, on the right side.", zh: '第 5 排，右边。' },
      { speaker: 'A', en: "Do you have any low-fat options?", zh: '有低脂的吗？' },
      { speaker: 'B', en: "Yes, the blue cartons are low-fat.", zh: '蓝色盒装的是低脂。' },
      { speaker: 'A', en: "Thanks. And where is the checkout?", zh: '谢谢，收银台在哪？' },
      { speaker: 'B', en: "Right at the front entrance.", zh: '就在前门。' },
    ],
  },
  {
    id: 'd-pharmacy', title: 'At the Pharmacy', titleZh: '在药店', level: 'a2', icon: '💊', userRole: 'A',
    turns: [
      { speaker: 'A', en: "I have a really bad cold. Any suggestions?", zh: '我感冒得很厉害，有什么推荐？' },
      { speaker: 'B', en: "Do you have a fever or a sore throat?", zh: '发烧还是喉咙痛？' },
      { speaker: 'A', en: "Both, and I'm coughing a lot.", zh: '都有，而且咳嗽得厉害。' },
      { speaker: 'B', en: "Try this syrup and these tablets, twice a day.", zh: '试试这个糖浆和药片，每日两次。' },
      { speaker: 'A', en: "Do I need a prescription?", zh: '需要处方吗？' },
      { speaker: 'B', en: "No, these are over the counter.", zh: '不用，这些是非处方药。' },
    ],
  },
  {
    id: 'd-taxi', title: 'Taking a Taxi', titleZh: '打出租车', level: 'a2', icon: '🚕', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Hi, can you take me to the train station?", zh: '你好，能送我去火车站吗？' },
      { speaker: 'B', en: "Sure, hop in. Which entrance?", zh: '上车吧，哪个口？' },
      { speaker: 'A', en: "The north entrance, please.", zh: '北口，谢谢。' },
      { speaker: 'B', en: "It'll take about 20 minutes with traffic.", zh: '路上堵车，大概 20 分钟。' },
      { speaker: 'A', en: "Could you go a little faster? I'm in a hurry.", zh: '能开快点吗，我赶时间。' },
      { speaker: 'B', en: "I'll do my best, sir.", zh: '我尽量，先生。' },
    ],
  },
  {
    id: 'd-bank', title: 'Opening a Bank Account', titleZh: '开银行账户', level: 'a2', icon: '🏦', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Hi, I'd like to open a savings account.", zh: '你好，我想开一个储蓄账户。' },
      { speaker: 'B', en: "Sure. May I see your ID and proof of address?", zh: '好的，请出示身份证和地址证明。' },
      { speaker: 'A', en: "Here you go. What's the minimum deposit?", zh: '在这里，最低存款是多少？' },
      { speaker: 'B', en: "It's 100 yuan to start.", zh: '100 元就可以开户。' },
      { speaker: 'A', en: "Will I get a debit card today?", zh: '今天能拿到银行卡吗？' },
      { speaker: 'B', en: "Yes, and you can set the PIN right here.", zh: '可以，您还可以现场设密码。' },
    ],
  },
  {
    id: 'd-post', title: 'At the Post Office', titleZh: '在邮局', level: 'a2', icon: '📮', userRole: 'A',
    turns: [
      { speaker: 'A', en: "I'd like to send this package to Beijing.", zh: '我想把这个包裹寄到北京。' },
      { speaker: 'B', en: "Standard or express?", zh: '普通还是快递？' },
      { speaker: 'A', en: "How long does standard take?", zh: '普通件要多久？' },
      { speaker: 'B', en: "About four to five days.", zh: '大概四五天。' },
      { speaker: 'A', en: "Express, please. How much is that?", zh: '那寄快递吧，多少钱？' },
      { speaker: 'B', en: "That'll be 32 yuan. Anything fragile inside?", zh: '一共 32 元，里面有易碎品吗？' },
    ],
  },
  {
    id: 'd-haircut', title: 'Getting a Haircut', titleZh: '理发', level: 'a2', icon: '💇', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Hi, I'd like a haircut, please.", zh: '你好，我想剪个头发。' },
      { speaker: 'B', en: "Sure, just a trim or something different?", zh: '好的，只是修一下还是换个发型？' },
      { speaker: 'A', en: "A bit shorter on the sides, but keep the top.", zh: '两边剪短点，上面留着。' },
      { speaker: 'B', en: "Got it. Want me to wash it first?", zh: '懂了，要先洗头吗？' },
      { speaker: 'A', en: "Yes, please.", zh: '好的，谢谢。' },
    ],
  },
  {
    id: 'd-weather-chat', title: 'Talking About Weather', titleZh: '聊天气', level: 'a2', icon: '☔', userRole: 'B',
    turns: [
      { speaker: 'A', en: "It's really hot today, isn't it?", zh: '今天真热，是吧？' },
      { speaker: 'B', en: "Yeah, almost 35 degrees.", zh: '是啊，快 35 度了。' },
      { speaker: 'A', en: "I heard it'll rain this evening.", zh: '听说今晚会下雨。' },
      { speaker: 'B', en: "Good, we really need it.", zh: '挺好，正需要。' },
      { speaker: 'A', en: "Don't forget your umbrella.", zh: '别忘了带伞。' },
    ],
  },
  {
    id: 'd-make-friend', title: 'Making a New Friend', titleZh: '认识新朋友', level: 'a2', icon: '🤝', userRole: 'B',
    turns: [
      { speaker: 'A', en: "Mind if I sit here?", zh: '介意我坐这吗？' },
      { speaker: 'B', en: "Not at all, please.", zh: '完全不介意，请吧。' },
      { speaker: 'A', en: "Are you a student here too?", zh: '你也是这里的学生吗？' },
      { speaker: 'B', en: "Yes, second year. How about you?", zh: '是的，大二，你呢？' },
      { speaker: 'A', en: "First year. Any tips?", zh: '我大一，有什么建议吗？' },
      { speaker: 'B', en: "Join a club, it'll change your life.", zh: '加个社团，能改变你的大学生活。' },
    ],
  },
  {
    id: 'd-restaurant-2', title: 'Special Dietary Needs', titleZh: '点餐说忌口', level: 'a2', icon: '🥗', userRole: 'A',
    turns: [
      { speaker: 'A', en: "I'm vegetarian, do you have a veggie option?", zh: '我吃素，有素食选项吗？' },
      { speaker: 'B', en: "Yes, our pasta primavera is fully veggie.", zh: '有的，蔬菜意面是全素的。' },
      { speaker: 'A', en: "Does it have any cheese?", zh: '加了奶酪吗？' },
      { speaker: 'B', en: "Yes, but we can leave it out.", zh: '有的，但可以不放。' },
      { speaker: 'A', en: "Perfect, no cheese please.", zh: '太好了，不要奶酪。' },
    ],
  },
  {
    id: 'd-phone-call', title: 'Phone Call', titleZh: '打电话', level: 'a2', icon: '📞', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Hello, may I speak to Mr. Lee?", zh: '你好，请问李先生在吗？' },
      { speaker: 'B', en: "He's not available right now. Can I take a message?", zh: '他现在不在，我可以记下口信吗？' },
      { speaker: 'A', en: "Yes, this is Sarah. Please ask him to call me back.", zh: '我是 Sarah，请让他回我电话。' },
      { speaker: 'B', en: "Sure. Does he have your number?", zh: '好的，他有您的号码吗？' },
      { speaker: 'A', en: "Yes, he does. Thank you.", zh: '有的，谢谢。' },
    ],
  },
  // ---- B1 进阶 ----
  {
    id: 'd-doctor', title: 'Visiting the Doctor', titleZh: '看医生', level: 'b1', icon: '👩‍⚕️', userRole: 'B',
    turns: [
      { speaker: 'A', en: "What seems to be the problem?", zh: '哪里不舒服？' },
      { speaker: 'B', en: "I've had a headache for three days.", zh: '我头痛三天了。' },
      { speaker: 'A', en: "Any other symptoms—fever, dizziness?", zh: '还有发烧、头晕之类的吗？' },
      { speaker: 'B', en: "Now that you mention it, a bit of dizziness when I stand up.", zh: '你这么一说，站起来会有点头晕。' },
      { speaker: 'A', en: "I'll prescribe something and order a blood test.", zh: '我开点药，再做个血常规。' },
      { speaker: 'B', en: "Should I come back for the results?", zh: '需要再来取结果吗？' },
      { speaker: 'A', en: "We'll send them to your phone tomorrow.", zh: '明天会发到您手机上。' },
    ],
  },
  {
    id: 'd-airport-checkin', title: 'Airport Check-in', titleZh: '机场办理登机', level: 'b1', icon: '🛫', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Hi, I'm checking in for flight CA982.", zh: '你好，我办理 CA982 航班的登机。' },
      { speaker: 'B', en: "Passport, please. Any luggage to check?", zh: '请出示护照，有要托运的行李吗？' },
      { speaker: 'A', en: "Just one suitcase. Could I get a window seat?", zh: '一个箱子，能给我靠窗的座位吗？' },
      { speaker: 'B', en: "Sure, 24A. Boarding starts at gate 12.", zh: '好的，24A，12 号登机口。' },
      { speaker: 'A', en: "When does boarding start?", zh: '什么时候开始登机？' },
      { speaker: 'B', en: "Forty minutes before departure.", zh: '起飞前 40 分钟。' },
    ],
  },
  {
    id: 'd-rent-apartment', title: 'Renting an Apartment', titleZh: '看房租房', level: 'b1', icon: '🔑', userRole: 'A',
    turns: [
      { speaker: 'A', en: "How much is the monthly rent?", zh: '月租多少？' },
      { speaker: 'B', en: "5000 yuan, utilities not included.", zh: '5000 元，水电不含。' },
      { speaker: 'A', en: "Is there a deposit?", zh: '需要押金吗？' },
      { speaker: 'B', en: "Yes, two months' rent as deposit.", zh: '是的，押两月租金。' },
      { speaker: 'A', en: "Can I see the kitchen and bathroom?", zh: '我能看看厨房和卫生间吗？' },
      { speaker: 'B', en: "Of course, follow me.", zh: '当然，请这边。' },
      { speaker: 'A', en: "When can I move in if I sign today?", zh: '今天签的话什么时候能搬进来？' },
      { speaker: 'B', en: "Anytime after this Friday.", zh: '这周五之后随时可以。' },
    ],
  },
  {
    id: 'd-job-interview-2', title: 'Behavioral Interview', titleZh: '行为面试', level: 'b1', icon: '🎯', userRole: 'B',
    turns: [
      { speaker: 'A', en: "Tell me about a time you led a team.", zh: '请说说你带团队的一次经历。' },
      { speaker: 'B', en: "Last year I led a project of five people.", zh: '去年我带了一个 5 人的项目。' },
      { speaker: 'A', en: "What was the biggest challenge?", zh: '最大的挑战是什么？' },
      { speaker: 'B', en: "Tight deadlines and conflicting opinions.", zh: '工期紧加上意见分歧。' },
      { speaker: 'A', en: "How did you handle it?", zh: '你怎么处理的？' },
      { speaker: 'B', en: "Basically, I held daily 15-minute syncs to align goals.", zh: '基本上，我每天开 15 分钟短会对齐目标。' },
    ],
  },
  {
    id: 'd-work-update', title: 'Project Update', titleZh: '工作汇报', level: 'b1', icon: '📊', userRole: 'A',
    turns: [
      { speaker: 'A', en: "We're 80% done with phase one.", zh: '一期工作已经完成了 80%。' },
      { speaker: 'B', en: "Are we still on schedule?", zh: '还在计划内吗？' },
      { speaker: 'A', en: "Yes. The thing is, testing might take an extra week.", zh: '是的。问题是，测试可能要多花一周。' },
      { speaker: 'B', en: "Why the delay?", zh: '为什么延期？' },
      { speaker: 'A', en: "We found a critical bug in the payment flow.", zh: '我们在支付流程发现一个严重 bug。' },
      { speaker: 'B', en: "Got it, keep me posted.", zh: '了解，及时跟我同步。' },
    ],
  },
  {
    id: 'd-gym', title: 'At the Gym', titleZh: '在健身房', level: 'b1', icon: '🏋️', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Excuse me, can you spot me on this lift?", zh: '不好意思，能帮我保护一下吗？' },
      { speaker: 'B', en: "Sure, how many reps?", zh: '当然，做几个？' },
      { speaker: 'A', en: "Eight, but I might fail the last two.", zh: '8 个，最后两个可能撑不住。' },
      { speaker: 'B', en: "I'll keep my hands close. Ready?", zh: '我手放近点，准备好了吗？' },
      { speaker: 'A', en: "Ready. Thanks, man!", zh: '准备好了，多谢哥们！' },
    ],
  },
  {
    id: 'd-travel-plan', title: 'Planning a Trip', titleZh: '计划旅行', level: 'b1', icon: '🗺️', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Where should we go for the holiday?", zh: '假期我们去哪儿好？' },
      { speaker: 'B', en: "How about Japan? Cherry blossom season.", zh: '日本怎么样？樱花季。' },
      { speaker: 'A', en: "Sounds great. What's the budget?", zh: '不错啊，预算多少？' },
      { speaker: 'B', en: "Around 10,000 yuan per person.", zh: '人均 1 万。' },
      { speaker: 'A', en: "Should we book a tour or go on our own?", zh: '跟团还是自由行？' },
      { speaker: 'B', en: "If you ask me, self-guided gives more freedom.", zh: '要我说，自由行更灵活。' },
    ],
  },
  {
    id: 'd-feedback', title: 'Giving Feedback', titleZh: '反馈意见', level: 'b1', icon: '💬', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Can I give you some feedback on the report?", zh: '我能对那份报告提点意见吗？' },
      { speaker: 'B', en: "Sure, I'd love to hear it.", zh: '可以啊，洗耳恭听。' },
      { speaker: 'A', en: "The data section is strong, but the conclusion feels rushed.", zh: '数据部分很强，但结论部分有点仓促。' },
      { speaker: 'B', en: "I rushed it because of the deadline.", zh: '是赶 deadline 导致的。' },
      { speaker: 'A', en: "By the way, add two more lines explaining the impact.", zh: '顺便提一句，加两行说明影响就好了。' },
      { speaker: 'B', en: "Got it, I'll revise it tonight.", zh: '懂了，我今晚改。' },
    ],
  },
  {
    id: 'd-customer-service', title: 'Customer Service Call', titleZh: '客服投诉', level: 'b1', icon: '☎️', userRole: 'A',
    turns: [
      { speaker: 'A', en: "I'd like to complain about my recent order.", zh: '我想投诉一下最近的订单。' },
      { speaker: 'B', en: "I'm sorry to hear that. What happened?", zh: '抱歉听到这个，发生什么了？' },
      { speaker: 'A', en: "The product arrived broken.", zh: '商品到货时是坏的。' },
      { speaker: 'B', en: "Could you send a photo? I'll process a refund.", zh: '能发个照片吗？我帮您办理退款。' },
      { speaker: 'A', en: "Already sent. How long for the refund?", zh: '已经发了，多久能退到？' },
      { speaker: 'B', en: "Within three to five business days.", zh: '3 到 5 个工作日。' },
    ],
  },
  {
    id: 'd-small-talk', title: 'Office Small Talk', titleZh: '办公室闲聊', level: 'b1', icon: '☕', userRole: 'B',
    turns: [
      { speaker: 'A', en: "Long week, huh?", zh: '这一周真长啊。' },
      { speaker: 'B', en: "Yeah, two product launches back to back.", zh: '是啊，两个产品连续发布。' },
      { speaker: 'A', en: "Any plans for the weekend?", zh: '周末有什么安排吗？' },
      { speaker: 'B', en: "Just sleeping in, honestly.", zh: '说实话就想睡懒觉。' },
      { speaker: 'A', en: "Sounds like a good plan!", zh: '听起来不错！' },
    ],
  },
  {
    id: 'd-online-meeting', title: 'Joining a Video Meeting', titleZh: '加入视频会议', level: 'b1', icon: '💻', userRole: 'B',
    turns: [
      { speaker: 'A', en: "Can everyone hear me?", zh: '大家都能听到我吗？' },
      { speaker: 'B', en: "I can, but you sound a bit muffled.", zh: '我能听到，但有点闷。' },
      { speaker: 'A', en: "Is it better now?", zh: '现在好点了吗？' },
      { speaker: 'B', en: "Much better. Let's get started.", zh: '清楚多了，我们开始吧。' },
      { speaker: 'A', en: "Sharing my screen now.", zh: '我开始共享屏幕了。' },
    ],
  },
  {
    id: 'd-restaurant-complaint', title: 'Restaurant Complaint', titleZh: '餐厅投诉', level: 'b1', icon: '🍽️', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Excuse me, this steak is undercooked.", zh: '不好意思，这块牛排没熟。' },
      { speaker: 'B', en: "I'm so sorry. I'll have it remade.", zh: '非常抱歉，我让厨房重做。' },
      { speaker: 'A', en: "Could you also bring more water?", zh: '能再加点水吗？' },
      { speaker: 'B', en: "Of course. The new one will be out in five minutes.", zh: '当然，新的 5 分钟就好。' },
      { speaker: 'A', en: "Thank you, no rush.", zh: '谢谢，不急。' },
    ],
  },
  {
    id: 'd-buying-tickets', title: 'Buying Concert Tickets', titleZh: '买演唱会票', level: 'b1', icon: '🎤', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Are there any tickets left for Saturday?", zh: '周六的票还有吗？' },
      { speaker: 'B', en: "Only the back row. 380 yuan each.", zh: '只剩后排，每张 380 元。' },
      { speaker: 'A', en: "I'll take two. Can I pick a seat?", zh: '要两张，能选座吗？' },
      { speaker: 'B', en: "The system assigns automatically.", zh: '系统自动分配。' },
      { speaker: 'A', en: "Okay, here's my card.", zh: '好的，刷我的卡。' },
    ],
  },
  // ---- B2 雅思 ----
  {
    id: 'd-environment-debate', title: 'Talking About Environment', titleZh: '环保话题', level: 'b2', icon: '🌱', userRole: 'B',
    turns: [
      { speaker: 'A', en: "Plastic pollution is getting out of control.", zh: '塑料污染越来越失控。' },
      { speaker: 'B', en: "True. We need stricter recycling laws.", zh: '没错，需要更严的回收法规。' },
      { speaker: 'A', en: "But corporations rarely take responsibility.", zh: '但企业很少承担责任。' },
      { speaker: 'B', en: "Then again, consumer pressure can change that.", zh: '不过话说回来，消费者的压力能改变这一点。' },
      { speaker: 'A', en: "For instance, boycotting brands that don't comply.", zh: '比如说，抵制不合规的品牌。' },
      { speaker: 'B', en: "Exactly, that's where real change starts.", zh: '没错，真正的改变从这里开始。' },
    ],
  },
  {
    id: 'd-tech-talk', title: 'Discussing AI Future', titleZh: 'AI 未来讨论', level: 'b2', icon: '🤖', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Do you think AI will replace creative jobs?", zh: '你觉得 AI 会取代创意工作吗？' },
      { speaker: 'B', en: "Some, but creativity still needs human soul.", zh: '部分会，但创造力仍需要人类灵魂。' },
      { speaker: 'A', en: "AI generates art that fools experts though.", zh: 'AI 生成的画连专家都看不出。' },
      { speaker: 'B', en: "Generation isn't intention—context matters.", zh: '生成不等于意图，语境很重要。' },
      { speaker: 'A', en: "So humans will direct, AI will execute?", zh: '所以人主导，AI 执行？' },
      { speaker: 'B', en: "At the end of the day, that's the most likely outcome.", zh: '说到底，这是最可能的结果。' },
    ],
  },
  {
    id: 'd-money-philosophy', title: 'Money and Happiness', titleZh: '金钱与幸福', level: 'b2', icon: '💰', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Does money really buy happiness?", zh: '钱真的能买到快乐吗？' },
      { speaker: 'B', en: "Well, up to a point—after that it plateaus.", zh: '嗯，到一定程度后就稳定了。' },
      { speaker: 'A', en: "Studies say that point is around 75K USD.", zh: '研究说这个点大约是 7.5 万美元。' },
      { speaker: 'B', en: "Beyond that, relationships matter more.", zh: '再多就不如人际关系重要了。' },
      { speaker: 'A', en: "Still, financial freedom reduces stress.", zh: '但财务自由确实减少压力。' },
      { speaker: 'B', en: "Reducing stress is the real benefit.", zh: '减少压力才是真正的收益。' },
    ],
  },
  {
    id: 'd-education-debate', title: 'Online vs Offline School', titleZh: '在线 vs 线下教育', level: 'b2', icon: '🏫', userRole: 'B',
    turns: [
      { speaker: 'A', en: "Online learning gives more flexibility.", zh: '在线学习更灵活。' },
      { speaker: 'B', en: "But it lacks the social interaction.", zh: '但缺少社交互动。' },
      { speaker: 'A', en: "Many platforms include discussion forums.", zh: '很多平台有讨论区。' },
      { speaker: 'B', en: "Forum posts can't replace eye contact.", zh: '发帖代替不了眼神交流。' },
      { speaker: 'A', en: "Then maybe a hybrid model is best.", zh: '那混合模式可能最好。' },
      { speaker: 'B', en: "I'd agree with that compromise.", zh: '我同意这种折中方案。' },
    ],
  },
  {
    id: 'd-health-life', title: 'Healthy Lifestyle', titleZh: '健康生活方式', level: 'b2', icon: '🥗', userRole: 'A',
    turns: [
      { speaker: 'A', en: "I'm trying to cut down on processed food.", zh: '我在减少加工食品。' },
      { speaker: 'B', en: "Smart move. What's your strategy?", zh: '明智，怎么做的？' },
      { speaker: 'A', en: "Meal prepping fresh ingredients on weekends.", zh: '周末备好新鲜食材。' },
      { speaker: 'B', en: "Doesn't that take a lot of time?", zh: '不是挺花时间吗？' },
      { speaker: 'A', en: "Two hours saves me hours during the week.", zh: '花两小时能省下平日好几小时。' },
      { speaker: 'B', en: "I should try that too.", zh: '我也该试试。' },
    ],
  },
  {
    id: 'd-news-discuss', title: 'Discussing News', titleZh: '讨论新闻', level: 'b2', icon: '📰', userRole: 'B',
    turns: [
      { speaker: 'A', en: "Did you read about the new tax reform?", zh: '看了新税改的新闻吗？' },
      { speaker: 'B', en: "Yes, it could hurt small businesses.", zh: '看了，可能会伤到小企业。' },
      { speaker: 'A', en: "But it might benefit individuals.", zh: '但对个人可能有利。' },
      { speaker: 'B', en: "Net effect depends on your bracket.", zh: '总效应取决于你的税档。' },
      { speaker: 'A', en: "Time will tell, I guess.", zh: '看后续效果吧。' },
    ],
  },
  {
    id: 'd-startup', title: 'Startup Pitch', titleZh: '创业路演', level: 'b2', icon: '🚀', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Our product solves the freelancer payment problem.", zh: '我们解决自由职业者收款痛点。' },
      { speaker: 'B', en: "How is it different from existing solutions?", zh: '和现有方案有何不同？' },
      { speaker: 'A', en: "We charge 1% versus the industry's 3%.", zh: '我们收 1%，行业普遍 3%。' },
      { speaker: 'B', en: "What's your customer acquisition cost?", zh: '获客成本多少？' },
      { speaker: 'A', en: "Around 15 dollars, payback in two months.", zh: '约 15 美元，2 个月回本。' },
      { speaker: 'B', en: "Impressive. Let's talk numbers offline.", zh: '不错，我们线下细聊。' },
    ],
  },
  {
    id: 'd-culture-shock', title: 'Culture Shock', titleZh: '文化冲击', level: 'b2', icon: '🌏', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Coming to China was a culture shock at first.", zh: '刚来中国时有文化冲击。' },
      { speaker: 'B', en: "What surprised you most?", zh: '最让你惊讶的是什么？' },
      { speaker: 'A', en: "How everything is paid through phones.", zh: '什么都用手机付款。' },
      { speaker: 'B', en: "Yeah, even street vendors take WeChat Pay.", zh: '是啊，连小摊都收微信支付。' },
      { speaker: 'A', en: "I haven't used cash in months.", zh: '我好几个月没用现金了。' },
      { speaker: 'B', en: "Welcome to the cashless society.", zh: '欢迎来到无现金社会。' },
    ],
  },
  {
    id: 'd-mental-health', title: 'Mental Health Talk', titleZh: '心理健康话题', level: 'b2', icon: '🧠', userRole: 'B',
    turns: [
      { speaker: 'A', en: "Burnout has been a real issue at work.", zh: '工作中职业倦怠很严重。' },
      { speaker: 'B', en: "Have you tried disconnecting on weekends?", zh: '试过周末断网吗？' },
      { speaker: 'A', en: "I do, but emails pile up Monday morning.", zh: '试过，但周一邮件堆积。' },
      { speaker: 'B', en: "Set expectations with your team.", zh: '跟团队定好预期。' },
      { speaker: 'A', en: "Easier said than done.", zh: '说起来容易做起来难。' },
      { speaker: 'B', en: "Start small—one boundary at a time.", zh: '一次设一个边界，慢慢来。' },
    ],
  },
  // ---- C1 高级 ----
  {
    id: 'd-philosophy', title: 'Free Will vs Determinism', titleZh: '自由意志辩论', level: 'c1', icon: '🤔', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Do you believe in free will?", zh: '你相信自由意志吗？' },
      { speaker: 'B', en: "Partly—our choices are heavily conditioned.", zh: '部分相信，选择被很多条件限制。' },
      { speaker: 'A', en: "If conditioned, are they truly choices?", zh: '被限制的还能算选择吗？' },
      { speaker: 'B', en: "Within constraints, agency still operates.", zh: '在约束之内，能动性仍存在。' },
      { speaker: 'A', en: "That's a compatibilist view.", zh: '这是相容论的观点。' },
      { speaker: 'B', en: "Indeed, the most pragmatic stance.", zh: '是的，最务实的立场。' },
    ],
  },
  {
    id: 'd-policy-debate', title: 'Universal Basic Income', titleZh: '全民基本收入', level: 'c1', icon: '💵', userRole: 'B',
    turns: [
      { speaker: 'A', en: "UBI could redefine our relationship with work.", zh: 'UBI 可能重新定义人与工作的关系。' },
      { speaker: 'B', en: "Yet funding it sustainably remains uncertain.", zh: '但可持续的资金来源仍不明确。' },
      { speaker: 'A', en: "Pilot programs show promising mental-health outcomes.", zh: '试点项目显示心理健康效果显著。' },
      { speaker: 'B', en: "True, but scalability is another issue entirely.", zh: '没错，但规模化是另一回事。' },
      { speaker: 'A', en: "Perhaps a negative income tax is more feasible.", zh: '或许负所得税更可行。' },
      { speaker: 'B', en: "That hybrid approach has gained traction.", zh: '这种混合方案越来越受关注。' },
    ],
  },
  {
    id: 'd-academic-presentation', title: 'Academic Conference Q&A', titleZh: '学术答辩', level: 'c1', icon: '🎓', userRole: 'A',
    turns: [
      { speaker: 'A', en: "Our findings suggest a strong correlation.", zh: '我们的发现表明高度相关。' },
      { speaker: 'B', en: "But correlation doesn't imply causation.", zh: '但相关并不等于因果。' },
      { speaker: 'A', en: "Agreed; we controlled for confounders.", zh: '同意，我们控制了混杂变量。' },
      { speaker: 'B', en: "What about reverse causality?", zh: '那反向因果呢？' },
      { speaker: 'A', en: "We addressed it through longitudinal data.", zh: '我们用纵向数据来排除。' },
      { speaker: 'B', en: "Persuasive. I look forward to the publication.", zh: '有说服力，期待论文发表。' },
    ],
  },
  {
    id: 'd-negotiation', title: 'Salary Negotiation', titleZh: '薪资谈判', level: 'c1', icon: '🤝', userRole: 'B',
    turns: [
      { speaker: 'A', en: "We're prepared to offer 200K plus equity.", zh: '我们能提供 20 万加股权。' },
      { speaker: 'B', en: "Considering market data, I was hoping for 230K.", zh: '考虑市场行情，我希望是 23 万。' },
      { speaker: 'A', en: "That's outside our band, but we can match in equity.", zh: '超出我们薪酬带，但可以用股权补。' },
      { speaker: 'B', en: "Can we revisit base after the first review?", zh: '首次绩效后可以再调基本工资吗？' },
      { speaker: 'A', en: "We can write that into the offer.", zh: '可以写进 offer。' },
      { speaker: 'B', en: "Then we have a deal.", zh: '那就成交。' },
    ],
  },
  {
    id: 'd-art-critique', title: 'Discussing a Film', titleZh: '电影评论', level: 'c1', icon: '🎬', userRole: 'A',
    turns: [
      { speaker: 'A', en: "The cinematography was breathtaking.", zh: '摄影令人惊艳。' },
      { speaker: 'B', en: "But the narrative felt fragmented.", zh: '但叙事有些碎片化。' },
      { speaker: 'A', en: "Maybe intentional—mirroring the protagonist's psyche.", zh: '可能是刻意的——映射主角的心理。' },
      { speaker: 'B', en: "Plausible, though it risks alienating viewers.", zh: '合理，但有疏离观众的风险。' },
      { speaker: 'A', en: "Art-house films often demand patience.", zh: '艺术片通常要求观众耐心。' },
      { speaker: 'B', en: "True; reward comes through reflection.", zh: '没错，回报来自反思。' },
    ],
  },

  // ============ A1 日常扩充 ============
  {
    id: 'd-restaurant-1', title: 'At a Restaurant', titleZh: '餐厅点菜', level: 'a1', icon: '🍽️', userRole: 'A',
    turns: [
      { speaker: 'A', en: 'Table for two, please.', zh: '两位，谢谢。' },
      { speaker: 'B', en: 'Sure. Here is the menu.', zh: '好的，这是菜单。' },
      { speaker: 'A', en: 'What do you recommend?', zh: '您推荐什么？' },
      { speaker: 'B', en: 'Our pasta is very popular.', zh: '我们的意面很受欢迎。' },
      { speaker: 'A', en: 'Great. I will have the pasta, please.', zh: '好的，请来一份意面。' },
    ],
  },
  {
    id: 'd-shopping-1', title: 'Buying Clothes', titleZh: '买衣服', level: 'a1', icon: '👕', userRole: 'A',
    turns: [
      { speaker: 'A', en: 'Excuse me, do you have this in medium?', zh: '请问有中号吗？' },
      { speaker: 'B', en: 'Let me check… Yes, here you are.', zh: '我看看……有的，给您。' },
      { speaker: 'A', en: 'Can I try it on?', zh: '我能试穿吗？' },
      { speaker: 'B', en: 'Of course. The fitting room is over there.', zh: '当然，试衣间在那边。' },
      { speaker: 'A', en: 'It fits well. I will take it.', zh: '很合身，我要了。' },
    ],
  },
  {
    id: 'd-directions-1', title: 'Asking Directions', titleZh: '问路', level: 'a1', icon: '🗺️', userRole: 'A',
    turns: [
      { speaker: 'A', en: 'Excuse me, where is the subway station?', zh: '请问地铁站在哪？' },
      { speaker: 'B', en: 'Go straight and turn left.', zh: '直走然后左转。' },
      { speaker: 'A', en: 'Is it far from here?', zh: '离这儿远吗？' },
      { speaker: 'B', en: 'No, about five minutes on foot.', zh: '不远，走路大约五分钟。' },
      { speaker: 'A', en: 'Thank you so much!', zh: '非常感谢！' },
    ],
  },
  {
    id: 'd-phone-1', title: 'Phone Call', titleZh: '打电话', level: 'a1', icon: '📞', userRole: 'A',
    turns: [
      { speaker: 'A', en: 'Hi, is Tom there?', zh: '你好，Tom 在吗？' },
      { speaker: 'B', en: 'Sorry, he is not available right now.', zh: '抱歉，他现在不方便。' },
      { speaker: 'A', en: 'Can I leave a message?', zh: '我能留个言吗？' },
      { speaker: 'B', en: 'Sure. What is your name?', zh: '可以，您叫什么？' },
      { speaker: 'A', en: 'This is Anna. Please tell him to call me back.', zh: '我是 Anna，请让他回电。' },
    ],
  },
  {
    id: 'd-weather-1', title: 'Talking Weather', titleZh: '聊天气', level: 'a1', icon: '🌧️', userRole: 'B',
    turns: [
      { speaker: 'A', en: 'It looks like rain today.', zh: '今天好像要下雨。' },
      { speaker: 'B', en: 'Yes, I should bring an umbrella.', zh: '是啊，我该带把伞。' },
      { speaker: 'A', en: 'The temperature dropped a lot.', zh: '气温降了好多。' },
      { speaker: 'B', en: 'True. I will wear a jacket.', zh: '是啊，我穿件外套。' },
    ],
  },
  {
    id: 'd-apartment-1', title: 'Renting an Apartment', titleZh: '租房咨询', level: 'a2', icon: '🏠', userRole: 'A',
    turns: [
      { speaker: 'A', en: 'I saw your listing online. Is it still available?', zh: '我在网上看到房源，还能租吗？' },
      { speaker: 'B', en: 'Yes, you can visit this weekend.', zh: '可以，这周末能看房。' },
      { speaker: 'A', en: 'How much is the rent per month?', zh: '月租多少？' },
      { speaker: 'B', en: 'Three thousand, utilities not included.', zh: '三千，不含水电。' },
      { speaker: 'A', en: 'Okay. Can I schedule a viewing?', zh: '好的，能预约看房吗？' },
    ],
  },
];

export function getDialoguesByLevel(level) {
  return DIALOGUES.filter((d) => d.level === level);
}
