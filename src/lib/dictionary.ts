import { words, kidWords } from '@/lib/speaking-content';
import { getMainVocabWords, getKidsVocabWords } from '@/lib/main-vocab';
import { cleanWordToken } from '@/lib/word-token';
export { cleanWordToken } from '@/lib/word-token';

export type WordEntry = {
  word: string;
  baseWord?: string;
  phonetic: string;
  pos?: string;
  meaning: string;
  example?: string;
  level?: string;
};

// Built-in high-frequency vocabulary for conversation, life scenes, travel and food
const EXTENDED_DICT: Record<string, WordEntry> = {
  latte: { word: 'latte', phonetic: '/ˈlɑːteɪ/', pos: 'n.', meaning: '拿铁咖啡（浓缩咖啡加大量蒸奶）', example: "I'd like a latte, please.", level: 'A1' },
  iced: { word: 'iced', phonetic: '/aɪst/', pos: 'adj.', meaning: '加冰的；冰镇的', example: 'Would you like it hot or iced?', level: 'A1' },
  hot: { word: 'hot', phonetic: '/hɒt/', pos: 'adj.', meaning: '热的；辣的', example: 'I prefer hot coffee in the morning.', level: 'A1' },
  sure: { word: 'sure', phonetic: '/ʃʊə(r)/', pos: 'adv./adj.', meaning: '当然；毫无疑问；确定的', example: 'Sure! Right away.', level: 'A1' },
  get: { word: 'get', phonetic: '/ɡet/', pos: 'v.', meaning: '获得；点（餐）；取来', example: 'What can I get for you?', level: 'A1' },
  like: { word: 'like', phonetic: '/laɪk/', pos: 'v./prep.', meaning: '想要；喜欢；像', example: "I'd like a cup of tea.", level: 'A1' },
  would: { word: 'would', phonetic: '/wʊd/', pos: 'aux.', meaning: '想要（常用于礼貌请求 would like）', example: 'What would you like?', level: 'A1' },
  coffee: { word: 'coffee', phonetic: '/ˈkɒfi/', pos: 'n.', meaning: '咖啡', example: 'Do you want some coffee?', level: 'A1' },
  tea: { word: 'tea', phonetic: '/tiː/', pos: 'n.', meaning: '茶；红茶', example: 'A green tea, please.', level: 'A1' },
  water: { word: 'water', phonetic: '/ˈwɔːtə(r)/', pos: 'n.', meaning: '水', example: 'Just some tap water, please.', level: 'A1' },
  milk: { word: 'milk', phonetic: '/mɪlk/', pos: 'n.', meaning: '牛奶', example: 'Oat milk or whole milk?', level: 'A1' },
  sugar: { word: 'sugar', phonetic: '/ˈʃʊɡə(r)/', pos: 'n.', meaning: '糖', example: 'No sugar for me, thanks.', level: 'A1' },
  cup: { word: 'cup', phonetic: '/kʌp/', pos: 'n.', meaning: '杯子；一杯', example: 'A cup of black coffee.', level: 'A1' },
  size: { word: 'size', phonetic: '/saɪz/', pos: 'n.', meaning: '大小；分量；尺码', example: 'What size would you like?', level: 'A1' },
  small: { word: 'small', phonetic: '/smɔːl/', pos: 'adj.', meaning: '小份；小的', example: 'A small latte, please.', level: 'A1' },
  medium: { word: 'medium', phonetic: '/ˈmiːdiəm/', pos: 'adj.', meaning: '中份；中等的', example: 'Medium size is fine.', level: 'A1' },
  large: { word: 'large', phonetic: '/lɑːdʒ/', pos: 'adj.', meaning: '大份；大的', example: 'Make it a large, please.', level: 'A1' },
  order: { word: 'order', phonetic: '/ˈɔːdə(r)/', pos: 'v./n.', meaning: '点单；点餐；订单', example: 'Are you ready to order?', level: 'A1' },
  bill: { word: 'bill', phonetic: '/bɪl/', pos: 'n.', meaning: '账单；买单', example: 'Could we have the bill, please?', level: 'A1' },
  check: { word: 'check', phonetic: '/tʃek/', pos: 'n./v.', meaning: '买单；结账；检查', example: 'Check, please.', level: 'A1' },
  receipt: { word: 'receipt', phonetic: '/rɪˈsiːt/', pos: 'n.', meaning: '收据；小票', example: 'Do you need a receipt?', level: 'A2' },
  here: { word: 'here', phonetic: '/hɪə(r)/', pos: 'adv.', meaning: '这里；在堂食', example: 'For here or to go?', level: 'A1' },
  takeaway: { word: 'takeaway', phonetic: '/ˈteɪkəweɪ/', pos: 'n./adj.', meaning: '打包；外带', example: 'Takeaway, please.', level: 'A1' },
  reservation: { word: 'reservation', phonetic: '/ˌrezəˈveɪʃn/', pos: 'n.', meaning: '预订；预约', example: 'I have a reservation for two.', level: 'A2' },
  table: { word: 'table', phonetic: '/ˈteɪbl/', pos: 'n.', meaning: '桌子；餐位', example: 'A table for two, please.', level: 'A1' },
  menu: { word: 'menu', phonetic: '/ˈmenjuː/', pos: 'n.', meaning: '菜单', example: 'Can I see the menu?', level: 'A1' },
  recommend: { word: 'recommend', phonetic: '/ˌrekəˈmend/', pos: 'v.', meaning: '推荐', example: 'What do you recommend?', level: 'B1' },
  delicious: { word: 'delicious', phonetic: '/dɪˈlɪʃəs/', pos: 'adj.', meaning: '美味的；好吃的', example: 'It looks delicious!', level: 'A2' },
  help: { word: 'help', phonetic: '/help/', pos: 'v./n.', meaning: '帮助；协助', example: 'Can you help me?', level: 'A1' },
  thanks: { word: 'thanks', phonetic: '/θæŋks/', pos: 'int./n.', meaning: '谢谢', example: 'Thanks a lot!', level: 'A1' },
  thank: { word: 'thank', phonetic: '/θæŋk/', pos: 'v.', meaning: '感谢', example: 'Thank you very much.', level: 'A1' },
  welcome: { word: 'welcome', phonetic: '/ˈwelkəm/', pos: 'adj./int.', meaning: '受欢迎的；不客气', example: "You're welcome.", level: 'A1' },
  sorry: { word: 'sorry', phonetic: '/ˈsɒri/', pos: 'adj./int.', meaning: '抱歉；对不起', example: "I'm sorry about that.", level: 'A1' },
  excuse: { word: 'excuse', phonetic: '/ɪkˈskjuːz/', pos: 'v./n.', meaning: '原谅；打扰（Excuse me）', example: 'Excuse me, where is the station?', level: 'A1' },
  train: { word: 'train', phonetic: '/treɪn/', pos: 'n.', meaning: '火车；列车', example: 'When is the next train?', level: 'A1' },
  bus: { word: 'bus', phonetic: '/bʌs/', pos: 'n.', meaning: '公交车；巴士', example: 'Does this bus go to downtown?', level: 'A1' },
  airport: { word: 'airport', phonetic: '/ˈeəpɔːt/', pos: 'n.', meaning: '机场', example: 'Take me to the airport, please.', level: 'A1' },
  hotel: { word: 'hotel', phonetic: '/həʊˈtel/', pos: 'n.', meaning: '酒店；宾馆', example: 'Where is the hotel?', level: 'A1' },
  room: { word: 'room', phonetic: '/ruːm/', pos: 'n.', meaning: '房间；客房', example: 'I booked a double room.', level: 'A1' },
  flight: { word: 'flight', phonetic: '/flaɪt/', pos: 'n.', meaning: '航班；飞行', example: 'My flight is on time.', level: 'A2' },
  passport: { word: 'passport', phonetic: '/ˈpɑːspɔːt/', pos: 'n.', meaning: '护照', example: 'Please show your passport.', level: 'A2' },
  ticket: { word: 'ticket', phonetic: '/ˈtɪkɪt/', pos: 'n.', meaning: '票；入场券', example: 'One round-trip ticket, please.', level: 'A1' },
  pay: { word: 'pay', phonetic: '/peɪ/', pos: 'v.', meaning: '支付；付款', example: 'Can I pay by card?', level: 'A1' },
  card: { word: 'card', phonetic: '/kɑːd/', pos: 'n.', meaning: '信用卡；卡片', example: 'Credit or debit card?', level: 'A1' },
  cash: { word: 'cash', phonetic: '/kæʃ/', pos: 'n.', meaning: '现金', example: 'I only have cash.', level: 'A1' },
  price: { word: 'price', phonetic: '/praɪs/', pos: 'n.', meaning: '价格；价钱', example: 'What is the price?', level: 'A1' },
  cheap: { word: 'cheap', phonetic: '/tʃiːp/', pos: 'adj.', meaning: '便宜的；实惠的', example: 'Do you have a cheaper one?', level: 'A1' },
  expensive: { word: 'expensive', phonetic: '/ɪkˈspensɪv/', pos: 'adj.', meaning: '昂贵的；贵的', example: 'It is a bit expensive.', level: 'A2' },
  discount: { word: 'discount', phonetic: '/ˈdɪskaʊnt/', pos: 'n.', meaning: '折扣；优惠', example: 'Is there any discount?', level: 'A2' },
};

