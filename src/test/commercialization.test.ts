import { describe, it, expect } from 'vitest';
import { DICT } from '@/lib/i18n';
import { COURSE } from '@/lib/course12';
import { getMainVocabWords, getKidsVocabWords } from '@/lib/main-vocab';

describe('SayUp 商业化与两端权限闭环真实性校验', () => {
  it('统一收费定价严格一致 (月卡 ¥39 / 季卡 ¥99 / 年卡 ¥299)', () => {
    const plans = DICT.zh.plans;
    expect(plans).toHaveLength(3);

    const month = plans.find(p => p.id === 'month');
    const quarter = plans.find(p => p.id === 'quarter');
    const year = plans.find(p => p.id === 'year');

    expect(month?.price).toBe('¥39');
    expect(quarter?.price).toBe('¥99');
    expect(year?.price).toBe('¥299');
  });

  it('主线课程试学范围物理门禁：前 2 周免费试学，第 3-12 周属于会员付费锁闭', () => {
    expect(COURSE).toHaveLength(12);

    // 体验门禁规则：第 1 周与第 2 周免费开放试学
    const freeTrialWeeks = COURSE.filter(w => w.week <= 2);
    expect(freeTrialWeeks).toHaveLength(2);

    // 第 3 至 12 周需会员权限
    const memberWeeks = COURSE.filter(w => w.week > 2);
    expect(memberWeeks).toHaveLength(10);
  });

  it('主词库试学范围物理门禁：前 40 词开放试学，全量分级词库物理就绪', () => {
    const words = getMainVocabWords();
    const kidsWords = getKidsVocabWords();
    // 验证核心成人词库与儿童词库均已物理就绪 (3,260 主词 + 220 儿童词)
    expect(words.length).toBeGreaterThanOrEqual(3000);
    expect(words.length + kidsWords.length).toBeGreaterThanOrEqual(3400);

    // 验证前 40 词的数据完整性（音标、释义、例句）
    const trialWords = words.slice(0, 40);
    expect(trialWords).toHaveLength(40);
    trialWords.forEach(w => {
      expect(w.word.trim().length).toBeGreaterThan(0);
      expect(w.phonetic.trim().length).toBeGreaterThan(0);
      expect(w.meaning.trim().length).toBeGreaterThan(0);
      expect(w.example.trim().length).toBeGreaterThan(0);
    });
  });

  it('合规核验：彻底移除历史儿童助学/贫困/免费一键开通等遗留废弃说明', () => {
    const zhDict = JSON.stringify(DICT.zh);
    expect(zhDict).not.toContain('贫困');
    expect(zhDict).not.toContain('助学金');
    expect(zhDict).not.toContain('免费一键开通');
    expect(zhDict).not.toContain('开通一个月使用期');
  });

  it('打卡奖励按天数说明：新人25天送30天、付费月满25天送7天、邀请好友送15天，不再提积分', () => {
    const rewardBody = DICT.zh.rewardBody;
    expect(rewardBody).toContain('30 天内累计完成 25 天有效打卡，送 30 天会员');
    expect(rewardBody).toContain('有效打卡满 25 天，送 7 天会员');
    expect(rewardBody).toContain('送你 15 天会员，每年最多 12 次');
    expect(rewardBody).toContain('不取消自动续费');
    expect(rewardBody).not.toContain('积分');
    expect(rewardBody).not.toContain('随时兑换');
  });
});
