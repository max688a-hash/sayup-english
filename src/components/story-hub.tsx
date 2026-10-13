// @ts-nocheck -- renders untyped content ported from the original data files
import { useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronRight, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';
import { cn } from '@/lib/utils';
import { TPRS_STORIES, TPRS_METHOD_INFO } from '@/lib/advanced/tprsStories';
import { QUESTIONS, recommendTier } from '@/lib/advanced/placementTest';

type Speak = (text: string, speed?: 'slow' | 'normal' | 'current') => void;
const CEFR = ['A1', 'A2', 'B1', 'B2', 'C1'];
const CEFR_LABEL: Record<string, string> = { A1: '入门', A2: '基础', B1: '中级', B2: '中高', C1: '高级' };
const TIER: Record<string, { label: string; cefr: string; desc: string }> = {
  kids: { label: '启蒙档', cefr: 'Pre-A1', desc: '从字母、单词和最简单的句子开始' },
  a1: { label: '入门档', cefr: 'A1', desc: '能听懂并说出日常短句' },
  a2: { label: '基础档', cefr: 'A2', desc: '能应付购物、问路等常见场景' },
  b1: { label: '中级档', cefr: 'B1', desc: '能讲述经历、表达想法' },
  b2: { label: '中高档', cefr: 'B2', desc: '能就熟悉话题流畅讨论' },
  c1: { label: '高级档', cefr: 'C1', desc: '能灵活、准确地表达复杂观点' },
};
const TYPE_LABEL: Record<string, string> = { yes_no: '是非问', either_or: '二选一', wh: '特殊疑问' };

function shuffle<T>(a: T[]) { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }

function Head({ title, onBack }: { title: string; onBack: () => void }) {
  return <div className="detail-heading"><Button variant="ghost" size="icon" aria-label="返回上一级" onClick={onBack}><ArrowLeft /></Button><span>{title}</span><span className="w-9" /></div>;
}

export function PlacementTest({ speak, onExit, onStart }: { speak: Speak; onExit: () => void; onStart: (cefr: string) => void }) {
  const qs = useMemo(() => QUESTIONS.map(q => ({ ...q, shuffled: shuffle(q.options) })), []);
  const [idx, setIdx] = useState(0);
  const [picks, setPicks] = useState<{ correct: boolean; tier: string }[]>([]);
  const [picked, setPicked] = useState<string | null>(null);

  if (idx >= qs.length) {
    const byTier = picks.reduce((a, p) => { if (p.correct) a[p.tier] = (a[p.tier] || 0) + 1; return a; }, {} as Record<string, number>);
    const rec = recommendTier(byTier);
    const meta = TIER[rec];
    const total = picks.filter(p => p.correct).length;
    return <div className="adv-hub"><Head title="测评结果" onBack={onExit} />
      <div className="strength-summary"><div><span className="eyebrow">答对 {total} / {qs.length}</span><h2>推荐从「{meta.label}」开始</h2><p>{meta.cefr} · {meta.desc}</p></div></div>
      <div className="adv-card">{CEFR.map(c => { const t = c.toLowerCase(); return <p key={c} className="flex justify-between"><span>{c} {CEFR_LABEL[c]}</span><b>{byTier[t] || 0} / 2</b></p>; })}</div>
      <p className="adv-zh my-3">这不是考试，只是帮你挑一个学起来不费劲的起点。挑高挑低都行，随时能换。</p>
      <Button className="w-full" onClick={() => onStart(rec === 'kids' ? 'A1' : rec.toUpperCase())}>读 {rec === 'kids' ? 'A1' : rec.toUpperCase()} 级故事 <ChevronRight size={16} /></Button>
      <Button variant="outline" className="w-full mt-2" onClick={() => { setIdx(0); setPicks([]); }}>重新测一次</Button>
    </div>;
  }

  const q = qs[idx];
  const answer = q.options[0];
  const pick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    setTimeout(() => { setPicks(p => [...p, { correct: opt === answer, tier: q.tier }]); setPicked(null); setIdx(i => i + 1); }, 900);
  };
  return <div className="adv-hub"><Head title={`入门水平测试 · ${idx + 1} / ${qs.length}`} onBack={onExit} />
    <div className="placement-bar"><span style={{ width: `${(idx / qs.length) * 100}%` }} /></div>
    <div className="adv-card"><span className="level-tag">{TIER[q.tier].cefr}</span><p className="adv-q-title mt-2">{q.prompt}</p><Button size="sm" variant="ghost" onClick={() => speak(q.prompt, 'normal')}><Volume2 size={14} /> 听题</Button></div>
    <div className="adv-options col">{q.shuffled.map(opt => <Button key={opt} variant="outline" disabled={!!picked} className={cn('adv-option', picked && opt === answer && 'right', picked === opt && opt !== answer && 'wrong')} onClick={() => pick(opt)}>{opt}</Button>)}</div>
  </div>;
}

