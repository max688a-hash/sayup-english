// Learner-facing reward rules. The database (claim_reward_days / apply_referral_code)
// enforces the same numbers; keep both in sync.
export const REWARD_RULES = {
  checkinRecordingsPerDay: 3,
  newcomerWindowDays: 30,
  newcomerCheckinDays: 25,
  newcomerRewardDays: 30,
  monthlyCheckinDays: 25,
  monthlyRewardDays: 7,
  referralApplyWithinDays: 7,
  referralPaidHoldDays: 7,
  referralRewardDays: 15,
  referralMaxPerYear: 12,
} as const;
export const SHARE_BASE_URL = 'https://app.orikstudio.com';
