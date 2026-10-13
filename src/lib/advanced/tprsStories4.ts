// @ts-nocheck
// TPRS 故事库 · 批次 4(专补 C1 缺口: 原本 C1 仅 1 篇 → 5 篇)
// ----------------------------------------------------------------------------
// 方法学溯源(红线七, 与批次 1/2/3 一致):
//   Ray, B. & Seely, C. (2004). Fluency Through TPR Storytelling (5th ed.).
//     Command Performance Language Institute. ISBN 0-929724-24-X
//   Krashen, S. D. (1985). The Input Hypothesis: Issues and Implications. Longman.
//
// C1 级编写标准(比 A1–B2 明显升档, 不是把简单句拉长):
//   1. 句子含从句/分词结构/倒装/名词化等 C1 语法特征, 单句 12–26 词
//   2. targetPhrases 取 C1 高频「地道搭配」而非生词(如 come to terms with / talk sb round)
//   3. 情节仍守 TPRS 模板(人物→欲望→障碍→解决), 但冲突是内在的/社会性的, 而非丢东西找东西
//   4. circling 仍三层次(yes_no / either_or / wh), 每篇 4 道, 答案必须与 choices 完全一致
//   5. 中文为地道意译, 不逐字硬译

export const TPRS_STORIES_BATCH_4 = [
  // ============================================================
  // C1 · 拒绝升职(职业价值观冲突)
  // ============================================================
  {
    id: 'c1-turning-down-promotion',
    cefr: 'C1',
    titleEn: 'The Promotion She Turned Down',
    titleZh: '她拒绝的那次升职',
    minutes: 7,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 经典模板（人物→欲望→障碍→解决）',
    targetPhrases: [
      { en: 'had been taken for granted', zh: '一直被认为理所当然', cefr: 'C1' },
      { en: 'came to terms with', zh: '接受了（并释怀）', cefr: 'C1' },
      { en: 'on her own terms', zh: '按她自己的方式', cefr: 'C1' },
    ],
    sentences: [
      { en: 'Having worked in the same department for nine years, Naomi was widely expected to take over as head.', zh: '在同一个部门干了九年，大家普遍认为娜奥米会接任主管。', keyPhrase: null },
      { en: 'Her competence had been taken for granted for so long that nobody thought to ask what she actually wanted.', zh: '她的能力被视为理所当然太久了，以至于没人想过问她真正想要什么。', keyPhrase: 'had been taken for granted' },
      { en: 'When the offer finally came, it involved managing thirty people and abandoning the research she loved.', zh: '当机会终于来时，它意味着管理三十个人，并放弃她热爱的研究。', keyPhrase: null },
      { en: 'For a fortnight she weighed the prestige of the title against the work she would lose.', zh: '有两周时间，她把头衔带来的声望与将失去的工作放在一起衡量。', keyPhrase: null },
      { en: 'To the astonishment of her colleagues, she declined.', zh: '让同事们震惊的是，她拒绝了。', keyPhrase: null },
      { en: 'What she proposed instead was a senior research post with no management duties.', zh: '她提出的替代方案是一个不带管理职责的资深研究岗位。', keyPhrase: null },
      { en: 'It took her months to come to terms with the disappointment she had caused others.', zh: '她花了几个月才接受自己让别人失望这件事。', keyPhrase: 'came to terms with' },
      { en: 'Three years on, she is still there, doing the work that matters to her, on her own terms.', zh: '三年后，她仍在那里，按自己的方式做着对她重要的工作。', keyPhrase: 'on her own terms' },
    ],
    pqa: [
      { en: 'Would you turn down a promotion if it meant giving up work you love?', zh: '如果升职意味着放弃你热爱的工作，你会拒绝吗？' },
      { en: 'How much does a job title matter to you?', zh: '职位头衔对你有多重要？' },
    ],
    circling: [
      {
        targetSentence: 'To the astonishment of her colleagues, she declined.',
        type: 'yes_no',
        question: 'Did Naomi accept the promotion?',
        questionZh: '娜奥米接受升职了吗？',
        answer: 'No, she declined it.',
        answerZh: '没有，她拒绝了。',
        choices: ['No, she declined it.', 'Yes, she accepted it immediately.'],
      },
      {
        targetSentence: 'When the offer finally came, it involved managing thirty people and abandoning the research she loved.',
        type: 'either_or',
        question: 'Would the new role have meant more research or more management?',
        questionZh: '新岗位意味着更多研究还是更多管理？',
        answer: 'It would have meant more management.',
        answerZh: '它意味着更多管理工作。',
        choices: ['It would have meant more management.', 'It would have meant more research.'],
      },
      {
        targetSentence: 'What she proposed instead was a senior research post with no management duties.',
        type: 'wh',
        question: 'What did she propose instead?',
        questionZh: '她提出了什么替代方案？',
        answer: 'A senior research post without management duties.',
        answerZh: '一个不带管理职责的资深研究岗位。',
        choices: [
          'A senior research post without management duties.',
          'A part-time contract with lower pay.',
          'A transfer to another company.',
        ],
      },
      {
        targetSentence: 'It took her months to come to terms with the disappointment she had caused others.',
        type: 'wh',
        question: 'How long did it take her to come to terms with it?',
        questionZh: '她花了多久才接受这件事？',
        answer: 'It took her months.',
        answerZh: '她花了几个月。',
        choices: ['It took her months.', 'It took her a single afternoon.', 'She never came to terms with it.'],
      },
    ],
  },

  // ============================================================
  // C1 · 被误解的沉默(跨文化沟通)
  // ============================================================
  {
    id: 'c1-misread-silence',
    cefr: 'C1',
    titleEn: 'The Silence That Was Misread',
    titleZh: '被误读的沉默',
    minutes: 7,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 经典模板',
    targetPhrases: [
      { en: 'was taken aback', zh: '感到意外/吃了一惊', cefr: 'C1' },
      { en: 'read too much into', zh: '过度解读', cefr: 'C1' },
      { en: 'clear the air', zh: '把话说开、消除误会', cefr: 'C1' },
    ],
    sentences: [
      { en: 'During his first month in Amsterdam, Kenji noticed that meetings were far more direct than he was used to.', zh: '在阿姆斯特丹的第一个月，健二注意到会议比他习惯的直接得多。', keyPhrase: null },
      { en: 'When a colleague criticised his proposal in front of everyone, he said nothing and simply nodded.', zh: '当一位同事在众人面前批评他的方案时，他什么也没说，只是点了点头。', keyPhrase: null },
      { en: 'His manager was taken aback by the silence, interpreting it as resentment.', zh: '他的经理对这种沉默感到意外，把它解读为不满。', keyPhrase: 'was taken aback' },
      { en: 'In fact, Kenji had been taught that considering a criticism carefully before replying is a form of respect.', zh: '事实上，健二受到的教育是：在回应前认真考虑批评是一种尊重。', keyPhrase: null },
      { en: 'For a fortnight, each side quietly read too much into the behaviour of the other.', zh: '有两周时间，双方都在暗暗过度解读对方的行为。', keyPhrase: 'read too much into' },
      { en: 'It was only when the manager asked him directly over lunch that the misunderstanding surfaced.', zh: '直到经理在午餐时直接问他，误会才浮出水面。', keyPhrase: null },
      { en: 'That single conversation was enough to clear the air.', zh: '那一次谈话就足以把话说开。', keyPhrase: 'clear the air' },
      { en: 'Kenji now says what he thinks in meetings, though he still pauses first, and nobody minds.', zh: '健二现在会在会上说出想法，尽管仍会先停顿一下，而没人觉得有问题。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Have you ever been misunderstood because of the way you communicate?', zh: '你曾因表达方式被误解过吗？' },
      { en: 'Do you prefer direct or indirect criticism?', zh: '你更喜欢直接还是间接的批评？' },
    ],
    circling: [
      {
        targetSentence: 'His manager was taken aback by the silence, interpreting it as resentment.',
        type: 'wh',
        question: 'How did the manager interpret the silence?',
        questionZh: '经理如何解读那份沉默？',
        answer: 'He interpreted it as resentment.',
        answerZh: '他把它解读为不满。',
        choices: ['He interpreted it as resentment.', 'He interpreted it as agreement.', 'He did not notice it.'],
      },
      {
        targetSentence: 'In fact, Kenji had been taught that considering a criticism carefully before replying is a form of respect.',
        type: 'either_or',
        question: 'For Kenji, was the silence a sign of respect or of anger?',
        questionZh: '对健二来说，沉默是尊重还是愤怒的表现？',
        answer: 'It was a sign of respect.',
        answerZh: '它是尊重的表现。',
        choices: ['It was a sign of respect.', 'It was a sign of anger.'],
      },
      {
        targetSentence: 'It was only when the manager asked him directly over lunch that the misunderstanding surfaced.',
        type: 'yes_no',
        question: 'Was the misunderstanding resolved by talking about it?',
        questionZh: '误会是通过谈开而解决的吗？',
        answer: 'Yes, talking about it resolved the misunderstanding.',
        answerZh: '是的，谈开之后误会解决了。',
        choices: ['Yes, talking about it resolved the misunderstanding.', 'No, it was never resolved.'],
      },
      {
        targetSentence: 'For a fortnight, each side quietly read too much into the behaviour of the other.',
        type: 'wh',
        question: 'How long did both sides misread each other?',
        questionZh: '双方互相误读了多久？',
        answer: 'For a fortnight.',
        answerZh: '有两周时间。',
        choices: ['For a fortnight.', 'For a single day.', 'For several years.'],
      },
    ],
  },

  // ============================================================
  // C1 · 半途改行(重大人生决定)
  // ============================================================
  {
    id: 'c1-career-change',
    cefr: 'C1',
    titleEn: 'Starting Again at Forty',
    titleZh: '四十岁重新开始',
    minutes: 8,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 经典模板',
    targetPhrases: [
      { en: 'had grown disillusioned with', zh: '对…逐渐失望/幻灭', cefr: 'C1' },
      { en: 'took the plunge', zh: '果断一试/下决心去做', cefr: 'C1' },
      { en: 'in hindsight', zh: '事后看来', cefr: 'C1' },
    ],
    sentences: [
      { en: 'By the time she turned forty, Priya had spent eighteen years in corporate law.', zh: '到四十岁时，普里雅已在公司法领域干了十八年。', keyPhrase: null },
      { en: 'Successful though she appeared, she had grown disillusioned with work that felt increasingly hollow.', zh: '尽管看起来很成功，她对这份日益空洞的工作逐渐失望。', keyPhrase: 'had grown disillusioned with' },
      { en: 'What she really wanted was to teach, but retraining would mean two years of study and a much smaller income.', zh: '她真正想做的是教书，但重新受训意味着两年学习和大幅缩水的收入。', keyPhrase: null },
      { en: 'Her family, understandably, urged her to think again.', zh: '可以理解，家人劝她再想想。', keyPhrase: null },
      { en: 'After eighteen months of hesitation, she finally took the plunge and handed in her notice.', zh: '犹豫了一年半后，她终于下决心递交了辞呈。', keyPhrase: 'took the plunge' },
      { en: 'The first year was harder than she had anticipated, both financially and emotionally.', zh: '第一年比她预想的更难，无论是经济上还是情绪上。', keyPhrase: null },
      { en: 'She now teaches law at a further education college, earning roughly half her former salary.', zh: '她现在在一所继续教育学院教法律，收入大约是过去的一半。', keyPhrase: null },
      { en: 'In hindsight, she says, the only thing she regrets is having waited so long.', zh: '事后看来，她说自己唯一后悔的是等了那么久。', keyPhrase: 'in hindsight' },
    ],
    pqa: [
      { en: 'Would you accept a lower salary for more meaningful work?', zh: '为了更有意义的工作，你愿意接受更低的收入吗？' },
      { en: 'What would stop you from changing career?', zh: '什么会阻止你转行？' },
    ],
    circling: [
      {
        targetSentence: 'After eighteen months of hesitation, she finally took the plunge and handed in her notice.',
        type: 'yes_no',
        question: 'Did Priya eventually leave her job?',
        questionZh: '普里雅最终离开了那份工作吗？',
        answer: 'Yes, she handed in her notice.',
        answerZh: '是的，她递交了辞呈。',
        choices: ['Yes, she handed in her notice.', 'No, she stayed in corporate law.'],
      },
      {
        targetSentence: 'She now teaches law at a further education college, earning roughly half her former salary.',
        type: 'either_or',
        question: 'Does she now earn more or less than before?',
        questionZh: '她现在收入比以前多还是少？',
        answer: 'She earns less than before.',
        answerZh: '她收入比以前少。',
        choices: ['She earns less than before.', 'She earns more than before.'],
      },
      {
        targetSentence: 'In hindsight, she says, the only thing she regrets is having waited so long.',
        type: 'wh',
        question: 'What is the only thing she regrets?',
        questionZh: '她唯一后悔的是什么？',
        answer: 'That she waited so long.',
        answerZh: '她等了那么久。',
        choices: ['That she waited so long.', 'That she left her job at all.', 'That she studied law.'],
      },
      {
        targetSentence: 'The first year was harder than she had anticipated, both financially and emotionally.',
        type: 'yes_no',
        question: 'Was the first year easier than she expected?',
        questionZh: '第一年比她预期的轻松吗？',
        answer: 'No, it was harder than she expected.',
        answerZh: '不，比她预期的更难。',
        choices: ['No, it was harder than she expected.', 'Yes, it was surprisingly easy.'],
      },
    ],
  },

  // ============================================================
  // C1 · 承认错误(职业诚信)
  // ============================================================
  {
    id: 'c1-owning-a-mistake',
    cefr: 'C1',
    titleEn: 'The Error He Owned Up To',
    titleZh: '他主动承认的错误',
    minutes: 7,
    source: '原创故事；情节结构遵循 Ray & Seely (2004) TPRS 经典模板',
    targetPhrases: [
      { en: 'owned up to', zh: '主动承认（过错）', cefr: 'C1' },
      { en: 'brushed under the carpet', zh: '被掩盖过去', cefr: 'C1' },
      { en: 'stood him in good stead', zh: '对他大有帮助', cefr: 'C1' },
    ],
    sentences: [
      { en: 'Three days before the report was due, Tomas realised that one of his figures was badly wrong.', zh: '报告截止前三天，托马斯意识到自己有一个数字严重错了。', keyPhrase: null },
      { en: 'The error was buried in an appendix that, in all likelihood, nobody would ever check.', zh: '这个错误藏在附录里，极可能永远不会有人去核对。', keyPhrase: null },
      { en: 'He was tempted to let the matter be quietly brushed under the carpet.', zh: '他一度想让这件事被悄悄掩盖过去。', keyPhrase: 'brushed under the carpet' },
      { en: 'Had the client relied on that figure, however, the financial consequences could have been severe.', zh: '然而，若客户依据那个数字行事，财务后果可能相当严重。', keyPhrase: null },
      { en: 'The following morning he owned up to the mistake in front of the whole project team.', zh: '第二天早上，他在整个项目组面前承认了这个错误。', keyPhrase: 'owned up to' },
      { en: 'Rather than blaming him, his supervisor thanked him and rearranged the schedule.', zh: '主管没有责怪他，而是感谢他，并重新调整了日程。', keyPhrase: null },
      { en: 'Two years later, when a team leader was needed, that reputation for honesty stood him in good stead.', zh: '两年后需要一位组长时，那份诚实的声誉对他大有帮助。', keyPhrase: 'stood him in good stead' },
      { en: 'As he puts it, admitting the error cost him one uncomfortable morning and saved him years of anxiety.', zh: '用他的话说，承认错误让他难受了一个上午，却省了他多年的焦虑。', keyPhrase: null },
    ],
    pqa: [
      { en: 'Is it hard for you to admit a mistake at work?', zh: '在工作中承认错误对你来说难吗？' },
      { en: 'What would you have done in his position?', zh: '换成你会怎么做？' },
    ],
    circling: [
      {
        targetSentence: 'The following morning he owned up to the mistake in front of the whole project team.',
        type: 'yes_no',
        question: 'Did Tomas admit the mistake?',
        questionZh: '托马斯承认错误了吗？',
        answer: 'Yes, he owned up to it.',
        answerZh: '是的，他主动承认了。',
        choices: ['Yes, he owned up to it.', 'No, he hid it.'],
      },
      {
        targetSentence: 'Rather than blaming him, his supervisor thanked him and rearranged the schedule.',
        type: 'either_or',
        question: 'Did his supervisor blame him or thank him?',
        questionZh: '主管是责怪他还是感谢他？',
        answer: 'His supervisor thanked him.',
        answerZh: '主管感谢了他。',
        choices: ['His supervisor thanked him.', 'His supervisor blamed him.'],
      },
      {
        targetSentence: 'The error was buried in an appendix that, in all likelihood, nobody would ever check.',
        type: 'wh',
        question: 'Where was the error hidden?',
        questionZh: '错误藏在哪里？',
        answer: 'In an appendix.',
        answerZh: '在附录里。',
        choices: ['In an appendix.', 'On the front page.', 'In an email to the client.'],
      },
      {
        targetSentence: 'Two years later, when a team leader was needed, that reputation for honesty stood him in good stead.',
        type: 'wh',
        question: 'What helped him two years later?',
        questionZh: '两年后是什么帮了他？',
        answer: 'His reputation for honesty.',
        answerZh: '他诚实的声誉。',
        choices: ['His reputation for honesty.', 'His ability to hide errors.', 'A recommendation from the client.'],
      },
    ],
  },
];
