import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import { COURSE } from '@/lib/course12';
import { loosenKey } from '@/lib/cloud-speech';

// Guards against the "robotic voice" regression: any English sentence the UI can read aloud
// must have a neural recording in public/audio (otherwise speak() shows a notice instead).
const root = process.cwd();
const index = JSON.parse(fs.readFileSync(path.join(root, 'public/audio/index.json'), 'utf8')) as Record<string, string>;
const hasAudio = (s: string) => {
  const h = index[loosenKey(s)];
  return !!h && fs.existsSync(path.join(root, 'public/audio', `${h}.mp3`));
};

function sourceFiles(dir: string, out: string[] = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) sourceFiles(p, out);
    else if (/\.(ts|tsx)$/.test(p) && !/\.test\.|\.bak|routeTree|build-config|i18n\.ts$/.test(p)) out.push(p);
  }
  return out;
}

const SENTENCE = /^[A-Z][A-Za-z0-9 ,.!?'’‘\-:;()]*[.!?]$/;
function sentenceLiterals(file: string) {
  const code = fs.readFileSync(file, 'utf8');
  return [...code.matchAll(/`([^`$]{4,200})`|"([^"\n]{4,200})"|'((?:[^'\\\n]|\\.){4,200})'/g)]
    .map(m => (m[1] || m[2] || m[3] || '').replace(/\\'/g, "'"))
    .filter(s => SENTENCE.test(s) && s.split(' ').length >= 2);
}

function fill(pattern: string, slot: string) {
  const parts = slot.split(' / ');
  let i = 0;
  return pattern.replace(/___/g, () => parts[i++] ?? parts[0] ?? '');
}

describe('local neural audio coverage', () => {
  it('every English sentence literal under src/lib and src/components has a local recording', () => {
    const files = [...sourceFiles(path.join(root, 'src/lib')), ...sourceFiles(path.join(root, 'src/components'))];
    const missing = new Set<string>();
    let total = 0;
    for (const f of files) for (const s of sentenceLiterals(f)) { total++; if (!hasAudio(s)) missing.add(s); }
    expect(total).toBeGreaterThan(5000);
    expect([...missing]).toEqual([]);
  });

  it('every filled course drill sentence has a local recording', () => {
    const missing: string[] = [];
    for (const w of COURSE) for (const d of w.drills) for (const s of d.slots) {
      const full = fill(d.pattern, s);
      if (!hasAudio(full)) missing.push(full);
    }
    expect(missing).toEqual([]);
  });

  it('course phrases and dialogue lines have a local recording', () => {
    const missing: string[] = [];
    for (const w of COURSE) {
      for (const p of w.phrases) if (!hasAudio(p.en)) missing.push(p.en);
      for (const l of w.dialogue) if (!hasAudio(l.en)) missing.push(l.en);
    }
    expect(missing).toEqual([]);
  });
});
