import { waveformPeaks } from '@/lib/learning-results';

function encodeWav(chunks: readonly Float32Array[], sampleRate: number): Blob {
  const length = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const bytes = new ArrayBuffer(44 + length * 2);
  const view = new DataView(bytes);
  const tag = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i));
  };
  tag(0, "RIFF"); view.setUint32(4, 36 + length * 2, true); tag(8, "WAVE"); tag(12, "fmt ");
  view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true); view.setUint16(34, 16, true); tag(36, "data"); view.setUint32(40, length * 2, true);
  let offset = 44;
  for (const chunk of chunks)
    for (const value of chunk) {
      const s = Math.max(-1, Math.min(1, value));
      view.setInt16(offset, s * (s < 0 ? 32768 : 32767), true);
      offset += 2;
    }
  return new Blob([bytes], { type: "audio/wav" });
}

export type Recording = { file: File; seconds: number; voiced: boolean; waveform: number[] };

/** Records mic audio as WAV; `voiced` is false when no speech-level sound was captured. */
export async function recordWav(): Promise<{ stop: () => Promise<Recording>; cancel: () => void }> {
  // Safari / WebKit 关键防御：在用户同步手势调用栈内立即预创建并尝试唤醒 AudioContext，防止跨越异步 getUserMedia 后手势 Token 丢失导致永久挂起静音
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const context = new AudioContextClass();
  if (context.state === 'suspended') {
    void context.resume().catch(() => {});
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  try {
    if (context.state === 'suspended') {
      await context.resume();
    }
    const source = context.createMediaStreamSource(stream);
    const node = context.createScriptProcessor(4096, 1, 1);
    const silentGain = context.createGain();
    silentGain.gain.setValueAtTime(0, context.currentTime);
    const chunks: Float32Array[] = [];
    let loudFrames = 0;
    node.onaudioprocess = (event) => {
      const data = new Float32Array(event.inputBuffer.getChannelData(0));
      chunks.push(data);
      let sum = 0;
      for (const v of data) sum += v * v;
      if (Math.sqrt(sum / data.length) > 0.005) loudFrames++;
    };
    source.connect(node);
    node.connect(silentGain);
    silentGain.connect(context.destination);
    let stopped = false;
    const cleanup = () => {
      stopped = true;
      stream.getTracks().forEach((t) => t.stop());
      node.disconnect(); source.disconnect(); silentGain.disconnect(); node.onaudioprocess = null;
    };
    return {
      cancel() { if (!stopped) { cleanup(); void context.close(); } },
      async stop() {
        if (stopped) throw new Error("录音已结束");
        cleanup();
        const blob = encodeWav(chunks, context.sampleRate);
        const samples = chunks.reduce((s, c) => s + c.length, 0);
        const seconds = samples / context.sampleRate;
        await context.close();
        return { file: new File([blob], "recording.wav", { type: "audio/wav" }), seconds, voiced: loudFrames >= 2 && seconds >= 0.3, waveform: waveformPeaks(chunks) };
      },
    };
  } catch (error) {
    stream.getTracks().forEach((t) => t.stop());
    await context.close();
    throw error;
  }
}
