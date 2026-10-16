import { useMemo, useState } from 'react';
import { ArrowLeft, ChevronRight, Repeat, Volume2, Snail, BookOpen, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { tr } from '@/lib/tr';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';
import { VOCAB_THEMES } from '@/lib/advanced/vocabCorpus';
import { VOCAB_THEMES_2 } from '@/lib/advanced/vocabCorpus2';
import { VOCAB_THEMES_3 } from '@/lib/advanced/vocabCorpus3';
import { VOCAB_THEMES_4 } from '@/lib/advanced/vocabCorpus4';
import { VOCAB_THEMES_5 } from '@/lib/advanced/vocabCorpus5';
import { VOCAB_EXAMPLES_A2_REVIEWED } from '@/lib/advanced/vocabExamples_a2_reviewed';
import { VOCAB_EXAMPLES_B1_REVIEWED } from '@/lib/advanced/vocabExamples_b1_reviewed';
import { VOCAB_EXAMPLES_B2_REVIEWED } from '@/lib/advanced/vocabExamples_b2_reviewed';
import { VOCAB_EXAMPLES_C1_REVIEWED } from '@/lib/advanced/vocabExamples_c1_reviewed';
import { getIPA } from '@/lib/advanced/wordIPA';
import { DAILY_EXCHANGES } from '@/lib/advanced/dailyExchanges';
import { TPRS_STORIES } from '@/lib/advanced/tprsStories';

type Speak = (t: string, s?: 'slow' | 'normal' | 'current') => void;
type Word = { w: string; z: string };
type Theme = { id: string; level: string; theme: string; themeZh: string; emoji?: string; words: Word[] };
type Ctx = { en: string; zh: string; src: string };

const LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1'];
const seen = new Set<string>();
export const THEMES: Theme[] = ([...VOCAB_THEMES, ...VOCAB_THEMES_2, ...VOCAB_THEMES_3, ...VOCAB_THEMES_4, ...VOCAB_THEMES_5] as Theme[])
  .filter(t => t?.id && Array.isArray(t.words) && !seen.has(t.id) && seen.add(t.id));
const EXAMPLES: Record<string, { ex: string; exZh: string }> = { ...VOCAB_EXAMPLES_A2_REVIEWED, ...VOCAB_EXAMPLES_B1_REVIEWED, ...VOCAB_EXAMPLES_B2_REVIEWED, ...VOCAB_EXAMPLES_C1_REVIEWED };

/** 全 App 句子池：每日交流 + 故事阅读。单词复习从这里找"真实语境"。 */
let POOL: Ctx[] | null = null;
function pool(): Ctx[] {
  if (POOL) return POOL;
  const out: Ctx[] = [];
  for (const s of DAILY_EXCHANGES as any[]) for (const t of s.turns ?? []) {
    const src = `${tr('每日交流')} · ${s.titleZh ?? s.title}`;
    if (t.bot) out.push({ en: t.bot, zh: t.botZh ?? '', src });
    for (const l of [...(t.altBots ?? []), ...(t.options ?? []), ...(t.hints ?? [])]) if (l?.en) out.push({ en: l.en, zh: l.zh ?? '', src });
  }
  for (const st of TPRS_STORIES as any[]) for (const l of st.sentences ?? []) if (l?.en) out.push({ en: l.en, zh: l.zh ?? '', src: `${tr('故事阅读')} · ${st.titleZh ?? st.title ?? ''}` });
  return (POOL = out);
}
function contexts(w: string): Ctx[] {
  const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  const res: Ctx[] = []; const u = new Set<string>();
  for (const c of pool()) { if (re.test(c.en) && !u.has(c.en)) { u.add(c.en); res.push(c); if (res.length >= 3) break; } }
  return res;
}
function ipa(w: string): string { try { return w.split(' ').map(p => (getIPA(p) || '').replace(/^\/|\/$/g, '')).filter(Boolean).join(' '); } catch { return ''; } }

/* 间隔复习：盒子 0–5，间隔 0/1/2/4/7/15 天 */
const KEY = 'sayup-vocab-srs';
const GAP = [0, 1, 2, 4, 7, 15];
type Srs = Record<string, { b: number; due: number }>;
function load(): Srs { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } }
function save(s: Srs) { localStorage.setItem(KEY, JSON.stringify(s)); }
const today = () => Math.floor(Date.now() / 86400000);

