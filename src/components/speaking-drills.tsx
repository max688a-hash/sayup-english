import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Pause, Play, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { tr } from '@/lib/tr';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';
import { REPEAT_DRILLS } from '@/lib/advanced/repeatDrills';
import { STRESS_DRILLS, STRESS_LEVELS } from '@/lib/advanced/stressDrills';
import { TPRS_STORIES } from '@/lib/advanced/tprsStories';

type Speak = (t: string, s?: 'slow' | 'normal' | 'current') => void;
type P = { speak: Speak; onExit: () => void; onRecord: (r: PracticeRecord) => void };
const A = (x: unknown) => x as any[];

function Head({ title, onExit }: { title: string; onExit: () => void }) {
  return <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{title}</span><span className="w-9" /></div>;
}

// ---------- Stress practice: word stress, meaning stress, and original sentence-beat drills ----------
const WORD_STRESS: { group: string; words: string[] }[] = [
  { group: '同根词重音会移动', words: ['PHO-to-graph', 'pho-TO-gra-pher', 'pho-to-GRA-phic', 'e-CO-no-my', 'e-co-NO-mic'] },
  { group: '名词前重，动词后重', words: ['PRE-sent (礼物)', 'pre-SENT (呈现)', 'RE-cord (记录)', 're-CORD (录制)', 'OB-ject (物体)', 'ob-JECT (反对)'] },
  { group: '工作常用词', words: ['MEE-ting', 'COM-pa-ny', 'MA-na-ger', 'de-VE-lop', 'PRE-sen-TA-tion', 'IN-ter-view', 're-PORT', 'SCHE-dule'] },
  { group: '生活常用词', words: ['BA-na-na', 'to-MA-to', 'ho-TEL', 'COF-fee', 'res-TAU-rant', 'su-per-MAR-ket', 'be-CAUSE'] },
];
const SENT_STRESS: { base: string; options: { stress: string; meaning: string }[] }[] = [
  { base: "I didn't say she took the money.", options: [
    { stress: 'I', meaning: '不是我说的，是别人说的' }, { stress: "didn't", meaning: '我根本没这么说' }, { stress: 'she', meaning: '是别人拿的，不是她' }, { stress: 'money', meaning: '她拿的是别的东西' }] },
  { base: 'Can you call me tomorrow?', options: [
    { stress: 'you', meaning: '要你打，不是别人' }, { stress: 'me', meaning: '打给我，不是打给他' }, { stress: 'tomorrow', meaning: '明天打，不是今天' }] },
  { base: 'I want the blue one.', options: [
    { stress: 'I', meaning: '是我要，不是他要' }, { stress: 'blue', meaning: '要蓝色的，不是红色的' }, { stress: 'one', meaning: '只要一个' }] },
];

