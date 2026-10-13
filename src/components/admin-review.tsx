import { useEffect, useState } from 'react';
import { Check, ExternalLink, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

type App = { id: string; aid_type: string; full_name: string; school: string; region: string; proof_path: string; chsi_code: string | null; status: string; created_at: string; review_note: string | null };
const TABS = [['pending', tr('待审核')], ['approved', tr('已通过')], ['rejected', tr('已驳回')]] as const;

export function AdminReview({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<string>('pending');
  const [list, setList] = useState<App[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState('');
  async function load() {
    const { data, error } = await supabase.from('aid_applications').select('id,aid_type,full_name,school,region,proof_path,chsi_code,status,created_at,review_note').eq('status', status).order('created_at', { ascending: true });
    if (error) setMsg('读取失败，请重试。'); else setList(data ?? []);
  }
  useEffect(() => { void load(); }, [status]);
  async function viewProof(path: string) {
    const { data, error } = await supabase.storage.from('aid-proofs').createSignedUrl(path, 300);
    if (error || !data) { setMsg('证件打不开，请重试。'); return; }
    window.open(data.signedUrl, '_blank', 'noopener');
  }
  async function decide(a: App, next: 'approved' | 'rejected') {
    const note = (notes[a.id] ?? '').trim().slice(0, 200);
    if (next === 'rejected' && !note) { setMsg('驳回时请写一句原因，学员能看到。'); return; }
    const { error } = await supabase.from('aid_applications').update({ status: next, review_note: note || null, reviewed_at: new Date().toISOString() }).eq('id', a.id);
    if (error) { setMsg('操作失败，请重试。'); return; }
    setMsg(next === 'approved' ? tr('已通过 {0}，学习名额已自动开通。', a.full_name) : tr('已驳回 {0}。', a.full_name));
    void load();
  }
  return <div className="member-backdrop" onClick={onClose}><section role="dialog" aria-modal="true" aria-label="助学审核" className="member-sheet" onClick={e => e.stopPropagation()}>
    <div className="flex items-center justify-between mb-3"><h2>助学审核（仅管理员）</h2><Button variant="ghost" size="icon" aria-label="关闭" onClick={onClose}><X /></Button></div>
    <div className="filter-row">{TABS.map(([id, label]) => <Button key={id} variant="ghost" className={cn('filter-button', status === id && 'active')} onClick={() => setStatus(id)}>{label}</Button>)}</div>
    {msg && <p className="member-note" role="status">{msg}</p>}
    {list.length === 0 ? <p className="text-xs text-muted-foreground mt-3">这里暂时没有申请。</p> : <div className="record-list mt-2">{list.map(a => <div className="record-item" key={a.id}>
      <div className="flex items-center justify-between gap-2"><b>{a.full_name}</b><span className="level-tag">{a.aid_type === 'poor' ? '贫困 · 全免' : '普通 · 月考核'}</span></div>
      <p className="record-heard">{a.school} · {a.region} · {new Date(a.created_at).toLocaleDateString('zh-CN')}</p>
      <div className="flex flex-wrap items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => void viewProof(a.proof_path)}><FileText size={13} /> 查看证件</Button>
        {a.chsi_code ? <a className="text-xs text-primary underline inline-flex items-center gap-1" href="https://www.chsi.com.cn/xlcx/bgys.jsp" target="_blank" rel="noreferrer">学信网核真 {a.chsi_code} <ExternalLink size={11} /></a> : <span className="text-xs text-muted-foreground">无学信网码，请电话核实开具单位</span>}
      </div>
      {a.review_note && <p className="record-fix">备注：{a.review_note}</p>}
      {status === 'pending' && <div className="aid-form mt-1"><label>审核备注（驳回必填）<input value={notes[a.id] ?? ''} onChange={e => setNotes({ ...notes, [a.id]: e.target.value })} /></label><div className="grid grid-cols-2 gap-2"><Button variant="outline" onClick={() => void decide(a, 'rejected')}><X size={14} /> 驳回</Button><Button onClick={() => void decide(a, 'approved')}><Check size={14} /> 通过并开通</Button></div></div>}
    </div>)}</div>}
  </section></div>;
}
