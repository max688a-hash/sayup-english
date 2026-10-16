import { supabase } from '@/integrations/supabase/client';

/** Cloud sync for daily route ticks and daily-exchange completion, stored in learning_progress
 *  as item_key "plan:<YYYY-MM-DD>:<step>" and "daily:<sceneId>". Local storage stays as offline cache. */
async function uid() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

export async function pullKeys(prefix: string): Promise<string[] | null> {
  const id = await uid();
  if (!id) return null;
  const r = await supabase.from('learning_progress').select('item_key').like('item_key', `${prefix}%`);
  if (r.error) return null;
  return (r.data ?? []).map(x => x.item_key.slice(prefix.length));
}

export async function pushKey(key: string) {
  const id = await uid();
  if (!id) return;
  await supabase.from('learning_progress').upsert({ user_id: id, item_key: key }, { onConflict: 'user_id,item_key', ignoreDuplicates: true });
}

export async function dropKey(key: string) {
  const id = await uid();
  if (!id) return;
  await supabase.from('learning_progress').delete().eq('user_id', id).eq('item_key', key);
}
