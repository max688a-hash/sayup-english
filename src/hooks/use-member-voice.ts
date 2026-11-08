import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { hasVoiceMembership, resolveDemoVoice, type DemoVoice } from '@/lib/member-voices';
import { cachedEntitlements, hasActiveEntitlement, iapAvailable, refreshEntitlements, watchEntitlements, IAP_CHANGE_EVENT } from '@/lib/iap';

const CHANGE = 'sayup-voice-change';
export function useMemberVoice(userId?: string) {
  const [member, setMember] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState<DemoVoice>('ava');
  const currentUser = useRef(userId);
  currentUser.current = userId;
  // Apple in-app subscription on this device (works without a learner account).
  const [nativeMember, setNativeMember] = useState(() => hasActiveEntitlement(cachedEntitlements()));
  useEffect(() => {
    const read = () => setNativeMember(hasActiveEntitlement(cachedEntitlements()));
    window.addEventListener(IAP_CHANGE_EVENT, read);
    if (iapAvailable()) { watchEntitlements(); void refreshEntitlements().then(read); }
    return () => window.removeEventListener(IAP_CHANGE_EVENT, read);
  }, []);
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
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active && session?.user.id === userId) {
        const value = session.user.user_metadata?.['demo_voice'];
        if (typeof value === 'string') {
          const voice = resolveDemoVoice(value, true, true);
          setSelected(voice);
          try { localStorage.setItem(`sayup-voice:${userId}`, voice); } catch { /* offline cache is optional */ }
        }
      }
    });
    // Read the verified cloud account, not just a cached session from this device.
    void supabase.auth.getUser().then(({ data, error }) => {
      if (!active || error || data.user?.id !== userId) return;
      const value = data.user.user_metadata?.['demo_voice'];
      const voice = resolveDemoVoice(typeof value === 'string' ? value : null, true, true);
      setSelected(voice);
      try { localStorage.setItem(`sayup-voice:${userId}`, voice); } catch { /* optional cache */ }
    });
    async function refresh() {
      const [s, r] = await Promise.all([
        supabase.from('subscriptions').select('status,current_period_end').eq('user_id', userId ?? ''),
        supabase.from('reward_grants').select('starts_at,ends_at').eq('user_id', userId ?? ''),
      ]);
      if (!active) return;
      setMember(hasVoiceMembership(s.data ?? [], r.data ?? [], []));
      setLoaded(true);
    }
    void refresh();
    const interval = window.setInterval(() => void refresh(), 60000);
    return () => { active = false; authListener.subscription.unsubscribe(); window.clearInterval(interval); window.removeEventListener(CHANGE, read); window.removeEventListener('storage', read); };
  }, [userId]);
  async function select(voice: DemoVoice) {
    if (!userId || !loaded || (!(member || nativeMember) && voice !== 'ava')) return false;
    try {
      const { data, error } = await supabase.auth.updateUser({ data: { demo_voice: voice } });
      if (error || data.user?.id !== userId || currentUser.current !== userId) return false;
      try { localStorage.setItem(`sayup-voice:${userId}`, voice); } catch { /* cloud save still succeeded */ }
      setSelected(voice); window.dispatchEvent(new Event(CHANGE)); return true;
    } catch { return false; }
  }
  const isMember = member || nativeMember;
  return { member: isMember, loaded, voice: resolveDemoVoice(selected, isMember, true), select };
}