// @ts-nocheck
// TPRS 故事库 · 批次 3(扩量)
// ----------------------------------------------------------------------------
// 方法学溯源(红线七, 与批次 1/2 一致):
//   Ray, B. & Seely, C. (2004). Fluency Through TPR Storytelling (5th ed.).
//     Command Performance Language Institute. ISBN 0-929724-24-X
//   Krashen, S. D. (1985). The Input Hypothesis: Issues and Implications. Longman.
//
// 编写纪律(与批次 1/2 同规格, 不降标准):
//   1. 情节遵循 TPRS 经典模板: 人物 → 想要 → 障碍 → 解决
//   2. targetPhrases 每故事 3 个以内(Krashen i+1, 防认知超载)
//   3. circling 三层次: yes_no → either_or → wh, 每个目标句配 2–3 问
//   4. choices 干扰项取自同故事语境(合理但错), 不放荒谬选项
//   5. 故事内容原创; 中文为自然意译

export const TPRS_STORIES_BATCH_3 = [
  // ============================================================
  // A1 · The Lost Key
  // ============================================================
  {
    id: 'a1-lost-key',
    cefr: 'A1',
    titleEn: 'The Lost Key',
    titleZh: '丢了的钥匙',
    minutes: 3,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 模板（人物→欲望→障碍→解决）',
    targetPhrases: [
      { en: 'cannot find', zh: '找不到', cefr: 'A1' },
      { en: 'looks for', zh: '寻找', cefr: 'A1' },
      { en: 'is happy', zh: '很开心', cefr: 'A1' },
    ],
    sentences: [
      { en: 'This is Tom.', zh: '这是汤姆。', keyPhrase: null },
      { en: 'Tom wants to open the door.', zh: '汤姆想开门。', keyPhrase: null },
      { en: 'Tom cannot find his key.', zh: '汤姆找不到他的钥匙。', keyPhrase: 'cannot find' },
      { en: 'Tom looks for the key in his bag.', zh: '汤姆在包里找钥匙。', keyPhrase: 'looks for' },
      { en: 'The key is not in his bag.', zh: '钥匙不在他包里。', keyPhrase: null },
      { en: 'Tom looks for the key in his coat.', zh: '汤姆在外套里找钥匙。', keyPhrase: 'looks for' },
      { en: 'The key is in his coat!', zh: '钥匙在他外套里！', keyPhrase: null },
      { en: 'Tom opens the door.', zh: '汤姆打开了门。', keyPhrase: null },
      { en: 'Tom is happy.', zh: '汤姆很开心。', keyPhrase: 'is happy' },
    ],
    pqa: [
      { en: 'Do you have a key with you?', zh: '你身上带钥匙了吗？' },
      { en: 'Do you sometimes lose things?', zh: '你有时会丢东西吗？' },
    ],
    circling: [
      {
        targetSentence: 'Tom cannot find his key.',
        type: 'yes_no',
        question: 'Can Tom find his key?',
        questionZh: '汤姆找到钥匙了吗？',
        answer: 'No, Tom cannot find his key.',
        answerZh: '没有，汤姆找不到钥匙。',
        choices: ['No, Tom cannot find his key.', 'Yes, Tom can find his key.'],
      },
      {
        targetSentence: 'Tom cannot find his key.',
        type: 'either_or',
        question: 'Does Tom lose his key or his bag?',
        questionZh: '汤姆丢的是钥匙还是包？',
        answer: 'Tom loses his key.',
        answerZh: '汤姆丢的是钥匙。',
        choices: ['Tom loses his key.', 'Tom loses his bag.'],
      },
      {
        targetSentence: 'The key is in his coat!',
        type: 'wh',
        question: 'Where is the key?',
        questionZh: '钥匙在哪里？',
        answer: 'The key is in his coat.',
        answerZh: '钥匙在他外套里。',
        choices: ['The key is in his coat.', 'The key is in his bag.', 'The key is in the door.'],
      },
      {
        targetSentence: 'Tom is happy.',
        type: 'yes_no',
        question: 'Is Tom happy at the end?',
        questionZh: '最后汤姆开心吗？',
        answer: 'Yes, Tom is happy.',
        answerZh: '是的，汤姆很开心。',
        choices: ['Yes, Tom is happy.', 'No, Tom is sad.'],
      },
    ],
  },

  // ============================================================
  // A1 · The Little Bird
  // ============================================================
  {
    id: 'a1-little-bird',
    cefr: 'A1',
    titleEn: 'The Little Bird',
    titleZh: '小鸟',
    minutes: 3,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 模板',
    targetPhrases: [
      { en: 'wants to fly', zh: '想飞', cefr: 'A1' },
      { en: 'is afraid', zh: '害怕', cefr: 'A1' },
      { en: 'tries again', zh: '再试一次', cefr: 'A1' },
    ],
    sentences: [
      { en: 'This is a little bird.', zh: '这是一只小鸟。', keyPhrase: null },
      { en: 'The bird wants to fly.', zh: '小鸟想飞。', keyPhrase: 'wants to fly' },
      { en: 'The bird looks down.', zh: '小鸟往下看。', keyPhrase: null },
      { en: 'The bird is afraid.', zh: '小鸟害怕了。', keyPhrase: 'is afraid' },
      { en: 'The mother bird says, "You can do it."', zh: '鸟妈妈说：“你可以的。”', keyPhrase: null },
      { en: 'The bird tries again.', zh: '小鸟再试一次。', keyPhrase: 'tries again' },
      { en: 'Now the bird can fly!', zh: '现在小鸟会飞了！', keyPhrase: null },
    ],
    pqa: [
      { en: 'Are you afraid of high places?', zh: '你怕高吗？' },
      { en: 'Do you try again when something is hard?', zh: '事情难的时候你会再试一次吗？' },
    ],
    circling: [
      {
        targetSentence: 'The bird wants to fly.',
        type: 'yes_no',
        question: 'Does the bird want to fly?',
        questionZh: '小鸟想飞吗？',
        answer: 'Yes, the bird wants to fly.',
        answerZh: '是的，小鸟想飞。',
        choices: ['Yes, the bird wants to fly.', 'No, the bird wants to sleep.'],
      },
      {
        targetSentence: 'The bird is afraid.',
        type: 'either_or',
        question: 'Is the bird afraid or happy?',
        questionZh: '小鸟是害怕还是开心？',
        answer: 'The bird is afraid.',
        answerZh: '小鸟害怕。',
        choices: ['The bird is afraid.', 'The bird is happy.'],
      },
      {
        targetSentence: 'The mother bird says, "You can do it."',
        type: 'wh',
        question: 'Who helps the little bird?',
        questionZh: '谁帮助了小鸟？',
        answer: 'The mother bird helps the little bird.',
        answerZh: '鸟妈妈帮助了小鸟。',
        choices: ['The mother bird helps the little bird.', 'A cat helps the little bird.', 'A boy helps the little bird.'],
      },
    ],
  },

  // ============================================================
  // A2 · The Late Bus
  // ============================================================
  {
    id: 'a2-late-bus',
    cefr: 'A2',
    titleEn: 'The Late Bus',
    titleZh: '迟到的公交车',
    minutes: 4,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 模板',
    targetPhrases: [
      { en: 'was waiting', zh: '正在等', cefr: 'A2' },
      { en: 'missed the bus', zh: '错过了公交车', cefr: 'A2' },
      { en: 'decided to walk', zh: '决定走路', cefr: 'A2' },
    ],
    sentences: [
      { en: 'Lily had an exam at nine.', zh: '莉莉九点有考试。', keyPhrase: null },
      { en: 'She was waiting at the bus stop.', zh: '她在公交站等车。', keyPhrase: 'was waiting' },
      { en: 'The bus did not come.', zh: '公交车没有来。', keyPhrase: null },
      { en: 'Lily missed the bus.', zh: '莉莉错过了公交车。', keyPhrase: 'missed the bus' },
      { en: 'She decided to walk to school.', zh: '她决定走路去学校。', keyPhrase: 'decided to walk' },
      { en: 'She walked very fast.', zh: '她走得非常快。', keyPhrase: null },
      { en: 'Lily arrived five minutes early.', zh: '莉莉早到了五分钟。', keyPhrase: null },
      { en: 'She was tired but proud.', zh: '她很累但很自豪。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Have you ever missed a bus?', zh: '你错过过公交车吗？' },
      { en: 'Do you walk or take the bus to work?', zh: '你上班是走路还是坐公交？' },
    ],
    circling: [
      {
        targetSentence: 'Lily missed the bus.',
        type: 'yes_no',
        question: 'Did Lily miss the bus?',
        questionZh: '莉莉错过公交车了吗？',
        answer: 'Yes, Lily missed the bus.',
        answerZh: '是的，莉莉错过了公交车。',
        choices: ['Yes, Lily missed the bus.', 'No, Lily took the bus.'],
      },
      {
        targetSentence: 'She decided to walk to school.',
        type: 'either_or',
        question: 'Did she decide to walk or to go home?',
        questionZh: '她决定走路还是回家？',
        answer: 'She decided to walk to school.',
        answerZh: '她决定走路去学校。',
        choices: ['She decided to walk to school.', 'She decided to go home.'],
      },
      {
        targetSentence: 'Lily arrived five minutes early.',
        type: 'wh',
        question: 'When did Lily arrive?',
        questionZh: '莉莉什么时候到的？',
        answer: 'Lily arrived five minutes early.',
        answerZh: '莉莉早到了五分钟。',
        choices: ['Lily arrived five minutes early.', 'Lily arrived ten minutes late.', 'Lily arrived at ten.'],
      },
    ],
  },

  // ============================================================
  // A2 · The Broken Phone
  // ============================================================
  {
    id: 'a2-broken-phone',
    cefr: 'A2',
    titleEn: 'The Broken Phone',
    titleZh: '摔坏的手机',
    minutes: 4,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 模板',
    targetPhrases: [
      { en: 'dropped it', zh: '把它掉了', cefr: 'A2' },
      { en: 'took it to', zh: '把它拿到', cefr: 'A2' },
      { en: 'saved money', zh: '省下钱', cefr: 'A2' },
    ],
    sentences: [
      { en: 'Ben was running for the train.', zh: '本正跑着去赶火车。', keyPhrase: null },
      { en: 'His phone fell out of his pocket.', zh: '他的手机从口袋里掉了出来。', keyPhrase: null },
      { en: 'He dropped it on the hard floor.', zh: '他把它掉在了硬地板上。', keyPhrase: 'dropped it' },
      { en: 'The screen was broken.', zh: '屏幕碎了。', keyPhrase: null },
      { en: 'Ben took it to a small repair shop.', zh: '本把它拿到一家小修理店。', keyPhrase: 'took it to' },
      { en: 'The repair cost only twenty dollars.', zh: '维修只花了二十美元。', keyPhrase: null },
      { en: 'Ben saved money for a new bike.', zh: '本省下钱买了辆新自行车。', keyPhrase: 'saved money' },
    ],
    pqa: [
      { en: 'Have you ever broken a phone?', zh: '你摔坏过手机吗？' },
      { en: 'Do you repair things or buy new ones?', zh: '你会修东西还是直接买新的？' },
    ],
    circling: [
      {
        targetSentence: 'He dropped it on the hard floor.',
        type: 'yes_no',
        question: 'Did Ben drop his phone?',
        questionZh: '本把手机掉了吗？',
        answer: 'Yes, Ben dropped his phone.',
        answerZh: '是的，本把手机掉了。',
        choices: ['Yes, Ben dropped his phone.', 'No, Ben kept his phone safe.'],
      },
      {
        targetSentence: 'Ben took it to a small repair shop.',
        type: 'wh',
        question: 'Where did Ben take the phone?',
        questionZh: '本把手机拿到哪里了？',
        answer: 'Ben took it to a small repair shop.',
        answerZh: '本把它拿到一家小修理店。',
        choices: ['Ben took it to a small repair shop.', 'Ben took it to the train station.', 'Ben took it to school.'],
      },
      {
        targetSentence: 'The repair cost only twenty dollars.',
        type: 'either_or',
        question: 'Did the repair cost twenty or two hundred dollars?',
        questionZh: '维修花了二十还是两百美元？',
        answer: 'The repair cost twenty dollars.',
        answerZh: '维修花了二十美元。',
        choices: ['The repair cost twenty dollars.', 'The repair cost two hundred dollars.'],
      },
    ],
  },

  // ============================================================
  // A2 · The New Neighbour
  // ============================================================
  {
    id: 'a2-new-neighbour',
    cefr: 'A2',
    titleEn: 'The New Neighbour',
    titleZh: '新邻居',
    minutes: 4,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 模板',
    targetPhrases: [
      { en: 'moved in', zh: '搬进来', cefr: 'A2' },
      { en: 'knocked on the door', zh: '敲门', cefr: 'A2' },
      { en: 'felt welcome', zh: '感到受欢迎', cefr: 'A2' },
    ],
    sentences: [
      { en: 'A woman moved in next door.', zh: '一位女士搬进了隔壁。', keyPhrase: 'moved in' },
      { en: 'She did not know anyone in the building.', zh: '她在这栋楼里谁也不认识。', keyPhrase: null },
      { en: 'Anna baked a small cake.', zh: '安娜烤了一个小蛋糕。', keyPhrase: null },
      { en: 'Anna knocked on the door.', zh: '安娜敲了门。', keyPhrase: 'knocked on the door' },
      { en: 'They talked for an hour.', zh: '她们聊了一个小时。', keyPhrase: null },
      { en: 'The new neighbour felt welcome.', zh: '新邻居感到受欢迎。', keyPhrase: 'felt welcome' },
      { en: 'Now they have tea every Friday.', zh: '现在她们每周五一起喝茶。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Do you know your neighbours?', zh: '你认识你的邻居吗？' },
      { en: 'What would you do for a new neighbour?', zh: '你会为新邻居做什么？' },
    ],
    circling: [
      {
        targetSentence: 'Anna knocked on the door.',
        type: 'wh',
        question: 'Who knocked on the door?',
        questionZh: '谁敲了门？',
        answer: 'Anna knocked on the door.',
        answerZh: '安娜敲了门。',
        choices: ['Anna knocked on the door.', 'The new neighbour knocked on the door.', 'Nobody knocked on the door.'],
      },
      {
        targetSentence: 'Anna baked a small cake.',
        type: 'either_or',
        question: 'Did Anna bake a cake or buy flowers?',
        questionZh: '安娜是烤了蛋糕还是买了花？',
        answer: 'Anna baked a cake.',
        answerZh: '安娜烤了蛋糕。',
        choices: ['Anna baked a cake.', 'Anna bought flowers.'],
      },
      {
        targetSentence: 'The new neighbour felt welcome.',
        type: 'yes_no',
        question: 'Did the new neighbour feel welcome?',
        questionZh: '新邻居感到受欢迎吗？',
        answer: 'Yes, she felt welcome.',
        answerZh: '是的，她感到受欢迎。',
        choices: ['Yes, she felt welcome.', 'No, she felt lonely.'],
      },
    ],
  },

  // ============================================================
  // B1 · The Job Offer
  // ============================================================
  {
    id: 'b1-job-offer',
    cefr: 'B1',
    titleEn: 'The Difficult Choice',
    titleZh: '艰难的选择',
    minutes: 5,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 模板',
    targetPhrases: [
      { en: 'was offered', zh: '被提供(机会)', cefr: 'B1' },
      { en: 'turned it down', zh: '拒绝了它', cefr: 'B1' },
      { en: 'has never regretted', zh: '从未后悔', cefr: 'B1' },
    ],
    sentences: [
      { en: 'Mei was offered a job in another city.', zh: '梅被提供了另一个城市的工作。', keyPhrase: 'was offered' },
      { en: 'The salary was much higher than her current one.', zh: '薪水比她现在的高很多。', keyPhrase: null },
      { en: 'However, her mother was ill.', zh: '然而，她母亲生病了。', keyPhrase: null },
      { en: 'Mei thought about it for a whole week.', zh: '梅想了整整一周。', keyPhrase: null },
      { en: 'In the end, she turned it down.', zh: '最后，她拒绝了这份工作。', keyPhrase: 'turned it down' },
      { en: 'She found a smaller job near home instead.', zh: '她转而在家附近找了份小一点的工作。', keyPhrase: null },
      { en: 'Two years later, her mother is well again.', zh: '两年后，她母亲康复了。', keyPhrase: null },
      { en: 'Mei has never regretted her decision.', zh: '梅从未后悔她的决定。', keyPhrase: 'has never regretted' },
    ],
    pqa: [
      { en: 'Have you ever had to make a difficult choice?', zh: '你曾必须做艰难的选择吗？' },
      { en: 'Would you move to another city for a better job?', zh: '你会为更好的工作搬到另一个城市吗？' },
    ],
    circling: [
      {
        targetSentence: 'Mei was offered a job in another city.',
        type: 'wh',
        question: 'What was Mei offered?',
        questionZh: '梅得到了什么机会？',
        answer: 'She was offered a job in another city.',
        answerZh: '她被提供了另一个城市的工作。',
        choices: ['She was offered a job in another city.', 'She was offered a place at university.', 'She was offered a new house.'],
      },
      {
        targetSentence: 'In the end, she turned it down.',
        type: 'yes_no',
        question: 'Did Mei accept the job?',
        questionZh: '梅接受了那份工作吗？',
        answer: 'No, she turned it down.',
        answerZh: '没有，她拒绝了。',
        choices: ['No, she turned it down.', 'Yes, she accepted it.'],
      },
      {
        targetSentence: 'However, her mother was ill.',
        type: 'either_or',
        question: 'Did she stay because of her mother or because of money?',
        questionZh: '她留下是因为母亲还是因为钱？',
        answer: 'She stayed because of her mother.',
        answerZh: '她因为母亲而留下。',
        choices: ['She stayed because of her mother.', 'She stayed because of money.'],
      },
      {
        targetSentence: 'Mei has never regretted her decision.',
        type: 'yes_no',
        question: 'Does Mei regret her decision?',
        questionZh: '梅后悔她的决定吗？',
        answer: 'No, she has never regretted it.',
        answerZh: '不，她从未后悔。',
        choices: ['No, she has never regretted it.', 'Yes, she regrets it a lot.'],
      },
    ],
  },

  // ============================================================
  // B1 · The Rainy Wedding
  // ============================================================
  {
    id: 'b1-rainy-wedding',
    cefr: 'B1',
    titleEn: 'The Rainy Wedding',
    titleZh: '雨中的婚礼',
    minutes: 5,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 模板',
    targetPhrases: [
      { en: 'had planned', zh: '原本计划', cefr: 'B1' },
      { en: 'turned out', zh: '结果变成', cefr: 'B1' },
      { en: 'would not change', zh: '不会改变', cefr: 'B1' },
    ],
    sentences: [
      { en: 'Sara and Jun had planned an outdoor wedding.', zh: '萨拉和君原本计划办户外婚礼。', keyPhrase: 'had planned' },
      { en: 'On the morning of the wedding, it started to rain.', zh: '婚礼当天早上，下起了雨。', keyPhrase: null },
      { en: 'Their guests moved into a small restaurant.', zh: '客人们搬进了一家小餐馆。', keyPhrase: null },
      { en: 'The room was crowded and warm.', zh: '房间又挤又温暖。', keyPhrase: null },
      { en: 'Everyone sat close together and laughed.', zh: '大家紧挨着坐，笑个不停。', keyPhrase: null },
      { en: 'The day turned out better than expected.', zh: '这一天结果比预想的更好。', keyPhrase: 'turned out' },
      { en: 'Sara says she would not change a thing.', zh: '萨拉说她一点都不想改。', keyPhrase: 'would not change' },
    ],
    pqa: [
      { en: 'Has rain ever changed your plans?', zh: '下雨改变过你的计划吗？' },
      { en: 'Do you prefer big parties or small ones?', zh: '你更喜欢大聚会还是小聚会？' },
    ],
    circling: [
      {
        targetSentence: 'Sara and Jun had planned an outdoor wedding.',
        type: 'either_or',
        question: 'Had they planned an outdoor or an indoor wedding?',
        questionZh: '他们原本计划户外还是室内婚礼？',
        answer: 'They had planned an outdoor wedding.',
        answerZh: '他们原本计划户外婚礼。',
        choices: ['They had planned an outdoor wedding.', 'They had planned an indoor wedding.'],
      },
      {
        targetSentence: 'Their guests moved into a small restaurant.',
        type: 'wh',
        question: 'Where did the guests go?',
        questionZh: '客人们去了哪里？',
        answer: 'They moved into a small restaurant.',
        answerZh: '他们搬进了一家小餐馆。',
        choices: ['They moved into a small restaurant.', 'They went home.', 'They stayed in the garden.'],
      },
      {
        targetSentence: 'The day turned out better than expected.',
        type: 'yes_no',
        question: 'Did the day turn out well?',
        questionZh: '这一天结果好吗？',
        answer: 'Yes, it turned out better than expected.',
        answerZh: '是的，比预想的更好。',
        choices: ['Yes, it turned out better than expected.', 'No, it was a disaster.'],
      },
    ],
  },

  // ============================================================
  // B1 · Learning to Say No
  // ============================================================
  {
    id: 'b1-saying-no',
    cefr: 'B1',
    titleEn: 'Learning to Say No',
    titleZh: '学会说不',
    minutes: 5,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 模板',
    targetPhrases: [
      { en: 'used to say yes', zh: '过去总是答应', cefr: 'B1' },
      { en: 'was exhausted', zh: '累坏了', cefr: 'B1' },
      { en: 'set limits', zh: '设立界限', cefr: 'B1' },
    ],
    sentences: [
      { en: 'Daniel used to say yes to every request.', zh: '丹尼尔过去对每个请求都答应。', keyPhrase: 'used to say yes' },
      { en: 'He worked late almost every evening.', zh: '他几乎每天晚上都加班。', keyPhrase: null },
      { en: 'After a month, he was exhausted.', zh: '一个月后，他累坏了。', keyPhrase: 'was exhausted' },
      { en: 'A colleague told him to set limits.', zh: '一位同事叫他设立界限。', keyPhrase: 'set limits' },
      { en: 'The next week, Daniel said no twice.', zh: '第二周，丹尼尔拒绝了两次。', keyPhrase: null },
      { en: 'Nobody was angry with him.', zh: '没有人对他生气。', keyPhrase: null },
      { en: 'His work actually improved.', zh: '他的工作实际上变好了。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Is it hard for you to say no?', zh: '对你来说说不难吗？' },
      { en: 'Do you often work late?', zh: '你经常加班吗？' },
    ],
    circling: [
      {
        targetSentence: 'Daniel used to say yes to every request.',
        type: 'yes_no',
        question: 'Did Daniel use to say yes to everything?',
        questionZh: '丹尼尔过去什么都答应吗？',
        answer: 'Yes, he used to say yes to everything.',
        answerZh: '是的，他过去什么都答应。',
        choices: ['Yes, he used to say yes to everything.', 'No, he always said no.'],
      },
      {
        targetSentence: 'A colleague told him to set limits.',
        type: 'wh',
        question: 'Who told him to set limits?',
        questionZh: '谁叫他设立界限？',
        answer: 'A colleague told him to set limits.',
        answerZh: '一位同事叫他设立界限。',
        choices: ['A colleague told him to set limits.', 'His mother told him to set limits.', 'His boss told him to set limits.'],
      },
      {
        targetSentence: 'His work actually improved.',
        type: 'either_or',
        question: 'Did his work improve or get worse?',
        questionZh: '他的工作变好了还是变差了？',
        answer: 'His work improved.',
        answerZh: '他的工作变好了。',
        choices: ['His work improved.', 'His work got worse.'],
      },
    ],
  },

  // ============================================================
  // B2 · The Second Language
  // ============================================================
  {
    id: 'b2-second-language',
    cefr: 'B2',
    titleEn: 'The Silent Year',
    titleZh: '沉默的一年',
    minutes: 6,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 模板',
    targetPhrases: [
      { en: 'was reluctant to speak', zh: '不愿开口', cefr: 'B2' },
      { en: 'immersed himself in', zh: '让自己沉浸于', cefr: 'B2' },
      { en: 'to his own surprise', zh: '让他自己都惊讶', cefr: 'B2' },
    ],
    sentences: [
      { en: 'When Omar moved abroad, he understood almost nothing.', zh: '奥马尔刚出国时，几乎什么都听不懂。', keyPhrase: null },
      { en: 'He was reluctant to speak in front of others.', zh: '他不愿在别人面前开口。', keyPhrase: 'was reluctant to speak' },
      { en: 'Instead of studying grammar rules, he immersed himself in daily life.', zh: '他没有死记语法规则，而是让自己沉浸在日常生活中。', keyPhrase: 'immersed himself in' },
      { en: 'He listened to the radio while cooking and repeated whole phrases aloud.', zh: '他做饭时听广播，并大声重复整段短语。', keyPhrase: null },
      { en: 'For nearly a year he mostly listened.', zh: '将近一年里他主要在听。', keyPhrase: null },
      { en: 'Then, to his own surprise, the words began to come out naturally.', zh: '然后，让他自己都惊讶的是，话开始自然地说出来了。', keyPhrase: 'to his own surprise' },
      { en: 'His accent was far from perfect, but people understood him.', zh: '他的口音远不完美，但人们听得懂他。', keyPhrase: null },
      { en: 'That, he says, was the moment he stopped being afraid.', zh: '他说，那就是他不再害怕的时刻。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Do you feel nervous speaking English in front of others?', zh: '在别人面前说英语你会紧张吗？' },
      { en: 'Do you learn more from listening or from grammar books?', zh: '你从听力还是语法书里学得更多？' },
    ],
    circling: [
      {
        targetSentence: 'He was reluctant to speak in front of others.',
        type: 'yes_no',
        question: 'Was Omar happy to speak at first?',
        questionZh: '奥马尔起初乐意开口吗？',
        answer: 'No, he was reluctant to speak.',
        answerZh: '不，他不愿开口。',
        choices: ['No, he was reluctant to speak.', 'Yes, he spoke confidently from the start.'],
      },
      {
        targetSentence: 'Instead of studying grammar rules, he immersed himself in daily life.',
        type: 'either_or',
        question: 'Did he focus on grammar rules or on daily life?',
        questionZh: '他专注于语法规则还是日常生活？',
        answer: 'He focused on daily life.',
        answerZh: '他专注于日常生活。',
        choices: ['He focused on daily life.', 'He focused on grammar rules.'],
      },
      {
        targetSentence: 'For nearly a year he mostly listened.',
        type: 'wh',
        question: 'How long did he mostly listen?',
        questionZh: '他主要在听持续了多久？',
        answer: 'For nearly a year.',
        answerZh: '将近一年。',
        choices: ['For nearly a year.', 'For one week.', 'For five years.'],
      },
      {
        targetSentence: 'His accent was far from perfect, but people understood him.',
        type: 'yes_no',
        question: 'Did people understand him even with an imperfect accent?',
        questionZh: '尽管口音不完美，人们听得懂他吗？',
        answer: 'Yes, people understood him.',
        answerZh: '是的，人们听得懂他。',
        choices: ['Yes, people understood him.', 'No, nobody understood him.'],
      },
    ],
  },

  // ============================================================
  // B2 · The Small Shop
  // ============================================================
  {
    id: 'b2-small-shop',
    cefr: 'B2',
    titleEn: 'The Shop That Survived',
    titleZh: '活下来的小店',
    minutes: 6,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 模板',
    targetPhrases: [
      { en: 'on the verge of closing', zh: '快要倒闭', cefr: 'B2' },
      { en: 'came up with', zh: '想出(办法)', cefr: 'B2' },
      { en: 'word spread', zh: '口碑传开', cefr: 'B2' },
    ],
    sentences: [
      { en: 'Mrs. Chen had run a small bookshop for thirty years.', zh: '陈太太经营一家小书店三十年了。', keyPhrase: null },
      { en: 'When a large chain store opened nearby, her sales dropped by half.', zh: '附近开了一家大连锁店后，她的销售额腰斩。', keyPhrase: null },
      { en: 'Within a year the shop was on the verge of closing.', zh: '不到一年，这家店就快要倒闭了。', keyPhrase: 'on the verge of closing' },
      { en: 'Rather than lowering her prices, she came up with a different idea.', zh: '她没有降价，而是想出了一个不同的办法。', keyPhrase: 'came up with' },
      { en: 'Every Saturday she invited a local writer to read aloud.', zh: '每个周六她邀请一位本地作家来朗读。', keyPhrase: null },
      { en: 'Parents brought their children, and word spread quickly.', zh: '家长带着孩子来，口碑很快传开。', keyPhrase: 'word spread' },
      { en: 'The chain store sold more books, but her shop had something it could not copy.', zh: '连锁店卖出更多书，但她的店有连锁店复制不了的东西。', keyPhrase: null },
      { en: 'Ten years later, the bookshop is still open.', zh: '十年后，这家书店依然开着。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Do you prefer small shops or big stores?', zh: '你更喜欢小店还是大商场？' },
      { en: 'What makes a small business special?', zh: '什么让小生意变得特别？' },
    ],
    circling: [
      {
        targetSentence: 'Within a year the shop was on the verge of closing.',
        type: 'yes_no',
        question: 'Was the shop close to closing?',
        questionZh: '这家店快倒闭了吗？',
        answer: 'Yes, it was on the verge of closing.',
        answerZh: '是的，它快要倒闭了。',
        choices: ['Yes, it was on the verge of closing.', 'No, business was excellent.'],
      },
      {
        targetSentence: 'Rather than lowering her prices, she came up with a different idea.',
        type: 'either_or',
        question: 'Did she lower prices or try a new idea?',
        questionZh: '她是降价还是尝试新办法？',
        answer: 'She tried a new idea.',
        answerZh: '她尝试了新办法。',
        choices: ['She tried a new idea.', 'She lowered her prices.'],
      },
      {
        targetSentence: 'Every Saturday she invited a local writer to read aloud.',
        type: 'wh',
        question: 'Who did she invite on Saturdays?',
        questionZh: '她周六邀请谁？',
        answer: 'She invited a local writer.',
        answerZh: '她邀请一位本地作家。',
        choices: ['She invited a local writer.', 'She invited a famous singer.', 'She invited the chain store manager.'],
      },
      {
        targetSentence: 'Ten years later, the bookshop is still open.',
        type: 'yes_no',
        question: 'Is the bookshop still open today?',
        questionZh: '这家书店今天还开着吗？',
        answer: 'Yes, it is still open.',
        answerZh: '是的，它还开着。',
        choices: ['Yes, it is still open.', 'No, it closed down.'],
      },
    ],
  },
];
