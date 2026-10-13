import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Pause, Play, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { tr } from '@/lib/tr';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';

type Speak = (t: string, s?: 'slow' | 'normal' | 'current') => void;
type P = { speak: Speak; onExit: () => void; onRecord: (r: PracticeRecord) => void };

function Head({ title, onExit }: { title: string; onExit: () => void }) {
  return <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{title}</span><span className="w-9" /></div>;
}

// ---------- Stress practice: word stress + sentence stress that changes meaning ----------
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
  const [mode, setMode] = useState<'word' | 'sent'>('word');
  const [gi, setGi] = useState(0);
  const [si, setSi] = useState(0);
  const [oi, setOi] = useState<number | null>(null);
  const g = WORD_STRESS[gi]!; const s = SENT_STRESS[si]!;
  const plain = (w: string) => (w.split('|').pop() ?? w).replace(/\s*\(.*\)/, '').replace(/-/g, '').toLowerCase();
  return <div className="adv-hub">
    <Head title={tr('重音练习')} onExit={onExit} />
    <p className="text-sm text-muted-foreground mb-3">{tr('英语靠重音听懂意思：大写的音节要读得更重、更长、更高。')}</p>
    <div className="flex gap-2 mb-3"><Button size="sm" variant={mode === 'word' ? 'default' : 'outline'} onClick={() => setMode('word')}>{tr('单词重音')}</Button><Button size="sm" variant={mode === 'sent' ? 'default' : 'outline'} onClick={() => setMode('sent')}>{tr('句子重音')}</Button></div>
    {mode === 'word' ? <>
      <div className="flex flex-wrap gap-1 mb-3">{WORD_STRESS.map((x, i) => <Button key={x.group} size="sm" variant={i === gi ? 'secondary' : 'ghost'} onClick={() => setGi(i)}>{tr(x.group)}</Button>)}</div>
      <div className="space-y-2">{g.words.map(w => { const show = w.split('|').pop()!; return <div key={w} className="rounded-lg border border-border bg-card p-3 flex items-center gap-2">
        <b className="flex-1 tracking-wide">{show.split(/(-)/).map((p, i) => p === '-' ? <span key={i} className="text-muted-foreground">·</span> : <span key={i} className={cn(p === p.toUpperCase() && /[A-Z]/.test(p) ? 'text-primary text-lg' : 'font-normal')}>{p.toLowerCase()}</span>)}</b>
        <Button variant="ghost" size="icon" aria-label={tr('听示范')} onClick={() => speak(plain(w), 'slow')}><Volume2 size={16} /></Button></div>; })}</div>
    </> : <>
      <div className="flex flex-wrap gap-1 mb-3">{SENT_STRESS.map((x, i) => <Button key={x.base} size="sm" variant={i === si ? 'secondary' : 'ghost'} onClick={() => { setSi(i); setOi(null); }}>{i + 1}</Button>)}</div>
      <div className="rounded-lg border border-border bg-card p-4 mb-3"><b>{s.base}</b><p className="text-xs text-muted-foreground mt-1">{tr('同一句话，重读不同的词，意思就变了。点下面选项看看：')}</p></div>
      <div className="space-y-2 mb-3">{s.options.map((o, i) => <Button key={o.stress} variant={oi === i ? 'secondary' : 'outline'} className="w-full justify-start h-auto py-2 whitespace-normal text-left" onClick={() => { setOi(i); speak(s.base); }}>
        <span><b>{s.base.split(' ').map((w, k) => <span key={k} className={cn(w.replace(/[.?,]/g, '') === o.stress && 'text-primary uppercase')}>{w} </span>)}</b><br /><span className="text-xs text-muted-foreground">{tr(o.meaning)}</span></span></Button>)}</div>
      {oi !== null && <SpeechCoach key={s.base + oi} target={s.base} onPassed={() => {}} onRecord={onRecord} />}
    </>}
  </div>;
}

