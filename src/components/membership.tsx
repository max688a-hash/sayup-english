import { useState } from 'react';
import { Check, Crown, Flame, GraduationCap, Sprout, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DICT, POVERTY_CRITERIA, type Lang } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';
import { VoicePicker } from '@/components/voice-picker';

function Sheet({ title, onClose, closeLabel, children }: { title: string; onClose: () => void; closeLabel: string; children: React.ReactNode }) {
  return <div className="member-backdrop" onClick={onClose}><section role="dialog" aria-modal="true" aria-label={title} className="member-sheet" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-3"><h2>{title}</h2><Button variant="ghost" size="icon" aria-label={closeLabel} onClick={onClose}><X /></Button></div>{children}</section></div>;
}

export function SubscribeDialog({ lang, onClose, onBuy, onAid }: { lang: Lang; onClose: () => void; onBuy: (planId: string) => void; onAid: () => void }) {
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
    <PartnerCode lang={lang} />
    <div className="member-box"><GraduationCap size={18} /><div><b>{t.aidTitle}</b><p>{t.aidBody}</p><Button variant="link" className="px-0 h-auto" onClick={onAid}>{t.aidEntry} →</Button></div></div>
  </Sheet>;
}

const EDU = {
  zh: { stuTitle: '学生五折（即将开放）', stuBody: '在校学生会员 ¥19/月（原价 ¥39）。付款通道尚未开通，开放后才可购买，现在不收任何费用。', codeTitle: '机构兑换码', codeBody: '合作学校或公益机构发放的一次性兑换码，输入后开通会员时长。声芽不收集贫困证明。', ph: '输入兑换码', go: '兑换', ok: '兑换成功，会员有效期至 ', login: '请先登录学员账号。', invalid_code: '兑换码无效。', code_used: '兑换码已被使用。', code_expired: '兑换码已过期。', too_frequent: '30 天内只能兑换一次。', fail: '兑换失败，请重试。' },
  vi: { stuTitle: 'Giảm 50% cho học sinh (sắp mở)', stuBody: 'Hội viên học sinh ¥19/tháng (giá gốc ¥39). Cổng thanh toán chưa mở, hiện không thu phí.', codeTitle: 'Mã đổi của tổ chức', codeBody: 'Mã dùng một lần do trường hoặc tổ chức từ thiện đối tác cấp. SayUp không thu giấy tờ hộ nghèo.', ph: 'Nhập mã đổi', go: 'Đổi', ok: 'Đổi thành công, hội viên đến ', login: 'Vui lòng đăng nhập trước.', invalid_code: 'Mã không hợp lệ.', code_used: 'Mã đã được sử dụng.', code_expired: 'Mã đã hết hạn.', too_frequent: 'Mỗi 30 ngày chỉ đổi được một lần.', fail: 'Đổi thất bại, vui lòng thử lại.' },
  ja: { stuTitle: '学生半額（近日公開）', stuBody: '在学生会員 ¥19/月（通常 ¥39）。決済はまだ開始しておらず、現在料金は発生しません。', codeTitle: '団体引き換えコード', codeBody: '提携校・公益団体が発行する1回限りのコードで会員期間を付与します。困窮証明は収集しません。', ph: 'コードを入力', go: '引き換え', ok: '引き換え完了。会員有効期限：', login: '先にログインしてください。', invalid_code: 'コードが無効です。', code_used: 'このコードは使用済みです。', code_expired: 'コードの有効期限切れです。', too_frequent: '30日に1回のみ引き換え可能です。', fail: '引き換えに失敗しました。' },
} as const;

