// @ts-nocheck
// 学术阅读 · 真题级篇幅 (Exam-tier: 700–900 词 / 篇, ~13 题 / 篇)
// ----------------------------------------------------------------------------
// 定位: 第一批(academicReading.js)与第二批(academicReading2.js)是 155–251 词的 B2 热身;
//   本文件是「真题级」——对齐 IELTS Academic Reading 单篇 700–900 词、约 13 题的真实体量。
//
// 来源与格式(公开机构标准, 可引用, 非泄题/非付费):
//   Cambridge English — IELTS Academic Reading Test Format
//   (公开题型: True/False/Not Given, Multiple Choice, Sentence Completion)
//
// 内容纪律(红线7 真实/红线16 不注水):
//   1. 自撰学术科普长文, 内容基于确凿、通用的科学事实(过程/机制类), 不编造精确统计或日期
//   2. 每篇 tier:'exam' + wordCount, 供 UI 标注"真题级"并被审计校验篇幅达标
//   3. 每题答案必须能在文中定位; explainZh 指出依据段落; Not Given 必须是"真的没说"而非"说了相反"
//   4. gap 答案为文中原词; mcq 干扰项为文中出现但答非所问的似真项
//
// 结构与短篇一致: { id, title, titleZh, field, fieldZh, level, tier, wordCount, paragraphs, questions }

