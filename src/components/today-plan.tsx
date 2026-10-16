import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronRight, Circle, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tr } from '@/lib/tr';
import { EXCHANGES, readDone, syncDone } from '@/components/daily-exchange';
import { pullKeys, pushKey, dropKey } from '@/lib/cloud-progress';

export type PlanTarget = 'daily' | 'chunks' | 'shadow' | 'stories' | 'pron';
const KEY = 'sayup-today-plan';
const dayKey = () => new Date().toLocaleDateString('sv');
const dayIndex = () => Math.floor(Date.now() / 86400000);

/** 每日学习路线：按日期自动排 4 步（听懂 → 跟读 → 替换 → 对话），约 20 分钟。 */
export function todaysScene() {
  const pool = EXCHANGES.filter(e => e.level === 'a1' || e.level === 'a2');
  const done = typeof window === 'undefined' ? [] : readDone();
  const fresh = pool.filter(e => !done.includes(e.id));
  const list = fresh.length ? fresh : pool;
  return list[dayIndex() % list.length]!;
}

export function TodayPlan({ open }: { open: (t: PlanTarget, sceneId?: string) => void }) {
  const [ticks, setTicks] = useState<string[]>([]);
  const [scene, setScene] = useState<ReturnType<typeof todaysScene> | null>(null);
  useEffect(() => {
    setScene(todaysScene());
    let local: string[] = [];
    try { const s = JSON.parse(localStorage.getItem(KEY) || '{}'); local = s.day === dayKey() ? s.ticks : []; setTicks(local); } catch { /* ignore */ }
    const prefix = `plan:${dayKey()}:`;
    void pullKeys(prefix).then(async cloud => {
      if (!cloud) return;
      for (const t of local) if (!cloud.includes(t)) await pushKey(prefix + t);
      const merged = [...new Set([...cloud, ...local])];
      localStorage.setItem(KEY, JSON.stringify({ day: dayKey(), ticks: merged }));
      setTicks(merged);
    });
    void syncDone().then(() => setScene(todaysScene()));
  }, []);
  const toggle = (id: string) => setTicks(t => {
    const on = !t.includes(id);
    const n = on ? [...t, id] : t.filter(x => x !== id);
    localStorage.setItem(KEY, JSON.stringify({ day: dayKey(), ticks: n }));
    void (on ? pushKey(`plan:${dayKey()}:${id}`) : dropKey(`plan:${dayKey()}:${id}`));
    return n;
  });
  const steps: { id: PlanTarget; title: string; desc: string; min: number }[] = [
    { id: 'shadow', title: tr('① 听懂 + 跟读'), desc: tr('一段日常对话，逐句影子跟读'), min: 5 },
    { id: 'chunks', title: tr('② 句型替换'), desc: tr('选一组同类句，换词开口说 5 遍'), min: 5 },
    { id: 'pron', title: tr('③ 纠音'), desc: tr('发音实验室练一组易混音'), min: 4 },
    { id: 'daily', title: tr('④ 今日交流'), desc: scene ? `${scene.emoji} ${scene.title} · ${tr(scene.titleZh)}` : '', min: 6 },
  ];
  const n = steps.filter(s => ticks.includes(s.id)).length;
  return <section className="rounded-xl border border-border bg-card p-4 mb-4">
    <div className="flex items-center gap-2 mb-1"><Route size={18} className="text-primary" /><h2 className="font-semibold">{tr('今日学习路线')}</h2><span className="ml-auto text-xs text-muted-foreground">{tr('{0}/4 · 约 20 分钟', n)}</span></div>
    <p className="text-xs text-muted-foreground mb-3">{tr('每天按「听懂 → 跟读 → 替换 → 对话」走一遍，像小孩学说话那样先听后说。做完一步点左边的圈打勾。')}</p>
    <div className="space-y-2">{steps.map(s => { const ok = ticks.includes(s.id); return <div key={s.id} className="flex items-center gap-2">
      <Button variant="ghost" size="icon" aria-label={ok ? tr('取消完成') : tr('标记完成')} onClick={() => toggle(s.id)}>{ok ? <CheckCircle2 className="text-primary" /> : <Circle />}</Button>
      <Button variant="outline" className="flex-1 justify-start h-auto py-2 whitespace-normal text-left" onClick={() => open(s.id, s.id === 'daily' ? scene?.id : undefined)}>
        <span className="min-w-0"><b className={ok ? 'line-through opacity-60' : ''}>{s.title}</b><br /><span className="text-xs text-muted-foreground">{s.desc} · {tr('{0} 分钟', s.min)}</span></span>
        <ChevronRight className="ml-auto shrink-0" size={16} />
      </Button>
    </div>; })}</div>
    {n === 4 && <p className="text-sm text-primary mt-3">{tr('今天的路线全部完成！别忘了打卡日历里的 3 次真实跟读。')}</p>}
  </section>;
}
