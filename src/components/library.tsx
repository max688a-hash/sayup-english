import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChevronRight, Volume2, Snail, Plus, Check, Timer, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { tr } from '@/lib/tr';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';
import { addToReview } from '@/components/vocab-review';
import { LIFE_SCENES, SCENE_CATEGORIES } from '@/lib/advanced/lifeScenes';
import { ROLE_PLAY_DIALOGUES } from '@/lib/advanced/rolePlayDialogues';
import { DIALOGUES } from '@/lib/advanced/dialogues';
import { SENTENCE_PATTERN_FAMILIES, PATTERN_LEVEL_LABELS } from '@/lib/advanced/sentencePatterns';
import { REPEAT_DRILLS } from '@/lib/advanced/repeatDrills';
import { ALL_CLOZE_PASSAGES } from '@/lib/advanced/clozePassages';
import { FREE_SPEAK_PROMPTS, PROMPT_CATEGORIES } from '@/lib/advanced/freeSpeakPrompts';
import { READING_MATERIALS, FREQ_BANDS } from '@/lib/advanced/readingMaterials';
import { ALL_GROUPS, TIER_META, TIER_ORDER } from '@/lib/advanced/wordSets';
import { AI_BOTS } from '@/lib/advanced/aiBots';
import { PHRASE_CHUNKS } from '@/lib/advanced/phraseChunks';
import { STRESS_DRILLS } from '@/lib/advanced/stressDrills';
import { WORD_IMAGES } from '@/lib/word-images';
import { CARDS } from '@/components/speaking-gym';

type Speak = (t: string, s?: 'slow' | 'normal' | 'current') => void;
type P = { speak: Speak; onRecord: (r: PracticeRecord) => void };
export type LibKind = 'scenes' | 'patterns' | 'repeat' | 'cloze' | 'free' | 'reading' | 'words' | 'bots' | 'phrases' | 'beats';
const A = (x: unknown) => x as any[];

function Head({ title, onExit }: { title: string; onExit: () => void }) {
  return <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{title}</span><span className="w-9" /></div>;
}
function Levels({ list, value, onChange }: { list: string[]; value: string; onChange: (v: string) => void }) {
  return <div className="flex flex-wrap gap-2">{list.map(l => <Button key={l} size="sm" variant={l === value ? 'default' : 'outline'} onClick={() => onChange(l)}>{l.toUpperCase()}</Button>)}</div>;
}
function Row({ icon, title, sub, onClick, done }: { icon?: string; title: string; sub?: string; onClick: () => void; done?: boolean }) {
  return <Button variant="ghost" className="weak-card" onClick={onClick}><span className="topic-icon tone-1">{done ? <Check size={20} /> : icon ?? '🌱'}</span><div className="text-left flex-1"><h3>{title}</h3>{sub && <p>{sub}</p>}</div><ChevronRight className="ml-auto" /></Button>;
}
function Say({ en, zh, speak }: { en: string; zh?: string; speak: Speak }) {
  return <div className="rounded-xl border border-border p-3 flex items-start gap-2">
    <Button size="icon" variant="ghost" aria-label={tr('播放')} onClick={() => speak(en, 'current')}><Volume2 size={16} /></Button>
    <Button size="icon" variant="ghost" aria-label={tr('慢速播放')} onClick={() => speak(en, 'slow')}><Snail size={16} /></Button>
    <div className="flex-1"><p>{en}</p>{zh && <p className="text-sm text-muted-foreground">{zh}</p>}</div>
  </div>;
}
function AddWord({ w, z }: { w: string; z?: string }) {
  const [ok, setOk] = useState(false);
  return <Button size="sm" variant="outline" disabled={ok} onClick={() => { addToReview(w, z); setOk(true); }}>{ok ? <Check size={14} /> : <Plus size={14} />} {ok ? tr('已加入复习') : tr('加入词汇复习')}</Button>;
}
const lv = (x: string) => String(x || '').toLowerCase();