export const ACADEMIC_READING_FULL = [
  {
    id: 'arf-urban-heat',
    title: 'The Urban Heat Island',
    titleZh: '城市热岛',
    field: 'Environmental Science',
    fieldZh: '环境科学',
    level: 'c1',
    tier: 'exam',
    wordCount: 812,
    paragraphs: [
      {
        label: 'A',
        en: 'Anyone who has walked from a leafy park into the centre of a large city on a summer evening will have felt the change: the air in the built-up area is noticeably warmer. This difference is not imagined. Meteorologists have measured it for well over a century and given it a name — the urban heat island. On a calm, clear night, the centre of a major city can be several degrees Celsius warmer than the surrounding countryside, and in the largest cities the gap has been recorded at as much as ten degrees. The effect is usually strongest after sunset, which is why it is often described as a night-time phenomenon rather than a daytime one.',
        zh: '任何在夏日傍晚从绿树成荫的公园走进大城市中心的人都会感到那种变化：建成区的空气明显更暖。这种差异并非错觉。气象学家测量它已逾一个世纪，并给它起了名字——城市热岛。在无风、晴朗的夜晚，大城市的中心可能比周边乡村暖上好几摄氏度，而在最大的城市里，这一差距曾被记录到高达十度。该效应通常在日落后最强，因此它常被描述为夜间现象而非白天现象。',
      },
      {
        label: 'B',
        en: 'The first and most important cause lies in the materials from which cities are built. Concrete, brick, stone and asphalt absorb solar radiation efficiently during the day and store a great deal of heat within them. Because these materials have a high thermal mass, they release that stored heat only slowly, continuing to warm the air long after the sun has set. A field of grass or a forest, by contrast, holds far less heat and cools quickly once the sun is gone. This is the central reason why the temperature gap between city and country widens most sharply during the night.',
        zh: '第一个、也是最重要的成因在于建造城市所用的材料。混凝土、砖、石和沥青在白天高效吸收太阳辐射，并在内部储存大量热量。由于这些材料的热质量很高，它们只会缓慢地释放所储热量，在太阳落下很久之后仍继续加热空气。相比之下，一片草地或森林储热少得多，太阳一走便迅速降温。这正是城乡温差在夜间拉大得最明显的核心原因。',
      },
      {
        label: 'C',
        en: 'The shape of a city matters as well. Streets lined by tall buildings form what climatologists call urban canyons. During the day, sunlight that strikes these surfaces is reflected from one wall to another rather than escaping upwards, so more of its energy is eventually absorbed. At night, the same tall walls block the open view of the sky, which is the direction in which heat would normally radiate away. With less of the sky visible from street level — a quantity known as the sky view factor — the trapped heat lingers instead of escaping into space.',
        zh: '城市的形态同样重要。两旁排列着高楼的街道构成气候学家所称的“城市峡谷”。白天，照到这些表面的阳光在墙与墙之间来回反射，而非向上逃逸，因此其能量最终被更多地吸收。夜里，同样的高墙挡住了开阔的天空视野，而那正是热量通常向外辐射的方向。从街面能看到的天空越少——这一量被称为“天空视角因子”——被困住的热量就越滞留，而不是逃入太空。',
      },
      {
        label: 'D',
        en: 'A third factor is the relative absence of vegetation and open water. In natural landscapes, plants draw water up from the soil and release it from their leaves, while surface water evaporates directly. Both processes, known together as evapotranspiration, consume energy and therefore cool the surrounding air, much as sweating cools the human body. Cities, however, are designed to shed rainwater as quickly as possible through drains, and they replace living surfaces with sealed ones. Deprived of this natural cooling, the urban surface has little choice but to grow hot.',
        zh: '第三个因素是植被与开阔水面的相对缺乏。在自然地貌中，植物把水从土壤中吸上来并从叶片释放，地表水则直接蒸发。这两个过程合称蒸散，会消耗能量，从而给周围空气降温，就像出汗给人体降温一样。然而城市被设计成通过排水系统尽快排走雨水，并用密封的表面取代有生命的表面。失去了这种天然降温，城市地表除了变热别无选择。',
      },
      {
        label: 'E',
        en: 'Cities also generate heat of their own. Every vehicle engine, every factory and every air conditioner releases warmth directly into the surrounding air. Air conditioning is a particularly striking example, because it cools the inside of a building only by pumping even more heat out into the street. On the hottest days, when the greatest number of machines are running, this additional warmth is added precisely when the city can least absorb it. Researchers sometimes call this waste heat, and although it is smaller than the effect of building materials, it is far from negligible in dense districts.',
        zh: '城市还会自己产生热量。每一台车辆发动机、每一座工厂、每一台空调都直接向周围空气释放热量。空调是一个尤为鲜明的例子，因为它给建筑内部降温，靠的正是把更多热量抽到街道上。在最炎热的日子，运转的机器数量最多，这些额外的热量恰恰在城市最难吸收之时被加进来。研究者有时把这称为废热，尽管它比建筑材料的作用小，但在密集城区绝非可以忽略。',
      },
      {
        label: 'F',
        en: 'The consequences of the urban heat island reach well beyond mere discomfort. During prolonged hot spells, the failure of cities to cool down at night denies residents the recovery that darkness normally brings, and this continuous heat stress can be dangerous. It falls most heavily on the elderly, the very young and those who cannot afford cooling, so the burden is distributed unequally across the population. Warmer air also accelerates the chemical reactions that produce certain pollutants, meaning that heat and poor air quality often arrive together.',
        zh: '城市热岛的后果远不止于不适。在持续的高温期，城市夜间无法降温，使居民得不到黑暗通常带来的恢复，而这种持续的热应激可能很危险。它对老年人、幼儿以及负担不起降温设备者的打击最重，因此这一负担在人群中分布并不均等。更暖的空气还会加速生成某些污染物的化学反应，这意味着高温与空气质量恶化常常结伴而来。',
      },
      {
        label: 'G',
        en: 'Fortunately, the same understanding that explains the problem also points towards solutions, and most of them work by reversing one of the causes. Planting street trees and creating parks restores the cooling power of evapotranspiration and provides shade. Painting roofs and pavements in pale, reflective colours reduces the amount of sunlight absorbed in the first place. So-called green roofs, covered with soil and low plants, combine both benefits at once. None of these measures is a complete cure on its own, and a city that is already built cannot easily be redesigned, but together they can lower local temperatures by a meaningful margin.',
        zh: '所幸，解释问题的同一套认识也指向了解决之道，而其中多数都是通过逆转某个成因来起作用的。栽种行道树和营造公园恢复了蒸散的降温作用，并提供遮荫。把屋顶和路面漆成浅色、反光的颜色，从源头上减少被吸收的阳光。所谓的绿色屋顶——覆盖着土壤和低矮植物——同时兼具两种好处。这些措施没有哪一项单独就是彻底的解药，而一座已建成的城市也难以轻易重新设计，但它们合起来能把局部气温降低相当可观的幅度。',
      },
      {
        label: 'H',
        en: 'Measuring the heat island precisely remains a challenge. Satellites can map the temperature of surfaces such as rooftops and roads across an entire city at once, but the surface temperature is not the same as the temperature of the air a person actually breathes. Ground-based weather stations record air temperature accurately but only at scattered points. Because the two methods can disagree, careful studies now combine them, and it is largely thanks to this patient measurement that planners can judge which of the available remedies is worth its cost.',
        zh: '精确测量热岛仍是一项挑战。卫星可以一次性绘制整座城市屋顶、道路等表面的温度，但地表温度并不等同于人实际呼吸的空气温度。地面气象站能准确记录气温，却只在零散的点上。由于两种方法可能不一致，如今严谨的研究会把它们结合起来；也正是靠着这种耐心的测量，规划者才能判断现有的补救措施中哪一种值得其成本。',
      },
    ],
    questions: [
      {
        id: 'uhi-q1', type: 'tfng',
        prompt: 'The urban heat island effect is usually strongest during the middle of the day.',
        promptZh: '城市热岛效应通常在中午最强。',
        answer: 'false',
        explainZh: '段落 A 明确说该效应“通常在日落后最强”，是夜间现象，与“中午最强”相反，为 False。',
      },
      {
        id: 'uhi-q2', type: 'tfng',
        prompt: 'Building materials such as concrete release stored heat slowly after sunset.',
        promptZh: '混凝土等建筑材料在日落后缓慢释放储存的热量。',
        answer: 'true',
        explainZh: '段落 B：这些材料热质量高，“只会缓慢释放所储热量，在太阳落下很久之后仍继续加热空气”，与陈述一致，为 True。',
      },
      {
        id: 'uhi-q3', type: 'tfng',
        prompt: 'Waste heat from machines has a greater effect on city temperatures than building materials do.',
        promptZh: '机器产生的废热对城市气温的影响比建筑材料更大。',
        answer: 'false',
        explainZh: '段落 E 说废热“比建筑材料的作用小（smaller than the effect of building materials）”，与陈述相反，为 False。',
      },
      {
        id: 'uhi-q4', type: 'tfng',
        prompt: 'The urban heat island increases the number of insects living in cities.',
        promptZh: '城市热岛使生活在城市中的昆虫数量增加。',
        answer: 'notgiven',
        explainZh: '全文讨论材料、形态、植被、废热、健康与治理，从未提及昆虫数量，属文中未提及，为 Not Given（注意不是“说了相反”，而是根本没说）。',
      },
      {
        id: 'uhi-q5', type: 'tfng',
        prompt: 'Air conditioning removes heat from a building by releasing it into the outside air.',
        promptZh: '空调通过把热量释放到室外空气中来给建筑降温。',
        answer: 'true',
        explainZh: '段落 E：空调给室内降温“靠的正是把更多热量抽到街道上”，与陈述一致，为 True。',
      },
      {
        id: 'uhi-q6', type: 'mcq',
        prompt: 'According to paragraph C, why does an urban canyon trap heat at night?',
        promptZh: '根据段落 C，城市峡谷为何在夜间困住热量？',
        options: [
          'Tall walls block the open sky towards which heat would radiate',
          'The narrow streets are heated by passing traffic',
          'Concrete produces heat through a chemical reaction',
          'Wind speeds increase between the buildings',
        ],
        answer: 0,
        explainZh: '段落 C：高墙挡住了开阔的天空——热量本应朝那个方向辐射出去；天空视角因子越小，热量越滞留。其余选项文中未提或非该段主因。',
      },
      {
        id: 'uhi-q7', type: 'mcq',
        prompt: 'Why does the writer compare evapotranspiration to sweating in paragraph D?',
        promptZh: '段落 D 中作者为何把蒸散比作出汗？',
        options: [
          'Because both waste large amounts of water',
          'Because both consume energy and therefore cool the surroundings',
          'Because both happen only at night',
          'Because both occur mainly inside buildings',
        ],
        answer: 1,
        explainZh: '段落 D：蒸散“消耗能量，从而给周围空气降温，就像出汗给人体降温一样”，比喻的重点是“耗能降温”。',
      },
      {
        id: 'uhi-q8', type: 'mcq',
        prompt: 'Which group does paragraph F say is most affected by continuous night-time heat?',
        promptZh: '段落 F 说哪一群体受持续夜间高温影响最大？',
        options: [
          'Drivers and factory workers',
          'The elderly, the very young and those who cannot afford cooling',
          'People who live near parks',
          'Tourists visiting the city centre',
        ],
        answer: 1,
        explainZh: '段落 F 明确说负担“对老年人、幼儿以及负担不起降温设备者最重”。其余选项文中未作此陈述。',
      },
      {
        id: 'uhi-q9', type: 'mcq',
        prompt: 'What is the writer\u2019s main point about solutions in paragraph G?',
        promptZh: '段落 G 中作者关于解决方案的主要观点是什么？',
        options: [
          'One single measure can completely solve the problem',
          'No measure works alone, but together they can lower temperatures meaningfully',
          'Only newly built cities can reduce the heat island',
          'Reflective paint is the only method worth using',
        ],
        answer: 1,
        explainZh: '段落 G：没有哪一项单独是彻底解药，但“它们合起来能把局部气温降低相当可观的幅度”。选项 A、D 与原文相反，C 文中未提。',
      },
      {
        id: 'uhi-q10', type: 'gap',
        prompt: 'Because building materials have a high thermal ____, they release stored heat only slowly.',
        promptZh: '由于建筑材料的热 ____ 很高，它们只会缓慢释放储存的热量。',
        answer: 'mass', accept: ['mass', 'Mass'],
        explainZh: '段落 B 原文为 high thermal mass（高热质量）。',
      },
      {
        id: 'uhi-q11', type: 'gap',
        prompt: 'The amount of open sky visible from street level is known as the sky view ____.',
        promptZh: '从街面能看到的开阔天空的量被称为天空视角 ____。',
        answer: 'factor', accept: ['factor', 'Factor'],
        explainZh: '段落 C 原文为 the sky view factor（天空视角因子）。',
      },
      {
        id: 'uhi-q12', type: 'gap',
        prompt: 'The process by which plants and surface water release moisture and cool the air is called ____.',
        promptZh: '植物与地表水释放水分并给空气降温的过程被称为 ____。',
        answer: 'evapotranspiration', accept: ['evapotranspiration', 'Evapotranspiration'],
        explainZh: '段落 D 原文为 evapotranspiration（蒸散）。',
      },
      {
        id: 'uhi-q13', type: 'gap',
        prompt: 'Roofs covered with soil and low plants, which provide both shade and cooling, are called ____ roofs.',
        promptZh: '覆盖着土壤和低矮植物、既遮荫又降温的屋顶被称为 ____ 屋顶。',
        answer: 'green', accept: ['green', 'Green'],
        explainZh: '段落 G 原文为 green roofs（绿色屋顶）。',
      },
    ],
  },
];

