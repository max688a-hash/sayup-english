import { useRef, useState } from 'react';
import { ArrowLeft, Check, ChevronRight, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { tr } from '@/lib/tr';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';
import { StressDrill, ShadowDrill, ImmersionDrill } from '@/components/speaking-drills';
import apple from '@/assets/words/apple.jpg';
import ball from '@/assets/words/ball.jpg';
import banana from '@/assets/words/banana.jpg';
import cat from '@/assets/words/cat.jpg';
import coffee from '@/assets/words/coffee.jpg';
import colleague from '@/assets/words/colleague.jpg';
import delicious from '@/assets/words/delicious.jpg';
import dog from '@/assets/words/dog.jpg';
import flower from '@/assets/words/flower.jpg';
import happy from '@/assets/words/happy.jpg';
import menu from '@/assets/words/menu.jpg';
import passport from '@/assets/words/passport.jpg';
import please from '@/assets/words/please.jpg';
import recommend from '@/assets/words/recommend.jpg';
import sunshine from '@/assets/words/sunshine.jpg';
import ticket from '@/assets/words/ticket.jpg';

type Speak = (t: string, s?: 'slow' | 'normal' | 'current') => void;
type P = { speak: Speak; onExit: () => void; onRecord: (r: PracticeRecord) => void };

// Each word lives inside a sentence and a same-pattern variant, so the learner hears it in context.
const CARDS: { word: string; img: string; say: string; alt: string }[] = [
  { word: 'apple', img: apple, say: 'I have an apple every morning.', alt: 'I have a banana every morning.' },
  { word: 'banana', img: banana, say: 'Can I have a banana, please?', alt: 'Can I have an apple, please?' },
  { word: 'cat', img: cat, say: 'My cat likes to sleep in the sun.', alt: 'My dog likes to sleep in the sun.' },
  { word: 'dog', img: dog, say: 'I walk my dog after dinner.', alt: 'I walk my dog after work.' },
  { word: 'coffee', img: coffee, say: "I'd like a coffee, please.", alt: "I'd like a tea, please." },
  { word: 'menu', img: menu, say: 'Could I see the menu, please?', alt: 'Could I see the wine list, please?' },
  { word: 'delicious', img: delicious, say: 'This soup is delicious!', alt: 'This cake is delicious!' },
  { word: 'recommend', img: recommend, say: 'What do you recommend?', alt: 'What would you recommend for lunch?' },
  { word: 'ticket', img: ticket, say: 'One ticket to London, please.', alt: 'Two tickets to Paris, please.' },
  { word: 'passport', img: passport, say: 'Here is my passport.', alt: 'Here is my ticket.' },
  { word: 'colleague', img: colleague, say: 'This is my colleague, Anna.', alt: 'This is my friend, Anna.' },
  { word: 'please', img: please, say: 'A glass of water, please.', alt: 'A cup of tea, please.' },
  { word: 'ball', img: ball, say: 'The kids are playing with a ball.', alt: 'The kids are playing in the park.' },
  { word: 'flower', img: flower, say: 'What a beautiful flower!', alt: 'What a beautiful day!' },
  { word: 'happy', img: happy, say: "I'm so happy to see you.", alt: "I'm so glad to see you." },
  { word: 'sunshine', img: sunshine, say: 'I love the morning sunshine.', alt: 'I love the evening breeze.' },
];
const ROUNDS = [0, 1, 2, 3].map(r => CARDS.slice(r * 4, r * 4 + 4));

export function PictureMatch({ speak, onExit, onRecord }: P) {
  const [round, setRound] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [drag, setDrag] = useState<{ word: string; x: number; y: number } | null>(null);
  const [hot, setHot] = useState<string | null>(null);
  const [speakIdx, setSpeakIdx] = useState<number | null>(null);
  const moved = useRef(false);
  const set = ROUNDS[round]!;
  const chips = [...set].sort((a, b) => a.word.localeCompare(b.word)).filter(c => !done.includes(c.word));
  const allDone = done.length === set.length;

  function attempt(word: string, target: string) {
    if (word === target) {
      const c = CARDS.find(x => x.word === word)!;
      setDone(d => [...d, word]); setPicked(null); speak(`${word}. ${c.say}`);
    } else { setWrong(target); setTimeout(() => setWrong(null), 600); speak(word, 'slow'); }
  }
  const dropAt = (x: number, y: number) => (document.elementFromPoint(x, y)?.closest('[data-drop]') as HTMLElement | null)?.dataset.drop ?? null;

  return <div className="adv-hub">
    <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{tr('看图拖拽 · 听词说句')}</span><span className="w-9" /></div>
    <p className="text-sm text-muted-foreground mb-3">{tr('像小孩学说话：先看图、听声音，把单词拖到对应图片上（也可以先点单词再点图片）。配对后会读出整句，最后你自己把句子说出来。')}</p>
    <div className="flex gap-1 mb-3">{ROUNDS.map((_, i) => <Button key={i} size="sm" variant={i === round ? 'default' : 'outline'} onClick={() => { setRound(i); setDone([]); setSpeakIdx(null); }}>{tr('第 {0} 组', i + 1)}</Button>)}</div>
    <div className="grid grid-cols-2 gap-2 mb-3">{set.map(c => {
      const ok = done.includes(c.word);
      return <div key={c.word} data-drop={c.word} className={cn('drop-card relative overflow-hidden rounded-xl border border-border bg-card', hot === c.word && 'hot', wrong === c.word && 'ring-2 ring-destructive')}
        onClick={() => { if (picked && !ok) attempt(picked, c.word); }}>
        <img src={c.img} alt="" draggable={false} loading="lazy" width={300} height={300} className="aspect-square w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/85 px-2 py-1 text-sm">
          {ok ? <><b className="flex items-center gap-1 text-primary"><Check size={14} />{c.word}</b><Button variant="ghost" size="icon" className="h-7 w-7" aria-label={tr('听示范')} onClick={e => { e.stopPropagation(); speak(c.say); }}><Volume2 size={14} /></Button></> : <span className="text-muted-foreground">{tr('拖到这里')}</span>}
        </div>
      </div>;
    })}</div>
    {!allDone && <div className="flex flex-wrap gap-2 mb-3">{chips.map(c => <button key={c.word} type="button"
      className={cn('drag-word rounded-full border border-border bg-card px-4 py-2 text-base font-semibold', picked === c.word && 'ring-2 ring-primary')}
      onPointerDown={e => { moved.current = false; (e.target as HTMLElement).setPointerCapture(e.pointerId); setDrag({ word: c.word, x: e.clientX, y: e.clientY }); }}
      onPointerMove={e => { if (!drag) return; moved.current = true; setDrag({ ...drag, x: e.clientX, y: e.clientY }); setHot(dropAt(e.clientX, e.clientY)); }}
      onPointerUp={e => { const t = drag && moved.current ? dropAt(e.clientX, e.clientY) : null; setDrag(null); setHot(null); if (t) attempt(c.word, t); else { setPicked(c.word); speak(c.word, 'slow'); } }}
      onPointerCancel={() => { setDrag(null); setHot(null); }}>{c.word}</button>)}</div>}
    {drag && moved.current && <div className="pointer-events-none fixed z-50 rounded-full bg-primary px-4 py-2 text-base font-semibold text-primary-foreground shadow-lg" style={{ left: drag.x - 40, top: drag.y - 22 }}>{drag.word}</div>}
    {allDone && <div className="space-y-2">
      <p className="text-sm font-semibold">{tr('全部配对！现在把句子说出来：先听原句，再听同类句，然后录音。')}</p>
      {set.map((c, i) => <div key={c.word} className="rounded-lg border border-border bg-card p-3">
        <div className="flex items-center gap-2"><b className="flex-1 text-sm">{c.say}</b><Button variant="ghost" size="icon" aria-label={tr('听示范')} onClick={() => speak(c.say)}><Volume2 size={16} /></Button></div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="flex-1">{tr('同类句：')}{c.alt}</span><Button variant="ghost" size="icon" className="h-7 w-7" aria-label={tr('听示范')} onClick={() => speak(c.alt)}><Volume2 size={14} /></Button></div>
        {speakIdx === i ? <div className="mt-2"><SpeechCoach target={c.say} onPassed={() => setSpeakIdx(i + 1 < set.length ? i + 1 : null)} onRecord={onRecord} /></div>
          : <Button size="sm" variant="outline" className="mt-2" onClick={() => setSpeakIdx(i)}>{tr('我来说')}</Button>}
      </div>)}
      {round + 1 < ROUNDS.length && <Button className="w-full" onClick={() => { setRound(round + 1); setDone([]); setSpeakIdx(null); }}>{tr('下一组')} <ChevronRight size={16} /></Button>}
    </div>}
  </div>;
}

type Step = 'match' | 'shadow' | 'stress' | 'immerse';
const STEPS: { k: Step; title: string; sub: string }[] = [
  { k: 'match', title: '1. 看图拖拽 · 听词说句', sub: '看图听音，单词放进句子里记' },
  { k: 'shadow', title: '2. 跟读模仿', sub: '示范一停就跟说，模仿语调节奏' },
  { k: 'stress', title: '3. 重音节奏', sub: '读对重音，别人才听得懂' },
  { k: 'immerse', title: '4. 沉浸复述', sub: '盲听 → 答题 → 用自己的话说出来' },
];

// One speaking-training module that follows how children acquire language: see+hear → imitate → rhythm → understand and retell.
export function SpeakingGym({ speak, onExit, onRecord, initial }: P & { initial?: Step }) {
  const [step, setStep] = useState<Step | null>(initial ?? null);
  const back = () => setStep(null);
  if (step === 'match') return <PictureMatch speak={speak} onExit={back} onRecord={onRecord} />;
  if (step === 'shadow') return <ShadowDrill speak={speak} onExit={back} onRecord={onRecord} />;
  if (step === 'stress') return <StressDrill speak={speak} onExit={back} onRecord={onRecord} />;
  if (step === 'immerse') return <ImmersionDrill speak={speak} onExit={back} onRecord={onRecord} />;
  return <div className="adv-hub">
    <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{tr('口语训练营')}</span><span className="w-9" /></div>
    <p className="text-sm text-muted-foreground mb-3">{tr('按孩子学说话的顺序练：先看图听声，再模仿，再练节奏，最后听懂并复述。同一个词、同一类句子会反复出现。')}</p>
    <div className="space-y-2">{STEPS.map(s => <Button key={s.k} variant="outline" className="h-auto w-full justify-between py-3 text-left whitespace-normal" onClick={() => setStep(s.k)}>
      <span><b className="block">{tr(s.title)}</b><span className="text-xs text-muted-foreground">{tr(s.sub)}</span></span><ChevronRight size={18} /></Button>)}</div>
  </div>;
}