export function StressDrill({ speak, onExit, onRecord }: P) {
  const [mode, setMode] = useState<'word' | 'sent' | 'beats'>('beats');
  const [gi, setGi] = useState(0);
  const [si, setSi] = useState(0);
  const [oi, setOi] = useState<number | null>(null);
  const [level, setLevel] = useState<string>(A(STRESS_LEVELS)[0] ?? 'A2');
  const [bi, setBi] = useState(0);
  const g = WORD_STRESS[gi]!; const s = SENT_STRESS[si]!;
  const beats = A(STRESS_DRILLS).filter(d => d.level === level);
  const d = beats[Math.min(bi, beats.length - 1)];
  const plain = (w: string) => (w.split('|').pop() ?? w).replace(/\s*\(.*\)/, '').replace(/-/g, '').toLowerCase();
  return <div className="adv-hub">
    <Head title={tr('重音练习')} onExit={onExit} />
    <p className="text-sm text-muted-foreground mb-3">{tr('英语靠重音听懂意思：重读的词更大、更长、更高，轻读的词一带而过。')}</p>
    <div className="flex flex-wrap gap-2 mb-3">
      <Button size="sm" variant={mode === 'beats' ? 'default' : 'outline'} onClick={() => setMode('beats')}>{tr('句子节拍')}</Button>
      <Button size="sm" variant={mode === 'word' ? 'default' : 'outline'} onClick={() => setMode('word')}>{tr('单词重音')}</Button>
      <Button size="sm" variant={mode === 'sent' ? 'default' : 'outline'} onClick={() => setMode('sent')}>{tr('重音变意思')}</Button>
    </div>
    {mode === 'beats' && <>
      <div className="flex flex-wrap gap-2 mb-3">{A(STRESS_LEVELS).map(l => <Button key={l} size="sm" variant={l === level ? 'default' : 'outline'} onClick={() => { setLevel(l); setBi(0); }}>{l}</Button>)}</div>
      {d && <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex flex-wrap gap-x-1.5 gap-y-1 text-xl">{A(d.beats).map((b: { word: string; stressed: boolean; schwa?: boolean }, k: number) => <span key={k} className={cn(b.stressed ? 'font-bold text-primary' : 'text-muted-foreground text-base', b.schwa && 'italic')}>{b.word}</span>)}</div>
        <p className="text-sm">{tr('实际说成')}：<b>{d.spoken}</b></p>
        <p className="text-sm text-muted-foreground">{d.zh}</p>
        {A(d.liaisons).map((l: { note: string }, k: number) => <p key={k} className="text-xs rounded bg-muted p-2">{l.note}</p>)}
        <div className="flex gap-2"><Button size="sm" onClick={() => speak(d.en)}><Volume2 size={14} /> {tr('听示范')}</Button><Button size="sm" variant="outline" onClick={() => speak(d.en, 'slow')}>{tr('慢速')}</Button></div>
        <SpeechCoach key={d.id} target={d.en} onPassed={() => {}} onRecord={onRecord} />
        <div className="grid grid-cols-2 gap-2"><Button variant="outline" disabled={bi === 0} onClick={() => setBi(bi - 1)}>{tr('上一句')}</Button><Button disabled={bi >= beats.length - 1} onClick={() => setBi(bi + 1)}>{tr('下一句')}</Button></div>
        <p className="text-xs text-muted-foreground text-center">{bi + 1} / {beats.length}</p>
      </div>}
    </>}
    {mode === 'word' && <>
      <div className="flex flex-wrap gap-1 mb-3">{WORD_STRESS.map((x, i) => <Button key={x.group} size="sm" variant={i === gi ? 'secondary' : 'ghost'} onClick={() => setGi(i)}>{tr(x.group)}</Button>)}</div>
      <div className="space-y-2">{g.words.map(w => { const show = w.split('|').pop()!; return <div key={w} className="rounded-lg border border-border bg-card p-3 flex items-center gap-2">
        <b className="flex-1 tracking-wide">{show.split(/(-)/).map((p, i) => p === '-' ? <span key={i} className="text-muted-foreground">·</span> : <span key={i} className={cn(p === p.toUpperCase() && /[A-Z]/.test(p) ? 'text-primary text-lg' : 'font-normal')}>{p.toLowerCase()}</span>)}</b>
        <Button variant="ghost" size="icon" aria-label={tr('听示范')} onClick={() => speak(plain(w), 'slow')}><Volume2 size={16} /></Button></div>; })}</div>
    </>}
    {mode === 'sent' && <>
      <div className="flex flex-wrap gap-1 mb-3">{SENT_STRESS.map((x, i) => <Button key={x.base} size="sm" variant={i === si ? 'secondary' : 'ghost'} onClick={() => { setSi(i); setOi(null); }}>{i + 1}</Button>)}</div>
      <div className="rounded-lg border border-border bg-card p-4 mb-3"><b>{s.base}</b><p className="text-xs text-muted-foreground mt-1">{tr('同一句话，重读不同的词，意思就变了。点下面选项看看：')}</p></div>
      <div className="space-y-2 mb-3">{s.options.map((o, i) => <Button key={o.stress} variant={oi === i ? 'secondary' : 'outline'} className="w-full justify-start h-auto py-2 whitespace-normal text-left" onClick={() => { setOi(i); speak(s.base); }}>
        <span><b>{s.base.split(' ').map((w, k) => <span key={k} className={cn(w.replace(/[.?,]/g, '') === o.stress && 'text-primary uppercase')}>{w} </span>)}</b><br /><span className="text-xs text-muted-foreground">{tr(o.meaning)}</span></span></Button>)}</div>
      {oi !== null && <SpeechCoach key={s.base + oi} target={s.base} onPassed={() => {}} onRecord={onRecord} />}
    </>}
  </div>;
}

// ---------- Shadowing: original repeat drills — phrase + rhythm + possible replies ----------
const SHADOW_LEVELS = ['a1', 'a2', 'b1', 'b2'];

