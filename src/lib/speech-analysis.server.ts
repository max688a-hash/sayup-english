import { createParser } from "eventsource-parser";

const GATEWAY = "https://ai.gateway.lovable.dev";
const STT_MODEL = "openai/gpt-transcribe";
const ANALYSIS_MODEL = "openai/gpt-6-astra";
export const MAX_AUDIO_BYTES = 10 * 1024 * 1024;

export class GatewayError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function readSSE(response: Response, onEvent: (data: Record<string, unknown>) => void) {
  if (!response.ok || !response.body) {
    const text = await response['text']().catch(() => "");
    let message = text;
    try {
      const j = JSON.parse(text);
      message = j?.error?.message ?? j?.message ?? text;
    } catch {}
    throw new GatewayError(response.status, message || `请求失败 (${response.status})`);
  }
  const parser = createParser({
    onEvent(event) {
      if (!event.data || event.data === "[DONE]") return;
      try {
        onEvent(JSON.parse(event.data));
      } catch {}
    },
  });
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parser.feed(value);
  }
}

export async function transcribeAudio(apiKey: string, file: File, signal: AbortSignal) {
  const form = new FormData();
  form.append("model", STT_MODEL);
  form.append("file", file, file.name || "recording.wav");
  form.append("response_format", "json");
  form.append("stream", "true");
  form.append("languages", "en");
  const res = await fetch(`${GATEWAY}/v1/audio/transcriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
    signal,
  });
  let deltas = "";
  let final: string | null = null;
  let failed: string | null = null;
  await readSSE(res, (e) => {
    if (e['type'] === "transcript.text.delta" && typeof e['delta'] === "string") deltas += e['delta'];
    else if (e['type'] === "transcript.text.done" && typeof e['text'] === "string") final = e['text'];
    else if (e['type'] === "error") failed = String((e as { message?: string }).message ?? "识别失败");
  });
  if (failed) throw new GatewayError(502, failed);
  return (final ?? deltas).trim();
}

export type SpeechAnalysis = {
  score: number;
  verdict: "good" | "needs_work" | "retry";
  summary: string;
  issues: { word: string; problem: string; fix: string }[];
  suggestions: string[];
  next_try: string;
};

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "verdict", "summary", "issues", "suggestions", "next_try"],
  properties: {
    score: { type: "integer" },
    verdict: { type: "string", enum: ["good", "needs_work", "retry"] },
    summary: { type: "string" },
    issues: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["word", "problem", "fix"],
        properties: { word: { type: "string" }, problem: { type: "string" }, fix: { type: "string" } },
      },
    },
    suggestions: { type: "array", items: { type: "string" } },
    next_try: { type: "string" },
  },
};

const instructions = `你是严格而友善的英语口语教练。你会收到学习者要说的目标句子，以及语音识别从他的录音中实际听到的文字。
规则：
- 逐词对比目标句和识别结果。漏读、多读、读错、被识别成别的词，都说明发音或表达有问题，必须明确指出，不要一味鼓励。
- 识别结果和目标句几乎无关、太短或明显没说完时，verdict 为 "retry"，score 不超过 30，并请学习者再说一次。
- 完全一致且自然才给 85 分以上；有 1-2 处问题给 60-84；问题较多给 60 以下。score 为 0-100 的整数。
- issues 列出每个有问题的单词：problem 说明听到了什么/错在哪，fix 给出具体纠正方法（音标、口型、重音、连读）。没有问题时为空数组。
- suggestions 给 2-3 条可以马上执行的练习建议。
- next_try 给一句下一次跟读时最该注意的提示。
- 你只能根据识别文字判断，无法听到语调细节；不要编造识别结果中没有体现的问题。
- 除英文单词和音标外，全部用简体中文，语气简洁。`;

const LANG_NAME: Record<string, string> = { zh: '简体中文', vi: '越南语（Tiếng Việt）', ja: '日语（日本語）' };
export async function analyzeSpeech(apiKey: string, target: string, heard: string, signal: AbortSignal, lang = 'zh') {
  const res = await fetch(`${GATEWAY}/v1/responses`, {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "fetch" },
    body: JSON.stringify({
      model: ANALYSIS_MODEL,
      instructions: lang === 'zh' ? instructions : instructions + `\n- 重要：所有说明文字（summary、problem、fix、suggestions、next_try）必须改用${LANG_NAME[lang] ?? '简体中文'}书写，不要用中文。`,
      input: [{ role: "user", content: `目标句子：${target}\n识别到的录音文字：${heard}` }],
      stream: true,
      store: false,
      reasoning: { effort: "low" },
      text: { format: { type: "json_schema", name: "speech_feedback", strict: true, schema } },
    }),
  });
  let text = "";
  let failed: string | null = null;
  await readSSE(res, (e) => {
    if (e['type'] === "response.output_text.delta" && typeof e['delta'] === "string") text += e['delta'];
    else if (e['type'] === "response.failed" || e['type'] === "error") failed = "分析失败，请稍后再试";
  });
  if (failed) throw new GatewayError(502, failed);
  const parsed = JSON.parse(text) as SpeechAnalysis;
  parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)));
  return parsed;
}
