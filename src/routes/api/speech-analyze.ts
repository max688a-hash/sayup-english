import { createFileRoute } from "@tanstack/react-router";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export const Route = createFileRoute("/api/speech-analyze")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { transcribeAudio, analyzeSpeech, GatewayError, MAX_AUDIO_BYTES } = await import(
          "@/lib/speech-analysis.server"
        );
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) return json({ error: "分析服务未配置" }, 500);
        const length = Number(request.headers.get("content-length") ?? 0);
        if (length > MAX_AUDIO_BYTES + 64 * 1024) return json({ error: "录音太长，请控制在 30 秒以内" }, 413);
        try {
          const form = await request.formData();
          const file = form.get("file");
          const target = String(form.get("target") ?? "").trim().slice(0, 300);
          if (!(file instanceof File) || !file.size) return json({ status: "no_audio", error: "没有收到录音，请再说一次" }, 400);
          if (file.size > MAX_AUDIO_BYTES) return json({ error: "录音太长，请控制在 30 秒以内" }, 413);
          if (!file.type.startsWith("audio/")) return json({ error: "录音格式不正确" }, 400);
          if (!target) return json({ error: "缺少目标句子" }, 400);
          const heard = await transcribeAudio(apiKey, file, request.signal);
          if (!heard.replace(/[^a-zA-Z]/g, "")) return json({ status: "no_speech", heard });
          const analysis = await analyzeSpeech(apiKey, target, heard, request.signal);
          return json({ status: "ok", heard, analysis });
        } catch (error) {
          if (request.signal.aborted) return new Response(null, { status: 499 });
          if (error instanceof GatewayError) {
            const msg =
              error.status === 402 ? "AI 额度已用完，请在工作区设置中充值后再试" :
              error.status === 429 ? "请求太频繁，请稍等几秒再试" : error.message;
            return json({ error: msg }, error.status >= 400 && error.status < 600 ? error.status : 502);
          }
          console.error(error);
          return json({ error: "分析失败，请稍后再试" }, 500);
        }
      },
    },
  },
});
