import { useEffect, useState } from 'react';
import { Check, LockKeyhole, Loader2, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useMemberVoice } from '@/hooks/use-member-voice';
import { DEMO_VOICES, type DemoVoice } from '@/lib/member-voices';
import { speakCloud, stopCloudSpeech } from '@/lib/cloud-speech';
import { tr } from '@/lib/tr';

export function VoicePicker() {
  const { user } = useAuth();
  const { member, loaded, voice, select } = useMemberVoice(user?.id);
  const [playing, setPlaying] = useState<DemoVoice | null>(null);
  const [message, setMessage] = useState('');
  useEffect(() => () => stopCloudSpeech(), []);
  async function preview(id: DemoVoice) {
    setMessage(''); setPlaying(id);
    const ok = await speakCloud("Hi, I'm Lin. Nice to meet you.", false, {
      onend: () => setPlaying(null), onerror: () => { setPlaying(null); setMessage(tr('试听暂不可用，请稍后再试。')); },
    }, id);
    if (!ok) { setPlaying(null); setMessage(tr('试听暂不可用，请稍后再试。')); }
  }
  return <section className="mt-4 mb-4" aria-label={tr('选择示范声音')}>
    <h3 className="font-semibold text-sm mb-1">{tr('选择示范声音')}</h3>
    <p className="text-xs text-muted-foreground mb-3">{tr('12 周核心课程 · 美式英语')}</p>
    <div className="space-y-2">{DEMO_VOICES.map(v => {
      const locked = v.id !== 'ava' && (!loaded || !member);
      return <div key={v.id} className="flex items-center gap-2 border border-border rounded-lg p-2">
        <Button variant={voice === v.id ? 'secondary' : 'ghost'} className="flex-1 min-w-0 h-auto justify-start gap-2 whitespace-normal" disabled={locked} aria-pressed={voice === v.id} onClick={() => { if (!select(v.id)) setMessage(tr('未能保存声音选择，请重试。')); }}>
          {locked ? <LockKeyhole size={16} className="shrink-0" /> : voice === v.id ? <Check size={16} className="shrink-0" /> : <Volume2 size={16} className="shrink-0" />}
          <span className="text-left"><b className="block">{v.name}</b><span className="text-xs text-muted-foreground">{tr(v.label)}</span></span>
        </Button>
        <Button variant="outline" size="sm" disabled={locked} aria-label={tr('试听 {0}', v.name)} onClick={() => void preview(v.id)}>{playing === v.id ? <Loader2 size={14} className="animate-spin" /> : <Volume2 size={14} />}{tr('试听')}</Button>
      </div>;
    })}</div>
    {!member && <p className="text-xs text-muted-foreground mt-2">{tr('免费学员使用 Ava；会员可选择 Andrew 和 Emma。')}</p>}
    {message && <p role="status" className="text-xs text-destructive mt-2">{message}</p>}
  </section>;
}