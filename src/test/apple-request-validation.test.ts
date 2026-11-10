import { describe, expect, it } from 'vitest';
import { verifyAppleJws } from '@/lib/apple-iap.server';
import { AppleRequestError } from '@/lib/apple-request-error';

const jws = (header: unknown) => `${Buffer.from(JSON.stringify(header)).toString('base64url')}.e30.c2ln`;

describe('Apple input validation', () => {
  it('rejects the malformed notification that previously produced a 500 as an input error', async () => {
    await expect(verifyAppleJws('invalid.'.repeat(10))).rejects.toBeInstanceOf(AppleRequestError);
  });
  it('rejects undecodable headers as input errors', async () => {
    await expect(verifyAppleJws('bad.e30.c2ln')).rejects.toBeInstanceOf(AppleRequestError);
  });
  it('rejects null headers without throwing a TypeError', async () => {
    await expect(verifyAppleJws(jws(null))).rejects.toBeInstanceOf(AppleRequestError);
  });
  it('rejects non-Apple signing algorithms', async () => {
    await expect(verifyAppleJws(jws({ alg: 'none', x5c: ['x', 'y'] }))).rejects.toBeInstanceOf(AppleRequestError);
  });
  it('rejects malformed certificates without accepting the notification', async () => {
    await expect(verifyAppleJws(jws({ alg: 'ES256', x5c: ['x', 'y'] }))).rejects.toBeInstanceOf(AppleRequestError);
  });
});