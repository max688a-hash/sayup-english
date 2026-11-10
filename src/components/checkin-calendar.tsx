import { useEffect, useState } from 'react';
import { ArrowLeft, Flame, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { tr } from '@/lib/tr';

type Claim = { status?: string; newcomer?: boolean; monthly?: number; referral?: number };

function claimMessage(d: Claim | null): string {
  if (!d || d.status !== 'ok') return '';
  const parts: string[] = [];
  if (d.newcomer) parts.push(tr('新人挑战达成，送你 30 天会员'));
  if (d.monthly) parts.push(tr('会员月打卡达标，送你 {0} 天会员', 7 * d.monthly));
  if (d.referral) parts.push(tr('好友付费成功，送你 {0} 天会员', 15 * d.referral));
  return parts.length ? tr('恭喜！') + parts.join('；') + tr('。已自动生效。') : '';
}

// Check-in days come only from real scored recordings (3+ per day), computed in the database.
export function CheckinCalendar({ onExit }: { onExit: () => void }) {
  const { user } = useAuth();
  const [days, setDays] = useState<string[]>([]);
  const [rewardEnd, setRewardEnd] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  async function load() {
    if (!user) return;
    const r = await supabase.rpc('checkin_days', { _from: new Date(y, m, 1).toISOString(), _to: new Date(y, m + 1, 1).toISOString() });
    setDays((r.data ?? []).map((x: { day: string }) => x.day));
    const g = await supabase.from('reward_grants').select('ends_at').gt('ends_at', new Date().toISOString()).order('ends_at', { ascending: false }).limit(1);
    setRewardEnd(g.data?.[0]?.ends_at ?? null);
  }
  async function claim(manual: boolean) {
    setBusy(true);
    try {
      const r = await supabase.rpc('claim_reward_days');
      const text = claimMessage((r.error ? null : r.data) as Claim | null);
      if (text) setMsg(text);
      else if (manual) setMsg(r.error ? tr('暂时无法检查，请稍后再试。') : tr('还没达到领取条件，继续加油。'));
    } catch { if (manual) setMsg(tr('暂时无法检查，请稍后再试。')); }
    setBusy(false);
    void load();
  }
  useEffect(() => { if (user) void claim(false); }, [user]);
  const total = new Date(y, m + 1, 0).getDate();
  const lead = new Date(y, m, 1).getDay();
  const pad = (d: number) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
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
        <b>{tr('打卡学习送会员')}</b>
        <p>{tr('新人挑战：注册后 30 天内打卡满 25 天，送 30 天会员（每个账号一次，练免费试学内容也算）。')}</p>
        <p>{tr('会员月度奖：付费会员每个付费月打卡满 25 天，送 7 天会员。送的天数不算付费月；到期不续费，最后一个达标月发完即结束。')}</p>
        <p>{tr('邀请好友：好友注册 7 天内填你的邀请码，付费满 7 天后送你 15 天会员，每年最多 12 次。邀请码在「我的账号」里。')}</p>
        <p>{tr('奖励自动到账；有付费会员时，排在付费到期之后。订阅照常扣费，不会取消自动续费。')}</p>
        {rewardEnd && <p className="text-primary font-semibold">{tr('奖励会员有效期至')} {new Date(rewardEnd).toLocaleDateString()}</p>}
      </div></div>
      <Button className="w-full mt-3" disabled={busy} onClick={() => claim(true)}>{busy ? tr('请稍候…') : tr('检查并领取奖励')}</Button>
      {msg && <p className="text-sm text-center mt-2" role="status">{msg}</p>}
    </>}
  </div>;
}
