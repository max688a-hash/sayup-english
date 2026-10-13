import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { LogOut, Sprout, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="member-backdrop" onClick={onClose}><section role="dialog" aria-modal="true" aria-label={title} className="member-sheet" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-3"><h2>{title}</h2><Button variant="ghost" size="icon" aria-label="关闭" onClick={onClose}><X /></Button></div>{children}</section></div>;
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
      if (error) setMsg(error.message.includes('Invalid') ? '邮箱或密码不对，请再试一次。' : error.message.includes('confirmed') ? '邮箱还没确认，请先点开邮件里的确认链接。' : '登录失败：' + error.message);
      else onClose();
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password: pw, options: { emailRedirectTo: window.location.origin } });
      if (error) setMsg(error.message.includes('registered') ? '这个邮箱已经注册过，请直接登录。' : '注册失败：' + error.message);
      else if (!data.session) setMsg('注册成功！我们给你发了一封确认邮件，点开里面的链接后回来登录。');
      else onClose();
    }
    setBusy(false);
  }
  async function google() {
    const r = await lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin });
    if (r.error) setMsg('谷歌登录失败，请稍后再试。'); else if (!r.redirected) onClose();
  }
  return <Sheet title={mode === 'in' ? '登录学员账号' : '注册学员账号'} onClose={onClose}>
    {reason && <p className="member-sub">{reason}</p>}
    <Button variant="outline" className="w-full h-11" onClick={google}>使用谷歌账号继续</Button>
    <p className="text-center text-xs text-muted-foreground my-3">或使用邮箱</p>
    <form className="aid-form" onSubmit={submit}>
      <label>邮箱<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>密码（至少 6 位）<input type="password" required minLength={6} value={pw} onChange={e => setPw(e.target.value)} /></label>
      <Button type="submit" className="w-full h-11" disabled={busy}>{busy ? '请稍候…' : mode === 'in' ? '登录' : '注册'}</Button>
    </form>
    {msg && <p className="member-note" role="status">{msg}</p>}
    <Button variant="link" className="w-full" onClick={() => { setMode(mode === 'in' ? 'up' : 'in'); setMsg(''); }}>{mode === 'in' ? '还没有账号？注册一个' : '已有账号？去登录'}</Button>
  </Sheet>;
}

type Aid = { aid_type: string; status: string; created_at: string; chsi_code: string | null };
type Rec = { id: string; target: string; score: number; main_issue: string | null; created_at: string };
const STATUS: Record<string, string> = { pending: '审核中', approved: '已通过，名额已开通', rejected: '未通过' };

export function AccountSheet({ user, onClose }: { user: User; onClose: () => void }) {
  const [aid, setAid] = useState<Aid[]>([]);
  const [recs, setRecs] = useState<Rec[]>([]);
  const [weeks, setWeeks] = useState(0);
  const [subs, setSubs] = useState<{ product_id: string; status: string }[]>([]);
  useEffect(() => {
    supabase.from('aid_applications').select('aid_type,status,created_at,chsi_code').order('created_at', { ascending: false }).then(r => setAid(r.data ?? []));
    supabase.from('practice_records').select('id,target,score,main_issue,created_at').order('created_at', { ascending: false }).limit(20).then(r => setRecs(r.data ?? []));
    supabase.from('learning_progress').select('item_key', { count: 'exact', head: true }).like('item_key', 'course:%').then(r => setWeeks(r.count ?? 0));
    supabase.from('subscriptions').select('product_id,status').order('created_at', { ascending: false }).limit(1).then(r => setSubs(r.data ?? []));
  }, []);
  const member = aid.some(a => a.status === 'approved') ? '助学名额' : subs[0] && ['active', 'trialing'].includes(subs[0].status) ? '付费会员' : '免费试学';
  return <Sheet title="我的学员账号" onClose={onClose}>
    <p className="member-sub">{user.email}</p>
    <div className="member-box"><Sprout size={18} /><div><b>身份：{member}</b><p>12 周课程已完成 {weeks} 周 · 云端录音记录 {recs.length} 条</p></div></div>
    {aid.length > 0 && <div className="member-box"><Sprout size={18} /><div><b>助学申请</b>{aid.map(a => <p key={a.created_at}>{a.aid_type === 'poor' ? '贫困学生' : '普通学生'} · {STATUS[a.status]} · {new Date(a.created_at).toLocaleDateString('zh-CN')}{a.chsi_code && <> · 学信网验证码 {a.chsi_code} <a className="text-primary underline" href="https://www.chsi.com.cn/xlcx/bgys.jsp" target="_blank" rel="noreferrer">去核真</a></>}</p>)}</div></div>}
    <h3 className="font-semibold mt-3 mb-2 text-sm">最近的口语记录</h3>
    {recs.length === 0 ? <p className="text-xs text-muted-foreground">还没有录音记录，去跟读一句试试。</p> : <div className="record-list">{recs.map(r => <div className="record-item" key={r.id}><div className="flex items-center justify-between gap-2"><b className="truncate">{r.target}</b><span className="record-score">{r.score}</span></div>{r.main_issue && <p className="record-fix">待纠正：{r.main_issue}</p>}<span className="text-[10px] text-muted-foreground">{new Date(r.created_at).toLocaleString('zh-CN')}</span></div>)}</div>}
    <Button variant="outline" className="w-full mt-4" onClick={async () => { await supabase.auth.signOut(); onClose(); }}><LogOut size={15} /> 退出登录</Button>
  </Sheet>;
}
