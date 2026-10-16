import { useState, type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { tr } from '@/lib/tr';

/** 在 App 内打开外部页面：不跳出到浏览器，顶部始终有「返回学习」。 */
export function InAppLink({ url, title, className, children }: { url: string; title: string; className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <>
    <button type="button" className={className} onClick={() => setOpen(true)}>{children}</button>
    {open && <div className="fixed inset-0 z-[100] flex flex-col bg-background">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <button type="button" onClick={() => setOpen(false)} className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground"><ArrowLeft size={16} />{tr('返回学习')}</button>
        <span className="min-w-0 truncate text-sm text-muted-foreground">{title}</span>
      </div>
      <iframe src={url} title={title} className="w-full flex-1 border-0" sandbox="allow-scripts allow-same-origin allow-forms allow-popups-to-escape-sandbox allow-presentation" allow="autoplay; encrypted-media; fullscreen" />
      <p className="px-3 py-1.5 text-center text-xs text-muted-foreground">{tr('若页面空白，说明该网站不允许嵌入显示，点「返回学习」继续。')}</p>
    </div>}
  </>;
}
