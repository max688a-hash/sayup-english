import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Paddle customer portal: lets the member cancel auto-renewal or update payment in one place.
export const openBillingPortal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: sub } = await context.supabase.from("subscriptions").select("paddle_customer_id, paddle_subscription_id, environment").eq("user_id", context.userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (!sub) throw new Error("no subscription");
    const { getPaddleClient } = await import("@/lib/paddle.server");
    const s = await getPaddleClient(sub.environment === "live" ? "live" : "sandbox").customerPortalSessions.create(sub.paddle_customer_id, [sub.paddle_subscription_id]);
    return { url: s.urls.subscriptions[0]?.cancelSubscription ?? s.urls.general.overview };
  });
