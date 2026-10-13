import { createFileRoute } from "@tanstack/react-router";
import { SpeakingApp } from '@/components/speaking-app';
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: '声芽 SayUp · 英语口语练习，AI 纠正发音' },
    { name: 'description', content: '声芽 SayUp：12 周强攻开口说英语，AI 逐词纠正发音。坚持打卡 25 天免费送会员，贫困学生凭证全免。' },
    { property: 'og:title', content: '声芽 SayUp · 英语口语练习，AI 纠正发音' },
    { property: 'og:description', content: '12 周强攻开口说英语，AI 逐词纠音。坚持打卡送会员，贫困学生凭证全免。' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
function Index() {
  return <SpeakingApp />;
}
