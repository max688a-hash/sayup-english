// Client helper: plays cloud-synthesized demo audio (consistent, natural voice
// on every device). Falls back to the device's speechSynthesis when the cloud
// voice is unavailable, so the app never goes silent.
const cache = new Map<string, string>();
let current: HTMLAudioElement | null = null;

export function stopCloudSpeech() {
  if (current) { current.pause(); current.src = ""; current = null; }
}

export type SpeakHooks = { onstart?: () => void; onend?: () => void; onerror?: () => void };

export async function speakCloud(text: string, slow: boolean, hooks: SpeakHooks = {}): Promise<boolean> {
  try {
    stopCloudSpeech();
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