function PartnerCode({ lang }: { lang: Lang }) {
  const e = EDU[lang];
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  async function redeem() {
    setBusy(true); setMsg('');
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) { setMsg(e.login); setBusy(false); return; }
    const { data, error } = await supabase.rpc('redeem_partner_code', { _code: code });
    setBusy(false);
    if (error) { const k = (['invalid_code', 'code_used', 'code_expired', 'too_frequent'] as const).find(x => error.message.includes(x)); setMsg(k ? e[k] : e.fail); return; }
    setMsg(e.ok + new Date(data as string).toLocaleDateString()); setCode('');
  }
  return <div className="member-box"><GraduationCap size={18} /><div className="flex-1"><b>{e.codeTitle}</b><p>{e.codeBody}</p>
    <div className="flex gap-2 mt-2"><input className="flex-1 rounded-md border border-border bg-background px-2 h-9" value={code} onChange={ev => setCode(ev.target.value)} placeholder={e.ph} maxLength={32} aria-label={e.ph} />
      <Button size="sm" disabled={!code.trim() || busy} onClick={() => void redeem()}>{e.go}</Button></div>
    {msg && <p className="member-note" role="status">{msg}</p>}</div></div>;
}

export function AidDialog({ lang, userId, onClose }: { lang: Lang; userId: string; onClose: () => void }) {
  const t = DICT[lang];
  const [type, setType] = useState<'poor' | 'normal'>('poor');
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: '', school: '', region: '', chsi: '' });
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [showCriteria, setShowCriteria] = useState(false);
  const ready = form.name.trim() && form.school.trim() && form.region.trim() && file && !busy;
  async function submit() {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setErr('文件太大，请上传 10MB 以内的照片或 PDF。'); return; }
    setBusy(true); setErr('');
    const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
    const path = `${userId}/${crypto.randomUUID()}.${ext}`;
    const up = await supabase.storage.from('aid-proofs').upload(path, file, { contentType: file.type });
    if (up.error) { setErr('证件上传失败，请重试。'); setBusy(false); return; }
    const { error } = await supabase.from('aid_applications').insert({ user_id: userId, aid_type: type, full_name: form.name.trim().slice(0, 80), school: form.school.trim().slice(0, 120), region: form.region.trim().slice(0, 120), proof_path: path, chsi_code: form.chsi.trim().slice(0, 40) || null });
    setBusy(false);
    if (error) setErr('提交失败，请重试。'); else setDone(true);
  }
  if (done) return <Sheet title={t.aidFormTitle} onClose={onClose} closeLabel={t.close}><div className="empty-state"><span className="empty-bubble"><Sprout size={26} /></span><p>{t.submitted}</p></div><Button className="w-full" onClick={onClose}>{t.close}</Button></Sheet>;
  return <Sheet title={t.aidFormTitle} onClose={onClose} closeLabel={t.close}>
    <form className="aid-form" onSubmit={e => { e.preventDefault(); if (ready) void submit(); }}>
      <fieldset><legend>{t.aidType}</legend>{(['poor', 'normal'] as const).map(v => <label key={v} className={cn('aid-option', type === v && 'active')}><input type="radio" name="aid" checked={type === v} onChange={() => setType(v)} />{v === 'poor' ? t.aidPoor : t.aidNormal}</label>)}</fieldset>
      {type === 'poor' && <><Button type="button" variant="link" className="px-0 h-auto" onClick={() => setShowCriteria(!showCriteria)}>{t.criteria}</Button>{showCriteria && <ul className="perk-list">{POVERTY_CRITERIA[lang].map(c => <li key={c}><Check size={14} />{c}</li>)}</ul>}</>}
      <label>{t.name}<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
      <label>{t.school}<input value={form.school} onChange={e => setForm({ ...form, school: e.target.value })} /></label>
      <label>{t.region}<input value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} /></label>
      <label>{t.chsi}<input value={form.chsi} onChange={e => setForm({ ...form, chsi: e.target.value })} placeholder="如：A1B2C3D4E5F6" /></label>
      <p className="member-note">{t.chsiHint}</p>
      <label>{t.proof}<input type="file" accept="image/*,application/pdf" onChange={e => setFile(e.target.files?.[0] ?? null)} /></label>
      <p className="member-note">证件仅用于核实身份，永不保存：审核员查看 5 秒后自动焚毁，审核结束也会立即删除。</p>
      {err && <p className="member-note" role="alert">{err}</p>}
      <Button type="submit" className="w-full h-11" disabled={!ready}>{busy ? '提交中…' : t.submit}</Button>
    </form>
  </Sheet>;
}
