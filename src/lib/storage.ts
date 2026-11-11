export interface LocalMistakeItem {
  id: string;
  target: string;
  heard: string;
  score: number;
  main_issue: string | null;
  at: string;
}

const ADULT_KNOWN_KEY = 'sayup-known-words-adult-v1';
const KIDS_KNOWN_KEY = 'sayup-known-words-kids-v1';
const GUEST_MISTAKES_KEY = 'sayup-guest-mistakes-v1';
const LOCAL_RECORDS_KEY = 'sayup-local-records-v1';

/**
 * 读取已掌握单词列表
 */
export function loadKnownWords(kids: boolean): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(kids ? KIDS_KNOWN_KEY : ADULT_KNOWN_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * 持久化已掌握单词列表
 */
export function saveKnownWords(kids: boolean, words: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(kids ? KIDS_KNOWN_KEY : ADULT_KNOWN_KEY, JSON.stringify([...new Set(words)]));
  } catch {
    // quota exceeded or private mode
  }
}

/**
 * 读取游客本地错题本
 */
export function loadGuestMistakes(): LocalMistakeItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(GUEST_MISTAKES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * 记录或更新游客错题（低于60分自动收录，达到60分以上自动移除）
 */
export function updateGuestMistake(target: string, score: number, heard: string, mainIssue: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    const list = loadGuestMistakes();
    const cleanTarget = target.trim();
    if (score >= 60) {
      // 达标过关：从错题本移除
      const filtered = list.filter(item => item.target.toLowerCase() !== cleanTarget.toLowerCase());
      localStorage.setItem(GUEST_MISTAKES_KEY, JSON.stringify(filtered));
    } else {
      // 未达标：新增或更新错题
      const filtered = list.filter(item => item.target.toLowerCase() !== cleanTarget.toLowerCase());
      filtered.unshift({
        id: `mistake-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        target: cleanTarget,
        heard,
        score,
        main_issue: mainIssue,
        at: new Date().toISOString(),
      });
      localStorage.setItem(GUEST_MISTAKES_KEY, JSON.stringify(filtered.slice(0, 50)));
    }
  } catch {
    // storage fallback
  }
}

/**
 * 缓存本地录音记录
 */
export function loadLocalRecords(): any[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_RECORDS_KEY);
    const parsed: any[] = raw ? JSON.parse(raw) : [];
    return parsed.map(r => ({
      ...r,
      at: r.at instanceof Date ? r.at : new Date(r.at ?? Date.now()),
      audioUrl: typeof r.audioUrl === 'string' && r.audioUrl.startsWith('blob:') ? '' : (r.audioUrl ?? ''),
    }));
  } catch {
    return [];
  }
}

export function saveLocalRecords(records: any[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(records.slice(0, 30)));
  } catch {
    // fallback
  }
}

/**
 * 基于真实练习时间戳计算真实连续天数与今日开口分钟数
 */
export function calculateRealStats(dates: (Date | string)[]): { streak: number; todayMinutes: number } {
  if (!dates || dates.length === 0) {
    return { streak: 1, todayMinutes: 0 };
  }

  const dayStrings = new Set<string>();
  let todayCount = 0;
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

  for (const d of dates) {
    const dateObj = typeof d === 'string' ? new Date(d) : d;
    if (isNaN(dateObj.getTime())) continue;
    const key = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
    dayStrings.add(key);
    if (key === todayKey) {
      todayCount++;
    }
  }

  // 连续天数计算：从今天向前追溯
  let streak = 0;
  let checkDate = new Date();
  while (true) {
    const key = `${checkDate.getFullYear()}-${checkDate.getMonth() + 1}-${checkDate.getDate()}`;
    if (dayStrings.has(key)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      // 如果今天还没练，但是昨天练了，streak 依然保持昨天的连续
      if (streak === 0) {
        checkDate.setDate(checkDate.getDate() - 1);
        const yKey = `${checkDate.getFullYear()}-${checkDate.getMonth() + 1}-${checkDate.getDate()}`;
        if (dayStrings.has(yKey)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
      }
      break;
    }
  }

  // 每次录音平均按 0.3 分钟估算累计开口时间（向上取整）
  const todayMinutes = Math.max(1, Math.ceil(todayCount * 0.4));

  return {
    streak: Math.max(1, streak),
    todayMinutes: todayCount > 0 ? todayMinutes : 0,
  };
}
