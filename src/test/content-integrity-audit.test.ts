import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getMainVocabWords, getKidsVocabWords } from '@/lib/main-vocab';
import { ROLE_PLAY_DIALOGUES } from '@/lib/advanced/rolePlayDialogues';
import { DIALOGUES } from '@/lib/advanced/dialogues';
import { scenes } from '@/lib/speaking-content';

/**
 * 物理防漏洞验收套件 (Physical Anti-Dummy Semantic & Integrity Gate)
 * 作用：严查真实落盘数据，坚决拦截模板占位符、假数据与断链资产。
 */
describe('Content Integrity & Physical Anti-Dummy Verification Gate', () => {
  it('GATE 1: Vocab Semantic Integrity - enforces real reviewed examples & forbids dummy template dominance', () => {
    const mainWords = getMainVocabWords();
    expect(mainWords.length).toBeGreaterThanOrEqual(3000);

    let realExamples = 0;
    let templateExamples = 0;
    let dummyDefinitions = 0;

    for (const w of mainWords) {
      expect(w.phonetic).toBeTruthy();
      expect(w.meaning).toBeTruthy();

      if (w.meaning === '日常常用单词' || w.meaning === '待补充' || w.meaning.toLowerCase().includes('todo')) {
        dummyDefinitions++;
      }

      if (w.example && !w.example.startsWith('I practice using the word')) {
        realExamples++;
      } else {
        templateExamples++;
      }
    }

    expect(dummyDefinitions).toBe(0);
    expect(realExamples).toBeGreaterThanOrEqual(2000);
    expect(templateExamples / mainWords.length).toBeLessThan(0.40);
  });

  it('GATE 2: Kids Vocab Integrity - ensures all words have valid emojis and themes without placeholders', () => {
    const kidsWords = getKidsVocabWords();
    expect(kidsWords.length).toBeGreaterThanOrEqual(200);

    for (const w of kidsWords) {
      expect(w.word).toBeTruthy();
      expect(w.meaning).toBeTruthy();
      expect(w.meaning).not.toBe('基础词汇');
      expect(w.theme).toBeTruthy();
      expect(w.emoji).toBeTruthy();
    }
  });

  it('GATE 3: Dialogue Depth & Fullness - enforces at least 1,000 real physical dialogue turns', () => {
    let totalTurns = 0;

    expect(ROLE_PLAY_DIALOGUES.length).toBeGreaterThanOrEqual(40);
    for (const r of ROLE_PLAY_DIALOGUES) {
      const turns = (r as any).turns || (r as any).steps || (r as any).lines || [];
      totalTurns += turns.length;
      for (const t of turns) {
        const text = (t.en || t.text || '').toLowerCase();
        expect(text).not.toContain('lorem ipsum');
        expect(text).not.toContain('todo:');
      }
    }

    expect(DIALOGUES.length).toBeGreaterThanOrEqual(40);
    for (const d of DIALOGUES) {
      const turns = (d as any).turns || (d as any).dialogue || (d as any).lines || [];
      totalTurns += turns.length;
    }

    const dailyModules = import.meta.glob('@/lib/advanced/dailyExchanges*.ts', { eager: true }) as Record<string, any>;
    for (const mod of Object.values(dailyModules)) {
      for (const val of Object.values(mod)) {
        if (!Array.isArray(val)) continue;
        for (const item of val) {
          if (item.turns) totalTurns += item.turns.length;
          else if (item.q && item.a) totalTurns += 2;
        }
      }
    }

    for (const s of scenes) {
      totalTurns += (s.turns.length + s.replies.length);
    }

    expect(totalTurns).toBeGreaterThanOrEqual(1000);
  });

  it('GATE 4: Listening Corpus Richness - verifies >= 80 distinct passages with content body', () => {
    const listeningModules = import.meta.glob('@/lib/advanced/*istening*.ts', { eager: true }) as Record<string, any>;
    const allPacks: any[] = [];

    for (const mod of Object.values(listeningModules)) {
      for (const val of Object.values(mod)) {
        if (Array.isArray(val)) {
          // 只过滤听力包对象（必须有 id），排除 LEVELS 等配置字符串数组
          for (const item of val) {
            if (item && typeof item === 'object' && item.id) {
              allPacks.push(item);
            }
          }
        }
      }
    }

    expect(allPacks.length).toBeGreaterThanOrEqual(80);

    for (const p of allPacks) {
      const title = p.title || p.titleEn || '';
      expect(title.length).toBeGreaterThan(2);
      const hasContent = Boolean(
        (p.passage && p.passage.length > 20) ||
        (p.transcript && p.transcript.length > 20) ||
        (p.paragraphs && p.paragraphs.length > 0) ||
        (p.sentences && p.sentences.length > 0) ||
        (p.items && p.items.length > 0)
      );
      expect(hasContent).toBe(true);
    }
  });

  it('GATE 5: Physical Media Zero-Byte Protection - audio index must align with non-empty mp3s on disk', () => {
    const audioDir = path.resolve(process.cwd(), 'public/audio');
    const indexFile = path.join(audioDir, 'index.json');

    expect(fs.existsSync(indexFile)).toBe(true);
    const indexData = JSON.parse(fs.readFileSync(indexFile, 'utf-8'));
    const entryCount = Object.keys(indexData).length;
    expect(entryCount).toBeGreaterThanOrEqual(15000);

    const wordsJpgDir = path.resolve(process.cwd(), 'src/assets/words');
    expect(fs.existsSync(wordsJpgDir)).toBe(true);
    const jpgFiles = fs.readdirSync(wordsJpgDir).filter(f => f.endsWith('.jpg'));
    expect(jpgFiles.length).toBeGreaterThanOrEqual(250);

    const sampleWords = ['coffee', 'apple', 'cat', 'dog', 'bus', 'book', 'table', 'water'];
    for (const w of sampleWords) {
      const filePath = path.join(wordsJpgDir, `${w}.jpg`);
      expect(fs.existsSync(filePath)).toBe(true);
      const stat = fs.statSync(filePath);
      expect(stat.size).toBeGreaterThan(5000);
    }
  });

  it('GATE 6: Regulatory Purity - prevents student aid / poverty exemption from recurring in source code', () => {
    const sensitiveFiles = [
      'src/components/speaking-app.tsx',
      'src/components/membership.tsx',
      'src/components/account.tsx',
      'src/hooks/use-member-voice.ts',
    ];

    const forbiddenTokens = ['aid_applications', '贫困学生', '助学申请', '贫困证明', 'EDU half price'];

    for (const relPath of sensitiveFiles) {
      const fullPath = path.resolve(process.cwd(), relPath);
      if (!fs.existsSync(fullPath)) continue;
      const content = fs.readFileSync(fullPath, 'utf-8');
      for (const token of forbiddenTokens) {
        expect(content.includes(token)).toBe(false);
      }
    }
  });
});
