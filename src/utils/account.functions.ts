import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const USER_TABLES = ["learning_progress", "practice_records", "vocab_reviews", "reward_grants", "aid_applications", "subscriptions", "user_roles", "profiles"] as const;

// Self-service account deletion (App Store Guideline 5.1.1). Refuses while auto-renewal is still running so nobody is charged after deleting.
export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const uid = context.userId;
    const { data: subs } = await context.supabase.from("subscriptions").select("status,cancel_at_period_end").eq("user_id", uid);
    if ((subs ?? []).some(s => ["active", "trialing", "past_due"].includes(s.status) && !s.cancel_at_period_end)) return { ok: false as const, reason: "active_subscription" };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    for (const t of USER_TABLES) {
      const col = t === "profiles" ? "id" : "user_id";
      const { error } = await supabaseAdmin.from(t).delete().eq(col, uid);
      if (error && !/column/.test(error.message)) throw new Error("delete " + t + " failed");
    }
    const { error } = await supabaseAdmin.auth.admin.deleteUser(uid);
    if (error) throw new Error("delete user failed");
    return { ok: true as const };
  });
