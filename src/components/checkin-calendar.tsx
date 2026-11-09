import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { ArrowLeft, Flame, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { tr } from '@/lib/tr';

// Check-in days come only from real scored recordings (3+ per day), computed in the database.
export function CheckinCalendar({ onExit }: { onExit: () => void }) {
  const { user } = useAuth();
  const [days, setDays] = useState<string[]>([]);
  const [grants, setGrants] = useState<{ kind: string; ends_at: string }[]>([]);
  const [points, setPoints] = useState(0);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  async function load() {
    if (!user) return;
    const r = await supabase.rpc('checkin_days', { _from: new Date(y, m, 1).toISOString(), _to: new Date(y, m + 1, 1).toISOString() });
    setDays((r.data ?? []).map((x: { day: string }) => x.day));
    const g = await supabase.from('reward_grants').select('kind,ends_at').order('created_at', { ascending: false });
    setGrants(g.data ?? []);
    const b = await supabase.rpc('reward_points_balance');
    setPoints(Number(b.data ?? 0));
  }
  useEffect(() => { void load(); }, [user]);
  async function claim() {
    const r = await supabase.rpc('claim_rewards');
    if (r.data === 'newcomer') setMsg(tr('恭喜！新人挑战达成，已送你 30 积分（1 积分 = 1 天会员）。'));
    else if (r.data === 'streak') setMsg(tr('恭喜！连续 3 个月达标，已送你 30 积分。积分随时兑换会员天数。'));
    else setMsg(tr('还没达到领取条件，继续加油。'));
    void load();
  }
  async function redeem() {
    setBusy(true); setMsg('');
    try {
      const r = await supabase.rpc('redeem_points', { _days: 30 });
      const d = r.data as { status?: string; balance?: number; ends_at?: string } | null;
      if (d?.status === 'ok') setMsg(tr('已兑换 30 天会员，有效期至 {0}', d.ends_at ? new Date(d.ends_at).toLocaleDateString() : ''));
      else if (d?.status === 'insufficient') setMsg(tr('积分不足，还差 {0} 分', 30 - Number(d?.balance ?? 0)));
      else if (d?.status === 'has_active') setMsg(tr('当前有生效中的付费或奖励权益，到期后可兑换。'));
      else setMsg(tr('兑换失败，请重试。'));
    } catch { setMsg(tr('兑换失败，请重试。')); }
    setBusy(false);
    void load();
  }
  const total = new Date(y, m + 1, 0).getDate();
  const lead = new Date(y, m, 1).getDay();
  const pad = (d: number) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const active = grants.find(g => new Date(g.ends_at) > now);
  return <div className="adv-hub">
    <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{tr('打卡日历')}</span><span className="w-9" /></div>
    <div className="strength-summary"><div><span className="eyebrow">{y} / {m + 1}</span><h2><Flame size={18} className="inline" /> {tr('本月已打卡')} {days.length} / 25 {tr('天')}</h2><p>{tr('当天完成 3 次真实跟读录音并获得评分，才算打卡一天。只看真开口，挂机不算。')}</p></div></div>
    {!user ? <p className="text-sm text-muted-foreground p-3">{tr('登录后才能记录打卡和领取奖励。')}</p> : <>
      <div className="grid grid-cols-7 gap-1 text-center text-xs my-3">
        {['日', '一', '二', '三', '四', '五', '六'].map(d => <span key={d} className="text-muted-foreground">{tr(d)}</span>)}
        {Array.from({ length: lead }).map((_, i) => <span key={'e' + i} />)}
        {Array.from({ length: total }, (_, i) => i + 1).map(d => { const on = days.includes(pad(d)); return <span key={d} className={on ? 'rounded-full bg-primary text-primary-foreground py-1.5 font-semibold' : 'rounded-full bg-muted py-1.5'}>{d}</span>; })}
      </div>
      <div className="member-box"><Gift size={18} /><div>
        <b>{tr('打卡送积分')}</b>
        <p>{tr('新人挑战：注册后前 30 天里打卡满 25 天，送 30 积分（每个账号一次）。')}</p>
        <p>{tr('会员坚持奖：付费会员每连续 3 个会员月（按订阅周期起算）每月打卡满 25 天，送 30 积分，发奖后重新计数；断订或退款则重新累计。')}</p>
        <p>{tr('1 积分 = 1 天会员。有生效中的付费或奖励权益时不能兑换，到期后可兑；兑换后若重新付费，剩余天数自动顺延。订阅照常扣费，兑换不取消续费。')}</p>
        <p className="text-primary font-semibold">{tr('积分余额')} {points}</p>
        {active && <p className="text-primary font-semibold">{tr('奖励会员有效期至')} {new Date(active.ends_at).toLocaleDateString()}</p>}
      </div></div>
      <Button className="w-full mt-3" onClick={claim}>{tr('检查并领取奖励')}</Button>
      {Capacitor.isNativePlatform()
        ? <Button className="w-full mt-2" variant="outline" disabled={busy || points < 30} onClick={redeem}>{tr('兑换 30 天会员（30 积分）')}</Button>
        : <p className="text-xs text-muted-foreground text-center mt-2">{tr('积分兑换请在 SayUp App 内操作；网页可查看余额与权益。')}</p>}
      {msg && <p className="text-sm text-center mt-2">{msg}</p>}
    </>}
  </div>;
}