// Internal cache for words discovered or queried
const memoryCache = new Map<string, WordEntry>();

// Populate with full 3500+ main corpus words
for (const item of getMainVocabWords()) {
  const k = item.word.toLowerCase().trim();
  if (!memoryCache.has(k)) {
    memoryCache.set(k, {
      word: item.word,
      phonetic: item.phonetic,
      pos: 'n./adj./v.',
      meaning: item.meaning,
      example: item.example,
      level: item.level,
    });
  }
}

// Populate with 220+ kids corpus words
for (const item of getKidsVocabWords()) {
  const k = item.word.toLowerCase().trim();
  if (!memoryCache.has(k)) {
    memoryCache.set(k, {
      word: item.word,
      phonetic: item.phonetic,
      pos: 'n.',
      meaning: item.meaning,
      example: item.example,
      level: item.level,
    });
  }
}

// Populate with words from speaking-content
for (const item of [...words, ...kidWords]) {
  const k = item.word.toLowerCase().trim();
  memoryCache.set(k, {
    word: item.word,
    phonetic: item.phonetic,
    pos: 'n./adj./v.',
    meaning: item.meaning,
    example: item.example,
    level: item.level,
  });
}

// Populate extended dictionary
for (const [k, v] of Object.entries(EXTENDED_DICT)) {
  memoryCache.set(k.toLowerCase().trim(), v);
}

