import { openBillingPortal } from '@/utils/portal.functions';
import { tr, trn } from '@/lib/tr';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { LogOut, Sprout, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { getPaddleEnvironment } from '@/lib/paddle';
import { AdminReview } from '@/components/admin-review';

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="member-backdrop" onClick={onClose}><section role="dialog" aria-modal="true" aria-label={title} className="member-sheet" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-3"><h2>{title}</h2><Button variant="ghost" size="icon" aria-label={tr("关闭")} onClick={onClose}><X /></Button></div>{children}</section></div>;
}

export function AuthDialog({ reason, onClose }: { reason?: string; onClose: () => void }) {
  const [mode, setMode] = useState<'in' | 'up'>('in');
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
  async function google() {
    const r = await lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin });
    if (r.error) setMsg(tr("谷歌登录失败，请稍后再试。")); else if (!r.redirected) onClose();
  }
  return <Sheet title={mode === 'in' ? tr("登录学员账号") : tr("注册学员账号")} onClose={onClose}>
    {reason && <p className="member-sub">{reason}</p>}
    <Button variant="outline" className="w-full h-11" onClick={google}>{tr("使用谷歌账号继续")}</Button>
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

type Aid = { aid_type: string; status: string; created_at: string; chsi_code: string | null; review_note: string | null };
type Rec = { id: string; target: string; score: number; main_issue: string | null; created_at: string };
const STATUS: Record<string, string> = { pending: tr('审核中'), approved: tr('已通过，名额已开通'), rejected: tr('未通过') };

export function AccountSheet({ user, onClose }: { user: User; onClose: () => void }) {
  const [aid, setAid] = useState<Aid[]>([]);
  const [recs, setRecs] = useState<Rec[]>([]);
  const [weeks, setWeeks] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [slot, setSlot] = useState(false);
  const [review, setReview] = useState(false);
  const [gift, setGift] = useState(false);
  const [subs, setSubs] = useState<{ product_id: string; status: string; current_period_end: string | null; cancel_at_period_end: boolean | null }[]>([]);
  useEffect(() => {
    supabase.from('aid_applications').select('aid_type,status,created_at,chsi_code,review_note').eq('user_id', user.id).order('created_at', { ascending: false }).then(r => setAid(r.data ?? []));
    supabase.from('practice_records').select('id,target,score,main_issue,created_at').order('created_at', { ascending: false }).limit(20).then(r => setRecs(r.data ?? []));
    supabase.from('learning_progress').select('item_key', { count: 'exact', head: true }).like('item_key', 'course:%').then(r => setWeeks(r.count ?? 0));
    supabase.from('subscriptions').select('product_id,status,current_period_end,cancel_at_period_end').eq('user_id', user.id).eq('environment', getPaddleEnvironment()).order('created_at', { ascending: false }).limit(1).then(r => setSubs(r.data ?? []));
    supabase.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin').then(r => setAdmin((r.data ?? []).length > 0));
    supabase.from('reward_grants').select('ends_at').gt('ends_at', new Date().toISOString()).limit(1).then(r => setGift((r.data ?? []).length > 0));
    supabase.rpc('admin_slot_open').then(r => setSlot(r.data === true));
  }, []);
  const member = aid.some(a => a.status === 'approved') ? tr("助学名额") : subs[0] && ['active', 'trialing'].includes(subs[0].status) ? tr("付费会员") : gift ? tr("奖励会员") : tr("免费试学");
  return <Sheet title={tr("我的学员账号")} onClose={onClose}>
    <p className="member-sub">{trn(user.email)}</p>
    <div className="member-box"><Sprout size={18} /><div><b>{tr("身份：")}{member}</b><p>{tr("12 周课程已完成")} {weeks} {tr("周 · 云端录音记录")} {trn(recs.length)} {tr("条")}</p></div></div>
    {subs[0] && ['active', 'trialing', 'past_due'].includes(subs[0].status) && (() => { const s0 = subs[0]!; const end = s0.current_period_end ? new Date(s0.current_period_end) : null; const soon = end && end.getTime() - Date.now() < 3 * 864e5; return <div className="member-box"><Sprout size={18} /><div>
      <b>{s0.cancel_at_period_end ? tr('已取消自动续费') : tr('自动续费已开启')}</b>
      {end && <p className={soon && !s0.cancel_at_period_end ? 'text-destructive font-semibold' : ''}>{s0.cancel_at_period_end ? tr('会员到期日：') : tr('下次扣费日期：')}{end.toLocaleDateString()}{soon && !s0.cancel_at_period_end ? ' · ' + tr('3 天内将自动扣费') : ''}</p>}
      {!s0.cancel_at_period_end && <Button size="sm" variant="outline" className="mt-1" onClick={async () => { const w = window.open('', '_blank'); try { const r = await openBillingPortal(); if (w) w.location.href = r.url; } catch { w?.close(); alert(tr('暂时打不开，请稍后再试。')); } }}>{tr('取消自动续费 / 管理付款')}</Button>}
    </div></div>; })()}
    {aid.length > 0 && <div className="member-box"><Sprout size={18} /><div><b>{tr("助学申请")}</b>{aid.map(a => <p key={a.created_at}>{a.aid_type === 'poor' ? tr("贫困学生") : tr("普通学生")} · {trn(STATUS[a.status])}{a.review_note && a.status === 'rejected' ? `（${a.review_note}）` : ''} · {new Date(a.created_at).toLocaleDateString('zh-CN')}{a.chsi_code && <> {tr("· 学信网验证码")} {trn(a.chsi_code)} <a className="text-primary underline" href="https://www.chsi.com.cn/xlcx/bgys.jsp" target="_blank" rel="noreferrer">{tr("去核真")}</a></>}</p>)}</div></div>}
    <h3 className="font-semibold mt-3 mb-2 text-sm">{tr("最近的口语记录")}</h3>
    {recs.length === 0 ? <p className="text-xs text-muted-foreground">{tr("还没有录音记录，去跟读一句试试。")}</p> : <div className="record-list">{recs.map(r => <div className="record-item" key={r.id}><div className="flex items-center justify-between gap-2"><b className="truncate">{trn(r.target)}</b><span className="record-score">{trn(r.score)}</span></div>{r.main_issue && <p className="record-fix">{tr("待纠正：")}{trn(r.main_issue)}</p>}<span className="text-[10px] text-muted-foreground">{new Date(r.created_at).toLocaleString('zh-CN')}</span></div>)}</div>}
    {admin && <Button className="w-full mt-4" onClick={() => setReview(true)}>{tr("审核助学申请")}</Button>}
    {!admin && slot && <Button variant="outline" className="w-full mt-4" onClick={async () => { const r = await supabase.rpc('claim_first_admin'); if (r.data) { setAdmin(true); setSlot(false); } }}>{tr("设为创始人管理员（仅第一位可领取）")}</Button>}
    {review && <AdminReview onClose={() => setReview(false)} />}
    <a href="/legal" target="_blank" rel="noreferrer" className="block text-center text-xs text-muted-foreground underline mt-3">{tr("隐私政策与服务条款")}</a><Button variant="outline" className="w-full mt-4" onClick={async () => { await supabase.auth.signOut(); onClose(); }}><LogOut size={15} /> {tr("退出登录")}</Button>
  </Sheet>;
}
