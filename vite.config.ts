// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from 'vite';
import { injectPublicBackendReads, publicBackendBuildDefines } from './src/lib/public-backend-build-config';

export default (env: { command: 'build' | 'serve'; mode: string }) => defineConfig({
  vite: { define: publicBackendBuildDefines(loadEnv(env.mode, process.cwd(), 'VITE_')) },
  plugins: [{
    name: 'managed-public-backend-reads',
    enforce: 'pre',
    transform(code, id) {
      if (!id.replace(/\\/g, '/').endsWith('/src/integrations/supabase/client.ts')) return;
      return { code: injectPublicBackendReads(code, loadEnv(env.mode, process.cwd(), 'VITE_')), map: null };
    },
  }],
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
})(env);
