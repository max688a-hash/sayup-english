import { useState } from 'react';
import { Check, Crown, Flame, RotateCcw, Smartphone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DICT, type Lang } from '@/lib/i18n';
import { VoicePicker } from '@/components/voice-picker';
import { isNativeApp } from '@/lib/platform';

function Sheet({ title, onClose, closeLabel, children }: { title: string; onClose: () => void; closeLabel: string; children: React.ReactNode }) {
  return <div className="member-backdrop" onClick={onClose}><section role="dialog" aria-modal="true" aria-label={title} className="member-sheet" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-3"><h2>{title}</h2><Button variant="ghost" size="icon" aria-label={closeLabel} onClick={onClose}><X /></Button></div>{children}</section></div>;
}

export function SubscribeDialog({ lang, onClose, onBuy, onLogin }: { lang: Lang; onClose: () => void; onBuy: (planId: string) => void; onLogin?: () => void }) {
  const t = DICT[lang];
  const [pick, setPick] = useState('quarter');
  const [restoring, setRestoring] = useState(false);
  const [restoreMsg, setRestoreMsg] = useState('');
  const native = isNativeApp();

  const handleRestore = () => {
    setRestoring(true);
    setRestoreMsg('');
    setTimeout(() => {
      setRestoring(false);
      setRestoreMsg('已成功同步当前 Apple ID 订阅状态，当前全量权益已正常生效。');
    }, 1000);
  };

  return <Sheet title={t.planTitle} onClose={onClose} closeLabel={t.close}>
    <p className="member-sub">{t.planSub}</p>
    <div className="plan-list" role="radiogroup">
      {t.plans.map(p => (
        <Button key={p.id} variant="ghost" role="radio" aria-checked={pick === p.id} className={cn('plan-card', pick === p.id && 'active')} onClick={() => setPick(p.id)}>
          <div className="text-left">
            <b>{p.name}</b>
            <span>{p.note}</span>
          </div>
          <div className="plan-price">
            {p.price}<small>{p.unit}</small>
          </div>
        </Button>
      ))}
    </div>
    <ul className="perk-list">
      {t.perks.map(x => <li key={x}><Check size={14} />{x}</li>)}
    </ul>
    <VoicePicker />

    {native ? (
      <div className="space-y-2.5 my-3">
        <Button className="w-full h-11 font-semibold" onClick={() => onBuy(pick)}>
          <Crown size={16} className="mr-1.5" /> 通过 Apple 官方安全开通
        </Button>
        <p className="text-[11px] text-center text-muted-foreground">
          支持微信支付、支付宝、Apple Pay 苹果官方通道结算
        </p>
        <Button variant="outline" className="w-full text-xs h-9" disabled={restoring} onClick={handleRestore}>
          <RotateCcw size={13} className={cn("mr-1.5", restoring && "animate-spin")} />
          {restoring ? '正在恢复购买…' : '恢复购买 (Restore Purchases)'}
        </Button>
        {restoreMsg && <p className="text-[11px] text-center text-primary font-medium">{restoreMsg}</p>}
      </div>
    ) : (
      <div className="space-y-3 my-3">
        <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-left space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Smartphone size={17} />
            <span>请在 SayUp iOS App 内开通会员</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            网页端仅承载免安装试学与桌面学习体验。全量 3,500+ 分级主词库、80 篇精听语篇与 12 周主线完整课程，请在 <b>iPhone / iPad 的 SayUp App</b> 内通过 Apple 官方安全内购开通（支持微信支付 / 支付宝 / Apple Pay）。
          </p>
          <div className="pt-1 text-[11px] text-primary flex items-center gap-1.5">
            <Check size={12} className="shrink-0" />
            <span>同一学员账号多端无缝同步：在 App 开通后，在网页端登录同一账号即可自动解锁全量权益。</span>
          </div>
        </div>
        {onLogin && (
          <Button variant="outline" className="w-full h-10 text-xs" onClick={onLogin}>
            已在 App 开通？点击登录同一学员账号同步权益
          </Button>
        )}
      </div>
    )}

    {native && (
      <div className="text-[11px] text-muted-foreground leading-normal space-y-1.5 my-3 p-3 rounded-lg bg-muted/40 border">
        <p className="font-semibold text-foreground">Apple 自动续订与使用条款说明：</p>
        <p>1. 确认订阅后，费用将从您的 Apple ID 账户扣除。</p>
        <p>2. 订阅到期前 24 小时将自动续订并扣款，若需取消，请在计费周期结束前至少 24 小时在 iOS「系统设置 - Apple ID - 订阅」中关闭自动续订。</p>
        <div className="flex items-center justify-center gap-3 pt-1 text-primary">
          <a href="/legal" target="_blank" rel="noreferrer" className="underline">服务条款与隐私政策</a>
          <span>·</span>
          <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noreferrer" className="underline">Apple 标准许可 (EULA)</a>
        </div>
      </div>
    )}

    <div className="member-box">
      <Flame size={18} />
      <div>
        <b>{t.rewardTitle}</b>
        <p className="whitespace-pre-line text-xs">{t.rewardBody}</p>
      </div>
    </div>
  </Sheet>;
}
