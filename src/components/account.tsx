import { tr, trn } from '@/lib/tr';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { LogOut, Sparkles, Trash2, X } from 'lucide-react';
import { deleteMyAccount } from '@/utils/account.functions';
import { isIosApp } from '@/lib/platform';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { VoicePicker } from '@/components/voice-picker';
import { InviteCard } from '@/components/invite-card';

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="member-backdrop" onClick={onClose}><section role="dialog" aria-modal="true" aria-label={title} className="member-sheet" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-3"><h2>{title}</h2><Button variant="ghost" size="icon" aria-label={tr("关闭")} onClick={onClose}><X /></Button></div>{children}</section></div>;
}

export function AuthDialog({ reason, initialMode = 'in', onClose }: { reason?: string; initialMode?: 'in' | 'up'; onClose: () => void }) {
  const [mode, setMode] = useState<'in' | 'up'>(initialMode);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMsg('');
    if (mode === 'in') {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) setMsg(error.message.includes('Invalid') ? tr("邮箱或密码不对，请再试一次。") : error.message.includes('confirmed') ? tr("邮箱还没确认，请先点开邮件里的确认链接。") : '登录失败：' + error.message);
      else onClose();
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password: pw, options: { emailRedirectTo: window.location.origin } });
      if (error) setMsg(error.message.includes('registered') ? tr("这个邮箱已经注册过，请直接登录。") : '注册失败：' + error.message);
      else if (!data.session) setMsg(tr("注册成功！我们给你发了一封确认邮件，点开里面的链接后回来登录。"));
      else onClose();
    }
    setBusy(false);
  }
  async function social(p: 'google' | 'apple') {
    const r = await lovable.auth.signInWithOAuth(p, { redirect_uri: window.location.origin });
    if (r.error) setMsg(p === 'apple' ? tr("Apple 登录失败，请稍后再试。") : tr("谷歌登录失败，请稍后再试。")); else if (!r.redirected) onClose();
  }
  return <Sheet title={mode === 'in' ? tr("登录学员账号") : tr("注册学员账号")} onClose={onClose}>
    <div className="grid grid-cols-2 gap-2 mb-3" role="group" aria-label={tr('登录 / 注册')}>
      <Button variant={mode === 'in' ? 'secondary' : 'outline'} aria-pressed={mode === 'in'} disabled={busy} onClick={() => { setMode('in'); setMsg(''); }}>{tr('登录')}</Button>
      <Button variant={mode === 'up' ? 'secondary' : 'outline'} aria-pressed={mode === 'up'} disabled={busy} onClick={() => { setMode('up'); setMsg(''); }}>{tr('注册')}</Button>
    </div>
    {reason && <p className="member-sub">{reason}</p>}
    <Button variant="outline" className="w-full h-11 mb-2" onClick={() => social('apple')}>{tr("通过 Apple 登录")}</Button>
    <Button variant="outline" className="w-full h-11" onClick={() => social('google')}>{tr("使用谷歌账号继续")}</Button>
    <p className="text-center text-xs text-muted-foreground my-3">{tr("或使用邮箱")}</p>
    <form className="aid-form" onSubmit={submit}>
      <label>{tr("邮箱")}<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>{tr("密码（至少 6 位）")}<input type="password" required minLength={6} value={pw} onChange={e => setPw(e.target.value)} /></label>
      <Button type="submit" className="w-full h-11" disabled={busy}>{busy ? tr("请稍候…") : mode === 'in' ? tr("登录") : tr("注册")}</Button>
    </form>
    {msg && <p className="member-note" role="status">{msg}</p>}
    <Button variant="link" className="w-full" onClick={() => { setMode(mode === 'in' ? 'up' : 'in'); setMsg(''); }}>{mode === 'in' ? tr("还没有账号？注册一个") : tr("已有账号？去登录")}</Button>
  </Sheet>;
}

type Rec = { id: string; target: string; score: number; main_issue: string | null; created_at: string };

