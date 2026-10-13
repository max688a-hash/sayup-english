import { useState } from 'react';
import { Check, Crown, Flame, GraduationCap, Sprout, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DICT, POVERTY_CRITERIA, type Lang } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';

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
    <Button className="w-full h-11" onClick={() => onBuy(pick)}><Crown size={16} /> {t.buy}</Button>
    <p className="member-note">{t.testNote}</p>
    <div className="member-box"><Flame size={18} /><div><b>{t.rewardTitle}</b><p>{t.rewardBody}</p></div></div>
    <div className="member-box"><GraduationCap size={18} /><div><b>{t.aidTitle}</b><p>{t.aidBody}</p><Button variant="link" className="px-0 h-auto" onClick={onAid}>{t.aidEntry} →</Button></div></div>
  </Sheet>;
}

export function AidDialog({ lang, userId, onClose }: { lang: Lang; userId: string; onClose: () => void }) {
  const t = DICT[lang];
  const [type, setType] = useState<'poor' | 'normal'>('poor');
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: '', school: '', region: '' });
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
    const { error } = await supabase.from('aid_applications').insert({ user_id: userId, aid_type: type, full_name: form.name.trim().slice(0, 80), school: form.school.trim().slice(0, 120), region: form.region.trim().slice(0, 120), proof_path: path });
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
      <label>{t.proof}<input type="file" accept="image/*,application/pdf" onChange={e => setFile(e.target.files?.[0] ?? null)} /></label>
      {err && <p className="member-note" role="alert">{err}</p>}
      <Button type="submit" className="w-full h-11" disabled={!ready}>{busy ? '提交中…' : t.submit}</Button>
    </form>
  </Sheet>;
}