function Head({ title, onExit }: { title: string; onExit: () => void }) {
  return <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{title}</span><span className="w-9" /></div>;
}

export function VocabReview({ speak, onExit, onRecord }: { speak: Speak; onExit: () => void; onRecord: (r: PracticeRecord) => void }) {
  const [srs, setSrs] = useState<Srs>(() => (typeof window === 'undefined' ? {} : load()));
  const [level, setLevel] = useState('a1');
  const [queue, setQueue] = useState<{ words: Word[]; title: string } | null>(null);
  const total = useMemo(() => THEMES.reduce((n, t) => n + t.words.length, 0), []);
  const mastered = Object.values(srs).filter(x => x.b >= 4).length;
  const due = useMemo(() => { const d = today(); const all = THEMES.flatMap(t => t.words); return all.filter(w => (srs[w.w]?.due ?? Infinity) <= d); }, [srs]);

  function rate(w: string, ok: 0 | 1 | 2) {
    const cur = srs[w]?.b ?? 0; const b = ok === 0 ? 0 : ok === 1 ? Math.max(1, cur) : Math.min(5, cur + 1);
    const n = { ...srs, [w]: { b, due: today() + (GAP[b] ?? 15) } }; setSrs(n); save(n);
  }

  if (queue) return <Session title={queue.title} words={queue.words} srs={srs} speak={speak} onRecord={onRecord} onRate={rate} onExit={() => setQueue(null)} />;

  const themes = THEMES.filter(t => t.level === level);
  return <div className="space-y-4">
    <Head title={tr('词汇复习')} onExit={onExit} />
    <div className="tip-panel"><BookOpen size={18} /><div><b>{tr('单词放进句子里记')}</b><p>{tr('每个词都配例句，并从每日交流、故事阅读里找出它真实出现的句子；说出整句才算会用。')}</p></div></div>
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="rounded-xl border border-border p-2"><b className="block text-lg">{total}</b><span className="text-xs text-muted-foreground">{tr('词库总量')}</span></div>
      <div className="rounded-xl border border-border p-2"><b className="block text-lg">{Object.keys(srs).length}</b><span className="text-xs text-muted-foreground">{tr('已学')}</span></div>
      <div className="rounded-xl border border-border p-2"><b className="block text-lg">{mastered}</b><span className="text-xs text-muted-foreground">{tr('已掌握')}</span></div>
    </div>
    <Button className="w-full" disabled={!due.length} onClick={() => setQueue({ title: tr('今日复习'), words: due.slice(0, 20) })}><Repeat size={16} /> {due.length ? `${tr('今日复习')} · ${Math.min(20, due.length)} ${tr('个词')}` : tr('今天没有到期的词，去学新词吧')}</Button>
    <div className="flex gap-2">{LEVELS.map(l => <Button key={l} size="sm" variant={l === level ? 'default' : 'outline'} onClick={() => setLevel(l)}>{l.toUpperCase()}</Button>)}</div>
    <div className="weak-list">{themes.map(t => {
      const learned = t.words.filter(w => srs[w.w]).length;
      return <Button key={t.id} variant="ghost" className="weak-card" onClick={() => { const fresh = t.words.filter(w => !srs[w.w]); setQueue({ title: t.themeZh, words: (fresh.length ? fresh : t.words).slice(0, 10) }); }}>
        <span className="topic-icon tone-1">{t.emoji ?? '🌱'}</span>
        <div className="text-left flex-1"><h3>{t.themeZh}</h3><p>{t.theme} · {learned}/{t.words.length}</p><div className="mt-1 h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${(learned / t.words.length) * 100}%` }} /></div></div>
        <ChevronRight className="ml-auto" />
      </Button>;
    })}</div>
  </div>;
}

