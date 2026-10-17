import { useState } from 'react';
import { Check, Crown, Flame, GraduationCap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DICT, type Lang } from '@/lib/i18n';
import { VoicePicker } from '@/components/voice-picker';

function Sheet({ title, onClose, closeLabel, children }: { title: string; onClose: () => void; closeLabel: string; children: React.ReactNode }) {
  return <div className="member-backdrop" onClick={onClose}><section role="dialog" aria-modal="true" aria-label={title} className="member-sheet" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-3"><h2>{title}</h2><Button variant="ghost" size="icon" aria-label={closeLabel} onClick={onClose}><X /></Button></div>{children}</section></div>;
}

export function SubscribeDialog({ lang, onClose, onBuy }: { lang: Lang; onClose: () => void; onBuy: (planId: string) => void }) {
  const t = DICT[lang];
  const [pick, setPick] = useState('quarter');
  return <Sheet title={t.planTitle} onClose={onClose} closeLabel={t.close}>
    <p className="member-sub">{t.planSub}</p>
    <div className="plan-list" role="radiogroup">{t.plans.map(p => <Button key={p.id} variant="ghost" role="radio" aria-checked={pick === p.id} className={cn('plan-card', pick === p.id && 'active')} onClick={() => setPick(p.id)}><div className="text-left"><b>{p.name}</b><span>{p.note}</span></div><div className="plan-price">{p.price}<small>{p.unit}</small></div></Button>)}</div>
    <ul className="perk-list">{t.perks.map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>
    <VoicePicker />
    <Button className="w-full h-11" onClick={() => onBuy(pick)}><Crown size={16} /> {t.buy}</Button>
    <p className="member-note">{t.testNote}</p>
    <div className="member-box"><Flame size={18} /><div><b>{t.rewardTitle}</b><p>{t.rewardBody}</p></div></div>
    <div className="member-box"><GraduationCap size={18} /><div><b>{EDU[lang].stuTitle}</b><p>{EDU[lang].stuBody}</p></div></div>
  </Sheet>;
}

const EDU = {
  zh: { stuTitle: '学生五折（即将开放）', stuBody: '在校学生会员 ¥19/月（原价 ¥39）。付款通道尚未开通，开放后才可购买，现在不收任何费用。', codeTitle: '机构兑换码', codeBody: '合作学校或公益机构发放的一次性兑换码，输入后开通会员时长。声芽不收集贫困证明。', ph: '输入兑换码', go: '兑换', ok: '兑换成功，会员有效期至 ', login: '请先登录学员账号。', invalid_code: '兑换码无效。', code_used: '兑换码已被使用。', code_expired: '兑换码已过期。', too_frequent: '30 天内只能兑换一次。', fail: '兑换失败，请重试。' },
  vi: { stuTitle: 'Giảm 50% cho học sinh (sắp mở)', stuBody: 'Hội viên học sinh ¥19/tháng (giá gốc ¥39). Cổng thanh toán chưa mở, hiện không thu phí.', codeTitle: 'Mã đổi của tổ chức', codeBody: 'Mã dùng một lần do trường hoặc tổ chức từ thiện đối tác cấp. SayUp không thu giấy tờ hộ nghèo.', ph: 'Nhập mã đổi', go: 'Đổi', ok: 'Đổi thành công, hội viên đến ', login: 'Vui lòng đăng nhập trước.', invalid_code: 'Mã không hợp lệ.', code_used: 'Mã đã được sử dụng.', code_expired: 'Mã đã hết hạn.', too_frequent: 'Mỗi 30 ngày chỉ đổi được một lần.', fail: 'Đổi thất bại, vui lòng thử lại.' },
  ja: { stuTitle: '学生半額（近日公開）', stuBody: '在学生会員 ¥19/月（通常 ¥39）。決済はまだ開始しておらず、現在料金は発生しません。', codeTitle: '団体引き換えコード', codeBody: '提携校・公益団体が発行する1回限りのコードで会員期間を付与します。困窮証明は収集しません。', ph: 'コードを入力', go: '引き換え', ok: '引き換え完了。会員有効期限：', login: '先にログインしてください。', invalid_code: 'コードが無効です。', code_used: 'このコードは使用済みです。', code_expired: 'コードの有効期限切れです。', too_frequent: '30日に1回のみ引き換え可能です。', fail: '引き換えに失敗しました。' },
} as const;

