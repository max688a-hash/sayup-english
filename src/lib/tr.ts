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
    '学习成果': 'Kết quả học tập',
    '每一次开口，都有记录': 'Mỗi lần luyện nói đều được ghi lại',
    '仅本人可见；分享前请勿展示账号信息。': 'Chỉ bạn xem được. Không chia sẻ thông tin tài khoản.',
    '登录后查看真实学习成果。': 'Đăng nhập để xem kết quả học tập thực tế.',
    '正在读取学习记录…': 'Đang tải kết quả học tập…',
    '学习成果暂时无法读取，请重试。': 'Chưa tải được kết quả. Vui lòng thử lại.',
    '近 30 天': '30 ngày gần đây',
    '刷新成果': 'Tải lại kết quả',
    '有效跟读次数': 'Số lần luyện nói được chấm điểm',
    '平均 AI 评分': 'Điểm AI trung bình',
    '打卡天数': 'Số ngày đạt mục tiêu',
    'AI 评分趋势': 'Xu hướng điểm AI',
    '还没有真实评分记录。': 'Chưa có bản ghi được chấm điểm.',
    '日均 AI 评分': 'Điểm AI trung bình mỗi ngày',
    '已打卡': 'Đã đạt mục tiêu',
    '查看每日数据': 'Xem số liệu từng ngày',
    '按日平均；题目难度不同，评分不等同于专业水平认证。': 'Điểm trung bình theo ngày. Độ khó khác nhau; đây không phải chứng nhận năng lực.',
    '跟读波形': 'Dạng sóng bản thu luyện nói',
    '本次打开后完成跟读，即可查看真实波形；历史录音不保留。': 'Luyện nói trong phiên này để xem dạng sóng thực tế. Không lưu bản thu cũ.',
    '波形仅在本次使用中显示，不上传、不长期保存。': 'Dạng sóng chỉ hiển thị trong phiên này, không tải lên hay lưu lâu dài.',
    '真实打卡': 'Ngày đạt mục tiêu thực tế',
    '还没有达标打卡日。': 'Chưa có ngày đạt mục tiêu.',
    '导出匿名成果': 'Xuất kết quả không kèm thông tin cá nhân',
    '仅导出日期、评分和次数，不含邮箱、昵称、句子或录音。': 'Chỉ xuất ngày, điểm và số lần; không có email, tên, câu nói hay bản thu.',
    '真实跟读波形 · AI 评分趋势 · 打卡天数': 'Dạng sóng thực tế · Xu hướng điểm AI · Ngày đạt mục tiêu',
    '声音选择已保存到账号。': 'Giọng đọc đã được lưu vào tài khoản.',
    '选择示范声音': 'Chọn giọng đọc mẫu', '经典女声': 'Giọng nữ quen thuộc', '帅气男生': 'Giọng nam ấm áp', '甜美女生': 'Giọng nữ dịu dàng',
    '12 周核心课程 · 美式英语': 'Khóa học chính 12 tuần · Tiếng Anh Mỹ', '试听': 'Nghe thử', '试听 {0}': 'Nghe thử giọng {0}',
    '免费学员使用 Ava；会员可选择 Andrew 和 Emma。': 'Học viên miễn phí dùng giọng Ava. Thành viên có thể chọn Andrew hoặc Emma.',
    '试听暂不可用，请稍后再试。': 'Chưa thể nghe thử. Bạn hãy thử lại sau nhé.', '未能保存声音选择，请重试。': 'Không lưu được giọng đã chọn. Bạn hãy thử lại nhé.',
  },
  ja: {
    '学习成果': '学習の記録',
    '每一次开口，都有记录': '一回ずつの練習を記録',
    '仅本人可见；分享前请勿展示账号信息。': '本人のみ閲覧できます。共有時はアカウント情報を見せないでください。',
    '登录后查看真实学习成果。': 'ログインして実際の学習記録を確認できます。',
    '正在读取学习记录…': '学習記録を読み込み中…',
    '学习成果暂时无法读取，请重试。': '学習記録を読み込めません。再試行してください。',
    '近 30 天': '直近30日',
    '刷新成果': '記録を更新',
    '有效跟读次数': '採点された練習回数',
    '平均 AI 评分': 'AI平均スコア',
    '打卡天数': '目標達成日数',
    'AI 评分趋势': 'AIスコアの推移',
    '还没有真实评分记录。': 'まだ採点記録がありません。',
    '日均 AI 评分': '日別AI平均スコア',
    '已打卡': '目標達成',
    '查看每日数据': '日別データを見る',
    '按日平均；题目难度不同，评分不等同于专业水平认证。': '日別の平均です。問題の難易度が異なるため、能力認定を示すものではありません。',
    '跟读波形': '録音の波形',
    '本次打开后完成跟读，即可查看真实波形；历史录音不保留。': '今回の利用中に録音すると波形が表示されます。過去の音声は保存していません。',
    '波形仅在本次使用中显示，不上传、不长期保存。': '波形は今回の利用中のみ表示され、送信・長期保存されません。',
    '真实打卡': '実際の目標達成日',
    '还没有达标打卡日。': 'まだ目標達成日はありません。',
    '导出匿名成果': '個人情報なしで記録を出力',
    '仅导出日期、评分和次数，不含邮箱、昵称、句子或录音。': '日付・スコア・回数のみ出力します。メール、名前、発話文、音声は含みません。',
    '真实跟读波形 · AI 评分趋势 · 打卡天数': '実際の波形 · AIスコアの推移 · 目標達成日数',
    '声音选择已保存到账号。': '声の設定をアカウントに保存しました。',
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
