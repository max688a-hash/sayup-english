import { createFileRoute } from "@tanstack/react-router";
import { SpeakingApp } from '@/components/speaking-app';
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: '语芽英语口语 · 每天一点，自然开口' },
    { name: 'description', content: '体验语芽英语口语：情景对话、角色扮演、分级学习、词卡记忆与强化练习，支持儿童模式和英语朗读。' },
    { property: 'og:title', content: '语芽英语口语 · 每天一点，自然开口' },
    { property: 'og:description', content: '从熟悉的生活开始，练出自然的英语。在线体验五大学习栏目与儿童课程。' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
function Index() {
  return <SpeakingApp />;
}
