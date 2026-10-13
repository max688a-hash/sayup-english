import { useEffect, useState } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { tr } from '@/lib/tr';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';

type Speak = (t: string, s?: 'slow' | 'normal' | 'current') => void;
type P = { speak: Speak; onExit: () => void; onRecord: (r: PracticeRecord) => void };

// Mistake book: sentences whose real recorded score was below 60, newest first, deduplicated.
export function MistakeBook({ speak, onExit, onRecord }: P) {
  const { user } = useAuth();
  const [items, setItems] = useState<{ target: string; score: number; main_issue: string | null }[]>([]);
  const [pick, setPick] = useState<string | null>(null);
  useEffect(() => { if (!user) return; void supabase.from('practice_records').select('target,score,main_issue').lt('score', 60).order('created_at', { ascending: false }).limit(100).then(r => {
    const seen = new Set<string>(); setItems((r.data ?? []).filter(x => !seen.has(x.target) && seen.add(x.target)));
  }); }, [user]);
  return <div className="adv-hub">
    <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{tr('智能错题本')}</span><span className="w-9" /></div>
    <p className="text-sm text-muted-foreground mb-3">{tr('跟读低于 60 分的句子会自动收进来，重新读到 60 分以上就算过关。')}</p>
    {!user ? <p className="text-sm p-3">{tr('登录后才能保存错题。')}</p> : items.length === 0 ? <p className="text-sm p-3">{tr('还没有错题，继续练习吧。')}</p> :
      <div className="space-y-2">{items.map(it => <div key={it.target} className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-start gap-2"><div className="flex-1"><b className="text-sm">{it.target}</b><p className="text-xs text-muted-foreground">{it.score} {tr('分')}{it.main_issue ? ' · ' + it.main_issue : ''}</p></div>
          <Button variant="ghost" size="icon" aria-label={tr('听示范')} onClick={() => speak(it.target)}><Volume2 size={16} /></Button>
          <Button variant="outline" size="sm" onClick={() => setPick(pick === it.target ? null : it.target)}>{tr('再练')}</Button></div>
        {pick === it.target && <SpeechCoach key={it.target} target={it.target} onPassed={() => {}} onRecord={onRecord} />}
      </div>)}</div>}
  </div>;
}

const CHUNKS: { frame: string; zh: string; fills: string[] }[] = [
  { frame: "Could you ___, please?", zh: '礼貌请求', fills: ['say that again', 'speak more slowly', 'help me with this', 'send me the file'] },
  { frame: "I'm thinking of ___.", zh: '说打算', fills: ['changing jobs', 'learning to cook', 'visiting Japan', 'moving next year'] },
  { frame: "Do you mind if I ___?", zh: '征求同意', fills: ['open the window', 'sit here', 'ask a question', 'leave a bit early'] },
  { frame: "The thing is, ___.", zh: '说明难处', fills: ["I'm a bit busy today", "I don't have the details yet", "the price is too high", "we're running late"] },
  { frame: "How about ___?", zh: '提建议', fills: ['meeting at three', 'trying the new place', 'taking a short break', 'asking the manager'] },
  { frame: "I used to ___, but now ___.", zh: '说变化', fills: ['hate coffee / I love it', 'live in Hanoi / I live in Tokyo', 'work at night / I work from home'] },
  { frame: "It depends on ___.", zh: '表达看情况', fills: ['the weather', 'how much it costs', 'my schedule', 'what my boss says'] },
  { frame: "I'm not sure, but I think ___.", zh: '委婉表达观点', fills: ["it's on the second floor", 'the meeting is on Friday', "we should wait", "she's right"] },
];
const fill = (frame: string, f: string) => { const parts = f.split(' / '); let i = 0; return frame.replace(/___/g, () => parts[i++] ?? parts[0] ?? ''); };

// Phrase chunks: one sentence frame, swap the blank, say each full sentence aloud.
export function ChunkDrill({ speak, onExit, onRecord }: P) {
  const [ci, setCi] = useState(0);
  const [fi, setFi] = useState(0);
  const c = CHUNKS[ci] ?? CHUNKS[0]!; const sentence = fill(c.frame, c.fills[fi] ?? '');
  return <div className="adv-hub">
    <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{tr('短语块 · 句型替换')}</span><span className="w-9" /></div>
    <div className="flex flex-wrap gap-1 mb-3">{CHUNKS.map((x, i) => <Button key={x.frame} size="sm" variant={i === ci ? 'default' : 'outline'} onClick={() => { setCi(i); setFi(0); }}>{tr(x.zh)}</Button>)}</div>
    <div className="rounded-lg border border-border bg-card p-4 mb-3"><p className="text-xs text-muted-foreground">{tr('句型')}</p><b>{c.frame}</b></div>
    <div className="flex flex-wrap gap-1 mb-3">{c.fills.map((f, i) => <Button key={f} size="sm" variant={i === fi ? 'secondary' : 'ghost'} onClick={() => setFi(i)}>{f}</Button>)}</div>
    <div className="flex items-center gap-2 mb-2"><b className="flex-1">{sentence}</b><Button variant="ghost" size="icon" aria-label={tr('听示范')} onClick={() => speak(sentence)}><Volume2 size={16} /></Button></div>
    <SpeechCoach key={sentence} target={sentence} onPassed={() => setFi((fi + 1) % c.fills.length)} onRecord={onRecord} />
  </div>;
}