type Phase = 'list' | 'pqa' | 'read' | 'echo' | 'circling' | 'done';

export function StoryReader({ speak, onRecord, onExit, initialLevel }: { speak: Speak; onRecord: (r: PracticeRecord) => void; onExit: () => void; initialLevel?: string | undefined }) {
  const [level, setLevel] = useState(initialLevel ?? 'A1');
  const [story, setStory] = useState<any>(null);
  const [phase, setPhase] = useState<Phase>('list');
  const [i, setI] = useState(0);
  const [results, setResults] = useState<({ correct: boolean; chosen: string } | undefined)[]>([]);
  const go = (p: Phase) => { setPhase(p); setI(0); };
  const back = () => { const order: Phase[] = ['list', 'pqa', 'read', 'echo', 'circling', 'done']; const k = order.indexOf(phase); if (k <= 1) { if (phase === 'list') onExit(); else { setStory(null); go('list'); } } else go(order[k - 1]); };
  const steps = <div className="story-steps">{['预热', '读故事', '跟读', '问答', '完成'].map((s, k) => <span key={s} className={cn(k <= ['pqa', 'read', 'echo', 'circling', 'done'].indexOf(phase) && 'on')}>{s}</span>)}</div>;

  if (phase === 'list' || !story) {
    const rows = TPRS_STORIES.filter(s => s.cefr === level);
    return <div className="adv-hub"><Head title={`故事阅读 · ${TPRS_STORIES.length} 篇`} onBack={onExit} />
      <div className="adv-card"><b>{TPRS_METHOD_INFO.title}</b><p className="adv-zh">先聊聊你自己，再读故事、跟读关键句，最后用反复问答把句型记牢。</p></div>
      <div className="filter-row">{CEFR.map(c => <Button key={c} size="sm" variant={c === level ? 'default' : 'outline'} className="filter-button" onClick={() => setLevel(c)}>{c} {CEFR_LABEL[c]}</Button>)}</div>
      <div className="weak-list">{rows.map(s => <Button variant="ghost" className="weak-card" key={s.id} onClick={() => { setStory(s); setResults([]); go('pqa'); }}><div className="text-left min-w-0"><h3 className="truncate">{s.titleZh}</h3><p>{s.titleEn} · 约 {s.minutes} 分钟 · {s.sentences.length} 句</p></div><span className="level-tag ml-auto">{s.cefr}</span><ChevronRight /></Button>)}</div>
    </div>;
  }

  if (phase === 'pqa') {
    const q = story.pqa[i]; const last = i >= story.pqa.length - 1;
    return <div className="adv-hub"><Head title={story.titleZh} onBack={back} />{steps}
      <p className="adv-zh">先用跟你自己有关的问题热身，想一想你会怎么回答（{i + 1} / {story.pqa.length}）。</p>
      <div className="adv-card"><p className="adv-q-title">{q.en}</p><p className="adv-zh">{q.zh}</p><Button size="sm" variant="ghost" onClick={() => speak(q.en, 'normal')}><Volume2 size={14} /> 听问题</Button></div>
      <div className="adv-card"><b>本篇要学的说法</b>{story.targetPhrases.map((p: any) => <p key={p.en}><span className="story-key">{p.en}</span> <span className="adv-zh">{p.zh}</span></p>)}</div>
      <Button className="w-full" onClick={() => last ? go('read') : setI(i + 1)}>{last ? '开始读故事' : '下一个问题'} <ChevronRight size={16} /></Button>
    </div>;
  }

  if (phase === 'read') {
    const shown = story.sentences.slice(0, i + 1); const last = i >= story.sentences.length - 1;
    return <div className="adv-hub"><Head title={story.titleZh} onBack={back} />{steps}
      <p className="adv-zh">一句一句往下读，点句子可以听朗读。（{i + 1} / {story.sentences.length}）</p>
      <div className="adv-card story-text">{shown.map((s: any, k: number) => <button type="button" key={k} className={cn('story-line', k === i && 'now')} onClick={() => speak(s.en, 'current')}><span>{s.keyPhrase ? highlight(s.en, s.keyPhrase) : s.en}</span><small>{s.zh}</small></button>)}</div>
      <div className="flex gap-2"><Button variant="outline" className="flex-1" onClick={() => speak(story.sentences.map((s: any) => s.en).join(' '), 'current')}><Volume2 size={14} /> 听全文</Button><Button className="flex-1" onClick={() => { if (last) go('echo'); else { setI(i + 1); speak(story.sentences[i + 1].en, 'current'); } }}>{last ? '去跟读' : '下一句'}</Button></div>
    </div>;
  }

  if (phase === 'echo') {
    const keys = story.sentences.filter((s: any) => s.keyPhrase); const s = keys[i] ?? story.sentences[0]; const last = i >= keys.length - 1;
    return <div className="adv-hub"><Head title={story.titleZh} onBack={back} />{steps}
      <p className="adv-zh">跟读含关键说法的句子（{i + 1} / {Math.max(keys.length, 1)}），录音后 AI 逐词纠正。</p>
      <div className="adv-card"><p className="adv-q-title">{highlight(s.en, s.keyPhrase)}</p><p className="adv-zh">{s.zh}</p><Button size="sm" variant="ghost" onClick={() => speak(s.en, 'slow')}><Volume2 size={14} /> 慢速示范</Button></div>
      <SpeechCoach key={s.en} target={s.en} onPassed={() => {}} onRecord={onRecord} />
      <Button className="w-full mt-3" variant={last ? 'default' : 'outline'} onClick={() => last ? go('circling') : setI(i + 1)}>{last ? '进入问答' : '下一句'}</Button>
    </div>;
  }

  if (phase === 'circling') {
    const item = story.circling[i]; const r = results[i]; const last = i >= story.circling.length - 1;
    const pick = (c: string) => { if (r) return; const next = [...results]; next[i] = { correct: c === item.answer, chosen: c }; setResults(next); speak(item.answer, 'current'); };
    return <div className="adv-hub"><Head title={story.titleZh} onBack={back} />{steps}
      <p className="adv-zh">第 {i + 1} / {story.circling.length} 题 · {TYPE_LABEL[item.type] ?? '问答'}。听问题，选出故事里的说法。</p>
      <div className="adv-card"><p className="adv-q-title">{item.question}</p><p className="adv-zh">{item.questionZh}</p><Button size="sm" variant="ghost" onClick={() => speak(item.question, 'normal')}><Volume2 size={14} /> 听问题</Button></div>
      <div className="adv-options col">{item.choices.map((c: string) => <Button key={c} variant="outline" className={cn('adv-option', r && c === item.answer && 'right')} onClick={() => pick(c)}>{r && c === item.answer && <Check size={16} />}{c}</Button>)}</div>
      {r && <div className="adv-card"><b>{r.correct ? '答对了' : '地道的说法是'}</b><p>{item.answer}</p><p className="adv-zh">{item.answerZh}</p><Button size="sm" variant="ghost" onClick={() => speak(item.answer, 'current')}><Volume2 size={14} /> 再听一遍</Button></div>}
      {r && <Button className="w-full" onClick={() => last ? setPhase('done') : setI(i + 1)}>{last ? '完成' : '下一题'}</Button>}
    </div>;
  }

  const right = results.filter(x => x?.correct).length;
  return <div className="adv-hub"><Head title={story.titleZh} onBack={back} />{steps}
    <div className="strength-summary"><div><span className="eyebrow">STORY DONE</span><h2>读完《{story.titleZh}》</h2><p>问答一次答对 {right} / {story.circling.length} 题</p></div></div>
    <div className="adv-card"><b>最后一步：复述故事</b><p className="adv-zh">不看原文，用上这些说法把故事讲一遍：</p>{story.targetPhrases.map((p: any) => <p key={p.en}><span className="story-key">{p.en}</span> <span className="adv-zh">{p.zh}</span></p>)}</div>
    <SpeechCoach key={`retell-${story.id}`} target={story.sentences.map((s: any) => s.en).join(' ')} onPassed={() => {}} onRecord={onRecord} />
    <div className="flex gap-2 mt-3"><Button variant="outline" className="flex-1" onClick={() => { setResults([]); go('read'); }}>再读一遍</Button><Button className="flex-1" onClick={() => { setStory(null); go('list'); }}>换一篇</Button></div>
  </div>;
}

function highlight(text: string, key?: string | null) {
  if (!key) return text;
  const k = text.toLowerCase().indexOf(key.toLowerCase());
  if (k < 0) return text;
  return <>{text.slice(0, k)}<span className="story-key">{text.slice(k, k + key.length)}</span>{text.slice(k + key.length)}</>;
}
