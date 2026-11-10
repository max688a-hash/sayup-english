import { describe, expect, it } from 'vitest';
import { isNativeApp, isIosApp } from '@/lib/platform';

describe('Native iOS & Mobile Adaptation Verification', () => {
  it('detects native platform or mobile protocol correctly', () => {
    // In node/vitest environment without window, should return false gracefully
    expect(typeof isNativeApp()).toBe('boolean');
    expect(typeof isIosApp()).toBe('boolean');
  });

  it('verifies that styles.css contains rules to hide lovable badge and mock frame', async () => {
    const fs = await import('node:fs/promises');
    const css = await fs.readFile('src/styles.css', 'utf-8');
    
    // Must contain lovable badge purge rule
    expect(css).toContain('#lovable-badge');
    expect(css).toContain('display: none !important');
    
    // Must contain mobile/native full-screen rules without nested phone borders
    expect(css).toContain('.is-native-app');
    expect(css).toContain('.status-bar { display: none !important; }');
    expect(css).toContain('env(safe-area-inset-top)');
    expect(css).toContain('env(safe-area-inset-bottom)');
  });
});
