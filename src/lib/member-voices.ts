export type DemoVoice = 'ava' | 'andrew' | 'emma';
export const DEMO_VOICES: { id: DemoVoice; name: string; label: string }[] = [
  { id: 'ava', name: 'Ava', label: '经典女声' },
  { id: 'andrew', name: 'Andrew', label: '帅气男生' },
  { id: 'emma', name: 'Emma', label: '甜美女生' },
];
export function resolveDemoVoice(value: string | null, member: boolean, coreCourse: boolean): DemoVoice {
  return member && coreCourse && (value === 'andrew' || value === 'emma') ? value : 'ava';
}
export function hasVoiceMembership(
  subscriptions: { status: string; current_period_end: string | null }[],
  rewards: { starts_at: string; ends_at: string }[],
  aid: { status: string }[], now = Date.now(),
) {
  return subscriptions.some(s => ['active', 'trialing'].includes(s.status) && (!s.current_period_end || Date.parse(s.current_period_end) > now))
    || rewards.some(r => Date.parse(r.starts_at) <= now && Date.parse(r.ends_at) > now)
    || aid.some(a => a.status === 'approved');
}