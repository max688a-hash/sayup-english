// @ts-nocheck -- renders untyped content ported from the original data files
import { InAppLink } from '@/components/in-app-browser';
import { tr, trn } from '@/lib/tr';
import { useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Check, ChevronRight, ExternalLink, Headphones, Library, ListChecks, Mic, PenLine, Radio, Turtle, Volume2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';
import { cn } from '@/lib/utils';
import { SPEAKING_GROUPS } from '@/lib/advanced/speakingTopics';
import { ACADEMIC_WORDS } from '@/lib/advanced/academicVocab';
import { ACADEMIC_WORDS_BATCH_2 } from '@/lib/advanced/academicVocab2';
import { ACADEMIC_LISTENING } from '@/lib/advanced/academicListening';
import { ACADEMIC_LISTENING_2 } from '@/lib/advanced/academicListening2';
import { ACADEMIC_READING } from '@/lib/advanced/academicReading';
import { ACADEMIC_READING_2 } from '@/lib/advanced/academicReading2';
import { ALL_WRITING_TASKS, WRITING_CRITERIA } from '@/lib/advanced/academicWriting';
import { MOCK_LISTENING_QUESTIONS, getMockLectures, getMockReadingPassage, estimateLevel } from '@/lib/advanced/mockTest';
import { LISTENING_PACKS, LEVELS } from '@/lib/advanced/listeningPacks';
import { EXTERNAL_RESOURCES, RESOURCE_LEVELS } from '@/lib/advanced/externalResources';

type Pair = { en: string; zh: string };
type Q = { id: string; type: 'tfng' | 'mcq' | 'gap'; prompt: string; promptZh?: string; options?: string[]; answer: string | number; accept?: string[]; explainZh?: string };
type Speak = (text: string, speed?: 'slow' | 'normal' | 'current') => void;
type Module = 'speaking' | 'vocab' | 'listening' | 'reading' | 'writing' | 'mock' | 'packs' | 'resources';

const modules: { key: Module; title: string; desc: string; icon: typeof Mic; tone: number; count: () => number }[] = [
  { key: 'speaking', title: '进阶口语话题', desc: '简短问答 · 话题独白 · 深入讨论 · 观点表达', icon: Mic, tone: 0, count: () => SPEAKING_GROUPS.reduce((n: number, g: { items: unknown[] }) => n + g.items.length, 0) },
  { key: 'listening', title: '学术听力', desc: '真实学科短讲 · 整段听 → 逐句精听 → 开口复述', icon: Headphones, tone: 1, count: () => ACADEMIC_LISTENING.length + ACADEMIC_LISTENING_2.length },
  { key: 'reading', title: '学术阅读', desc: '学术文章 · 判断 / 选择 / 填空 · 自动判分 + 解析', icon: BookOpen, tone: 2, count: () => ACADEMIC_READING.length + ACADEMIC_READING_2.length },
  { key: 'writing', title: '学术写作', desc: '议论文 / 看图写 · 结构框架 + 范文 + 四维自评', icon: PenLine, tone: 3, count: () => ALL_WRITING_TASKS.length },
  { key: 'vocab', title: '学术词汇', desc: '高频学术词 · 学一个词立刻开口造句', icon: Library, tone: 0, count: () => ACADEMIC_WORDS.length + ACADEMIC_WORDS_BATCH_2.length },
  { key: 'mock', title: '迷你模拟考', desc: '长篇听力 + 长篇阅读自动判分 · 估算 1–6 级', icon: ListChecks, tone: 1, count: () => 2 },
];
const listenModules: typeof modules = [
  { key: 'packs', title: '分级听力练习', desc: 'A1–C1 生活短文 · 逐句听 · 跟读', icon: Radio, tone: 2, count: () => LISTENING_PACKS.length },
  { key: 'resources', title: '在线听力资源', desc: '精选免费频道 / 播客 / 网站 · 按级别', icon: ExternalLink, tone: 3, count: () => RESOURCE_LEVELS.reduce((n: number, l: string) => n + (EXTERNAL_RESOURCES[l]?.length ?? 0), 0) },
];

const levelLabel = (l: string) => l?.toUpperCase();

function Questions({ questions, onScore }: { questions: Q[]; onScore?: (c: number, t: number) => void }) {
  const [ans, setAns] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const isRight = (q: Q) => {
    const a = (ans[q.id] ?? '').trim().toLowerCase();
    if (q.type === 'gap') return [String(q.answer), ...(q.accept ?? [])].some(x => x.toLowerCase() === a);
    return a === String(q.answer).toLowerCase();
  };
  const correct = questions.filter(isRight).length;
  return <div className="adv-questions">
    {questions.map((q, i) => <div key={q.id} className={cn('adv-q', done && (isRight(q) ? 'right' : 'wrong'))}>
      <p className="adv-q-title"><b>{i + 1}.</b> {trn(q.prompt)}</p>{q.promptZh && <p className="adv-zh">{trn(q.promptZh)}</p>}
      {q.type === 'tfng' && <div className="adv-options">{[['true', '正确'], ['false', '错误'], ['notgiven', '未提及']].map(([v, l]) => <Button key={v} size="sm" variant={ans[q.id] === v ? 'default' : 'outline'} disabled={done} onClick={() => setAns(a => ({ ...a, [q.id]: v }))}>{l}</Button>)}</div>}
      {q.type === 'mcq' && <div className="adv-options col">{q.options?.map((o, oi) => <Button key={o} size="sm" variant={ans[q.id] === String(oi) ? 'default' : 'outline'} disabled={done} onClick={() => setAns(a => ({ ...a, [q.id]: String(oi) }))}>{String.fromCharCode(65 + oi)}. {o}</Button>)}</div>}
      {q.type === 'gap' && <input className="adv-input" disabled={done} value={ans[q.id] ?? ''} placeholder={tr("填写原文中的词")} onChange={e => setAns(a => ({ ...a, [q.id]: e.target.value }))} />}
      {done && <p className="adv-explain">{isRight(q) ? <Check size={13} /> : <X size={13} />} {tr("答案：")}{q.type === 'mcq' ? q.options?.[Number(q.answer)] : q.type === 'tfng' ? ({ true: '正确', false: '错误', notgiven: '未提及' } as Record<string, string>)[String(q.answer)] : String(q.answer)}{q.explainZh ? ` · ${q.explainZh}` : ''}</p>}
    </div>)}
    {!done ? <Button className="w-full h-11" disabled={Object.keys(ans).length === 0} onClick={() => { setDone(true); onScore?.(correct, questions.length); }}>{tr("交卷判分")}</Button>
      : <div className="feedback-box"><b>{tr("答对")} {correct} / {trn(questions.length)} {tr("题")}</b><Button variant="outline" size="sm" onClick={() => { setAns({}); setDone(false); }}>{tr("重新作答")}</Button></div>}
  </div>;
}

function SentenceList({ sentences, speak, onRecord }: { sentences: Pair[]; speak: Speak; onRecord?: (r: PracticeRecord) => void }) {
  const [showZh, setShowZh] = useState(false);
  const [practice, setPractice] = useState<number | null>(null);
  return <div className="adv-sentences">
    <div className="flex gap-2"><Button size="sm" onClick={() => speak(sentences.map(s => s.en).join(' '), 'normal')}><Volume2 size={14} /> {tr("整段听")}</Button><Button size="sm" variant="outline" onClick={() => setShowZh(v => !v)}>{showZh ? tr("隐藏中文") : tr("显示中文")}</Button></div>
    <p className="adv-zh">{tr("点句子听录音，点麦克风逐句跟读，AI 按你的真实录音评分。")}</p>
    {sentences.map((s, i) => <div key={i}>
      <div className={cn('adv-sentence', practice === i && 'ring-2 ring-primary')}><div className="min-w-0 flex-1 cursor-pointer" onClick={() => speak(s.en, 'normal')}><p>{trn(s.en)}</p>{showZh && <p className="adv-zh">{trn(s.zh)}</p>}</div><Button variant="ghost" size="icon" aria-label={tr("慢速朗读")} onClick={() => speak(s.en, 'slow')}><Turtle size={15} /></Button><Button variant="ghost" size="icon" aria-label={tr("朗读")} onClick={() => speak(s.en, 'normal')}><Volume2 size={15} /></Button>{onRecord && <Button variant={practice === i ? 'default' : 'ghost'} size="icon" aria-label={tr("跟读这一句")} onClick={() => setPractice(p => p === i ? null : i)}><Mic size={15} /></Button>}</div>
      {onRecord && practice === i && <div className="mt-2 mb-3"><SpeechCoach key={s.en} target={s.en} onPassed={() => { if (i < sentences.length - 1) setPractice(i + 1); }} onRecord={onRecord} /></div>}
    </div>)}
  </div>;
}

export function AdvancedHub({ speak, onRecord, onExit, focus }: { speak: Speak; onRecord: (r: PracticeRecord) => void; onExit: () => void; focus?: 'listen' | undefined }) {
  const [mod, setMod] = useState<Module | null>(null);
  const [item, setItem] = useState<number | null>(null);
  const [group, setGroup] = useState(0);
  const [level, setLevel] = useState('a1');
  const [essay, setEssay] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [mockScores, setMockScores] = useState<Record<string, [number, number]>>({});
  const listening = useMemo(() => [...ACADEMIC_LISTENING, ...ACADEMIC_LISTENING_2], []);
  const reading = useMemo(() => [...ACADEMIC_READING, ...ACADEMIC_READING_2], []);
  const vocab = useMemo(() => [...ACADEMIC_WORDS, ...ACADEMIC_WORDS_BATCH_2], []);
  const coach = (target: string) => <SpeechCoach key={target} target={target} onPassed={() => {}} onRecord={onRecord} />;
  const back = () => { if (item !== null) { setItem(null); setEssay(''); setShowModel(false); setChecks({}); } else if (mod) setMod(null); else onExit(); };
  const head = (title: string) => <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr("返回上一级")} onClick={back}><ArrowLeft /></Button><span>{title}</span><span className="w-9" /></div>;
  const list = (rows: { title: string; sub: string; badge?: string }[]) => <div className="weak-list">{rows.map((r, i) => <Button variant="ghost" className="weak-card" key={i} onClick={() => setItem(i)}><div className="text-left min-w-0"><h3 className="truncate">{trn(r.title)}</h3><p>{trn(r.sub)}</p></div>{r.badge && <span className="level-tag ml-auto">{trn(r.badge)}</span>}<ChevronRight className={r.badge ? '' : 'ml-auto'} /></Button>)}</div>;

  if (!mod) {
    const show = focus === 'listen' ? [...listenModules.slice(0, 1), modules[1], ...listenModules.slice(1)] : [...modules, ...listenModules];
    return <div className="adv-hub">{head(focus === 'listen' ? '听力训练' : '进阶 · 1–6 级')}
      {focus !== 'listen' && <div className="strength-summary"><div><span className="eyebrow">BEYOND DAILY ENGLISH</span><h2>{tr("学术听说读写")}</h2><p>{tr("能力对标国际英语考试的高阶要求；等级为声芽程序内 1–6 级，不是校外考试分数。")}</p></div></div>}
      <div className="weak-list mt-4">{show.map(m => <Button variant="ghost" className="weak-card" key={m.key} onClick={() => { setMod(m.key); setItem(null); }}><span className={cn('topic-icon', `tone-${m.tone}`)}><m.icon size={22} /></span><div className="text-left min-w-0"><h3>{trn(m.title)}</h3><p>{trn(m.desc)}</p><span className="text-xs text-teal">{m.count()} {tr("项内容")}</span></div><ChevronRight className="ml-auto" /></Button>)}</div>
    </div>;
  }

  if (mod === 'speaking') {
    const g = SPEAKING_GROUPS[group];
    const t = item === null ? null : g.items[item];
    if (t) {
      const qs: Pair[] = t.questions ?? (t.cue ? [t.cue] : t.prompt ? [t.prompt] : []);
      return <div className="adv-hub">{head(t.topicZh ?? t.topic)}
        {qs.map((q, i) => <div className="adv-card" key={i}><p className="adv-q-title">{trn(q.en)}</p><p className="adv-zh">{trn(q.zh)}</p><Button size="sm" variant="ghost" onClick={() => speak(q.en, 'normal')}><Volume2 size={14} /> {tr("听题")}</Button></div>)}
        {t.points && <div className="adv-card"><b>{tr("可以谈这些")}</b>{t.points.map((p: Pair, i: number) => <p key={i} className="adv-zh">· {trn(p.en)} — {trn(p.zh)}</p>)}</div>}
        <div className="adv-card"><b>{tr("句子开头（不会说时用）")}</b>{(t.scaffold ?? []).map((s: Pair, i: number) => <p key={i}>{trn(s.en)}<br /><span className="adv-zh">{trn(s.zh)}</span></p>)}</div>
        <div className="section-heading"><h2>{tr("开口回答")}</h2><span>{tr("录音后 AI 逐词纠正")}</span></div>
        {coach(qs[0]?.en ?? t.topic)}
      </div>;
    }
    return <div className="adv-hub">{head('进阶口语话题')}
      <div className="filter-row">{SPEAKING_GROUPS.map((x: { id: string; title: string }, i: number) => <Button key={x.id} size="sm" variant={i === group ? 'default' : 'outline'} className="filter-button" onClick={() => setGroup(i)}>{trn(x.title)}</Button>)}</div>
      <p className="adv-zh my-2">{trn(g.desc)}</p>
      {list(g.items.map((x: { topic: string; topicZh: string }) => ({ title: x.topicZh, sub: x.topic })))}
    </div>;
  }

  if (mod === 'vocab') {
    const w = item === null ? null : vocab[item];
    if (w) return <div className="adv-hub">{head(w.w)}
      <div className="adv-card"><h2 className="text-2xl font-semibold">{trn(w.w)}</h2><p className="adv-zh">{trn(w.pos)} · {trn(w.zh)}</p><Button size="sm" variant="ghost" onClick={() => speak(w.w, 'slow')}><Volume2 size={14} /> {tr("发音")}</Button></div>
      <div className="adv-card"><b>{tr("例句")}</b><p>{trn(w.example.en)}</p><p className="adv-zh">{trn(w.example.zh)}</p><Button size="sm" variant="ghost" onClick={() => speak(w.example.en, 'normal')}><Volume2 size={14} /> {tr("听例句")}</Button></div>
      <div className="adv-card"><b>{tr("用它造句")}</b><p>{trn(w.scaffold.en)}</p><p className="adv-zh">{trn(w.scaffold.zh)}</p></div>
      <div className="section-heading"><h2>{tr("先跟读例句")}</h2></div>{coach(w.example.en)}
      <div className="flex gap-2 mt-3"><Button variant="outline" className="flex-1" disabled={item === 0} onClick={() => setItem(i => (i ?? 1) - 1)}>{tr("上一个")}</Button><Button className="flex-1" disabled={item === vocab.length - 1} onClick={() => setItem(i => (i ?? 0) + 1)}>{tr("下一个")}</Button></div>
    </div>;
    return <div className="adv-hub">{head(`学术词汇 · ${vocab.length} 词`)}{list(vocab.map((x: { w: string; zh: string; pos: string }) => ({ title: x.w, sub: `${x.pos} · ${x.zh}` })))}</div>;
  }

  if (mod === 'listening') {
    const l = item === null ? null : listening[item];
    if (l) return <div className="adv-hub">{head(l.titleZh)}
      <p className="adv-zh">{trn(l.fieldZh)} · {levelLabel(l.level)} · {trn(l.sentences.length)} {tr("句")}</p>
      <SentenceList sentences={l.sentences} speak={speak} />
      <div className="adv-card"><b>{tr("关键词")}</b><div className="flex flex-wrap gap-2 mt-1">{l.keyWords.map((k: { w: string; zh: string }) => <span key={k.w} className="level-tag">{trn(k.w)} · {trn(k.zh)}</span>)}</div></div>
      <div className="section-heading"><h2>{tr("开口复述第一句")}</h2></div>{coach(l.sentences[0].en)}
    </div>;
    return <div className="adv-hub">{head('学术听力')}{list(listening.map((x: { titleZh: string; title: string; fieldZh: string; level: string }) => ({ title: x.titleZh, sub: `${x.fieldZh} · ${x.title}`, badge: levelLabel(x.level) })))}</div>;
  }

  if (mod === 'reading') {
    const p = item === null ? null : reading[item];
    if (p) return <div className="adv-hub">{head(p.titleZh)}
      <p className="adv-zh">{trn(p.fieldZh)} · {levelLabel(p.level)}</p>
      {p.paragraphs.map((para: { label: string; en: string; zh: string }) => <details className="adv-card" key={para.label}><summary><b>{trn(para.label)}</b> {trn(para.en)}</summary><p className="adv-zh mt-1">{trn(para.zh)}</p></details>)}
      <div className="section-heading"><h2>{tr("答题")}</h2><span>{trn(p.questions.length)} {tr("题")}</span></div>
      <Questions key={p.id} questions={p.questions} />
    </div>;
    return <div className="adv-hub">{head('学术阅读')}{list(reading.map((x: { titleZh: string; title: string; fieldZh: string; level: string; questions: unknown[] }) => ({ title: x.titleZh, sub: `${x.fieldZh} · ${x.questions.length} 题`, badge: levelLabel(x.level) })))}</div>;
  }

  if (mod === 'writing') {
    const t = item === null ? null : ALL_WRITING_TASKS[item];
    if (t) {
      const count = essay.trim() ? essay.trim().split(/\s+/).length : 0;
      return <div className="adv-hub">{head(t.titleZh)}
        <div className="adv-card"><b>{trn(t.taskZh)}</b><p style={{ whiteSpace: 'pre-line' }}>{trn(t.prompt.en)}</p><p className="adv-zh" style={{ whiteSpace: 'pre-line' }}>{trn(t.prompt.zh)}</p><p className="adv-zh">{tr("至少")} {trn(t.minWords)} {tr("词 · 建议")} {trn(t.timeMin)} {tr("分钟")}</p></div>
        <div className="adv-card"><b>{tr("结构框架")}</b>{t.guidance.map((g: Pair, i: number) => <p key={i} className="adv-zh">{i + 1}. {trn(g.zh)}</p>)}</div>
        <div className="adv-card"><b>{tr("有用表达")}</b>{t.usefulPhrases.map((g: Pair, i: number) => <p key={i}>{trn(g.en)} <span className="adv-zh">{trn(g.zh)}</span></p>)}</div>
        <textarea className="adv-input adv-essay" value={essay} onChange={e => setEssay(e.target.value)} placeholder={tr("在这里写作…")} />
        <p className={cn('text-xs', count >= t.minWords ? 'text-teal' : 'text-muted-foreground')}>{count} / {trn(t.minWords)} {tr("词")}{count >= t.minWords ? tr(" · 字数达标") : ''}</p>
        <div className="section-heading"><h2>{tr("对照四维自评")}</h2><span>{tr("不是 AI 打分")}</span></div>
        {WRITING_CRITERIA.map((c: { key: string; nameZh: string; checks: Pair[] }) => <div className="adv-card" key={c.key}><b>{trn(c.nameZh)}</b>{c.checks.map((k, i) => { const id = `${c.key}-${i}`; return <label key={id} className="adv-check"><input type="checkbox" checked={!!checks[id]} onChange={e => setChecks(s => ({ ...s, [id]: e.target.checked }))} /> {trn(k.zh)}</label>; })}</div>)}
        <Button variant="outline" className="w-full" onClick={() => setShowModel(v => !v)}>{showModel ? tr("收起范文") : `查看范文（${t.model.wordCount} 词）`}</Button>
        {showModel && <div className="adv-card"><p style={{ whiteSpace: 'pre-line' }}>{trn(t.model.text)}</p></div>}
      </div>;
    }
    return <div className="adv-hub">{head('学术写作')}{list(ALL_WRITING_TASKS.map((x: { titleZh: string; taskZh: string; minWords: number }) => ({ title: x.titleZh, sub: `${x.taskZh} · ${x.minWords} 词` })))}</div>;
  }

  if (mod === 'mock') {
    const lecture = getMockLectures()[0];
    const passage = getMockReadingPassage();
    const total = Object.values(mockScores).reduce((a, [c, t]) => [a[0] + c, a[1] + t], [0, 0]);
    const est = Object.keys(mockScores).length === 2 ? estimateLevel(total[0], total[1]) : null;
    return <div className="adv-hub">{head('迷你模拟考')}
      <div className="tip-panel"><ListChecks size={18} /><div><b>{tr("顺序：先听，再读")}</b><p>{tr("两部分都交卷后，按正确率估算声芽 1–6 级。")}</p></div></div>
      {lecture && <><div className="section-heading"><h2>{tr("第一部分 · 听力")}</h2><span>{trn(lecture.titleZh)}</span></div>
        <Button className="w-full" onClick={() => speak(lecture.sentences.map((s: Pair) => s.en).join(' '), 'normal')}><Volume2 size={15} /> {tr("播放讲座（只听，不看原文）")}</Button>
        <Questions questions={MOCK_LISTENING_QUESTIONS} onScore={(c, t) => setMockScores(s => ({ ...s, listening: [c, t] }))} /></>}
      {passage && <><div className="section-heading"><h2>{tr("第二部分 · 阅读")}</h2><span>{trn(passage.titleZh)}</span></div>
        {passage.paragraphs.map((para: { label: string; en: string }) => <div className="adv-card" key={para.label}><b>{trn(para.label)}</b> {trn(para.en)}</div>)}
        <Questions questions={passage.questions} onScore={(c, t) => setMockScores(s => ({ ...s, reading: [c, t] }))} /></>}
      {est && <div className="feedback-box"><b>{tr("估算等级：")}{trn(est.level)} {tr("级")}</b><p className="adv-zh">{tr("共答对")} {trn(total[0])} / {trn(total[1])} {tr("题 ·")} {trn(est.note)}</p></div>}
    </div>;
  }

  if (mod === 'packs') {
    const packs = LISTENING_PACKS.filter((p: { level: string }) => p.level === level);
    const p = item === null ? null : packs[item];
    if (p) return <div className="adv-hub">{head(p.titleZh)}<SentenceList sentences={p.sentences} speak={speak} /><div className="section-heading"><h2>{tr("跟读第一句")}</h2></div>{coach(p.sentences[0].en)}</div>;
    return <div className="adv-hub">{head('分级听力练习')}
      <div className="filter-row">{LEVELS.map((l: string) => <Button key={l} size="sm" variant={l === level ? 'default' : 'outline'} className="filter-button" onClick={() => { setLevel(l); setItem(null); }}>{levelLabel(l)}</Button>)}</div>
      {list(packs.map((x: { titleZh: string; title: string; sentences: unknown[] }) => ({ title: x.titleZh, sub: `${x.title} · ${x.sentences.length} 句` })))}
    </div>;
  }

  const res = EXTERNAL_RESOURCES[level] ?? [];
  return <div className="adv-hub">{head('在线听力资源')}
    <div className="filter-row">{RESOURCE_LEVELS.map((l: string) => <Button key={l} size="sm" variant={l === level ? 'default' : 'outline'} className="filter-button" onClick={() => setLevel(l)}>{levelLabel(l)}</Button>)}</div>
    <div className="weak-list">{res.map((r: { id: string; title: string; titleZh: string; desc: string; url: string; restricted?: boolean; altUrl?: string }) => <div key={r.id} className="flex flex-col gap-1"><InAppLink url={r.url} title={trn(r.titleZh)} className="weak-card adv-link w-full"><div className="text-left min-w-0"><h3>{trn(r.titleZh)}</h3><p>{trn(r.title)} · {trn(r.desc)}</p>{r.restricted && <span className="text-xs text-amber">{tr("部分地区可能无法直接访问")}</span>}</div><ExternalLink size={16} className="ml-auto shrink-0" /></InAppLink>{r.altUrl && <InAppLink url={r.altUrl} title={trn(r.titleZh)} className="text-xs text-teal pl-3 text-left">{tr("打不开？试试备用链接 →")}</InAppLink>}</div>)}</div>
    <p className="adv-zh mt-3">{tr("以上为第三方公开资源链接，点击在 App 内打开，版权归各自所有者。")}</p>
  </div>;
}
