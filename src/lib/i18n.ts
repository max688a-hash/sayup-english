// 母语包：界面外壳与指导文字跟随学员母语，要学的英语内容保持不变。
export type Lang = 'zh' | 'vi' | 'ja';
export const LANGS: { id: Lang; label: string }[] = [
  { id: 'zh', label: '中文' },
  { id: 'vi', label: 'Tiếng Việt' },
  { id: 'ja', label: '日本語' },
];

const zh = {
  tagline: '英语口语练习 · AI 纠正发音',
  tabs: { 对话: '对话', 角色: '角色', 学习: '学习', 词汇: '词汇', 加强: '加强' } as Record<string, string>,
  subscribe: '立即订阅',
  aidEntry: '学生助学申领',
  langLabel: '界面语言',
  planTitle: '会员方案',
  planSub: '前 2 周课程免费试学，满意再开通',
  plans: [
    { id: 'month', name: '月卡', price: '¥39', unit: '/ 月', note: '短期冲刺' },
    { id: 'quarter', name: '季卡', price: '¥99', unit: '/ 3 个月', note: '推荐 · 正好学完 12 周' },
    { id: 'year', name: '年卡', price: '¥299', unit: '/ 年', note: '全部课程 + 进阶板块' },
  ],
  perks: ['全部 12 周主线课程', 'AI 逐词纠音不限次数', '故事阅读与进阶听说读写全部开放'],
  rewardTitle: '自律奖励：打卡 25 天送 1 个月',
  rewardBody: '当月有 25 天完成真实开口练习（每天有效练习 15 分钟），下个月会员免费。允许请假 5 天。只算真开口，挂机不算。',
  aidTitle: '学生助学通道',
  aidBody: '贫困学生 / 贫困地区学生：凭证明全免；普通学生：凭学生证开通，每月坚持达标即续免。都需要每天坚持学习。',
  buy: '去支付',
  testNote: '当前为测试支付，不会真实扣款。',
  close: '关闭',
  aidFormTitle: '学生助学申领',
  aidType: '申请类型',
  aidPoor: '贫困学生 / 贫困地区学生（全免）',
  aidNormal: '普通在校学生（按月考核续免）',
  name: '真实姓名',
  school: '学校名称',
  region: '所在地区（省 / 市 / 县）',
  proof: '上传学生证或贫困证明（照片或 PDF）',
  submit: '提交申请',
  criteria: '哪些情况算“贫困”？',
  submitted: '申请已提交，等待人工审核。审核通过后自动开通学习名额。',
};
type Dict = typeof zh;

const vi: Dict = {
  tagline: 'Luyện nói tiếng Anh · AI sửa phát âm',
  tabs: { 对话: 'Hội thoại', 角色: 'Nhập vai', 学习: 'Học', 词汇: 'Từ vựng', 加强: 'Củng cố' },
  subscribe: 'Đăng ký ngay',
  aidEntry: 'Hỗ trợ học sinh',
  langLabel: 'Ngôn ngữ',
  planTitle: 'Gói hội viên',
  planSub: 'Học thử miễn phí 2 tuần đầu',
  plans: [
    { id: 'month', name: 'Gói tháng', price: '¥39', unit: '/ tháng', note: 'Học nước rút' },
    { id: 'quarter', name: 'Gói quý', price: '¥99', unit: '/ 3 tháng', note: 'Đề xuất · vừa đủ 12 tuần' },
    { id: 'year', name: 'Gói năm', price: '¥299', unit: '/ năm', note: 'Toàn bộ khóa học + nâng cao' },
  ],
  perks: ['Toàn bộ khóa học 12 tuần', 'AI sửa phát âm không giới hạn', 'Mở toàn bộ truyện đọc và phần nâng cao'],
  rewardTitle: 'Thưởng kỷ luật: 25 ngày tặng 1 tháng',
  rewardBody: 'Luyện nói thật 25 ngày trong tháng (15 phút mỗi ngày), tháng sau miễn phí. Được nghỉ 5 ngày.',
  aidTitle: 'Kênh hỗ trợ học sinh',
  aidBody: 'Học sinh nghèo / vùng khó khăn: miễn phí hoàn toàn. Học sinh thường: duy trì đủ chỉ tiêu mỗi tháng để tiếp tục miễn phí.',
  buy: 'Thanh toán',
  testNote: 'Đây là thanh toán thử, không bị trừ tiền thật.',
  close: 'Đóng',
  aidFormTitle: 'Đăng ký hỗ trợ học sinh',
  aidType: 'Loại hỗ trợ',
  aidPoor: 'Học sinh hộ nghèo / vùng khó khăn (miễn phí)',
  aidNormal: 'Học sinh thường (xét hằng tháng)',
  name: 'Họ và tên',
  school: 'Tên trường',
  region: 'Địa phương (tỉnh / huyện)',
  proof: 'Tải thẻ học sinh hoặc giấy chứng nhận hộ nghèo',
  submit: 'Gửi đơn',
  criteria: 'Thế nào là "khó khăn"?',
  submitted: 'Đã gửi đơn, đang chờ duyệt. Duyệt xong sẽ tự mở quyền học.',
};

