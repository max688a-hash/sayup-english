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
  rewardTitle: '打卡送积分：1 积分 = 1 天会员',
  rewardBody: '1. 新人挑战（每账号限 1 次）：注册后 30 天内累计完成 25 天有效打卡，送 30 积分。\n2. 会员坚持奖励（可重复获得）：付费会员每连续 3 个会员月、每月有效打卡满 25 天，送 30 积分；会员月按订阅周期起算，断订或退款重新累计。\n3. 积分兑换：30 积分兑换 30 天会员（1 积分 = 1 天）。有生效中的付费或奖励权益时不可兑换，到期后可兑；兑换期间重新付费，剩余天数自动顺延。订阅照常扣费，积分兑换不取消自动续费。\n4. 每日有效打卡标准：每天完成至少 3 次真实麦克风录音，且通过人声有效性检测（挂机不算）。',
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
  rewardTitle: 'Điểm danh nhận điểm: 1 điểm = 1 ngày hội viên',
  rewardBody: '1. Thử thách người mới (mỗi tài khoản 1 lần): trong 30 ngày đầu điểm danh đủ 25 ngày, tặng 30 điểm.\n2. Thưởng hội viên (nhận lại được): hội viên trả phí cứ mỗi 3 tháng hội viên liên tiếp đạt 25 ngày điểm danh/tháng, tặng 30 điểm; tháng hội viên tính theo chu kỳ đăng ký, gián đoạn hoặc hoàn tiền sẽ tính lại từ đầu.\n3. Đổi điểm: 30 điểm đổi 30 ngày hội viên (1 điểm = 1 ngày); khi còn quyền trả phí hoặc thưởng đang hiệu lực thì chưa đổi được, đổi sau khi hết hạn; nếu mua lại trong thời gian đã đổi, số ngày còn lại tự động dời lại. Gia hạn vẫn tính phí, đổi điểm không hủy tự động gia hạn.\n4. Tiêu chuẩn hợp lệ: mỗi ngày ghi âm thật ít nhất 3 lần và đạt kiểm tra giọng nói (treo máy không tính).',
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
  rewardTitle: 'チェックインでポイントGET：1ポイント = 会員1日分',
  rewardBody: '1. 新規チャレンジ（1アカウント1回）：登録後30日以内に25日チェックインで30ポイント付与。\n2. 継続会員特典（繰り返し可）：有料会員が連続3会員月（契約周期起点）各月25日チェックイン達成で30ポイント。中断・返金で再カウント。\n3. ポイント交換：30ポイントで会員30日分（1ポイント = 1日）。有効な有料・特典権利がある間は交換不可、失効後に交換可。交換期間中に再購入した場合、残日数は自動で後ろ倒し。自動課金は通常通りで、ポイント交換で継続課金は解除されません。\n4. 有効基準：1日3回以上の実際の発声録音と音声有効チェック（放置は無効）。',
  buy: '支払いへ',
  testNote: 'SayUp iOSアプリで登録し、同じアカウントでログインすると同期されます。',
  close: '閉じる',
};

export const DICT: Record<Lang, Dict> = { zh, vi, ja };
