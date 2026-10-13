import { useState } from 'react';
import { ArrowLeft, ChevronRight, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';
import { tr } from '@/lib/tr';

type Sound = { id: string; title: string; how: string; pairs: [string, string][]; sentence: string };
// Sounds that Chinese, Vietnamese and Japanese speakers most often confuse.
const SOUNDS: Sound[] = [
  { id: 'i', title: '长音 /iː/ 和短音 /ɪ/', how: '/iː/ 嘴角往两边拉、拉长；/ɪ/ 嘴放松、短促，像轻轻一下。', pairs: [['sheep', 'ship'], ['leave', 'live'], ['seat', 'sit']], sentence: 'Please sit in this seat.' },
  { id: 'th', title: '咬舌音 /θ/ 和 /s/', how: '舌尖轻放在上下门牙之间往外吹气，不要发成 s 或 f。', pairs: [['think', 'sink'], ['thank', 'sank'], ['mouth', 'mouse']], sentence: 'I think three is enough.' },
  { id: 'lr', title: '/l/ 和 /r/', how: '/l/ 舌尖顶住上牙后面；/r/ 舌尖往后卷、不碰任何地方，嘴唇略圆。', pairs: [['light', 'right'], ['long', 'wrong'], ['play', 'pray']], sentence: 'Turn right at the light.' },
  { id: 'vw', title: '/v/ 和 /w/', how: '/v/ 上牙轻咬下唇震动；/w/ 嘴唇收圆往前送，牙齿不碰嘴唇。', pairs: [['vest', 'west'], ['vine', 'wine'], ['very', 'wary']], sentence: 'We have very good wine.' },
  { id: 'nl', title: '/n/ 和 /l/', how: '/n/ 气从鼻子出；/l/ 气从舌头两边出。捏住鼻子说 l 应该不受影响。', pairs: [['night', 'light'], ['no', 'low'], ['knee', 'lee']], sentence: 'Leave the light on at night.' },
  { id: 'end', title: '词尾辅音不吞掉', how: '结尾的 t、d、k 要轻轻收住，不要加元音变成“特、的、克”，也不要整个吞掉。', pairs: [['bed', 'bet'], ['back', 'bag'], ['card', 'car']], sentence: 'I need a bag for my card.' },
  { id: 'ae', title: '/æ/ 和 /e/', how: '/æ/ 嘴张大、下巴往下放；/e/ 嘴半张、比 /æ/ 小很多。', pairs: [['bad', 'bed'], ['man', 'men'], ['had', 'head']], sentence: 'The man had a bad day.' },
  { id: 'z', title: '/z/ 和 /s/', how: '/z/ 是 /s/ 的震动版，手放喉咙能感到震动；很多复数结尾读 /z/。', pairs: [['zoo', 'sue'], ['prize', 'price'], ['eyes', 'ice']], sentence: 'Close your eyes and win a prize.' },
];

export function PronLab({ speak, onExit, onRecord }: { speak: (t: string, s?: 'slow' | 'normal' | 'current') => void; onExit: () => void; onRecord: (r: PracticeRecord) => void }) {
  const [sel, setSel] = useState<Sound | null>(null);
  const [target, setTarget] = useState('');
  const head = (title: string, back: () => void) => <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={back}><ArrowLeft /></Button><span>{title}</span><span className="w-9" /></div>;
  if (!sel) return <div className="adv-hub">{head(tr('发音实验室'), onExit)}
    <div className="strength-summary"><div><span className="eyebrow">{tr('8 组最易混的音')}</span><h2>{tr('先听清区别，再录音让 AI 纠正')}</h2><p>{tr('每组：看发音方法 → 听对比词 → 跟读词和句子。')}</p></div></div>
    {SOUNDS.map(s => <Button key={s.id} variant="ghost" className="weak-card" onClick={() => { setSel(s); setTarget(s.pairs[0]![0]); }}><div className="text-left"><h3>{tr(s.title)}</h3><p>{s.pairs.map(p => p.join(' / ')).join(' · ')}</p></div><ChevronRight className="ml-auto" /></Button>)}
  </div>;
  return <div className="adv-hub">{head(tr(sel.title), () => setSel(null))}
    <div className="member-box"><div><b>{tr('怎么发')}</b><p>{tr(sel.how)}</p></div></div>
    <div className="flex flex-col gap-2 my-3">{sel.pairs.map(([a, b]) => <div key={a} className="flex items-center gap-2">
      {[a, b].map(w => <div key={w} className="flex-1 flex items-center gap-1 rounded-lg border p-1"><Button variant={target === w ? 'default' : 'ghost'} size="sm" className="flex-1" onClick={() => setTarget(w)}>{w}</Button><Button variant="ghost" size="icon" aria-label={tr('朗读') + ' ' + w} onClick={() => speak(w, 'slow')}><Volume2 /></Button></div>)}
    </div>)}
      <div className="flex items-center gap-1 rounded-lg border p-1"><Button variant={target === sel.sentence ? 'default' : 'ghost'} size="sm" className="flex-1" onClick={() => setTarget(sel.sentence)}>{sel.sentence}</Button><Button variant="ghost" size="icon" aria-label={tr('朗读') + ' ' + sel.sentence} onClick={() => speak(sel.sentence)}><Volume2 /></Button></div>
    </div>
    <p className="text-xs text-muted-foreground mb-2">{tr('点上面的词或句子选择要跟读的内容，然后录音。')}</p>
    <SpeechCoach key={target} target={target} onPassed={() => {}} onRecord={onRecord} />
  </div>;
}
