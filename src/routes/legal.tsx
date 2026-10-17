import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/legal')({
  head: () => ({
    meta: [
      { title: '隐私政策与服务条款 · 声芽 SayUp' },
      { name: 'description', content: '声芽 SayUp 英语口语练习的隐私政策、服务条款与自动续费说明。' },
      { property: 'og:title', content: '隐私政策与服务条款 · 声芽 SayUp' },
      { property: 'og:description', content: '声芽 SayUp 如何处理录音、学习进度与助学证件，以及会员与自动续费规则。' },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Legal,
});

const OPERATOR = '【运营主体：公司注册完成后填写】';
const EMAIL = 'huazhang06@gmail.com';
const DATE = '2026-10-16';

function Legal() {
  return <main className="mx-auto max-w-2xl px-5 py-10 space-y-6 text-sm leading-7 text-foreground">
    <Link to="/" className="text-primary">← 返回声芽</Link>
    <h1 className="text-2xl font-semibold">声芽 SayUp 隐私政策</h1>
    <p className="text-muted-foreground">运营方：{OPERATOR} · 联系邮箱：{EMAIL} · 生效日期：{DATE}</p>
    <section><h2 className="font-semibold">1. 我们收集什么</h2>
      <p>账号：注册邮箱与昵称。学习数据：练习完成记录、跟读评分结果、词汇复习进度、打卡天数。会员：订阅状态与支付平台返回的订单编号（我们不接触你的银行卡信息）。助学申请：姓名、学校、地区、学信网验证码及你上传的证件。</p></section>
    <section><h2 className="font-semibold">2. 录音如何处理</h2>
      <p>只有在你主动点击录音并同意后才使用麦克风。录音只用于转成文字并由 AI 给出发音与表达反馈，处理完即丢弃，不在服务器长期保存；回放只在你当前的浏览器里进行。</p></section>
    <section><h2 className="font-semibold">3. 助学证件</h2>
      <p>证件仅用于核实身份，存放在私密空间，只有审核员可查看。审核员查看 5 秒后自动永久删除；审核通过或驳回时也会立即删除，只保留姓名、学校和审核结果。</p></section>
    <section><h2 className="font-semibold">4. 第三方服务</h2>
      <p>语音转写与 AI 反馈由人工智能服务处理；支付由第三方支付平台处理；免费在线资源仅提供外部链接，打开后受对方网站政策约束，部分在你所在地区可能无法访问。</p></section>
    <section><h2 className="font-semibold">5. 你的权利</h2>
      <p>你可以随时查看、导出或删除学习数据，注销账号；联系上述邮箱，我们会在 15 个工作日内处理。</p></section>
    <section><h2 className="font-semibold">6. 未成年人</h2>
      <p>声芽面向年满 18 周岁的用户。未满 18 周岁的用户须经监护人同意并在其监督下使用；未满 14 周岁的儿童，须由监护人本人注册并同意本政策。我们不主动收集未成年人的身份证件、家庭经济状况、人脸等敏感个人信息，助学申请不接受未满 14 周岁儿童本人提交。如发现未经监护人同意收集了儿童信息，我们会及时删除；监护人可通过上述邮箱要求查阅或删除。</p></section>
    <section><h2 className="font-semibold">7. 机构合作与兑换码</h2>
      <p>合作学校或公益机构自行确认受助学生资格并发放一次性兑换码，声芽只记录兑换码是否已使用及会员时长，不接收、不保存学生的困难证明或名单材料。</p></section>

    <h1 className="text-2xl font-semibold pt-4">服务条款</h1>
    <section><h2 className="font-semibold">1. 服务内容</h2>
      <p>声芽提供英语口语练习、AI 发音反馈与学习内容。学习效果因人而异，取决于练习时长与投入，我们不承诺任何学习结果或考试成绩。</p></section>
    <section><h2 className="font-semibold">2. 会员与自动续费</h2>
      <p>会员按月、季或年订阅，到期自动续费。续费前会在应用内提醒扣费日期与金额；你可随时在「我的账号」中取消，取消后当期仍可使用至到期。打卡奖励（如连续达标赠送月份）以应用内公布的规则为准。</p></section>
    <section><h2 className="font-semibold">3. 助学名额</h2>
      <p>助学名额需凭有效证明审核，通过后需每月按规则打卡续期；提供虚假材料将取消名额。</p></section>
    <section><h2 className="font-semibold">4. 使用规范与知识产权</h2>
      <p>请勿利用本服务从事违法活动或干扰系统。应用内课程、对话与例句由声芽原创或合法授权，未经许可不得复制用于商业用途。</p></section>
    <section><h2 className="font-semibold">5. 适用法律</h2>
      <p>本条款适用中华人民共和国法律。争议应先友好协商，协商不成的，提交运营方所在地有管辖权的人民法院解决。</p></section>
  </main>;
}
