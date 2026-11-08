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
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const next = new Date();
    next.setMonth(next.getMonth() + 1);
    await supabaseAdmin.from("reward_grants").update({ billing_applied_at: new Date().toISOString(), billing_note: `streak reward applied -> ${next.toISOString()}` }).eq("id", grant.id).eq("user_id", userId);
    return { status: "applied" as const, nextBilledAt: next.toISOString() };
  });
