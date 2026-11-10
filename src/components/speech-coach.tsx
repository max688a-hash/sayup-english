import { tr, getContentLang , trn} from '@/lib/tr';
import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCheck, Loader2, Mic, Play, RotateCcw, Square, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { recordWav } from '@/lib/record-wav';
import { getApiUrl } from '@/lib/api-config';
import { evaluateSpokenText } from '@/lib/speech-evaluator';
import { playExclusiveAudio } from '@/lib/cloud-speech';

export type Analysis = { score: number; verdict: 'good' | 'needs_work' | 'retry'; summary: string; issues: { word: string; problem: string; fix: string }[]; suggestions: string[]; next_try: string };
export type PracticeRecord = { id: string; target: string; heard: string; analysis: Analysis; audioUrl: string; at: Date; waveform?: number[]; seconds?: number };

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
  const speechRecognizer = useRef<any>(null);
  const recognizedText = useRef<string>('');

  useEffect(() => () => {
    rec.current?.cancel();
    abort.current?.abort();
    try { speechRecognizer.current?.stop(); } catch {}
    if (tick.current) clearInterval(tick.current);
  }, []);

  useEffect(() => {
    rec.current?.cancel();
    rec.current = null;
    abort.current?.abort();
    try { speechRecognizer.current?.stop(); } catch {}
    setPhase('idle');
    setAnalysis(null);
    setHeard('');
    setMessage('');
    recognizedText.current = '';
  }, [target]);

  async function start() {
    setAnalysis(null);
    setHeard('');
    setMessage('');
    recognizedText.current = '';

    if (localStorage.getItem('sayup-mic-consent') !== '1') {
      if (!window.confirm(tr('跟读打分需要使用麦克风。你的录音只用来转成文字并打分，不会长期保存，也不会给别人。同意吗？'))) return;
      localStorage.setItem('sayup-mic-consent', '1');
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setPhase('error');
      setMessage(tr('当前环境不支持录音，请检查麦克风权限。'));
      return;
    }
    try {
      rec.current = await recordWav();
      setPhase('recording');
      setSeconds(0);
      tick.current = setInterval(() => setSeconds((s) => { if (s + 1 >= 30) void stop(); return s + 1; }), 1000);

      // Start on-device speech recognition in parallel
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRec) {
        try {
          const sr = new SpeechRec();
          sr.continuous = true;
          sr.interimResults = true;
          sr.lang = 'en-US';
          sr.onresult = (ev: any) => {
            let str = '';
            for (let i = 0; i < ev.results.length; i++) {
              str += ev.results[i][0].transcript + ' ';
            }
            const clean = str.trim();
            const words = clean.toLowerCase().split(/\s+/).filter(Boolean);
            const isSimulatorDummy = words.length >= 2 && words.every(w => w === 'test');
            if (!isSimulatorDummy) {
              recognizedText.current = clean;
            }
          };
          sr.onerror = () => {};
          sr.onend = () => {};
          sr.start();
          speechRecognizer.current = sr;
        } catch {
          // speech recognition init optional
        }
      }
    } catch (e) {
      setPhase('error');
      setMessage(e instanceof DOMException && e.name === 'NotAllowedError' ? tr('没有麦克风权限。请在设置中允许使用麦克风后再试。') : tr('无法打开麦克风，请检查设备后重试。'));
    }
  }

  async function stop() {
    if (tick.current) { clearInterval(tick.current); tick.current = null; }
    try { speechRecognizer.current?.stop(); } catch {}
    const r = rec.current; rec.current = null;
    if (!r) return;
    let result;
    try { result = await r.stop(); } catch { setPhase('retry'); setMessage(tr('没有录到声音，请再说一次。')); return; }
    if (!result.voiced) { setPhase('retry'); setMessage(tr('没有听到你的声音，请靠近麦克风，把句子完整地再说一次。')); return; }
    const url = URL.createObjectURL(result.file); setAudioUrl(url);
    setPhase('analyzing');
    const ctrl = new AbortController(); abort.current = ctrl;

    let finalAnalysis: Analysis | null = null;
    let finalHeard = recognizedText.current.trim();

    try {
      const form = new FormData();
      form.append('file', result.file);
      form.append('target', target);
      form.append('lang', getContentLang());

      // Try network analysis with timeout
      // Server STT + LLM analysis measured at ~6-9s; allow headroom for longer recordings
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 20000));
      const fetchPromise = fetch(getApiUrl('/api/speech-analyze'), { method: 'POST', body: form, signal: ctrl.signal })
        .then(async (res) => {
          if (!res.ok) return null;
          const data = await res.json().catch(() => null);
          return data;
        })
        .catch(() => null);

      const data = await Promise.race([fetchPromise, timeoutPromise]);
      if (data && data.status === 'ok' && data.analysis) {
        finalAnalysis = data.analysis as Analysis;
        finalHeard = data.heard || finalHeard;
      } else if (data && data.status === 'no_speech') {
        finalAnalysis = {
          score: 0,
          verdict: 'retry',
          summary: tr('没有检测到清晰的人声，请靠近麦克风重新录音。'),
          issues: [],
          suggestions: [],
          next_try: tr('把整句完整读一遍，注意发音清晰度。'),
        };
      }
    } catch {}

    // Fallback to intelligent on-device speech evaluation if remote API is unavailable
    if (!finalAnalysis) {
      const heardWords = finalHeard.toLowerCase().split(/\s+/).filter(Boolean);
      const isSimulatorDummy = heardWords.length >= 2 && heardWords.every(w => w === 'test');
      if (isSimulatorDummy) {
        finalHeard = '';
      }
      finalAnalysis = evaluateSpokenText(target, finalHeard, result.seconds);
    }

    setHeard(finalHeard);
    setAnalysis(finalAnalysis);
    setPhase(finalAnalysis.verdict === 'retry' ? 'retry' : 'done');
    if (finalAnalysis.verdict === 'retry') {
      setMessage(tr('这次没有说完整，请再重复一次。'));
    } else {
      onPassed();
    }
    onRecord({
      id: crypto.randomUUID(),
      target,
      heard: finalHeard,
      analysis: finalAnalysis,
      audioUrl: url,
      at: new Date(),
      waveform: result.waveform,
      seconds: result.seconds,
    });
  }

  const tone = !analysis ? '' : analysis.score >= 85 ? 'good' : analysis.score >= 60 ? 'mid' : 'low';
  return <div className="coach">
    {phase === 'recording'
      ? <Button className="w-full h-12 recording" onClick={() => void stop()}><Square size={16} />{tr('说完了，开始分析 · {0}s', seconds)}</Button>
      : <Button className="w-full h-12" disabled={phase === 'analyzing'} onClick={() => void start()}>{phase === 'analyzing' ? <><Loader2 className="animate-spin" size={18} />{tr('正在听你的发音…')}</> : <><Mic size={18} />{analysis || phase === 'retry' ? tr('再录一次') : tr('开始跟读录音')}</>}</Button>}
    {phase === 'recording' && <p className="coach-hint"><span className="rec-dot" />{target.startsWith('[FREE]') ? tr('正在录音，请用英语回答') : tr('正在录音，请读：{0}', target)}</p>}
    {(phase === 'retry' || phase === 'error') && <div className={cn('coach-alert', phase)} role="alert"><AlertTriangle size={16} /><span>{message}</span></div>}
    {analysis && <div className="feedback-box">
      <div className="flex items-center justify-between gap-3"><span className={cn('coach-verdict', tone)}>{analysis.verdict === 'good' ? <CheckCheck size={17} /> : <Target size={17} />}{analysis.verdict === 'good' ? tr('说得准确') : analysis.verdict === 'retry' ? tr('需要重说') : tr('还有要纠正的地方')}</span><span className={cn('feedback-score', tone)}>{trn(analysis.score)}<span>/100</span></span></div>
      <p className="coach-heard"><b>{tr('识别到：')}</b>{heard || tr('（无）')}</p>
      <p className="mt-2 text-sm">{trn(analysis.summary)}</p>
      {analysis.issues.length > 0 && <ul className="coach-issues">{analysis.issues.map((i, k) => <li key={k}><b>{trn(i.word)}</b><span>{trn(i.problem)}</span><em>{tr('纠正：{0}', i.fix)}</em></li>)}</ul>}
      {analysis.suggestions.length > 0 && <><p className="coach-sub">{tr('改进建议')}</p><ol className="coach-tips">{analysis.suggestions.map((s, k) => <li key={k}>{s}</li>)}</ol></>}
      <p className="coach-next"><RotateCcw size={13} />{tr('下次注意：{0}', analysis.next_try)}</p>
      <div className="flex items-center justify-between mt-3">{audioUrl && <Button variant="ghost" size="sm" onClick={() => void playExclusiveAudio(audioUrl)}><Play size={14} />{tr('听我的录音')}</Button>}<span className="text-[10px] text-muted-foreground">{tr('AI 根据语音识别结果判断，无法识别的词会被指出')}</span></div>
    </div>}
  </div>;
}