/* ---------- 1 生活场景 + 角色对话（场景 → 关键表达 → 整段对话逐句开口） ---------- */
function Dialogue({ d, speak, onRecord, onBack }: P & { d: any; onBack: () => void }) {
  const turns = A(d.turns).map(t => ({ me: t.speaker === 'user' || t.speaker === d.userRole, en: t.text ?? t.en, zh: t.zh }));
  const [i, setI] = useState(0);
  const [passed, setPassed] = useState(false);
  const t = turns[i];
  useEffect(() => { setPassed(false); if (t && !t.me) speak(t.en, 'current'); }, [i]); // eslint-disable-line react-hooks/exhaustive-deps
  return <div className="space-y-3">
    <Head title={d.titleZh ?? d.title} onExit={onBack} />
    {d.userRole && <p className="text-sm text-muted-foreground">{tr('你扮演')}：{d.userRole}{d.botRole ? ` · ${tr('对方')}：${d.botRole}` : ''}</p>}
    {turns.slice(0, i).map((x, k) => <div key={k} className={cn('rounded-xl p-2 text-sm', x.me ? 'bg-primary/10 ml-8' : 'bg-muted mr-8')}>{x.en}</div>)}
    {t ? <>
      <div className={cn('rounded-xl border p-3', t.me ? 'border-primary' : 'border-border')}><p className="text-xs text-muted-foreground mb-1">{t.me ? tr('轮到你说') : tr('对方说')}</p><Say en={t.en} zh={t.zh} speak={speak} /></div>
      {t.me && <SpeechCoach key={i} target={t.en} onRecord={onRecord} onPassed={() => setPassed(true)} />}
      <Button className="w-full" variant={t.me && !passed ? 'outline' : 'default'} onClick={() => setI(i + 1)}>{t.me && !passed ? tr('先跳过这句') : tr('下一句')}</Button>
    </> : <div className="tip-panel"><Check size={18} /><div><b>{tr('整段对话完成')}</b><p>{tr('再练一遍会更流利。')}</p></div><Button size="sm" variant="outline" onClick={() => setI(0)}><RotateCcw size={14} /></Button></div>}
  </div>;
}
function Scenes(p: P & { onExit: () => void }) {
  const [cat, setCat] = useState<string>('all');
  const [scene, setScene] = useState<any>(null);
  const [dlg, setDlg] = useState<any>(null);
  const [level, setLevel] = useState('a1');
  const RP = A(ROLE_PLAY_DIALOGUES); const DL = A(DIALOGUES);
  if (dlg) return <Dialogue d={dlg} {...p} onBack={() => setDlg(null)} />;
  if (scene) {
    const ref = RP.find(d => d.id === scene.refDialogueId);
    return <div className="space-y-3"><Head title={scene.title} onExit={() => setScene(null)} />
      <div className="tip-panel"><span className="text-2xl">{scene.icon}</span><div><b>{tr('任务')}</b><p>{scene.task}</p></div></div>
      <p className="text-sm font-medium">{tr('关键表达')}</p>
      {A(scene.keyPhrases).map((k: string) => <Say key={k} en={k.replace(/…/g, '...')} speak={p.speak} />)}
      {ref && <Button className="w-full" onClick={() => setDlg(ref)}>{tr('开始整段对话练习')}</Button>}
    </div>;
  }
  const scenes = A(LIFE_SCENES).filter(s => cat === 'all' || s.category === cat);
  const dl = [...RP, ...DL].filter(d => lv(d.level) === level);
  return <div className="space-y-4"><Head title={tr('生活场景 · 角色对话')} onExit={p.onExit} />
    <div className="flex flex-wrap gap-2"><Button size="sm" variant={cat === 'all' ? 'default' : 'outline'} onClick={() => setCat('all')}>{tr('全部')}</Button>{A(SCENE_CATEGORIES).map(c => <Button key={c.id} size="sm" variant={cat === c.id ? 'default' : 'outline'} onClick={() => setCat(c.id)}>{c.icon} {c.label}</Button>)}</div>
    <div className="weak-list">{scenes.map(s => <Row key={s.id} icon={s.icon} title={s.title} sub={`${s.cefr} · ${s.titleEn}`} onClick={() => setScene(s)} />)}</div>
    <div className="section-heading"><h2>{tr('对话库')}</h2><span>{RP.length + DL.length}</span></div>
    <Levels list={['a1', 'a2', 'b1', 'b2']} value={level} onChange={setLevel} />
    <div className="weak-list">{dl.map(d => <Row key={d.id} icon={d.icon} title={d.titleZh ?? d.title} sub={d.title} onClick={() => setDlg(d)} />)}</div>
  </div>;
}

