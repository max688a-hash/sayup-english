import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getPaddleEnvironment } from '@/lib/paddle';
import { hasVoiceMembership, resolveDemoVoice, type DemoVoice } from '@/lib/member-voices';

const CHANGE = 'sayup-voice-change';
export function useMemberVoice(userId?: string) {
  const [member, setMember] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState<DemoVoice>('ava');
  useEffect(() => {
    let active = true;
    setMember(false); setLoaded(false); setSelected('ava');
    if (!userId) { setLoaded(true); return; }
    const read = () => {
      try { setSelected(resolveDemoVoice(localStorage.getItem(`sayup-voice:${userId}`), true, true)); }
      catch { setSelected('ava'); }
    };
    read();
    window.addEventListener(CHANGE, read);
    window.addEventListener('storage', read);
    async function refresh() {
      const [s, r, a] = await Promise.all([
        supabase.from('subscriptions').select('status,current_period_end').eq('user_id', userId ?? '').eq('environment', getPaddleEnvironment()),
        supabase.from('reward_grants').select('starts_at,ends_at').eq('user_id', userId ?? ''),
        supabase.from('aid_applications').select('status').eq('user_id', userId ?? ''),
      ]);
      if (!active) return;
      setMember(hasVoiceMembership(s.data ?? [], r.data ?? [], a.data ?? []));
      setLoaded(true);
    }
    void refresh();
    const interval = window.setInterval(() => void refresh(), 60000);
    return () => { active = false; window.clearInterval(interval); window.removeEventListener(CHANGE, read); window.removeEventListener('storage', read); };
  }, [userId]);
  function select(voice: DemoVoice) {
    if (!userId || !loaded || (!member && voice !== 'ava')) return false;
    try {
      localStorage.setItem(`sayup-voice:${userId}`, voice);
      setSelected(voice); window.dispatchEvent(new Event(CHANGE)); return true;
    } catch { return false; }
  }
  return { member, loaded, voice: resolveDemoVoice(selected, member, true), select };
}