export function ShadowDrill({ speak, onExit, onRecord }: P) {
  const [level, setLevel] = useState('a1');
  const [scene, setScene] = useState<string | null>(null);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(false);
  const [showText, setShowText] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const levelList = A(REPEAT_DRILLS).filter(x => String(x.level).toLowerCase() === level);
  const scenes = Array.from(new Set(levelList.map(x => String(x.scene)))) as string[];
  const list = scene ? levelList.filter(x => String(x.scene) === scene) : levelList;
  const d = list[Math.min(i, list.length - 1)];
  const line: string = d?.phrase ?? '';
  useEffect(() => {
    if (!auto || !d) return;
    speak(line);
    timer.current = setTimeout(() => { if (i + 1 < list.length) setI(i + 1); else setAuto(false); }, 1500 + line.split(' ').length * 650);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [auto, i, level]);
  return <div className="adv-hub">
    <Head title={tr('跟读练习')} onExit={onExit} />
    <p className="text-sm text-muted-foreground mb-3">{tr('影子跟读：示范一停就马上跟着说，模仿语调和节奏。熟练后隐藏文字。共 {0} 句。', String(A(REPEAT_DRILLS).length))}</p>
    <div className="flex flex-wrap gap-2 mb-3">{SHADOW_LEVELS.map(l => <Button key={l} size="sm" variant={l === level ? 'default' : 'outline'} onClick={() => { setLevel(l); setScene(null); setI(0); setAuto(false); }}>{l.toUpperCase()}</Button>)}</div>
    <div className="flex flex-wrap gap-1 mb-3"><Button size="sm" variant={scene === null ? 'secondary' : 'ghost'} onClick={() => { setScene(null); setI(0); setAuto(false); }}>{tr('全部场景')}</Button>{scenes.map(s => <Button key={s} size="sm" variant={scene === s ? 'secondary' : 'ghost'} onClick={() => { setScene(s); setI(0); setAuto(false); }}>{s}</Button>)}</div>
    <div className="flex gap-2 mb-3">
      <Button size="sm" onClick={() => setAuto(!auto)}>{auto ? <><Pause size={14} /> {tr('暂停')}</> : <><Play size={14} /> {tr('连续跟读')}</>}</Button>
      <Button size="sm" variant="outline" onClick={() => setShowText(!showText)}>{showText ? <><EyeOff size={14} /> {tr('隐藏文字')}</> : <><Eye size={14} /> {tr('显示文字')}</>}</Button>
    </div>
    {d && <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <p className="text-xs text-muted-foreground">{tr('场景')}：{d.scene} · {d.category} · {i + 1}/{list.length}</p>
      <p className={cn('text-lg font-semibold', !showText && 'blur-sm select-none')} onClick={() => !showText && setShowText(true)}>{d.phrase}</p>
      {showText && <p className="text-sm text-muted-foreground">{d.zh}</p>}
      <div className="rounded-xl bg-muted p-3 text-sm"><p>{tr('节奏')}：<b className="tracking-widest">{d.rhythm}</b>（● {tr('重读')} ○ {tr('轻读')}）</p><p className="mt-1">{d.tips}</p></div>
      <div className="flex gap-2"><Button size="sm" onClick={() => speak(d.phrase)}><Volume2 size={14} /> {tr('听示范')}</Button><Button size="sm" variant="outline" onClick={() => speak(d.phrase, 'slow')}>{tr('慢速')}</Button></div>
      {!auto && <SpeechCoach key={d.id} target={d.phrase} onPassed={() => setI(Math.min(i + 1, list.length - 1))} onRecord={onRecord} />}
      {A(d.responses).length > 0 && <div className="space-y-1"><p className="text-sm font-medium">{tr('对方可能这样回你')}</p>{A(d.responses).map((r: string) => <div key={r} className="flex items-center gap-2 text-sm"><span className="flex-1">{r}</span><Button variant="ghost" size="icon" className="h-7 w-7" aria-label={tr('听示范')} onClick={() => speak(r)}><Volume2 size={14} /></Button></div>)}</div>}
      <div className="grid grid-cols-2 gap-2"><Button variant="outline" disabled={i === 0} onClick={() => { setAuto(false); setI(i - 1); }}>{tr('上一句')}</Button><Button disabled={i >= list.length - 1} onClick={() => { setAuto(false); setI(i + 1); }}>{tr('下一句')}</Button></div>
    </div>}
  </div>;
}

// ---------- Immersion: original TPRS stories — listen blind, answer, read and retell ----------
type Story = { cefr: string; titleEn: string; titleZh: string; sentences: { en: string; zh: string; keyPhrase: string | null }[]; circling: { question: string; choices: string[]; answer: string }[] };
const STORIES = A(TPRS_STORIES) as Story[];
const IMMERSE = STORIES.map(s => ({
  title: s.titleEn, zh: s.titleZh, level: s.cefr,
  text: s.sentences.map(x => x.en).join(' '),
  qs: s.circling.slice(0, 4).map(c => ({ q: c.question, options: c.choices, a: Math.max(0, c.choices.indexOf(c.answer)) })),
  retell: (s.sentences.filter(x => x.keyPhrase).map(x => x.en).join(' ') || s.sentences.slice(0, 2).map(x => x.en).join(' ')),
})).filter(s => s.qs.length > 0);

export function ImmersionDrill({ speak, onExit, onRecord }: P) {
  const [level, setLevel] = useState('A1');
  const [i, setI] = useState(0);
  const [step, setStep] = useState<'listen' | 'quiz' | 'read'>('listen');
  const [ans, setAns] = useState<Record<number, number>>({});
  const levels = Array.from(new Set(IMMERSE.map(x => x.level.toUpperCase()))).sort();
  const list = IMMERSE.filter(x => x.level.toUpperCase() === level);
  const s = list[Math.min(i, list.length - 1)] ?? IMMERSE[0]!;
  const right = s.qs.filter((q, k) => ans[k] === q.a).length;
  return <div className="adv-hub">
    <Head title={tr('沉浸练习')} onExit={onExit} />
    <p className="text-sm text-muted-foreground mb-3">{tr('像在国外生活一样：先只听不看，再答题，最后看原文并用自己的话复述。共 {0} 篇。', String(IMMERSE.length))}</p>
    <div className="flex flex-wrap gap-2 mb-2">{levels.map(l => <Button key={l} size="sm" variant={l === level ? 'default' : 'outline'} onClick={() => { setLevel(l); setI(0); setStep('listen'); setAns({}); }}>{l}</Button>)}</div>
    <div className="flex flex-wrap gap-1 mb-3">{list.map((x, k) => <Button key={x.title} size="sm" variant={x === s ? 'secondary' : 'ghost'} onClick={() => { setI(k); setStep('listen'); setAns({}); }}>{x.title}</Button>)}</div>
    <div className="flex gap-1 mb-3 text-xs">{(['listen', 'quiz', 'read'] as const).map((k, n) => <span key={k} className={cn('level-tag', step === k && 'ring-1 ring-primary text-primary font-semibold')}>{n + 1}. {tr(k === 'listen' ? '盲听' : k === 'quiz' ? '答题' : '看原文 · 复述')}</span>)}</div>
    {step === 'listen' && <div className="rounded-lg border border-border bg-card p-4 space-y-2">
      <p className="text-sm font-semibold">{s.zh}</p>
      <p className="text-sm">{tr('先别看字，听 2 遍，抓住人物、事情和结果。')}</p>
      <div className="flex gap-2"><Button size="sm" onClick={() => speak(s.text, 'slow')}><Volume2 size={14} /> {tr('慢速听')}</Button><Button size="sm" variant="outline" onClick={() => speak(s.text, 'normal')}><Volume2 size={14} /> {tr('正常速听')}</Button></div>
      <Button className="w-full" onClick={() => setStep('quiz')}>{tr('听完了，去答题')}</Button></div>}
    {step === 'quiz' && <div className="space-y-3">{s.qs.map((q, k) => <div key={q.q} className="rounded-lg border border-border bg-card p-3"><b className="text-sm">{q.q}</b>
      <div className="grid gap-1 mt-2">{q.options.map((o, n) => <Button key={o} size="sm" variant={ans[k] === undefined ? 'outline' : n === q.a ? 'default' : ans[k] === n ? 'destructive' : 'outline'} disabled={ans[k] !== undefined} onClick={() => setAns({ ...ans, [k]: n })}>{o}</Button>)}</div></div>)}
      {Object.keys(ans).length === s.qs.length && <><p className="text-sm">{tr('答对 {0} / {1}', String(right), String(s.qs.length))}</p><Button className="w-full" onClick={() => setStep('read')}>{tr('看原文')}</Button></>}</div>}
    {step === 'read' && <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-4"><p className="text-sm leading-relaxed">{s.text}</p><Button size="sm" variant="ghost" className="mt-2" onClick={() => speak(s.text)}><Volume2 size={14} /> {tr('再听一遍')}</Button></div>
      <p className="text-xs text-muted-foreground">{tr('用自己的话复述（可以参考这句）：')}</p>
      <SpeechCoach key={s.retell} target={s.retell} onPassed={() => {}} onRecord={onRecord} />
    </div>}
  </div>;
}
