import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, Circle, Repeat, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { tr } from '@/lib/tr';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';
import { DAILY_EXCHANGES, DAILY_LEVELS, DAILY_LEVEL_LABELS } from '@/lib/advanced/dailyExchanges';

type Speak = (t: string, s?: 'slow' | 'normal' | 'current') => void;
type Line = { en: string; zh: string };
type Turn = { bot: string; botZh: string; altBots?: Line[]; hints?: Line[]; options?: Line[] };
export type Exchange = { id: string; level: string; emoji: string; title: string; titleZh: string; intro: string; introZh: string; featured?: boolean; turns: Turn[] };

export const EXCHANGES = DAILY_EXCHANGES as Exchange[];
const LABELS = DAILY_LEVEL_LABELS as Record<string, string>;
const DONE_KEY = 'sayup-daily-done';

export function readDone(): string[] {
  try { return JSON.parse(localStorage.getItem(DONE_KEY) || '[]'); } catch { return []; }
}
function markDone(id: string) {
  const d = readDone(); if (!d.includes(id)) localStorage.setItem(DONE_KEY, JSON.stringify([...d, id]));
}

function Head({ title, onExit }: { title: string; onExit: () => void }) {
  return <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{title}</span><span className="w-9" /></div>;
}

/** 每日交流：听对方一句 → 选一句回应 → 真实录音达意评分 → 下一轮。 */
export function DailyExchange({ speak, onExit, onRecord, initialId, onFinished }: { speak: Speak; onExit: () => void; onRecord: (r: PracticeRecord) => void; initialId?: string; onFinished?: (id: string) => void }) {
  const [level, setLevel] = useState(() => EXCHANGES.find(e => e.id === initialId)?.level ?? 'a1');
  const [openId, setOpenId] = useState<string | undefined>(initialId);
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => setDone(readDone()), [openId]);
  const scene = EXCHANGES.find(e => e.id === openId);
  if (scene) return <Scene key={scene.id} scene={scene} speak={speak} onRecord={onRecord} onBack={() => setOpenId(undefined)} onFinished={() => { markDone(scene.id); onFinished?.(scene.id); }} />;
  const list = EXCHANGES.filter(e => e.level === level);
  return <div className="adv-hub">
    <Head title={tr('每日交流')} onExit={onExit} />
    <p className="text-sm text-muted-foreground mb-3">{tr('真实生活场景：先听懂对方，再开口回应。说清楚意思就算过关，不追求完美。')}</p>
    <div className="flex flex-wrap gap-1 mb-3">{(DAILY_LEVELS as string[]).map(l => <Button key={l} size="sm" variant={l === level ? 'default' : 'outline'} onClick={() => setLevel(l)}>{tr(LABELS[l] ?? l)}</Button>)}</div>
    <p className="text-xs text-muted-foreground mb-2">{tr('共 {0} 个场景 · 已完成 {1} 个', EXCHANGES.length, done.length)}</p>
    <div className="space-y-2">{list.map(e => <Button key={e.id} variant="ghost" className="weak-card w-full" onClick={() => setOpenId(e.id)}>
      <span className="text-2xl w-9 text-center">{e.emoji}</span>
      <div className="text-left min-w-0"><h3>{e.title}</h3><p>{tr(e.titleZh)} · {tr('{0} 轮', e.turns.length)}</p></div>
      {done.includes(e.id) ? <CheckCircle2 className="ml-auto text-primary" size={18} /> : <ChevronRight className="ml-auto" />}
    </Button>)}</div>
  </div>;
}

