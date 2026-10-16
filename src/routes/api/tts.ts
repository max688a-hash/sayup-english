import { createFileRoute } from "@tanstack/react-router";

const BUCKET = "tts-audio";
const MODEL = "google/gemini-3.1-flash-tts-preview";
const VOICE = "Kore";

async function hashKey(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let text = "";
        let slow = false;
        try {
          const body = await request.json();
          text = String(body?.text ?? "").trim().slice(0, 400);
          slow = body?.slow === true;
        } catch { return new Response("bad request", { status: 400 }); }
        if (!text) return new Response("missing text", { status: 400 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("tts not configured", { status: 500 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const key = `${await hashKey(`${VOICE}|${slow ? "slow" : "normal"}|${text}`)}.wav`;
        const headers = { "Content-Type": "audio/wav", "Cache-Control": "public, max-age=31536000, immutable" };

        const existing = await supabaseAdmin.storage.from(BUCKET).download(key);
        if (existing.data) return new Response(existing.data.stream(), { headers });

        const { requestSpeech } = await import("@/lib/tts-request");
        const spoken = slow ? `Speak slowly and clearly, word by word: ${text}` : `Speak naturally and warmly: ${text}`;
        const upstream = await requestSpeech({ baseURL: "https://ai.gateway.lovable.dev", apiKey, model: MODEL, voice: VOICE }, spoken);
        if (!upstream.ok || !upstream.body) {
          return new Response("synthesis failed", { status: upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502 });
        }
        const audio = new Uint8Array(await upstream.arrayBuffer());
        if (!audio.byteLength) return new Response("synthesis failed", { status: 502 });
        await supabaseAdmin.storage.from(BUCKET).upload(key, audio, { contentType: "audio/wav", upsert: true });
        return new Response(audio, { headers });
      },
    },
  },
});