/* ---------- 2 句型家族 ---------- */
function Patterns(p: P & { onExit: () => void }) {
  const [fam, setFam] = useState<any>(null); const [i, setI] = useState(0);
  if (fam) { const it = fam.items[i]; return <div className="space-y-3"><Head title={`${fam.titleZh} · ${i + 1}/${fam.items.length}`} onExit={() => setFam(null)} />
    <div className="tip-panel"><span className="text-2xl">{fam.emoji}</span><div><b>{fam.frame}</b><p>{fam.tipZh}</p></div></div>
    {it && <><Say en={it.en} zh={it.zh} speak={p.speak} /><p className="text-xs text-muted-foreground">{tr('替换部分')}：{it.slotZh}</p>
      <SpeechCoach key={it.en} target={it.en} onRecord={p.onRecord} onPassed={() => {}} /></>}
    <div className="grid grid-cols-2 gap-2"><Button variant="outline" disabled={i === 0} onClick={() => setI(i - 1)}>{tr('上一句')}</Button><Button disabled={i >= fam.items.length - 1} onClick={() => setI(i + 1)}>{tr('换一句')}</Button></div>
  </div>; }
  const F = A(SENTENCE_PATTERN_FAMILIES); const L = PATTERN_LEVEL_LABELS as Record<string, string>;
  return <div className="space-y-4"><Head title={tr('句型家族')} onExit={p.onExit} />
    <div className="tip-panel"><span>🧩</span><div><b>{tr('一个骨架，换词说一百句')}</b><p>{tr('同一族句子结构不变，只换几个词。说熟骨架，就能自己造句。')}</p></div></div>
    {Object.keys(L).map(k => <div key={k} className="space-y-2"><div className="section-heading"><h2>{L[k]}</h2></div><div className="weak-list">{F.filter(f => f.level === k).map(f => <Row key={f.id} icon={f.emoji} title={f.titleZh} sub={`${f.frame} · ${f.items.length} ${tr('句')}`} onClick={() => { setFam(f); setI(0); }} />)}</div></div>)}
  </div>;
}

/* ---------- 3 跟读复述（含节奏、回应） ---------- */
function Repeat(p: P & { onExit: () => void }) {
  const [level, setLevel] = useState('a1'); const [i, setI] = useState<number | null>(null);
  const list = A(REPEAT_DRILLS).filter(d => lv(d.level) === level);
  const d = i === null ? null : list[i];
  if (d) return <div className="space-y-3"><Head title={`${d.category} · ${i! + 1}/${list.length}`} onExit={() => setI(null)} />
    <p className="text-sm text-muted-foreground">{tr('场景')}：{d.scene}</p>
    <Say en={d.phrase} zh={d.zh} speak={p.speak} />
    <div className="rounded-xl bg-muted p-3 text-sm"><p>{tr('节奏')}：<b className="tracking-widest">{d.rhythm}</b>（● {tr('重读')} ○ {tr('轻读')}）</p><p className="mt-1">{d.tips}</p></div>
    <SpeechCoach key={d.id} target={d.phrase} onRecord={p.onRecord} onPassed={() => {}} />
    {A(d.responses).length > 0 && <><p className="text-sm font-medium">{tr('对方可能这样回你')}</p>{A(d.responses).map((r: string) => <Say key={r} en={r} speak={p.speak} />)}</>}
    <Button className="w-full" disabled={i! >= list.length - 1} onClick={() => setI(i! + 1)}>{tr('下一句')}</Button>
  </div>;
  return <div className="space-y-4"><Head title={tr('跟读复述')} onExit={p.onExit} /><Levels list={['a1', 'a2', 'b1', 'b2']} value={level} onChange={setLevel} />
    <div className="weak-list">{list.map((x, k) => <Row key={x.id} icon="🔁" title={x.phrase} sub={`${x.category} · ${x.zh}`} onClick={() => setI(k)} />)}</div></div>;
}

