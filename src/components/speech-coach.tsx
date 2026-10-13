import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCheck, Loader2, Mic, Play, RotateCcw, Square, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { recordWav } from '@/lib/record-wav';

export type Analysis = { score: number; verdict: 'good' | 'needs_work' | 'retry'; summary: string; issues: { word: string; problem: string; fix: string }[]; suggestions: string[]; next_try: string };
export type PracticeRecord = { id: string; target: string; heard: string; analysis: Analysis; audioUrl: string; at: Date };

type Phase = 'idle' | 'recording' | 'analyzing' | 'done' | 'retry' | 'error';

export function SpeechCoach({ target, onPassed, onRecord }: { target: string; onPassed: () => void; onRecord: (r: PracticeRecord) => void }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [message, setMessage] = useState('');
  const [heard, setHeard] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [seconds, setSeconds] = useState(0);
  const rec = useRef<Awaited<ReturnType<typeof recordWav>> | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const abort = useRef<AbortController | null>(null);

  useEffect(() => () => { rec.current?.cancel(); abort.current?.abort(); if (tick.current) clearInterval(tick.current); }, []);
  useEffect(() => { rec.current?.cancel(); rec.current = null; abort.current?.abort(); setPhase('idle'); setAnalysis(null); setHeard(''); setMessage(''); }, [target]);

  async function start() {
    setAnalysis(null); setHeard(''); setMessage('');
    if (!navigator.mediaDevices?.getUserMedia) { setPhase('error'); setMessage('当前浏览器不支持录音，请使用最新版 Chrome 或 Safari。'); return; }
    try {
      rec.current = await recordWav();
      setPhase('recording'); setSeconds(0);
      tick.current = setInterval(() => setSeconds(s => { if (s + 1 >= 30) void stop(); return s + 1; }), 1000);
    } catch (e) {
      setPhase('error');
      setMessage(e instanceof DOMException && e.name === 'NotAllowedError' ? '没有麦克风权限。请在浏览器地址栏允许使用麦克风后再试。' : '无法打开麦克风，请检查设备后重试。');
    }
  }

  async function stop() {
    if (tick.current) { clearInterval(tick.current); tick.current = null; }
    const r = rec.current; rec.current = null;
    if (!r) return;
    let result;
    try { result = await r.stop(); } catch { setPhase('retry'); setMessage('没有录到声音，请再说一次。'); return; }
    if (!result.voiced) { setPhase('retry'); setMessage('没有听到你的声音，请靠近麦克风，把句子完整地再说一次。'); return; }
    const url = URL.createObjectURL(result.file); setAudioUrl(url);
    setPhase('analyzing');
    const ctrl = new AbortController(); abort.current = ctrl;
    try {
      const form = new FormData(); form.append('file', result.file); form.append('target', target);
      const res = await fetch('/api/speech-analyze', { method: 'POST', body: form, signal: ctrl.signal });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setPhase('error'); setMessage(data.error ?? '分析失败，请稍后再试。'); return; }
      if (data.status === 'no_speech') { setPhase('retry'); setMessage('录音里没有识别出英文，请把句子清楚地再读一遍。'); return; }
      const a = data.analysis as Analysis;
      setHeard(data.heard); setAnalysis(a);
      setPhase(a.verdict === 'retry' ? 'retry' : 'done');
      if (a.verdict === 'retry') setMessage('这次没有说完整，请再重复一次。');
      else onPassed();
      onRecord({ id: crypto.randomUUID(), target, heard: data.heard, analysis: a, audioUrl: url, at: new Date() });
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
      setPhase('error'); setMessage('网络异常，录音没有发送成功，请重试。');
    }
  }

  const tone = !analysis ? '' : analysis.score >= 85 ? 'good' : analysis.score >= 60 ? 'mid' : 'low';
  return <div className="coach">
    {phase === 'recording'
      ? <Button className="w-full h-12 recording" onClick={() => void stop()}><Square size={16} /> 说完了，开始分析 · {seconds}s</Button>
      : <Button className="w-full h-12" disabled={phase === 'analyzing'} onClick={() => void start()}>{phase === 'analyzing' ? <><Loader2 className="animate-spin" size={18} /> 正在听你的发音…</> : <><Mic size={18} />{analysis || phase === 'retry' ? '再录一次' : '开始跟读录音'}</>}</Button>}
    {phase === 'recording' && <p className="coach-hint"><span className="rec-dot" /> 正在录音，请读：{target}</p>}
    {(phase === 'retry' || phase === 'error') && <div className={cn('coach-alert', phase)} role="alert"><AlertTriangle size={16} /><span>{message}</span></div>}
    {analysis && <div className="feedback-box">
      <div className="flex items-center justify-between gap-3"><span className={cn('coach-verdict', tone)}>{analysis.verdict === 'good' ? <CheckCheck size={17} /> : <Sprout size={17} />}{analysis.verdict === 'good' ? '说得准确' : analysis.verdict === 'retry' ? '需要重说' : '还有要纠正的地方'}</span><span className={cn('feedback-score', tone)}>{analysis.score}<span>/100</span></span></div>
      <p className="coach-heard"><b>识别到：</b>{heard || '（无）'}</p>
      <p className="mt-2 text-sm">{analysis.summary}</p>
      {analysis.issues.length > 0 && <ul className="coach-issues">{analysis.issues.map((i, k) => <li key={k}><b>{i.word}</b><span>{i.problem}</span><em>纠正：{i.fix}</em></li>)}</ul>}
      {analysis.suggestions.length > 0 && <><p className="coach-sub">改进建议</p><ol className="coach-tips">{analysis.suggestions.map((s, k) => <li key={k}>{s}</li>)}</ol></>}
      <p className="coach-next"><RotateCcw size={13} /> 下次注意：{analysis.next_try}</p>
      <div className="flex items-center justify-between mt-3">{audioUrl && <Button variant="ghost" size="sm" onClick={() => void new Audio(audioUrl).play()}><Play size={14} /> 听我的录音</Button>}<span className="text-[10px] text-muted-foreground">AI 根据语音识别结果判断，无法识别的词会被指出</span></div>
    </div>}
  </div>;
}
