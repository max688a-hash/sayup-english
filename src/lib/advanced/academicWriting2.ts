// @ts-nocheck
// 学术写作 · 第二批(加厚: 4 题 → 8 题)
// ----------------------------------------------------------------------------
// 诚实声明(与第一批一致, 红线16 反画饼):
//   不做 AI 自动打分。提供可离线完成的闭环: 题目 → 结构脚手架 + 有用表达
//   → 写作(客观字数统计) → 按官方四维标准引导式自评 → 范文对照。
//
// 本批补齐第一批缺的题型(原来只有 Task 2 类):
//   · IELTS Task 1 Academic —— 数据图表描述(数据以文字给出, 离线自足, 无需图片)
//   · IELTS Task 1 Academic —— 流程图描述(process)
//   · IELTS Task 2 —— agree/disagree 单边论证型
//   · TOEFL Independent —— 偏好选择型
//
// 来源与格式(公开机构标准, 可引用):
//   IELTS Writing Task 1/Task 2 官方题型与 band descriptors(IELTS.org 公开)
//   TOEFL iBT Independent Writing 官方题型(ETS 公开)

export const WRITING_TASKS_2 = [
  // ============================================================
  // IELTS Task 1 · 数据描述(折线/表格类, 数据以文字给出)
  // ============================================================
  {
    id: 'w-ielts-t1-coffee-tea',
    exam: '语芽',
    task: '看图写',
    taskZh: '小作文 · 数据描述(趋势对比)',
    title: 'Coffee and tea consumption',
    titleZh: '咖啡与茶的消费量',
    minWords: 150,
    timeMin: 20,
    prompt: {
      en: 'The table below shows the average cups of coffee and tea consumed per person per week in one country in 1990, 2005 and 2020.\n\n1990 — coffee 4 cups, tea 12 cups\n2005 — coffee 9 cups, tea 8 cups\n2020 — coffee 14 cups, tea 5 cups\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      zh: '下表显示某国 1990、2005、2020 年人均每周消费的咖啡与茶的杯数。\n\n1990 年—咖啡 4 杯，茶 12 杯\n2005 年—咖啡 9 杯，茶 8 杯\n2020 年—咖啡 14 杯，茶 5 杯\n\n概括主要特征并在相关处作比较。',
    },
    guidance: [
      { en: 'Introduction: paraphrase the question (what the data shows, where, when). Do NOT copy the wording.', zh: '引言：改写题目（数据是什么、哪里、什么时候）。不要照抄原句。' },
      { en: 'Overview: state the two biggest overall trends in one or two sentences (coffee up, tea down; they crossed over).', zh: '概述：用一两句写出两个最大总体趋势（咖啡升、茶降；中间发生反超）。' },
      { en: 'Body 1: describe coffee with figures (4 → 9 → 14).', zh: '主体段1：带数据描述咖啡（4→9→14）。' },
      { en: 'Body 2: describe tea with figures and compare (12 → 8 → 5).', zh: '主体段2：带数据描述茶并作对比（12→8→5）。' },
      { en: 'No conclusion and no opinion when describing a chart — only report the data.', zh: '看图写不写结论、不给个人观点，只客观报告数据。' },
    ],
    usefulPhrases: [
      { en: 'The table illustrates / compares ...', zh: '该表格展示／比较了……' },
      { en: 'Overall, coffee consumption rose steadily, whereas tea fell.', zh: '总体而言，咖啡消费稳步上升，而茶则下降。' },
      { en: 'rose from 4 to 9 cups / more than tripled', zh: '从 4 杯升到 9 杯／增长了两倍多' },
      { en: 'By 2005, the two figures had almost converged.', zh: '到 2005 年，两个数字已几乎接近。' },
      { en: 'a downward / upward trend', zh: '下降／上升趋势' },
    ],
    model: {
      wordCount: 151,
      text: 'The table compares how many cups of coffee and tea an average person in one country drank each week in 1990, 2005 and 2020.\n\nOverall, coffee consumption increased sharply over the thirty-year period, while tea consumption fell steadily. The two drinks swapped positions at some point between 1990 and 2005.\n\nIn 1990, tea was by far the more popular drink, at 12 cups per person per week, compared with only 4 cups of coffee. By 2005, however, coffee had risen to 9 cups while tea had dropped to 8, meaning the two were almost equal.\n\nThis pattern continued in the following fifteen years. Coffee consumption climbed further to 14 cups per week in 2020, more than three times the 1990 figure. Tea, by contrast, declined to just 5 cups, less than half its original level. As a result, by 2020 people were drinking almost three times as much coffee as tea.',
      notesZh: '范文亮点：① 引言改写题目未照抄；② 独立总述段点出两大趋势与"反超"；③ 每段带具体数字并作比较（rose from... to...、more than three times）；④ 全文无个人观点。',
    },
  },

  // ============================================================
  // IELTS Task 1 · 流程描述(process)
  // ============================================================
  {
    id: 'w-ielts-t1-recycling',
    exam: '语芽',
    task: '看图写',
    taskZh: '小作文 · 流程描述(process)',
    title: 'How glass bottles are recycled',
    titleZh: '玻璃瓶回收流程',
    minWords: 150,
    timeMin: 20,
    prompt: {
      en: 'The diagram below shows the process by which glass bottles are recycled. The stages are:\n\n1) used bottles collected from households\n2) bottles sorted by colour\n3) washed to remove labels and dirt\n4) crushed into small pieces called cullet\n5) cullet melted in a furnace at 1500°C\n6) molten glass poured into moulds to form new bottles\n7) new bottles delivered to shops\n\nSummarise the information by selecting and reporting the main features.',
      zh: '下图显示玻璃瓶的回收流程，各阶段为：\n\n1) 从住户收集用过的玻璃瓶\n2) 按颜色分类\n3) 清洗去除标签和污物\n4) 压碎成小碎片（碎玻璃 cullet）\n5) 碎玻璃在 1500°C 炉中熔化\n6) 熔融玻璃倒入模具成型为新瓶\n7) 新瓶配送到商店\n\n概括并报告主要特征。',
    },
    guidance: [
      { en: 'Introduction: paraphrase — say what process the diagram shows and how many stages it has.', zh: '引言：改写题目——说明该图展示什么流程、共几个阶段。' },
      { en: 'Overview: say whether the process is linear or cyclical, and name the first and last stages.', zh: '概述：说明流程是线性还是循环的，并指出首尾阶段。' },
      { en: 'Body: describe the stages in order using the passive voice and sequencers.', zh: '主体：按顺序描述各阶段，使用被动语态与顺序连接词。' },
      { en: 'Include the key detail (1500°C) but do not invent data that is not given.', zh: '写出关键细节（1500°C），但不要编造题目未给的数据。' },
    ],
    usefulPhrases: [
      { en: 'The diagram illustrates the process of ...', zh: '该图展示了……的流程' },
      { en: 'the process consists of seven main stages', zh: '该流程包含七个主要阶段' },
      { en: 'First / Next / After that / Subsequently / Finally', zh: '首先／接下来／之后／随后／最后' },
      { en: 'the bottles are washed and then crushed', zh: '瓶子被清洗，然后被压碎' },
      { en: 'at which point / before being delivered to', zh: '此时／在被配送到……之前' },
    ],
    model: {
      wordCount: 166,
      text: 'The diagram illustrates the way in which used glass bottles are recycled and eventually turned into brand new bottles. Overall, the process consists of seven main stages, beginning with the collection of used bottles from private homes and ending with the delivery of finished new bottles to shops.\n\nAt the first stage, used glass bottles are collected from households. These bottles are then sorted according to their colour, after which they are washed so that labels and any dirt are removed.\n\nOnce the bottles are clean, they are crushed into small fragments known as cullet. This cullet is then transferred to a furnace, where it is melted at a temperature of 1500 degrees Celsius.\n\nIn the final stages, the molten glass is poured into moulds so that new bottles can be formed. These newly made bottles are finally delivered to shops, where they can be sold and eventually collected again, making the process a continuous cycle.',
      notesZh: '范文亮点：① 引言 + 独立 overview（点明七阶段、首尾）；② 全篇被动语态（are collected / are sorted / is melted）符合流程题要求；③ 顺序词有变化（At the first stage / then / Once / In the final stages）；④ 结尾指出"循环"，未编造数据。',
    },
  },

  // ============================================================
  // IELTS Task 2 · 同意与否(单边论证)
  // ============================================================
  {
    id: 'w-ielts-t2-remote-work',
    exam: '语芽',
    task: '议论文',
    taskZh: '大作文 · 是否同意(单边论证)',
    title: 'Working from home',
    titleZh: '居家办公',
    minWords: 250,
    timeMin: 40,
    prompt: {
      en: 'Some people believe that employees should be allowed to work from home whenever they wish. To what extent do you agree or disagree?',
      zh: '有人认为应允许员工随时居家办公。你在多大程度上同意或不同意？',
    },
    guidance: [
      { en: 'Decide your position clearly in the introduction (fully agree / partly agree / disagree). Partial agreement is usually easiest to argue well.', zh: '引言就明确表态（完全同意／部分同意／不同意）。"部分同意"通常最容易写好。' },
      { en: 'Body 1: the strongest reason supporting flexibility (productivity, commuting time, work-life balance).', zh: '主体段1：支持灵活办公最有力的理由（效率、通勤时间、工作生活平衡）。' },
      { en: 'Body 2: the limits — jobs and situations where it does not work (teamwork, training new staff, some industries).', zh: '主体段2：局限——哪些工作/情况行不通（团队协作、带新人、某些行业）。' },
      { en: 'Conclusion: restate your qualified position; add no new arguments.', zh: '结论：重申你有限定的立场；不要引入新论点。' },
      { en: 'Use one concrete example per body paragraph — examples raise the Task Response score.', zh: '每个主体段给一个具体例子——例子能提高 Task Response 得分。' },
    ],
    usefulPhrases: [
      { en: 'I partly agree with this view, for the following reasons.', zh: '我部分同意这一观点，理由如下。' },
      { en: 'The main argument in favour of ... is that ...', zh: '支持……的主要理由是……' },
      { en: 'This is particularly true of jobs which ...', zh: '这尤其适用于那些……的工作' },
      { en: 'That said, there are clear limits to this approach.', zh: '话虽如此，这种做法有明显的局限。' },
      { en: 'On balance, I believe that ... rather than ...', zh: '总体权衡，我认为……而非……' },
    ],
    model: {
      wordCount: 271,
      text: 'It is sometimes argued that staff should be free to work from home whenever they choose. While I agree that flexibility brings real benefits, I do not believe it can be an unconditional right in every job.\n\nThere are strong reasons to support home working. Most obviously, employees save the time and expense of commuting, which in large cities can amount to two hours a day. That time can be spent on rest, family or exercise, and staff who are less exhausted tend to work more effectively. In addition, many people concentrate better away from the noise of an open-plan office. A software developer, for example, may produce far more in a quiet room at home than in a busy workplace full of interruptions.\n\nHowever, unlimited freedom to work remotely is not realistic. Some roles simply cannot be performed at a distance: nurses, factory workers and teachers of young children all need to be physically present. Even in office-based jobs, complete remote working can weaken teams. New employees in particular learn a great deal informally, by overhearing conversations and asking quick questions, and this kind of learning is lost when everyone works alone. Complex projects that require constant negotiation also tend to progress faster when people meet face to face.\n\nIn my view, therefore, the sensible approach is a hybrid one. Employers should allow staff to work from home for part of the week, while keeping some shared days for meetings, training and teamwork.\n\nIn conclusion, although home working offers clear advantages in terms of time and concentration, it should be treated as a flexible arrangement agreed with the employer rather than an absolute entitlement.',
      notesZh: '范文亮点：① 引言明确"部分同意"立场；② 两个主体段各有具体例子（软件开发者／护士与新员工）；③ 第三段给出折中方案，体现思辨深度；④ 结论重申限定立场未加新论点；⑤ 连接词自然（Most obviously / In addition / However / In my view）。',
    },
  },

  // ============================================================
  // TOEFL Independent · 偏好选择
  // ============================================================
  {
    id: 'w-toefl-ind-learning-style',
    exam: '语芽',
    task: '观点作文',
    taskZh: '独立写作 · 偏好选择并说明理由',
    title: 'Learning alone or in a group',
    titleZh: '独自学习还是小组学习',
    minWords: 300,
    timeMin: 30,
    prompt: {
      en: 'Some students prefer to study alone. Others prefer to study with a group of classmates. Which do you prefer? Use specific reasons and examples to support your answer.',
      zh: '有些学生喜欢独自学习，有些喜欢和同学一起学习。你更喜欢哪种？用具体理由和例子支持你的回答。',
    },
    guidance: [
      { en: 'State your preference immediately — a clear thesis in the first paragraph.', zh: '开篇立刻表明偏好——第一段要有清晰主旨。' },
      { en: 'Give two or three developed reasons, one per paragraph, each with a personal example.', zh: '给出两到三个充分展开的理由，每段一个，各配一个亲身例子。' },
      { en: 'Acknowledge the other side briefly, then explain why your preference still wins.', zh: '简要承认另一方，再解释为何你的偏好仍更好。' },
      { en: 'Conclusion: restate the preference in different words.', zh: '结论：用不同措辞重申偏好。' },
      { en: 'Personal examples are welcome here — use "I" freely.', zh: '这里鼓励用亲身例子，可以放心用 "I"。' },
    ],
    usefulPhrases: [
      { en: 'Although both approaches have merit, I personally prefer ...', zh: '尽管两种方式各有优点，我个人更喜欢……' },
      { en: 'The primary reason for this preference is that ...', zh: '这一偏好的首要原因是……' },
      { en: 'To illustrate, when I was preparing for ...', zh: '举例来说，当我在准备……时' },
      { en: 'Admittedly, studying in a group can ...', zh: '诚然，小组学习可以……' },
      { en: 'For these reasons, I remain convinced that ...', zh: '基于这些理由，我仍然确信……' },
    ],
    model: {
      wordCount: 320,
      text: 'Both studying alone and studying with classmates can be effective, and most successful students probably do some of each. If I have to choose, however, I prefer to study in a small group, mainly because explaining ideas out loud forces me to understand them properly.\n\nThe primary reason for this preference is that group study exposes gaps in my knowledge immediately. When I read alone, I often feel that I understand a topic, but that feeling can be misleading. To illustrate, when I was preparing for a biology examination last year, I was confident about the process of photosynthesis until a classmate asked me to explain why plants release oxygen. I could not answer clearly, and only then did I realise that I had memorised the diagram without understanding it. That single question saved me from losing marks in the exam.\n\nA second advantage is motivation. Studying alone requires enormous self-discipline, and it is easy to postpone difficult chapters indefinitely. In a group, however, there is a fixed time and place, and other people are relying on me to arrive prepared. During my final year, my study group met every Tuesday evening, and I completed far more reading that term than in any previous one, simply because I did not want to be the member who had done nothing.\n\nAdmittedly, group study has real drawbacks. Conversations can drift away from the subject, and a group that is too large often becomes a social event rather than a study session. For tasks that demand deep concentration, such as writing an essay or solving difficult mathematics problems, I still work alone.\n\nFor these reasons, I remain convinced that group study suits me better overall. It reveals what I do not yet understand, keeps me accountable to a schedule, and turns studying into an active process rather than a passive one, while I reserve solitary work for the tasks that truly require silence.',
      notesZh: '范文亮点：① 首段直接表态并给出核心理由；② 两个主体段各有详细亲身例子（光合作用被同学问住／周二学习小组）；③ 第四段让步承认缺点并划定边界；④ 结论换词重申，未简单重复；⑤ 字数 322 超过 300 下限。',
    },
  },
];
