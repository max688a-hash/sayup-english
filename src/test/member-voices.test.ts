import { describe, expect, it } from 'vitest';
import { hasVoiceMembership, resolveDemoVoice } from '@/lib/member-voices';

describe('Member demonstration voices', () => {
  it('free learners always use Ava', () => {
    expect(resolveDemoVoice('andrew', false, true)).toBe('ava');
    expect(resolveDemoVoice('emma', false, true)).toBe('ava');
  });
  it('members may select Andrew in the core course', () => expect(resolveDemoVoice('andrew', true, true)).toBe('andrew'));
  it('members may select Emma in the core course', () => expect(resolveDemoVoice('emma', true, true)).toBe('emma'));
  it('other content stays Ava', () => expect(resolveDemoVoice('andrew', true, false)).toBe('ava'));
  it('active paid members qualify', () => expect(hasVoiceMembership([{ status: 'active', current_period_end: '2026-11-17' }], [], [], Date.parse('2026-10-17'))).toBe(true));
  it('current reward members qualify', () => expect(hasVoiceMembership([], [{ starts_at: '2026-10-01', ends_at: '2026-11-01' }], [], Date.parse('2026-10-17'))).toBe(true));
  it('approved aid members qualify', () => expect(hasVoiceMembership([], [], [{ status: 'approved' }])).toBe(true));
  it('expired and future rewards do not qualify', () => expect(hasVoiceMembership([], [{ starts_at: '2026-09-01', ends_at: '2026-10-01' }, { starts_at: '2026-11-01', ends_at: '2026-12-01' }], [], Date.parse('2026-10-17'))).toBe(false));
  it('expired paid membership does not qualify', () => expect(hasVoiceMembership([{ status: 'active', current_period_end: '2026-10-01' }], [], [], Date.parse('2026-10-17'))).toBe(false));
});