// ---------- Shadowing: listen line by line, speak right after, then record ----------
const SHADOW: { title: string; level: string; lines: string[] }[] = [
  { title: 'Morning coffee', level: 'A2', lines: ['Good morning! Can I get a small latte, please?', 'Sure. Would you like anything else?', 'No, thanks. Can I pay by card?', 'Of course. That will be four fifty.', 'Here you go. Have a nice day!'] },
  { title: 'First day at work', level: 'A2', lines: ["Hi, I'm Lina. I'm the new designer.", 'Nice to meet you, Lina. I\'m Tom from sales.', 'Where should I put my bag?', 'There is a locker next to the kitchen.', 'Thanks. What time is the team meeting?', "It's at ten, in room three."] },
  { title: 'Asking for directions', level: 'A2', lines: ['Excuse me, is there a subway station near here?', 'Yes, go straight and turn left at the bank.', 'Is it far from here?', "No, it's about five minutes on foot.", 'Thank you so much.', "You're welcome."] },
  { title: 'Weekend plans', level: 'B1', lines: ['Do you have any plans this weekend?', "I'm thinking of going hiking with some friends.", 'That sounds great. Where are you going?', 'A small mountain outside the city.', "If the weather is good, we'll stay for the sunset.", 'Take lots of photos!'] },
  { title: 'A problem at the hotel', level: 'B1', lines: ['Hi, I have a problem with my room.', "The air conditioner isn't working.", "I'm sorry to hear that. What's your room number?", "It's five-oh-two.", "I'll send someone up right away.", 'Could I change rooms if it takes too long?'] },
];

