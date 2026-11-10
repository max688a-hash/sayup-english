import { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, Play, Square, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { tr, trn } from '@/lib/tr';
import { speakCloud, playExclusiveAudio, stopCloudSpeech } from '@/lib/cloud-speech';
import type { DemoVoice } from '@/lib/member-voices';
import type { PracticeRecord } from '@/components/speech-coach';
import type { Scene } from '@/lib/speaking-content';

type Msg = { text: string; user: boolean };
const norm = (s: string) => s.trim().toLowerCase().replace(/[’‘]/g, "'");

/**
 * 对话完成后的「完整温习」面板：
 * 逐行标准对话 + 中文意思；「标准版」整段 TTS 回放；
 * 「我的版本」把用户回合替换成 TA 自己的录音，听到真实的整段对话。
 */
export function DialogueReview({ scene, messages, records, voice = 'ava' }: {
  scene: Scene; messages: Msg[]; records: PracticeRecord[]; voice?: DemoVoice;
}) {
  const [mode, setMode] = useState<'std' | 'mine' | null>(null);
  const [active, setActive] = useState(-1);
  const stopped = useRef(false);

  const recordFor = useCallback((text: string) =>
    records.find(r => norm(r.target) === norm(text)), [records]);
  const myLinesWithAudio = messages.filter(m => m.user && recordFor(m.text)).length;

  const stop = useCallback(() => {
    stopped.current = true;
    stopCloudSpeech();
    setMode(null); setActive(-1);
  }, []);
  useEffect(() => stop, [stop]);

  const playOne = useCallback(async (m: Msg, useMine: boolean) => {
    const rec = useMine && m.user ? recordFor(m.text) : undefined;
    if (rec?.audioUrl) {
      const a = playExclusiveAudio(rec.audioUrl);
      await new Promise<void>(res => {
        const done = () => res();
        a.addEventListener('ended', done, { once: true });
        a.addEventListener('error', done, { once: true });
        setTimeout(done, 15000);
      });
      return;
    }
    await new Promise<void>(res => {
      let done = false;
      const fin = () => { if (!done) { done = true; res(); } };
      const timer = setTimeout(fin, 20000);
      void speakCloud(m.text, false, {
        onend: () => { clearTimeout(timer); fin(); },
        onerror: () => { clearTimeout(timer); fin(); },
      }, voice).then(ok => { if (!ok) { clearTimeout(timer); fin(); } });
    });
  }, [recordFor, voice]);

  const playAll = useCallback(async (useMine: boolean) => {
    stopped.current = false;
    setMode(useMine ? 'mine' : 'std');
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      if (stopped.current || !m) break;
      setActive(i);
      await playOne(m, useMine);
    }
    setMode(null); setActive(-1);
  }, [messages, playOne]);

  const zhOf = (text: string) => scene.zh?.[text] ?? scene.zh?.[text.trim()];

  return <div className="dialogue-review">
    <div className="section-heading"><h2>{tr("对话温习")}</h2><span>{trn(messages.length)} {tr("句")}</span></div>
    <div className="review-playbar">
      {mode ? <Button variant="outline" size="sm" onClick={stop}><Square size={14} /> {tr("停止")}</Button> : <>
        <Button size="sm" onClick={() => void playAll(false)}><Play size={14} /> {tr("播放标准版")}</Button>
        <Button size="sm" variant="outline" disabled={myLinesWithAudio === 0} onClick={() => void playAll(true)}><Mic size={14} /> {tr("播放我的版本")}</Button>
      </>}
      {mode === 'mine' && <span className="text-xs text-muted-foreground">{tr("你的回合正在用你自己的录音回放")}</span>}
      {!mode && myLinesWithAudio === 0 && <span className="text-xs text-muted-foreground">{tr("跟读录音后，可回放你自己的完整对话")}</span>}
    </div>
    <div className="review-lines">
      {messages.map((m, i) => {
        const rec = recordFor(m.text);
        return <div key={i} className={cn('review-line', m.user && 'is-mine', active === i && 'is-playing')}>
          <span className="review-role">{m.user ? tr("你") : tr("对方")}</span>
          <div className="review-text">
            <p>{m.text}</p>
            {zhOf(m.text) && <p className="review-zh">{trn(zhOf(m.text)!)}</p>}
          </div>
          <span className="review-audio">
            {m.user && rec?.audioUrl && <Button variant="ghost" size="icon" aria-label={tr("听我的录音")} title={tr("听我的录音")} onClick={() => void playExclusiveAudio(rec.audioUrl)}><Mic size={15} /></Button>}
            <Button variant="ghost" size="icon" aria-label={tr("听标准发音")} title={tr("听标准发音")} onClick={() => void speakCloud(m.text, false, {}, voice)}><Volume2 size={15} /></Button>
          </span>
        </div>;
      })}
    </div>
  </div>;
}
