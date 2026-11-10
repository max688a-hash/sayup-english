import { describe, expect, it } from 'vitest';
import { injectPublicBackendReads, publicBackendBuildDefines } from '@/lib/public-backend-build-config';

describe('published public backend configuration', () => {
  it('replaces generated bracket-notation reads even with no build environment', () => {
    const source = `const url = import.meta.env['VITE_SUPABASE_URL']; const key = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];`;
    const transformed = injectPublicBackendReads(source, {});
    expect(transformed).not.toContain('import.meta.env');
    expect(transformed).toContain('https://dxioqoapztyayfyekkjv.supabase.co');
    expect(transformed).toContain('sb_publishable_FdXk_dOtpUMd14_rbAgCqg_XPpBR7yw');
  });
  it('embeds the managed public connection even when build environment variables are absent', () => {
    const defines = publicBackendBuildDefines({});
    expect(JSON.parse(defines['import.meta.env.VITE_SUPABASE_URL'])).toBe('https://dxioqoapztyayfyekkjv.supabase.co');
    expect(JSON.parse(defines['import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY'])).toBe('sb_publishable_FdXk_dOtpUMd14_rbAgCqg_XPpBR7yw');
  });
  it('refuses a build pointing to a different backend', () => {
    expect(() => publicBackendBuildDefines({ VITE_SUPABASE_URL: 'https://different-backend.example' })).toThrow('managed backend');
  });
  it('does not expose a server administrator credential', () => {
    const defines = publicBackendBuildDefines({ SUPABASE_SERVICE_ROLE_KEY: 'private-test-value' });
    expect(Object.keys(defines)).toHaveLength(2);
    expect(JSON.stringify(defines)).not.toContain('private-test-value');
  });
});