export function AccountSheet({ user, onClose, onResults }: { user: User; onClose: () => void; onResults?: () => void }) {
  const [recs, setRecs] = useState<Rec[]>([]);
  const [weeks, setWeeks] = useState(0);
  const [gift, setGift] = useState(false);
  const [subs, setSubs] = useState<{ product_id: string; status: string; current_period_end: string | null; cancel_at_period_end: boolean | null }[]>([]);
  useEffect(() => {
    supabase.from('practice_records').select('id,target,score,main_issue,created_at').order('created_at', { ascending: false }).limit(20).then(r => setRecs(r.data ?? []));
    supabase.from('learning_progress').select('item_key', { count: 'exact', head: true }).like('item_key', 'course:%').then(r => setWeeks(r.count ?? 0));
    supabase.from('subscriptions').select('product_id,status,current_period_end,cancel_at_period_end').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).then(r => setSubs(r.data ?? []));
    supabase.from('reward_grants').select('ends_at').gt('ends_at', new Date().toISOString()).limit(1).then(r => setGift((r.data ?? []).length > 0));
  }, []);
  const member = subs[0] && ['active', 'trialing'].includes(subs[0].status) ? tr("付费会员") : gift ? tr("奖励会员") : tr("免费试学");
  return <Sheet title={tr("我的学员账号")} onClose={onClose}>
    <p className="member-sub">{trn(user.email)}</p>
    <VoicePicker />
    {onResults && <Button variant="outline" className="w-full my-3" onClick={onResults}>{tr('学习成果')}</Button>}
    <div className="member-box"><Sparkles size={18} className="text-primary" /><div><b>{tr("身份：")}{member}</b><p>{tr("12 周课程已完成")} {weeks} {tr("周 · 云端录音记录")} {trn(recs.length)} {tr("条")}</p></div></div>
    {subs[0] && ['active', 'trialing', 'past_due'].includes(subs[0].status) && (() => { const s0 = subs[0]!; const end = s0.current_period_end ? new Date(s0.current_period_end) : null; const soon = end && end.getTime() - Date.now() < 3 * 864e5; return <div className="member-box"><Sparkles size={18} className="text-primary" /><div>
      <b>{s0.cancel_at_period_end ? tr('已取消自动续费') : tr('自动续费已开启')}</b>
      {end && <p className={soon && !s0.cancel_at_period_end ? 'text-destructive font-semibold' : ''}>{s0.cancel_at_period_end ? tr('会员到期日：') : tr('下次扣费日期：')}{end.toLocaleDateString()}{soon && !s0.cancel_at_period_end ? ' · ' + tr('3 天内将自动扣费') : ''}</p>}
      <span className="text-xs text-muted-foreground block mt-1">{tr("如需管理或取消订阅，请在设备「系统设置 - 订阅」中管理。")}</span>
    </div></div>; })()}
    <InviteCard />
    <h3 className="font-semibold mt-3 mb-2 text-sm">{tr("最近的口语记录")}</h3>
    {recs.length === 0 ? <p className="text-xs text-muted-foreground">{tr("还没有录音记录，去跟读一句试试。")}</p> : <div className="record-list">{recs.map(r => <div className="record-item" key={r.id}><div className="flex items-center justify-between gap-2"><b className="truncate">{trn(r.target)}</b><span className="record-score">{trn(r.score)}</span></div>{r.main_issue && <p className="record-fix">{tr("待纠正：")}{trn(r.main_issue)}</p>}<span className="text-[10px] text-muted-foreground">{new Date(r.created_at).toLocaleString('zh-CN')}</span></div>)}</div>}
    <a href="/legal" className="block text-center text-xs text-muted-foreground underline mt-3">{tr("隐私政策与服务条款")}</a><Button variant="outline" className="w-full mt-4" onClick={async () => { await supabase.auth.signOut(); onClose(); }}><LogOut size={15} /> {tr("退出登录")}</Button>
    <DeleteAccount onDone={onClose} />
  </Sheet>;
}

function DeleteAccount({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [msg, setMsg] = useState('');
  async function go() {
    setStep(2); setMsg('');
    try {
      const r = await deleteMyAccount();
      if (!r.ok) { setStep(1); setMsg(tr('请先取消自动续费，再注销账号，以免注销后继续扣费。')); return; }
      await supabase.auth.signOut(); localStorage.clear(); onDone(); alert(tr('账号和学习记录已全部删除。'));
    } catch { setStep(1); setMsg(tr('注销失败，请稍后再试。')); }
  }
  if (step === 0) return <Button variant="ghost" className="w-full mt-2 text-destructive" onClick={() => setStep(1)}><Trash2 size={15} /> {tr('注销账号')}</Button>;
  return <div className="member-box mt-2"><Trash2 size={18} /><div>
    <b>{tr('确定永久注销账号？')}</b>
    <p>{tr('将立即删除账号、录音评分记录、学习进度、词汇复习和打卡记录，无法恢复。')}</p>
    {msg && <p className="text-destructive" role="status">{msg}</p>}
    <div className="flex gap-2 mt-2"><Button size="sm" variant="destructive" disabled={step === 2} onClick={go}>{step === 2 ? tr('请稍候…') : tr('永久注销')}</Button><Button size="sm" variant="outline" disabled={step === 2} onClick={() => { setStep(0); setMsg(''); }}>{tr('取消')}</Button></div>
  </div></div>;
}
