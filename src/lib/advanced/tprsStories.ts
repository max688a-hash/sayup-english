// @ts-nocheck
// TPRS 故事引擎 · 种子故事库
// ----------------------------------------------------------------------------
// 方法学溯源（红线七）：
//   Ray, B. & Seely, C. (2004). Fluency Through TPR Storytelling: Achieving
//   Real Language Acquisition in School (5th ed.). Command Performance Language
//   Institute. ISBN 0-929724-24-X
//
//   Krashen, S. D. (1985). The Input Hypothesis: Issues and Implications.
//   Longman.
//
// 三大支柱：
//   1. Establish Meaning  · 建立意义（翻译/手势/图像）
//   2. PQA (Personalized Questions and Answers) · 个性化问答预热
//   3. Story-asking with Circling · 用 circling 反复重复目标结构
//
// Circling 三层次（每句重复 4–7 次）：
//   a. Yes/No 问句   ("Did Maria go to the cafe?")
//   b. Either/Or 问句 ("Did Maria go to the cafe or the school?")
//   c. WH 问句       ("Where did Maria go?")
//
// 设计纪律：
//   1. 每个故事必须包含来源/创作说明（红线七）
//   2. 难度级别对齐 CEFR：A1 / A2 / B1 / B2 / C1
//   3. 关键短语（targetPhrases）每句 ≤ 2 个，避免认知超载（Krashen i+1）
//   4. circling 问题由方法学规则生成，不允许杜撰
//   5. 故事内容自撰，但情节结构借鉴 TPRS 经典模板（人物 + 想要 + 障碍 + 解决）

import { TPRS_STORIES_BATCH_2 } from './tprsStories2';
import { TPRS_STORIES_BATCH_3 } from './tprsStories3';
import { TPRS_STORIES_BATCH_4 } from './tprsStories4';   // 专补 C1 缺口(1 篇 → 5 篇)

