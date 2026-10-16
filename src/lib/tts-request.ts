// Server-only helper for Lovable AI Gateway text-to-speech (Gemini format).
export type SpeechConfig = {
  baseURL: string;
  apiKey: string;
  model: string;
  voice: string;
};

export function speechBody(config: SpeechConfig, text: string) {
  return {
    model: config.model,
    contents: [{ role: "user", parts: [{ text }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: config.voice } } },
    },
    stream_format: "audio",
  };
}

export async function requestSpeech(config: SpeechConfig, text: string, signal?: AbortSignal) {
  return fetch(`${config.baseURL}/v1/audio/speech`, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(speechBody(config, text)),
    ...(signal ? { signal } : {}),
  });
}
