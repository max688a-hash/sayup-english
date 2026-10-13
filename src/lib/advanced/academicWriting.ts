// @ts-nocheck
// 学术写作 · 雅思/托福写作练习（离线 · 自评，非 AI 打分）
// ----------------------------------------------------------------------------
// 诚实声明（红线16 / 红线30 反画饼）：
//   本模块**不做 AI 自动打分**（内容质量的自动评分需要 AI/人工，本机离线做不到）。
//   它提供可离线完成的真实练习闭环：
//     题目 → 结构脚手架 + 有用表达 → 写作（实时客观字数统计）
//       → 对照官方四维评分标准做**引导式自评** → 展开**范文**对照学习。
//   其中「字数是否达标」是客观可判定的；四维评分是**用户按官方标准自评**（诚实的学习工具）。
//
// 来源与格式（公开机构标准，可引用）：
//   IELTS Writing Task 1 (Academic) & Task 2 官方题型与评分维度（IELTS.org 公开 band descriptors）
//   TOEFL iBT Independent Writing 官方题型（ETS 公开）

export const WRITING_TASKS = [
  {
    id: 'w-ielts-t2-school-age',
    exam: '语芽',
    task: '议论文',
    taskZh: '大作文 · 讨论双方观点并给出自己看法',
    title: 'The right age to start school',
    titleZh: '开始上学的年龄',
    minWords: 250,
    timeMin: 40,
    prompt: {
      en: 'Some people think children should start formal schooling at a very early age, while others believe they should start later. Discuss both views and give your own opinion.',
      zh: '有人认为孩子应该在很小的年纪就开始正规学校教育，有人认为应该晚一些。讨论双方观点，并给出你自己的看法。',
    },
    guidance: [
      { en: 'Introduction: paraphrase the topic + state that you will discuss both views and give your opinion.', zh: '引言：改写题目 + 说明你将讨论双方并给出观点。' },
      { en: 'Body 1: reasons why an early start can be good (fast learning, social skills).', zh: '主体段1：早上学的好处（学得快、社交能力）。' },
      { en: 'Body 2: reasons why a later start can be better (learning through play, less pressure).', zh: '主体段2：晚上学的好处（在游戏中学习、压力更小）。' },
      { en: 'Conclusion: restate your opinion clearly.', zh: '结论：清晰重申你的观点。' },
    ],
    usefulPhrases: [
      { en: 'While some argue that... , others believe that...', zh: '虽然有人认为……，但另一些人相信……' },
      { en: 'In my view, ... is preferable because...', zh: '在我看来，……更可取，因为……' },
      { en: 'On the other hand, ...', zh: '另一方面，……' },
      { en: 'In conclusion, although there are arguments on both sides, ...', zh: '总之，尽管双方都有道理，……' },
    ],
    model: {
      wordCount: 270,
      text: 'The question of when children should begin formal schooling is a topic of ongoing debate. While some argue that an early start is beneficial, others feel that children gain more by beginning later. In my view, a slightly later start is preferable for most children.\n\nThose who support starting school early believe that young children learn quickly and easily. During the first years of life, the brain develops rapidly, so early exposure to reading and numbers may give children a strong foundation. In addition, school offers a structured environment in which children can develop social skills and independence at a young age.\n\nOn the other hand, many educators argue that very young children benefit more from play than from formal lessons. Through play, they develop imagination, curiosity and physical skills, all of which are difficult to teach in a classroom. Starting formal study too early may also place unnecessary pressure on children and reduce their natural enjoyment of learning.\n\nIn my opinion, although early education has some advantages, the drawbacks are more significant. Children who begin formal schooling a little later, after a period of guided play, often develop a healthier attitude towards learning. Indeed, several countries where school begins at six or seven achieve excellent educational results.\n\nIn conclusion, while there are reasonable arguments on both sides, I believe that a slightly later start, combined with plenty of play in the early years, is the best approach for most children. What matters most is not the exact starting age itself, but whether young learners are given the time and support they need to develop a lasting curiosity about learning.',
      notesZh: '范文亮点：① 引言改写题目并明确表态；② 两个主体段分别讨论双方，各有例证；③ 用 while / on the other hand / in conclusion 等连接词衔接；④ 结论重申观点，未引入新论点。',
    },
  },
  {
    id: 'w-ielts-t2-technology',
    exam: '语芽',
    task: '议论文',
    taskZh: '大作文 · 同意与否',
    title: 'Has technology made life too complicated?',
    titleZh: '科技让生活太复杂了吗',
    minWords: 250,
    timeMin: 40,
    prompt: {
      en: 'Some people believe that modern technology has made our lives too complicated, and that we should return to a simpler way of life. To what extent do you agree or disagree?',
      zh: '有人认为现代科技让我们的生活太复杂，我们应该回到更简单的生活方式。你在多大程度上同意或不同意？',
    },
    guidance: [
      { en: 'Introduction: paraphrase + state your position (agree / disagree / partly).', zh: '引言：改写题目 + 表明立场（同意/不同意/部分同意）。' },
      { en: 'Body 1: acknowledge the other side (technology can create pressure).', zh: '主体段1：承认对立观点（科技会带来压力）。' },
      { en: 'Body 2: your main argument with examples (benefits: communication, medicine, education).', zh: '主体段2：你的主要论点及例子（好处：通讯、医疗、教育）。' },
      { en: 'Conclusion: restate position; suggest using technology wisely.', zh: '结论：重申立场；建议明智地使用科技。' },
    ],
    usefulPhrases: [
      { en: 'It is sometimes argued that...', zh: '有时有人认为……' },
      { en: 'While I understand this concern, I largely disagree.', zh: '虽然我理解这种担忧，但我大体上不同意。' },
      { en: 'The benefits clearly outweigh the drawbacks.', zh: '好处明显大于坏处。' },
      { en: 'Rather than rejecting X, we should...', zh: '与其拒绝 X，我们应该……' },
    ],
    model: {
      wordCount: 279,
      text: 'It is sometimes argued that modern technology has made life overly complicated, and that we would be better off returning to a simpler way of living. While I understand this concern, I largely disagree with it.\n\nIt is true that technology can create pressure. Many people feel that they must always be available by phone or email, and a constant stream of notifications can make it hard to relax. Furthermore, learning to use new devices and applications can be frustrating, particularly for older people who did not grow up with them.\n\nHowever, the benefits of technology are, in my opinion, far greater than these drawbacks. Modern tools have made communication faster and cheaper, allowing families separated by long distances to stay in close contact. In medicine, technology has improved diagnosis and treatment, saving countless lives. In education, students can now access information and courses that would once have been impossible to obtain.\n\nMoreover, the idea of returning to a simpler life is not realistic. The world\u2019s large population depends on technology for food production, transport and healthcare, so abandoning these tools would cause serious problems rather than solving them.\n\nIt is also worth remembering that the complexity people complain about is often a matter of design and habit rather than technology itself. A device with a confusing interface, or a phone checked two hundred times a day, creates stress that better design and clearer personal rules could largely prevent.\n\nIn conclusion, although technology can sometimes make life feel complicated, its advantages clearly outweigh its disadvantages. Rather than rejecting technology, we should learn to use it wisely and set sensible limits, so that it serves us rather than controls us.',
      notesZh: '范文亮点：① 明确立场（largely disagree）；② 先让步（承认压力）再反驳；③ 举了通讯/医疗/教育三个具体领域；④ 结尾给出“明智使用”的平衡建议。',
    },
  },
  {
    id: 'w-ielts-t1-internet',
    exam: '语芽',
    task: '看图写',
    taskZh: '小作文 · 数据报告（表格）',
    title: 'Household internet access (table)',
    titleZh: '家庭互联网普及率（表格）',
    minWords: 150,
    timeMin: 20,
    prompt: {
      en: 'The table below shows the percentage of households with internet access in four countries in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      zh: '下表显示四个国家 2010 年和 2020 年拥有互联网接入的家庭百分比。选取并报告主要特征，并在相关处进行比较，概括这些信息。',
    },
    dataTable: {
      header: ['Country 国家', '2010', '2020'],
      rows: [
        ['Germany 德国', '75%', '92%'],
        ['Japan 日本', '68%', '87%'],
        ['Brazil 巴西', '31%', '71%'],
        ['Nigeria 尼日利亚', '11%', '44%'],
      ],
    },
    guidance: [
      { en: 'Introduction: paraphrase what the table shows (do NOT copy word for word).', zh: '引言：改写表格所示内容（不要逐字照抄）。' },
      { en: 'Overview: state the 1-2 biggest general trends (all rose; rich countries stayed highest).', zh: '总览：写出 1-2 个最大总体趋势（都上升；发达国家始终最高）。' },
      { en: 'Details 1: describe the highest countries with figures.', zh: '细节段1：用数据描述最高的国家。' },
      { en: 'Details 2: describe the biggest changes with figures.', zh: '细节段2：用数据描述变化最大的国家。' },
      { en: 'No opinion or conclusion is needed when describing a chart.', zh: '看图写不需要个人观点或结论。' },
    ],
    usefulPhrases: [
      { en: 'The table compares... in ... and ...', zh: '该表比较了……在……和……' },
      { en: 'Overall, ... increased in all ..., but ...', zh: '总体而言，所有……都增长了，但……' },
      { en: 'X rose sharply / more than doubled, from ... to ...', zh: 'X 急剧上升 / 翻了一倍多，从……到……' },
      { en: 'respectively', zh: '分别地' },
    ],
    model: {
      wordCount: 154,
      text: 'The table compares the proportion of households with internet access in Germany, Japan, Brazil and Nigeria in 2010 and 2020.\n\nOverall, internet access increased in all four countries over the decade, yet the wealthier nations maintained the highest levels throughout the period.\n\nIn 2010, Germany had the greatest proportion of connected households, at 75%, closely followed by Japan at 68%. By 2020, both figures had risen further, reaching 92% and 87% respectively, so these two countries remained the most connected.\n\nThe most dramatic changes, however, occurred in the developing economies. In Brazil, internet access more than doubled, climbing from 31% to 71%. Nigeria showed a similar pattern: although it began with the lowest figure of just 11%, this rose sharply to 44% by 2020.\n\nIn summary, while every country experienced growth over the period shown, the gap between the most and least connected nations narrowed noticeably across the ten years covered by the table.',
      notesZh: '范文亮点：① 引言改写题目；② 有独立的总述段写总体趋势；③ 每个数据都带具体数字与比较（respectively / more than doubled）；④ 没有加入个人观点。',
    },
  },
  {
    id: 'w-toefl-teamwork',
    exam: '语芽',
    task: '观点作文',
    taskZh: '独立写作',
    title: 'Teamwork or working alone?',
    titleZh: '团队合作还是独自工作',
    minWords: 300,
    timeMin: 30,
    prompt: {
      en: 'Do you agree or disagree with the following statement? It is better to work as part of a team than to work alone. Use specific reasons and examples to support your answer.',
      zh: '你是否同意以下陈述？作为团队的一员工作比独自工作更好。用具体理由和例子支持你的回答。',
    },
    guidance: [
      { en: 'Introduction: state your opinion + preview two reasons.', zh: '引言：表明观点 + 预告两个理由。' },
      { en: 'Body 1: first reason + a specific personal example.', zh: '主体段1：第一个理由 + 一个具体的个人例子。' },
      { en: 'Body 2: second reason + example.', zh: '主体段2：第二个理由 + 例子。' },
      { en: 'Concession: briefly admit the other side, then defend your view.', zh: '让步段：简短承认对立面，再维护你的观点。' },
      { en: 'Conclusion: restate opinion firmly.', zh: '结论：坚定重申观点。' },
    ],
    usefulPhrases: [
      { en: 'I feel this way for two main reasons.', zh: '我这样认为有两个主要原因。' },
      { en: 'To begin with, ... Secondly, ...', zh: '首先……其次……' },
      { en: 'For example, when I ...', zh: '例如，当我……的时候' },
      { en: 'Of course, ... Nevertheless, ...', zh: '当然……尽管如此……' },
    ],
    model: {
      wordCount: 318,
      text: 'In my opinion, working as part of a team is usually more effective and rewarding than working alone, although both approaches have their place. I feel this way for two main reasons: teams combine different strengths, and they provide valuable support.\n\nTo begin with, a team brings together people with different skills and perspectives. When I worked on a group project at university, one member was excellent at research, another at design, and a third at presenting. Because we could each focus on our strengths, the final result was far better than anything one person could have produced alone. Difficult problems were also solved more quickly, since someone in the group usually had an idea that the others had not considered.\n\nSecondly, working in a team provides encouragement and motivation. When I work by myself, it is easy to lose focus or feel discouraged after a setback. In a team, however, other members can offer help and remind me why the work matters. This support makes challenges feel more manageable and the whole process more enjoyable.\n\nOf course, teamwork is not always perfect. Disagreements can slow progress, and some tasks, such as writing or deep thinking, may be done better quietly and alone. Nevertheless, even in these cases, discussing ideas with others beforehand and afterwards usually improves the final outcome.\n\nA further benefit that people often overlook is that teamwork teaches skills which are valuable long after the task itself is finished. Explaining my reasoning to others, listening to criticism without taking offence, and dividing responsibilities fairly are all abilities that I use constantly at work today, and none of them can be practised while studying alone in a quiet room.\n\nIn conclusion, while there are situations in which working alone is useful, I firmly believe that teamwork is generally the better choice, because it combines diverse abilities, offers essential support, and builds skills that last a lifetime.',
      notesZh: '范文亮点：① 开头表态并预告两个理由；② 每段一个理由 + 具体例子；③ 有让步段体现思辨；④ 结论坚定，用词多样（rewarding/perspectives/setback/outcome）。',
    },
  },
];

