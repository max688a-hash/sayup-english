import type { DemoVoice } from '@/lib/member-voices';
// Client helper: plays cloud-synthesized demo audio (consistent, natural voice
// on every device). Falls back to the device's speechSynthesis when the cloud
// voice is unavailable, so the app never goes silent.
const cache = new Map<string, string>();
let current: HTMLAudioElement | null = null;
let playbackId = 0;

export function stopCloudSpeech() {
  playbackId++;
  if (current) { current.pause(); current.src = ""; current = null; }
}

export type SpeakHooks = { onstart?: () => void; onend?: () => void; onerror?: () => void };

// Built-in neural recordings shipped with the app (public/audio). Offline, no server cost.
let localIndex: Promise<Record<string, string>> | null = null;
const voiceIndexes = new Map<DemoVoice, Promise<Record<string, string>>>();
export const loosenKey = (t: string) => (t || "").toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9\s']/g, " ").replace(/\s+/g, " ").trim();
let swTried = false;
function registerAudioCache() {
  if (swTried || typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  swTried = true;
  try { if (window.self !== window.top) return; } catch { return; }
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}
function loadIndex() {
  registerAudioCache();
  if (!localIndex) localIndex = fetch("/audio/index.json").then(r => (r.ok ? r.json() : {})).catch(() => { localIndex = null; return {}; });
  return localIndex;
}

export async function speakCloud(text: string, slow: boolean, hooks: SpeakHooks = {}, voice: DemoVoice = 'ava'): Promise<boolean> {
  try {
    stopCloudSpeech();
    const requestId = playbackId;
    let chosenVoice = voice;
    let index: Record<string, string>;
    if (voice === 'ava') index = await loadIndex();
    else {
      registerAudioCache();
      let pending = voiceIndexes.get(voice);
      if (!pending) {
        pending = fetch(`/audio/v/${voice}/index.json`).then(r => { if (!r.ok) throw new Error('voice index'); return r.json(); }).catch(() => { voiceIndexes.delete(voice); return {}; });
        voiceIndexes.set(voice, pending);
      }
      index = await pending;
    }
    let hash = index[loosenKey(text)];
    if (!hash && voice !== 'ava') { chosenVoice = 'ava'; hash = (await loadIndex())[loosenKey(text)]; }
    if (requestId !== playbackId) return true;
    if (hash) {
      const audio = new Audio(chosenVoice === 'ava' ? `/audio/${hash}.mp3` : `/audio/v/${chosenVoice}/${hash}.mp3`);
      audio.playbackRate = slow ? 0.75 : 1;
      (audio as HTMLAudioElement & { preservesPitch?: boolean }).preservesPitch = true;
      current = audio;
      audio.onplay = () => hooks.onstart?.();
      audio.onended = () => { if (current === audio) current = null; hooks.onend?.(); };
      audio.onerror = () => { if (current === audio) current = null; hooks.onerror?.(); };
      try { await audio.play(); return true; } catch {
        if (voice !== 'ava') return false;
      }
    }
    if (voice !== 'ava') return false;
    const key = `${slow ? "s" : "n"}|${text}`;
    let url = cache.get(key);
    if (!url) {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, slow }),
      });
      if (!res.ok) return false;
      const blob = await res.blob();
      if (!blob.size) return false;
      url = URL.createObjectURL(blob);
      cache.set(key, url);
    }
    if (requestId !== playbackId) return true;
    const audio = new Audio(url);
    current = audio;
    audio.onplay = () => hooks.onstart?.();
    audio.onended = () => { if (current === audio) current = null; hooks.onend?.(); };
    audio.onerror = () => { if (current === audio) current = null; hooks.onerror?.(); };
    await audio.play();
    return true;
  } catch {
    return false;
  }
}
