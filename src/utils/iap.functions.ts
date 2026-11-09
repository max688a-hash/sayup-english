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
    const { applyVerifiedTransaction } = await import("@/lib/apple-purchase.server");
    await applyVerifiedTransaction(userId, tx);
    return { status, productId: tx.productId, expiresAt: tx.expiresDate ?? null };
  });
