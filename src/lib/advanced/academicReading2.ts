// @ts-nocheck
// 学术阅读 · 第二批(加厚 6 篇 → 10 篇)
// ----------------------------------------------------------------------------
// 来源与格式(公开机构标准, 可引用, 非泄题、非付费):
//   Cambridge English — IELTS Academic Reading Test Format
//   (公开题型: True-False-Not Given / Multiple Choice / Sentence Completion)
//
// 与第一批同结构:
//   { id, title, titleZh, field, fieldZh, level, paragraphs:[{label,en,zh}], questions:[Q] }
//   tfng: { id, type:'tfng', prompt, promptZh, answer:'true'|'false'|'notgiven', explainZh }
//   mcq : { id, type:'mcq',  prompt, promptZh, options:[..], answer:<index>, explainZh }
//   gap : { id, type:'gap',  prompt, promptZh, answer, accept:[..], explainZh }
//
// 选题纪律: 第一批学科偏环境/历史/生物, 本批刻意补 语言学 / 城市规划 / 认知科学 / 材料科学。
//   文章 id 与题目 id 前缀均已避开第一批(coral/tea/clock/photo/renew/oly)。
//
// 出题纪律(高标准, 非凑数):
//   1. 每题答案必须能在文中定位; explainZh 必须指出依据段落, 讲清为什么
//   2. notgiven 题必须是「文中真的没提」, 不是「文中说了相反」——这是雅思最易错点, 刻意各设一题
//   3. mcq 干扰项取自文中真实出现但答非所问的内容(似真干扰), 不放荒谬项
//   4. gap 答案必须是文中原词, accept 收录合理大小写/单复数变体

