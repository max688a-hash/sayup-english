import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
const mock = vi.hoisted(() => ({ saved: 'emma', member: true, fail: false, update: vi.fn() }));
vi.mock('@/lib/paddle', () => ({ getPaddleEnvironment: () => 'live' }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: {
  auth: {
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: vi.fn() } } }),
    getUser: async () => ({ data: { user: { id: 'learner', user_metadata: { demo_voice: mock.saved } } }, error: null }),
    updateUser: async (input: { data: { demo_voice: string } }) => {
      mock.update(input);
      if (mock.fail) return { data: { user: null }, error: new Error('offline') };
      mock.saved = input.data.demo_voice;
      return { data: { user: { id: 'learner' } }, error: null };
    },
  },
  from: (table: string) => {
    const result = { data: table === 'subscriptions' && mock.member ? [{ status: 'active', current_period_end: null }] : [] };
    const chain = { select: () => chain, eq: () => chain, then: (resolve: (v: typeof result) => unknown) => Promise.resolve(result).then(resolve) };
    return chain;
  },
} }));
import { useMemberVoice } from '@/hooks/use-member-voice';
describe('Account voice synchronization', () => {
  beforeEach(() => { mock.saved = 'emma'; mock.member = true; mock.fail = false; mock.update.mockClear(); localStorage.clear(); });
  it('reads Emma from the account on a new device without local preferences', async () => {
    const { result, unmount } = renderHook(() => useMemberVoice('learner'));
    await waitFor(() => expect(result.current.voice).toBe('emma'));
    unmount();
  });
  it('saves Andrew to the account and reads it after clearing the device cache', async () => {
    const first = renderHook(() => useMemberVoice('learner'));
    await waitFor(() => expect(first.result.current.loaded).toBe(true));
    await act(async () => { expect(await first.result.current.select('andrew')).toBe(true); });
    expect(mock.update).toHaveBeenCalledWith({ data: { demo_voice: 'andrew' } });
    first.unmount(); localStorage.clear();
    const second = renderHook(() => useMemberVoice('learner'));
    await waitFor(() => expect(second.result.current.voice).toBe('andrew'));
    second.unmount();
  });
  it('stored Emma does not grant free learners membership', async () => {
    mock.member = false;
    const { result, unmount } = renderHook(() => useMemberVoice('learner'));
    await waitFor(() => expect(result.current.loaded).toBe(true));
    expect(result.current.voice).toBe('ava');
    await act(async () => { expect(await result.current.select('andrew')).toBe(false); });
    expect(mock.update).not.toHaveBeenCalled(); unmount();
  });
  it('does not report a cloud save when the network fails', async () => {
    const { result, unmount } = renderHook(() => useMemberVoice('learner'));
    await waitFor(() => expect(result.current.voice).toBe('emma'));
    mock.fail = true;
    await act(async () => { expect(await result.current.select('andrew')).toBe(false); });
    expect(result.current.voice).toBe('emma'); unmount();
  });
});