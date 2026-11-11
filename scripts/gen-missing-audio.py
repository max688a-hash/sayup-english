#!/usr/bin/env python3
"""Generate local MP3s (same 24 kHz mono neural voices as public/audio) for sentences that
have no entry in the relevant audio index, and register them.

Usage:  python3 scripts/gen-missing-audio.py texts.json [ava,andrew,emma]
texts.json is a JSON array of English strings.  Requires `pip3 install -U edge-tts`.
Safe to re-run: existing files are skipped, each voice's index is rewritten at the end.

Index conventions (must match runtime lookup in src/lib/cloud-speech.ts):
  ava    -> public/audio/index.json            hash = sha256(key)[:16] -> public/audio/<h>.mp3
  andrew -> public/audio/v/andrew/index.json   hash = sha1(key)[:16]   -> public/audio/v/andrew/<h>.mp3
  emma   -> public/audio/v/emma/index.json     hash = sha1(key)[:16]   -> public/audio/v/emma/<h>.mp3
"""
import asyncio, hashlib, json, re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, 'public', 'audio')
VOICES = {
    'ava': 'en-US-AvaMultilingualNeural',
    'andrew': 'en-US-AndrewMultilingualNeural',
    'emma': 'en-US-EmmaMultilingualNeural',
}
# main index uses sha256; alternate voice indexes use sha1 (verified 262/262 entries)
HASH_FN = {'ava': hashlib.sha256, 'andrew': hashlib.sha1, 'emma': hashlib.sha1}
CONCURRENCY = 6


def loosen_key(t: str) -> str:  # mirror of loosenKey in src/lib/cloud-speech.ts
    t = (t or '').lower().replace('\u2019', "'").replace('\u2018', "'")
    t = re.sub(r"[^a-z0-9\s']", ' ', t)
    return re.sub(r'\s+', ' ', t).strip()


def index_path(voice: str) -> str:
    return os.path.join(AUDIO, 'index.json') if voice == 'ava' else os.path.join(AUDIO, 'v', voice, 'index.json')


def file_path(voice: str, h: str) -> str:
    return os.path.join(AUDIO, f'{h}.mp3') if voice == 'ava' else os.path.join(AUDIO, 'v', voice, f'{h}.mp3')


async def synth(text: str, voice: str, path: str, sem: asyncio.Semaphore):
    import edge_tts
    tmp = path + '.part'
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(text, voice).save(tmp)
                if os.path.getsize(tmp) > 0:
                    os.replace(tmp, path)
                    return True
            except Exception as e:  # noqa: BLE001
                err = e
                await asyncio.sleep(2 * (attempt + 1))
        print(f'FAILED {text!r}: {err}', file=sys.stderr)
        return False


async def main(src: str, voices):
    for v in voices:
        if v not in VOICES:
            sys.exit(f'unknown voice {v!r}; choose from {sorted(VOICES)}')
    texts = json.load(open(src))
    sem = asyncio.Semaphore(CONCURRENCY)

    # per-voice index + key->hash map, reusing existing hashes so we never orphan files
    indexes, keymaps = {}, {}
    for v in voices:
        ip = index_path(v)
        indexes[v] = json.load(open(ip)) if os.path.exists(ip) else {}
        keymaps[v] = {}

    jobs = []
    for text in texts:
        key = loosen_key(text)
        if not key:
            continue
        for v in voices:
            idx = indexes[v]
            h = idx.get(key) or HASH_FN[v](key.encode()).hexdigest()[:16]
            keymaps[v][key] = h
            path = file_path(v, h)
            if os.path.exists(path) and os.path.getsize(path) > 0:
                continue
            os.makedirs(os.path.dirname(path), exist_ok=True)
            jobs.append(synth(text, VOICES[v], path, sem))
    results = await asyncio.gather(*jobs)

    for v in voices:
        idx, written = indexes[v], 0
        for key, h in keymaps[v].items():
            if os.path.exists(file_path(v, h)):
                if idx.get(key) != h:
                    idx[key] = h
                    written += 1
        json.dump(idx, open(index_path(v), 'w'), ensure_ascii=False, separators=(',', ':'))
        print(f'{v}: index {len(idx)} entries (+{written} new)')

    print(f'generated {sum(1 for r in results if r)} files, failed {sum(1 for r in results if not r)}')


if __name__ == '__main__':
    voices = sys.argv[2].split(',') if len(sys.argv) > 2 else ['ava']
    asyncio.run(main(sys.argv[1], voices))
