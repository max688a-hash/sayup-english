import { useState } from 'react';
import { ArrowLeft, Mic, Send, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tr } from '@/lib/tr';
import { freeChat } from '@/utils/chat.functions';

type Turn = { role: 'user' | 'assistant'; content: string; correction?: string; tip?: string };
const SCENES = ['在咖啡店点单', '和新同事闲聊', '酒店办理入住', '面试自我介绍', '周末计划', '随便聊聊'];

// Free conversation with AI: speak (browser recognition) or type; AI answers and corrects.
export function FreeChat({ speak, lang, onExit }: { speak: (t: string) => void; lang: string; onExit: () => void }) {
  const [scene, setScene] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [err, setErr] = useState('');

  async function send(list: Turn[], sc: string) {
    setBusy(true); setErr('');
    try {
      const r = await freeChat({ data: { scene: sc, lang, messages: list.map(t => ({ role: t.role, content: t.content })) } });
      const last = list[list.length - 1];
      const fixed = last ? [...list.slice(0, -1), { ...last, correction: r.correction, tip: r.tip }] : list;
      setTurns([...fixed, { role: 'assistant', content: r.reply }]);
      speak(r.reply);
    } catch (e) { setErr(e instanceof Error ? e.message : tr('AI 暂时不可用')); }
    setBusy(false);
  }
  function start(sc: string) { setScene(sc); setTurns([]); void send([], sc); }
  function submit(text: string) {
    const t = text.trim(); if (!t || !scene || busy) return;
    const list = [...turns, { role: 'user' as const, content: t }]; setTurns(list); setInput(''); void send(list, scene);
  }
  function listen() {
    const W = window as unknown as { SpeechRecognition?: new () => any; webkitSpeechRecognition?: new () => any };
    const SR = W.SpeechRecognition ?? W.webkitSpeechRecognition;
    if (!SR) { setErr(tr('这个浏览器不支持语音输入，请直接打字。')); return; }
    const rec = new SR(); rec.lang = 'en-US'; rec.interimResults = false;
    rec.onresult = (e: any) => { const said = e.results?.[0]?.[0]?.transcript ?? ''; if (said) submit(said); else setErr(tr('没听到声音，请再说一次。')); };
    rec.onerror = () => setErr(tr('没听到声音，请再说一次。'));
    rec.onend = () => setListening(false);
    setListening(true); rec.start();
  }

  return <div className="adv-hub">
    <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={() => scene ? setScene(null) : onExit()}><ArrowLeft /></Button><span>{tr('AI 自由对话')}</span><span className="w-9" /></div>
    {!scene ? <>
      <p className="text-sm text-muted-foreground mb-3">{tr('选一个场景，用英语和 AI 聊天。说错了 AI 会给你更自然的说法。建议有一点基础后再用。')}</p>
      <div className="grid grid-cols-2 gap-2">{SCENES.map(s => <Button key={s} variant="outline" onClick={() => start(s)}>{tr(s)}</Button>)}</div>
    </> : <>
      <div className="space-y-2 mb-3">{turns.map((t, i) => <div key={i} className={t.role === 'user' ? 'ml-8 rounded-lg bg-primary/10 p-2 text-sm' : 'mr-8 rounded-lg border border-border bg-card p-2 text-sm'}>
        <div className="flex gap-1"><span className="flex-1">{t.content}</span>{t.role === 'assistant' && <Button variant="ghost" size="icon" className="h-6 w-6" aria-label={tr('听示范')} onClick={() => speak(t.content)}><Volume2 size={14} /></Button>}</div>
        {t.correction && <p className="mt-1 text-xs text-primary">✓ {t.correction}</p>}
        {t.tip && <p className="mt-0.5 text-xs text-muted-foreground">{t.tip}</p>}
      </div>)}{busy && <p className="text-xs text-muted-foreground">{tr('AI 正在回复…')}</p>}</div>
      {err && <p className="text-xs text-destructive mb-2">{err}</p>}
      <div className="flex gap-1">
        <Button variant={listening ? 'default' : 'outline'} size="icon" aria-label={tr('说英语')} onClick={listen} disabled={busy || listening}><Mic size={16} /></Button>
        <input className="flex-1 rounded-md border border-border bg-background px-2 text-sm" value={input} placeholder={tr('用英语回答…')} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') submit(input); }} />
        <Button size="icon" aria-label={tr('发送')} onClick={() => submit(input)} disabled={busy}><Send size={16} /></Button>
      </div>
    </>}
  </div>;
}