/* ---------- 4 完形填空小测 ---------- */
function Cloze(p: P & { onExit: () => void }) {
  const [level, setLevel] = useState('a1'); const [c, setC] = useState<any>(null);
  const [ans, setAns] = useState<Record<number, number>>({}); const [sub, setSub] = useState(false);
  if (c) {
    const parts = String(c.text).split(/\[\[(\d+)\]\]/);
    const right = A(c.blanks).filter(b => ans[b.n] === b.answer).length;
    const full = parts.map((x, k) => k % 2 ? A(c.blanks).find(b => b.n === Number(x))?.options[A(c.blanks).find(b => b.n === Number(x))?.answer] : x).join('');
    return <div className="space-y-3"><Head title={c.titleZh} onExit={() => setC(null)} />
      <p className="leading-8">{parts.map((x, k) => k % 2 ? <b key={k} className="mx-1 rounded bg-primary/15 px-2">({x}) {ans[Number(x)] !== undefined ? A(c.blanks).find(b => b.n === Number(x)).options[ans[Number(x)] as number] : '____'}</b> : <span key={k}>{x}</span>)}</p>
      {A(c.blanks).map(b => <div key={b.n} className="space-y-1"><p className="text-sm">({b.n}) {sub && b.zh}</p><div className="flex flex-wrap gap-2">{A(b.options).map((o: string, k: number) => <Button key={o} size="sm" disabled={sub} variant={ans[b.n] === k ? 'default' : 'outline'} className={cn(sub && k === b.answer && 'ring-2 ring-primary', sub && ans[b.n] === k && k !== b.answer && 'border-destructive')} onClick={() => setAns({ ...ans, [b.n]: k })}>{o}</Button>)}</div></div>)}
      {!sub ? <Button className="w-full" disabled={Object.keys(ans).length < A(c.blanks).length} onClick={() => setSub(true)}>{tr('交卷')}</Button> : <>
        <div className="tip-panel"><Check size={18} /><div><b>{tr('答对')} {right}/{A(c.blanks).length}</b><p>{tr('把完整短文读出来，巩固正确用法。')}</p></div></div>
        <Say en={full} speak={p.speak} /><SpeechCoach target={full.slice(0, 280)} onRecord={p.onRecord} onPassed={() => {}} />
      </>}
    </div>;
  }
  return <div className="space-y-4"><Head title={tr('完形填空小测')} onExit={p.onExit} /><Levels list={['a1', 'a2', 'b1', 'b2', 'c1']} value={level} onChange={setLevel} />
    <div className="weak-list">{A(ALL_CLOZE_PASSAGES).filter(x => lv(x.level) === level).map(x => <Row key={x.id} icon="📝" title={x.titleZh} sub={`${x.title} · ${A(x.blanks).length} ${tr('空')}`} onClick={() => { setC(x); setAns({}); setSub(false); }} />)}</div></div>;
}

/* ---------- 5 自由开口（AI 评开放回答） ---------- */
function Free(p: P & { onExit: () => void }) {
  const [cat, setCat] = useState(A(PROMPT_CATEGORIES)[0]?.id); const [q, setQ] = useState<any>(null);
  if (q) return <div className="space-y-3"><Head title={tr('自由开口')} onExit={() => setQ(null)} />
    <div className="rounded-2xl border border-border p-4"><p className="text-lg">{q.en}</p><p className="text-sm text-muted-foreground mt-1">{q.zh}</p><p className="text-xs mt-2 flex items-center gap-1"><Timer size={13} /> {tr('建议说')} {q.timeHint} {tr('秒左右')} · {q.cefr}</p></div>
    <Button size="sm" variant="outline" onClick={() => p.speak(q.en, 'current')}><Volume2 size={14} /> {tr('听题目')}</Button>
    <p className="text-sm text-muted-foreground">{tr('没有标准答案。AI 会看你是否切题、用词和语法是否正确，并给一句更地道的说法。')}</p>
    <SpeechCoach key={q.id} target={`[FREE] ${q.en}`} onRecord={p.onRecord} onPassed={() => {}} />
  </div>;
  return <div className="space-y-4"><Head title={tr('自由开口 · 话题演讲')} onExit={p.onExit} />
    <div className="flex flex-wrap gap-2">{A(PROMPT_CATEGORIES).map(c => <Button key={c.id} size="sm" variant={cat === c.id ? 'default' : 'outline'} onClick={() => setCat(c.id)}>{c.label}</Button>)}</div>
    <div className="weak-list">{A(FREE_SPEAK_PROMPTS).filter(x => x.category === cat).map(x => <Row key={x.id} icon="🎤" title={x.zh} sub={`${x.cefr} · ${x.timeHint}s`} onClick={() => setQ(x)} />)}</div></div>;
}

