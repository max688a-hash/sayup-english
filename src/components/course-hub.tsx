import { tr } from '@/lib/tr';
import { useEffect, useState } from 'react';
import { useAuth, saveProgress } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Check, ChevronRight, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';
import { cn } from '@/lib/utils';
import { COURSE, STAGES, type Week } from '@/lib/course12';

type Speak = (text: string, speed?: 'slow' | 'normal' | 'current') => void;
const STEPS = ['听懂', '跟读', '替换练', '对话', '任务'] as const;

export function CourseHub({ speak, onRecord, onExit }: { speak: Speak; onRecord: (r: PracticeRecord) => void; onExit: () => void }) {
  const [week, setWeek] = useState<Week | null>(null);
  const [step, setStep] = useState(0);
  const [k, setK] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const { user } = useAuth();
  useEffect(() => { if (!user) return; supabase.from('learning_progress').select('item_key').like('item_key', 'course:%').then(r => setDone((r.data ?? []).map(x => Number(x.item_key.split(':')[1])))); }, [user]);
  const head = (title: string, back: () => void) => <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={back}><ArrowLeft /></Button><span>{title}</span><span className="w-9" /></div>;

  if (!week) return <div className="adv-hub">{head(tr('12 周主线课程'), onExit)}
    <div className="strength-summary"><div><span className="eyebrow">{tr('A2 → B1+ · 约 3 个月')}</span><h2>{tr('日常与职场英语')}</h2><p>{tr('每周一个真实场景：先听懂，再跟读，再替换句型，最后开口完成任务。每天约 20 分钟。')}</p>{!user && <p className="text-xs text-amber mt-1">{tr('未登录：完成记录只保存到刷新前。点右上角头像登录即可长期保存。')}</p>}</div></div>
    {STAGES.map(s => <div key={tr(s.name)}><div className="section-heading"><h2>{tr(s.name)}</h2><span>{tr(s.weeks)}</span></div><p className="adv-zh mb-2">{tr(s.desc)}</p>
      <div className="weak-list">{COURSE.filter(w => w.stage === s.name).map(w => <Button variant="ghost" className="weak-card" key={w.week} onClick={() => { setWeek(w); setStep(0); setK(0); }}><span className={cn('path-number', done.includes(w.week) && 'active')}>{done.includes(w.week) ? <Check size={18} /> : String(w.week).padStart(2, '0')}</span><div className="text-left min-w-0"><h3>{tr(w.title)}</h3><p>{tr(w.goal)}</p></div><ChevronRight className="ml-auto" /></Button>)}</div></div>)}
  </div>;

  const back = () => { if (step > 0) { setStep(step - 1); setK(0); } else setWeek(null); };
  const next = () => { setStep(step + 1); setK(0); };
  const bar = <div className="story-steps">{STEPS.map((s, i) => <span key={s} className={cn(i <= step && 'on')}>{tr(s)}</span>)}</div>;
  const title = tr('第 {0} 周 · {1}', week.week, tr(week.title));

  if (step === 0) return <div className="adv-hub">{head(title, back)}{bar}
    <p className="adv-zh">{tr('本周目标：{0}。先听，每句点开听 2–3 遍，看懂中文意思。', week.goal)}</p>
    <div className="weak-list">{week.phrases.map(p => <Button variant="ghost" className="weak-card" key={p.en} onClick={() => speak(p.en, 'current')}><div className="text-left min-w-0"><h3 className="whitespace-normal">{p.en}</h3><p>{tr(p.zh)}</p></div><Volume2 size={16} className="ml-auto shrink-0" /></Button>)}</div>
    <Button className="w-full mt-3" onClick={next}>{tr('听懂了，去跟读')}</Button>
  </div>;

  if (step === 1) { const p = week.phrases[k]!; const last = k >= week.phrases.length - 1;
    return <div className="adv-hub">{head(title, back)}{bar}
      <p className="adv-zh">{tr('跟读第 {0} / {1} 句，录音后 AI 逐词纠正。', k + 1, week.phrases.length)}</p>
      <div className="adv-card"><p className="adv-q-title">{p.en}</p><p className="adv-zh">{tr(p.zh)}</p><div className="flex gap-1"><Button size="sm" variant="ghost" onClick={() => speak(p.en, 'slow')}><Volume2 size={14} />{tr('慢速')}</Button><Button size="sm" variant="ghost" onClick={() => speak(p.en, 'normal')}><Volume2 size={14} />{tr('正常')}</Button></div></div>
      <SpeechCoach key={p.en} target={p.en} onPassed={() => {}} onRecord={onRecord} />
      <Button className="w-full mt-3" variant={last ? 'default' : 'outline'} onClick={() => last ? next() : setK(k + 1)}>{last ? tr('去替换练') : tr('下一句')}</Button>
    </div>; }

  if (step === 2) { const d = week.drills[k]!; const last = k >= week.drills.length - 1;
    return <div className="adv-hub">{head(title, back)}{bar}
      <p className="adv-zh">{tr('一个句型换不同的词说，说熟了就能举一反三（{0} / {1}）。', k + 1, week.drills.length)}</p>
      <div className="adv-card"><p className="adv-q-title">{d.pattern}</p><p className="adv-zh">{tr(d.zh)}</p></div>
      <div className="weak-list">{d.slots.map(s => { const full = fill(d.pattern, s); return <Button variant="ghost" className="weak-card" key={s} onClick={() => speak(full, 'current')}><div className="text-left min-w-0"><h3 className="whitespace-normal">{full}</h3><p>{tr('点一下听，然后自己大声说一遍')}</p></div><Volume2 size={16} className="ml-auto shrink-0" /></Button>; })}</div>
      <div className="section-heading"><h2>{tr('换成你自己的词说一句')}</h2></div>
      <SpeechCoach key={d.pattern} target={fill(d.pattern, d.slots[0]!)} onPassed={() => {}} onRecord={onRecord} />
      <Button className="w-full mt-3" variant={last ? 'default' : 'outline'} onClick={() => last ? next() : setK(k + 1)}>{last ? tr('去练对话') : tr('下一个句型')}</Button>
    </div>; }

  if (step === 3) { const lines = week.dialogue; const mine = lines.filter(l => l.who === 'B'); const line = mine[k]!; const last = k >= mine.length - 1;
    return <div className="adv-hub">{head(title, back)}{bar}
      <p className="adv-zh">{tr('你演 B。先听完整对话，再一句句说出你的台词（{0} / {1}）。', k + 1, mine.length)}</p>
      <div className="adv-card story-text">{lines.map((l, i) => <button type="button" key={i} className={cn('story-line', l === line && 'now')} onClick={() => speak(l.en, 'current')}><span><b>{l.who === 'A' ? tr('对方') : tr('你')}：</b>{l.en}</span><small>{tr(l.zh)}</small></button>)}</div>
      <Button size="sm" variant="outline" className="mb-2" onClick={() => speak(lines.map(l => l.en).join(' '), 'current')}><Volume2 size={14} />{tr('听完整对话')}</Button>
      <SpeechCoach key={line.en} target={line.en} onPassed={() => {}} onRecord={onRecord} />
      <Button className="w-full mt-3" variant={last ? 'default' : 'outline'} onClick={() => last ? next() : setK(k + 1)}>{last ? tr('去完成本周任务') : tr('下一句台词')}</Button>
    </div>; }

  return <div className="adv-hub">{head(title, back)}{bar}
    <div className="adv-card"><b>{tr('本周任务')}</b><p className="adv-q-title">{week.task.en}</p><p className="adv-zh">{tr(week.task.zh)}</p></div>
    <p className="adv-zh">{tr('不看稿，用本周学的句子自由说。AI 会对照本周的示范句帮你找出问题。')}</p>
    <SpeechCoach key={`task-${week.week}`} target={week.phrases.map(p => p.en).join(' ')} onPassed={() => {}} onRecord={onRecord} />
    <Button className="w-full mt-3" onClick={() => { setDone(d => d.includes(week.week) ? d : [...d, week.week]); if (user) void saveProgress(user.id, `course:${week.week}`); setWeek(null); }}>{tr('完成第 {0} 周', week.week)}</Button>
  </div>;
}

function fill(pattern: string, slot: string) {
  const parts = slot.split(' / ');
  let i = 0;
  return pattern.replace(/___/g, () => parts[i++] ?? parts[0] ?? '');
}