export function ShadowDrill({ speak, onExit, onRecord }: P) {
  const [ti, setTi] = useState(0);
  const [li, setLi] = useState(0);
  const [auto, setAuto] = useState(false);
  const [showText, setShowText] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = SHADOW[ti]!; const line = t.lines[li] ?? '';
  useEffect(() => {
    if (!auto) return;
    speak(line);
    // leave a gap long enough to repeat the line aloud right after the model
    timer.current = setTimeout(() => { if (li + 1 < t.lines.length) setLi(li + 1); else setAuto(false); }, 1500 + line.split(' ').length * 650);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [auto, li, ti]);
  return <div className="adv-hub">
    <Head title={tr('跟读练习')} onExit={onExit} />
    <p className="text-sm text-muted-foreground mb-3">{tr('影子跟读：示范一停就马上跟着说，模仿语调和节奏。熟练后关掉字幕。')}</p>
    <div className="flex flex-wrap gap-1 mb-3">{SHADOW.map((x, i) => <Button key={x.title} size="sm" variant={i === ti ? 'default' : 'outline'} onClick={() => { setTi(i); setLi(0); setAuto(false); }}>{x.title} · {x.level}</Button>)}</div>
    <div className="flex gap-2 mb-3">
      <Button size="sm" onClick={() => setAuto(!auto)}>{auto ? <><Pause size={14} /> {tr('暂停')}</> : <><Play size={14} /> {tr('连续跟读')}</>}</Button>
      <Button size="sm" variant="outline" onClick={() => setShowText(!showText)}>{showText ? <><EyeOff size={14} /> {tr('隐藏字幕')}</> : <><Eye size={14} /> {tr('显示字幕')}</>}</Button>
    </div>
    <div className="space-y-1 mb-3">{t.lines.map((l, i) => <Button key={l} variant={i === li ? 'secondary' : 'ghost'} className="w-full justify-start h-auto py-2 whitespace-normal text-left" onClick={() => { setAuto(false); setLi(i); speak(l); }}>
      <span className="text-xs text-muted-foreground mr-2">{i + 1}</span><span className={cn(!showText && i !== li && 'blur-sm')}>{showText || i === li ? l : l}</span></Button>)}</div>
    {!auto && <><p className="text-xs text-muted-foreground mb-1">{tr('录一遍这一句，看看哪里不像：')}</p><SpeechCoach key={ti + '-' + li} target={line} onPassed={() => setLi(Math.min(li + 1, t.lines.length - 1))} onRecord={onRecord} /></>}
  </div>;
}

// ---------- Immersion: listen first without text, answer, then read and retell ----------
const IMMERSE: { title: string; text: string; qs: { q: string; options: string[]; a: number }[]; retell: string }[] = [
  { title: 'A busy Monday', text: "Anna works in a small office in the city. On Monday she woke up late because her phone didn't ring. She missed the bus, so she took a taxi. When she arrived, the meeting had already started. Her boss smiled and said, 'Don't worry, we just started.' After work, Anna bought a new alarm clock.", qs: [
    { q: 'Why did Anna wake up late?', options: ['She was sick', "Her phone didn't ring", 'She worked late'], a: 1 },
    { q: 'How did she go to work?', options: ['By bus', 'By taxi', 'On foot'], a: 1 },
    { q: 'What did she buy after work?', options: ['An alarm clock', 'A new phone', 'A bus ticket'], a: 0 }], retell: 'Anna woke up late, took a taxi, and bought an alarm clock.' },
  { title: 'Dinner with friends', text: "Last Friday, Ken invited three friends to his apartment for dinner. He wanted to cook pasta, but he forgot to buy tomatoes. His friend Mia brought some from her garden. They cooked together, talked for hours, and played cards until midnight. Ken said it was the best evening of the month.", qs: [
    { q: 'What did Ken forget to buy?', options: ['Pasta', 'Tomatoes', 'Cards'], a: 1 },
    { q: 'Where were the tomatoes from?', options: ["Mia's garden", 'The supermarket', "Ken's mother"], a: 0 },
    { q: 'How long did they play cards?', options: ['One hour', 'Until midnight', 'All night'], a: 1 }], retell: 'Ken forgot tomatoes, Mia brought some, and they cooked together.' },
  { title: 'Moving to a new city', text: "Leo moved to Osaka for a new job. At first, he felt lonely because he didn't know anyone. Then he joined a running club near his home. Every Sunday morning they run along the river and have breakfast together. Now Leo has many friends, and his Japanese is getting better too.", qs: [
    { q: 'Why did Leo move?', options: ['For school', 'For a new job', 'For his family'], a: 1 },
    { q: 'What helped him make friends?', options: ['A running club', 'A language school', 'His boss'], a: 0 },
    { q: 'When does the club meet?', options: ['Every evening', 'Saturday night', 'Sunday morning'], a: 2 }], retell: 'Leo moved for work, joined a running club, and made many friends.' },
];

export function ImmersionDrill({ speak, onExit, onRecord }: P) {
  const [i, setI] = useState(0);
  const [step, setStep] = useState<'listen' | 'quiz' | 'read'>('listen');
  const [ans, setAns] = useState<Record<number, number>>({});
  const s = IMMERSE[i]!;
  const right = s.qs.filter((q, k) => ans[k] === q.a).length;
  return <div className="adv-hub">
    <Head title={tr('沉浸练习')} onExit={onExit} />
    <p className="text-sm text-muted-foreground mb-3">{tr('像在国外生活一样：先只听不看，再答题，最后看原文并用自己的话复述。')}</p>
    <div className="flex flex-wrap gap-1 mb-3">{IMMERSE.map((x, k) => <Button key={x.title} size="sm" variant={k === i ? 'default' : 'outline'} onClick={() => { setI(k); setStep('listen'); setAns({}); }}>{x.title}</Button>)}</div>
    <div className="flex gap-1 mb-3 text-xs">{(['listen', 'quiz', 'read'] as const).map((k, n) => <span key={k} className={cn('level-tag', step === k && 'ring-1 ring-primary text-primary font-semibold')}>{n + 1}. {tr(k === 'listen' ? '盲听' : k === 'quiz' ? '答题' : '看原文 · 复述')}</span>)}</div>
    {step === 'listen' && <div className="rounded-lg border border-border bg-card p-4 space-y-2">
      <p className="text-sm">{tr('先别看字，听 2 遍，抓住人物、事情和结果。')}</p>
      <div className="flex gap-2"><Button size="sm" onClick={() => speak(s.text, 'slow')}><Volume2 size={14} /> {tr('慢速听')}</Button><Button size="sm" variant="outline" onClick={() => speak(s.text, 'normal')}><Volume2 size={14} /> {tr('正常速听')}</Button></div>
      <Button className="w-full" onClick={() => setStep('quiz')}>{tr('听完了，去答题')}</Button></div>}
    {step === 'quiz' && <div className="space-y-3">{s.qs.map((q, k) => <div key={q.q} className="rounded-lg border border-border bg-card p-3"><b className="text-sm">{q.q}</b>
      <div className="grid gap-1 mt-2">{q.options.map((o, n) => <Button key={o} size="sm" variant={ans[k] === undefined ? 'outline' : n === q.a ? 'default' : ans[k] === n ? 'destructive' : 'outline'} disabled={ans[k] !== undefined} onClick={() => setAns({ ...ans, [k]: n })}>{o}</Button>)}</div></div>)}
      {Object.keys(ans).length === s.qs.length && <><p className="text-sm">{tr('答对 {0} / {1}', String(right), String(s.qs.length))}</p><Button className="w-full" onClick={() => setStep('read')}>{tr('看原文')}</Button></>}</div>}
    {step === 'read' && <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-4"><p className="text-sm leading-relaxed">{s.text}</p><Button size="sm" variant="ghost" className="mt-2" onClick={() => speak(s.text)}><Volume2 size={14} /> {tr('再听一遍')}</Button></div>
      <p className="text-xs text-muted-foreground">{tr('用一句话复述（可以参考这句）：')}</p>
      <SpeechCoach key={s.retell} target={s.retell} onPassed={() => {}} onRecord={onRecord} />
    </div>}
  </div>;
}
