// Builds the web app for iOS, snapshots the server-rendered "/" into
// .output/public/index.html (Capacitor needs a static entry point) and copies
// everything into ios/App/App/public.  Usage: npm run ios:sync
//
// The regular `npm run build` targets Cloudflare (cloudflare-module preset); for the
// snapshot we need a runnable Node server, so this script builds with NITRO_PRESET=node-server.
import { spawn, execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4873;
const root = new URL('..', import.meta.url).pathname;
const run = (cmd, env = {}) => execSync(cmd, { cwd: root, stdio: 'inherit', env: { ...process.env, ...env } });

run('npx vite build', { NITRO_PRESET: 'node-server' });
const entry = `${root}.output/server/index.mjs`;
if (!existsSync(entry)) throw new Error(`missing ${entry}`);

const server = spawn(process.execPath, [entry], {
  cwd: root,
  env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1', NITRO_PORT: String(PORT), NITRO_HOST: '127.0.0.1' },
  stdio: 'ignore',
});
try {
  let html = '';
  for (let i = 0; i < 60 && !html; i++) {
    await sleep(500);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/`);
      if (res.ok) html = await res.text();
    } catch { /* server still booting */ }
  }
  if (!/<script[^>]+src="\/assets\//.test(html)) throw new Error('SSR snapshot did not render a client bundle');
  writeFileSync(`${root}.output/public/index.html`, html);
  console.log(`index.html snapshot: ${html.length} bytes`);
} finally {
  server.kill();
}
run('npx cap copy ios');

// Capacitor 8 only instantiates the native classes listed in packageClassList (generated
// from npm plugins by `cap copy`); add the app-local StoreKit plugin so it is registered.
const cfgPath = `${root}ios/App/App/capacitor.config.json`;
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
cfg.packageClassList = [...new Set([...(cfg.packageClassList ?? []), 'SayUpStorePlugin'])];
writeFileSync(cfgPath, JSON.stringify(cfg, null, '\t') + '\n');
console.log('packageClassList:', cfg.packageClassList.join(', '));
