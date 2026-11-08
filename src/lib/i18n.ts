// 母语包：界面外壳与指导文字跟随学员母语，要学的英语内容保持不变。
export type Lang = 'zh' | 'vi' | 'ja';
export const LANGS: { id: Lang; label: string }[] = [
  { id: 'zh', label: '中文' },
  { id: 'vi', label: 'Tiếng Việt' },
  { id: 'ja', label: '日本語' },
];

const zh = {
  tagline: '英语口语练习 · 智能纠正发音',
  tabs: { 对话: '对话', 角色: '角色', 学习: '学习', 词汇: '词汇', 加强: '加强' } as Record<string, string>,
  subscribe: '立即订阅',
  langLabel: '界面语言',
  planTitle: '会员方案',
  planSub: '前 2 周课程免费试学，满意再开通',
  plans: [
    { id: 'month', name: '月卡', price: '¥39', unit: '/ 月', note: '短期冲刺' },
    { id: 'quarter', name: '季卡', price: '¥99', unit: '/ 3 个月', note: '推荐 · 正好学完 12 周' },
    { id: 'year', name: '年卡', price: '¥299', unit: '/ 年', note: '全部课程 + 进阶板块' },
  ],
  perks: ['全部 12 周主线课程', 'AI 逐词纠音不限次数', '故事阅读与进阶听说读写全部开放'],
  rewardTitle: '打卡赠送留存福利：新人首月送 1 个月，会员满 3 个月送第 4 个月',
  rewardBody: '1. 新人首月挑战（每账号限 1 次）：注册后 30 天周期内累计完成 25 天有效打卡，达成后系统自动赠送 1 个月全量会员使用期。\n2. 会员坚持奖励（长线留存）：付费会员连续 3 个月、每个自然月有效打卡满 25 天，系统自动获赠第 4 个月会员。\n3. 每日有效打卡标准：每天完成至少 3 次真实麦克风录音，且通过人声有效性检测（挂机不算）。',
  buy: '去支付',
  testNote: '在 iPhone / iPad 的 SayUp App 内开通，登录同一账号即可多端同步。',
  close: '关闭',
};
type Dict = typeof zh;

const vi: Dict = {
  tagline: 'Luyện nói tiếng Anh · AI sửa phát âm',
  tabs: { 对话: 'Hội thoại', 角色: 'Nhập vai', 学习: 'Học', 词汇: 'Từ vựng', 加强: 'Củng cố' },
  subscribe: 'Đăng ký ngay',
  langLabel: 'Ngôn ngữ',
  planTitle: 'Gói hội viên',
  planSub: 'Học thử miễn phí 2 tuần đầu',
  plans: [
    { id: 'month', name: 'Gói tháng', price: '¥39', unit: '/ tháng', note: 'Học nước rút' },
    { id: 'quarter', name: 'Gói quý', price: '¥99', unit: '/ 3 tháng', note: 'Đề xuất · vừa đủ 12 tuần' },
    { id: 'year', name: 'Gói năm', price: '¥299', unit: '/ năm', note: 'Toàn bộ khóa học + nâng cao' },
  ],
  perks: ['Toàn bộ khóa học 12 tuần', 'AI sửa phát âm không giới hạn', 'Mở toàn bộ truyện đọc và phần nâng cao'],
  rewardTitle: 'Điểm danh tặng hội viên: người mới tặng 1 tháng, hội viên 3 tháng tặng tháng thứ 4',
  rewardBody: '1. Thử thách người mới: trong 30 ngày đầu điểm danh đủ 25 ngày, tặng 1 tháng hội viên (mỗi tài khoản 1 lần).\n2. Thưởng hội viên dài hạn: hội viên trả phí duy trì 25 ngày mỗi tháng trong 3 tháng liền, tặng tháng thứ 4.\n3. Tiêu chuẩn hợp lệ: mỗi ngày ghi âm luyện nói thật ít nhất 3 lần và đạt giọng nói hợp lệ.',
  buy: 'Thanh toán',
  testNote: 'Mở khóa trên ứng dụng SayUp iOS, đăng nhập cùng tài khoản để đồng bộ.',
  close: 'Đóng',
};

const ja: Dict = {
  tagline: '英会話練習 · AIが発音を添削',
  tabs: { 对话: '会話', 角色: 'ロール', 学习: '学習', 词汇: '単語', 加强: '強化' },
  subscribe: '今すぐ登録',
  langLabel: '表示言語',
  planTitle: 'メンバープラン',
  planSub: '最初の2週間は無料体験',
  plans: [
    { id: 'month', name: '月額', price: '¥39', unit: '/ 月', note: '短期集中' },
    { id: 'quarter', name: '3か月', price: '¥99', unit: '/ 3か月', note: 'おすすめ · 12週にぴったり' },
    { id: 'year', name: '年額', price: '¥299', unit: '/ 年', note: '全コース + 上級' },
  ],
  perks: ['12週メインコースすべて', 'AI発音添削が無制限', 'ストーリーと上級の聞く・話す・読む・書くを全開放'],
  rewardTitle: '継続ボーナス：新規は1か月、会員は3か月達成で4か月目無料',
  rewardBody: '1. 新規チャレンジ：登録後30日以内に25日チェックインで1か月会員をプレゼント（1アカウント1回）。\n2. 継続会員特典：有料会員が3か月連続で毎月25日チェックインすると4か月目無料。\n3. 有効基準：1日3回以上の実際の発声録音が必要です。',
  buy: '支払いへ',
  testNote: 'SayUp iOSアプリで登録し、同じアカウントでログインすると同期されます。',
  close: '閉じる',
};

export const DICT: Record<Lang, Dict> = { zh, vi, ja };