// 官方四维评分标准（IELTS Writing band descriptors 公开维度）——用于「引导式自评」
// 每个维度给出 3 条可自查的 yes/no 描述；用户勾选后得到自评达标项数（诚实：自评，非 AI 判分）
export const WRITING_CRITERIA = [
  {
    key: 'task',
    name: 'Answer the question',
    nameZh: '把题写清',
    checks: [
      { en: 'I addressed every part of the question.', zh: '我回答了题目的每一个部分。' },
      { en: 'My position/opinion is clear throughout.', zh: '我的立场/观点全文清晰一致。' },
      { en: 'My main ideas are supported with examples or reasons.', zh: '我的主要观点有例子或理由支撑。' },
    ],
  },
  {
    key: 'coherence',
    name: 'Clear paragraphs',
    nameZh: '段落连得上',
    checks: [
      { en: 'I used clear paragraphs, each with one main idea.', zh: '我分段清晰，每段一个中心意思。' },
      { en: 'I used linking words (however, therefore, for example...).', zh: '我使用了连接词（however / therefore / for example…）。' },
      { en: 'My ideas are in a logical order.', zh: '我的观点顺序合乎逻辑。' },
    ],
  },
  {
    key: 'lexical',
    name: 'Word choice',
    nameZh: '词用得准',
    checks: [
      { en: 'I used some less common or topic-specific vocabulary.', zh: '我用了一些较高级或话题相关的词汇。' },
      { en: 'I avoided repeating the same words too often.', zh: '我尽量避免重复同一个词。' },
      { en: 'My spelling is mostly correct.', zh: '我的拼写基本正确。' },
    ],
  },
  {
    key: 'grammar',
    name: 'Sentences',
    nameZh: '句子写对',
    checks: [
      { en: 'I used complex sentences, not only simple ones.', zh: '我使用了复合/复杂句，不只是简单句。' },
      { en: 'My tenses and subject-verb agreement are mostly correct.', zh: '我的时态和主谓一致基本正确。' },
      { en: 'My punctuation (commas, full stops) is correct.', zh: '我的标点（逗号、句号）正确。' },
    ],
  },
];

// 第二批(加厚): 补齐 IELTS Task 1 数据/流程题 + Task 2 单边论证 + TOEFL 偏好选择
import { WRITING_TASKS_2 } from './academicWriting2';

/** 全部写作题(第一批 + 第二批) */
export const ALL_WRITING_TASKS = [...WRITING_TASKS, ...WRITING_TASKS_2];

export const WRITING_META = {
  source: '语芽程序内进阶写作 · 自编题目与四维自评。',
  note: '离线自评练习：字数为客观统计；四维为语芽引导式自评（非 AI 自动打分）。范文供对照学习。',
};

export function countWritingTasks() {
  return ALL_WRITING_TASKS.length;
}