const ja: Dict = {
  tagline: '英会話練習 · AIが発音を添削',
  tabs: { 对话: '会話', 角色: 'ロール', 学习: '学習', 词汇: '単語', 加强: '強化' },
  subscribe: '今すぐ登録',
  aidEntry: '学生支援の申請',
  langLabel: '表示言語',
  planTitle: 'メンバープラン',
  planSub: '最初の2週間は無料体験',
  plans: [
    { id: 'month', name: '月額', price: '¥39', unit: '/ 月', note: '短期集中' },
    { id: 'quarter', name: '3か月', price: '¥99', unit: '/ 3か月', note: 'おすすめ · 12週にぴったり' },
    { id: 'year', name: '年額', price: '¥299', unit: '/ 年', note: '全コース + 上級' },
  ],
  perks: ['12週メインコースすべて', 'AI発音添削が無制限', 'ストーリーと上級の聞く・話す・読む・書くを全開放'],
  rewardTitle: '継続ボーナス：25日で1か月無料',
  rewardBody: '月に25日、実際に声を出して練習（1日15分）すると翌月無料。5日まで休んでもOK。',
  aidTitle: '学生支援',
  aidBody: '経済的に困難な学生：証明書で全額免除。一般学生：学生証で登録し、毎月の達成で継続免除。',
  buy: '支払いへ',
  testNote: '現在はテスト決済で、実際には請求されません。',
  close: '閉じる',
  aidFormTitle: '学生支援の申請',
  aidType: '申請区分',
  aidPoor: '経済的に困難な学生（全額免除）',
  aidNormal: '一般の在学生（毎月審査で継続）',
  name: '氏名',
  school: '学校名',
  region: '地域（都道府県・市区町村）',
  proof: '学生証または証明書をアップロード',
  submit: '申請する',
  criteria: '「困難」の基準は？',
  submitted: '申請を受け付けました。審査後、自動で利用枠が開きます。',
};

export const DICT: Record<Lang, Dict> = { zh, vi, ja };

// 贫困认定标准：以各国官方认定为准，不靠我们自己划地区。
export const POVERTY_CRITERIA: Record<Lang, string[]> = {
  zh: [
    '原 832 个国家级贫困县（已脱贫县）及 160 个国家乡村振兴重点帮扶县的在读学生',
    '家庭为脱贫户 / 防止返贫监测户、低保户、特困供养户',
    '学校已认定的家庭经济困难学生（持资助认定材料、助学金名单）',
    '孤儿、残疾学生或残疾人家庭子女',
  ],
  vi: [
    'Học sinh thuộc hộ nghèo / cận nghèo (có giấy chứng nhận của xã)',
    'Học sinh ở huyện nghèo, xã đặc biệt khó khăn, vùng dân tộc thiểu số và miền núi',
    'Học sinh được trường xác nhận hoàn cảnh khó khăn',
  ],
  ja: [
    '就学援助・生活保護を受けている世帯の学生',
    '授業料減免・給付型奨学金の対象として学校が認定した学生',
    'ひとり親世帯・障害者手帳保有世帯など、公的証明がある場合',
  ],
};
