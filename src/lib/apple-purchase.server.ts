// Server-only: applies Apple-verified purchase data to the unified ledger.
// Shared by the authenticated app report (recordAppleSubscription) and the
// public App Store Server Notifications V2 endpoint.
import { IAP_BUNDLE_ID } from '@/lib/iap';
import { subscriptionStatus, verifyAppleJws, verifyAppleTransactionJws, type AppleNotification, type AppleTransaction } from '@/lib/apple-iap.server';

const env = (t?: string) => (t === 'Production' ? 'live' : 'sandbox');
const iso = (ms?: number) => (ms ? new Date(ms).toISOString() : null);
const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function admin() {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  return supabaseAdmin;
}

// Persists a verified transaction: subscription row (source of truth for the
// current period) + an immutable membership_periods row (drives reward months)
// + defers remaining point-grant days behind the new paid coverage.
export async function applyVerifiedTransaction(userId: string, tx: AppleTransaction) {
  const supabaseAdmin = await admin();
  const { error } = await supabaseAdmin.from('subscriptions').upsert({
    user_id: userId,
    paddle_subscription_id: `apple:${tx.originalTransactionId}`,
    paddle_customer_id: `apple:${tx.appAccountToken ?? userId}`,
    product_id: tx.productId,
    price_id: tx.productId,
    status: subscriptionStatus(tx),
    current_period_start: iso(tx.purchaseDate),
    current_period_end: iso(tx.expiresDate),
    cancel_at_period_end: false,
    environment: env(tx.environment),
    updated_at: new Date().toISOString(),
  }, { onConflict: 'paddle_subscription_id' });
  if (error) throw error;

  if (tx.expiresDate) {
    const { error: pErr } = await supabaseAdmin.from('membership_periods').upsert({
      user_id: userId,
      original_transaction_id: tx.originalTransactionId,
      period_start: new Date(tx.purchaseDate).toISOString(),
      period_end: new Date(tx.expiresDate).toISOString(),
      environment: env(tx.environment),
    }, { onConflict: 'user_id,original_transaction_id,period_start', ignoreDuplicates: true });
    if (pErr) throw pErr;
    const { error: dErr } = await supabaseAdmin.rpc('defer_point_grants', { _uid: userId });
    if (dErr) throw dErr;
  }
}

// Resolves the learner account for a transaction: appAccountToken carries the
// user id for app purchases; falls back to the stored apple:origTxId row.
export async function userIdForTransaction(tx: AppleTransaction): Promise<string | null> {
  if (tx.appAccountToken && uuidRe.test(tx.appAccountToken)) return tx.appAccountToken;
  const supabaseAdmin = await admin();
  const { data } = await supabaseAdmin.from('subscriptions')
    .select('user_id').eq('paddle_subscription_id', `apple:${tx.originalTransactionId}`).maybeSingle();
  return (data?.user_id as string | undefined) ?? null;
}

async function setSubscriptionFlag(origTxId: string, patch: Record<string, unknown>, signedDate?: number) {
  const supabaseAdmin = await admin();
  const when = iso(signedDate) ?? new Date().toISOString();
  const { data: row } = await supabaseAdmin.from('subscriptions')
    .select('last_event_at').eq('paddle_subscription_id', `apple:${origTxId}`).maybeSingle();
  if (row?.last_event_at && new Date(row.last_event_at as string).getTime() > new Date(when).getTime()) return 'stale';
  const { error } = await supabaseAdmin.from('subscriptions')
    .update({ ...patch, last_event_at: when, updated_at: new Date().toISOString() })
    .eq('paddle_subscription_id', `apple:${origTxId}`);
  if (error) throw error;
  return 'applied';
}

