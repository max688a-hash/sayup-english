import { createFileRoute } from '@tanstack/react-router';
import { verifyWebhook, EventName, type PaddleEnv } from '@/lib/paddle.server';

async function db() {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  return supabaseAdmin;
}

async function onCreated(data: any, env: PaddleEnv) {
  const userId = data.customData?.userId;
  const item = data.items?.[0];
  const priceId = item?.price?.importMeta?.externalId;
  const productId = item?.product?.importMeta?.externalId;
  if (!userId || !priceId || !productId) { console.warn('Skipping subscription: missing userId or externalId'); return; }
  const { error } = await (await db()).from('subscriptions').upsert({
    user_id: userId, paddle_subscription_id: data.id, paddle_customer_id: data.customerId,
    product_id: productId, price_id: priceId, status: data.status,
    current_period_start: data.currentBillingPeriod?.startsAt, current_period_end: data.currentBillingPeriod?.endsAt,
    environment: env, updated_at: new Date().toISOString(),
  }, { onConflict: 'paddle_subscription_id' });
  if (error) throw error;
}

async function onUpdated(data: any, env: PaddleEnv) {
  await (await db()).from('subscriptions').update({
    status: data.status, current_period_start: data.currentBillingPeriod?.startsAt, current_period_end: data.currentBillingPeriod?.endsAt,
    cancel_at_period_end: data.scheduledChange?.action === 'cancel', updated_at: new Date().toISOString(),
  }).eq('paddle_subscription_id', data.id).eq('environment', env);
}

async function onCanceled(data: any, env: PaddleEnv) {
  await (await db()).from('subscriptions').update({ status: 'canceled', updated_at: new Date().toISOString() }).eq('paddle_subscription_id', data.id).eq('environment', env);
}

export const Route = createFileRoute('/api/public/payments/webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = (new URL(request.url).searchParams.get('env') === 'live' ? 'live' : 'sandbox') as PaddleEnv;
        try {
          const event = await verifyWebhook(request, env);
          if (event.eventType === EventName.SubscriptionCreated) await onCreated(event.data, env);
          else if (event.eventType === EventName.SubscriptionUpdated) await onUpdated(event.data, env);
          else if (event.eventType === EventName.SubscriptionCanceled) await onCanceled(event.data, env);
          return Response.json({ received: true });
        } catch (e) {
          console.error('Webhook error:', e);
          return new Response('Webhook error', { status: 400 });
        }
      },
    },
  },
});
