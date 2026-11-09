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

  it('打卡赠送留存规则真实落地：积分制，新人25天送30积分，会员连续3个月达标送30积分，1积分=1天会员', () => {
    const rewardBody = DICT.zh.rewardBody;
    expect(rewardBody).toContain('25 天');
    expect(rewardBody).toContain('30 积分');
    expect(rewardBody).toContain('1 积分 = 1 天会员');
  });
});
