// @ts-nocheck
// 幼儿/儿童模式：用 emoji 当"图片"（跨平台原生支持、无需下载素材）
//
// 数据结构：
//   theme/themeZh:   主题（水果、动物…）
//   items[]:         本主题的图卡，每张 { emoji, word, zh }
//                    -> 第一阶段"看图识词"会把它们排成卡片网格，点击发音
//   scenes[]:        图片句子，每个 scene 有若干 token 横向排列
//                    token = { emoji, text } 合成画面；点击 token 读 token，
//                    点击"朗读整句"读完整英文句子
//
// 设计原则：
//  - emoji 足够生动、零下载成本、iOS/Android/Web 通用
//  - 主题按日常覆盖来装，不按库存只有 4 个来砍内容
//  - 课内一律每屏 4 张（KidsLesson WORD_GROUP_SIZE），看图→听→跟读→下一组
//  - 成人可跳过，但也能作为"图形记忆法"补充
//  - 新词若还没烧神经音，会走系统 TTS；旧词/旧句仍走已烤 mp3

export const KIDS_SETS = [
  {
    id: 'kids-fruits',
    tier: 'kids',
    theme: 'Fruits',
    themeZh: '水果',
    themeEmoji: '🍎',
    items: [
      { emoji: '🍎', word: 'apple', zh: '苹果' },
      { emoji: '🍌', word: 'banana', zh: '香蕉' },
      { emoji: '🍇', word: 'grapes', zh: '葡萄' },
      { emoji: '🍊', word: 'orange', zh: '橙子' },
      { emoji: '🍉', word: 'watermelon', zh: '西瓜' },
      { emoji: '🍓', word: 'strawberry', zh: '草莓' },
      { emoji: '🍑', word: 'peach', zh: '桃子' },
      { emoji: '🍐', word: 'pear', zh: '梨' },
      { emoji: '🍒', word: 'cherry', zh: '樱桃' },
      { emoji: '🍍', word: 'pineapple', zh: '菠萝' },
      { emoji: '🥭', word: 'mango', zh: '芒果' },
      { emoji: '🍋', word: 'lemon', zh: '柠檬' },
      { emoji: '🥝', word: 'kiwi', zh: '猕猴桃' },
      { emoji: '🍈', word: 'melon', zh: '甜瓜' },
      { emoji: '🥥', word: 'coconut', zh: '椰子' },
      { emoji: '🫐', word: 'blueberry', zh: '蓝莓' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '👧', text: 'I' },
          { emoji: '❤️', text: 'like' },
          { emoji: '🍎', text: 'apples' },
        ],
        en: 'I like apples.',
        zh: '我喜欢苹果。',
      },
      {
        tokens: [
          { emoji: '🐵', text: 'The monkey' },
          { emoji: '😋', text: 'eats' },
          { emoji: '🍌', text: 'bananas' },
        ],
        en: 'The monkey eats bananas.',
        zh: '猴子吃香蕉。',
      },
      {
        tokens: [
          { emoji: '🍊', text: 'Oranges' },
          { emoji: '🧡', text: 'are' },
          { emoji: '🟠', text: 'orange' },
        ],
        en: 'Oranges are orange.',
        zh: '橙子是橙色的。',
      },
      {
        tokens: [
          { emoji: '🍉', text: 'The watermelon' },
          { emoji: '👉', text: 'is' },
          { emoji: '🟢', text: 'green' },
        ],
        en: 'The watermelon is green.',
        zh: '西瓜是绿色的。',
      },
      {
        tokens: [
          { emoji: '🍓', text: 'I eat' },
          { emoji: '🍓', text: 'a strawberry' },
        ],
        en: 'I eat a strawberry.',
        zh: '我吃一颗草莓。',
      },
      {
        tokens: [
          { emoji: '🥭', text: 'This mango' },
          { emoji: '😋', text: 'is sweet' },
        ],
        en: 'This mango is sweet.',
        zh: '这个芒果很甜。',
      },
      {
        tokens: [
          { emoji: '🍋', text: 'The lemon' },
          { emoji: '😖', text: 'is sour' },
        ],
        en: 'The lemon is sour.',
        zh: '柠檬是酸的。',
      },
      {
        tokens: [
          { emoji: '🍐', text: 'I have' },
          { emoji: '🍐', text: 'a pear' },
          { emoji: '🍑', text: 'and a peach' },
        ],
        en: 'I have a pear and a peach.',
        zh: '我有一个梨和一个桃子。',
      },
      {
        tokens: [
          { emoji: '🍍', text: 'I like' },
          { emoji: '🍍', text: 'pineapple' },
        ],
        en: 'I like pineapple.',
        zh: '我喜欢菠萝。',
      },
      {
        tokens: [
          { emoji: '🥝', text: 'The kiwi' },
          { emoji: '🟢', text: 'is green' },
        ],
        en: 'The kiwi is green.',
        zh: '猕猴桃是绿的。',
      },
      {
        tokens: [
          { emoji: '🥥', text: 'The coconut' },
          { emoji: '🟤', text: 'is brown' },
        ],
        en: 'The coconut is brown.',
        zh: '椰子是棕色的。',
      },
      {
        tokens: [
          { emoji: '🫐', text: 'I eat' },
          { emoji: '🫐', text: 'blueberries' },
        ],
        en: 'I eat blueberries.',
        zh: '我吃蓝莓。',
      },
    ],
  },

  {
    id: 'kids-animals',
    tier: 'kids',
    theme: 'Animals',
    themeZh: '动物',
    themeEmoji: '🐶',
    items: [
      { emoji: '🐶', word: 'dog', zh: '狗' },
      { emoji: '🐱', word: 'cat', zh: '猫' },
      { emoji: '🐰', word: 'rabbit', zh: '兔子' },
      { emoji: '🐦', word: 'bird', zh: '鸟' },
      { emoji: '🐟', word: 'fish', zh: '鱼' },
      { emoji: '🦆', word: 'duck', zh: '鸭子' },
      { emoji: '🐔', word: 'chicken', zh: '鸡' },
      { emoji: '🐷', word: 'pig', zh: '猪' },
      { emoji: '🐮', word: 'cow', zh: '牛' },
      { emoji: '🐴', word: 'horse', zh: '马' },
      { emoji: '🐑', word: 'sheep', zh: '羊' },
      { emoji: '🐭', word: 'mouse', zh: '老鼠' },
      { emoji: '🐸', word: 'frog', zh: '青蛙' },
      { emoji: '🦋', word: 'butterfly', zh: '蝴蝶' },
      { emoji: '🐝', word: 'bee', zh: '蜜蜂' },
      { emoji: '🐼', word: 'panda', zh: '熊猫' },
      { emoji: '🐵', word: 'monkey', zh: '猴子' },
      { emoji: '🐘', word: 'elephant', zh: '大象' },
      { emoji: '🐯', word: 'tiger', zh: '老虎' },
      { emoji: '🦁', word: 'lion', zh: '狮子' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '🐶', text: 'The dog' },
          { emoji: '🏃', text: 'is running' },
          { emoji: '💨', text: 'fast' },
        ],
        en: 'The dog is running fast.',
        zh: '狗跑得很快。',
      },
      {
        tokens: [
          { emoji: '🐱', text: 'The cat' },
          { emoji: '😴', text: 'is sleeping' },
        ],
        en: 'The cat is sleeping.',
        zh: '猫在睡觉。',
      },
      {
        tokens: [
          { emoji: '🐼', text: 'Pandas' },
          { emoji: '😋', text: 'eat' },
          { emoji: '🎋', text: 'bamboo' },
        ],
        en: 'Pandas eat bamboo.',
        zh: '熊猫吃竹子。',
      },
      {
        tokens: [
          { emoji: '🦆', text: 'The duck' },
          { emoji: '🏊', text: 'swims' },
        ],
        en: 'The duck swims.',
        zh: '鸭子在游泳。',
      },
      {
        tokens: [
          { emoji: '🐮', text: 'The cow' },
          { emoji: '🥛', text: 'gives milk' },
        ],
        en: 'The cow gives milk.',
        zh: '牛会产奶。',
      },
      {
        tokens: [
          { emoji: '🐘', text: 'The elephant' },
          { emoji: '👉', text: 'is' },
          { emoji: '🐘', text: 'big' },
        ],
        en: 'The elephant is big.',
        zh: '大象很大。',
      },
      {
        tokens: [
          { emoji: '🐝', text: 'The bee' },
          { emoji: '🌸', text: 'likes flowers' },
        ],
        en: 'The bee likes flowers.',
        zh: '蜜蜂喜欢花。',
      },
      {
        tokens: [
          { emoji: '🐸', text: 'The frog' },
          { emoji: '🦘', text: 'jumps' },
        ],
        en: 'The frog jumps.',
        zh: '青蛙在跳。',
      },
      {
        tokens: [
          { emoji: '🦁', text: 'The lion' },
          { emoji: '👉', text: 'is big' },
        ],
        en: 'The lion is big.',
        zh: '狮子很大。',
      },
      {
        tokens: [
          { emoji: '🐷', text: 'The pig' },
          { emoji: '🌸', text: 'is pink' },
        ],
        en: 'The pig is pink.',
        zh: '猪是粉色的。',
      },
      {
        tokens: [
          { emoji: '🐴', text: 'The horse' },
          { emoji: '🏃', text: 'runs' },
        ],
        en: 'The horse runs.',
        zh: '马在跑。',
      },
      {
        tokens: [
          { emoji: '🐭', text: 'The mouse' },
          { emoji: '👉', text: 'is small' },
        ],
        en: 'The mouse is small.',
        zh: '老鼠很小。',
      },
      {
        tokens: [
          { emoji: '🐯', text: 'The tiger' },
          { emoji: '🟠', text: 'is orange' },
        ],
        en: 'The tiger is orange.',
        zh: '老虎是橙色的。',
      },
      {
        tokens: [
          { emoji: '🐑', text: 'The sheep' },
          { emoji: '⚪', text: 'is white' },
        ],
        en: 'The sheep is white.',
        zh: '羊是白色的。',
      },
      {
        tokens: [
          { emoji: '🐦', text: 'The bird' },
          { emoji: '✈️', text: 'can fly' },
        ],
        en: 'The bird can fly.',
        zh: '鸟会飞。',
      },
    ],
  },

  {
    id: 'kids-veggies',
    tier: 'kids',
    theme: 'Vegetables',
    themeZh: '蔬菜',
    themeEmoji: '🥕',
    items: [
      { emoji: '🥕', word: 'carrot', zh: '胡萝卜' },
      { emoji: '🌽', word: 'corn', zh: '玉米' },
      { emoji: '🥦', word: 'broccoli', zh: '西兰花' },
      { emoji: '🍅', word: 'tomato', zh: '番茄' },
      { emoji: '🥔', word: 'potato', zh: '土豆' },
      { emoji: '🥒', word: 'cucumber', zh: '黄瓜' },
      { emoji: '🧅', word: 'onion', zh: '洋葱' },
      { emoji: '🧄', word: 'garlic', zh: '蒜' },
      { emoji: '🥬', word: 'cabbage', zh: '白菜' },
      { emoji: '🫑', word: 'pepper', zh: '彩椒' },
      { emoji: '🍆', word: 'eggplant', zh: '茄子' },
      { emoji: '🍄', word: 'mushroom', zh: '蘑菇' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '🐰', text: 'The rabbit' },
          { emoji: '😋', text: 'eats' },
          { emoji: '🥕', text: 'a carrot' },
        ],
        en: 'The rabbit eats a carrot.',
        zh: '兔子吃胡萝卜。',
      },
      {
        tokens: [
          { emoji: '🍅', text: 'The tomato' },
          { emoji: '👉', text: 'is' },
          { emoji: '🔴', text: 'red' },
        ],
        en: 'The tomato is red.',
        zh: '番茄是红色的。',
      },
      {
        tokens: [
          { emoji: '👧', text: 'I like' },
          { emoji: '🌽', text: 'corn' },
        ],
        en: 'I like corn.',
        zh: '我喜欢玉米。',
      },
      {
        tokens: [
          { emoji: '🥣', text: 'Mom cooks' },
          { emoji: '🥔', text: 'potatoes' },
        ],
        en: 'Mom cooks potatoes.',
        zh: '妈妈在煮土豆。',
      },
      {
        tokens: [
          { emoji: '🍄', text: 'The mushroom' },
          { emoji: '🍲', text: 'is in the soup' },
        ],
        en: 'The mushroom is in the soup.',
        zh: '蘑菇在汤里。',
      },
      {
        tokens: [
          { emoji: '🥒', text: 'Cut' },
          { emoji: '🥒', text: 'the cucumber' },
        ],
        en: 'Cut the cucumber.',
        zh: '切黄瓜。',
      },
      {
        tokens: [
          { emoji: '🧅', text: 'The onion' },
          { emoji: '😢', text: 'makes me cry' },
        ],
        en: 'The onion makes me cry.',
        zh: '洋葱让我流泪。',
      },
      {
        tokens: [
          { emoji: '🥦', text: 'I like' },
          { emoji: '🥦', text: 'broccoli' },
        ],
        en: 'I like broccoli.',
        zh: '我喜欢西兰花。',
      },
      {
        tokens: [
          { emoji: '🥬', text: 'Wash' },
          { emoji: '🥬', text: 'the cabbage' },
        ],
        en: 'Wash the cabbage.',
        zh: '洗白菜。',
      },
      {
        tokens: [
          { emoji: '🫑', text: 'The pepper' },
          { emoji: '🔴', text: 'is red' },
        ],
        en: 'The pepper is red.',
        zh: '彩椒是红的。',
      },
      {
        tokens: [
          { emoji: '🍆', text: 'The eggplant' },
          { emoji: '🟣', text: 'is purple' },
        ],
        en: 'The eggplant is purple.',
        zh: '茄子是紫的。',
      },
      {
        tokens: [
          { emoji: '🧄', text: 'Add' },
          { emoji: '🧄', text: 'some garlic' },
        ],
        en: 'Add some garlic.',
        zh: '加点蒜。',
      },
    ],
  },

  {
    id: 'kids-family',
    tier: 'kids',
    theme: 'Family',
    themeZh: '家庭',
    themeEmoji: '👨‍👩‍👧',
    items: [
      { emoji: '👨', word: 'dad', zh: '爸爸' },
      { emoji: '👩', word: 'mom', zh: '妈妈' },
      { emoji: '👴', word: 'grandpa', zh: '爷爷' },
      { emoji: '👵', word: 'grandma', zh: '奶奶' },
      { emoji: '👦', word: 'brother', zh: '哥哥 / 弟弟' },
      { emoji: '👧', word: 'sister', zh: '姐姐 / 妹妹' },
      { emoji: '👶', word: 'baby', zh: '宝宝' },
      { emoji: '🧒', word: 'me', zh: '我' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '👨', text: 'Dad' },
          { emoji: '❤️', text: 'loves' },
          { emoji: '👶', text: 'the baby' },
        ],
        en: 'Dad loves the baby.',
        zh: '爸爸爱宝宝。',
      },
      {
        tokens: [
          { emoji: '👩', text: 'Mom' },
          { emoji: '👨‍🍳', text: 'is cooking' },
          { emoji: '🍲', text: 'dinner' },
        ],
        en: 'Mom is cooking dinner.',
        zh: '妈妈在做晚饭。',
      },
      {
        tokens: [
          { emoji: '👴', text: 'Grandpa' },
          { emoji: '📖', text: 'reads' },
          { emoji: '📚', text: 'a book' },
        ],
        en: 'Grandpa reads a book.',
        zh: '爷爷在看书。',
      },
      {
        tokens: [
          { emoji: '👧', text: 'This is' },
          { emoji: '👧', text: 'my sister' },
        ],
        en: 'This is my sister.',
        zh: '这是我的姐姐。',
      },
      {
        tokens: [
          { emoji: '👦', text: 'This is' },
          { emoji: '👦', text: 'my brother' },
        ],
        en: 'This is my brother.',
        zh: '这是我的哥哥。',
      },
      {
        tokens: [
          { emoji: '👵', text: 'Grandma' },
          { emoji: '😊', text: 'smiles' },
        ],
        en: 'Grandma smiles.',
        zh: '奶奶在笑。',
      },
      {
        tokens: [
          { emoji: '👶', text: 'The baby' },
          { emoji: '👉', text: 'is small' },
        ],
        en: 'The baby is small.',
        zh: '宝宝很小。',
      },
      {
        tokens: [
          { emoji: '🧒', text: 'I love' },
          { emoji: '👩', text: 'mom' },
        ],
        en: 'I love mom.',
        zh: '我爱妈妈。',
      },
      {
        tokens: [
          { emoji: '👨', text: 'Dad' },
          { emoji: '👉', text: 'is tall' },
        ],
        en: 'Dad is tall.',
        zh: '爸爸很高。',
      },
    ],
  },

  {
    id: 'kids-colors',
    tier: 'kids',
    theme: 'Colors',
    themeZh: '颜色',
    themeEmoji: '🌈',
    items: [
      { emoji: '🔴', word: 'red', zh: '红色' },
      { emoji: '🟠', word: 'orange', zh: '橙色' },
      { emoji: '🟡', word: 'yellow', zh: '黄色' },
      { emoji: '🟢', word: 'green', zh: '绿色' },
      { emoji: '🔵', word: 'blue', zh: '蓝色' },
      { emoji: '🟣', word: 'purple', zh: '紫色' },
      { emoji: '🌸', word: 'pink', zh: '粉色' },
      { emoji: '🟤', word: 'brown', zh: '棕色' },
      { emoji: '⚫', word: 'black', zh: '黑色' },
      { emoji: '⚪', word: 'white', zh: '白色' },
      { emoji: '🩶', word: 'gray', zh: '灰色' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '🍎', text: 'The apple' },
          { emoji: '👉', text: 'is' },
          { emoji: '🔴', text: 'red' },
        ],
        en: 'The apple is red.',
        zh: '苹果是红色的。',
      },
      {
        tokens: [
          { emoji: '☁️', text: 'The sky' },
          { emoji: '👉', text: 'is' },
          { emoji: '🔵', text: 'blue' },
        ],
        en: 'The sky is blue.',
        zh: '天空是蓝色的。',
      },
      {
        tokens: [
          { emoji: '🌱', text: 'The grass' },
          { emoji: '👉', text: 'is' },
          { emoji: '🟢', text: 'green' },
        ],
        en: 'The grass is green.',
        zh: '草是绿色的。',
      },
      {
        tokens: [
          { emoji: '🍌', text: 'The banana' },
          { emoji: '👉', text: 'is' },
          { emoji: '🟡', text: 'yellow' },
        ],
        en: 'The banana is yellow.',
        zh: '香蕉是黄色的。',
      },
      {
        tokens: [
          { emoji: '🍇', text: 'The grapes' },
          { emoji: '👉', text: 'are' },
          { emoji: '🟣', text: 'purple' },
        ],
        en: 'The grapes are purple.',
        zh: '葡萄是紫色的。',
      },
      {
        tokens: [
          { emoji: '☀️', text: 'The sun' },
          { emoji: '🟠', text: 'is orange' },
        ],
        en: 'The sun is orange.',
        zh: '太阳是橙色的。',
      },
      {
        tokens: [
          { emoji: '🐷', text: 'The pig' },
          { emoji: '🌸', text: 'is pink' },
        ],
        en: 'The pig is pink.',
        zh: '猪是粉色的。',
      },
      {
        tokens: [
          { emoji: '🐻', text: 'The bear' },
          { emoji: '🟤', text: 'is brown' },
        ],
        en: 'The bear is brown.',
        zh: '熊是棕色的。',
      },
      {
        tokens: [
          { emoji: '🌙', text: 'The night' },
          { emoji: '⚫', text: 'is black' },
        ],
        en: 'The night is black.',
        zh: '夜晚是黑的。',
      },
      {
        tokens: [
          { emoji: '☁️', text: 'The cloud' },
          { emoji: '⚪', text: 'is white' },
        ],
        en: 'The cloud is white.',
        zh: '云是白的。',
      },
      {
        tokens: [
          { emoji: '🐘', text: 'The elephant' },
          { emoji: '🩶', text: 'is gray' },
        ],
        en: 'The elephant is gray.',
        zh: '大象是灰的。',
      },
    ],
  },

  {
    id: 'kids-weather',
    tier: 'kids',
    theme: 'Weather',
    themeZh: '天气',
    themeEmoji: '☀️',
    items: [
      { emoji: '☀️', word: 'sunny', zh: '晴天' },
      { emoji: '🌧️', word: 'rainy', zh: '雨天' },
      { emoji: '❄️', word: 'snowy', zh: '雪天' },
      { emoji: '☁️', word: 'cloudy', zh: '多云' },
      { emoji: '💨', word: 'windy', zh: '有风' },
      { emoji: '⛈️', word: 'stormy', zh: '暴风雨' },
      { emoji: '🌈', word: 'rainbow', zh: '彩虹' },
      { emoji: '🥵', word: 'hot', zh: '热' },
      { emoji: '🥶', word: 'cold', zh: '冷' },
      { emoji: '☂️', word: 'umbrella', zh: '雨伞' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '📅', text: 'Today' },
          { emoji: '👉', text: 'is' },
          { emoji: '☀️', text: 'sunny' },
        ],
        en: 'Today is sunny.',
        zh: '今天是晴天。',
      },
      {
        tokens: [
          { emoji: '🌧️', text: "It's raining" },
          { emoji: '☂️', text: 'take an umbrella' },
        ],
        en: "It's raining, take an umbrella.",
        zh: '下雨了，带把伞。',
      },
      {
        tokens: [
          { emoji: '❄️', text: 'It is' },
          { emoji: '❄️', text: 'snowy' },
        ],
        en: 'It is snowy.',
        zh: '今天下雪。',
      },
      {
        tokens: [
          { emoji: '🌈', text: 'I see' },
          { emoji: '🌈', text: 'a rainbow' },
        ],
        en: 'I see a rainbow.',
        zh: '我看见彩虹。',
      },
      {
        tokens: [
          { emoji: '☁️', text: 'It is' },
          { emoji: '☁️', text: 'cloudy' },
        ],
        en: 'It is cloudy.',
        zh: '今天多云。',
      },
      {
        tokens: [
          { emoji: '💨', text: 'It is' },
          { emoji: '💨', text: 'windy' },
        ],
        en: 'It is windy.',
        zh: '今天有风。',
      },
      {
        tokens: [
          { emoji: '🥵', text: 'It is' },
          { emoji: '🥵', text: 'hot today' },
        ],
        en: 'It is hot today.',
        zh: '今天很热。',
      },
      {
        tokens: [
          { emoji: '🥶', text: 'It is' },
          { emoji: '🥶', text: 'cold today' },
        ],
        en: 'It is cold today.',
        zh: '今天很冷。',
      },
      {
        tokens: [
          { emoji: '⛈️', text: 'The storm' },
          { emoji: '👉', text: 'is coming' },
        ],
        en: 'The storm is coming.',
        zh: '暴风雨要来了。',
      },
    ],
  },

  {
    id: 'kids-body',
    tier: 'kids',
    theme: 'Body',
    themeZh: '身体',
    themeEmoji: '👀',
    items: [
      { emoji: '👀', word: 'eyes', zh: '眼睛' },
      { emoji: '👃', word: 'nose', zh: '鼻子' },
      { emoji: '👄', word: 'mouth', zh: '嘴巴' },
      { emoji: '👂', word: 'ear', zh: '耳朵' },
      { emoji: '🦷', word: 'teeth', zh: '牙齿' },
      { emoji: '💇', word: 'hair', zh: '头发' },
      { emoji: '🤚', word: 'hand', zh: '手' },
      { emoji: '🦶', word: 'foot', zh: '脚' },
      { emoji: '💪', word: 'arm', zh: '手臂' },
      { emoji: '🦵', word: 'leg', zh: '腿' },
      { emoji: '😀', word: 'head', zh: '头' },
      { emoji: '😊', word: 'face', zh: '脸' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '👀', text: 'I see' },
          { emoji: '🌸', text: 'with my eyes' },
        ],
        en: 'I see with my eyes.',
        zh: '我用眼睛看。',
      },
      {
        tokens: [
          { emoji: '👂', text: 'I hear' },
          { emoji: '🎵', text: 'music' },
        ],
        en: 'I hear music.',
        zh: '我听见音乐。',
      },
      {
        tokens: [
          { emoji: '🤚', text: 'This is' },
          { emoji: '🤚', text: 'my hand' },
        ],
        en: 'This is my hand.',
        zh: '这是我的手。',
      },
      {
        tokens: [
          { emoji: '🦶', text: 'I kick' },
          { emoji: '⚽', text: 'with my foot' },
        ],
        en: 'I kick with my foot.',
        zh: '我用脚踢。',
      },
      {
        tokens: [
          { emoji: '👃', text: 'This is' },
          { emoji: '👃', text: 'my nose' },
        ],
        en: 'This is my nose.',
        zh: '这是我的鼻子。',
      },
      {
        tokens: [
          { emoji: '👄', text: 'Open' },
          { emoji: '👄', text: 'your mouth' },
        ],
        en: 'Open your mouth.',
        zh: '张开嘴。',
      },
      {
        tokens: [
          { emoji: '🦷', text: 'Brush' },
          { emoji: '🦷', text: 'your teeth' },
        ],
        en: 'Brush your teeth.',
        zh: '刷牙。',
      },
      {
        tokens: [
          { emoji: '😀', text: 'Touch' },
          { emoji: '😀', text: 'your head' },
        ],
        en: 'Touch your head.',
        zh: '摸摸头。',
      },
      {
        tokens: [
          { emoji: '👏', text: 'Clap' },
          { emoji: '🤚', text: 'your hands' },
        ],
        en: 'Clap your hands.',
        zh: '拍手。',
      },
      {
        tokens: [
          { emoji: '😊', text: 'This is' },
          { emoji: '😊', text: 'my face' },
        ],
        en: 'This is my face.',
        zh: '这是我的脸。',
      },
    ],
  },

  {
    id: 'kids-actions',
    tier: 'kids',
    theme: 'Actions',
    themeZh: '动作',
    themeEmoji: '🏃',
    items: [
      { emoji: '🏃', word: 'run', zh: '跑' },
      { emoji: '🚶', word: 'walk', zh: '走' },
      { emoji: '🛌', word: 'sleep', zh: '睡觉' },
      { emoji: '🍽️', word: 'eat', zh: '吃' },
      { emoji: '🥤', word: 'drink', zh: '喝' },
      { emoji: '🦘', word: 'jump', zh: '跳' },
      { emoji: '🪑', word: 'sit', zh: '坐' },
      { emoji: '🧍', word: 'stand', zh: '站' },
      { emoji: '👏', word: 'clap', zh: '拍手' },
      { emoji: '💃', word: 'dance', zh: '跳舞' },
      { emoji: '🤗', word: 'hug', zh: '拥抱' },
      { emoji: '📖', word: 'read', zh: '读' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '👦', text: 'I' },
          { emoji: '🏃', text: 'run' },
          { emoji: '🏫', text: 'to school' },
        ],
        en: 'I run to school.',
        zh: '我跑去学校。',
      },
      {
        tokens: [
          { emoji: '👨', text: 'He' },
          { emoji: '🍽️', text: 'eats' },
          { emoji: '🍕', text: 'pizza' },
        ],
        en: 'He eats pizza.',
        zh: '他吃披萨。',
      },
      {
        tokens: [
          { emoji: '👶', text: 'The baby' },
          { emoji: '🛌', text: 'is sleeping' },
        ],
        en: 'The baby is sleeping.',
        zh: '宝宝在睡觉。',
      },
      {
        tokens: [
          { emoji: '👧', text: 'She' },
          { emoji: '💃', text: 'can dance' },
        ],
        en: 'She can dance.',
        zh: '她会跳舞。',
      },
      {
        tokens: [
          { emoji: '🧒', text: 'Please' },
          { emoji: '🪑', text: 'sit down' },
        ],
        en: 'Please sit down.',
        zh: '请坐下。',
      },
      {
        tokens: [
          { emoji: '🧍', text: 'Please' },
          { emoji: '🧍', text: 'stand up' },
        ],
        en: 'Please stand up.',
        zh: '请站起来。',
      },
      {
        tokens: [
          { emoji: '🚶', text: 'I walk' },
          { emoji: '🏫', text: 'to school' },
        ],
        en: 'I walk to school.',
        zh: '我走到学校。',
      },
      {
        tokens: [
          { emoji: '🥤', text: 'I drink' },
          { emoji: '💧', text: 'water' },
        ],
        en: 'I drink water.',
        zh: '我喝水。',
      },
      {
        tokens: [
          { emoji: '🦘', text: 'I can' },
          { emoji: '🦘', text: 'jump' },
        ],
        en: 'I can jump.',
        zh: '我会跳。',
      },
      {
        tokens: [
          { emoji: '👏', text: 'Please' },
          { emoji: '👏', text: 'clap' },
        ],
        en: 'Please clap.',
        zh: '请拍手。',
      },
      {
        tokens: [
          { emoji: '🤗', text: 'Give me' },
          { emoji: '🤗', text: 'a hug' },
        ],
        en: 'Give me a hug.',
        zh: '抱抱我。',
      },
      {
        tokens: [
          { emoji: '📖', text: 'I read' },
          { emoji: '📚', text: 'a book' },
        ],
        en: 'I read a book.',
        zh: '我看书。',
      },
    ],
  },

  {
    id: 'kids-numbers',
    tier: 'kids',
    theme: 'Numbers',
    themeZh: '数字',
    themeEmoji: '1️⃣',
    items: [
      { emoji: '1️⃣', word: 'one', zh: '一' },
      { emoji: '2️⃣', word: 'two', zh: '二' },
      { emoji: '3️⃣', word: 'three', zh: '三' },
      { emoji: '4️⃣', word: 'four', zh: '四' },
      { emoji: '5️⃣', word: 'five', zh: '五' },
      { emoji: '6️⃣', word: 'six', zh: '六' },
      { emoji: '7️⃣', word: 'seven', zh: '七' },
      { emoji: '8️⃣', word: 'eight', zh: '八' },
      { emoji: '9️⃣', word: 'nine', zh: '九' },
      { emoji: '🔟', word: 'ten', zh: '十' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '🍎', text: 'I have' },
          { emoji: '2️⃣', text: 'two' },
          { emoji: '🍎', text: 'apples' },
        ],
        en: 'I have two apples.',
        zh: '我有两个苹果。',
      },
      {
        tokens: [
          { emoji: '🐱', text: 'There are' },
          { emoji: '3️⃣', text: 'three' },
          { emoji: '🐱', text: 'cats' },
        ],
        en: 'There are three cats.',
        zh: '有三只猫。',
      },
      {
        tokens: [
          { emoji: '✋', text: 'I have' },
          { emoji: '🔟', text: 'ten' },
          { emoji: '🤚', text: 'fingers' },
        ],
        en: 'I have ten fingers.',
        zh: '我有十根手指。',
      },
      {
        tokens: [
          { emoji: '3️⃣', text: 'I am' },
          { emoji: '3️⃣', text: 'three' },
        ],
        en: 'I am three.',
        zh: '我三岁。',
      },
      {
        tokens: [
          { emoji: '5️⃣', text: 'Give me' },
          { emoji: '5️⃣', text: 'five' },
        ],
        en: 'Give me five.',
        zh: '击掌。',
      },
      {
        tokens: [
          { emoji: '7️⃣', text: 'There are' },
          { emoji: '7️⃣', text: 'seven days' },
        ],
        en: 'There are seven days.',
        zh: '有七天。',
      },
      {
        tokens: [
          { emoji: '8️⃣', text: 'Wake up at' },
          { emoji: '8️⃣', text: 'eight' },
        ],
        en: 'Wake up at eight.',
        zh: '八点起床。',
      },
      {
        tokens: [
          { emoji: '9️⃣', text: 'I am' },
          { emoji: '9️⃣', text: 'nine' },
        ],
        en: 'I am nine.',
        zh: '我九岁。',
      },
      {
        tokens: [
          { emoji: '🔟', text: 'I can count' },
          { emoji: '🔟', text: 'to ten' },
        ],
        en: 'I can count to ten.',
        zh: '我能数到十。',
      },
      {
        tokens: [
          { emoji: '1️⃣', text: 'I have' },
          { emoji: '🐶', text: 'one dog' },
        ],
        en: 'I have one dog.',
        zh: '我有一只狗。',
      },
      {
        tokens: [
          { emoji: '4️⃣', text: 'I see' },
          { emoji: '🐦', text: 'four birds' },
        ],
        en: 'I see four birds.',
        zh: '我看见四只鸟。',
      },
    ],
  },

  {
    id: 'kids-food',
    tier: 'kids',
    theme: 'Food',
    themeZh: '食物',
    themeEmoji: '🍞',
    items: [
      { emoji: '🍞', word: 'bread', zh: '面包' },
      { emoji: '🥛', word: 'milk', zh: '牛奶' },
      { emoji: '🥚', word: 'egg', zh: '鸡蛋' },
      { emoji: '🍚', word: 'rice', zh: '米饭' },
      { emoji: '🍜', word: 'noodles', zh: '面条' },
      { emoji: '🍲', word: 'soup', zh: '汤' },
      { emoji: '🍗', word: 'chicken', zh: '鸡肉' },
      { emoji: '🐟', word: 'fish', zh: '鱼' },
      { emoji: '🧀', word: 'cheese', zh: '奶酪' },
      { emoji: '🍪', word: 'cookie', zh: '饼干' },
      { emoji: '🍰', word: 'cake', zh: '蛋糕' },
      { emoji: '🍦', word: 'ice cream', zh: '冰淇淋' },
      { emoji: '💧', word: 'water', zh: '水' },
      { emoji: '🧃', word: 'juice', zh: '果汁' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '👦', text: 'I eat' },
          { emoji: '🍞', text: 'bread' },
          { emoji: '☀️', text: 'in the morning' },
        ],
        en: 'I eat bread in the morning.',
        zh: '我早上吃面包。',
      },
      {
        tokens: [
          { emoji: '🐱', text: 'The cat' },
          { emoji: '👅', text: 'drinks' },
          { emoji: '🥛', text: 'milk' },
        ],
        en: 'The cat drinks milk.',
        zh: '猫在喝牛奶。',
      },
      {
        tokens: [
          { emoji: '🍚', text: 'I eat' },
          { emoji: '🍚', text: 'rice' },
        ],
        en: 'I eat rice.',
        zh: '我吃饭。',
      },
      {
        tokens: [
          { emoji: '🍦', text: 'I like' },
          { emoji: '🍦', text: 'ice cream' },
        ],
        en: 'I like ice cream.',
        zh: '我喜欢冰淇淋。',
      },
      {
        tokens: [
          { emoji: '🍪', text: 'I want' },
          { emoji: '🍪', text: 'a cookie' },
        ],
        en: 'I want a cookie.',
        zh: '我想吃饼干。',
      },
      {
        tokens: [
          { emoji: '🍜', text: 'The noodles' },
          { emoji: '🔥', text: 'are hot' },
        ],
        en: 'The noodles are hot.',
        zh: '面条很烫。',
      },
      {
        tokens: [
          { emoji: '🥚', text: 'I like' },
          { emoji: '🥚', text: 'eggs' },
        ],
        en: 'I like eggs.',
        zh: '我喜欢鸡蛋。',
      },
      {
        tokens: [
          { emoji: '🧀', text: 'Put' },
          { emoji: '🧀', text: 'cheese on it' },
        ],
        en: 'Put cheese on it.',
        zh: '放点奶酪。',
      },
      {
        tokens: [
          { emoji: '🧃', text: 'I drink' },
          { emoji: '🧃', text: 'juice' },
        ],
        en: 'I drink juice.',
        zh: '我喝果汁。',
      },
      {
        tokens: [
          { emoji: '🍗', text: 'I eat' },
          { emoji: '🍗', text: 'chicken' },
        ],
        en: 'I eat chicken.',
        zh: '我吃鸡肉。',
      },
      {
        tokens: [
          { emoji: '🍲', text: 'I like' },
          { emoji: '🍲', text: 'soup' },
        ],
        en: 'I like soup.',
        zh: '我喜欢汤。',
      },
      {
        tokens: [
          { emoji: '💧', text: 'I drink' },
          { emoji: '💧', text: 'water' },
        ],
        en: 'I drink water.',
        zh: '我喝水。',
      },
      {
        tokens: [
          { emoji: '🍰', text: 'This cake' },
          { emoji: '😋', text: 'is yummy' },
        ],
        en: 'This cake is yummy.',
        zh: '这个蛋糕很好吃。',
      },
      {
        tokens: [
          { emoji: '🐟', text: 'I eat' },
          { emoji: '🐟', text: 'fish' },
        ],
        en: 'I eat fish.',
        zh: '我吃鱼。',
      },
    ],
  },

  {
    id: 'kids-school',
    tier: 'kids',
    theme: 'School',
    themeZh: '学校',
    themeEmoji: '🏫',
    items: [
      { emoji: '📚', word: 'book', zh: '书' },
      { emoji: '✏️', word: 'pencil', zh: '铅笔' },
      { emoji: '🖍️', word: 'crayon', zh: '蜡笔' },
      { emoji: '🎒', word: 'bag', zh: '书包' },
      { emoji: '👩‍🏫', word: 'teacher', zh: '老师' },
      { emoji: '🪑', word: 'desk', zh: '课桌' },
      { emoji: '📏', word: 'ruler', zh: '尺子' },
      { emoji: '✂️', word: 'scissors', zh: '剪刀' },
      { emoji: '📄', word: 'paper', zh: '纸' },
      { emoji: '🧽', word: 'eraser', zh: '橡皮' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '👦', text: 'I' },
          { emoji: '📖', text: 'read' },
          { emoji: '📚', text: 'a book' },
        ],
        en: 'I read a book.',
        zh: '我看书。',
      },
      {
        tokens: [
          { emoji: '👩‍🏫', text: 'The teacher' },
          { emoji: '❤️', text: 'likes' },
          { emoji: '👶', text: 'children' },
        ],
        en: 'The teacher likes children.',
        zh: '老师喜欢孩子们。',
      },
      {
        tokens: [
          { emoji: '🎒', text: 'This is' },
          { emoji: '🎒', text: 'my bag' },
        ],
        en: 'This is my bag.',
        zh: '这是我的书包。',
      },
      {
        tokens: [
          { emoji: '✏️', text: 'I write' },
          { emoji: '✏️', text: 'with a pencil' },
        ],
        en: 'I write with a pencil.',
        zh: '我用铅笔写字。',
      },
      {
        tokens: [
          { emoji: '🖍️', text: 'I color' },
          { emoji: '🖍️', text: 'with a crayon' },
        ],
        en: 'I color with a crayon.',
        zh: '我用蜡笔涂色。',
      },
      {
        tokens: [
          { emoji: '🪑', text: 'This is' },
          { emoji: '🪑', text: 'my desk' },
        ],
        en: 'This is my desk.',
        zh: '这是我的课桌。',
      },
      {
        tokens: [
          { emoji: '📄', text: 'I need' },
          { emoji: '📄', text: 'paper' },
        ],
        en: 'I need paper.',
        zh: '我需要纸。',
      },
      {
        tokens: [
          { emoji: '🧽', text: 'Use' },
          { emoji: '🧽', text: 'the eraser' },
        ],
        en: 'Use the eraser.',
        zh: '用橡皮。',
      },
      {
        tokens: [
          { emoji: '✂️', text: 'Cut' },
          { emoji: '📄', text: 'the paper' },
        ],
        en: 'Cut the paper.',
        zh: '剪纸。',
      },
      {
        tokens: [
          { emoji: '📏', text: 'This is' },
          { emoji: '📏', text: 'my ruler' },
        ],
        en: 'This is my ruler.',
        zh: '这是我的尺子。',
      },
    ],
  },

  {
    id: 'kids-toys',
    tier: 'kids',
    theme: 'Toys',
    themeZh: '玩具',
    themeEmoji: '🧸',
    items: [
      { emoji: '🧸', word: 'bear', zh: '小熊' },
      { emoji: '🚗', word: 'car', zh: '小汽车' },
      { emoji: '⚽', word: 'ball', zh: '球' },
      { emoji: '🪁', word: 'kite', zh: '风筝' },
      { emoji: '🎎', word: 'doll', zh: '娃娃' },
      { emoji: '🧱', word: 'blocks', zh: '积木' },
      { emoji: '🤖', word: 'robot', zh: '机器人' },
      { emoji: '🥁', word: 'drum', zh: '鼓' },
      { emoji: '🎈', word: 'balloon', zh: '气球' },
      { emoji: '🪀', word: 'yo-yo', zh: '悠悠球' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '👶', text: 'The baby' },
          { emoji: '❤️', text: 'loves' },
          { emoji: '🧸', text: 'the teddy bear' },
        ],
        en: 'The baby loves the teddy bear.',
        zh: '宝宝喜欢泰迪熊。',
      },
      {
        tokens: [
          { emoji: '👧', text: 'We' },
          { emoji: '🎮', text: 'play with' },
          { emoji: '⚽', text: 'a ball' },
        ],
        en: 'We play with a ball.',
        zh: '我们玩球。',
      },
      {
        tokens: [
          { emoji: '🎈', text: 'I have' },
          { emoji: '🎈', text: 'a balloon' },
        ],
        en: 'I have a balloon.',
        zh: '我有一个气球。',
      },
      {
        tokens: [
          { emoji: '🤖', text: 'The robot' },
          { emoji: '🚶', text: 'can walk' },
        ],
        en: 'The robot can walk.',
        zh: '机器人会走路。',
      },
      {
        tokens: [
          { emoji: '🪁', text: 'I fly' },
          { emoji: '🪁', text: 'a kite' },
        ],
        en: 'I fly a kite.',
        zh: '我放风筝。',
      },
      {
        tokens: [
          { emoji: '🎎', text: 'This is' },
          { emoji: '🎎', text: 'my doll' },
        ],
        en: 'This is my doll.',
        zh: '这是我的娃娃。',
      },
      {
        tokens: [
          { emoji: '🧱', text: 'I play' },
          { emoji: '🧱', text: 'with blocks' },
        ],
        en: 'I play with blocks.',
        zh: '我玩积木。',
      },
      {
        tokens: [
          { emoji: '🥁', text: 'I play' },
          { emoji: '🥁', text: 'the drum' },
        ],
        en: 'I play the drum.',
        zh: '我打鼓。',
      },
      {
        tokens: [
          { emoji: '🪀', text: 'I have' },
          { emoji: '🪀', text: 'a yo-yo' },
        ],
        en: 'I have a yo-yo.',
        zh: '我有一个悠悠球。',
      },
      {
        tokens: [
          { emoji: '🚗', text: 'I like' },
          { emoji: '🚗', text: 'this car' },
        ],
        en: 'I like this car.',
        zh: '我喜欢这辆小汽车。',
      },
    ],
  },

  {
    id: 'kids-transport',
    tier: 'kids',
    theme: 'Transportation',
    themeZh: '交通工具',
    themeEmoji: '🚗',
    items: [
      { emoji: '🚗', word: 'car', zh: '汽车' },
      { emoji: '🚌', word: 'bus', zh: '公交车' },
      { emoji: '🚕', word: 'taxi', zh: '出租车' },
      { emoji: '🚲', word: 'bike', zh: '自行车' },
      { emoji: '🛵', word: 'scooter', zh: '摩托车' },
      { emoji: '🚇', word: 'subway', zh: '地铁' },
      { emoji: '🚆', word: 'train', zh: '火车' },
      { emoji: '✈️', word: 'plane', zh: '飞机' },
      { emoji: '🚢', word: 'ship', zh: '轮船' },
      { emoji: '🚑', word: 'ambulance', zh: '救护车' },
      { emoji: '🚒', word: 'fire truck', zh: '消防车' },
      { emoji: '🚓', word: 'police car', zh: '警车' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '👦', text: 'I go' },
          { emoji: '🏫', text: 'to school' },
          { emoji: '🚌', text: 'by bus' },
        ],
        en: 'I go to school by bus.',
        zh: '我坐公交去学校。',
      },
      {
        tokens: [
          { emoji: '✈️', text: 'The plane' },
          { emoji: '🛫', text: 'flies' },
          { emoji: '☁️', text: 'high' },
        ],
        en: 'The plane flies high.',
        zh: '飞机飞得高。',
      },
      {
        tokens: [
          { emoji: '🚆', text: 'The train' },
          { emoji: '👉', text: 'is' },
          { emoji: '🟡', text: 'yellow' },
        ],
        en: 'The train is yellow.',
        zh: '火车是黄色的。',
      },
      {
        tokens: [
          { emoji: '🚲', text: 'I ride' },
          { emoji: '🚲', text: 'a bike' },
        ],
        en: 'I ride a bike.',
        zh: '我骑自行车。',
      },
      {
        tokens: [
          { emoji: '🚕', text: 'I take' },
          { emoji: '🚕', text: 'a taxi' },
        ],
        en: 'I take a taxi.',
        zh: '我坐出租车。',
      },
      {
        tokens: [
          { emoji: '🚢', text: 'The ship' },
          { emoji: '👉', text: 'is big' },
        ],
        en: 'The ship is big.',
        zh: '轮船很大。',
      },
      {
        tokens: [
          { emoji: '🚑', text: 'Call' },
          { emoji: '🚑', text: 'an ambulance' },
        ],
        en: 'Call an ambulance.',
        zh: '叫救护车。',
      },
      {
        tokens: [
          { emoji: '🚒', text: 'The fire truck' },
          { emoji: '🔴', text: 'is red' },
        ],
        en: 'The fire truck is red.',
        zh: '消防车是红的。',
      },
      {
        tokens: [
          { emoji: '🛵', text: 'I ride' },
          { emoji: '🛵', text: 'a scooter' },
        ],
        en: 'I ride a scooter.',
        zh: '我骑摩托车。',
      },
      {
        tokens: [
          { emoji: '🚇', text: 'We take' },
          { emoji: '🚇', text: 'the subway' },
        ],
        en: 'We take the subway.',
        zh: '我们坐地铁。',
      },
      {
        tokens: [
          { emoji: '🚓', text: 'The police car' },
          { emoji: '👉', text: 'is here' },
        ],
        en: 'The police car is here.',
        zh: '警车来了。',
      },
    ],
  },

  {
    id: 'kids-house',
    tier: 'kids',
    theme: 'Home',
    themeZh: '家里',
    themeEmoji: '🏠',
    items: [
      { emoji: '🏠', word: 'house', zh: '房子' },
      { emoji: '🚪', word: 'door', zh: '门' },
      { emoji: '🪟', word: 'window', zh: '窗户' },
      { emoji: '🛏️', word: 'bed', zh: '床' },
      { emoji: '🪑', word: 'chair', zh: '椅子' },
      { emoji: '🍽️', word: 'table', zh: '桌子' },
      { emoji: '🛋️', word: 'sofa', zh: '沙发' },
      { emoji: '💡', word: 'lamp', zh: '灯' },
      { emoji: '📺', word: 'TV', zh: '电视' },
      { emoji: '🍳', word: 'kitchen', zh: '厨房' },
      { emoji: '🚿', word: 'bathroom', zh: '卫生间' },
      { emoji: '🧊', word: 'fridge', zh: '冰箱' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '👨‍👩‍👧', text: 'My family' },
          { emoji: '🏠', text: 'lives in' },
          { emoji: '🏠', text: 'a house' },
        ],
        en: 'My family lives in a house.',
        zh: '我的家人住在一间房子里。',
      },
      {
        tokens: [
          { emoji: '👶', text: 'The baby' },
          { emoji: '🛌', text: 'sleeps in' },
          { emoji: '🛏️', text: 'the bed' },
        ],
        en: 'The baby sleeps in the bed.',
        zh: '宝宝在床上睡觉。',
      },
      {
        tokens: [
          { emoji: '🚪', text: 'Please' },
          { emoji: '🚪', text: 'open the door' },
        ],
        en: 'Please open the door.',
        zh: '请开门。',
      },
      {
        tokens: [
          { emoji: '🍳', text: 'Mom is' },
          { emoji: '🍳', text: 'in the kitchen' },
        ],
        en: 'Mom is in the kitchen.',
        zh: '妈妈在厨房。',
      },
      {
        tokens: [
          { emoji: '🪟', text: 'Open' },
          { emoji: '🪟', text: 'the window' },
        ],
        en: 'Open the window.',
        zh: '打开窗户。',
      },
      {
        tokens: [
          { emoji: '🪑', text: 'Sit on' },
          { emoji: '🪑', text: 'the chair' },
        ],
        en: 'Sit on the chair.',
        zh: '坐在椅子上。',
      },
      {
        tokens: [
          { emoji: '💡', text: 'The lamp' },
          { emoji: '👉', text: 'is on' },
        ],
        en: 'The lamp is on.',
        zh: '灯开着。',
      },
      {
        tokens: [
          { emoji: '📺', text: 'I watch' },
          { emoji: '📺', text: 'TV' },
        ],
        en: 'I watch TV.',
        zh: '我看电视。',
      },
      {
        tokens: [
          { emoji: '🚿', text: 'Wash in' },
          { emoji: '🚿', text: 'the bathroom' },
        ],
        en: 'Wash in the bathroom.',
        zh: '在卫生间洗。',
      },
      {
        tokens: [
          { emoji: '🧊', text: 'The milk' },
          { emoji: '👉', text: 'is in the fridge' },
        ],
        en: 'The milk is in the fridge.',
        zh: '牛奶在冰箱里。',
      },
      {
        tokens: [
          { emoji: '🛋️', text: 'Sit on' },
          { emoji: '🛋️', text: 'the sofa' },
        ],
        en: 'Sit on the sofa.',
        zh: '坐在沙发上。',
      },
      {
        tokens: [
          { emoji: '🍽️', text: 'Put it on' },
          { emoji: '🍽️', text: 'the table' },
        ],
        en: 'Put it on the table.',
        zh: '放到桌子上。',
      },
    ],
  },

  {
    id: 'kids-clothes',
    tier: 'kids',
    theme: 'Clothes',
    themeZh: '衣服',
    themeEmoji: '👕',
    items: [
      { emoji: '👕', word: 'shirt', zh: '衬衫' },
      { emoji: '👖', word: 'pants', zh: '裤子' },
      { emoji: '👗', word: 'dress', zh: '连衣裙' },
      { emoji: '🧥', word: 'coat', zh: '外套' },
      { emoji: '👟', word: 'shoes', zh: '鞋子' },
      { emoji: '🧦', word: 'socks', zh: '袜子' },
      { emoji: '🧢', word: 'cap', zh: '帽子' },
      { emoji: '🧣', word: 'scarf', zh: '围巾' },
      { emoji: '🧤', word: 'gloves', zh: '手套' },
      { emoji: '🩳', word: 'shorts', zh: '短裤' },
      { emoji: '🛌', word: 'pajamas', zh: '睡衣' },
      { emoji: '👜', word: 'bag', zh: '包' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '👦', text: 'I wear' },
          { emoji: '🔴', text: 'a red' },
          { emoji: '👕', text: 'shirt' },
        ],
        en: 'I wear a red shirt.',
        zh: '我穿一件红色的衬衫。',
      },
      {
        tokens: [
          { emoji: '👟', text: 'My shoes' },
          { emoji: '👉', text: 'are' },
          { emoji: '⚪', text: 'white' },
        ],
        en: 'My shoes are white.',
        zh: '我的鞋子是白色的。',
      },
      {
        tokens: [
          { emoji: '🧥', text: 'I wear' },
          { emoji: '🧥', text: 'a coat' },
        ],
        en: 'I wear a coat.',
        zh: '我穿着外套。',
      },
      {
        tokens: [
          { emoji: '🧦', text: 'Put on' },
          { emoji: '🧦', text: 'your socks' },
        ],
        en: 'Put on your socks.',
        zh: '穿上袜子。',
      },
      {
        tokens: [
          { emoji: '👗', text: 'I wear' },
          { emoji: '👗', text: 'a dress' },
        ],
        en: 'I wear a dress.',
        zh: '我穿连衣裙。',
      },
      {
        tokens: [
          { emoji: '👖', text: 'I wear' },
          { emoji: '👖', text: 'pants' },
        ],
        en: 'I wear pants.',
        zh: '我穿裤子。',
      },
      {
        tokens: [
          { emoji: '🧢', text: 'Put on' },
          { emoji: '🧢', text: 'your cap' },
        ],
        en: 'Put on your cap.',
        zh: '戴上帽子。',
      },
      {
        tokens: [
          { emoji: '🧣', text: 'I wear' },
          { emoji: '🧣', text: 'a scarf' },
        ],
        en: 'I wear a scarf.',
        zh: '我围围巾。',
      },
      {
        tokens: [
          { emoji: '🧤', text: 'Put on' },
          { emoji: '🧤', text: 'your gloves' },
        ],
        en: 'Put on your gloves.',
        zh: '戴上手套。',
      },
      {
        tokens: [
          { emoji: '🩳', text: 'I wear' },
          { emoji: '🩳', text: 'shorts' },
        ],
        en: 'I wear shorts.',
        zh: '我穿短裤。',
      },
      {
        tokens: [
          { emoji: '🛌', text: 'I wear' },
          { emoji: '🛌', text: 'pajamas' },
        ],
        en: 'I wear pajamas.',
        zh: '我穿睡衣。',
      },
      {
        tokens: [
          { emoji: '👜', text: 'This is' },
          { emoji: '👜', text: 'my bag' },
        ],
        en: 'This is my bag.',
        zh: '这是我的包。',
      },
    ],
  },

  {
    id: 'kids-shapes',
    tier: 'kids',
    theme: 'Shapes',
    themeZh: '形状',
    themeEmoji: '⭐',
    items: [
      { emoji: '⭕', word: 'circle', zh: '圆形' },
      { emoji: '⬜', word: 'square', zh: '正方形' },
      { emoji: '🔺', word: 'triangle', zh: '三角形' },
      { emoji: '▭', word: 'rectangle', zh: '长方形' },
      { emoji: '⭐', word: 'star', zh: '星星' },
      { emoji: '❤️', word: 'heart', zh: '心形' },
      { emoji: '💎', word: 'diamond', zh: '菱形' },
      { emoji: '🥚', word: 'oval', zh: '椭圆形' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '⚽', text: 'The ball' },
          { emoji: '👉', text: 'is a' },
          { emoji: '⭕', text: 'circle' },
        ],
        en: 'The ball is a circle.',
        zh: '球是圆形的。',
      },
      {
        tokens: [
          { emoji: '⭐', text: 'I see' },
          { emoji: '⭐', text: 'a star' },
        ],
        en: 'I see a star.',
        zh: '我看见一颗星星。',
      },
      {
        tokens: [
          { emoji: '❤️', text: 'This is' },
          { emoji: '❤️', text: 'a heart' },
        ],
        en: 'This is a heart.',
        zh: '这是一颗心。',
      },
      {
        tokens: [
          { emoji: '⬜', text: 'This is' },
          { emoji: '⬜', text: 'a square' },
        ],
        en: 'This is a square.',
        zh: '这是正方形。',
      },
      {
        tokens: [
          { emoji: '🔺', text: 'This is' },
          { emoji: '🔺', text: 'a triangle' },
        ],
        en: 'This is a triangle.',
        zh: '这是三角形。',
      },
      {
        tokens: [
          { emoji: '▭', text: 'This is' },
          { emoji: '▭', text: 'a rectangle' },
        ],
        en: 'This is a rectangle.',
        zh: '这是长方形。',
      },
      {
        tokens: [
          { emoji: '💎', text: 'This is' },
          { emoji: '💎', text: 'a diamond' },
        ],
        en: 'This is a diamond.',
        zh: '这是菱形。',
      },
      {
        tokens: [
          { emoji: '🥚', text: 'This is' },
          { emoji: '🥚', text: 'an oval' },
        ],
        en: 'This is an oval.',
        zh: '这是椭圆形。',
      },
    ],
  },

  {
    id: 'kids-letters',
    tier: 'kids',
    theme: 'Letters',
    themeZh: '字母',
    themeEmoji: '🔤',
    items: [
      { emoji: 'A', word: 'A', zh: '字母 A' },
      { emoji: 'B', word: 'B', zh: '字母 B' },
      { emoji: 'C', word: 'C', zh: '字母 C' },
      { emoji: 'D', word: 'D', zh: '字母 D' },
      { emoji: 'E', word: 'E', zh: '字母 E' },
      { emoji: 'F', word: 'F', zh: '字母 F' },
      { emoji: 'G', word: 'G', zh: '字母 G' },
      { emoji: 'H', word: 'H', zh: '字母 H' },
      { emoji: 'I', word: 'I', zh: '字母 I' },
      { emoji: 'J', word: 'J', zh: '字母 J' },
      { emoji: 'K', word: 'K', zh: '字母 K' },
      { emoji: 'L', word: 'L', zh: '字母 L' },
      { emoji: 'M', word: 'M', zh: '字母 M' },
      { emoji: 'N', word: 'N', zh: '字母 N' },
      { emoji: 'O', word: 'O', zh: '字母 O' },
      { emoji: 'P', word: 'P', zh: '字母 P' },
      { emoji: 'Q', word: 'Q', zh: '字母 Q' },
      { emoji: 'R', word: 'R', zh: '字母 R' },
      { emoji: 'S', word: 'S', zh: '字母 S' },
      { emoji: 'T', word: 'T', zh: '字母 T' },
      { emoji: 'U', word: 'U', zh: '字母 U' },
      { emoji: 'V', word: 'V', zh: '字母 V' },
      { emoji: 'W', word: 'W', zh: '字母 W' },
      { emoji: 'X', word: 'X', zh: '字母 X' },
      { emoji: 'Y', word: 'Y', zh: '字母 Y' },
      { emoji: 'Z', word: 'Z', zh: '字母 Z' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: 'A', text: 'A' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🍎', text: 'apple' },
        ],
        en: 'A is for apple.',
        zh: 'A 是苹果的 A。',
      },
      {
        tokens: [
          { emoji: 'B', text: 'B' },
          { emoji: '👉', text: 'is for' },
          { emoji: '⚽', text: 'ball' },
        ],
        en: 'B is for ball.',
        zh: 'B 是球的 B。',
      },
      {
        tokens: [
          { emoji: 'C', text: 'C' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🐱', text: 'cat' },
        ],
        en: 'C is for cat.',
        zh: 'C 是猫的 C。',
      },
      {
        tokens: [
          { emoji: 'D', text: 'D' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🐶', text: 'dog' },
        ],
        en: 'D is for dog.',
        zh: 'D 是狗的 D。',
      },
      {
        tokens: [
          { emoji: 'E', text: 'E' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🥚', text: 'egg' },
        ],
        en: 'E is for egg.',
        zh: 'E 是鸡蛋的 E。',
      },
      {
        tokens: [
          { emoji: 'F', text: 'F' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🐟', text: 'fish' },
        ],
        en: 'F is for fish.',
        zh: 'F 是鱼的 F。',
      },
      {
        tokens: [
          { emoji: 'G', text: 'G' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🍇', text: 'grape' },
        ],
        en: 'G is for grape.',
        zh: 'G 是葡萄的 G。',
      },
      {
        tokens: [
          { emoji: 'H', text: 'H' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🎩', text: 'hat' },
        ],
        en: 'H is for hat.',
        zh: 'H 是帽子的 H。',
      },
      {
        tokens: [
          { emoji: 'I', text: 'I' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🍦', text: 'ice cream' },
        ],
        en: 'I is for ice cream.',
        zh: 'I 是冰淇淋的 I。',
      },
      {
        tokens: [
          { emoji: 'J', text: 'J' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🧃', text: 'juice' },
        ],
        en: 'J is for juice.',
        zh: 'J 是果汁的 J。',
      },
      {
        tokens: [
          { emoji: 'K', text: 'K' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🪁', text: 'kite' },
        ],
        en: 'K is for kite.',
        zh: 'K 是风筝的 K。',
      },
      {
        tokens: [
          { emoji: 'L', text: 'L' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🍋', text: 'lemon' },
        ],
        en: 'L is for lemon.',
        zh: 'L 是柠檬的 L。',
      },
      {
        tokens: [
          { emoji: 'M', text: 'M' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🌙', text: 'moon' },
        ],
        en: 'M is for moon.',
        zh: 'M 是月亮的 M。',
      },
      {
        tokens: [
          { emoji: 'S', text: 'S' },
          { emoji: '👉', text: 'is for' },
          { emoji: '☀️', text: 'sun' },
        ],
        en: 'S is for sun.',
        zh: 'S 是太阳的 S。',
      },
      {
        tokens: [
          { emoji: 'T', text: 'T' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🌳', text: 'tree' },
        ],
        en: 'T is for tree.',
        zh: 'T 是树的 T。',
      },
      {
        tokens: [
          { emoji: 'N', text: 'N' },
          { emoji: '👉', text: 'is for' },
          { emoji: '👃', text: 'nose' },
        ],
        en: 'N is for nose.',
        zh: 'N 是鼻子的 N。',
      },
      {
        tokens: [
          { emoji: 'O', text: 'O' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🍊', text: 'orange' },
        ],
        en: 'O is for orange.',
        zh: 'O 是橙子的 O。',
      },
      {
        tokens: [
          { emoji: 'P', text: 'P' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🐷', text: 'pig' },
        ],
        en: 'P is for pig.',
        zh: 'P 是猪的 P。',
      },
      {
        tokens: [
          { emoji: 'Q', text: 'Q' },
          { emoji: '👉', text: 'is for' },
          { emoji: '👑', text: 'queen' },
        ],
        en: 'Q is for queen.',
        zh: 'Q 是女王的 Q。',
      },
      {
        tokens: [
          { emoji: 'R', text: 'R' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🐰', text: 'rabbit' },
        ],
        en: 'R is for rabbit.',
        zh: 'R 是兔子的 R。',
      },
      {
        tokens: [
          { emoji: 'U', text: 'U' },
          { emoji: '👉', text: 'is for' },
          { emoji: '☂️', text: 'umbrella' },
        ],
        en: 'U is for umbrella.',
        zh: 'U 是雨伞的 U。',
      },
      {
        tokens: [
          { emoji: 'V', text: 'V' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🚐', text: 'van' },
        ],
        en: 'V is for van.',
        zh: 'V 是面包车的 V。',
      },
      {
        tokens: [
          { emoji: 'W', text: 'W' },
          { emoji: '👉', text: 'is for' },
          { emoji: '💧', text: 'water' },
        ],
        en: 'W is for water.',
        zh: 'W 是水的 W。',
      },
      {
        tokens: [
          { emoji: 'X', text: 'X' },
          { emoji: '👉', text: 'is for' },
          { emoji: '📦', text: 'box' },
        ],
        en: 'X is in box.',
        zh: 'X 在 box 里。',
      },
      {
        tokens: [
          { emoji: 'Y', text: 'Y' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🟡', text: 'yellow' },
        ],
        en: 'Y is for yellow.',
        zh: 'Y 是黄色的 Y。',
      },
      {
        tokens: [
          { emoji: 'Z', text: 'Z' },
          { emoji: '👉', text: 'is for' },
          { emoji: '🦁', text: 'zoo' },
        ],
        en: 'Z is for zoo.',
        zh: 'Z 是动物园的 Z。',
      },
    ],
  },

  {
    id: 'kids-greetings',
    tier: 'kids',
    theme: 'Greetings',
    themeZh: '问候语',
    themeEmoji: '👋',
    items: [
      { emoji: '👋', word: 'hello', zh: '你好' },
      { emoji: '🙋', word: 'hi', zh: '嗨' },
      { emoji: '🌅', word: 'good morning', zh: '早上好' },
      { emoji: '🌙', word: 'good night', zh: '晚安' },
      { emoji: '🚪', word: 'bye', zh: '再见' },
      { emoji: '🙏', word: 'thanks', zh: '谢谢' },
      { emoji: '🥺', word: 'please', zh: '请' },
      { emoji: '😔', word: 'sorry', zh: '对不起' },
      { emoji: '👍', word: 'yes', zh: '是' },
      { emoji: '👎', word: 'no', zh: '不是' },
    ],
    scenes: [
      {
        tokens: [
          { emoji: '👋', text: 'Hello' },
          { emoji: '🧒', text: 'my friend' },
        ],
        en: 'Hello, my friend!',
        zh: '你好，我的朋友！',
      },
      {
        tokens: [
          { emoji: '🙏', text: 'Thank you' },
          { emoji: '🙏', text: 'very much' },
        ],
        en: 'Thank you very much.',
        zh: '非常感谢你。',
      },
      {
        tokens: [
          { emoji: '👋', text: 'Bye bye' },
          { emoji: '📅', text: 'see you tomorrow' },
        ],
        en: 'Bye bye, see you tomorrow.',
        zh: '再见，明天见。',
      },
      {
        tokens: [
          { emoji: '🌅', text: 'Good morning' },
          { emoji: '👩', text: 'Mom' },
        ],
        en: 'Good morning, Mom.',
        zh: '妈妈，早上好。',
      },
      {
        tokens: [
          { emoji: '🙋', text: 'Hi' },
          { emoji: '👨', text: 'Dad' },
        ],
        en: 'Hi, Dad.',
        zh: '嗨，爸爸。',
      },
      {
        tokens: [
          { emoji: '🌙', text: 'Good night' },
          { emoji: '👩', text: 'Mom' },
        ],
        en: 'Good night, Mom.',
        zh: '妈妈，晚安。',
      },
      {
        tokens: [
          { emoji: '🥺', text: 'Please' },
          { emoji: '🪑', text: 'sit down' },
        ],
        en: 'Please sit down.',
        zh: '请坐下。',
      },
      {
        tokens: [
          { emoji: '😔', text: 'I am' },
          { emoji: '😔', text: 'sorry' },
        ],
        en: 'I am sorry.',
        zh: '对不起。',
      },
      {
        tokens: [
          { emoji: '👍', text: 'Yes' },
          { emoji: '👍', text: 'I can' },
        ],
        en: 'Yes, I can.',
        zh: '是的，我可以。',
      },
      {
        tokens: [
          { emoji: '👎', text: 'No' },
          { emoji: '🙏', text: 'thank you' },
        ],
        en: 'No, thank you.',
        zh: '不用了，谢谢。',
      },
    ],
  },
];
