import { createFileRoute, Link } from '@tanstack/react-router';
import { REWARD_RULES as R } from '@/lib/reward-rules';

export const Route = createFileRoute('/legal')({
  head: () => ({
    meta: [
      { title: '隐私政策与服务条款 · 声芽 SayUp' },
      { name: 'description', content: '声芽 SayUp 英语口语练习的隐私政策、服务条款与自动续费说明。' },
      { property: 'og:title', content: '隐私政策与服务条款 · 声芽 SayUp' },
      { property: 'og:description', content: '声芽 SayUp 如何处理录音与学习进度，以及会员与自动续费规则。' },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Legal,
});

const OPERATOR = '【运营主体：公司注册完成后填写】';
const EMAIL = 'huazhang06@gmail.com';
const DATE = '2026-11-10';

function Legal() {
  return <main className="mx-auto max-w-2xl px-5 py-10 space-y-6 text-sm leading-7 text-foreground">
    <Link to="/" className="text-primary">← 返回声芽</Link>
    <h1 className="text-2xl font-semibold">声芽 SayUp 隐私政策</h1>
    <p className="text-muted-foreground">运营方：{OPERATOR} · 联系邮箱：{EMAIL} · 生效日期：{DATE}</p>
    <section><h2 className="font-semibold">1. 我们收集什么</h2>
      <p>账号：注册邮箱与昵称。学习数据：练习完成记录、跟读评分结果、词汇复习进度、打卡天数。会员：订阅状态与支付平台返回的订单编号（我们不接触你的银行卡信息）。除此以外，我们不收集姓名、证件、学校、家庭经济状况、人脸等任何其他个人信息。</p></section>
    <section><h2 className="font-semibold">2. 录音如何处理</h2>
      <p>只有在你主动点击录音并同意后才使用麦克风。录音只用于转成文字并由 AI 给出发音与表达反馈，处理完即丢弃，不在服务器长期保存；回放只在你当前的浏览器里进行。</p></section>
    <section><h2 className="font-semibold">3. 第三方服务</h2>
      <p>语音转写与 AI 反馈由人工智能服务处理；支付由第三方支付平台处理；免费在线资源仅提供外部链接，打开后受对方网站政策约束，部分在你所在地区可能无法访问。</p></section>
    <section><h2 className="font-semibold">4. 你的权利</h2>
      <p>你可以随时查看、导出学习数据，并在「我的账号 → 注销账号」中自助永久删除账号及全部学习记录，立即生效、无法恢复。如有自动续费，请先取消续费再注销。其他问题可联系上述邮箱，我们会在 15 个工作日内处理。</p></section>
    <section><h2 className="font-semibold">5. 未成年人</h2>
      <p>声芽面向年满 18 周岁的用户。未满 18 周岁的用户须经监护人同意并在其监督下使用；未满 14 周岁的儿童，须由监护人本人注册并同意本政策。我们不收集任何人的身份证件、家庭经济状况、人脸等敏感个人信息。如发现未经监护人同意收集了儿童信息，我们会及时删除；监护人可通过上述邮箱要求查阅或删除。</p></section>

    <h1 className="text-2xl font-semibold pt-4">服务条款</h1>
    <section><h2 className="font-semibold">1. 服务内容</h2>
      <p>声芽提供英语口语练习、AI 发音反馈与学习内容。学习效果因人而异，取决于练习时长与投入，我们不承诺任何学习结果或考试成绩。</p></section>
    <section><h2 className="font-semibold">2. 会员与自动续费</h2>
      <p>会员按月、季或年订阅，到期自动续费。如通过苹果 App Store 订阅，费用将在确认购买后从您的 Apple ID 账户扣除，且到期前 24 小时自动续订并扣款。用户可在 iOS 设备「系统设置 - Apple ID - 订阅」中随时管理或取消自动续订。取消后当期仍可使用至到期。</p></section>
    <section><h2 className="font-semibold">3. 打卡与邀请奖励</h2>
      <p>有效打卡：当天至少完成 {R.checkinRecordingsPerDay} 次有评分的真实录音练习。</p>
      <p>新人挑战：注册后 {R.newcomerWindowDays} 天内有效打卡满 {R.newcomerCheckinDays} 天，送 {R.newcomerRewardDays} 天会员，每个账号限一次；练习免费试学内容也计入。</p>
      <p>会员月度奖励：每个已付费的会员月（按订阅周期计算）内有效打卡满 {R.monthlyCheckinDays} 天，送 {R.monthlyRewardDays} 天会员。赠送的天数不算付费月，期间打卡不再产生奖励；停止续费后，最后一个达标付费月的奖励发放完即结束。</p>
      <p>邀请好友：好友注册后 {R.referralApplyWithinDays} 天内填写你的邀请码，且好友付费会员满 {R.referralPaidHoldDays} 天后，送你 {R.referralRewardDays} 天会员；只奖励直接邀请人，每人每年最多 {R.referralMaxPerYear} 次。</p>
      <p>奖励天数自动到账，排在当前会员到期之后接续使用。赠送天数不可提现、不可转让，不抵扣、不暂停苹果订阅扣费；自动续费由苹果管理，停止续费须在苹果订阅设置中操作。发现刷号、伪造录音等作弊行为的，我们有权取消相应奖励。</p></section>
    <section><h2 className="font-semibold">4. 使用规范与知识产权</h2>
      <p>请勿利用本服务从事违法活动或干扰系统。应用内课程、对话与例句由声芽原创或合法授权，未经许可不得复制用于商业用途。</p></section>
    <section><h2 className="font-semibold">5. 适用法律</h2>
      <p>本条款适用中华人民共和国法律。争议应先友好协商，协商不成的，提交运营方所在地有管辖权的人民法院解决。</p></section>
  </main>;
}