// ── 第 2 篇 追加(生物学) ──────────────────────────────────────────
ACADEMIC_READING_FULL.push({
  id: 'arf-bioluminescence',
  title: 'Living Light',
  titleZh: '生命之光',
  field: 'Biology',
  fieldZh: '生物学',
  level: 'c1',
  tier: 'exam',
  wordCount: 806,
  paragraphs: [
    {
      label: 'A',
      en: 'On a dark night, a firefly flashing in a garden seems almost magical, yet it is only the most familiar example of a widespread natural ability. A great many living things can produce their own light, a phenomenon known as bioluminescence. Fireflies are joined by certain fungi that glow faintly on rotting wood, by some worms and insects, and above all by an extraordinary range of creatures in the sea. Indeed, most of the light produced by living organisms on our planet is made not on land but in the depths of the ocean.',
      zh: '在漆黑的夜里，花园中一闪一闪的萤火虫几乎像魔法一般，然而它只是一种广泛存在的自然能力最为人熟知的例子。许许多多的生物能自己发光，这一现象称为生物发光。除萤火虫外，还有某些在腐木上微微发亮的真菌、一些蠕虫和昆虫，尤其是海洋中种类繁多得惊人的生物。事实上，我们这颗星球上由生物产生的光，多数并非在陆地上、而是在深海中制造的。',
    },
    {
      label: 'B',
      en: 'The light itself is the product of a chemical reaction. In most organisms it involves a molecule called luciferin and a helper substance, an enzyme called luciferase. When the two combine in the presence of oxygen, energy is released in the form of light. What is remarkable is how little heat accompanies it. An ordinary light bulb wastes most of its energy as warmth, but in living organisms almost all of the released energy becomes light. For this reason bioluminescence is often described as cold light, and its efficiency continues to interest engineers.',
      zh: '光本身是一种化学反应的产物。在多数生物体内，它涉及一种称为荧光素的分子和一种辅助物质——称为荧光素酶的酶。当两者在有氧的条件下结合时，能量便以光的形式释放。值得注意的是，随之产生的热量极少。普通灯泡把大部分能量浪费成热，而在生物体内，释放出的能量几乎全部变成光。因此生物发光常被称作“冷光”，其效率至今仍令工程师们感兴趣。',
    },
    {
      label: 'C',
      en: 'Why light should be so common in the ocean, and so rare in rivers and lakes, has a straightforward explanation. Below a few hundred metres, sunlight cannot penetrate, and the deep sea is effectively a permanent night. In such darkness, the ability to make light offers real advantages, whereas in shallow, sunlit fresh water it offers few. The deep ocean is also enormous, forming by far the largest living space on Earth, so a trait that is useful there is, in sheer numbers, extremely common.',
      zh: '为什么光在海洋中如此普遍，而在江河湖泊中如此罕见，有一个直截了当的解释。在几百米以下，阳光无法穿透，深海实际上是永久的黑夜。在这样的黑暗中，发光的能力带来实实在在的好处；而在阳光充足的浅淡水中，它几乎没什么用处。深海也极为辽阔，构成地球上最大的生存空间，因此一种在那里有用的性状，单以数量计，就极其常见。',
    },
    {
      label: 'D',
      en: 'For many animals, light is a means of defence. A sudden flash can startle an attacker and buy a moment in which to escape. Some deep-sea shrimp go further and eject a glowing cloud, distracting a predator much as an octopus uses ink. A subtler trick is counter-illumination: certain fish and squid produce a faint glow on their undersides that matches the dim light filtering down from above, erasing the dark silhouette by which a predator lurking below would otherwise spot them. In each case the light serves survival rather than display.',
      zh: '对许多动物而言，光是一种防御手段。突然的闪光能惊吓攻击者，换来逃脱的一瞬。有些深海虾更进一步，喷出一团发光的云雾来分散捕食者的注意，正如章鱼用墨汁一般。一种更微妙的把戏是“反照明”：某些鱼和乌贼在腹部发出微弱的光，与从上方透下的昏暗光线相匹配，从而抹去那道深色轮廓——潜伏在下方的捕食者本来正是靠它发现猎物的。在每种情形里，光服务于生存而非展示。',
    },
    {
      label: 'E',
      en: 'Light is equally useful for the opposite purpose: attracting others. The deep-sea anglerfish is famous for the glowing lure it dangles in front of its mouth, drawing curious prey within reach. Above the surface, fireflies use light to find a mate, and different species flash in different rhythms so that individuals recognise their own kind. What looks to us like a simple twinkle is in fact a precise signal, and a firefly that produces the wrong pattern will not be answered.',
      zh: '光对相反的目的同样有用：吸引他者。深海鮟鱇鱼以悬在嘴前那盏发光的诱饵而闻名，把好奇的猎物引到够得着的地方。在水面之上，萤火虫用光寻找配偶，不同物种以不同的节律闪烁，好让个体认出同类。在我们看来只是简单的一闪，实则是精确的信号，一只闪出错误模式的萤火虫将得不到回应。',
    },
    {
      label: 'F',
      en: 'Not every glowing animal makes its own light. A number of them house colonies of luminous bacteria in special organs and supply the bacteria with nutrients in exchange for their glow. The bobtail squid, for instance, hides its shadow using light generated entirely by bacterial partners. This is a genuine partnership: the squid gains camouflage, and the bacteria gain a safe and well-fed home. Such arrangements, in which two very different organisms live together to their mutual benefit, are common throughout biology.',
      zh: '并非每种发光动物都自己造光。它们中有不少在特殊器官里寄养着发光细菌的菌群，向细菌提供养分以换取它们的光。例如短尾乌贼完全用细菌伙伴产生的光来隐藏自己的影子。这是一种真正的伙伴关系：乌贼获得伪装，细菌获得一个安全而食物充足的家。这种两种截然不同的生物为彼此的利益共同生活的安排，在整个生物学中很常见。',
    },
    {
      label: 'G',
      en: 'The study of these systems has proved unexpectedly useful to people. Because the luciferase reaction produces light only when certain conditions are met, scientists can attach the light-producing machinery to other processes they wish to observe. A gene under investigation can be linked to luciferase so that, whenever the gene is active, the cell quite literally lights up. In this way a phenomenon far too small to see is turned into a signal that an instrument can measure, and bioluminescence has become a routine tool in laboratories that have nothing to do with the sea.',
      zh: '对这些系统的研究对人类而言意外地有用。由于荧光素酶反应只在满足特定条件时才发光，科学家可以把这套发光机制附着到他们想观察的其他过程上。一个正在研究的基因可以与荧光素酶相连，于是每当该基因活跃时，细胞就真的会“亮起来”。如此一来，一个小到根本看不见的现象就被转化成仪器可以测量的信号，生物发光也因此成为与海洋毫无关系的实验室里的常规工具。',
    },
    {
      label: 'H',
      en: 'Much about living light remains uncertain. Because the deep sea is so difficult and expensive to reach, many luminous species have never been observed alive, and the precise function of their glow can only be guessed at. Bringing such animals to the surface usually kills them, and their delicate light organs are easily damaged. As new underwater vehicles allow researchers to watch these creatures in their own environment, biologists expect that the catalogue of known light-producing species, already long, will grow considerably longer.',
      zh: '关于生命之光，仍有许多不确定之处。由于深海极难抵达、代价高昂，许多发光物种从未被活着观察到，它们发光的确切功能只能靠猜测。把这类动物带到水面通常会致其死亡，它们脆弱的发光器官也很容易受损。随着新型水下航行器让研究者得以在这些生物自己的环境中观察它们，生物学家预计，本已很长的已知发光物种名录还会大大加长。',
    },
  ],
  questions: [
    {
      id: 'bio-q1', type: 'tfng',
      prompt: 'Most bioluminescence on Earth is produced by organisms living on land.',
      promptZh: '地球上多数生物发光是由陆地生物产生的。',
      answer: 'false',
      explainZh: '段落 A 末句说多数生物光“并非在陆地上、而是在深海中制造”，与陈述相反，为 False。',
    },
    {
      id: 'bio-q2', type: 'tfng',
      prompt: 'Bioluminescence produces very little heat compared with an ordinary light bulb.',
      promptZh: '与普通灯泡相比，生物发光产生的热量极少。',
      answer: 'true',
      explainZh: '段落 B：灯泡把大部分能量浪费成热，而生物几乎把全部能量变成光，故称“冷光”，与陈述一致，为 True。',
    },
    {
      id: 'bio-q3', type: 'tfng',
      prompt: 'Bioluminescence is common in rivers and lakes.',
      promptZh: '生物发光在江河湖泊中很常见。',
      answer: 'false',
      explainZh: '段落 C 说它在海洋中普遍，“在江河湖泊中如此罕见”，与陈述相反，为 False。',
    },
    {
      id: 'bio-q4', type: 'tfng',
      prompt: 'Firefly light is brighter than the light produced by any sea creature.',
      promptZh: '萤火虫的光比任何海洋生物产生的光都亮。',
      answer: 'notgiven',
      explainZh: '全文比较了陆地与海洋发光的普遍程度，但从未比较亮度大小，属文中未提及，为 Not Given。',
    },
    {
      id: 'bio-q5', type: 'tfng',
      prompt: 'Some animals produce light using bacteria rather than their own bodies.',
      promptZh: '有些动物靠细菌而非自身身体产生光。',
      answer: 'true',
      explainZh: '段落 F：不少动物寄养发光细菌，短尾乌贼“完全用细菌伙伴产生的光”，与陈述一致，为 True。',
    },
    {
      id: 'bio-q6', type: 'mcq',
      prompt: 'What two substances combine, in the presence of oxygen, to produce light?',
      promptZh: '在有氧条件下，哪两种物质结合产生光？',
      options: [
        'Chlorophyll and water',
        'Luciferin and luciferase',
        'Ink and bacteria',
        'Oxygen and heat',
      ],
      answer: 1,
      explainZh: '段落 B：荧光素（luciferin）与荧光素酶（luciferase）在有氧时结合发光。',
    },
    {
      id: 'bio-q7', type: 'mcq',
      prompt: 'How does counter-illumination help an animal, according to paragraph D?',
      promptZh: '根据段落 D，反照明如何帮助动物？',
      options: [
        'It frightens predators with a sudden flash',
        'It hides the animal\u2019s dark outline from predators below',
        'It attracts prey towards the animal\u2019s mouth',
        'It signals to potential mates',
      ],
      answer: 1,
      explainZh: '段落 D：腹部微光与上方透下的光相匹配，抹去深色轮廓，使下方捕食者看不见。选项 A/C/D 是文中其他用途，非反照明。',
    },
    {
      id: 'bio-q8', type: 'mcq',
      prompt: 'Why do different firefly species flash in different rhythms?',
      promptZh: '不同种萤火虫为何以不同节律闪烁？',
      options: [
        'To produce as much light as possible',
        'So that individuals can recognise their own species',
        'To frighten away larger insects',
        'To keep warm at night',
      ],
      answer: 1,
      explainZh: '段落 E：不同物种以不同节律闪烁，“好让个体认出同类”；闪错模式便得不到回应。',
    },
    {
      id: 'bio-q9', type: 'mcq',
      prompt: 'According to paragraph G, how is luciferase useful in laboratories?',
      promptZh: '根据段落 G，荧光素酶在实验室里有何用处？',
      options: [
        'It kills bacteria that contaminate experiments',
        'It makes an active gene visible by causing cells to light up',
        'It replaces sunlight for growing plants',
        'It cools delicate samples without heat',
      ],
      answer: 1,
      explainZh: '段落 G：把基因与荧光素酶相连，基因活跃时细胞“亮起来”，从而把看不见的现象变成可测信号。',
    },
    {
      id: 'bio-q10', type: 'gap',
      prompt: 'Because it gives off almost no heat, bioluminescence is often described as ____ light.',
      promptZh: '由于几乎不放热，生物发光常被称作 ____ 光。',
      answer: 'cold', accept: ['cold', 'Cold'],
      explainZh: '段落 B 原文为 cold light（冷光）。',
    },
    {
      id: 'bio-q11', type: 'gap',
      prompt: 'The deep-sea anglerfish dangles a glowing ____ in front of its mouth to attract prey.',
      promptZh: '深海鮟鱇鱼在嘴前悬着发光的 ____ 来吸引猎物。',
      answer: 'lure', accept: ['lure', 'Lure'],
      explainZh: '段落 E 原文为 glowing lure（发光的诱饵）。',
    },
    {
      id: 'bio-q12', type: 'gap',
      prompt: 'The bobtail squid hides its ____ using light generated by bacteria.',
      promptZh: '短尾乌贼用细菌产生的光来隐藏自己的 ____。',
      answer: 'shadow', accept: ['shadow', 'Shadow'],
      explainZh: '段落 F 原文为 hides its shadow（隐藏影子）。',
    },
    {
      id: 'bio-q13', type: 'gap',
      prompt: 'Bringing deep-sea animals to the ____ usually kills them and damages their light organs.',
      promptZh: '把深海动物带到 ____ 通常会致其死亡并损坏其发光器官。',
      answer: 'surface', accept: ['surface', 'Surface'],
      explainZh: '段落 H 原文为 bringing such animals to the surface usually kills them（带到水面通常致其死亡）。',
    },
  ],
});

