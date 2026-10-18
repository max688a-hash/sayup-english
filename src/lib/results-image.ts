import { tr } from '@/lib/tr';

type ResultsImageData = {
  from: string; to: string; count: number; average: number | null;
  days: string[]; trend: { day: string; score: number; count: number }[];
};

/** Draw only summary data and optional session peaks; never account or speech text. */
export async function createResultsImage(data: ResultsImageData, source: HTMLElement, waveform?: number[]): Promise<Blob> {
  await document.fonts.ready;
  const canvas = document.createElement('canvas');
  canvas.width = 1080; canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error(tr('成果图片生成失败，请重试。'));
  const styles = getComputedStyle(source);
  const color = (token: string) => styles.getPropertyValue(token).trim();
  const bg = color('--background'); const text = color('--foreground');
  const muted = color('--muted-foreground'); const primary = color('--primary');
  const border = color('--border');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 1080, 1920);
  const label = (value: string, x: number, y: number, size = 28, fill = text, max = 936) => {
    ctx.fillStyle = fill; ctx.font = `${size >= 40 ? 600 : 400} ${size}px system-ui, sans-serif`;
    ctx.fillText(value, x, y, max);
  };
  const line = (x: number, y: number, x2: number, y2: number, fill = border, width = 2) => {
    ctx.strokeStyle = fill; ctx.lineWidth = width; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.stroke();
  };
  label('SayUp', 72, 116, 58, primary);
  label(tr('学习成果'), 72, 202, 52);
  label(`${data.from} — ${data.to}`, 72, 266, 28, muted);
  line(72, 310, 1008, 310);
  const metrics: [string, string][] = [
    [String(data.count), tr('有效跟读次数')],
    [String(data.average ?? '—'), tr('平均 AI 评分')],
    [String(data.days.length), tr('打卡天数')],
  ];
  metrics.forEach(([value, title], i) => {
    label(value, 72 + i * 320, 408, 64, primary, 290);
    label(title, 72 + i * 320, 465, 25, muted, 285);
  });
  line(72, 514, 1008, 514);
  label(tr('AI 评分趋势'), 72, 596, 38);
  [0, 50, 100].forEach(score => {
    const y = 930 - score * 2.6;
    label(String(score), 72, y + 9, 24, muted, 60); line(140, y, 1008, y);
  });
  const point = (score: number, i: number): [number, number] => [data.trend.length === 1 ? 574 : 140 + i * 868 / (data.trend.length - 1), 930 - score * 2.6];
  data.trend.forEach((r, i) => {
    const [x, y] = point(r.score, i);
    const previous = data.trend[i - 1];
    if (previous) { const [px, py] = point(previous.score, i - 1); line(px, py, x, y, primary, 5); }
    ctx.fillStyle = primary; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
  });
  label(data.trend[0]?.day ?? '', 140, 988, 23, muted);
  label(data.trend.at(-1)?.day ?? '', 800, 988, 23, muted, 208);
  label(tr('按日平均；评分不等同于专业水平认证。'), 72, 1054, 25, muted);
  line(72, 1105, 1008, 1105);
  label(tr('跟读波形'), 72, 1190, 38);
  if (waveform?.length) {
    waveform.forEach((peak, i) => {
      const x = 76 + i * 928 / waveform.length;
      line(x, 1330 - peak * 85, x, 1330 + peak * 85, primary, 5);
    });
    label(tr('本次使用中的真实录音波形'), 72, 1490, 26, muted);
  } else {
    label(tr('本次暂无录音波形'), 72, 1336, 30, muted);
  }
  line(72, 1540, 1008, 1540);
  label(tr('真实打卡'), 72, 1622, 38);
  label(`${data.days.length} / 30`, 72, 1710, 54, primary);
  label(tr('当天完成 3 次真实录音评分才计入打卡。'), 72, 1770, 25, muted);
  label(tr('不含账号、句子或录音文件'), 72, 1860, 24, muted);
  return new Promise((resolve, reject) => canvas.toBlob(blob => {
    if (blob) resolve(blob); else reject(new Error(tr('成果图片生成失败，请重试。')));
  }, 'image/png'));
}