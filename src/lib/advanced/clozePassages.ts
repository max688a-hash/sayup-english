// @ts-nocheck
// 完形填空语料(离线自动判对错)
// ------------------------------------------------------------
// 结构: 每篇短文用 [[n]] 标记第 n 个空; blanks 给出每空的选项与正确答案下标。
//   text   : 含 [[1]] [[2]] ... 占位的英文短文
//   blanks : [{ n, options:[...], answer:正确选项下标, zh:该空中文提示 }]
// 定位(用户决策 2026-07-24): 写作先以"填空 + 完形填空"为主(可离线判对错),
//   掌握后再进阶整篇写作。本文件是起步高质量语料, 后续按 CEFR 扩量(task#7)。
//
// 分级: a1 入门 / a2 日常 / b1 进阶 / b2 中高级

export const CLOZE_PASSAGES = [
  // ==================== A1 ====================
  {
    id: 'cloze-a1-morning',
    level: 'a1',
    title: 'My Morning',
    titleZh: '我的早晨',
    text: "Every morning I [[1]] up at seven o'clock. I [[2]] breakfast with my family. Then I [[3]] to school by bus. School [[4]] at eight.",
    blanks: [
      { n: 1, options: ['get', 'gets', 'got'], answer: 0, zh: '起床(I 用原形)' },
      { n: 2, options: ['have', 'has', 'having'], answer: 0, zh: '吃(早餐)' },
      { n: 3, options: ['go', 'goes', 'went'], answer: 0, zh: '去' },
      { n: 4, options: ['start', 'starts', 'starting'], answer: 1, zh: '开始(School 第三人称)' },
    ],
  },
  {
    id: 'cloze-a1-family',
    level: 'a1',
    title: 'My Family',
    titleZh: '我的家人',
    text: "This [[1]] my family. I [[2]] two brothers. My father [[3]] a teacher. We [[4]] happy together.",
    blanks: [
      { n: 1, options: ['is', 'are', 'am'], answer: 0, zh: '是(This 单数)' },
      { n: 2, options: ['have', 'has', 'having'], answer: 0, zh: '有(I 用 have)' },
      { n: 3, options: ['is', 'are', 'be'], answer: 0, zh: '是(father 单数)' },
      { n: 4, options: ['is', 'are', 'am'], answer: 1, zh: '是(We 用 are)' },
    ],
  },
  {
    id: 'cloze-a1-food',
    level: 'a1',
    title: 'At the Restaurant',
    titleZh: '在餐厅',
    text: "I am hungry. I [[1]] like a burger, please. [[2]] you have water? Thank you [[3]] much.",
    blanks: [
      { n: 1, options: ['would', 'will', 'am'], answer: 0, zh: '想要(would like)' },
      { n: 2, options: ['Do', 'Are', 'Is'], answer: 0, zh: '(一般疑问 Do you...)' },
      { n: 3, options: ['very', 'so', 'too'], answer: 0, zh: '非常(thank you very much)' },
    ],
  },
  // ==================== A2 ====================
  {
    id: 'cloze-a2-weekend',
    level: 'a2',
    title: 'Last Weekend',
    titleZh: '上个周末',
    text: "Last weekend I [[1]] to the park with my friends. We [[2]] football and [[3]] a picnic. It [[4]] a great day.",
    blanks: [
      { n: 1, options: ['went', 'go', 'goes'], answer: 0, zh: '去(过去式)' },
      { n: 2, options: ['played', 'play', 'plays'], answer: 0, zh: '踢(过去式)' },
      { n: 3, options: ['had', 'have', 'has'], answer: 0, zh: '吃/度过(过去式)' },
      { n: 4, options: ['was', 'were', 'is'], answer: 0, zh: '是(It 过去式)' },
    ],
  },
  {
    id: 'cloze-a2-shopping',
    level: 'a2',
    title: 'Shopping',
    titleZh: '购物',
    text: "Excuse me, how [[1]] is this jacket? It's forty dollars. That's [[2]] expensive. Do you have a [[3]] one?",
    blanks: [
      { n: 1, options: ['much', 'many', 'long'], answer: 0, zh: '多少钱(how much)' },
      { n: 2, options: ['too', 'very', 'so'], answer: 0, zh: '太(too expensive)' },
      { n: 3, options: ['cheaper', 'cheap', 'cheapest'], answer: 0, zh: '更便宜的(比较级)' },
    ],
  },
  {
    id: 'cloze-a2-plans',
    level: 'a2',
    title: 'My Plans',
    titleZh: '我的计划',
    text: "Tomorrow I am [[1]] to visit my grandmother. I [[2]] take the train. If it [[3]] not rain, we will walk in her garden.",
    blanks: [
      { n: 1, options: ['going', 'go', 'went'], answer: 0, zh: '打算(be going to)' },
      { n: 2, options: ['will', 'am', 'do'], answer: 0, zh: '将会(will take)' },
      { n: 3, options: ['does', 'do', 'is'], answer: 0, zh: '条件句否定(if it does not rain)' },
    ],
  },
  // ==================== B1 ====================
  {
    id: 'cloze-b1-job',
    level: 'b1',
    title: 'A New Job',
    titleZh: '一份新工作',
    text: "Sarah has [[1]] worked here for three years. She [[2]] promoted last month because she is very [[3]]. Her manager says she is the most [[4]] person on the team.",
    blanks: [
      { n: 1, options: ['already', 'yet', 'still'], answer: 0, zh: '已经(现在完成)' },
      { n: 2, options: ['was', 'is', 'has'], answer: 0, zh: '被(被动过去式 was promoted)' },
      { n: 3, options: ['reliable', 'reliably', 'reliability'], answer: 0, zh: '可靠的(形容词)' },
      { n: 4, options: ['hardworking', 'harder', 'hardly'], answer: 0, zh: '勤奋的' },
    ],
  },
  {
    id: 'cloze-b1-travel',
    level: 'b1',
    title: 'A Trip Abroad',
    titleZh: '一次出国旅行',
    text: "If I [[1]] enough money, I would travel around the world. I have always [[2]] to see Japan. Traveling [[3]] you meet new people and learn about other cultures.",
    blanks: [
      { n: 1, options: ['had', 'have', 'will have'], answer: 0, zh: '有(虚拟条件 if I had)' },
      { n: 2, options: ['wanted', 'want', 'wanting'], answer: 0, zh: '想(现在完成)' },
      { n: 3, options: ['helps', 'help', 'helping'], answer: 0, zh: '帮助(动名词主语用第三人称)' },
    ],
  },
  // ==================== B2 ====================
  {
    id: 'cloze-b2-environment',
    level: 'b2',
    title: 'Protecting the Environment',
    titleZh: '保护环境',
    text: "Climate change is one of the biggest challenges we [[1]] today. Unless we [[2]] action now, the damage may become [[3]]. Governments and individuals are equally [[4]] for the future of the planet.",
    blanks: [
      { n: 1, options: ['face', 'faces', 'facing'], answer: 0, zh: '面对(we 用原形)' },
      { n: 2, options: ['take', 'takes', 'took'], answer: 0, zh: '采取(unless we take)' },
      { n: 3, options: ['irreversible', 'reversible', 'reverse'], answer: 0, zh: '不可逆的' },
      { n: 4, options: ['responsible', 'response', 'responsibly'], answer: 0, zh: '有责任的(形容词)' },
    ],
  },
  {
    id: 'cloze-b2-technology',
    level: 'b2',
    title: 'Technology and Work',
    titleZh: '科技与工作',
    text: "Automation has [[1]] the way we work. While some jobs have disappeared, new ones have [[2]]. The key is to keep [[3]] new skills so that we remain [[4]] in a changing market.",
    blanks: [
      { n: 1, options: ['transformed', 'transform', 'transforming'], answer: 0, zh: '改变(现在完成)' },
      { n: 2, options: ['emerged', 'emerge', 'emerges'], answer: 0, zh: '出现(现在完成)' },
      { n: 3, options: ['learning', 'learn', 'learned'], answer: 0, zh: '学习(keep + doing)' },
      { n: 4, options: ['competitive', 'competition', 'compete'], answer: 0, zh: '有竞争力的(形容词)' },
    ],
  },
];

// 扩量批次 II(A1–C1, 含 C1) —— 分文件维护, 便于继续扩量与审计
import { CLOZE_PASSAGES_2 } from './clozePassages2';

/** 全部完形短文(批次 I + II) */
export const ALL_CLOZE_PASSAGES = [...CLOZE_PASSAGES, ...CLOZE_PASSAGES_2];

export function getClozeByLevel(level) {
  return ALL_CLOZE_PASSAGES.filter((p) => p.level === level);
}

export function getAllCloze() {
  return ALL_CLOZE_PASSAGES;
}