// Claims + dispatches one verified notification envelope. Idempotent on
// notificationUUID; stale events (signedDate older than the last applied one)
// are recorded but do not regress state.
export async function applyAppleNotification(n: AppleNotification) {
  const supabaseAdmin = await admin();
  if (n.data?.bundleId && n.data.bundleId !== IAP_BUNDLE_ID) return { status: 'ignored' };

  const { data: claimed } = await supabaseAdmin.from('apple_notification_events')
    .upsert({ notification_uuid: n.notificationUUID, notification_type: n.notificationType, subtype: n.subtype ?? null },
      { onConflict: 'notification_uuid', ignoreDuplicates: true }).select('notification_uuid');
  if (!claimed?.length) {
    const { data: existing } = await supabaseAdmin.from('apple_notification_events')
      .select('processed').eq('notification_uuid', n.notificationUUID).maybeSingle();
    return { status: existing?.processed ? 'duplicate' : 'reprocess' };
  }

  try {
    const tx = n.data?.signedTransactionInfo ? await verifyAppleTransactionJws(n.data.signedTransactionInfo) : null;
    if (!tx) return markDone(n.notificationUUID, 'recorded');
    const origTxId = tx.originalTransactionId;
    await supabaseAdmin.from('apple_notification_events')
      .update({ original_transaction_id: origTxId }).eq('notification_uuid', n.notificationUUID);

    const userId = await userIdForTransaction(tx);
    const t = n.notificationType;
    if (['SUBSCRIBED', 'DID_RENEW', 'OFFER_REDEEMED', 'RENEWAL_EXTENDED', 'RESUBSCRIBED'].includes(t)) {
      if (userId) await applyVerifiedTransaction(userId, tx);
    } else if (t === 'DID_CHANGE_RENEWAL_STATUS') {
      await setSubscriptionFlag(origTxId, { cancel_at_period_end: n.subtype === 'AUTO_RENEW_DISABLED' }, n.signedDate);
    } else if (t === 'DID_FAIL_TO_RENEW') {
      await setSubscriptionFlag(origTxId, { status: 'past_due' }, n.signedDate);
    } else if (['EXPIRED', 'GRACE_PERIOD_EXPIRED'].includes(t)) {
      await setSubscriptionFlag(origTxId, { status: 'canceled' }, n.signedDate);
    } else if (['REFUND', 'REVOKE'].includes(t)) {
      await setSubscriptionFlag(origTxId, { status: 'canceled', cancel_at_period_end: false }, n.signedDate);
      if (userId) {
        const lo = new Date(tx.purchaseDate - 3600_000).toISOString();
        const hi = new Date(tx.purchaseDate + 3600_000).toISOString();
        await supabaseAdmin.from('membership_periods').update({ revoked: true })
          .eq('user_id', userId).eq('original_transaction_id', origTxId)
          .gte('period_start', lo).lte('period_start', hi);
      }
    }
    return markDone(n.notificationUUID, 'applied', !userId);
  } catch (e) {
    await supabaseAdmin.from('apple_notification_events').delete().eq('notification_uuid', n.notificationUUID);
    throw e;
  }
}

async function markDone(uuid: string, status: string, unmapped = false) {
  const supabaseAdmin = await admin();
  await supabaseAdmin.from('apple_notification_events').update({ processed: true }).eq('notification_uuid', uuid);
  return { status, ...(unmapped ? { unmapped: true } : {}) };
}

// Entry point for POST /api/public/apple-purchase. Accepts either an app-side
// transaction report ({signedTransaction}) or an Apple server notification
// envelope ({signedPayload}).
export async function handleApplePurchasePost(body: { signedTransaction?: string; signedPayload?: string }) {
  if (typeof body?.signedTransaction === 'string' && body.signedTransaction.length > 32) {
    const tx = await verifyAppleTransactionJws(body.signedTransaction);
    const userId = await userIdForTransaction(tx);
    if (!userId) return { status: 'unmapped' };
    await applyVerifiedTransaction(userId, tx);
    return { status: 'ok', productId: tx.productId, expiresAt: tx.expiresDate ?? null };
  }
  if (typeof body?.signedPayload === 'string' && body.signedPayload.length > 32) {
    const env = (await verifyAppleJws(body.signedPayload)) as unknown as AppleNotification;
    if (!env.notificationUUID || !env.notificationType) return { status: 'invalid' };
    return applyAppleNotification(env);
  }
  return { status: 'invalid' };
}
