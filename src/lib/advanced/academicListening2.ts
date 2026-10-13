// @ts-nocheck
// 学术听力 · 第二批(加厚 13 → 21 篇)
// ----------------------------------------------------------------------------
// 与第一批同结构: { id, title, titleZh, field, fieldZh, level, sentences:[{en,zh}], keyWords:[{w,zh}] }
//
// 选题纪律(2026-07-25 修正记录):
//   初稿曾写了 supply-demand / plate-tectonics / vaccines / sleep 四篇, 审计发现
//   第一批已有同 id 或同主题(al-supply-demand / al-plate-tectonics / al-vaccines /
//   al-sleep + al-memory) —— 重复 id 会让 mockTest 的 .find() 静默取到第一条, 且学习者
//   看到重复内容。已全部换成第一批没有的学科与主题, 刻意扩宽学科面:
//   统计学 / 微生物学 / 工程学 / 医学(安慰剂) / 语言学 / 天文学 / 心理学(认知偏差) / 历史(印刷术)。
//
// 编写标准(高标准, 非凑数):
//   1. 真实学科知识的科普短讲(自撰教育内容, 非泄题/非付费素材)
//   2. 学术书面语但可听懂, 单句 10–22 词, 每篇 7 句(适合精听 + 复述)
//   3. keyWords 4–5 个, 必须真在文中出现
//   4. 新增内容暂无烘焙 MP3 → lib/speech.js 自动回退系统 TTS; 跑 `npm run bake:audio` 可升级为神经语音

