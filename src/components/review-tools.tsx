import { useEffect, useState } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { tr } from '@/lib/tr';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';

type Speak = (t: string, s?: 'slow' | 'normal' | 'current') => void;
type P = { speak: Speak; onExit: () => void; onRecord: (r: PracticeRecord) => void };

import { loadGuestMistakes, updateGuestMistake } from '@/lib/storage';

// Mistake book: sentences whose real recorded score was below 60, newest first, deduplicated.
export function MistakeBook({ speak, onExit, onRecord }: P) {
  const { user } = useAuth();
  const [items, setItems] = useState<{ target: string; score: number; main_issue: string | null }[]>([]);
  const [pick, setPick] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      // 游客/离线用户：直接从本地持久化错题本加载
      const local = loadGuestMistakes();
      setItems(local.map(m => ({ target: m.target, score: m.score, main_issue: m.main_issue })));
      return;
    }
    void supabase.from('practice_records').select('target,score,main_issue').lt('score', 60).order('created_at', { ascending: false }).limit(100).then(r => {
      const seen = new Set<string>();
      setItems((r.data ?? []).filter(x => !seen.has(x.target) && seen.add(x.target)));
    });
  }, [user]);

  function handleRecord(r: PracticeRecord) {
    onRecord(r);
    // 无论是游客还是登录用户，达标后自动在端侧移出错题本
    updateGuestMistake(r.target, r.analysis.score, r.heard, r.analysis.issues[0]?.fix ?? null);
    if (r.analysis.score >= 60) {
      setItems(prev => prev.filter(it => it.target.toLowerCase() !== r.target.toLowerCase()));
      setPick(null);
    }
  }

  return <div className="adv-hub">
    <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{tr('智能错题本')}</span><span className="w-9" /></div>
    <p className="text-sm text-muted-foreground mb-3">{tr('跟读低于 60 分的句子会自动收录（支持离线记忆），重新读到 60 分以上就算过关。')}</p>
    {items.length === 0 ? <p className="text-sm p-3 text-muted-foreground">{tr('暂无待复习错题，每一次开口都是进步！')}</p> :
      <div className="space-y-2">{items.map(it => <div key={it.target} className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-start gap-2"><div className="flex-1"><b className="text-sm">{it.target}</b><p className="text-xs text-muted-foreground">{it.score} {tr('分')}{it.main_issue ? ' · ' + it.main_issue : ''}</p></div>
          <Button variant="ghost" size="icon" aria-label={tr('听示范')} onClick={() => speak(it.target)}><Volume2 size={16} /></Button>
          <Button variant="outline" size="sm" onClick={() => setPick(pick === it.target ? null : it.target)}>{tr('再练')}</Button></div>
        {pick === it.target && <SpeechCoach key={it.target} target={it.target} onPassed={() => {}} onRecord={handleRecord} />}
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
  { frame: "There is my ___.", zh: '介绍身边的人', fills: ['assistant Mary', 'friend Bill', 'husband', 'wife', 'teacher', 'boss', 'little brother', 'neighbor Tom'] },
  { frame: "There is your ___.", zh: '指给对方看', fills: ['book', 'bag', 'phone', 'coffee', 'taxi', 'seat', 'flight, two-two-one-two', 'room key'] },
  { frame: "Who are the ___?", zh: '问那些人是谁', fills: ['people over there', 'new students', 'men in the car', 'girls at the door', 'guests tonight'] },
  { frame: "Are you here for ___, too?", zh: '搭话：你也来…吗', fills: ['English', 'dinner', 'the concert', 'a class', 'language class', 'the meeting', 'the job interview', 'the free tour'] },
  { frame: "What a ___!", zh: '感叹', fills: ['beautiful day', 'good day', 'nice surprise', 'small world', 'great idea', 'long trip', 'lovely house', 'busy week'] },
  { frame: "This is my ___.", zh: '介绍自己的东西或人', fills: ['first time here', 'sister Anna', 'new phone', 'favorite song', 'office', 'seat'] },
  { frame: "Where is the ___?", zh: '问地方', fills: ['bathroom', 'train station', 'exit', 'nearest bank', 'meeting room', 'bus stop'] },
  { frame: "Can I have ___, please?", zh: '点单 / 要东西', fills: ['a coffee', 'the menu', 'some water', 'the bill', 'a bigger size', 'a receipt'] },
  { frame: "I'd like to ___.", zh: '说想做什么', fills: ['book a table', 'check in', 'pay by card', 'try this on', 'see a doctor', 'open an account'] },
  { frame: "Is there a ___ near here?", zh: '问附近有没有', fills: ['supermarket', 'hospital', 'pharmacy', 'good restaurant', 'subway station', 'park'] },
  { frame: "Let's ___.", zh: '提议一起做', fills: ['go', 'take a break', 'eat out tonight', 'start again', 'ask someone', 'meet tomorrow'] },
  { frame: "I'm looking for ___.", zh: '说在找什么', fills: ['my keys', 'a new job', 'the station', 'a gift for my mom', 'room 302', 'a cheaper hotel'] },
  { frame: "Do you have any ___?", zh: '问有没有', fills: ['questions', 'brothers or sisters', 'plans this weekend', 'smaller ones', 'free time today', 'other colors'] },
  { frame: "How was your ___?", zh: '问经历', fills: ['weekend', 'trip', 'first day', 'interview', 'flight', 'holiday'] },
  { frame: "I have to ___.", zh: '说必须做', fills: ['go now', 'work late', 'call my mom', 'pick up my kids', 'finish this today', 'catch a train'] },
  { frame: "It's too ___.", zh: '说太…了', fills: ['hot', 'expensive', 'far', 'late', 'noisy here', 'small for me'] },
  { frame: "Nice to meet you, ___.", zh: '初次见面', fills: ['Mary', 'Mr. Smith', 'everyone', 'too', 'at last'] },
  { frame: "What time does the ___ start?", zh: '问开始时间', fills: ['class', 'movie', 'meeting', 'concert', 'game', 'party'] },
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
