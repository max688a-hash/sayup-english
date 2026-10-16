// @ts-nocheck
// 词汇图片映射 - emoji（保证形象、离线、跨平台）+ 可选高清照片增强
//
// 设计（2026-07 修订，operator 关注"图形单词是否形象"）：
//   - 每个词都带一个"形象"的 emoji：离线可用、永不失效、100% 对应词义
//   - 可选 url（Unsplash 高清照片）作为增强；加载失败/缺失时自动只显示 emoji
//   - 历史缺陷修复：pig 曾误用 cow 照片、panda 曾误用 frog 照片、star 曾误用 sun 照片
//     （三者 url 曾与 cow/frog/sun 完全相同）——现已置空 url，改用正确 emoji，杜绝错配

export const VOCAB_IMAGES = {
  // ========== 昆虫 Insects ==========
  'bee': {
    emoji: '🐝',
    url: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?w=800&q=80',
    credit: 'Unsplash - Dmitry Grigoriev',
    keywords: ['insect', 'yellow', 'flying'],
  },
  'butterfly': {
    emoji: '🦋',
    url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=80',
    credit: 'Unsplash - Boris Smokrovic',
    keywords: ['insect', 'colorful', 'wings'],
  },
  'spider': {
    emoji: '🕷️',
    url: 'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=800&q=80',
    credit: 'Unsplash - Krzysztof Niewolny',
    keywords: ['insect', 'web', 'eight legs'],
  },
  'fly': {
    emoji: '🪰',
    url: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=800&q=80',
    credit: 'Unsplash - Jimmy Chan',
    keywords: ['insect', 'wings', 'pest'],
  },
  'mosquito': {
    emoji: '🦟',
    url: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=800&q=80',
    credit: 'Unsplash - Syed Ali',
    keywords: ['insect', 'pest', 'bite'],
  },
  'ant': {
    emoji: '🐜',
    url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&q=80',
    credit: 'Unsplash - Vlad Tchompalov',
    keywords: ['insect', 'small', 'colony'],
  },

  // ========== 爬行/两栖动物 Reptiles & Amphibians ==========
  'snake': {
    emoji: '🐍',
    url: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=800&q=80',
    credit: 'Unsplash - David Clode',
    keywords: ['reptile', 'scales', 'slither'],
  },
  'frog': {
    emoji: '🐸',
    url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80',
    credit: 'Unsplash - Zdeněk Macháček',
    keywords: ['amphibian', 'green', 'jump'],
  },
  'turtle': {
    emoji: '🐢',
    url: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&q=80',
    credit: 'Unsplash - Wexor Tmg',
    keywords: ['reptile', 'shell', 'slow'],
  },

  // ========== 家畜 Farm Animals ==========
  'horse': {
    emoji: '🐴',
    url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80',
    credit: 'Unsplash - Helena Lopes',
    keywords: ['mammal', 'farm', 'ride'],
  },
  'cow': {
    emoji: '🐮',
    url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
    credit: 'Unsplash - Stijn te Strake',
    keywords: ['mammal', 'farm', 'milk'],
  },
  'pig': {
    emoji: '🐷',
    url: null, // 修复：原 url 与 cow 相同（误用牛照片）；改用正确 emoji
    credit: '',
    keywords: ['mammal', 'farm', 'pink'],
  },
  'sheep': {
    emoji: '🐑',
    url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80',
    credit: 'Unsplash - Zoe Schaeffer',
    keywords: ['mammal', 'farm', 'wool'],
  },
  'goat': {
    emoji: '🐐',
    url: 'https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=800&q=80',
    credit: 'Unsplash - Ricky Kharawala',
    keywords: ['mammal', 'farm', 'horns'],
  },
  'chicken': {
    emoji: '🐔',
    url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80',
    credit: 'Unsplash - Zoe Schaeffer',
    keywords: ['bird', 'farm', 'eggs'],
  },
  'duck': {
    emoji: '🦆',
    url: 'https://images.unsplash.com/photo-1619469994744-10e3488e86f7?w=800&q=80',
    credit: 'Unsplash - Rohit Tandon',
    keywords: ['bird', 'farm', 'water'],
  },

  // ========== 宠物 Pets ==========
  'dog': {
    emoji: '🐶',
    url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
    credit: 'Unsplash - Karsten Winegeart',
    keywords: ['mammal', 'pet', 'loyal'],
  },
  'cat': {
    emoji: '🐱',
    url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80',
    credit: 'Unsplash - Mikhail Vasilyev',
    keywords: ['mammal', 'pet', 'cute'],
  },
  'rabbit': {
    emoji: '🐰',
    url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80',
    credit: 'Unsplash - Satyabratasm',
    keywords: ['mammal', 'pet', 'ears'],
  },
  'mouse': {
    emoji: '🐭',
    url: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&q=80',
    credit: 'Unsplash - Ricky Kharawala',
    keywords: ['mammal', 'small', 'rodent'],
  },
  'rat': {
    emoji: '🐀',
    url: 'https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?w=800&q=80',
    credit: 'Unsplash - Ricky Kharawala',
    keywords: ['mammal', 'rodent', 'tail'],
  },

  // ========== 野生动物 Wild Animals ==========
  'lion': {
    emoji: '🦁',
    url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80',
    credit: 'Unsplash - Luke Tanis',
    keywords: ['mammal', 'wild', 'king'],
  },
  'tiger': {
    emoji: '🐯',
    url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&q=80',
    credit: 'Unsplash - Frida Bredesen',
    keywords: ['mammal', 'wild', 'stripes'],
  },
  'elephant': {
    emoji: '🐘',
    url: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80',
    credit: 'Unsplash - Geran de Klerk',
    keywords: ['mammal', 'wild', 'trunk'],
  },
  'monkey': {
    emoji: '🐵',
    url: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&q=80',
    credit: 'Unsplash - Jamie Haughton',
    keywords: ['mammal', 'wild', 'tree'],
  },
  'bear': {
    emoji: '🐻',
    url: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80',
    credit: 'Unsplash - Zdeněk Macháček',
    keywords: ['mammal', 'wild', 'strong'],
  },
  'panda': {
    emoji: '🐼',
    url: null, // 修复：原 url 与 frog 相同（误用青蛙照片）；改用正确 emoji
    credit: '',
    keywords: ['mammal', 'wild', 'bamboo'],
  },
  'wolf': {
    emoji: '🐺',
    url: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&q=80',
    credit: 'Unsplash - Grégoire Bertaud',
    keywords: ['mammal', 'wild', 'pack'],
  },
  'fox': {
    emoji: '🦊',
    url: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80',
    credit: 'Unsplash - Ray Hennessy',
    keywords: ['mammal', 'wild', 'clever'],
  },
  'deer': {
    emoji: '🦌',
    url: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&q=80',
    credit: 'Unsplash - Zdeněk Macháček',
    keywords: ['mammal', 'wild', 'antlers'],
  },
  'kangaroo': {
    emoji: '🦘',
    url: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
    credit: 'Unsplash - David Clode',
    keywords: ['mammal', 'wild', 'jump'],
  },
  'whale': {
    emoji: '🐳',
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    credit: 'Unsplash - Todd Cravens',
    keywords: ['mammal', 'ocean', 'large'],
  },

  // ========== 鸟类 Birds ==========
  'bird': {
    emoji: '🐦',
    url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&q=80',
    credit: 'Unsplash - Boris Smokrovic',
    keywords: ['bird', 'flying', 'feathers'],
  },
  'eagle': {
    emoji: '🦅',
    url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800&q=80',
    credit: 'Unsplash - Richard Lee',
    keywords: ['bird', 'wild', 'powerful'],
  },
  'owl': {
    emoji: '🦉',
    url: 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=800&q=80',
    credit: 'Unsplash - Zdeněk Macháček',
    keywords: ['bird', 'wild', 'night'],
  },

  // ========== 水生动物 Aquatic ==========
  'fish': {
    emoji: '🐟',
    url: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&q=80',
    credit: 'Unsplash - Hiroko Yoshii',
    keywords: ['fish', 'water', 'swim'],
  },

  // ========== 食物 Food (具象) ==========
  'apple': {
    emoji: '🍎',
    url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80',
    credit: 'Unsplash - Priscilla Du Preez',
    keywords: ['fruit', 'red', 'healthy'],
  },
  'banana': {
    emoji: '🍌',
    url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80',
    credit: 'Unsplash - Eiliv-Sonas Aceron',
    keywords: ['fruit', 'yellow', 'tropical'],
  },
  'orange': {
    emoji: '🍊',
    url: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80',
    credit: 'Unsplash - Vino Li',
    keywords: ['fruit', 'orange', 'citrus'],
  },
  'strawberry': {
    emoji: '🍓',
    url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80',
    credit: 'Unsplash - Allec Gomes',
    keywords: ['fruit', 'red', 'sweet'],
  },
  'watermelon': {
    emoji: '🍉',
    url: 'https://images.unsplash.com/photo-1630081015918-8a21078e5cee?w=800&q=80',
    credit: 'Unsplash - No Revisions',
    keywords: ['fruit', 'green', 'summer'],
  },
  'tomato': {
    emoji: '🍅',
    url: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800&q=80',
    credit: 'Unsplash - Elaine Casap',
    keywords: ['vegetable', 'red', 'fresh'],
  },
  'carrot': {
    emoji: '🥕',
    url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80',
    credit: 'Unsplash - Harshal S. Hirve',
    keywords: ['vegetable', 'orange', 'healthy'],
  },
  'potato': {
    emoji: '🥔',
    url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',
    credit: 'Unsplash - Lars Blankers',
    keywords: ['vegetable', 'brown', 'staple'],
  },

  // ========== 交通工具 Transportation ==========
  'car': {
    emoji: '🚗',
    url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
    credit: 'Unsplash - Grahame Jenkins',
    keywords: ['vehicle', 'transport', 'road'],
  },
  'bus': {
    emoji: '🚌',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    credit: 'Unsplash - Nabeel Syed',
    keywords: ['vehicle', 'transport', 'public'],
  },
  'train': {
    emoji: '🚆',
    url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80',
    credit: 'Unsplash - Sandro Katalina',
    keywords: ['vehicle', 'transport', 'rail'],
  },
  'plane': {
    emoji: '✈️',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    credit: 'Unsplash - Ross Parmly',
    keywords: ['vehicle', 'transport', 'fly'],
  },
  'bicycle': {
    emoji: '🚲',
    url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80',
    credit: 'Unsplash - Murillo de Paula',
    keywords: ['vehicle', 'transport', 'pedal'],
  },

  // ========== 自然 Nature ==========
  'tree': {
    emoji: '🌳',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    credit: 'Unsplash - Casey Horner',
    keywords: ['nature', 'green', 'forest'],
  },
  'flower': {
    emoji: '🌸',
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
    credit: 'Unsplash - Sergey Shmidt',
    keywords: ['nature', 'colorful', 'beautiful'],
  },
  'mountain': {
    emoji: '⛰️',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    credit: 'Unsplash - Simon Berger',
    keywords: ['nature', 'landscape', 'high'],
  },
  'ocean': {
    emoji: '🌊',
    url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80',
    credit: 'Unsplash - Silas Baisch',
    keywords: ['nature', 'water', 'blue'],
  },
  'sun': {
    emoji: '☀️',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    credit: 'Unsplash - Dawid Zawiła',
    keywords: ['nature', 'sky', 'bright'],
  },
  'moon': {
    emoji: '🌙',
    url: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=800&q=80',
    credit: 'Unsplash - Ganapathy Kumar',
    keywords: ['nature', 'sky', 'night'],
  },
  'star': {
    emoji: '⭐',
    url: null, // 修复：原 url 与 sun 相同（误用太阳照片）；改用正确 emoji
    credit: '',
    keywords: ['nature', 'sky', 'night'],
  },
  'cloud': {
    emoji: '☁️',
    url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80',
    credit: 'Unsplash - Zbynek Burival',
    keywords: ['nature', 'sky', 'white'],
  },
  'rain': {
    emoji: '🌧️',
    url: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=800&q=80',
    credit: 'Unsplash - Valentin Müller',
    keywords: ['nature', 'weather', 'water'],
  },
  'snow': {
    emoji: '❄️',
    url: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80',
    credit: 'Unsplash - Aaron Burden',
    keywords: ['nature', 'weather', 'white'],
  },
};