export const ACADEMIC_LISTENING_2 = [
  {
    id: 'al-correlation-causation',
    title: 'Correlation Is Not Causation',
    titleZh: '相关不等于因果',
    field: 'Statistics',
    fieldZh: '统计学',
    level: 'b2',
    sentences: [
      { en: 'One of the most common mistakes in reading research is confusing correlation with causation.', zh: '解读研究时最常见的错误之一，就是把相关关系当成因果关系。' },
      { en: 'Two things may rise and fall together without one causing the other at all.', zh: '两件事可能同升同降，却完全不存在一方导致另一方的关系。' },
      { en: 'Ice cream sales and drowning deaths both increase in summer, but ice cream does not cause drowning.', zh: '冰淇淋销量和溺水死亡人数都在夏天上升，但冰淇淋并不导致溺水。' },
      { en: 'In that example, hot weather is a third factor influencing both figures.', zh: '在这个例子里，炎热天气是同时影响两个数字的第三个因素。' },
      { en: 'Statisticians call such a hidden influence a confounding variable.', zh: '统计学家把这种隐藏的影响称为混淆变量。' },
      { en: 'To establish causation, researchers normally need a controlled experiment with random assignment.', zh: '要确立因果关系，研究者通常需要带随机分配的对照实验。' },
      { en: 'When you read a headline claiming that one thing causes another, it is worth asking what else might explain the link.', zh: '当你看到某个标题声称一件事导致另一件事时，值得想想还有什么可能解释这种关联。' },
    ],
    keyWords: [
      { w: 'correlation', zh: '相关关系' },
      { w: 'causation', zh: '因果关系' },
      { w: 'confounding', zh: '混淆的' },
      { w: 'random', zh: '随机的' },
    ],
  },
  {
    id: 'al-antibiotic-resistance',
    title: 'Antibiotic Resistance',
    titleZh: '抗生素耐药性',
    field: 'Microbiology',
    fieldZh: '微生物学',
    level: 'b2',
    sentences: [
      { en: 'Antibiotics revolutionised medicine by making once-fatal infections treatable.', zh: '抗生素让曾经致命的感染变得可治，从而彻底改变了医学。' },
      { en: 'However, bacteria reproduce quickly, and each generation carries small random mutations.', zh: '然而细菌繁殖很快，每一代都带有微小的随机突变。' },
      { en: 'If a mutation happens to protect a bacterium from a drug, that individual survives treatment.', zh: '如果某个突变恰好让细菌不受药物影响，这个个体就能在治疗中存活。' },
      { en: 'It then multiplies, passing the resistant trait to its descendants.', zh: '它随后大量繁殖，把耐药特性传给后代。' },
      { en: 'Taking antibiotics when they are unnecessary, or stopping a course early, speeds up this process.', zh: '在不必要时服用抗生素，或提前停药，都会加速这一过程。' },
      { en: 'Some strains are now resistant to almost every drug available, which doctors call multi-drug resistance.', zh: '有些菌株如今几乎对所有可用药物都耐药，医生称之为多重耐药。' },
      { en: 'Slowing resistance depends on prescribing carefully and on developing genuinely new classes of drugs.', zh: '减缓耐药既依赖谨慎处方，也依赖开发真正的新类药物。' },
    ],
    keyWords: [
      { w: 'antibiotic', zh: '抗生素' },
      { w: 'mutation', zh: '突变' },
      { w: 'resistant', zh: '耐药的' },
      { w: 'strain', zh: '菌株' },
      { w: 'prescribe', zh: '开处方' },
    ],
  },
  {
    id: 'al-energy-storage',
    title: 'The Problem of Storing Energy',
    titleZh: '储能难题',
    field: 'Engineering',
    fieldZh: '工程学',
    level: 'b2',
    sentences: [
      { en: 'Wind and solar power share one obvious weakness: they are not available on demand.', zh: '风能和太阳能有一个明显的弱点：它们无法随需供应。' },
      { en: 'The sun does not shine at night, and the wind does not blow on a still day.', zh: '夜里没有阳光，无风的日子也不会起风。' },
      { en: 'Electricity grids, however, must match supply to demand almost second by second.', zh: '然而电网必须几乎逐秒地让供给匹配需求。' },
      { en: 'This is why large-scale storage has become one of the central engineering challenges of the century.', zh: '这就是大规模储能成为本世纪核心工程挑战之一的原因。' },
      { en: 'Lithium batteries work well for hours, but they remain expensive for storage lasting days or weeks.', zh: '锂电池适用于数小时的储存，但用于数天或数周的储存仍然昂贵。' },
      { en: 'Alternatives include pumping water uphill during surplus and releasing it through turbines later.', zh: '替代方案包括在电力过剩时把水抽到高处，之后再通过涡轮放水发电。' },
      { en: 'No single technology dominates yet, so most engineers expect a mix of solutions.', zh: '目前还没有单一技术占据主导，因此多数工程师预计会是多种方案并存。' },
    ],
    keyWords: [
      { w: 'grid', zh: '电网' },
      { w: 'storage', zh: '储存' },
      { w: 'surplus', zh: '过剩' },
      { w: 'turbine', zh: '涡轮机' },
    ],
  },
  {
    id: 'al-placebo-effect',
    title: 'The Placebo Effect',
    titleZh: '安慰剂效应',
    field: 'Medicine',
    fieldZh: '医学',
    level: 'c1',
    sentences: [
      { en: 'A placebo is a treatment with no active ingredient, such as a sugar pill.', zh: '安慰剂是不含活性成分的处置，例如一颗糖片。' },
      { en: 'Remarkably, patients who receive placebos often report genuine improvement in their symptoms.', zh: '值得注意的是，接受安慰剂的患者常报告症状确有改善。' },
      { en: 'The effect appears strongest for conditions involving pain, nausea and fatigue.', zh: '这种效应在涉及疼痛、恶心和疲劳的病症上表现最强。' },
      { en: 'Expectation seems to be the key mechanism, since belief in the treatment alters how the brain processes signals.', zh: '预期似乎是关键机制，因为对治疗的信念会改变大脑处理信号的方式。' },
      { en: 'This is precisely why serious trials must be blinded, with neither patients nor doctors knowing who received the real drug.', zh: '这正是严谨试验必须采用盲法的原因：患者与医生都不知道谁拿到了真药。' },
      { en: 'Without such controls, a useless treatment can easily appear effective.', zh: '没有这类对照，一种无用的治疗很容易显得有效。' },
      { en: 'The placebo effect therefore tells us less about magic pills than about the power of expectation.', zh: '因此安慰剂效应告诉我们的不是神药的神奇，而是预期的力量。' },
    ],
    keyWords: [
      { w: 'placebo', zh: '安慰剂' },
      { w: 'symptom', zh: '症状' },
      { w: 'expectation', zh: '预期' },
      { w: 'blinded', zh: '盲法的' },
    ],
  },
  {
    id: 'al-language-acquisition',
    title: 'How Children Acquire Language',
    titleZh: '儿童如何习得语言',
    field: 'Linguistics',
    fieldZh: '语言学',
    level: 'c1',
    sentences: [
      { en: 'Children acquire their first language without formal instruction and with remarkable speed.', zh: '儿童在没有正规教学的情况下，以惊人的速度习得母语。' },
      { en: 'By the age of five, most have mastered a complex grammatical system they were never explicitly taught.', zh: '到五岁时，多数儿童已掌握一套从未被明确教授过的复杂语法系统。' },
      { en: 'Linguists note that children make systematic errors, such as saying goed instead of went.', zh: '语言学家注意到儿童会犯系统性错误，例如说 goed 而不是 went。' },
      { en: 'Such errors are revealing, because they show the child is applying a rule rather than copying adults.', zh: '这类错误很有启发性，因为它们表明孩子在运用规则而非模仿成人。' },
      { en: 'Comprehensible input, that is language slightly beyond the current level, appears essential for progress.', zh: '可理解性输入，即略高于当前水平的语言，似乎是进步的关键。' },
      { en: 'Interaction matters too, because children need to negotiate meaning rather than merely overhear speech.', zh: '互动同样重要，因为儿童需要协商意义，而不只是旁听说话。' },
      { en: 'These findings have strongly influenced how second languages are taught to adults as well.', zh: '这些发现也深刻影响了成人二语教学的方式。' },
    ],
    keyWords: [
      { w: 'acquire', zh: '习得' },
      { w: 'grammatical', zh: '语法的' },
      { w: 'systematic', zh: '系统性的' },
      { w: 'comprehensible', zh: '可理解的' },
      { w: 'negotiate', zh: '协商' },
    ],
  },
  {
    id: 'al-black-holes',
    title: 'What We Know About Black Holes',
    titleZh: '我们对黑洞的了解',
    field: 'Astronomy',
    fieldZh: '天文学',
    level: 'c1',
    sentences: [
      { en: 'A black hole is a region of space where gravity is so strong that nothing can escape it.', zh: '黑洞是一片引力极强、任何东西都无法逃脱的空间区域。' },
      { en: 'Most form when a massive star exhausts its fuel and collapses under its own weight.', zh: '多数黑洞形成于大质量恒星耗尽燃料、在自身重量下坍缩之时。' },
      { en: 'The boundary beyond which escape becomes impossible is called the event horizon.', zh: '越过之后就无法逃离的边界被称为事件视界。' },
      { en: 'Because no light emerges from within, black holes cannot be observed directly.', zh: '由于内部没有光射出，黑洞无法被直接观测。' },
      { en: 'Astronomers infer their presence from the motion of nearby stars and from radiation emitted by falling matter.', zh: '天文学家通过邻近恒星的运动和落入物质发出的辐射来推断它们的存在。' },
      { en: 'In 2019, an international team published the first image of the shadow of a black hole.', zh: '2019 年，一个国际团队发表了首张黑洞阴影的图像。' },
      { en: 'Evidence now suggests that a supermassive black hole sits at the centre of most large galaxies.', zh: '现有证据表明，多数大型星系中心都存在一个超大质量黑洞。' },
    ],
    keyWords: [
      { w: 'gravity', zh: '引力' },
      { w: 'collapse', zh: '坍缩' },
      { w: 'horizon', zh: '视界' },
      { w: 'infer', zh: '推断' },
      { w: 'radiation', zh: '辐射' },
    ],
  },
  {
    id: 'al-cognitive-bias',
    title: 'Cognitive Bias in Decision Making',
    titleZh: '决策中的认知偏差',
    field: 'Psychology',
    fieldZh: '心理学',
    level: 'c1',
    sentences: [
      { en: 'Human beings are not the purely rational decision makers that early economic models assumed.', zh: '人类并非早期经济模型所假设的纯粹理性的决策者。' },
      { en: 'Psychologists have documented dozens of systematic errors in reasoning, known as cognitive biases.', zh: '心理学家记录了数十种系统性的推理错误，称为认知偏差。' },
      { en: 'Confirmation bias, for instance, leads us to notice evidence that supports what we already believe.', zh: '例如，确认偏差使我们更容易注意到支持已有信念的证据。' },
      { en: 'Loss aversion describes our tendency to fear losses more than we value equivalent gains.', zh: '损失厌恶描述了我们害怕损失的程度超过对等量收益的重视。' },
      { en: 'These tendencies are not signs of stupidity, but mental shortcuts that usually save time.', zh: '这些倾向并非愚蠢的表现，而是通常能节省时间的心理捷径。' },
      { en: 'Problems arise when such shortcuts are applied to complex situations that require careful analysis.', zh: '当这些捷径被用于需要仔细分析的复杂情境时，问题就出现了。' },
      { en: 'Awareness of these biases does not remove them, but it can prompt us to slow down and check our reasoning.', zh: '意识到这些偏差并不能消除它们，但能促使我们放慢速度、检查自己的推理。' },
    ],
    keyWords: [
      { w: 'rational', zh: '理性的' },
      { w: 'bias', zh: '偏差' },
      { w: 'aversion', zh: '厌恶' },
      { w: 'equivalent', zh: '等量的' },
    ],
  },
  {
    id: 'al-printing-press',
    title: 'The Printing Press and Social Change',
    titleZh: '印刷术与社会变革',
    field: 'History',
    fieldZh: '历史学',
    level: 'c1',
    sentences: [
      { en: 'The printing press, developed in Europe in the fifteenth century, transformed the spread of knowledge.', zh: '十五世纪在欧洲发展起来的印刷机彻底改变了知识的传播。' },
      { en: 'Before printing, books were copied by hand and were therefore rare and extremely expensive.', zh: '印刷术之前，书籍靠手抄，因此稀少且极其昂贵。' },
      { en: 'Within a few decades, the number of books in circulation increased dramatically.', zh: '短短几十年内，流通中的书籍数量急剧增加。' },
      { en: 'Cheaper texts allowed ideas to cross borders faster than any authority could control them.', zh: '更廉价的文本让思想跨越边界的速度快过任何权威所能控制的程度。' },
      { en: 'Literacy rates rose, and reading gradually ceased to be the privilege of a small elite.', zh: '识字率上升，阅读逐渐不再是少数精英的特权。' },
      { en: 'Historians often link this technology to the Reformation and to the scientific revolution that followed.', zh: '历史学家常把这项技术与随后的宗教改革和科学革命联系起来。' },
      { en: 'The episode is frequently cited today when people discuss how new media reshape societies.', zh: '今天人们讨论新媒体如何重塑社会时，常引用这一历史片段。' },
    ],
    keyWords: [
      { w: 'circulation', zh: '流通' },
      { w: 'literacy', zh: '识字率' },
      { w: 'privilege', zh: '特权' },
      { w: 'reshape', zh: '重塑' },
    ],
  },
];
