<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the app in the index route with learning content in a separate data module; no account is needed.
- Speaking scores must come only from real recordings: client checks for voiced audio first, then /api/speech-analyze transcribes and analyzes via AI Gateway; never show a score without recorded speech, so feedback is never faked.
- Use Web Speech synthesis only after user interaction.
- Scope adult and child semantic theme tokens to the phone screen and keep the desktop preview shell independent so mode changes do not recolor the workspace.
- Never render a button or other interactive control inside another button; keep secondary controls as siblings in a flex row, because nested buttons break SSR hydration and make early clicks dead.
- Content ported from the original GitHub repo (max688a-hash/yuya-english-speaking-app) lives verbatim in src/lib/advanced/*.ts with @ts-nocheck; keep user-facing labels free of exam brand names (use 进阶 / 1–6 级), to avoid trademark issues.
- Extra learning modules (scenes, patterns, reading, cloze, free-speak, word groups, bots…) live in src/components/library.tsx keyed by LibKind; vocab review builds its "real context" sentence pool from all module data and syncs to the vocab_reviews table, so words are always learned inside sentences used elsewhere in the app.
- Open-ended speaking prompts send targets prefixed with [FREE] to /api/speech-analyze, which judges relevance and grammar instead of word-by-word matching.
- Speaking drills (picture-drag, shadow, stress, immersion) are grouped under src/components/speaking-gym.tsx as one ordered module; add new speaking drills there, not as separate Learn-page entries, to keep the acquisition order in one place.
- Demo audio plays built-in neural MP3s from public/audio (index.json maps loosened text → hash) first, then /api/tts cloud synthesis, then device speech; keeps learning offline and cuts server cost.
- Any new built-in audio in public/audio must be generated with Microsoft Edge neural TTS voice en-US-AvaNeural (edge-tts, 24kHz mono 48kbps MP3) and registered in index.json by loosenKey, so every recording matches the original repo's voice.