/* ---------- 6 分级阅读（生词一键进复习） ---------- */
function Reading(p: P & { onExit: () => void }) {
  const [level, setLevel] = useState('a1'); const [r, setR] = useState<any>(null);
  if (r) { const sents = String(r.content).match(/[^.!?]+[.!?]+/g) ?? [r.content]; const FB = FREQ_BANDS as Record<string, any>;
    return <div className="space-y-3"><Head title={r.titleZh} onExit={() => setR(null)} />
      <p className="text-xs text-muted-foreground">{r.cefr} · {r.topic}</p>
      <div className="space-y-1">{sents.map((s: string, k: number) => <button type="button" key={k} className="text-left leading-7 hover:bg-primary/10 rounded px-1" onClick={() => p.speak(s.trim(), 'current')}>{s}</button>)}</div>
      <Button size="sm" variant="outline" onClick={() => p.speak(r.content, 'current')}><Volume2 size={14} /> {tr('朗读全文')}</Button>
      <div className="section-heading"><h2>{tr('本文词汇')}</h2><span>{A(r.vocab).length}</span></div>
      {A(r.vocab).map(v => <div key={v.word} className="rounded-xl border border-border p-3 space-y-1">
        <div className="flex items-center gap-2"><b>{v.word}</b><span className="text-xs text-muted-foreground">{v.pos} {v.zh}</span><span className="ml-auto text-xs text-primary">{FB[v.freq]?.label}</span></div>
        {v.exampleEn && <Say en={v.exampleEn} zh={v.exampleZh} speak={p.speak} />}<AddWord w={v.word} z={v.zh} />
      </div>)}
      <p className="text-sm font-medium">{tr('挑一句读出来')}</p><SpeechCoach target={String(sents[0]).trim()} onRecord={p.onRecord} onPassed={() => {}} />
    </div>; }
  return <div className="space-y-4"><Head title={tr('分级阅读')} onExit={p.onExit} /><Levels list={['a1', 'a2', 'b1', 'b2', 'c1']} value={level} onChange={setLevel} />
    <div className="weak-list">{A(READING_MATERIALS).filter(x => lv(x.cefr) === level).map(x => <Row key={x.id} icon="📖" title={x.titleZh} sub={`${x.title} · ${x.topic}`} onClick={() => setR(x)} />)}</div></div>;
}

