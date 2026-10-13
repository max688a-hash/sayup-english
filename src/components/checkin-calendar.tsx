import { useEffect, useState } from 'react';
import { ArrowLeft, Flame, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { tr } from '@/lib/tr';
import { applyStreakBilling } from '@/utils/rewards.functions';

// Check-in days come only from real scored recordings (3+ per day), computed in the database.
export function CheckinCalendar({ onExit }: { onExit: () => void }) {
  const { user } = useAuth();
  const [days, setDays] = useState<string[]>([]);
  const [grants, setGrants] = useState<{ kind: string; ends_at: string }[]>([]);
  const [msg, setMsg] = useState('');
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  async function load() {
    if (!user) return;
    const r = await supabase.rpc('checkin_days', { _from: new Date(y, m, 1).toISOString(), _to: new Date(y, m + 1, 1).toISOString() });
    setDays((r.data ?? []).map((x: { day: string }) => x.day));
    const g = await supabase.from('reward_grants').select('kind,ends_at').order('created_at', { ascending: false });
    setGrants(g.data ?? []);
  }
  useEffect(() => { void load(); }, [user]);
  async function claim() {
    const r = await supabase.rpc('claim_rewards');
    if (r.data === 'newcomer') setMsg(tr('恭喜！新人挑战达成，已送你 1 个月会员。'));
    else if (r.data === 'streak') {
      const b = await applyStreakBilling().catch(() => ({ status: 'error' as const }));
      if (b.status === 'applied') setMsg(tr('恭喜！连续 3 个月达标，下一次扣费已自动推迟 1 个月，这个月不扣钱。') + ' ' + new Date((b as { nextBilledAt: string }).nextBilledAt).toLocaleDateString());
      else setMsg(tr('恭喜！连续 3 个月达标，已送你 1 个月会员。扣费推迟暂未成功，我们会人工处理，不会多扣你的钱。'));
    }
    else setMsg(tr('还没达到领取条件，继续加油。'));
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
        <b>{tr('两种送会员')}</b>
        <p>{tr('新人挑战：注册后前 30 天里打卡满 25 天，送 1 个月会员（每个账号一次，不用绑卡，不会自动扣费）。')}</p>
        <p>{tr('会员坚持奖：付费会员连续 3 个月每月打卡满 25 天，第 4 个月免费。送完重新计数。')}</p>
        {active && <p className="text-primary font-semibold">{tr('奖励会员有效期至')} {new Date(active.ends_at).toLocaleDateString()}</p>}
      </div></div>
      <Button className="w-full mt-3" onClick={claim}>{tr('检查并领取奖励')}</Button>
      {msg && <p className="text-sm text-center mt-2">{msg}</p>}
    </>}
  </div>;
}
