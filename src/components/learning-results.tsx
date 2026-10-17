import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ArrowLeft, Download, RefreshCw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { summarizePractice, type ScoredPractice } from '@/lib/learning-results';
import type { PracticeRecord } from '@/components/speech-coach';
import { tr } from '@/lib/tr';

async function loadResults(userId: string) {
  const to = new Date();
  const from = new Date(to); from.setUTCDate(from.getUTCDate() - 29); from.setUTCHours(0, 0, 0, 0);
  const records: ScoredPractice[] = [];
  for (let offset = 0; ; offset += 1000) {
    const r = await supabase.from('practice_records').select('id,score,heard,created_at').eq('user_id', userId).gte('created_at', from.toISOString()).lte('created_at', to.toISOString()).order('created_at').order('id').range(offset, offset + 999);
    if (r.error) throw new Error(tr('学习成果暂时无法读取，请重试。'));
    records.push(...(r.data ?? []));
    if ((r.data?.length ?? 0) < 1000) break;
  }
  const result = await supabase.rpc('checkin_days', { _from: from.toISOString(), _to: to.toISOString() });
  if (result.error) throw new Error(tr('学习成果暂时无法读取，请重试。'));
  return { ...summarizePractice(records), days: [...new Set((result.data ?? []).map(x => x.day))], from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10) };
}

export function LearningResults({ userId, records, onExit, onLogin }: { userId?: string; records: PracticeRecord[]; onExit: () => void; onLogin: () => void }) {
  return <div className="adv-hub learning-results">
    <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr('返回上一级')} onClick={onExit}><ArrowLeft /></Button><span>{tr('学习成果')}</span><ShieldCheck size={18} className="text-primary" /></div>
    <h2 className="text-xl font-semibold mt-4">{tr('每一次开口，都有记录')}</h2>
    <p className="text-xs text-muted-foreground mt-2 mb-5">{tr('仅本人可见；分享前请勿展示账号信息。')}</p>
    {!userId ? <div className="py-8 text-center"><p className="text-sm mb-4">{tr('登录后查看真实学习成果。')}</p><Button onClick={onLogin}>{tr('登录')}</Button></div> : <Suspense fallback={<p role="status" className="py-8 text-sm">{tr('正在读取学习记录…')}</p>}><ResultsData userId={userId} records={records} /></Suspense>}
  </div>;
}