/* ---------- 7 主题单词组 / 儿童看图（含句中填空与追问对话） ---------- */
function WordDetail({ it, themeZh, speak, onRecord, onExit }: { it: any; themeZh: string; speak: Speak; onRecord: (r: PracticeRecord) => void; onExit: () => void }) {
  const card = CARDS.find(c => c.word === it.word);
  const say = card?.say ?? `I like the ${it.word}.`;
  const alt = card?.alt ?? `I see a ${it.word}.`;
  const [target, setTarget] = useState(say);
  return <div className="space-y-3"><Head title={`${it.word} · ${tr(it.zh) || themeZh}`} onExit={onExit} />
    {WORD_IMAGES[it.word] && <img src={WORD_IMAGES[it.word]} alt={it.word} loading="lazy" className="mx-auto w-full max-w-64 rounded-2xl object-cover" />}
    <div className="text-center"><b className="text-2xl">{it.word}</b>{it.zh && <p className="text-muted-foreground">{tr(it.zh)}</p>}</div>
    <div className="flex justify-center gap-2"><Button size="sm" variant="outline" onClick={() => speak(it.word, 'slow')}><Snail size={14} /> {tr('慢速听单词')}</Button><Button size="sm" variant="outline" onClick={() => speak(it.word, 'normal')}><Volume2 size={14} /> {tr('正常语速')}</Button></div>
    <div className="section-heading"><h2>{tr('放进句子里听')}</h2></div>
    <Say en={say} speak={speak} />
    <Say en={alt} speak={speak} />
    <div className="section-heading"><h2>{tr('轮到你说')}</h2></div>
    <div className="flex gap-2"><Button size="sm" variant={target === say ? 'default' : 'outline'} onClick={() => { setTarget(say); speak(say, 'current'); }}>{tr('练例句')}</Button><Button size="sm" variant={target === alt ? 'default' : 'outline'} onClick={() => { setTarget(alt); speak(alt, 'current'); }}>{tr('练替换句')}</Button></div>
    <SpeechCoach key={target} target={target} onRecord={onRecord} onPassed={() => {}} />
  </div>;
}
function Words(p: P & { onExit: () => void }) {
  const [tier, setTier] = useState('kids'); const [g, setG] = useState<any>(null); const [pick, setPick] = useState<string | null>(null); const [w, setW] = useState<any>(null);
  const TM = TIER_META as Record<string, any>;
  if (g) {
    if (g.items) {
      if (w) return <WordDetail it={w} themeZh={tr(g.themeZh)} speak={p.speak} onRecord={p.onRecord} onExit={() => setW(null)} />;
      return <div className="space-y-3"><Head title={tr(g.themeZh)} onExit={() => setG(null)} />
      <div className="grid grid-cols-3 gap-2">{A(g.items).map(it => <button type="button" key={it.word} className="rounded-xl border border-border p-3 text-center hover:border-primary" onClick={() => { setW(it); p.speak(it.word, 'slow'); }}>{WORD_IMAGES[it.word] ? <img src={WORD_IMAGES[it.word]} alt={it.word} loading="lazy" className="mx-auto mb-1 h-16 w-16 rounded-lg object-cover" /> : <div className="text-3xl">{it.emoji}</div>}<b className="block">{it.word}</b><span className="text-xs text-muted-foreground">{it.zh}</span></button>)}</div>
      <p className="text-sm text-muted-foreground">{tr('点一个单词进去，听一听、跟着说、再换成自己的句子。')}</p></div>;
    }
    const full = String(g.sentence).replace('___', g.answer);
    return <div className="space-y-3"><Head title={tr(TM[g.tier]?.label)} onExit={() => setG(null)} />
      <p className="text-lg">{g.sentence}</p><p className="text-sm text-muted-foreground">{tr(g.sentenceZh)}</p>
      <div className="grid grid-cols-2 gap-2">{A(g.words).map(w => <Button key={w.word} variant={pick === w.word ? (w.word === g.answer ? 'default' : 'destructive') : 'outline'} onClick={() => { setPick(w.word); p.speak(w.word, 'current'); }}>{WORD_IMAGES[w.word] && <img src={WORD_IMAGES[w.word]} alt="" loading="lazy" className="mr-1 h-7 w-7 rounded object-cover" />}{w.word} · {tr(w.zh)}</Button>)}</div>
      {pick === g.answer && <><Say en={full} speak={p.speak} /><SpeechCoach target={full} onRecord={p.onRecord} onPassed={() => {}} />
        {g.followUp && <><p className="text-sm font-medium">{tr('对方接着问')}</p><Say en={g.followUp} zh={tr(g.followUpZh)} speak={p.speak} /><Say en={g.userReply} zh={tr(g.userReplyZh)} speak={p.speak} /></>}
        <AddWord w={g.answer} z={tr(A(g.words).find(w => w.word === g.answer)?.zh)} /></>}
    </div>;
  }
  const groups = A(ALL_GROUPS).filter(x => x.tier === tier);
  return <div className="space-y-4"><Head title={tr('主题单词组 · 看图识词')} onExit={p.onExit} />
    <div className="flex flex-wrap gap-2">{(TIER_ORDER as string[]).map(t => <Button key={t} size="sm" variant={tier === t ? 'default' : 'outline'} onClick={() => setTier(t)}>{TM[t]?.emoji} {tr(TM[t]?.label)}</Button>)}</div>
    <p className="text-xs text-muted-foreground">{tr(TM[tier]?.desc)}</p>
    <div className="weak-list">{groups.map((x, k) => <Row key={x.id} icon={x.themeEmoji ?? '🔤'} title={tr(x.themeZh ?? x.sentenceZh) || `${tr('第')} ${k + 1} ${tr('组')}`} sub={x.theme ?? A(x.words).map(w => w.word).join(' / ')} onClick={() => { setG(x); setPick(null); setW(null); }} />)}</div></div>;
}

