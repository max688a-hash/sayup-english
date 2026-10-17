import { useState, type ReactNode } from 'react';
import { ArrowLeft, Copy, ExternalLink } from 'lucide-react';
import { tr } from '@/lib/tr';

/**
 * 在 App 内打开外部页面：手机 App 用系统内置浏览器；网页版只把「实测允许嵌入」的网站放进页内框，
 * 其余网站（YouTube、TED 等明确拒绝嵌入）显示说明页 + 新窗口打开 + 复制链接，避免出现「拒绝连线」空白页。
 */
// 2026-10 真实浏览器逐个实测：以下网站可在页内正常显示（无 X-Frame-Options / frame-ancestors，也无人机验证拦截）
export const EMBED_OK = ['simple.wikipedia.org', 'rachelsenglish.com', 'lexfridman.com', 'librivox.org', 'bbc.co.uk', 'allearsenglish.com', 'eslpod.com', 'teacherluke.co.uk', 'gutenberg.org', 'npr.org'];
export const canEmbed = (u: string) => { try { const h = new URL(u).hostname; return EMBED_OK.some(d => h === d || h.endsWith('.' + d)); } catch { return false; } };

const isNative = () => typeof window !== 'undefined' && !!(window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.();
const isFramed = () => { try { return window.self !== window.top; } catch { return true; } };

export function InAppLink({ url, title, className, children }: { url: string; title: string; className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const onOpen = async () => {
    if (isNative()) { try { const { Browser } = await import('@capacitor/browser'); await Browser.open({ url, presentationStyle: 'popover' }); return; } catch { /* 回退到页内 */ } }
    setNote(''); setOpen(true);
  };
  const openOutside = () => {
    const w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch { /* ignore */ } }
    else setNote(tr('浏览器拦截了新窗口。请点「复制链接」，粘贴到浏览器地址栏打开。'));
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setNote(tr('链接已复制，粘贴到浏览器地址栏即可打开。')); }
    catch { setNote(url); }
  };
  const embed = canEmbed(url);
  return <>
    <button type="button" className={className} onClick={onOpen}>{children}</button>
    {open && <div className="fixed inset-0 z-[100] flex flex-col bg-background">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <button type="button" onClick={() => setOpen(false)} className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground"><ArrowLeft size={16} />{tr('返回学习')}</button>
        <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{title}</span>
        {embed && <button type="button" onClick={openOutside} aria-label={tr('用浏览器打开')} className="shrink-0 rounded-full border border-border p-1.5"><ExternalLink size={15} /></button>}
      </div>
      {embed ? <iframe src={url} title={title} className="w-full flex-1 border-0" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation" allow="autoplay; encrypted-media; fullscreen" />
        : <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="text-base font-semibold">{tr('这个网站不允许在其他 App 里显示')}</p>
          <p className="max-w-sm text-sm text-muted-foreground">{tr('这是对方网站的规定（YouTube、TED 等都这样），不是你的网络问题。可以用浏览器打开，看完再回到声芽继续学习。')}</p>
          <button type="button" onClick={openOutside} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><ExternalLink size={15} />{tr('用浏览器打开')}</button>
          <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm"><Copy size={15} />{tr('复制链接')}</button>
          {isFramed() && <p className="max-w-sm text-xs text-muted-foreground">{tr('当前是在编辑预览窗口里，部分网站（如 YouTube）会拒绝从这里打开；在正式网址或手机 App 里可以正常打开。')}</p>}
          {note && <p className="max-w-sm break-all text-xs text-primary">{note}</p>}
        </div>}
      {embed && note && <p className="px-3 py-1.5 text-center text-xs text-primary">{note}</p>}
    </div>}
  </>;
}
