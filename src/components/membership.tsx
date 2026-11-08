import { useEffect, useState } from 'react';
import { Check, Crown, Flame, RotateCcw, Smartphone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DICT, type Lang } from '@/lib/i18n';
import { VoicePicker } from '@/components/voice-picker';
import { isNativeApp } from '@/lib/platform';
import { iapAvailable, loadProducts, purchasePlan, restorePurchases, hasActiveEntitlement, syncEntitlementsToCloud, openManageSubscriptions, type PlanId, type StoreProduct, type Entitlement } from '@/lib/iap';

function Sheet({ title, onClose, closeLabel, children }: { title: string; onClose: () => void; closeLabel: string; children: React.ReactNode }) {
  return <div className="member-backdrop" onClick={onClose}><section role="dialog" aria-modal="true" aria-label={title} className="member-sheet" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between mb-3"><h2>{title}</h2><Button variant="ghost" size="icon" aria-label={closeLabel} onClick={onClose}><X /></Button></div>{children}</section></div>;
}

export function SubscribeDialog({ lang, onClose, onPurchased, onLogin, userId }: { lang: Lang; onClose: () => void; onPurchased: (entitlements: Entitlement[]) => void; onLogin?: (() => void) | undefined; userId?: string | undefined }) {
  const t = DICT[lang];
  const [pick, setPick] = useState<PlanId>('quarter');
  const [busy, setBusy] = useState<'buy' | 'restore' | null>(null);
  const [msg, setMsg] = useState('');
  const [products, setProducts] = useState<Partial<Record<PlanId, StoreProduct>>>({});
  const native = isNativeApp();
  const storeReady = iapAvailable();

  useEffect(() => {
    if (!storeReady) return;
    let active = true;
    loadProducts().then(p => { if (active) setProducts(p); }).catch(() => { if (active) setMsg('暂时无法从 App Store 读取价格，请检查网络后重试。'); });
    return () => { active = false; };
  }, [storeReady]);

  async function finish(entitlements: Entitlement[], successText: string) {
    if (!hasActiveEntitlement(entitlements)) { setMsg('未找到有效订阅。若刚完成付款，请稍候片刻再点「恢复购买」。'); return; }
    if (userId) await syncEntitlementsToCloud(entitlements).catch(() => undefined);
    setMsg(successText);
    onPurchased(entitlements);
  }

  async function buy() {
    if (!storeReady) { setMsg('请在 iPhone / iPad 的 SayUp App 内开通。'); return; }
    setBusy('buy'); setMsg('');
    try {
      const outcome = await purchasePlan(pick);
      if (outcome.state === 'purchased') await finish(outcome.entitlements, '开通成功，全部课程已解锁。');
      else if (outcome.state === 'pending') setMsg('订单等待批准（如「购买前询问」）。批准后权益会自动生效。');
      else if (outcome.state === 'cancelled') setMsg('');
      else setMsg('购买未完成，请重试。');
    } catch (e) {
      setMsg('购买失败：' + (e instanceof Error ? e.message : '请稍后重试'));
    } finally { setBusy(null); }
  }

  async function restore() {
    if (!storeReady) { setMsg('请在 iPhone / iPad 的 SayUp App 内恢复购买。'); return; }
    setBusy('restore'); setMsg('');
    try {
      const list = await restorePurchases();
      if (!hasActiveEntitlement(list)) setMsg('当前 Apple ID 下没有有效的 SayUp 订阅。');
      else await finish(list, '已恢复当前 Apple ID 的订阅，权益已生效。');
    } catch (e) {
      setMsg('恢复失败：' + (e instanceof Error ? e.message : '请稍后重试'));
    } finally { setBusy(null); }
  }

  return <Sheet title={t.planTitle} onClose={onClose} closeLabel={t.close}>
    <p className="member-sub">{t.planSub}</p>
    <div className="plan-list" role="radiogroup">
      {t.plans.map(p => {
        const live = products[p.id as PlanId];
        return (
          <Button key={p.id} variant="ghost" role="radio" aria-checked={pick === p.id} className={cn('plan-card', pick === p.id && 'active')} onClick={() => setPick(p.id as PlanId)}>
            <div className="text-left">
              <b>{p.name}</b>
              <span>{p.note}</span>
            </div>
            <div className="plan-price">
              {live?.displayPrice ?? p.price}<small>{p.unit}</small>
            </div>
          </Button>
        );
      })}
    </div>
    <ul className="perk-list">
      {t.perks.map(x => <li key={x}><Check size={14} />{x}</li>)}
    </ul>
    <VoicePicker />

    {native ? (
      <div className="space-y-2.5 my-3">
        <Button className="w-full h-11 font-semibold" disabled={busy !== null} onClick={buy}>
          <Crown size={16} className="mr-1.5" /> {busy === 'buy' ? '正在连接 App Store…' : '通过 Apple 内购开通'}
        </Button>
        <p className="text-[11px] text-center text-muted-foreground">
          使用 Apple ID 绑定的支付方式结算（支持支付宝 / 微信支付 / 银行卡）
        </p>
        <Button variant="outline" className="w-full text-xs h-9" disabled={busy !== null} onClick={restore}>
          <RotateCcw size={13} className={cn("mr-1.5", busy === 'restore' && "animate-spin")} />
          {busy === 'restore' ? '正在恢复购买…' : '恢复购买 (Restore Purchases)'}
        </Button>
        {msg && <p className="text-[11px] text-center text-primary font-medium" role="status">{msg}</p>}
        {!userId && onLogin && (
          <Button variant="link" className="w-full text-xs h-8" onClick={onLogin}>登录学员账号，让网页端也同步会员权益</Button>
        )}
      </div>
    ) : (
      <div className="space-y-3 my-3">
        <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-left space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Smartphone size={17} />
            <span>请在 SayUp iOS App 内开通会员</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            网页端仅承载免安装试学与桌面学习体验。全量 3,000+ 分级主词库、80 篇精听语篇与 12 周主线完整课程，请在 <b>iPhone / iPad 的 SayUp App</b> 内通过 Apple 内购开通。
          </p>
          <div className="pt-1 text-[11px] text-primary flex items-center gap-1.5">
            <Check size={12} className="shrink-0" />
            <span>同一学员账号多端同步：在 App 开通并登录后，网页端登录同一账号即可解锁全量权益。</span>
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
          {storeReady && <><span>·</span><button type="button" className="underline" onClick={() => void openManageSubscriptions()}>管理订阅</button></>}
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
