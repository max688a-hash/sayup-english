import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => { setUser(s?.user ?? null); setReady(true); });
    supabase.auth.getSession().then(({ data: d }) => { setUser(d.session?.user ?? null); setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);
  return { user, ready };
}

export async function saveProgress(userId: string, key: string) {
  await supabase.from('learning_progress').upsert({ user_id: userId, item_key: key }, { onConflict: 'user_id,item_key', ignoreDuplicates: true });
}
