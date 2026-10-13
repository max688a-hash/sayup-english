import { resolvePaddlePrice } from '@/utils/payments.functions';

const clientToken = import.meta.env['VITE_PAYMENTS_CLIENT_TOKEN'] as string | undefined;

declare global {
  interface Window { Paddle: any }
}

export function getPaddleEnvironment(): 'sandbox' | 'live' {
  return clientToken?.startsWith('test_') ? 'sandbox' : 'live';
}

// 正式收款开关：只在沙盒环境或预览网址上开放真实收银台。
// 公司主体与对公账户审核完成前，正式发布站一律显示「即将开放」。
export function isPaymentsOpen(): boolean {
  if (getPaddleEnvironment() === 'sandbox') return true;
  if (typeof window === 'undefined') return false;
  return window.location.hostname.includes('id-preview');
}

let ready: Promise<void> | null = null;
export function initializePaddle() {
  if (ready) return ready;
  if (!clientToken) return Promise.reject(new Error('VITE_PAYMENTS_CLIENT_TOKEN is not set'));
  ready = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.onload = () => {
      window.Paddle.Environment.set(getPaddleEnvironment() === 'sandbox' ? 'sandbox' : 'production');
      window.Paddle.Initialize({ token: clientToken });
      resolve();
    };
    script.onerror = () => { ready = null; reject(new Error('Paddle failed to load')); };
    document.head.appendChild(script);
  });
  return ready;
}

export async function openMemberCheckout(planId: string, user: { id: string; email?: string | undefined }) {
  await initializePaddle();
  const priceId = await resolvePaddlePrice({ data: { priceId: `sayup_${planId}`, environment: getPaddleEnvironment() } });
  window.Paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    customer: user.email ? { email: user.email } : undefined,
    customData: { userId: user.id },
    settings: { displayMode: 'overlay', locale: 'zh-Hans', successUrl: `${window.location.origin}/?checkout=success`, allowLogout: false, variant: 'one-page' },
  });
}
