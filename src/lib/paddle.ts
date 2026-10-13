import { resolvePaddlePrice } from '@/utils/payments.functions';

const clientToken = import.meta.env['VITE_PAYMENTS_CLIENT_TOKEN'] as string | undefined;

declare global {
  interface Window { Paddle: any }
}

export function getPaddleEnvironment(): 'sandbox' | 'live' {
  return clientToken?.startsWith('test_') ? 'sandbox' : 'live';
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
