import { useState, type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { tr } from '@/lib/tr';

/** 在 App 内打开外部页面：不跳出到浏览器，顶部始终有「返回学习」。 */
// 实测会拒绝被嵌入显示的网站（返回 X-Frame-Options / frame-ancestors）
const NO_EMBED = ['youtube.com','storynory.com','ted.com','thisamericanlife.org','voanews.com','americanliterature.com','etc.usf.edu','standardebooks.org'];
const blocked = (u: string) => { try { const h = new URL(u).hostname; return NO_EMBED.some(d => h === d || h.endsWith('.' + d)); } catch { return true; } };

export function InAppLink({ url, title, className, children }: { url: string; title: string; className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <>
    <button type="button" className={className} onClick={() => setOpen(true)}>{children}</button>
    {open && <div className="fixed inset-0 z-[100] flex flex-col bg-background">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <button type="button" onClick={() => setOpen(false)} className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground"><ArrowLeft size={16} />{tr('返回学习')}</button>
        <span className="min-w-0 truncate text-sm text-muted-foreground">{title}</span>
      </div>
      {blocked(url) ? <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-base font-semibold">{tr('这个网站不允许在其他 App 里显示')}</p>
        <p className="max-w-sm text-sm text-muted-foreground">{tr('建议先用 App 内置的分级听力和学术听力（带真人录音、逐句跟读）。确实想看原网站，可以用浏览器打开，看完再回到声芽继续学习。')}</p>
        <a href={url} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-sm">{tr('用浏览器打开（会离开 App）')}</a>
      </div> : <iframe src={url} title={title} className="w-full flex-1 border-0" sandbox="allow-scripts allow-same-origin allow-forms allow-popups-to-escape-sandbox allow-presentation" allow="autoplay; encrypted-media; fullscreen" />}
      {!blocked(url) && <p className="px-3 py-1.5 text-center text-xs text-muted-foreground">{tr('若页面空白，说明该网站不允许嵌入显示，点「返回学习」继续。')}</p>}
    </div>}
  </>;
}