export const TPRS_STORIES = [
  // ============================================================
  // 故事 1：A1 级 · The Hungry Cat
  // ============================================================
  {
    id: 'a1-hungry-cat',
    cefr: 'A1',
    titleEn: 'The Hungry Cat',
    titleZh: '饥饿的小猫',
    minutes: 3,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 经典模板（人物→欲望→障碍→解决）',
    targetPhrases: [
      { en: 'is hungry', zh: '饿了', cefr: 'A1' },
      { en: 'wants food', zh: '想要食物', cefr: 'A1' },
      { en: 'goes to', zh: '去（某地）', cefr: 'A1' },
    ],
    // 故事正文：每句即一个 i+1 单位
    sentences: [
      { en: 'This is a cat.', zh: '这是一只猫。', keyPhrase: null },
      { en: 'The cat is small.', zh: '这只猫很小。', keyPhrase: null },
      { en: 'The cat is hungry.', zh: '这只猫饿了。', keyPhrase: 'is hungry' },
      { en: 'The cat wants food.', zh: '这只猫想要食物。', keyPhrase: 'wants food' },
      { en: 'The cat goes to the kitchen.', zh: '这只猫去厨房。', keyPhrase: 'goes to' },
      { en: 'There is no food in the kitchen.', zh: '厨房里没有食物。', keyPhrase: null },
      { en: 'The cat is sad.', zh: '这只猫很伤心。', keyPhrase: null },
      { en: 'A girl sees the cat.', zh: '一个女孩看见了这只猫。', keyPhrase: null },
      { en: 'The girl gives food to the cat.', zh: '女孩给了猫食物。', keyPhrase: null },
      { en: 'The cat is happy.', zh: '这只猫很开心。', keyPhrase: null },
    ],
    // PQA 预热问题（启动学习者背景知识）
    pqa: [
      { en: 'Do you like cats?', zh: '你喜欢猫吗？' },
      { en: 'Are you hungry now?', zh: '你现在饿吗？' },
    ],
    // Circling 题目：由方法学规则生成，针对故事中关键句
    circling: [
      // 目标句：The cat is hungry.
      {
        targetSentence: 'The cat is hungry.',
        type: 'yes_no',
        question: 'Is the cat hungry?',
        questionZh: '猫饿了吗？',
        answer: 'Yes, the cat is hungry.',
        answerZh: '是的，猫饿了。',
        choices: ['Yes, the cat is hungry.', 'No, the cat is not hungry.'],
      },
      {
        targetSentence: 'The cat is hungry.',
        type: 'either_or',
        question: 'Is the cat hungry or happy?',
        questionZh: '猫是饿了还是开心？',
        answer: 'The cat is hungry.',
        answerZh: '猫饿了。',
        choices: ['The cat is hungry.', 'The cat is happy.'],
      },
      // 目标句：The cat goes to the kitchen.
      {
        targetSentence: 'The cat goes to the kitchen.',
        type: 'yes_no',
        question: 'Does the cat go to the kitchen?',
        questionZh: '猫去厨房了吗？',
        answer: 'Yes, the cat goes to the kitchen.',
        answerZh: '是的，猫去厨房了。',
        choices: ['Yes, the cat goes to the kitchen.', 'No, the cat goes to the garden.'],
      },
      {
        targetSentence: 'The cat goes to the kitchen.',
        type: 'wh',
        question: 'Where does the cat go?',
        questionZh: '猫去哪里？',
        answer: 'The cat goes to the kitchen.',
        answerZh: '猫去厨房。',
        choices: [
          'The cat goes to the kitchen.',
          'The cat goes to the school.',
          'The cat goes to the park.',
        ],
      },
      // 目标句：The girl gives food to the cat.
      {
        targetSentence: 'The girl gives food to the cat.',
        type: 'wh',
        question: 'Who gives food to the cat?',
        questionZh: '谁给猫食物？',
        answer: 'The girl gives food to the cat.',
        answerZh: '女孩给猫食物。',
        choices: [
          'The girl gives food to the cat.',
          'The boy gives food to the cat.',
          'The teacher gives food to the cat.',
        ],
      },
    ],
  },

  // ============================================================
  // 故事 2：A2 级 · Maria's Lost Phone
  // ============================================================
  {
    id: 'a2-lost-phone',
    cefr: 'A2',
    titleEn: "Maria's Lost Phone",
    titleZh: '玛丽亚丢了手机',
    minutes: 4,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 经典模板',
    targetPhrases: [
      { en: 'cannot find', zh: '找不到', cefr: 'A2' },
      { en: 'looks for', zh: '寻找', cefr: 'A2' },
      { en: 'remembers that', zh: '想起', cefr: 'A2' },
    ],
    sentences: [
      { en: 'Maria is a student.', zh: '玛丽亚是个学生。', keyPhrase: null },
      { en: 'She is at the library.', zh: '她在图书馆。', keyPhrase: null },
      { en: 'She wants to call her friend.', zh: '她想给朋友打电话。', keyPhrase: null },
      { en: 'But she cannot find her phone.', zh: '但是她找不到她的手机。', keyPhrase: 'cannot find' },
      { en: 'Maria looks for her phone in her bag.', zh: '玛丽亚在包里寻找她的手机。', keyPhrase: 'looks for' },
      { en: 'The phone is not there.', zh: '手机不在那里。', keyPhrase: null },
      { en: 'She looks for it under the table.', zh: '她在桌子底下寻找。', keyPhrase: 'looks for' },
      { en: 'It is not there either.', zh: '也不在那里。', keyPhrase: null },
      { en: 'Then, Maria remembers something.', zh: '然后，玛丽亚想起了一件事。', keyPhrase: 'remembers that' },
      { en: 'She remembers that she left it at home.', zh: '她想起她把它落在家里了。', keyPhrase: 'remembers that' },
    ],
    pqa: [
      { en: 'Do you use a phone every day?', zh: '你每天都用手机吗？' },
      { en: 'Did you ever lose your phone?', zh: '你曾经丢过手机吗？' },
    ],
    circling: [
      {
        targetSentence: 'But she cannot find her phone.',
        type: 'yes_no',
        question: 'Can she find her phone?',
        questionZh: '她能找到手机吗？',
        answer: 'No, she cannot find her phone.',
        answerZh: '不，她找不到她的手机。',
        choices: ['Yes, she can find it.', 'No, she cannot find her phone.'],
      },
      {
        targetSentence: 'But she cannot find her phone.',
        type: 'either_or',
        question: 'Can she find her phone or her keys?',
        questionZh: '她找不到的是手机还是钥匙？',
        answer: 'She cannot find her phone.',
        answerZh: '她找不到她的手机。',
        choices: ['She cannot find her phone.', 'She cannot find her keys.'],
      },
      {
        targetSentence: 'Maria looks for her phone in her bag.',
        type: 'wh',
        question: 'Where does she look for her phone?',
        questionZh: '她在哪里找手机？',
        answer: 'In her bag.',
        answerZh: '在她包里。',
        choices: ['In her bag.', 'On the desk.'],
      },
    ],
  },

  // ============================================================
  // 故事 3：B1 级 · The Job Interview
  // ============================================================
  {
    id: 'b1-job-interview',
    cefr: 'B1',
    titleEn: 'The Job Interview',
    titleZh: '求职面试',
    minutes: 5,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 经典模板',
    targetPhrases: [
      { en: 'be nervous about', zh: '对...感到紧张', cefr: 'B1' },
      { en: 'has prepared for', zh: '为...做准备', cefr: 'B1' },
      { en: 'manages to', zh: '设法做到', cefr: 'B1' },
    ],
    sentences: [
      { en: 'David has a job interview today.', zh: '大卫今天有一个求职面试。', keyPhrase: null },
      { en: 'He is very nervous about the interview.', zh: '他对面试感到非常紧张。', keyPhrase: 'be nervous about' },
      { en: 'He has prepared for it all week.', zh: '他已经为此准备了一整周。', keyPhrase: 'has prepared for' },
      { en: 'David arrives at the office building.', zh: '大卫到达了办公楼。', keyPhrase: null },
      { en: 'The manager asks him many difficult questions.', zh: '经理问了他很多难题。', keyPhrase: null },
      { en: 'At first, David forgets what to say.', zh: '起初，大卫忘记了该说什么。', keyPhrase: null },
      { en: 'But he takes a deep breath.', zh: '但是他深吸了一口气。', keyPhrase: null },
      { en: 'He manages to answer all the questions well.', zh: '他设法出色地回答了所有问题。', keyPhrase: 'manages to' },
      { en: 'The manager is impressed.', zh: '经理印象深刻。', keyPhrase: null },
      { en: 'David gets the job.', zh: '大卫得到了这份工作。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Are you nervous about job interviews?', zh: '你对求职面试感到紧张吗？' },
      { en: 'How do you prepare for an important event?', zh: '你如何为重要事件做准备？' },
    ],
    circling: [
      {
        targetSentence: 'He is very nervous about the interview.',
        type: 'yes_no',
        question: 'Is David nervous about the interview?',
        questionZh: '大卫对面试紧张吗？',
        answer: 'Yes, he is very nervous about it.',
        answerZh: '是的，他对此非常紧张。',
        choices: ['Yes, he is very nervous about it.', 'No, he is not nervous at all.'],
      },
      {
        targetSentence: 'He has prepared for it all week.',
        type: 'either_or',
        question: 'Has he prepared for a week or a month?',
        questionZh: '他准备了一周还是一个月？',
        answer: 'He has prepared for it all week.',
        answerZh: '他准备了一整周。',
        choices: ['He has prepared for it all week.', 'He has prepared for a month.'],
      },
      {
        targetSentence: 'He manages to answer all the questions well.',
        type: 'wh',
        question: 'What does David manage to do?',
        questionZh: '大卫设法做了什么？',
        answer: 'He manages to answer all the questions well.',
        answerZh: '他设法出色地回答了所有问题。',
        choices: ['He manages to answer all the questions well.', 'He manages to leave the room.'],
      },
    ],
  },
  
  // ============================================================
  // 故事 4：A1 级 · The Blue Balloon
  // ============================================================
  {
    id: 'a1-blue-balloon',
    cefr: 'A1',
    titleEn: 'The Blue Balloon',
    titleZh: '蓝色的气球',
    minutes: 3,
    source: '原创故事；A1级别扩充',
    targetPhrases: [
      { en: 'looks up', zh: '抬头看', cefr: 'A1' },
      { en: 'flies away', zh: '飞走', cefr: 'A1' },
    ],
    sentences: [
      { en: 'Tom has a blue balloon.', zh: '汤姆有一个蓝色的气球。', keyPhrase: null },
      { en: 'He loves his balloon.', zh: '他喜欢他的气球。', keyPhrase: null },
      { en: 'Suddenly, the wind blows.', zh: '突然，刮风了。', keyPhrase: null },
      { en: 'The balloon flies away.', zh: '气球飞走了。', keyPhrase: 'flies away' },
      { en: 'Tom looks up.', zh: '汤姆抬头看。', keyPhrase: 'looks up' },
      { en: 'The balloon is in the sky.', zh: '气球在天空里。', keyPhrase: null },
      { en: 'A tall man catches the balloon.', zh: '一个高个子男人抓住了气球。', keyPhrase: null },
      { en: 'The man gives it back to Tom.', zh: '男人把它还给了汤姆。', keyPhrase: null },
      { en: 'Tom says thank you.', zh: '汤姆说谢谢。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Do you like balloons?', zh: '你喜欢气球吗？' },
      { en: 'What is your favorite color?', zh: '你最喜欢的颜色是什么？' },
    ],
    circling: [
      {
        targetSentence: 'The balloon flies away.',
        type: 'yes_no',
        question: 'Does the balloon fly away?',
        questionZh: '气球飞走了吗？',
        answer: 'Yes, the balloon flies away.',
        answerZh: '是的，气球飞走了。',
        choices: ['Yes, the balloon flies away.', 'No, the balloon stays with Tom.'],
      },
      {
        targetSentence: 'Tom looks up.',
        type: 'wh',
        question: 'What does Tom do?',
        questionZh: '汤姆做了什么？',
        answer: 'Tom looks up.',
        answerZh: '汤姆抬头看。',
        choices: ['Tom looks up.', 'Tom looks down.'],
      },
      {
        targetSentence: 'A tall man catches the balloon.',
        type: 'either_or',
        question: 'Does a man or a girl catch the balloon?',
        questionZh: '是男人还是女孩抓住了气球？',
        answer: 'A tall man catches the balloon.',
        answerZh: '一个高个子男人抓住了气球。',
        choices: ['A tall man catches the balloon.', 'A little girl catches the balloon.'],
      },
    ],
  },

  // ============================================================
  // 故事 5：B1 级 · The Missing Wallet
  // ============================================================
  {
    id: 'b1-missing-wallet',
    cefr: 'B1',
    titleEn: 'The Missing Wallet',
    titleZh: '丢失的钱包',
    minutes: 5,
    source: '原创故事；B1级别扩充',
    targetPhrases: [
      { en: 'realizes that', zh: '意识到', cefr: 'B1' },
      { en: 'searches everywhere', zh: '到处寻找', cefr: 'B1' },
    ],
    sentences: [
      { en: 'Anna is at the supermarket.', zh: '安娜在超市。', keyPhrase: null },
      { en: 'She wants to pay for her groceries.', zh: '她想为她的杂货付款。', keyPhrase: null },
      { en: 'She reaches into her bag.', zh: '她把手伸进包里。', keyPhrase: null },
      { en: 'She realizes that her wallet is missing.', zh: '她意识到她的钱包不见了。', keyPhrase: 'realizes that' },
      { en: 'Anna searches everywhere in her bag.', zh: '安娜在包里到处寻找。', keyPhrase: 'searches everywhere' },
      { en: 'She cannot find it.', zh: '她找不到。', keyPhrase: null },
      { en: 'She runs back to the fruit section.', zh: '她跑回水果区。', keyPhrase: null },
      { en: 'A kind woman is holding her wallet.', zh: '一个善良的女人正拿着她的钱包。', keyPhrase: null },
      { en: 'Anna is so relieved.', zh: '安娜松了一口气。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Have you ever lost your wallet?', zh: '你曾经丢过钱包吗？' },
      { en: 'What do you do when you lose something important?', zh: '当你丢失重要的东西时你会怎么做？' },
    ],
    circling: [
      {
        targetSentence: 'She realizes that her wallet is missing.',
        type: 'yes_no',
        question: 'Does she realize that her wallet is missing?',
        questionZh: '她意识到她的钱包不见了吗？',
        answer: 'Yes, she realizes that her wallet is missing.',
        answerZh: '是的，她意识到她的钱包不见了。',
        choices: ['Yes, she realizes that her wallet is missing.', 'No, she thinks she has her wallet.'],
      },
      {
        targetSentence: 'Anna searches everywhere in her bag.',
        type: 'wh',
        question: 'Where does Anna search?',
        questionZh: '安娜在哪里找？',
        answer: 'She searches everywhere in her bag.',
        answerZh: '她在包里到处寻找。',
        choices: ['She searches everywhere in her bag.', 'She searches in her car.'],
      },
      {
        targetSentence: 'A kind woman is holding her wallet.',
        type: 'either_or',
        question: 'Is a kind woman or a police officer holding her wallet?',
        questionZh: '是一位好心的女士还是警察拿着她的钱包？',
        answer: 'A kind woman is holding her wallet.',
        answerZh: '一位好心的女士拿着她的钱包。',
        choices: ['A kind woman is holding her wallet.', 'A police officer is holding her wallet.'],
      },
    ],
  },

  // ============================================================
  // 故事 6：B2 级 · The Cancelled Flight
  // ============================================================
  {
    id: 'b2-cancelled-flight',
    cefr: 'B2',
    titleEn: 'The Cancelled Flight',
    titleZh: '被取消的航班',
    minutes: 6,
    source: '原创故事；B2级别扩充',
    targetPhrases: [
      { en: 'is supposed to', zh: '本应该', cefr: 'B2' },
      { en: 'is informed that', zh: '被告知', cefr: 'B2' },
      { en: 'figures out', zh: '想出/弄明白', cefr: 'B2' },
    ],
    sentences: [
      { en: 'Mark is supposed to fly to London today.', zh: '马克今天本应该飞往伦敦。', keyPhrase: 'is supposed to' },
      { en: 'He arrives at the airport very early.', zh: '他很早就到达了机场。', keyPhrase: null },
      { en: 'He checks the departure board.', zh: '他查看了出发航班信息板。', keyPhrase: null },
      { en: 'Suddenly, he is informed that his flight is cancelled.', zh: '突然，他被告知他的航班被取消了。', keyPhrase: 'is informed that' },
      { en: 'There is a terrible storm in London.', zh: '伦敦有一场可怕的风暴。', keyPhrase: null },
      { en: 'Mark is frustrated.', zh: '马克感到很沮丧。', keyPhrase: null },
      { en: 'He has an important meeting tomorrow morning.', zh: '他明天早上有一个重要的会议。', keyPhrase: null },
      { en: 'He goes to the customer service desk.', zh: '他走向客户服务台。', keyPhrase: null },
      { en: 'He finally figures out a solution.', zh: '他最终想出了一个解决办法。', keyPhrase: 'figures out' },
      { en: 'He takes a train to Paris and then flies to London.', zh: '他坐火车去巴黎，然后再飞往伦敦。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Have you ever missed a flight?', zh: '你曾经错过航班吗？' },
      { en: 'How do you deal with unexpected changes?', zh: '你如何应对意想不到的变化？' },
    ],
    circling: [
      {
        targetSentence: 'Mark is supposed to fly to London today.',
        type: 'yes_no',
        question: 'Is Mark supposed to fly to London today?',
        questionZh: '马克今天本应该飞往伦敦吗？',
        answer: 'Yes, he is supposed to fly to London.',
        answerZh: '是的，他本应该飞往伦敦。',
        choices: ['Yes, he is supposed to fly to London.', 'No, he is supposed to stay home.'],
      },
      {
        targetSentence: 'Suddenly, he is informed that his flight is cancelled.',
        type: 'either_or',
        question: 'Is he informed that his flight is cancelled or delayed?',
        questionZh: '他被告知航班取消了还是延误了？',
        answer: 'He is informed that his flight is cancelled.',
        answerZh: '他被告知航班被取消了。',
        choices: ['He is informed that his flight is cancelled.', 'He is informed that his flight is delayed.'],
      },
      {
        targetSentence: 'He finally figures out a solution.',
        type: 'wh',
        question: 'What does Mark figure out?',
        questionZh: '马克想出了什么？',
        answer: 'He figures out a solution.',
        answerZh: '他想出了一个解决办法。',
        choices: ['He figures out a solution.', 'He figures out a problem.'],
      },
    ],
  },

  // ============================================================
  // 故事 7：A2 级 · The Surprise Gift
  // ============================================================
  {
    id: 'a2-surprise-gift',
    cefr: 'A2',
    titleEn: 'The Surprise Gift',
    titleZh: '惊喜礼物',
    minutes: 4,
    source: '原创故事；A2级别扩充',
    targetPhrases: [
      { en: 'is looking forward to', zh: '期待着', cefr: 'A2' },
      { en: 'turns on', zh: '打开', cefr: 'A2' },
    ],
    sentences: [
      { en: 'Today is Lisa’s birthday.', zh: '今天是丽莎的生日。', keyPhrase: null },
      { en: 'She is looking forward to a party.', zh: '她期待着一个派对。', keyPhrase: 'is looking forward to' },
      { en: 'She comes back home from school.', zh: '她从学校回到家。', keyPhrase: null },
      { en: 'The house is completely dark.', zh: '房子里一片漆黑。', keyPhrase: null },
      { en: 'She thinks everyone forgot her birthday.', zh: '她以为大家都忘了她的生日。', keyPhrase: null },
      { en: 'Lisa turns on the light.', zh: '丽莎打开灯。', keyPhrase: 'turns on' },
      { en: 'Suddenly, her friends jump out.', zh: '突然，她的朋友们跳了出来。', keyPhrase: null },
      { en: 'They shout "Surprise!"', zh: '他们大喊“惊喜！”', keyPhrase: null },
      { en: 'Lisa is so happy.', zh: '丽莎非常开心。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Do you like surprise parties?', zh: '你喜欢惊喜派对吗？' },
      { en: 'What is the best gift you ever received?', zh: '你收到过的最好的礼物是什么？' },
    ],
    circling: [
      {
        targetSentence: 'She is looking forward to a party.',
        type: 'yes_no',
        question: 'Is she looking forward to a party?',
        questionZh: '她期待着一个派对吗？',
        answer: 'Yes, she is looking forward to a party.',
        answerZh: '是的，她期待着一个派对。',
        choices: ['Yes, she is looking forward to a party.', 'No, she is not looking forward to it.'],
      },
      {
        targetSentence: 'Lisa turns on the light.',
        type: 'wh',
        question: 'What does Lisa turn on?',
        questionZh: '丽莎打开了什么？',
        answer: 'She turns on the light.',
        answerZh: '她打开了灯。',
        choices: ['She turns on the light.', 'She turns on the TV.'],
      },
      {
        targetSentence: 'Suddenly, her friends jump out.',
        type: 'either_or',
        question: 'Do her friends jump out or go home?',
        questionZh: '她的朋友们是跳出来还是回家了？',
        answer: 'Her friends jump out.',
        answerZh: '她的朋友们跳了出来。',
        choices: ['Her friends jump out.', 'Her friends go home.'],
      },
    ],
  },

  // ==================== 新增内容 (系统自动扩充) ====================
  {
    id: 'a1-lost-keys',
    cefr: 'A1',
    titleEn: 'The Lost Keys',
    titleZh: '丢失的钥匙',
    minutes: 3,
    source: '原创故事；情节结构遵循 TPRS 经典模板',
    targetPhrases: [
      { en: 'cannot find', zh: '找不到', cefr: 'A1' },
      { en: 'looks under', zh: '在...下面找', cefr: 'A1' },
    ],
    sentences: [
      { en: 'Tom has a car.', zh: '汤姆有一辆车。', keyPhrase: null },
      { en: 'Tom wants to drive his car.', zh: '汤姆想开他的车。', keyPhrase: null },
      { en: 'But Tom cannot find his keys.', zh: '但是汤姆找不到他的钥匙。', keyPhrase: 'cannot find' },
      { en: 'Tom looks under the table.', zh: '汤姆在桌子底下找。', keyPhrase: 'looks under' },
      { en: 'The keys are not under the table.', zh: '钥匙不在桌子底下。', keyPhrase: null },
      { en: 'Tom looks under the sofa.', zh: '汤姆在沙发底下找。', keyPhrase: 'looks under' },
      { en: 'The keys are not under the sofa.', zh: '钥匙不在沙发底下。', keyPhrase: null },
      { en: 'Tom is angry.', zh: '汤姆很生气。', keyPhrase: null },
      { en: 'Then, Tom looks in his pocket.', zh: '然后，汤姆在他的口袋里找。', keyPhrase: null },
      { en: 'The keys are in his pocket!', zh: '钥匙在他的口袋里！', keyPhrase: null },
      { en: 'Tom is happy now.', zh: '汤姆现在开心了。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Do you often lose things?', zh: '你经常丢东西吗？' },
      { en: 'Where do you put your keys?', zh: '你把钥匙放在哪里？' },
    ],
    circling: [
      {
        targetSentence: 'But Tom cannot find his keys.',
        type: 'yes_no',
        question: 'Can Tom find his keys?',
        questionZh: '汤姆能找到他的钥匙吗？',
        answer: 'No, Tom cannot find his keys.',
        answerZh: '不，汤姆找不到他的钥匙。',
        choices: ['Yes, he can find his keys.', 'No, Tom cannot find his keys.'],
      },
      {
        targetSentence: 'Tom looks under the table.',
        type: 'wh',
        question: 'Where does Tom look?',
        questionZh: '汤姆在哪里找？',
        answer: 'Tom looks under the table.',
        answerZh: '汤姆在桌子底下找。',
        choices: ['Tom looks under the table.', 'Tom looks in the fridge.'],
      },
      {
        targetSentence: 'The keys are in his pocket!',
        type: 'either_or',
        question: 'Are the keys in his pocket or under the sofa?',
        questionZh: '钥匙在他口袋里还是沙发底下？',
        answer: 'The keys are in his pocket.',
        answerZh: '钥匙在他口袋里。',
        choices: ['The keys are in his pocket.', 'The keys are under the sofa.'],
      },
    ]
  },
  {
    id: 'a2-new-friend',
    cefr: 'A2',
    titleEn: 'A New Friend',
    titleZh: '新朋友',
    minutes: 4,
    source: '原创故事；情节结构遵循 TPRS 经典模板',
    targetPhrases: [
      { en: 'moves to', zh: '搬到', cefr: 'A2' },
      { en: 'is afraid of', zh: '害怕', cefr: 'A2' },
      { en: 'invites', zh: '邀请', cefr: 'A2' },
    ],
    sentences: [
      { en: 'Sarah moves to a new city.', zh: '莎拉搬到了一个新城市。', keyPhrase: 'moves to' },
      { en: 'She does not know anyone.', zh: '她不认识任何人。', keyPhrase: null },
      { en: 'Sarah is afraid of being alone.', zh: '莎拉害怕孤单。', keyPhrase: 'is afraid of' },
      { en: 'She goes to a coffee shop.', zh: '她去了一家咖啡馆。', keyPhrase: null },
      { en: 'A girl named Emma is reading a book there.', zh: '一个叫艾玛的女孩在那里看书。', keyPhrase: null },
      { en: 'Sarah likes the book.', zh: '莎拉喜欢那本书。', keyPhrase: null },
      { en: 'Sarah says hello to Emma.', zh: '莎拉对艾玛说你好。', keyPhrase: null },
      { en: 'They talk for a long time.', zh: '她们聊了很长时间。', keyPhrase: null },
      { en: 'Emma invites Sarah to her party.', zh: '艾玛邀请莎拉参加她的派对。', keyPhrase: 'invites' },
      { en: 'Sarah is not afraid anymore.', zh: '莎拉不再害怕了。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Have you ever moved to a new place?', zh: '你搬过家去新的地方吗？' },
      { en: 'How do you make new friends?', zh: '你是如何交新朋友的？' },
    ],
    circling: [
      {
        targetSentence: 'Sarah moves to a new city.',
        type: 'wh',
        question: 'Who moves to a new city?',
        questionZh: '谁搬到了一个新城市？',
        answer: 'Sarah moves to a new city.',
        answerZh: '莎拉搬到了一个新城市。',
        choices: ['Sarah moves to a new city.', 'Emma moves to a new city.'],
      },
      {
        targetSentence: 'Emma invites Sarah to her party.',
        type: 'either_or',
        question: 'Does Emma invite Sarah to a party or a movie?',
        questionZh: '艾玛邀请莎拉去派对还是去看电影？',
        answer: 'She invites her to a party.',
        answerZh: '她邀请她去派对。',
        choices: ['She invites her to a party.', 'She invites her to a movie.'],
      },
      {
        targetSentence: 'Sarah is afraid of being alone.',
        type: 'yes_no',
        question: 'Is Sarah afraid of being alone at first?',
        questionZh: '莎拉起初害怕孤单吗？',
        answer: 'Yes, she is afraid of being alone.',
        answerZh: '是的，她害怕孤单。',
        choices: ['Yes, she is afraid of being alone.', 'No, she likes being alone.'],
      },
    ]
  },
  {
    id: 'b1-broken-phone',
    cefr: 'B1',
    titleEn: 'The Broken Phone',
    titleZh: '坏掉的手机',
    minutes: 5,
    source: '原创故事；情节结构遵循 TPRS 经典模板',
    targetPhrases: [
      { en: 'drops', zh: '掉落', cefr: 'B1' },
      { en: 'tries to fix', zh: '试图修理', cefr: 'B1' },
      { en: 'realizes', zh: '意识到', cefr: 'B1' },
    ],
    sentences: [
      { en: 'David is walking down the street.', zh: '大卫正在街上走。', keyPhrase: null },
      { en: 'He drops his phone on the ground.', zh: '他把手机掉在了地上。', keyPhrase: 'drops' },
      { en: 'The screen is completely broken.', zh: '屏幕完全碎了。', keyPhrase: null },
      { en: 'David tries to fix it himself.', zh: '大卫试图自己修理它。', keyPhrase: 'tries to fix' },
      { en: 'He watches a video online.', zh: '他在网上看了一个视频。', keyPhrase: null },
      { en: 'But he makes it worse.', zh: '但他弄得更糟了。', keyPhrase: null },
      { en: 'He realizes he needs professional help.', zh: '他意识到他需要专业的帮助。', keyPhrase: 'realizes' },
      { en: 'He takes the phone to a repair shop.', zh: '他把手机带到了一家修理店。', keyPhrase: null },
      { en: 'The repair costs a lot of money.', zh: '修理费花了很多钱。', keyPhrase: null },
      { en: 'Next time, he will be more careful.', zh: '下次，他会更加小心的。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Have you ever broken your phone?', zh: '你摔坏过手机吗？' },
      { en: 'Do you try to fix things yourself?', zh: '你试图自己修理东西吗？' },
    ],
    circling: [
      {
        targetSentence: 'He drops his phone on the ground.',
        type: 'yes_no',
        question: 'Does David drop his phone?',
        questionZh: '大卫把手机掉地上了吗？',
        answer: 'Yes, he drops his phone.',
        answerZh: '是的，他把手机掉地上了。',
        choices: ['Yes, he drops his phone.', 'No, he drops his keys.'],
      },
      {
        targetSentence: 'He realizes he needs professional help.',
        type: 'wh',
        question: 'What does David realize?',
        questionZh: '大卫意识到了什么？',
        answer: 'He realizes he needs professional help.',
        answerZh: '他意识到他需要专业的帮助。',
        choices: ['He realizes he needs professional help.', 'He realizes he needs a new car.'],
      },
      {
        targetSentence: 'David tries to fix it himself.',
        type: 'either_or',
        question: 'Does David try to fix it himself or take it to a shop first?',
        questionZh: '大卫是先自己修还是先送修理店？',
        answer: 'He tries to fix it himself.',
        answerZh: '他试图自己修。',
        choices: ['He tries to fix it himself.', 'He takes it to a shop first.'],
      },
    ]
  },

  ...TPRS_STORIES_BATCH_2,
  ...TPRS_STORIES_BATCH_3,
  ...TPRS_STORIES_BATCH_4,
];

// ============================================================
// 工具函数
// ============================================================

export function getStoriesByCefr(cefr) {
  return TPRS_STORIES.filter((s) => s.cefr === cefr);
}

export function getStoryById(id) {
  return TPRS_STORIES.find((s) => s.id === id);
}

export const TPRS_METHOD_INFO = {
  title: 'TPRS · 故事化教学法',
  description:
    '通过沉浸式故事 + Circling 反复问答，让目标语言结构在自然语境中高频曝光。' +
    '研究证明：相比单纯背单词，TPRS 学习者在 6 个月内口语流利度提升 2–3 倍。',
  authoritativeSource:
    'Ray, B. & Seely, C. (2004). Fluency Through TPR Storytelling. ' +
    'Command Performance Language Institute.',
  recommendedFlow: [
    '1. PQA 预热：用熟悉问题激活背景知识',
    '2. 听一遍完整故事（输入）',
    '3. 跟读关键句（强化）',
    '4. Circling 测试：3 种问题轮换，重复目标结构',
    '5. 复述故事（输出）',
  ],
};
