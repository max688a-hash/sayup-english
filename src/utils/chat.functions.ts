import { createServerFn } from "@tanstack/react-start";

type Msg = { role: "user" | "assistant"; content: string };
const LANG_NAME: Record<string, string> = { zh: "简体中文", vi: "越南语", ja: "日语" };

// AI free conversation partner: replies in simple English and corrects the learner's last sentence.
export const freeChat = createServerFn({ method: "POST" })
  .validator((d: { messages: Msg[]; scene: string; lang: string }) => {
    if (!Array.isArray(d.messages) || d.messages.length > 40) throw new Error("bad input");
    return { scene: String(d.scene).slice(0, 80), lang: String(d.lang), messages: d.messages.map(m => ({ role: m.role === "assistant" ? "assistant" as const : "user" as const, content: String(m.content).slice(0, 600) })) };
  })
  .handler(async ({ data }) => {
    const key = process.env['LOVABLE_API_KEY'];
    if (!key) throw new Error("AI 暂不可用");
    const native = LANG_NAME[data.lang] ?? "简体中文";
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions: `你是英语口语陪练，场景：${data.scene}。学员是 A2 水平。reply：用简单自然的英语回应并追问一个问题，不超过 2 句。correction：如果学员最后一句英语有语法或用词错误，给出更自然的完整说法（英文）；没有错误就为空字符串。tip：用${native}写一句简短说明（为什么这样改，或夸一句）。`,
        input: data.messages.length ? data.messages : [{ role: "user", content: "(start the conversation)" }],
        store: false,
        reasoning: { effort: "low" },
        text: { format: { type: "json_schema", name: "chat", strict: true, schema: { type: "object", additionalProperties: false, required: ["reply", "correction", "tip"], properties: { reply: { type: "string" }, correction: { type: "string" }, tip: { type: "string" } } } } },
      }),
    });
    if (!res.ok) { const t = await res.text(); console.error("chat", res.status, t); throw new Error(res.status === 429 ? "请求太频繁，请稍后再试" : res.status === 402 ? "AI 额度不足" : "AI 暂时不可用"); }
    const j = await res.json() as { output_text?: string; output?: { content?: { type: string; text?: string }[] }[] };
    const text = j.output_text ?? j.output?.flatMap(o => o.content ?? []).find(c => c.type === "output_text")?.text ?? "{}";
    return JSON.parse(text) as { reply: string; correction: string; tip: string };
  });