/**
 * Normalizes a token: strips punctuation, spaces, converts to lowercase.
 */

/**
 * Checks if a token represents an English word suitable for lookup.
 */
export function isEnglishWord(raw: string): boolean {
  const token = cleanWordToken(raw);
  return token.length > 0 && /^[a-z]+('[a-z]+)?$/i.test(token);
}

/**
 * Looks up word definition, phonetic, meaning and example.
 * Handles common plurals, -ed, -ing, and -s suffixes.
 */
export async function lookupWord(raw: string): Promise<WordEntry | null> {
  const token = cleanWordToken(raw);
  if (!token) return null;

  // Direct hit
  if (memoryCache.has(token)) {
    return memoryCache.get(token)!;
  }

  // Common suffix reductions (lemmatization)
  const candidates: string[] = [token];
  if (token.endsWith('s') && token.length > 3) candidates.push(token.slice(0, -1));
  if (token.endsWith('es') && token.length > 4) candidates.push(token.slice(0, -2));
  if (token.endsWith('ed') && token.length > 4) candidates.push(token.slice(0, -2), token.slice(0, -1));
  if (token.endsWith('ing') && token.length > 5) candidates.push(token.slice(0, -3), token.slice(0, -3) + 'e');

  for (const c of candidates) {
    if (memoryCache.has(c)) {
      const base = memoryCache.get(c)!;
      return { ...base, word: token, baseWord: base.word };
    }
  }

  // Fallback: try fetching from Free Dictionary API if online
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(token)}`);
    if (res.ok) {
      const data = await res.json();
      const first = data?.[0];
      if (first) {
        const phonetic = first.phonetic ?? first.phonetics?.find((p: { text?: string }) => p.text)?.text ?? `/${token}/`;
        const firstMeaning = first.meanings?.[0];
        const pos = firstMeaning?.partOfSpeech ? `${firstMeaning.partOfSpeech}.` : '';
        const def = firstMeaning?.definitions?.[0]?.definition ?? '';
        const ex = firstMeaning?.definitions?.[0]?.example ?? '';
        const entry: WordEntry = {
          word: token,
          phonetic,
          pos,
          meaning: def || '英文单词释义',
          example: ex,
          level: 'A2',
        };
        memoryCache.set(token, entry);
        return entry;
      }
    }
  } catch {
    // offline or network error, fallback to generic
  }

  // Minimal synthesized entry so user always gets pronunciation + phonetic
  const fallbackEntry: WordEntry = {
    word: token,
    phonetic: `/${token}/`,
    pos: '',
    meaning: '点击「朗读」听标准发音',
    example: '',
  };
  memoryCache.set(token, fallbackEntry);
  return fallbackEntry;
}

const STORAGE_SAVED_WORDS_KEY = 'sayup-user-saved-words';

export function getSavedWords(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_SAVED_WORDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWordToNotebook(word: string): boolean {
  try {
    const list = getSavedWords();
    const w = word.toLowerCase().trim();
    if (!list.includes(w)) {
      list.unshift(w);
      localStorage.setItem(STORAGE_SAVED_WORDS_KEY, JSON.stringify(list));
    }
    return true;
  } catch {
    return false;
  }
}

export function removeWordFromNotebook(word: string): boolean {
  try {
    const list = getSavedWords();
    const w = word.toLowerCase().trim();
    const filtered = list.filter((item) => item !== w);
    localStorage.setItem(STORAGE_SAVED_WORDS_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

export function isWordSaved(word: string): boolean {
  const list = getSavedWords();
  return list.includes(word.toLowerCase().trim());
}