// ── 第 3 篇 追加(交通科学) ────────────────────────────────────────
ACADEMIC_READING_FULL.push({
  id: 'arf-traffic',
  title: 'Why Traffic Jams Form',
  titleZh: '交通拥堵为何形成',
  field: 'Transport Science',
  fieldZh: '交通科学',
  level: 'c1',
  tier: 'exam',
  wordCount: 792,
  paragraphs: [
    {
      label: 'A',
      en: 'Every driver has experienced the frustration of a traffic jam, but not every jam has the same cause. The simplest kind forms at an obvious bottleneck: an accident, a lane closure or a sharp bend forces vehicles to slow, and a queue builds up behind it. Once the obstruction is cleared, the queue gradually disappears. Far more puzzling are the jams that seem to have no cause at all. Drivers crawl forward for several minutes, then suddenly reach open road again, having passed nothing that could explain the delay.',
      zh: '每个司机都体验过堵车的沮丧，但并非每一次拥堵都是同一个原因。最简单的一种形成于明显的瓶颈：事故、封道或急弯迫使车辆减速，后方随之排起长队。障碍一旦清除，队列便逐渐消失。远为费解的是那些看似毫无原因的拥堵。司机们向前蠕动几分钟，然后忽然又回到畅通的路面，一路上并没经过任何能解释这场延误的东西。',
    },
    {
      label: 'B',
      en: 'These mysterious jams are known to scientists as phantom traffic jams, and their origin lies in the behaviour of ordinary drivers on a crowded road. When traffic is dense, a single driver who brakes a little more than necessary forces the driver behind to brake slightly harder, who in turn forces the next to brake harder still. The small disturbance grows as it passes from car to car, and a wave of braking travels backwards along the road, in the opposite direction to the traffic itself. This stop-and-go wave can continue long after the driver who started it has sped away.',
      zh: '这些神秘的拥堵被科学家称为“幽灵堵车”，其根源在于拥挤道路上普通司机的行为。当车流密集时，一个刹车比必要程度稍重的司机，迫使后车刹得稍狠一些，后车又迫使再后一辆刹得更狠。这个微小的扰动在一辆辆车之间传递时不断放大，一道刹车的波沿道路向后传播，方向与车流本身相反。这种“走走停停波”能在最初引发它的司机早已加速离去后仍持续很久。',
    },
    {
      label: 'C',
      en: 'Understanding why such waves form requires an idea that surprises many people: a road does not carry the most vehicles when cars travel as fast as possible. Traffic flow — the number of vehicles passing a point each hour — depends on both speed and how closely the vehicles are packed together. At low densities, cars move quickly but there are few of them. As more cars join, flow increases, but only up to a certain point. Beyond that critical density, adding even a few more vehicles causes speeds to fall so sharply that flow actually decreases. The road, in effect, becomes less productive just when it is being used most.',
      zh: '要理解这种波为何形成，需要一个让许多人吃惊的观念：当车辆行驶得尽可能快时，一条道路并不能承载最多的车。交通流量——每小时经过某一点的车辆数——取决于速度与车辆挤在一起的紧密程度两者。在低密度下，车速快但数量少。随着更多车加入，流量上升，但只到某一点为止。超过那个临界密度后，哪怕再多加几辆车，都会使车速急剧下降，以致流量实际上减少。这条路恰恰在被使用得最多之时，反而变得效率更低。',
    },
    {
      label: 'D',
      en: 'Human limitations make matters worse. A driver cannot react instantly; there is always a short delay between seeing the brake lights ahead and pressing the pedal. During that fraction of a second the gap has already closed, so the driver brakes a little too hard to compensate. Drivers who follow too closely leave themselves no room to absorb such disturbances smoothly, and their sudden braking passes the shock straight to the vehicle behind. Uneven speeds, frequent lane changing and tailgating therefore all tend to trigger the very waves that trap everyone.',
      zh: '人的局限使情况更糟。司机无法瞬间反应；从看见前方刹车灯到踩下踏板之间总有短暂的延迟。在那零点几秒里，车距已经缩小，于是司机为补偿而刹得稍重了些。跟车太近的司机没有给自己留下平稳吸收这类扰动的余地，他们的急刹把冲击直接传给后车。因此，忽快忽慢、频繁变道和紧贴前车，都倾向于引发那把所有人都困住的波。',
    },
    {
      label: 'E',
      en: 'At rush hour, a further problem appears: demand simply exceeds the capacity of the road. When this happens, delay does not rise in proportion to the number of extra cars. Instead, once a road is near its limit, a small increase in the number of vehicles can produce a very large increase in the time everyone loses. This is why a route that flows freely at nine o\u2019clock can be gridlocked at half past eight, even though only a modest number of additional drivers have joined it.',
      zh: '在高峰时段，又出现一个问题：需求干脆超过了道路的通行能力。当这种情况发生时，延误并不与多出来的车辆数成正比。相反，一旦道路接近极限，车辆数的小幅增加就能使每个人损失的时间大幅增加。这就是为什么一条九点畅通的路，可能在八点半就堵死，尽管加进来的司机也不过多了不太多。',
    },
    {
      label: 'F',
      en: 'Some of the most effective responses are the least obvious. Building extra lanes seems the natural remedy, yet wider roads often fill up again within a few years, because the additional space encourages more people to drive — an effect known as induced demand. Measures that manage the existing road can work better. Ramp metering, which uses traffic lights to release cars onto a motorway a few at a time, prevents sudden surges. Variable speed limits, lowered automatically when sensors detect heavy traffic, keep vehicles moving at a steady pace and smooth out the waves before they grow.',
      zh: '一些最有效的对策恰恰最不显眼。修建额外车道看似天然的补救，然而更宽的道路往往几年内又被填满，因为多出来的空间鼓励更多人开车——这一效应称为“诱增需求”。管理既有道路的措施可能更有效。匝道信号控制用红绿灯让车辆少量分批驶入高速，防止骤然涌入。可变限速在传感器探测到车流繁重时自动调低，使车辆以稳定的速度行驶，在波长大之前将其抚平。',
    },
    {
      label: 'G',
      en: 'Automation may eventually help. A car with adaptive cruise control keeps a constant distance from the vehicle ahead and reacts more smoothly and consistently than a human, damping disturbances rather than amplifying them. Experiments have shown that even a small proportion of such vehicles, distributed through ordinary traffic, can reduce the strength of stop-and-go waves. The benefit, however, depends on how the technology is used; a system tuned to accelerate and brake aggressively could just as easily make the waves worse.',
      zh: '自动化最终或许能帮上忙。装有自适应巡航的汽车与前车保持恒定距离，反应比人更平稳、更一致，能抑制扰动而非放大它。实验表明，即使在普通车流中分布着一小部分这样的车辆，也能削弱走走停停波的强度。不过，这种好处取决于技术如何使用；一套被调校成急加速、急刹车的系统，同样可能让波变得更糟。',
    },
    {
      label: 'H',
      en: 'In the end, congestion is best understood as a problem of coordination. Each driver, acting sensibly for themselves, contributes to an outcome that is worse for all. Because of this, purely technical fixes are rarely enough on their own. Many cities now combine them with measures that influence behaviour, such as charging a fee to drive into the busiest districts or improving public transport so that fewer journeys need a car at all. The jam on the motorway, in other words, is as much a social puzzle as an engineering one.',
      zh: '归根结底，拥堵最好被理解为一个协调问题。每个司机为自己作出合理的举动，却共同促成了一个对所有人都更糟的结果。正因如此，纯技术手段单独往往不够。如今许多城市把它们与影响行为的措施结合起来，比如对驶入最繁忙城区收费，或改善公共交通，使更少的出行需要用车。换句话说，高速上的那场堵车，既是工程难题，也同样是社会难题。',
    },
  ],
  questions: [
    {
      id: 'traf-q1', type: 'tfng',
      prompt: 'A jam caused by an accident disappears gradually once the obstruction is removed.',
      promptZh: '事故引起的拥堵在障碍移除后会逐渐消失。',
      answer: 'true',
      explainZh: '段落 A：瓶颈型拥堵“障碍一旦清除，队列便逐渐消失”，与陈述一致，为 True。',
    },
    {
      id: 'traf-q2', type: 'tfng',
      prompt: 'A stop-and-go wave travels in the same direction as the traffic.',
      promptZh: '走走停停波与车流方向相同地传播。',
      answer: 'false',
      explainZh: '段落 B：刹车波“沿道路向后传播，方向与车流本身相反”，与陈述相反，为 False。',
    },
    {
      id: 'traf-q3', type: 'tfng',
      prompt: 'A road carries the greatest number of vehicles when they travel as fast as possible.',
      promptZh: '当车辆行驶得尽可能快时，道路承载的车辆数最多。',
      answer: 'false',
      explainZh: '段落 C 开头即说这一观念让人吃惊——道路“并不能在车速最快时承载最多的车”，与陈述相反，为 False。',
    },
    {
      id: 'traf-q4', type: 'tfng',
      prompt: 'Phantom jams occur more often in hot weather than in cold weather.',
      promptZh: '幽灵堵车在炎热天气比寒冷天气更常发生。',
      answer: 'notgiven',
      explainZh: '全文讲堵车的成因与对策，从未提及天气或气温对幽灵堵车频率的影响，属文中未提及，为 Not Given。',
    },
    {
      id: 'traf-q5', type: 'tfng',
      prompt: 'Cars with adaptive cruise control always reduce stop-and-go waves, whatever their settings.',
      promptZh: '装自适应巡航的车无论怎样设置都总能减弱走走停停波。',
      answer: 'false',
      explainZh: '段落 G：好处“取决于技术如何使用”，被调成急加速急刹的系统“同样可能让波变得更糟”，故“无论怎样设置都总能减弱”为 False。',
    },
    {
      id: 'traf-q6', type: 'mcq',
      prompt: 'According to paragraph B, how does a phantom jam begin?',
      promptZh: '根据段落 B，幽灵堵车如何开始？',
      options: [
        'A lane is closed for roadworks',
        'One driver brakes slightly too much and the disturbance grows from car to car',
        'The road surface becomes wet and slippery',
        'Traffic lights fail at a junction',
      ],
      answer: 1,
      explainZh: '段落 B：一个刹车稍重的司机引发后车更重的刹车，扰动在车与车之间放大成波。选项 A/C/D 是其他情形或文中未提。',
    },
    {
      id: 'traf-q7', type: 'mcq',
      prompt: 'What happens when traffic density passes the critical point, according to paragraph C?',
      promptZh: '根据段落 C，当车流密度越过临界点时会发生什么？',
      options: [
        'Flow keeps rising steadily',
        'Adding more vehicles makes speed fall sharply and flow decrease',
        'Cars travel faster than before',
        'The road surface wears out more quickly',
      ],
      answer: 1,
      explainZh: '段落 C：越过临界密度后，再加车会使车速急剧下降、流量反而减少。其余选项与原文相反或未提。',
    },
    {
      id: 'traf-q8', type: 'mcq',
      prompt: 'Why does building extra lanes often fail to end congestion?',
      promptZh: '为什么增修车道往往无法终结拥堵？',
      options: [
        'The new lanes are too narrow to use',
        'The extra space encourages more people to drive (induced demand)',
        'Drivers refuse to change lanes',
        'Sensors cannot measure the new traffic',
      ],
      answer: 1,
      explainZh: '段落 F：更宽的路“几年内又被填满”，因多出的空间鼓励更多人开车——即“诱增需求”。',
    },
    {
      id: 'traf-q9', type: 'mcq',
      prompt: 'What is the writer\u2019s main conclusion in paragraph H?',
      promptZh: '段落 H 中作者的主要结论是什么？',
      options: [
        'Congestion is purely an engineering problem',
        'Congestion is a coordination problem, so technical fixes alone are rarely enough',
        'Drivers should never be charged to enter a city',
        'Public transport cannot reduce the number of journeys',
      ],
      answer: 1,
      explainZh: '段落 H：拥堵是“协调问题”，纯技术手段单独“往往不够”，需结合影响行为的措施。其余选项与原文相反。',
    },
    {
      id: 'traf-q10', type: 'gap',
      prompt: 'Jams that seem to have no cause are called ____ traffic jams.',
      promptZh: '看似毫无原因的拥堵被称为 ____ 堵车。',
      answer: 'phantom', accept: ['phantom', 'Phantom'],
      explainZh: '段落 B 原文为 phantom traffic jams（幽灵堵车）。',
    },
    {
      id: 'traf-q11', type: 'gap',
      prompt: 'The tendency for new road space to attract extra traffic is known as induced ____.',
      promptZh: '新增道路空间会吸引额外车流的倾向被称为诱增 ____。',
      answer: 'demand', accept: ['demand', 'Demand'],
      explainZh: '段落 F 原文为 induced demand（诱增需求）。',
    },
    {
      id: 'traf-q12', type: 'gap',
      prompt: 'Using traffic lights to release cars onto a motorway a few at a time is called ramp ____.',
      promptZh: '用红绿灯让车辆少量分批驶入高速被称为匝道 ____。',
      answer: 'metering', accept: ['metering', 'Metering'],
      explainZh: '段落 F 原文为 ramp metering（匝道信号控制）。',
    },
    {
      id: 'traf-q13', type: 'gap',
      prompt: 'Speed limits that are lowered automatically in heavy traffic are called ____ speed limits.',
      promptZh: '在车流繁重时自动调低的限速被称为 ____ 限速。',
      answer: 'variable', accept: ['variable', 'Variable'],
      explainZh: '段落 F 原文为 variable speed limits（可变限速）。',
    },
  ],
});