export const ACADEMIC_READING_2 = [
  // ============================================================
  // 语言学 · 濒危语言
  // ============================================================
  {
    id: 'ar-endangered-languages',
    title: 'The Loss of Languages',
    titleZh: '语言的消失',
    field: 'Linguistics',
    fieldZh: '语言学',
    level: 'b2',
    paragraphs: [
      {
        label: 'A',
        en: 'There are roughly seven thousand languages spoken in the world today, but they are distributed very unevenly. A small number of languages, including Mandarin, English and Spanish, are spoken by hundreds of millions of people, while around half of all languages have fewer than ten thousand speakers each.',
        zh: '今天世界上大约有七千种语言，但它们的分布极不均衡。少数语言，如汉语普通话、英语和西班牙语，使用者达数亿；而大约一半的语言各自的使用者不足一万人。',
      },
      {
        label: 'B',
        en: 'Linguists consider a language endangered when children are no longer learning it as their first language. In such cases the language may still be spoken fluently by older people, but once that generation dies, no new speakers remain. Estimates suggest that a language ceases to be spoken somewhere in the world every few weeks.',
        zh: '当儿童不再把某种语言作为母语学习时，语言学家就认为该语言处于濒危状态。这种情况下，年长者可能仍能流利使用它，但一旦那一代人去世，就不再有新的使用者。据估计，世界上每隔几周就有一种语言不再被使用。',
      },
      {
        label: 'C',
        en: 'The reasons are rarely simple. Speakers of small languages often shift to a dominant language in order to gain access to education, employment and public services. This decision is usually made not out of dislike for the mother tongue, but because parents believe it will give their children better opportunities.',
        zh: '原因很少是简单的。小语种的使用者往往转向主流语言，以便获得教育、就业和公共服务。这一决定通常并非出于对母语的厌恶，而是因为父母相信这会给孩子更好的机会。',
      },
      {
        label: 'D',
        en: 'Some researchers argue that language loss matters because each language encodes a distinct way of describing the world. Detailed knowledge of local plants, navigation techniques or seasonal patterns is frequently embedded in vocabulary that has no direct equivalent elsewhere. When the language disappears, that accumulated knowledge is difficult to recover.',
        zh: '一些研究者认为语言消失之所以重要，是因为每种语言都编码了一种独特的世界描述方式。关于当地植物、导航技术或季节规律的细致知识，常常嵌在别处没有直接对应词的词汇里。语言一旦消失，这些积累的知识就很难恢复。',
      },
      {
        label: 'E',
        en: 'Revitalisation efforts have had mixed results. The most successful projects, such as those for Welsh and Maori, have combined school teaching with media, official recognition and everyday use in the community. Where a language is taught only as a school subject, however, it rarely returns to daily conversation.',
        zh: '语言复兴的努力成效不一。最成功的项目，如威尔士语和毛利语的项目，把学校教学与媒体、官方认可以及社区日常使用结合起来。然而，若一种语言只作为学校科目来教，它很少能回到日常对话中。',
      },
    ],
    questions: [
      {
        id: 'lang-q1', type: 'tfng',
        prompt: 'About half of the world\u2019s languages have fewer than ten thousand speakers.',
        promptZh: '世界上大约一半的语言使用者不足一万人。',
        answer: 'true',
        explainZh: '段落 A 明确说“大约一半的语言各自的使用者不足一万人”，与陈述一致，为 True。',
      },
      {
        id: 'lang-q2', type: 'tfng',
        prompt: 'A language is classified as endangered as soon as its total number of speakers falls below one thousand.',
        promptZh: '一种语言只要使用者总数低于一千就被归类为濒危。',
        answer: 'false',
        explainZh: '段落 B 给出的判定标准是“儿童不再把它作为母语学习”，而不是某个人口数字，故与原文相反，为 False。',
      },
      {
        id: 'lang-q3', type: 'tfng',
        prompt: 'Governments spend more money on language revitalisation than on language documentation.',
        promptZh: '各国政府在语言复兴上的花费多于在语言记录上的花费。',
        answer: 'notgiven',
        explainZh: '全文谈到复兴项目的成效，但从未比较两类支出的金额，属于文中未提及，为 Not Given（注意：不是“说了相反”，而是“根本没说”）。',
      },
      {
        id: 'lang-q4', type: 'mcq',
        prompt: 'According to paragraph C, why do speakers often switch to a dominant language?',
        promptZh: '根据段落 C，使用者为何常转向主流语言？',
        options: [
          'Because they dislike their mother tongue',
          'Because parents believe it improves their children\u2019s opportunities',
          'Because their own language is too difficult to write',
          'Because governments forbid the use of small languages',
        ],
        answer: 1,
        explainZh: '段落 C 说这一决定“并非出于对母语的厌恶”，而是父母相信能给孩子更好机会。选项 A 被原文明确否定；C、D 文中未提。',
      },
      {
        id: 'lang-q5', type: 'mcq',
        prompt: 'What does paragraph D suggest is lost along with a language?',
        promptZh: '段落 D 认为随语言一同失去的是什么？',
        options: [
          'Detailed local knowledge held in its vocabulary',
          'The ability of elders to communicate at all',
          'Written records kept in national archives',
          'Interest in learning any second language',
        ],
        answer: 0,
        explainZh: '段落 D 指出关于植物、导航、季节的细致知识嵌在词汇中，语言消失后难以恢复。其余三项文中均未提出。',
      },
      {
        id: 'lang-q6', type: 'gap',
        prompt: 'Linguists regard a language as endangered when ____ are no longer learning it as a first language.',
        promptZh: '当 ____ 不再把某语言作为母语学习时，语言学家就视其为濒危。',
        answer: 'children', accept: ['children', 'Children'],
        explainZh: '段落 B 首句原词为 children（儿童）。',
      },
      {
        id: 'lang-q7', type: 'gap',
        prompt: 'The most successful revitalisation projects combined school teaching with media, official recognition and everyday use in the ____.',
        promptZh: '最成功的复兴项目把学校教学与媒体、官方认可以及 ____ 中的日常使用结合起来。',
        answer: 'community', accept: ['community', 'Community'],
        explainZh: '段落 E 原文为 everyday use in the community（社区日常使用）。',
      },
    ],
  },

  // ============================================================
  // 城市规划 · 十五分钟城市
  // ============================================================
  {
    id: 'ar-fifteen-minute-city',
    title: 'The Fifteen-Minute City',
    titleZh: '十五分钟城市',
    field: 'Urban Planning',
    fieldZh: '城市规划',
    level: 'b2',
    paragraphs: [
      {
        label: 'A',
        en: 'For much of the twentieth century, city planning in many countries was organised around the private car. Housing, shops, offices and factories were placed in separate zones, and residents were expected to drive between them. The result was longer journeys and, in many cities, heavy congestion.',
        zh: '在二十世纪的大部分时间里，许多国家的城市规划以私家车为核心。住宅、商店、办公与工厂被安排在彼此分离的区域，居民被预设为开车往来其间。结果是出行距离变长，许多城市出现严重拥堵。',
      },
      {
        label: 'B',
        en: 'The idea known as the fifteen-minute city reverses that logic. It proposes that most daily needs, including work, shopping, schools, healthcare and leisure, should be reachable within a fifteen-minute walk or cycle from home. The concept was popularised by researchers in Paris and has since been discussed by city governments worldwide.',
        zh: '被称为“十五分钟城市”的理念颠倒了这一逻辑。它主张大多数日常需求，包括工作、购物、学校、医疗和休闲，都应在离家步行或骑行十五分钟内可达。这一概念由巴黎的研究者推广，此后被世界各地的市政府讨论。',
      },
      {
        label: 'C',
        en: 'Supporters point to several benefits. Shorter trips reduce emissions and free up road space. Local shops gain regular customers, and streets designed for walking tend to be safer and more sociable. Studies also associate walkable neighbourhoods with higher levels of physical activity among residents.',
        zh: '支持者列举了几项好处。更短的出行减少排放并腾出道路空间。本地商店获得稳定客源，而为步行设计的街道往往更安全、更有社交氛围。研究还发现，宜步行的社区与居民更高的身体活动量相关。',
      },
      {
        label: 'D',
        en: 'Critics raise practical objections. Retrofitting existing suburbs is expensive, and some jobs, particularly in specialised industries, simply cannot be distributed evenly across a city. There is also concern that improving a neighbourhood can raise rents, eventually displacing the very residents the changes were meant to help.',
        zh: '批评者提出实际的反对意见。改造既有郊区代价高昂，而某些工作，尤其是专门行业的工作，根本无法在城市中均匀分布。还有人担心改善一个社区会推高房租，最终迫使原本要帮助的居民搬离。',
      },
      {
        label: 'E',
        en: 'In practice, most cities adopt the idea partially. Typical measures include converting parking spaces into cycle lanes, opening school playgrounds to the public at weekends, and requiring new developments to include shops at street level. Planners generally agree that the model works best as a direction of travel rather than a fixed target.',
        zh: '实际操作中，多数城市只是部分采纳这一理念。常见措施包括把停车位改为自行车道、周末向公众开放学校操场，以及要求新开发项目在街面层设置商铺。规划者普遍认为，这一模式更适合作为前进方向，而非固定指标。',
      },
    ],
    questions: [
      {
        id: 'city-q1', type: 'tfng',
        prompt: 'Twentieth-century planning in many countries separated housing from workplaces.',
        promptZh: '许多国家二十世纪的规划把住宅与工作场所分开。',
        answer: 'true',
        explainZh: '段落 A 说住宅、商店、办公与工厂被放在“分离的区域”，与陈述一致，为 True。',
      },
      {
        id: 'city-q2', type: 'tfng',
        prompt: 'The fifteen-minute city requires all residents to give up car ownership.',
        promptZh: '十五分钟城市要求所有居民放弃拥有汽车。',
        answer: 'false',
        explainZh: '段落 B 只说日常需求应在步行或骑行十五分钟内可达，从未要求放弃汽车；段落 E 也显示是部分采纳，故为 False。',
      },
      {
        id: 'city-q3', type: 'tfng',
        prompt: 'Paris has completely rebuilt its suburbs according to the model.',
        promptZh: '巴黎已按该模式彻底重建了郊区。',
        answer: 'notgiven',
        explainZh: '段落 B 只说概念由巴黎研究者推广，文中从未说明巴黎郊区的重建情况，属未提及，为 Not Given。',
      },
      {
        id: 'city-q4', type: 'mcq',
        prompt: 'Which benefit is mentioned in paragraph C?',
        promptZh: '段落 C 提到了哪项好处？',
        options: [
          'Higher property taxes for the city',
          'More physical activity among residents',
          'Faster car journeys across the city',
          'Cheaper public transport tickets',
        ],
        answer: 1,
        explainZh: '段落 C 末句把宜步行社区与更高的身体活动量联系起来。房产税、更快车速、票价文中均未提及。',
      },
      {
        id: 'city-q5', type: 'mcq',
        prompt: 'What concern do critics raise in paragraph D?',
        promptZh: '段落 D 中批评者提出什么担忧？',
        options: [
          'Improvements may push up rents and displace residents',
          'Cycle lanes are more dangerous than roads',
          'Local shops will refuse to open at street level',
          'Walking makes people less productive at work',
        ],
        answer: 0,
        explainZh: '段落 D 明确担忧“改善社区会推高房租，最终迫使居民搬离”。其余选项文中均无依据。',
      },
      {
        id: 'city-q6', type: 'gap',
        prompt: 'The model proposes that daily needs be reachable within a fifteen-minute walk or ____ from home.',
        promptZh: '该模式主张日常需求应在离家步行或 ____ 十五分钟内可达。',
        answer: 'cycle', accept: ['cycle', 'Cycle', 'bike ride', 'cycling'],
        explainZh: '段落 B 原文为 within a fifteen-minute walk or cycle。',
      },
      {
        id: 'city-q7', type: 'gap',
        prompt: 'One typical measure is converting ____ spaces into cycle lanes.',
        promptZh: '一项常见措施是把 ____ 位改为自行车道。',
        answer: 'parking', accept: ['parking', 'Parking', 'car parking'],
        explainZh: '段落 E 原文为 converting parking spaces into cycle lanes。',
      },
    ],
  },

  // ============================================================
  // 认知科学 · 间隔重复
  // ============================================================
  {
    id: 'ar-spaced-repetition',
    title: 'Why Spacing Beats Cramming',
    titleZh: '为什么分散学习胜过临时抱佛脚',
    field: 'Cognitive Science',
    fieldZh: '认知科学',
    level: 'c1',
    paragraphs: [
      {
        label: 'A',
        en: 'In the 1880s the German psychologist Hermann Ebbinghaus carried out a series of experiments on himself, memorising lists of nonsense syllables and recording how quickly he forgot them. His results produced what is now called the forgetting curve: retention drops sharply within the first day and then declines more gradually.',
        zh: '19 世纪 80 年代，德国心理学家艾宾浩斯以自己为对象做了一系列实验，记忆无意义音节表并记录遗忘速度。他的结果得出了如今所称的遗忘曲线：记忆保持率在第一天内急剧下降，随后下降趋缓。',
      },
      {
        label: 'B',
        en: 'Ebbinghaus also noticed something more useful. When he reviewed the same material after an interval, the second round of learning took far less effort, and the memory lasted longer. Reviewing at spaced intervals proved consistently more efficient than repeating everything in one long session.',
        zh: '艾宾浩斯还注意到一件更有用的事。当他隔一段时间复习同样材料时，第二轮学习省力得多，记忆也更持久。间隔复习始终比在一次长时段内重复全部内容更有效率。',
      },
      {
        label: 'C',
        en: 'Modern research supports this finding across a wide range of subjects, from vocabulary to surgical skills. One explanation is that a small amount of forgetting makes the brain work harder to retrieve the item, and this effort strengthens the memory. Cramming, by contrast, feels productive precisely because nothing has yet been forgotten.',
        zh: '现代研究在从词汇到外科技能的广泛领域支持这一发现。一种解释是：适度的遗忘会让大脑更费力地提取该内容，而这种努力强化了记忆。相比之下，临时抱佛脚之所以感觉有效，正是因为还没来得及忘。',
      },
      {
        label: 'D',
        en: 'This creates a problem for learners. Because cramming produces a strong feeling of fluency, students often judge it to be the better method, even when tests show otherwise. Researchers describe this mismatch between how learning feels and how well it works as an illusion of competence.',
        zh: '这给学习者带来一个问题。由于临时抱佛脚会产生强烈的“流畅感”，学生往往认为它是更好的方法，即使测试结果相反。研究者把这种“学习感受”与“实际效果”之间的错位称为能力错觉。',
      },
      {
        label: 'E',
        en: 'Practical systems have been built on these ideas. Flashcard software typically schedules each item just before it is likely to be forgotten, lengthening the interval after each success and shortening it after a failure. The principle is simple, though sticking to such a schedule over months requires considerable discipline.',
        zh: '基于这些理念已建立了实用系统。抽认卡软件通常把每个条目安排在它即将被遗忘之前复习，答对后延长间隔，答错后缩短间隔。原理很简单，但连续数月坚持这样的日程需要相当的自制力。',
      },
    ],
    questions: [
      {
        id: 'space-q1', type: 'tfng',
        prompt: 'Ebbinghaus used himself as the subject of his memory experiments.',
        promptZh: '艾宾浩斯以自己作为记忆实验的对象。',
        answer: 'true',
        explainZh: '段落 A 说他“以自己为对象”做实验，与陈述一致，为 True。',
      },
      {
        id: 'space-q2', type: 'tfng',
        prompt: 'According to the passage, forgetting is entirely harmful to learning.',
        promptZh: '根据文章，遗忘对学习完全有害。',
        answer: 'false',
        explainZh: '段落 C 指出“适度的遗忘”让大脑更费力提取，从而强化记忆，故与陈述相反，为 False。',
      },
      {
        id: 'space-q3', type: 'tfng',
        prompt: 'Ebbinghaus\u2019s experiments were repeated by his students after his death.',
        promptZh: '艾宾浩斯的实验在他去世后由他的学生重复过。',
        answer: 'notgiven',
        explainZh: '文中只提到现代研究支持其发现，从未提及他的学生或身后重复实验，属未提及，为 Not Given。',
      },
      {
        id: 'space-q4', type: 'mcq',
        prompt: 'Why does cramming feel effective, according to paragraph C?',
        promptZh: '根据段落 C，为什么临时抱佛脚感觉有效？',
        options: [
          'Because nothing has been forgotten yet',
          'Because it takes place over many weeks',
          'Because it involves more difficult material',
          'Because it is always done in a group',
        ],
        answer: 0,
        explainZh: '段落 C 末句明确说：临时抱佛脚感觉有效，正是因为还没有遗忘发生。其余选项与原文相反或未提。',
      },
      {
        id: 'space-q5', type: 'mcq',
        prompt: 'What does paragraph E identify as the main practical difficulty?',
        promptZh: '段落 E 指出的主要实际困难是什么？',
        options: [
          'The software is expensive to buy',
          'Maintaining the review schedule over months',
          'Choosing which subjects to study first',
          'Finding enough material to review',
        ],
        answer: 1,
        explainZh: '段落 E 末句说原理简单，但“连续数月坚持这样的日程需要相当的自制力”。其余选项文中未提。',
      },
      {
        id: 'space-q6', type: 'gap',
        prompt: 'Ebbinghaus\u2019s results produced what is now called the ____ curve.',
        promptZh: '艾宾浩斯的结果得出了如今所称的 ____ 曲线。',
        answer: 'forgetting', accept: ['forgetting', 'Forgetting'],
        explainZh: '段落 A 原词为 the forgetting curve（遗忘曲线）。',
      },
      {
        id: 'space-q7', type: 'gap',
        prompt: 'Researchers call the gap between how learning feels and how well it works an illusion of ____.',
        promptZh: '研究者把“学习感受”与“实际效果”的差距称为 ____ 错觉。',
        answer: 'competence', accept: ['competence', 'Competence'],
        explainZh: '段落 D 末句原文为 an illusion of competence（能力错觉）。',
      },
    ],
  },

  // ============================================================
  // 材料科学 · 混凝土
  // ============================================================
  {
    id: 'ar-concrete',
    title: 'The Trouble with Concrete',
    titleZh: '混凝土的难题',
    field: 'Materials Science',
    fieldZh: '材料科学',
    level: 'c1',
    paragraphs: [
      {
        label: 'A',
        en: 'Concrete is the most widely used building material on earth. It is made by mixing cement with sand, gravel and water, and it can be poured into almost any shape before it hardens. Its strength, availability and low cost explain why it appears in everything from bridges to housing blocks.',
        zh: '混凝土是地球上使用最广泛的建筑材料。它由水泥与砂、砾石和水混合而成，在硬化前可浇筑成几乎任何形状。它的强度、易得性与低成本解释了它为何出现在从桥梁到住宅楼的一切建筑中。',
      },
      {
        label: 'B',
        en: 'The environmental cost, however, is substantial. Producing cement requires heating limestone to around 1,450 degrees Celsius, which consumes large amounts of fuel. More significantly, the chemical reaction itself releases carbon dioxide directly from the limestone, so the emissions cannot be eliminated simply by switching to cleaner energy.',
        zh: '然而其环境代价相当高。生产水泥需要把石灰石加热到约 1450 摄氏度，这消耗大量燃料。更重要的是，化学反应本身会直接从石灰石中释放二氧化碳，因此仅靠改用更清洁的能源无法消除这些排放。',
      },
      {
        label: 'C',
        en: 'Concrete also has a limited lifespan. Most modern structures are reinforced with steel bars to resist bending. Over decades, moisture and salt can reach the steel and cause it to rust; as rust expands, it cracks the surrounding concrete from within. Repairing such damage is often more expensive than the original construction.',
        zh: '混凝土的寿命也有限。多数现代结构用钢筋加固以抵抗弯曲。数十年间，水分和盐分可能到达钢筋并使其锈蚀；锈胀会从内部把周围的混凝土胀裂。修复这类损坏往往比原建造更贵。',
      },
      {
        label: 'D',
        en: 'Interestingly, some ancient concrete has lasted far longer. Roman harbour structures remain intact after two thousand years, and analysis suggests that seawater reacting with volcanic ash in the mix gradually formed new binding minerals. In other words, the material became stronger through exposure that would destroy modern concrete.',
        zh: '有趣的是，一些古代混凝土的寿命长得多。罗马的港口结构历经两千年仍然完整，分析表明海水与混合料中的火山灰反应，逐渐形成了新的胶结矿物。换言之，这种材料在会摧毁现代混凝土的环境中反而变强了。',
      },
      {
        label: 'E',
        en: 'Researchers are pursuing several directions at once: replacing part of the cement with industrial by-products, developing binders that absorb carbon dioxide as they set, and designing structures that use less material for the same strength. None of these approaches alone is sufficient, and most engineers expect concrete to remain in use for decades yet.',
        zh: '研究者同时在推进几个方向：用工业副产品替代部分水泥、开发在凝固时吸收二氧化碳的胶结材料，以及设计用更少材料达到同等强度的结构。单靠任何一种都不够，多数工程师预计混凝土还会继续使用数十年。',
      },
    ],
    questions: [
      {
        id: 'conc-q1', type: 'tfng',
        prompt: 'Cement production emits carbon dioxide even if clean energy is used for heating.',
        promptZh: '即使用清洁能源加热，水泥生产仍会排放二氧化碳。',
        answer: 'true',
        explainZh: '段落 B 说化学反应本身直接从石灰石释放二氧化碳，“仅靠改用更清洁能源无法消除”，与陈述一致，为 True。',
      },
      {
        id: 'conc-q2', type: 'tfng',
        prompt: 'Repairing corrosion damage is usually cheaper than the original construction.',
        promptZh: '修复锈蚀损坏通常比原建造更便宜。',
        answer: 'false',
        explainZh: '段落 C 末句说修复“往往比原建造更贵”，与陈述相反，为 False。',
      },
      {
        id: 'conc-q3', type: 'tfng',
        prompt: 'Roman engineers deliberately designed their concrete to react with seawater.',
        promptZh: '罗马工程师有意设计他们的混凝土与海水反应。',
        answer: 'notgiven',
        explainZh: '段落 D 说明了反应发生的事实与分析结果，但从未说明罗马人是否“有意”如此设计，属未提及，为 Not Given。',
      },
      {
        id: 'conc-q4', type: 'mcq',
        prompt: 'According to paragraph C, what causes concrete to crack from within?',
        promptZh: '根据段落 C，是什么使混凝土从内部开裂？',
        options: [
          'Rust expanding on the steel reinforcement',
          'Sand and gravel shifting over time',
          'Heat from the original hardening process',
          'Volcanic ash reacting with cement',
        ],
        answer: 0,
        explainZh: '段落 C 说钢筋锈蚀后“锈胀从内部把周围混凝土胀裂”。火山灰属段落 D 且是有益反应，其余选项文中未提。',
      },
      {
        id: 'conc-q5', type: 'mcq',
        prompt: 'What is the writer\u2019s overall view in paragraph E?',
        promptZh: '段落 E 中作者的整体看法是什么？',
        options: [
          'Concrete will be abandoned within a few years',
          'No single solution is enough, and concrete will stay in use',
          'Only recycling can solve the problem',
          'Ancient methods should replace modern ones entirely',
        ],
        answer: 1,
        explainZh: '段落 E 末句明确说单靠任何一种方法都不够，且预计混凝土还会使用数十年。其余选项与原文相反。',
      },
      {
        id: 'conc-q6', type: 'gap',
        prompt: 'Producing cement requires heating ____ to around 1,450 degrees Celsius.',
        promptZh: '生产水泥需要把 ____ 加热到约 1450 摄氏度。',
        answer: 'limestone', accept: ['limestone', 'Limestone'],
        explainZh: '段落 B 原词为 limestone（石灰石）。',
      },
      {
        id: 'conc-q7', type: 'gap',
        prompt: 'In Roman structures, seawater reacted with ____ ash in the mix to form new binding minerals.',
        promptZh: '在罗马结构中，海水与混合料中的 ____ 灰反应形成新的胶结矿物。',
        answer: 'volcanic', accept: ['volcanic', 'Volcanic'],
        explainZh: '段落 D 原文为 volcanic ash（火山灰）。',
      },
    ],
  },
];
