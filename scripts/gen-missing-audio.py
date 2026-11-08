#!/usr/bin/env python3
"""Generate local MP3s (same 24 kHz mono neural voices as public/audio) for sentences that
have no entry in public/audio/index.json, and register them in the index.

Usage:  python3 scripts/gen-missing-audio.py texts.json [ava,andrew,emma]
texts.json is a JSON array of English strings.  Requires `pip3 install -U edge-tts`.
Safe to re-run: existing files are skipped, the index is rewritten at the end.
"""
import asyncio, hashlib, json, re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, 'public', 'audio')
INDEX = os.path.join(AUDIO, 'index.json')
VOICES = {'ava': 'en-US-AvaMultilingualNeural', 'andrew': 'en-US-AndrewMultilingualNeural', 'emma': 'en-US-EmmaMultilingualNeural'}
CONCURRENCY = 6


def loosen_key(t: str) -> str:  # mirror of loosenKey in src/lib/cloud-speech.ts
    t = (t or '').lower().replace('\u2019', "'").replace('\u2018', "'")
    t = re.sub(r"[^a-z0-9\s']", ' ', t)
    return re.sub(r'\s+', ' ', t).strip()


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
    texts = json.load(open(src))
    index = json.load(open(INDEX))
    sem = asyncio.Semaphore(CONCURRENCY)
    jobs, keys = [], {}
    for text in texts:
        key = loosen_key(text)
        if not key:
            continue
        h = index.get(key) or hashlib.sha256(key.encode()).hexdigest()[:16]
        keys[key] = h
        for v in voices:
            path = os.path.join(AUDIO, f'{h}.mp3') if v == 'ava' else os.path.join(AUDIO, 'v', v, f'{h}.mp3')
            if os.path.exists(path) and os.path.getsize(path) > 0:
                continue
            os.makedirs(os.path.dirname(path), exist_ok=True)
            jobs.append(synth(text, VOICES[v], path, sem))
    results = await asyncio.gather(*jobs)
    for key, h in keys.items():
        if os.path.exists(os.path.join(AUDIO, f'{h}.mp3')):
            index[key] = h
    json.dump(index, open(INDEX, 'w'), ensure_ascii=False, separators=(',', ':'))
    print(f'generated {sum(1 for r in results if r)} files, failed {sum(1 for r in results if not r)}; index now {len(index)} entries')


if __name__ == '__main__':
    voices = sys.argv[2].split(',') if len(sys.argv) > 2 else ['ava']
    asyncio.run(main(sys.argv[1], voices))
