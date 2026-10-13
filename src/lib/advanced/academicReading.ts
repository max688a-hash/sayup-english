// @ts-nocheck
// 学术阅读 · 进阶文章 + 雅思题型 + 自动判分（离线、免费）
// ----------------------------------------------------------------------------
// 来源与格式（公开机构标准，可引用，非泄题、非付费）：
//   Cambridge English — IELTS Academic Reading Test Format
//   （3 篇文章 / 40 题 / 60 分钟；公开题型：True-False-Not Given、Multiple Choice、
//     Sentence Completion 等）
//
// 说明（红线十六 诚实）：本模块为可离线自测的 MVP 级——文章为自撰学术科普
//   （约 280–340 词，短于真题 700–900 词），题型取雅思三种最核心且可客观判分者。
//   目标是给出「读 → 答题 → 客观打分 → 看解析」的真实闭环反馈，后续持续扩充篇幅与题型。
//
// 数据结构：
//   passage = { id, title, titleZh, field, fieldZh, level, paragraphs:[{label,en,zh}], questions:[Q] }
//   Q（三选一 type）：
//     { id, type:'tfng', prompt, promptZh, answer:'true'|'false'|'notgiven', explainZh }
//     { id, type:'mcq',  prompt, promptZh, options:[..], answer:<index>, explainZh }
//     { id, type:'gap',  prompt, promptZh, answer, accept:[..], explainZh }   // 填空：从文中找词

// 加厚批次 II（4 篇：语言学 / 城市规划 / 认知科学 / 材料科学），分文件维护
import { ACADEMIC_READING_2 } from './academicReading2';
// 真题级篇幅（3 篇：700–900 词 / 篇，各 13 题），置于列表最前
import { ACADEMIC_READING_FULL } from './academicReadingFull';

