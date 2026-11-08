import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Stores an Apple-verified subscription on the learner's account so every device
// (web / iPad / iPhone) resolves membership from the same `subscriptions` table.
export const recordAppleSubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: { jws: string }) => {
    if (!d || typeof d.jws !== "string" || d.jws.length < 32 || d.jws.length > 20000) throw new Error("jws required");
    return { jws: d.jws };
  })
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { verifyAppleTransactionJws, subscriptionStatus } = await import("@/lib/apple-iap.server");
    const tx = await verifyAppleTransactionJws(data.jws);
    const status = subscriptionStatus(tx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("subscriptions").upsert({
      user_id: userId,
      paddle_subscription_id: `apple:${tx.originalTransactionId}`,
      paddle_customer_id: `apple:${tx.appAccountToken ?? userId}`,
      product_id: tx.productId,
      price_id: tx.productId,
      status,
      current_period_start: new Date(tx.purchaseDate).toISOString(),
      current_period_end: tx.expiresDate ? new Date(tx.expiresDate).toISOString() : null,
      cancel_at_period_end: false,
      environment: tx.environment === "Production" ? "live" : "sandbox",
      updated_at: new Date().toISOString(),
    }, { onConflict: "paddle_subscription_id" });
    if (error) throw error;
    return { status, productId: tx.productId, expiresAt: tx.expiresDate ?? null };
  });
