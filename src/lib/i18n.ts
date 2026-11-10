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
  rewardTitle: '打卡学习送会员天数',
  rewardBody: '1. 新人挑战（每账号限 1 次）：注册后 30 天内累计完成 25 天有效打卡，送 30 天会员；练免费试学内容也算。\n2. 会员月度奖：付费会员每个付费会员月（按订阅周期起算）有效打卡满 25 天，送 7 天会员。送出的天数不算付费月，不会再产生奖励；到期不续费，最后一个达标月发放后即结束。\n3. 邀请好友：好友注册后 7 天内填写你的邀请码，付费满 7 天后送你 15 天会员，每年最多 12 次，只奖励直接邀请的好友。\n4. 奖励天数自动到账；有付费会员时排在付费到期之后，剩余天数自动顺延。订阅照常扣费，奖励不取消自动续费。\n5. 每日有效打卡标准：每天完成至少 3 次真实麦克风录音，且通过人声有效性检测（挂机不算）。',
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
  rewardTitle: 'Điểm danh học tập nhận ngày hội viên',
  rewardBody: '1. Thử thách người mới (mỗi tài khoản 1 lần): trong 30 ngày đầu sau khi đăng ký, điểm danh đủ 25 ngày, tặng 30 ngày hội viên; luyện nội dung học thử miễn phí cũng được tính.\n2. Thưởng tháng hội viên: hội viên trả phí, mỗi tháng đã trả phí (tính theo chu kỳ đăng ký) điểm danh đủ 25 ngày, tặng 7 ngày hội viên. Ngày được tặng không tính là tháng trả phí; nếu hết hạn không gia hạn, thưởng kết thúc sau tháng đạt cuối cùng.\n3. Mời bạn bè: bạn bè nhập mã mời của bạn trong 7 ngày sau khi đăng ký và trả phí đủ 7 ngày, bạn được tặng 15 ngày hội viên; tối đa 12 lần mỗi năm, chỉ tính bạn mời trực tiếp.\n4. Ngày thưởng tự động cộng; nếu đang có hội viên trả phí sẽ nối tiếp sau ngày hết hạn. Gia hạn vẫn tính phí, thưởng không hủy tự động gia hạn.\n5. Tiêu chuẩn hợp lệ: mỗi ngày ghi âm thật ít nhất 3 lần và đạt kiểm tra giọng nói (treo máy không tính).',
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
  rewardTitle: '学習チェックインで会員日数をプレゼント',
  rewardBody: '1. 新規チャレンジ（1アカウント1回）：登録後30日以内に25日チェックインで会員30日分をプレゼント。無料体験の内容での練習も対象です。\n2. 会員月間特典：有料会員が各有料会員月（契約周期起点）に25日チェックインで会員7日分。プレゼント日数は有料月に含まれません。更新しない場合、最後の達成月の特典で終了します。\n3. 友だち招待：友だちが登録後7日以内にあなたの招待コードを入力し、7日間有料利用すると会員15日分。年12回まで、直接招待のみ対象。\n4. 特典は自動で反映され、有料会員期間中は期間終了後に続けて適用されます。自動課金は通常どおりで、特典で継続課金は解除されません。\n5. 有効基準：1日3回以上の実際の発声録音と音声有効チェック（放置は無効）。',
  buy: '支払いへ',
  testNote: 'SayUp iOSアプリで登録し、同じアカウントでログインすると同期されます。',
  close: '閉じる',
};

export const DICT: Record<Lang, Dict> = { zh, vi, ja };
