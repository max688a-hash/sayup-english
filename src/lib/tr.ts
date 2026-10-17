import DICT from '@/lib/content-i18n.json';
import type { Lang } from '@/lib/i18n';

// Current learner language for content pages (course, stories, pronunciation coach).
// SpeakingApp sets it and remounts content on change; Chinese text is the lookup key.
let current: Lang = 'zh';
export function setContentLang(l: Lang) { current = l; }
export function getContentLang() { return current; }

const maps = DICT as unknown as Record<'vi' | 'ja', Record<string, string>>;
const voiceCopy: Record<'vi' | 'ja', Record<string, string>> = {
  vi: {
    '选择示范声音': 'Chọn giọng đọc mẫu', '经典女声': 'Giọng nữ quen thuộc', '帅气男生': 'Giọng nam ấm áp', '甜美女生': 'Giọng nữ dịu dàng',
    '12 周核心课程 · 美式英语': 'Khóa học chính 12 tuần · Tiếng Anh Mỹ', '试听': 'Nghe thử', '试听 {0}': 'Nghe thử giọng {0}',
    '免费学员使用 Ava；会员可选择 Andrew 和 Emma。': 'Học viên miễn phí dùng giọng Ava. Thành viên có thể chọn Andrew hoặc Emma.',
    '试听暂不可用，请稍后再试。': 'Chưa thể nghe thử. Bạn hãy thử lại sau nhé.', '未能保存声音选择，请重试。': 'Không lưu được giọng đã chọn. Bạn hãy thử lại nhé.',
  },
  ja: {
    '选择示范声音': 'お手本の声を選ぶ', '经典女声': '定番の女性ボイス', '帅气男生': '落ち着いた男性ボイス', '甜美女生': 'やさしい女性ボイス',
    '12 周核心课程 · 美式英语': '12週間のメインコース · アメリカ英語', '试听': '試聴', '试听 {0}': '{0}を試聴',
    '免费学员使用 Ava；会员可选择 Andrew 和 Emma。': '無料プランではAvaをご利用いただけます。会員はAndrewとEmmaも選べます。',
    '试听暂不可用，请稍后再试。': '現在試聴できません。しばらくしてからもう一度お試しください。', '未能保存声音选择，请重试。': '声の設定を保存できませんでした。もう一度お試しください。',
  },
};
export function tr(zh: string | null | undefined, ...args: unknown[]): string {
  if (zh == null) return '';
  const base = current === 'zh' ? zh : (voiceCopy[current]?.[zh] ?? maps[current]?.[zh] ?? zh);
  return args.length ? base.replace(/\{(\d+)\}/g, (_, i) => String(args[Number(i)] ?? '')) : base;
}
// Translate a value only when it is a string (data fields rendered in JSX).
export function trn<T>(v: T): T | string { return typeof v === 'string' ? tr(v) : v; }