function Scene({ scene, speak, onRecord, onBack, onFinished }: { scene: Exchange; speak: Speak; onRecord: (r: PracticeRecord) => void; onBack: () => void; onFinished: () => void }) {
  const [ti, setTi] = useState(0);
  const [alt, setAlt] = useState(0);
  const [pick, setPick] = useState<Line | null>(null);
  const [showZh, setShowZh] = useState(false);
  const [passed, setPassed] = useState<boolean[]>([]);
  const finished = ti >= scene.turns.length;
  const turn = scene.turns[Math.min(ti, scene.turns.length - 1)]!;
  const botLines = useMemo<Line[]>(() => [{ en: turn.bot, zh: turn.botZh }, ...(turn.altBots ?? [])], [turn]);
  const bot = botLines[alt % botLines.length]!;
  const replies = useMemo(() => { const seen = new Set<string>(); return [...(turn.options ?? []), ...(turn.hints ?? [])].filter(l => !seen.has(l.en) && seen.add(l.en)); }, [turn]);
  useEffect(() => { if (finished) onFinished(); }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  if (finished) return <div className="adv-hub">
    <Head title={scene.title} onExit={onBack} />
    <div className="rounded-xl border border-border bg-card p-5 text-center">
      <CheckCircle2 className="mx-auto text-primary mb-2" size={36} />
      <h3 className="font-semibold">{tr('这个场景完成了！')}</h3>
      <p className="text-sm text-muted-foreground mt-1">{tr('真实录音过关 {0} / {1} 轮', passed.filter(Boolean).length, scene.turns.length)}</p>
      <div className="flex gap-2 justify-center mt-4"><Button variant="outline" onClick={() => { setTi(0); setAlt(0); setPick(null); setPassed([]); }}>{tr('再练一遍')}</Button><Button onClick={onBack}>{tr('换个场景')}</Button></div>
    </div>
  </div>;

  return <div className="adv-hub">
    <Head title={scene.title} onExit={onBack} />
    <div className="rounded-lg bg-muted/50 p-3 mb-3 text-sm"><b>{scene.emoji} {tr(scene.titleZh)}</b><p className="text-muted-foreground">{scene.intro}</p><p className="text-xs text-muted-foreground">{tr(scene.introZh)}</p></div>
    <div className="flex gap-1 mb-3">{scene.turns.map((_, i) => <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < ti ? 'bg-primary' : i === ti ? 'bg-primary/50' : 'bg-muted')} />)}</div>
    <div className="rounded-xl border border-border bg-card p-4 mb-3">
      <div className="flex items-start gap-2">
        <div className="flex-1"><span className="text-xs text-muted-foreground">{tr('对方说')}</span><p className="font-semibold text-lg">{bot.en}</p>{showZh && <p className="text-sm text-muted-foreground">{tr(bot.zh)}</p>}</div>
        <Button variant="ghost" size="icon" aria-label={tr('听对方说')} onClick={() => speak(bot.en)}><Volume2 size={18} /></Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <Button size="sm" variant="outline" onClick={() => speak(bot.en, 'slow')}>{tr('慢速听')}</Button>
        {botLines.length > 1 && <Button size="sm" variant="outline" onClick={() => { const n = alt + 1; setAlt(n); speak(botLines[n % botLines.length]!.en); }}><Repeat size={14} /> {tr('换种说法听')}</Button>}
        <Button size="sm" variant="ghost" onClick={() => setShowZh(v => !v)}>{showZh ? tr('隐藏中文') : tr('看中文')}</Button>
      </div>
      {botLines.length > 1 && <p className="text-xs text-muted-foreground mt-2">{tr('真人会换着说法问同一件事，多听几种，听懂才接得上话。')}</p>}
    </div>
    <div className="section-heading"><h2>{tr('你来回应')}</h2><span>{tr('选一句，然后开口说')}</span></div>
    <div className="space-y-2 mb-3">{replies.map(r => <div key={r.en} className="flex gap-2 items-stretch">
      <Button variant={pick?.en === r.en ? 'secondary' : 'outline'} className="flex-1 justify-start h-auto py-2 whitespace-normal text-left" onClick={() => setPick(r)}>
        <span>{pick?.en === r.en ? <CheckCircle2 size={14} className="inline mr-1 text-primary" /> : <Circle size={14} className="inline mr-1" />}<b>{r.en}</b><br /><span className="text-xs text-muted-foreground">{tr(r.zh)}</span></span>
      </Button>
      <Button variant="ghost" size="icon" className="self-center" aria-label={tr('听示范')} onClick={() => speak(r.en)}><Volume2 size={16} /></Button>
    </div>)}</div>
    {pick && <SpeechCoach key={ti + pick.en} target={pick.en} onRecord={onRecord} onPassed={() => setPassed(p => { const n = [...p]; n[ti] = true; return n; })} />}
    <div className="flex gap-2 mt-3">
      <Button className="flex-1" disabled={!pick} onClick={() => { setTi(ti + 1); setAlt(0); setPick(null); setShowZh(false); }}>{ti === scene.turns.length - 1 ? tr('完成场景') : tr('下一轮')}</Button>
    </div>
  </div>;
}