function ResultsData({ userId, records }: { userId: string; records: PracticeRecord[] }) {
  const { data, refetch, isFetching } = useSuspenseQuery({ queryKey: ['learning-results', userId], queryFn: () => loadResults(userId), staleTime: 0 });
  const recent = records.find(r => r.waveform?.length && r.heard.trim());
  function download() {
    const csv = '\uFEFF' + ['SayUp,' + tr('学习成果'), `${data.from},${data.to}`, [tr('日期'), tr('日均 AI 评分'), tr('有效跟读次数'), tr('已打卡')].join(','), ...data.trend.map(r => [r.day, r.score, r.count, data.days.includes(r.day) ? 1 : 0].join(','))].join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'SayUp-learning-results.csv'; a.click(); URL.revokeObjectURL(url);
  }
  return <>
    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground"><span>{tr('近 30 天')} · {data.from} — {data.to}</span><Button variant="ghost" size="icon" aria-label={tr('刷新成果')} title={tr('刷新成果')} disabled={isFetching} onClick={() => void refetch()}><RefreshCw size={16} /></Button></div>
    <div className="grid grid-cols-3 gap-2 border-y border-border py-5 my-3">
      {[{ value: data.count, label: tr('有效跟读次数') }, { value: data.average ?? '—', label: tr('平均 AI 评分') }, { value: data.days.length, label: tr('打卡天数') }].map(item => <div key={item.label} className="text-center min-w-0"><b className="text-2xl text-primary">{item.value}</b><p className="text-xs text-muted-foreground mt-1">{item.label}</p></div>)}
    </div>
    <section className="py-4 border-b border-border"><h3 className="font-semibold text-sm">{tr('AI 评分趋势')}</h3>
      {!data.trend.length ? <p className="text-sm text-muted-foreground py-8">{tr('还没有真实评分记录。')}</p> : <>
        <svg className="w-full h-40 mt-3 text-primary" viewBox="0 0 320 140" role="img" aria-label={tr('AI 评分趋势')}>
          {[0, 50, 100].map(score => <g key={score}><text x="0" y={124 - score} fontSize="10" fill="currentColor">{score}</text><line x1="28" x2="312" y1={120 - score} y2={120 - score} stroke="currentColor" opacity="0.15" /></g>)}
          <polyline fill="none" stroke="currentColor" strokeWidth="2" points={data.trend.map((r, i) => `${data.trend.length === 1 ? 170 : 30 + i * 280 / (data.trend.length - 1)},${120 - r.score}`).join(' ')} />
          {data.trend.map((r, i) => <circle key={r.day} cx={data.trend.length === 1 ? 170 : 30 + i * 280 / (data.trend.length - 1)} cy={120 - r.score} r="3" fill="currentColor"><title>{r.day}: {r.score}/100 · {r.count}</title></circle>)}
        </svg>
        <div className="flex justify-between text-xs text-muted-foreground"><span>{data.trend[0]?.day}</span><span>{data.trend.at(-1)?.day}</span></div>
        <details className="mt-3 text-xs"><summary className="cursor-pointer">{tr('查看每日数据')}</summary><div className="mt-2 space-y-2">{data.trend.map(r => <div key={r.day} className="flex justify-between"><span>{r.day}</span><span>{r.score}/100 · {r.count} {tr('次')}</span></div>)}</div></details>
      </>}
      <p className="text-xs text-muted-foreground mt-3">{tr('按日平均；题目难度不同，评分不等同于专业水平认证。')}</p>
    </section>
    <section className="py-4 border-b border-border"><h3 className="font-semibold text-sm">{tr('跟读波形')}</h3>
      {recent ? <><svg className="w-full h-24 text-primary my-3" viewBox="0 0 320 80" role="img" aria-label={tr('跟读波形')}>{recent.waveform?.map((peak, i, all) => <line key={i} x1={i * 320 / all.length + 2} x2={i * 320 / all.length + 2} y1={40 - peak * 38} y2={40 + peak * 38} stroke="currentColor" strokeWidth="2" />)}</svg><p className="text-xs text-muted-foreground">{recent.at.toLocaleString()} · {recent.seconds?.toFixed(1)}s · {recent.analysis.score}/100</p></> : <p className="text-sm text-muted-foreground py-6">{tr('本次打开后完成跟读，即可查看真实波形；历史录音不保留。')}</p>}
      <p className="text-xs text-muted-foreground mt-3">{tr('波形仅在本次使用中显示，不上传、不长期保存。')}</p>
    </section>
    <section className="py-4"><h3 className="font-semibold text-sm">{tr('真实打卡')}</h3><p className="text-xs text-muted-foreground my-3">{tr('当天完成 3 次真实跟读录音并获得评分，才算打卡一天。只看真开口，挂机不算。')}</p><div className="flex flex-wrap gap-2">{data.days.length ? data.days.map(day => <span key={day} className="text-xs bg-muted rounded px-2 py-1">{day}</span>) : <p className="text-sm text-muted-foreground">{tr('还没有达标打卡日。')}</p>}</div></section>
    <Button variant="outline" className="w-full mt-3" disabled={!data.count} onClick={download}><Download size={16} />{tr('导出匿名成果')}</Button>
    <p className="text-xs text-muted-foreground mt-3 mb-4">{tr('仅导出日期、评分和次数，不含邮箱、昵称、句子或录音。')}</p>
  </>;
}