/* ---------- 8 AI 陪练角色（按关键词走分支） ---------- */
function Bots(p: P & { onExit: () => void }) {
  const [bot, setBot] = useState<any>(null); const [node, setNode] = useState(''); const [said, setSaid] = useState('');
  const n = bot?.nodes?.[node];
  useEffect(() => { if (n?.botEn) p.speak(n.botEn, 'current'); }, [node]); // eslint-disable-line react-hooks/exhaustive-deps
  function go(text: string) {
    const low = text.toLowerCase(); const b = A(n.branches).find(x => A(x.expectKeywords).some((k: string) => low.includes(k.toLowerCase())));
    setSaid(''); const next = b?.goto ?? n.fallback; if (next) setNode(next); else setNode('__end');
  }
  if (bot) return <div className="space-y-3"><Head title={bot.nameZh} onExit={() => setBot(null)} />
    {n ? <><div className="rounded-xl bg-muted p-3"><Say en={n.botEn} zh={n.botZh} speak={p.speak} /></div>
      {A(n.branches).length > 0 ? <><p className="text-sm font-medium">{tr('你可以这样回答（点一下就选）')}</p>
        <div className="flex flex-wrap gap-2">{A(n.branches).map(b => <Button key={b.goto + b.hint} size="sm" variant="outline" onClick={() => go(A(b.expectKeywords).join(' '))}>{b.hintZh} · {b.hint}</Button>)}</div>
        <div className="flex gap-2"><input className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder={tr('或者直接打英文回答')} value={said} onChange={e => setSaid(e.target.value)} onKeyDown={e => e.key === 'Enter' && said && go(said)} /><Button disabled={!said} onClick={() => go(said)}>{tr('发送')}</Button></div></>
        : <Button className="w-full" onClick={() => setNode(bot.startNodeId)}>{tr('再来一次')}</Button>}</>
      : <div className="tip-panel"><Check size={18} /><div><b>{tr('对话结束')}</b></div><Button size="sm" onClick={() => setNode(bot.startNodeId)}>{tr('再来一次')}</Button></div>}
  </div>;
  return <div className="space-y-4"><Head title={tr('AI 陪练角色')} onExit={p.onExit} />
    <p className="text-sm text-muted-foreground">{tr('每个角色的回答会根据你说的内容走不同分支，像真人聊天。')}</p>
    <div className="weak-list">{A(AI_BOTS).map(b => <Row key={b.id} icon={b.emoji} title={b.nameZh} sub={`${lv(b.level).toUpperCase()} · ${b.introZh}`} onClick={() => { setBot(b); setNode(b.startNodeId); }} />)}</div></div>;
}

/* ---------- 9 场景短语块（原版 50 组） ---------- */
function Phrases(p: P & { onExit: () => void }) {
  const [level, setLevel] = useState('a1'); const [g, setG] = useState<any>(null); const [i, setI] = useState(0);
  if (g) { const c = A(g.chunks)[i]; return <div className="space-y-3"><Head title={`${g.themeZh} · ${i + 1}/${A(g.chunks).length}`} onExit={() => setG(null)} />
    {c && <><p className="text-sm text-muted-foreground">{tr('场景')}：{c.scene}</p><Say en={c.en} zh={c.zh} speak={p.speak} /><SpeechCoach key={c.en} target={c.en} onRecord={p.onRecord} onPassed={() => {}} /></>}
    <div className="grid grid-cols-2 gap-2"><Button variant="outline" disabled={i === 0} onClick={() => setI(i - 1)}>{tr('上一句')}</Button><Button disabled={i >= A(g.chunks).length - 1} onClick={() => setI(i + 1)}>{tr('下一句')}</Button></div></div>; }
  return <div className="space-y-4"><Head title={tr('场景短语块')} onExit={p.onExit} /><Levels list={['a1', 'a2', 'b1', 'b2', 'c1']} value={level} onChange={setLevel} />
    <div className="weak-list">{A(PHRASE_CHUNKS).filter(x => lv(x.level) === level).map(x => <Row key={x.id} icon={x.emoji} title={x.themeZh} sub={`${x.theme} · ${A(x.chunks).length} ${tr('句')}`} onClick={() => { setG(x); setI(0); }} />)}</div></div>;
}