function Session({ title, words, srs, speak, onRecord, onRate, onExit }: { title: string; words: Word[]; srs: Srs; speak: Speak; onRecord: (r: PracticeRecord) => void; onRate: (w: string, ok: 0 | 1 | 2) => void; onExit: () => void }) {
  const [i, setI] = useState(0);
  const [reveal, setReveal] = useState(false);
  const w = words[i];
  const ctx = useMemo(() => (w ? contexts(w.w) : []), [w]);
  if (!w) return <div className="space-y-4"><Head title={title} onExit={onExit} /><div className="tip-panel"><Repeat size={18} /><div><b>{tr('这一组完成了')}</b><p>{tr('按记忆情况自动安排下次复习：不认识的明天再见，熟悉的间隔会越来越长。')}</p></div></div><Button className="w-full" onClick={onExit}>{tr('返回词库')}</Button></div>;
  const ex = EXAMPLES[w.w.toLowerCase()];
  const target = ex?.ex ?? ctx[0]?.en ?? w.w;
  const ph = ipa(w.w);
  const next = (ok: 0 | 1 | 2) => { onRate(w.w, ok); setReveal(false); setI(i + 1); };
  return <div className="space-y-4">
    <Head title={`${title} · ${i + 1}/${words.length}`} onExit={onExit} />
    <div className="rounded-2xl border border-border bg-card p-5 text-center">
      <h2 className="text-3xl font-semibold">{w.w}</h2>
      {ph && <p className="mt-1 text-muted-foreground">/{ph}/</p>}
      <div className="mt-3 flex justify-center gap-2">
        <Button size="sm" variant="outline" onClick={() => speak(w.w, 'normal')}><Volume2 size={15} /> {tr('发音')}</Button>
        <Button size="sm" variant="outline" onClick={() => speak(w.w, 'slow')}><Snail size={15} /> {tr('慢速')}</Button>
      </div>
      {srs[w.w] && <p className="mt-2 text-xs text-muted-foreground">{tr("记忆等级")} {srs[w.w]?.b}/5</p>}
      {reveal ? <p className="mt-3 text-lg">{w.z}</p> : <Button className="mt-4" variant="secondary" onClick={() => setReveal(true)}>{tr('先想一想，再看意思')}</Button>}
    </div>
    {reveal && <>
      {ex && <div className="rounded-xl border border-border p-3"><div className="flex items-start gap-2"><Button size="icon" variant="ghost" aria-label={tr('播放例句')} onClick={() => speak(ex.ex, 'current')}><Volume2 size={16} /></Button><div><p>{ex.ex}</p><p className="text-sm text-muted-foreground">{ex.exZh}</p></div></div></div>}
      {ctx.length > 0 && <div className="space-y-2"><p className="text-sm font-medium flex items-center gap-1"><MessageCircle size={14} /> {tr('它在 App 里真实出现的句子')}</p>
        {ctx.map(c => <div key={c.en} className="rounded-xl border border-border p-3 flex items-start gap-2"><Button size="icon" variant="ghost" aria-label={tr('播放')} onClick={() => speak(c.en, 'current')}><Volume2 size={16} /></Button><div><p>{c.en}</p>{c.zh && <p className="text-sm text-muted-foreground">{c.zh}</p>}<p className="text-xs text-primary mt-1">{c.src}</p></div></div>)}
      </div>}
      <p className="text-sm font-medium">{tr('开口说整句')}</p>
      <SpeechCoach key={target} target={target} onRecord={onRecord} onPassed={() => {}} />
      <div className="grid grid-cols-3 gap-2">
        <Button variant="outline" className={cn('border-destructive/40')} onClick={() => next(0)}>{tr('不认识')}</Button>
        <Button variant="outline" onClick={() => next(1)}>{tr('模糊')}</Button>
        <Button onClick={() => next(2)}>{tr('认识')}</Button>
      </div>
    </>}
  </div>;
}
