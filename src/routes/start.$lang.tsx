import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SpeakingApp } from '@/components/speaking-app';
import logoImage from '@/assets/logo-small.png';

const COPY = {
  vi: {
    title: 'SayUp · Luyện nói tiếng Anh, AI sửa phát âm',
    desc: 'Lộ trình 12 tuần để tự tin nói tiếng Anh. AI sửa từng từ bạn phát âm sai. Đăng ký miễn phí, học ngay 2 tuần đầu.',
    h1: 'Học 10 năm mà vẫn ngại nói tiếng Anh?',
    sub: 'SayUp giúp bạn mở miệng nói mỗi ngày. Đọc to một câu, AI chỉ ra ngay từ nào sai và cách sửa.',
    points: ['Lộ trình 12 tuần: từ chào hỏi đến họp và trình bày ý kiến', 'AI nghe bản ghi âm thật của bạn và sửa từng từ', 'Luyện các âm người Việt hay nhầm: th, sh, âm cuối', 'Điểm danh đủ 25 ngày trong 30 ngày đầu: tặng 1 tháng hội viên'],
    cta: 'Bắt đầu học miễn phí', note: 'Miễn phí 2 tuần đầu · Không cần thẻ',
  },
  ja: {
    title: 'SayUp · 英会話スピーキング練習、AIが発音を添削',
    desc: '12週間で英語を話せるようになるプログラム。AIがあなたの発音を単語ごとに添削。最初の2週間は無料。',
    h1: '何年も勉強したのに、英語が口から出てこない？',
    sub: 'SayUpは毎日「声に出す」ための英会話アプリ。一文読むだけで、AIが間違えた単語と直し方をすぐ教えます。',
    points: ['12週間コース：自己紹介から会議での発言まで', 'AIが実際の録音を聞いて単語ごとに添削', 'L/R、TH、V/Bなど日本人が苦手な音を集中練習', '最初の30日で25日練習すれば1か月分の会員を無料プレゼント'],
    cta: '無料で学習を始める', note: '最初の2週間無料 · カード登録不要',
  },
} as const;
type L = keyof typeof COPY;

export const Route = createFileRoute("/start/$lang")({
  loader: ({ params }) => { if (!(params.lang in COPY)) throw notFound(); return { lang: params.lang as L }; },
  head: ({ params }) => {
    const c = COPY[(params.lang in COPY ? params.lang : 'vi') as L];
    return { meta: [
      { title: c.title }, { name: 'description', content: c.desc },
      { property: 'og:title', content: c.title }, { property: 'og:description', content: c.desc },
      { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
    ] };
  },
  component: Landing,
});

function Landing() {
  const { lang } = Route.useLoaderData();
  const c = COPY[lang];
  const [enter, setEnter] = useState(false);
  if (enter) return <SpeakingApp initialLang={lang} initialTab={'学习'} />;
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-10">
      <div className="max-w-md w-full space-y-6">
        <div className="flex items-center gap-2"><img src={logoImage} alt="SayUp" width={36} height={36} /><span className="font-bold text-lg">SayUp</span></div>
        <h1 className="text-3xl font-bold leading-tight">{c.h1}</h1>
        <p className="text-muted-foreground">{c.sub}</p>
        <ul className="space-y-3">{c.points.map(p => <li key={p} className="flex gap-2 rounded-lg border border-border bg-card p-3 text-sm"><span className="text-primary">✓</span>{p}</li>)}</ul>
        <button type="button" onClick={() => { setEnter(true); window.scrollTo(0, 0); }} className="w-full rounded-full bg-primary text-primary-foreground py-4 font-semibold text-lg">{c.cta}</button>
        <p className="text-center text-xs text-muted-foreground">{c.note}</p>
      </div>
    </main>
  );
}