/* ---------- 10 节拍连读（原版重音/弱读/连读） ---------- */
function Beats(p: P & { onExit: () => void }) {
  const [i, setI] = useState(0); const d = A(STRESS_DRILLS)[i];
  return <div className="space-y-3"><Head title={`${tr('节拍连读')} · ${i + 1}/${A(STRESS_DRILLS).length}`} onExit={p.onExit} />
    {d && <><p className="text-xs text-muted-foreground">{d.level}</p>
      <div className="flex flex-wrap gap-1 text-xl">{A(d.beats).map((b, k) => <span key={k} className={cn(b.stressed ? 'font-bold text-primary' : 'text-muted-foreground text-base', b.schwa && 'italic')}>{b.word}</span>)}</div>
      <p className="text-sm">{tr('实际说成')}：<b>{d.spoken}</b></p><p className="text-sm text-muted-foreground">{d.zh}</p>
      {A(d.liaisons).map((l, k) => <p key={k} className="text-xs rounded bg-muted p-2">{l.note}</p>)}
      <Say en={d.en} speak={p.speak} /><SpeechCoach key={d.id} target={d.en} onRecord={p.onRecord} onPassed={() => {}} /></>}
    <div className="grid grid-cols-2 gap-2"><Button variant="outline" disabled={i === 0} onClick={() => setI(i - 1)}>{tr('上一句')}</Button><Button disabled={i >= A(STRESS_DRILLS).length - 1} onClick={() => setI(i + 1)}>{tr('下一句')}</Button></div>
  </div>;
}

export function Library({ kind, ...p }: P & { kind: LibKind; onExit: () => void }) {
  const M = { scenes: Scenes, patterns: Patterns, repeat: Repeat, cloze: Cloze, free: Free, reading: Reading, words: Words, bots: Bots, phrases: Phrases, beats: Beats } as const;
  const C = M[kind]; return <C {...p} />;
}

export const LIB_ENTRIES: { kind: LibKind; title: string; sub: string; icon: string }[] = [
  { kind: 'scenes', icon: '🏙️', title: '生活场景 · 角色对话', sub: `${A(LIFE_SCENES).length} 个场景任务 · ${A(ROLE_PLAY_DIALOGUES).length + A(DIALOGUES).length} 段对话逐句开口` },
  { kind: 'phrases', icon: '🧱', title: '场景短语块', sub: `${A(PHRASE_CHUNKS).length} 组 · 寒暄、职场、流利度表达` },
  { kind: 'patterns', icon: '🧩', title: '句型家族', sub: `${A(SENTENCE_PATTERN_FAMILIES).length} 个骨架 · 换词造句` },
  // 跟读复述与节拍连读已并入「口语训练营」（speaking-gym.tsx），这里不再单列。
  { kind: 'reading', icon: '📖', title: '分级阅读', sub: `${A(READING_MATERIALS).length} 篇 A1–C1 · 生词一键加入复习` },
  { kind: 'cloze', icon: '📝', title: '完形填空小测', sub: `${A(ALL_CLOZE_PASSAGES).length} 篇 · 交卷看对错再朗读` },
  { kind: 'free', icon: '🎤', title: '自由开口 · 话题演讲', sub: `${A(FREE_SPEAK_PROMPTS).length} 道开放题 · AI 评切题与用词` },
  { kind: 'words', icon: '🧸', title: '主题单词组 · 看图识词', sub: `${A(ALL_GROUPS).length} 组 · 儿童看图到 C1 句中填词` },
  { kind: 'bots', icon: '🤖', title: 'AI 陪练角色', sub: `${A(AI_BOTS).length} 个角色 · 按你的回答走不同剧情` },
];
export const useLibCount = () => useMemo(() => LIB_ENTRIES.length, []);