export const ACADEMIC_READING = [
  ...ACADEMIC_READING_FULL,
  {
    id: 'ar-coral',
    title: 'Coral Reefs Under Pressure',
    titleZh: '承压的珊瑚礁',
    field: 'Environmental Science',
    fieldZh: '环境科学',
    level: 'b2',
    paragraphs: [
      {
        label: 'A',
        en: 'Coral reefs are often called the rainforests of the sea because of their extraordinary biodiversity. Although they cover less than one percent of the ocean floor, they provide a home for around a quarter of all marine species. Reefs are built by tiny animals called coral polyps, which live together in vast colonies.',
        zh: '珊瑚礁因其非凡的生物多样性常被称为“海洋中的雨林”。尽管它们覆盖的海底不到百分之一，却为大约四分之一的海洋物种提供了家园。珊瑚礁由称为珊瑚虫的微小动物建造，它们成群地生活在庞大的群落中。',
      },
      {
        label: 'B',
        en: 'Each polyp produces a hard skeleton of calcium carbonate. Over thousands of years, the skeletons of countless polyps build up to form the solid structure of a reef. The living polyps grow only on the surface, while the rock beneath is the remains of earlier generations.',
        zh: '每只珊瑚虫都会分泌一层碳酸钙的硬骨骼。历经数千年，无数珊瑚虫的骨骼层层堆积，形成珊瑚礁的坚固结构。活的珊瑚虫只生长在表面，而下方的岩石是更早世代的遗骸。',
      },
      {
        label: 'C',
        en: 'Corals owe their bright colours to microscopic algae that live inside their tissues. This relationship benefits both partners: the algae gain shelter, while the coral receives food produced by the algae through photosynthesis. This kind of close partnership between two species is known as symbiosis.',
        zh: '珊瑚鲜艳的颜色来自生活在其组织内的微小藻类。这种关系让双方都受益：藻类获得庇护，而珊瑚获得藻类通过光合作用制造的食物。两个物种之间这种紧密的伙伴关系被称为共生。',
      },
      {
        label: 'D',
        en: 'However, this partnership is fragile. When the water becomes too warm, the coral expels the algae, losing both its colour and its main food source. The reef turns white, a process called bleaching. If high temperatures continue, the weakened coral may eventually die.',
        zh: '然而，这种伙伴关系很脆弱。当水温过高时，珊瑚会排出藻类，同时失去颜色和主要食物来源。珊瑚礁变白，这一过程称为白化。如果高温持续，虚弱的珊瑚最终可能死亡。',
      },
      {
        label: 'E',
        en: 'Scientists warn that rising sea temperatures, caused largely by climate change, are making bleaching events more frequent. Protecting reefs will require both local action, such as reducing pollution, and global efforts to limit warming.',
        zh: '科学家警告，主要由气候变化引起的海温上升正使白化事件变得更频繁。保护珊瑚礁既需要地方性的行动（如减少污染），也需要全球共同努力来限制变暖。',
      },
    ],
    questions: [
      {
        id: 'coral-q1', type: 'tfng',
        prompt: 'Coral reefs cover more than one percent of the ocean floor.',
        promptZh: '珊瑚礁覆盖的海底超过百分之一。',
        answer: 'false',
        explainZh: '段落 A 明确说“覆盖不到百分之一（less than one percent）”，因此该陈述与原文相反，为 False。',
      },
      {
        id: 'coral-q2', type: 'tfng',
        prompt: 'The rock beneath a living reef is formed from the skeletons of earlier polyps.',
        promptZh: '活珊瑚礁下方的岩石是由更早的珊瑚虫骨骼形成的。',
        answer: 'true',
        explainZh: '段落 B 说下方的岩石是“更早世代的遗骸（remains of earlier generations）”，与陈述一致，为 True。',
      },
      {
        id: 'coral-q3', type: 'mcq',
        prompt: 'What do corals receive from the algae that live inside them?',
        promptZh: '珊瑚从体内的藻类那里获得了什么？',
        options: ['Shelter from predators', 'Food made by photosynthesis', 'A hard calcium skeleton', 'Cooler water'],
        answer: 1,
        explainZh: '段落 C：藻类通过光合作用为珊瑚提供食物；庇护是藻类获得的，骨骼是珊瑚自身分泌的。故选“光合作用制造的食物”。',
      },
      {
        id: 'coral-q4', type: 'gap',
        prompt: 'The close partnership between the coral and the algae is known as ____.',
        promptZh: '珊瑚与藻类之间紧密的伙伴关系被称为 ____。',
        answer: 'symbiosis', accept: ['symbiosis'],
        explainZh: '段落 C 末句给出该术语：symbiosis（共生）。',
      },
      {
        id: 'coral-q5', type: 'tfng',
        prompt: 'Bleaching always kills coral immediately.',
        promptZh: '白化总是会立即杀死珊瑚。',
        answer: 'false',
        explainZh: '段落 D：白化是失去藻类与颜色；只有当“高温持续”时珊瑚才“最终可能死亡”，并非“立即”，故为 False。',
      },
      {
        id: 'coral-q6', type: 'mcq',
        prompt: 'According to the passage, one recommended way to protect reefs is to:',
        promptZh: '根据文章，保护珊瑚礁的一种建议做法是：',
        options: ['introduce new species of algae', 'reduce local pollution', 'lower the ocean floor', 'remove the coral polyps'],
        answer: 1,
        explainZh: '段落 E 明确提到“减少污染（reducing pollution）”这一地方性行动。',
      },
      {
        id: 'coral-q7', type: 'gap',
        prompt: 'When coral loses its algae and turns white, the process is called ____.',
        promptZh: '当珊瑚失去藻类并变白时，这个过程叫作 ____。',
        answer: 'bleaching', accept: ['bleaching'],
        explainZh: '段落 D：该过程称为 bleaching（白化）。',
      },
      {
        id: 'coral-q8', type: 'tfng',
        prompt: 'Coral reefs are found in the coastal waters of every continent.',
        promptZh: '珊瑚礁存在于每个大陆的近海水域。',
        answer: 'notgiven',
        explainZh: '全文讲珊瑚礁的构成、共生与白化，从未提及它们的地理分布或在哪些大陆附近，属文中未提及，为 Not Given（注意不是“说了相反”，而是“根本没说”）。',
      },
    ],
  },
  {
    id: 'ar-tea',
    title: 'A Short History of Tea',
    titleZh: '茶的简史',
    field: 'History',
    fieldZh: '历史',
    level: 'b2',
    paragraphs: [
      {
        label: 'A',
        en: 'Tea is one of the most widely consumed drinks in the world, second only to water. According to legend, it was discovered in China thousands of years ago when leaves from a wild bush blew into a pot of boiling water. Whatever its true origin, tea drinking became firmly established in China long before it reached other parts of the world.',
        zh: '茶是世界上饮用最广的饮料之一，仅次于水。相传数千年前在中国被发现，当时一株野生灌木的叶子被风吹进了一壶沸水中。无论其真正起源如何，饮茶在传到世界其他地方之前，早已在中国牢固确立。',
      },
      {
        label: 'B',
        en: 'For centuries, tea remained almost unknown in Europe. It was only in the seventeenth century that traders began to bring it back from Asia. At first it was extremely expensive, and only wealthy families could afford it. As a result, tea quickly became a symbol of status.',
        zh: '几个世纪以来，茶在欧洲几乎无人知晓。直到十七世纪，商人们才开始从亚洲把它带回。起初它极其昂贵，只有富裕家庭才买得起。因此，茶很快成为身份的象征。',
      },
      {
        label: 'C',
        en: 'Demand grew so rapidly that tea became an important part of international trade. In Britain, it eventually became the national drink, enjoyed by people of every social class. Special customs, such as afternoon tea, developed around it.',
        zh: '需求增长如此之快，以至于茶成为国际贸易的重要部分。在英国，它最终成为国民饮品，被各个社会阶层的人所喜爱。围绕它还发展出一些特别的习俗，比如下午茶。',
      },
      {
        label: 'D',
        en: 'Tea also had unexpected effects on history. Heavy taxes on tea contributed to political protests in the American colonies, most famously the Boston Tea Party of 1773. In this way, a simple drink played a part in major historical events.',
        zh: '茶还对历史产生了意想不到的影响。对茶征收的重税促成了美洲殖民地的政治抗议，其中最著名的是 1773 年的波士顿倾茶事件。就这样，一种简单的饮品在重大历史事件中扮演了角色。',
      },
      {
        label: 'E',
        en: 'Today tea is grown in many countries, including India, Kenya and Sri Lanka. Different regions produce leaves with distinct flavours, and the drink continues to bring people together across cultures.',
        zh: '如今茶在许多国家种植，包括印度、肯尼亚和斯里兰卡。不同地区出产风味各异的茶叶，这种饮品继续跨越文化把人们聚在一起。',
      },
    ],
    questions: [
      {
        id: 'tea-q1', type: 'mcq',
        prompt: 'Which drink is more widely consumed than tea?',
        promptZh: '哪种饮料的饮用比茶更广泛？',
        options: ['Coffee', 'Water', 'Milk', 'Fruit juice'],
        answer: 1,
        explainZh: '段落 A：茶“仅次于水（second only to water）”，因此水比茶更广泛。',
      },
      {
        id: 'tea-q2', type: 'tfng',
        prompt: 'Tea became popular in Europe before it became popular in China.',
        promptZh: '茶在欧洲流行早于在中国流行。',
        answer: 'false',
        explainZh: '段落 A：饮茶在传到其他地方“之前很久”就已在中国确立，顺序与陈述相反，为 False。',
      },
      {
        id: 'tea-q3', type: 'tfng',
        prompt: 'When tea first arrived in Europe, most people could easily afford it.',
        promptZh: '茶最初到达欧洲时，大多数人都能轻易买得起。',
        answer: 'false',
        explainZh: '段落 B：起初“极其昂贵”，只有富裕家庭买得起，故为 False。',
      },
      {
        id: 'tea-q4', type: 'gap',
        prompt: 'Because it was so expensive at first, tea became a symbol of ____.',
        promptZh: '由于起初非常昂贵，茶成为 ____ 的象征。',
        answer: 'status', accept: ['status'],
        explainZh: '段落 B 末句：a symbol of status（身份的象征）。',
      },
      {
        id: 'tea-q5', type: 'mcq',
        prompt: 'The Boston Tea Party was mainly a reaction to:',
        promptZh: '波士顿倾茶事件主要是对什么的反应？',
        options: ['the poor quality of tea', 'heavy taxes on tea', 'a shortage of tea', 'new tea customs'],
        answer: 1,
        explainZh: '段落 D：对茶的“重税（heavy taxes）”促成了抗议。',
      },
      {
        id: 'tea-q6', type: 'tfng',
        prompt: 'Tea is grown in several different countries today.',
        promptZh: '如今茶在若干不同国家种植。',
        answer: 'true',
        explainZh: '段落 E 列举了印度、肯尼亚、斯里兰卡等多个国家，故为 True。',
      },
      {
        id: 'tea-q7', type: 'gap',
        prompt: 'The British custom of drinking tea in the afternoon is called ____ tea.',
        promptZh: '英国人在下午饮茶的习俗被称为 ____ tea。',
        answer: 'afternoon', accept: ['afternoon'],
        explainZh: '段落 C：afternoon tea（下午茶）。',
      },
      {
        id: 'tea-q8', type: 'tfng',
        prompt: 'Tea contains more caffeine than coffee.',
        promptZh: '茶所含的咖啡因比咖啡多。',
        answer: 'notgiven',
        explainZh: '全文讲茶的起源、传播与历史影响，从未提及咖啡因含量，也未与咖啡作比较，属未提及，为 Not Given。',
      },
    ],
  },
  {
    id: 'ar-body-clock',
    title: 'The Body Clock',
    titleZh: '人体生物钟',
    field: 'Biology',
    fieldZh: '生物学',
    level: 'c1',
    paragraphs: [
      {
        label: 'A',
        en: 'Almost all living things, from plants to humans, have an internal "body clock" that runs on a cycle of roughly twenty-four hours. Scientists call these daily patterns circadian rhythms. They influence when we feel sleepy, when we feel most alert, and even our body temperature.',
        zh: '几乎所有生物，从植物到人类，都有一个以大约二十四小时为周期运行的内部“生物钟”。科学家把这些每日的规律称为昼夜节律。它们影响我们何时困倦、何时最清醒，甚至影响体温。',
      },
      {
        label: 'B',
        en: 'This internal clock is controlled by a small region of the brain. It responds strongly to light, which is why exposure to daylight in the morning helps us feel awake, while darkness in the evening prepares the body for sleep.',
        zh: '这个内部时钟由大脑的一个小区域控制。它对光反应强烈，这就是为什么早晨接触日光能帮助我们清醒，而傍晚的黑暗则让身体准备入睡。',
      },
      {
        label: 'C',
        en: 'When our natural rhythm is disturbed, we feel the effects. A common example is jet lag, which occurs when people travel quickly across several time zones. Their body clock is still set to the time of the place they left, so they feel tired during the day and awake at night.',
        zh: '当自然节律被打乱时，我们会有所感受。一个常见例子是时差反应，它发生在人们快速跨越若干时区时。他们的生物钟仍停留在出发地的时间，因此白天疲倦、夜里清醒。',
      },
      {
        label: 'D',
        en: 'Modern life can also disturb these rhythms. Bright screens late at night send a signal to the brain that it is still daytime, making it harder to fall asleep. For this reason, experts often advise reducing screen use before bed.',
        zh: '现代生活也会扰乱这些节律。深夜明亮的屏幕向大脑发送“仍是白天”的信号，使人更难入睡。因此，专家常建议睡前减少使用屏幕。',
      },
      {
        label: 'E',
        en: 'Understanding circadian rhythms can help people plan their days more effectively. By working with the body clock rather than against it, we can improve both our sleep and our daily performance.',
        zh: '理解昼夜节律能帮助人们更有效地规划每一天。顺应而非对抗生物钟，我们既能改善睡眠，也能提升日间表现。',
      },
    ],
    questions: [
      {
        id: 'clock-q1', type: 'gap',
        prompt: 'Daily biological patterns that follow a 24-hour cycle are called ____ rhythms.',
        promptZh: '遵循 24 小时周期的每日生物规律被称为 ____ 节律。',
        answer: 'circadian', accept: ['circadian'],
        explainZh: '段落 A：这些每日规律称为 circadian rhythms（昼夜节律）。',
      },
      {
        id: 'clock-q2', type: 'mcq',
        prompt: 'The body clock responds most strongly to:',
        promptZh: '生物钟对什么反应最强烈？',
        options: ['noise', 'light', 'food', 'temperature'],
        answer: 1,
        explainZh: '段落 B：它“对光反应强烈（responds strongly to light）”。',
      },
      {
        id: 'clock-q3', type: 'tfng',
        prompt: 'Jet lag occurs when people cross several time zones quickly.',
        promptZh: '时差反应发生在人们快速跨越若干时区时。',
        answer: 'true',
        explainZh: '段落 C 与陈述一致，为 True。',
      },
      {
        id: 'clock-q4', type: 'tfng',
        prompt: 'Looking at bright screens late at night makes it easier to fall asleep.',
        promptZh: '深夜看明亮的屏幕会让人更容易入睡。',
        answer: 'false',
        explainZh: '段落 D：明亮屏幕让人“更难入睡（harder to fall asleep）”，与陈述相反，为 False。',
      },
      {
        id: 'clock-q5', type: 'mcq',
        prompt: 'Why does morning daylight help us, according to the passage?',
        promptZh: '根据文章，为什么早晨的日光对我们有帮助？',
        options: ['It lowers body temperature', 'It helps us feel awake', 'It causes jet lag', 'It stops the body clock'],
        answer: 1,
        explainZh: '段落 B：早晨接触日光“帮助我们清醒（feel awake）”。',
      },
      {
        id: 'clock-q6', type: 'gap',
        prompt: 'Experts advise reducing ____ use before bed.',
        promptZh: '专家建议睡前减少使用 ____。',
        answer: 'screen', accept: ['screen', 'screens'],
        explainZh: '段落 D：建议减少 screen use（屏幕使用）；单复数均可。',
      },
      {
        id: 'clock-q7', type: 'tfng',
        prompt: 'Jet lag is worse when travelling east than when travelling west.',
        promptZh: '向东旅行的时差反应比向西旅行更严重。',
        answer: 'notgiven',
        explainZh: '段落 C 只说时差由快速跨越时区引起，从未比较向东与向西旅行谁更严重，属未提及，为 Not Given。',
      },
    ],
  },
  {
    id: 'ar-photosynthesis',
    title: 'How Plants Make Food',
    titleZh: '植物如何制造食物',
    field: 'Biology',
    fieldZh: '生物学',
    level: 'b2',
    paragraphs: [
      {
        label: 'A',
        en: 'Plants, unlike animals, can make their own food. They do this through a process called photosynthesis, which takes place mainly in the leaves. This ability makes plants the foundation of almost every food chain on Earth.',
        zh: '与动物不同，植物能自己制造食物。它们通过一个称为光合作用的过程做到这一点，该过程主要发生在叶子里。这种能力使植物成为地球上几乎每条食物链的基础。',
      },
      {
        label: 'B',
        en: 'To carry out photosynthesis, a plant needs three things: sunlight, water, and carbon dioxide from the air. Water is drawn up from the roots, while carbon dioxide enters through tiny openings in the leaves called stomata.',
        zh: '为进行光合作用，植物需要三样东西：阳光、水，以及来自空气的二氧化碳。水从根部被吸上来，而二氧化碳则通过叶片上称为气孔的微小开口进入。',
      },
      {
        label: 'C',
        en: 'Inside the leaf, a green substance called chlorophyll captures energy from sunlight. This energy is used to combine water and carbon dioxide into sugar, which the plant uses for growth. Chlorophyll is also what gives leaves their green colour.',
        zh: '在叶子内部，一种称为叶绿素的绿色物质捕获来自阳光的能量。这些能量被用来把水和二氧化碳合成糖，供植物生长使用。叶绿素也正是叶子呈绿色的原因。',
      },
      {
        label: 'D',
        en: 'Photosynthesis produces oxygen as a by-product, which is released into the air. Almost all the oxygen we breathe was originally made by plants and other photosynthetic organisms.',
        zh: '光合作用会产生氧气作为副产物，并释放到空气中。我们呼吸的氧气几乎全部最初都是由植物和其他能进行光合作用的生物制造的。',
      },
      {
        label: 'E',
        en: 'Because photosynthesis removes carbon dioxide from the atmosphere, forests play an important role in balancing the Earth\u2019s climate. Protecting them is therefore vital, not only for wildlife but for the air we all breathe.',
        zh: '由于光合作用会从大气中移除二氧化碳，森林在平衡地球气候方面发挥着重要作用。因此保护森林至关重要，这不仅关乎野生动物，也关乎我们所有人呼吸的空气。',
      },
    ],
    questions: [
      {
        id: 'photo-q1', type: 'gap',
        prompt: 'The process by which plants make their own food is called ____.',
        promptZh: '植物自己制造食物的过程被称为 ____。',
        answer: 'photosynthesis', accept: ['photosynthesis'],
        explainZh: '段落 A：该过程称为 photosynthesis（光合作用）。',
      },
      {
        id: 'photo-q2', type: 'mcq',
        prompt: 'Which three things does a plant need for photosynthesis?',
        promptZh: '植物进行光合作用需要哪三样东西？',
        options: ['Sunlight, water and oxygen', 'Sunlight, water and carbon dioxide', 'Soil, water and sugar', 'Sunlight, soil and oxygen'],
        answer: 1,
        explainZh: '段落 B：阳光、水、二氧化碳。氧气是产物而非原料。',
      },
      {
        id: 'photo-q3', type: 'tfng',
        prompt: 'Carbon dioxide enters the plant through its roots.',
        promptZh: '二氧化碳通过植物的根进入。',
        answer: 'false',
        explainZh: '段落 B：二氧化碳通过叶片上的气孔进入；从根部吸上来的是水。故为 False。',
      },
      {
        id: 'photo-q4', type: 'gap',
        prompt: 'The green substance that captures energy from sunlight is called ____.',
        promptZh: '捕获阳光能量的绿色物质被称为 ____。',
        answer: 'chlorophyll', accept: ['chlorophyll'],
        explainZh: '段落 C：chlorophyll（叶绿素）。',
      },
      {
        id: 'photo-q5', type: 'tfng',
        prompt: 'Photosynthesis releases oxygen into the air.',
        promptZh: '光合作用向空气中释放氧气。',
        answer: 'true',
        explainZh: '段落 D：氧气作为副产物被释放到空气中，为 True。',
      },
      {
        id: 'photo-q6', type: 'mcq',
        prompt: 'According to the passage, why are forests important for the climate?',
        promptZh: '根据文章，森林为何对气候重要？',
        options: ['They produce carbon dioxide', 'They remove carbon dioxide from the atmosphere', 'They store water in the soil', 'They increase sunlight'],
        answer: 1,
        explainZh: '段落 E：光合作用从大气中移除二氧化碳，故森林有助于平衡气候。',
      },
      {
        id: 'photo-q7', type: 'tfng',
        prompt: 'Leaves are green because of the sugar that plants make.',
        promptZh: '叶子呈绿色是因为植物制造的糖。',
        answer: 'false',
        explainZh: '段落 C：叶子的绿色来自 chlorophyll（叶绿素），不是糖，故为 False。',
      },
      {
        id: 'photo-q8', type: 'tfng',
        prompt: 'Plants produce more sugar in summer than in winter.',
        promptZh: '植物在夏天比在冬天制造更多的糖。',
        answer: 'notgiven',
        explainZh: '全文说明光合作用的原料与产物，但从未比较不同季节的产糖量，属未提及，为 Not Given。',
      },
    ],
  },
  {
    id: 'ar-renewable',
    title: 'The Rise of Renewable Energy',
    titleZh: '可再生能源的崛起',
    field: 'Environmental Science',
    fieldZh: '环境科学',
    level: 'c1',
    paragraphs: [
      {
        label: 'A',
        en: 'For most of the last two centuries, the world has relied on fossil fuels such as coal, oil and gas. Although these fuels are powerful, they are limited in supply and release gases that contribute to climate change.',
        zh: '在过去两个世纪的大部分时间里，世界一直依赖煤、石油和天然气等化石燃料。尽管这些燃料动力强大，但供应有限，且会释放促成气候变化的气体。',
      },
      {
        label: 'B',
        en: 'Renewable energy offers an alternative. Unlike fossil fuels, renewable sources are naturally replaced and will not run out. The most common examples are solar power, wind power and hydroelectric power.',
        zh: '可再生能源提供了一种替代选择。与化石燃料不同，可再生能源会被自然补充，不会枯竭。最常见的例子是太阳能、风能和水力发电。',
      },
      {
        label: 'C',
        en: 'Solar panels convert sunlight directly into electricity, while wind turbines use moving air to spin large blades. Hydroelectric stations generate power from the force of flowing water, often stored behind large dams.',
        zh: '太阳能板把阳光直接转化为电能，而风力涡轮机利用流动的空气带动大型叶片旋转。水电站则利用流水的力量发电，这些水常被拦蓄在大坝后面。',
      },
      {
        label: 'D',
        en: 'One challenge with some renewables is that they are not always available. The sun does not shine at night, and the wind does not blow constantly. For this reason, storing energy in batteries has become an important area of research.',
        zh: '某些可再生能源的一个难题是它们并非随时可用。太阳夜里不照射，风也不会持续地刮。因此，用电池储存能量已成为一个重要的研究领域。',
      },
      {
        label: 'E',
        en: 'Despite these challenges, the cost of renewable energy has fallen dramatically in recent years. Many experts now believe it will become the main source of power worldwide within a few decades.',
        zh: '尽管存在这些挑战，可再生能源的成本近年来已大幅下降。许多专家现在相信，它将在几十年内成为全世界的主要电力来源。',
      },
    ],
    questions: [
      {
        id: 'renew-q1', type: 'tfng',
        prompt: 'Fossil fuels will never run out.',
        promptZh: '化石燃料永远不会枯竭。',
        answer: 'false',
        explainZh: '段落 A：化石燃料“供应有限（limited in supply）”，故为 False。',
      },
      {
        id: 'renew-q2', type: 'gap',
        prompt: 'Energy sources that are naturally replaced and will not run out are called ____ energy.',
        promptZh: '会被自然补充、不会枯竭的能源被称为 ____ 能源。',
        answer: 'renewable', accept: ['renewable'],
        explainZh: '段落 B：renewable energy（可再生能源）。',
      },
      {
        id: 'renew-q3', type: 'mcq',
        prompt: 'How do wind turbines generate power?',
        promptZh: '风力涡轮机如何发电？',
        options: ['By burning gas', 'By using moving air to spin blades', 'By storing water behind dams', 'By converting sunlight directly'],
        answer: 1,
        explainZh: '段落 C：利用流动的空气带动叶片旋转。',
      },
      {
        id: 'renew-q4', type: 'tfng',
        prompt: 'One problem with solar and wind power is that they are not always available.',
        promptZh: '太阳能和风能的一个问题是它们并非随时可用。',
        answer: 'true',
        explainZh: '段落 D 与陈述一致，为 True。',
      },
      {
        id: 'renew-q5', type: 'mcq',
        prompt: 'Why has storing energy in batteries become important?',
        promptZh: '为什么用电池储能变得重要？',
        options: ['Because renewables are always available', 'Because the sun and wind are not constant', 'Because fossil fuels are cheap', 'Because dams are dangerous'],
        answer: 1,
        explainZh: '段落 D：因太阳与风不持续，需要储能来平衡供应。',
      },
      {
        id: 'renew-q6', type: 'gap',
        prompt: 'Power generated from the force of flowing water is called ____ power.',
        promptZh: '利用流水的力量产生的电力被称为 ____ 电力。',
        answer: 'hydroelectric', accept: ['hydroelectric'],
        explainZh: '段落 B/C：hydroelectric power（水力发电）。',
      },
      {
        id: 'renew-q7', type: 'tfng',
        prompt: 'The cost of renewable energy has risen sharply in recent years.',
        promptZh: '可再生能源的成本近年来急剧上升。',
        answer: 'false',
        explainZh: '段落 E：成本“大幅下降（fallen dramatically）”，与陈述相反，为 False。',
      },
      {
        id: 'renew-q8', type: 'tfng',
        prompt: 'Solar power is cheaper than wind power.',
        promptZh: '太阳能比风能更便宜。',
        answer: 'notgiven',
        explainZh: '段落 E 只说可再生能源整体成本大幅下降，从未比较太阳能与风能之间的价格高低，属未提及，为 Not Given。',
      },
    ],
  },
  {
    id: 'ar-olympics',
    title: 'The Modern Olympic Games',
    titleZh: '现代奥林匹克运动会',
    field: 'History',
    fieldZh: '历史',
    level: 'b2',
    paragraphs: [
      {
        label: 'A',
        en: 'The Olympic Games are among the oldest and largest sporting events in the world. The ancient Games were held in Greece more than two thousand years ago, but they eventually came to an end.',
        zh: '奥林匹克运动会是世界上最古老、规模最大的体育赛事之一。古代奥运会两千多年前在希腊举行，但最终停办了。',
      },
      {
        label: 'B',
        en: 'The modern Olympics began in 1896, when the first Games of the new era were held in Athens. They were the idea of a French educator who believed that sport could bring nations closer together.',
        zh: '现代奥运会始于 1896 年，当时新纪元的首届奥运会在雅典举行。它源自一位法国教育家的构想，他相信体育能让各国走得更近。',
      },
      {
        label: 'C',
        en: 'Since then, the Games have been held every four years, apart from a few interruptions caused by war. Over time, they have grown from a modest event into a global spectacle watched by billions.',
        zh: '自那以后，除了因战争造成的少数几次中断外，奥运会每四年举行一次。随着时间推移，它从一个规模不大的赛事发展成为数十亿人观看的全球盛事。',
      },
      {
        label: 'D',
        en: 'The Winter Olympics, featuring sports such as skiing and skating, were introduced later, in 1924. Today the summer and winter Games are held two years apart.',
        zh: '以滑雪和滑冰等项目为特色的冬季奥运会较晚才设立，始于 1924 年。如今夏季与冬季奥运会相隔两年举行。',
      },
      {
        label: 'E',
        en: 'Hosting the Olympics is a great honour, but it is also expensive. Cities must build stadiums and improve transport, which can cost enormous sums of money.',
        zh: '举办奥运会是一项巨大的荣誉，但也代价高昂。城市必须修建体育场馆、改善交通，这可能耗费巨额资金。',
      },
    ],
    questions: [
      {
        id: 'oly-q1', type: 'tfng',
        prompt: 'The ancient Olympic Games were held in Greece.',
        promptZh: '古代奥林匹克运动会在希腊举行。',
        answer: 'true',
        explainZh: '段落 A 与陈述一致，为 True。',
      },
      {
        id: 'oly-q2', type: 'mcq',
        prompt: 'When did the modern Olympic Games begin?',
        promptZh: '现代奥林匹克运动会始于何时？',
        options: ['More than two thousand years ago', 'In 1896', 'In 1924', 'Every four years'],
        answer: 1,
        explainZh: '段落 B：现代奥运始于 1896 年。',
      },
      {
        id: 'oly-q3', type: 'gap',
        prompt: 'The first modern Olympic Games were held in the city of ____.',
        promptZh: '首届现代奥林匹克运动会在 ____ 城举行。',
        answer: 'athens', accept: ['athens'],
        explainZh: '段落 B：Athens（雅典）。',
      },
      {
        id: 'oly-q4', type: 'tfng',
        prompt: 'The modern Games have been held every four years without any interruption.',
        promptZh: '现代奥运会每四年举办一次，从未中断。',
        answer: 'false',
        explainZh: '段落 C：曾因战争有“少数几次中断（a few interruptions）”，故为 False。',
      },
      {
        id: 'oly-q5', type: 'mcq',
        prompt: 'According to the passage, what is one disadvantage of hosting the Olympics?',
        promptZh: '根据文章，举办奥运会的一个缺点是什么？',
        options: ['It brings nations together', 'It is very expensive', 'It happens every four years', 'It includes winter sports'],
        answer: 1,
        explainZh: '段落 E：举办代价高昂（expensive），需巨额资金。',
      },
      {
        id: 'oly-q6', type: 'gap',
        prompt: 'Winter sports such as skiing and ____ were added to the Olympics in 1924.',
        promptZh: '滑雪和 ____ 等冬季项目于 1924 年被加入奥运会。',
        answer: 'skating', accept: ['skating'],
        explainZh: '段落 D：skiing and skating（滑雪与滑冰）。',
      },
      {
        id: 'oly-q7', type: 'tfng',
        prompt: 'The Winter Olympics began at the same time as the first modern Summer Olympics.',
        promptZh: '冬季奥运会与首届现代夏季奥运会同时开始。',
        answer: 'false',
        explainZh: '段落 B/D：夏季始于 1896，冬季较晚（1924），并非同时，故为 False。',
      },
      {
        id: 'oly-q8', type: 'tfng',
        prompt: 'The first modern Games in Athens attracted athletes from more than fifty countries.',
        promptZh: '雅典的首届现代奥运会吸引了来自五十多个国家的运动员。',
        answer: 'notgiven',
        explainZh: '段落 B 只说 1896 年首届现代奥运在雅典举行、源自一位法国教育家的构想，从未提及参赛国家的数量，属未提及，为 Not Given。',
      },
    ],
  },

  ...ACADEMIC_READING_2,
];

export const ACADEMIC_READING_META = {
  source: 'Cambridge English — IELTS Academic Reading Test Format (public). 题型：True/False/Not Given, Multiple Choice, Sentence Completion.',
  note: 'MVP：自撰学术科普文（280–340 词）+ 三种可客观判分题型；持续扩充篇幅至真题级 700–900 词。',
};

export function countAcademicReading() {
  return ACADEMIC_READING.length;
}

export function countReadingQuestions() {
  return ACADEMIC_READING.reduce((s, p) => s + p.questions.length, 0);
}
