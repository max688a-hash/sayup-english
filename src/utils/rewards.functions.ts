import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Turns an earned "streak" reward into a real skipped charge: the paid subscription's
// next billing date moves forward one month with no proration charge.
export const applyStreakBilling = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: grant } = await supabase.from("reward_grants").select("id").eq("user_id", userId).eq("kind", "streak").is("billing_applied_at", null).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (!grant) return { status: "none" as const };
    const { data: sub } = await supabase.from("subscriptions").select("paddle_subscription_id, environment, status").eq("user_id", userId).in("status", ["active", "trialing"]).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (!sub) return { status: "no_subscription" as const };
    const { gatewayFetch } = await import("@/lib/paddle.server");
    const env = sub.environment === "live" ? "live" : "sandbox";
    const getRes = await gatewayFetch(env, `/subscriptions/${sub.paddle_subscription_id}`);
    if (!getRes.ok) { console.error("paddle get", getRes.status, await getRes.text()); return { status: "error" as const }; }
    const cur = (await getRes.json()).data;
    if (!cur?.next_billed_at) return { status: "error" as const };
    const next = new Date(cur.next_billed_at);
    next.setMonth(next.getMonth() + 1);
    const patch = await gatewayFetch(env, `/subscriptions/${sub.paddle_subscription_id}`, { method: "PATCH", body: JSON.stringify({ next_billed_at: next.toISOString(), proration_billing_mode: "do_not_bill" }) });
    if (!patch.ok) { const t = await patch.text(); console.error("paddle patch", patch.status, t); return { status: "error" as const }; }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("reward_grants").update({ billing_applied_at: new Date().toISOString(), billing_note: `next_billed_at ${cur.next_billed_at} -> ${next.toISOString()}` }).eq("id", grant.id).eq("user_id", userId);
    return { status: "applied" as const, nextBilledAt: next.toISOString() };
  });
