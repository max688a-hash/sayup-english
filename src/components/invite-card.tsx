import { useEffect, useState } from 'react';
import { Copy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { REWARD_RULES as R, SHARE_BASE_URL } from '@/lib/reward-rules';
import { tr } from '@/lib/tr';

import { INVITE_KEY as KEY } from '@/lib/invite-link';

type Info = { code?: string; invited?: number; rewarded?: number; applied?: boolean; can_apply?: boolean };
const RESULT: Record<string, string> = {
  ok: '已绑定邀请人。你付费满 7 天后，邀请你的人会收到 15 天会员。',
  invalid: '邀请码不对，请核对后再试。',
  self: '不能填写自己的邀请码。',
  already: '你已经填过邀请码了。',
  expired: '只有注册 7 天内的新账号可以填写邀请码。',
  not_new: '已开通过会员的账号不能再填写邀请码。',
};

export function InviteCard() {
  const [info, setInfo] = useState<Info | null>(null);
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  async function load() {
    const r = await supabase.rpc('my_referral_info');
    const d = (r.error ? null : r.data) as Info | null;
    setInfo(d);
    return d;
  }
  async function apply(code: string) {
    const c = code.trim().toUpperCase();
    if (!c) return;
    setBusy(true); setMsg('');
    try {
      const r = await supabase.rpc('apply_referral_code', { _code: c });
      if (r.error) setMsg(tr('提交失败，请稍后再试。'));
      else { setMsg(tr(RESULT[String(r.data)] ?? '提交失败，请稍后再试。')); localStorage.removeItem(KEY); if (r.data === 'ok') setInput(''); }
    } catch { setMsg(tr('提交失败，请稍后再试。')); }
    setBusy(false);
    void load();
  }
  useEffect(() => {
    void (async () => {
      const d = await load();
      const saved = (() => { try { return localStorage.getItem(KEY); } catch { return null; } })();
      if (!saved) return;
      if (d?.can_apply) await apply(saved); else localStorage.removeItem(KEY);
    })();
  }, []);
  async function share() {
    if (!info?.code) return;
    const text = tr('我在用声芽练英语口语。注册后在「我的账号」填写我的邀请码 {0}：', info.code);
    const url = `${SHARE_BASE_URL}/?invite=${info.code}`;
    try {
      if (navigator.share) { await navigator.share({ text, url }); return; }
      await navigator.clipboard.writeText(`${text}${url}`);
      setMsg(tr('邀请内容已复制，发给好友即可。'));
    } catch { /* share cancelled */ }
  }
  if (!info) return null;
  return <div className="member-box"><Users size={18} className="text-primary" /><div className="min-w-0 flex-1">
    <b>{tr('邀请好友送会员')}</b>
    <p>{tr('好友注册 7 天内填写你的邀请码，付费满 7 天后送你 15 天会员，每年最多 12 次。')}</p>
    {info.code && <div className="flex items-center gap-2 mt-2">
      <span className="font-mono text-lg font-bold tracking-widest text-primary">{info.code}</span>
      <Button size="sm" variant="outline" onClick={share}><Copy size={14} /> {tr('分享邀请码')}</Button>
    </div>}
    <p className="text-xs text-muted-foreground mt-1">{tr('已邀请 {0} 人 · 已到账 {1} 次', info.invited ?? 0, info.rewarded ?? 0)}</p>
    {info.can_apply && <form className="flex gap-2 mt-2" onSubmit={e => { e.preventDefault(); void apply(input); }}>
      <input aria-label={tr('填写好友的邀请码')} placeholder={tr('填写好友的邀请码')} value={input} maxLength={12}
        onChange={e => setInput(e.target.value.toUpperCase())}
        className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm" />
      <Button size="sm" type="submit" disabled={busy || !input.trim()}>{tr('提交')}</Button>
    </form>}
    {msg && <p className="text-xs mt-2" role="status">{msg}</p>}
  </div></div>;
}
