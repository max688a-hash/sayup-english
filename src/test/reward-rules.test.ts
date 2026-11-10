import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { REWARD_RULES } from '@/lib/reward-rules';

// The database function enforces the rules; these checks keep its numbers equal to the agreed rules.
const sql = readFileSync('drizzle/migrations/0012_reward_days_and_referrals.sql', 'utf8');

describe('打卡与邀请奖励规则', () => {
  it('新人：注册 30 天内打卡满 25 天送 30 天，每账号一次', () => {
    expect(REWARD_RULES).toMatchObject({ newcomerWindowDays: 30, newcomerCheckinDays: 25, newcomerRewardDays: 30 });
    expect(sql).toContain("public.checkin_day_count(uid, joined, joined + interval '30 days') >= 25");
    expect(sql).toContain("public.grant_reward_days(uid, 'newcomer', 'first', 30)");
  });
  it('付费会员：每个付费月打卡满 25 天送 7 天，只按付费时段计算', () => {
    expect(REWARD_RULES).toMatchObject({ monthlyCheckinDays: 25, monthlyRewardDays: 7 });
    expect(sql).toContain("FROM public.membership_periods\n           WHERE user_id = uid AND NOT revoked");
    expect(sql).toContain("public.checkin_day_count(uid, w, w + interval '1 month') >= 25");
    expect(sql).toMatch(/grant_reward_days\(uid, 'monthly', .*, 7\)/);
  });
  it('邀请：好友注册 7 天内填码、付费满 7 天，邀请人得 15 天，每年最多 12 次', () => {
    expect(REWARD_RULES).toMatchObject({ referralApplyWithinDays: 7, referralPaidHoldDays: 7, referralRewardDays: 15, referralMaxPerYear: 12 });
    expect(sql).toContain("joined < now() - interval '7 days' THEN RETURN 'expired'");
    expect(sql).toContain("period_start <= now() - interval '7 days'");
    expect(sql).toContain("public.grant_reward_days(uid, 'referral', r.invitee_id::text, 15)");
    expect(sql).toContain("created_at > now() - interval '365 days') >= 12");
  });
  it('每天至少 3 次有评分的录音才算打卡', () => {
    expect(REWARD_RULES.checkinRecordingsPerDay).toBe(3);
    expect(sql).toContain('GROUP BY 1 HAVING count(*) >= 3');
  });
});
