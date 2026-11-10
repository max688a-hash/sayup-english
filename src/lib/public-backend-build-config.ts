// Public identifiers only. Never add an administrator credential here.
const managedPublicBackend = {
  url: 'https://dxioqoapztyayfyekkjv.supabase.co',
  key: 'sb_publishable_FdXk_dOtpUMd14_rbAgCqg_XPpBR7yw',
};

export function publicBackendBuildDefines(env: Record<string, string | undefined>) {
  const url = env['VITE_SUPABASE_URL']?.trim() || managedPublicBackend.url;
  const key = env['VITE_SUPABASE_PUBLISHABLE_KEY']?.trim() || managedPublicBackend.key;
  if (url.replace(/\/+$/, '') !== managedPublicBackend.url || key !== managedPublicBackend.key) {
    throw new Error('Public backend configuration does not match this project’s managed backend.');
  }
  return {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(url),
    'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(key),
  };
}

// Generated clients use bracket notation; some bundlers only replace dotted defines.
// Transform these public reads explicitly without modifying the generated client.
export function injectPublicBackendReads(source: string, env: Record<string, string | undefined>) {
  const defines = publicBackendBuildDefines(env);
  return source.replace(/import\.meta\.env\[['"](VITE_SUPABASE_URL|VITE_SUPABASE_PUBLISHABLE_KEY)['"]\]/g,
    (_match, key: string) => defines[`import.meta.env.${key}` as keyof typeof defines]);
}