// 工具函数：获取图片信息（含 emoji + 可选 url）
export function getImage(word) {
  return VOCAB_IMAGES[word.toLowerCase()] || null;
}

// 工具函数：获取形象 emoji（离线保证）
export function getEmoji(word) {
  const info = VOCAB_IMAGES[word.toLowerCase()];
  return info ? info.emoji : null;
}

// 工具函数：检查是否有图片
export function hasImage(word) {
  return word.toLowerCase() in VOCAB_IMAGES;
}

// 工具函数：获取所有有图片的词
export function getImagedWords() {
  return Object.keys(VOCAB_IMAGES);
}

// 工具函数：按类别获取图片词汇
export function getImagesByCategory(category) {
  const categories = {
    animals: ['bee', 'butterfly', 'spider', 'fly', 'mosquito', 'ant', 'snake', 'frog', 'turtle', 
              'horse', 'cow', 'pig', 'sheep', 'goat', 'chicken', 'duck', 'dog', 'cat', 'rabbit', 
              'mouse', 'rat', 'lion', 'tiger', 'elephant', 'monkey', 'bear', 'panda', 'wolf', 
              'fox', 'deer', 'kangaroo', 'whale', 'bird', 'eagle', 'owl', 'fish'],
    food: ['apple', 'banana', 'orange', 'strawberry', 'watermelon', 'tomato', 'carrot', 'potato'],
    transport: ['car', 'bus', 'train', 'plane', 'bicycle'],
    nature: ['tree', 'flower', 'mountain', 'ocean', 'sun', 'moon', 'star', 'cloud', 'rain', 'snow'],
  };
  
  return categories[category] || [];
}
