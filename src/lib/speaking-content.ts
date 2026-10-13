export type Tab = '对话' | '角色' | '学习' | '词汇' | '加强';
export type Scene = { id: string; title: string; english: string; category: string; icon: 'coffee' | 'plane' | 'briefcase' | 'shopping'; level: string; turns: string[]; replies: string[] };
export const scenes: Scene[] = [
  { id: 'cafe', title: '在咖啡店点单', english: 'A little coffee, a little chat', category: '日常生活', icon: 'coffee', level: 'A1', turns: ['Hi! What can I get for you?', 'Sure! Would you like it hot or iced?', 'Great. Anything else?'], replies: ["I'd like a latte, please.", 'Iced, please.', "That's all, thank you!"] },
  { id: 'travel', title: '机场轻松出发', english: 'Ready for your next adventure', category: '旅行出行', icon: 'plane', level: 'A2', turns: ['Hello! May I see your passport?', 'Do you have any bags to check?', 'Here is your boarding pass.'], replies: ['Here you are.', 'Yes, just one bag.', 'Thank you. Where is my gate?'] },
  { id: 'work', title: '认识新同事', english: 'Make a great first impression', category: '职场交流', icon: 'briefcase', level: 'A2', turns: ["Hi! I'm Alex. Nice to meet you.", 'Which team are you joining?', 'Welcome to the team!'], replies: ["I'm Sam. Nice to meet you too.", "I'm joining the design team.", "Thanks! I'm excited to be here."] },
  { id: 'shop', title: '逛逛周末市集', english: 'Find something you love', category: '日常生活', icon: 'shopping', level: 'A1', turns: ['Hello! Can I help you?', 'What size do you need?', 'Of course. Here you go!'], replies: ["I'm looking for a T-shirt.", 'A medium, please.', 'Thank you. Can I try it on?'] },
];
export const kidScene: Scene = { id: 'kids', title: '认识动物朋友', english: 'Hello, little friends!', category: '儿童课程', icon: 'coffee', level: '启蒙', turns: ['Hello! What animal do you like?', 'What color is the cat?', 'Can you say hello to the cat?'], replies: ['I like cats!', 'The cat is orange.', 'Hello, little cat!'] };
export const words = [
  { word: 'coffee', phonetic: '/ˈkɒfi/', meaning: '咖啡', example: "I'd like a coffee, please.", level: 'A1' },
  { word: 'please', phonetic: '/pliːz/', meaning: '请；劳驾', example: 'A latte, please.', level: 'A1' },
  { word: 'delicious', phonetic: '/dɪˈlɪʃəs/', meaning: '美味的', example: 'This coffee is delicious.', level: 'A2' },
  { word: 'recommend', phonetic: '/ˌrekəˈmend/', meaning: '推荐', example: 'What would you recommend?', level: 'B1' },
];
export const kidWords = [
  { word: 'cat', phonetic: '/kæt/', meaning: '小猫', example: 'I like the orange cat.', level: 'A1' },
  { word: 'apple', phonetic: '/ˈæpəl/', meaning: '苹果', example: 'This is a red apple.', level: 'A1' },
  { word: 'happy', phonetic: '/ˈhæpi/', meaning: '开心的', example: 'I am happy today.', level: 'A2' },
  { word: 'sunshine', phonetic: '/ˈsʌnʃaɪn/', meaning: '阳光', example: 'I love the sunshine.', level: 'B1' },
];