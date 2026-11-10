// Lightweight navigation metadata; lesson data loads only when opened.
export type LibKind = 'scenes' | 'patterns' | 'repeat' | 'cloze' | 'free' | 'reading' | 'words' | 'bots' | 'phrases' | 'beats';
export const LIB_ENTRIES: { kind: LibKind; title: string; sub: string; icon: string }[] = [
  { kind: 'scenes', icon: '🏙️', title: '生活场景 · 角色对话', sub: '21 个场景任务 · 103 段对话逐句开口' },
  { kind: 'phrases', icon: '🧱', title: '场景短语块', sub: '50 组 · 寒暄、职场、流利度表达' },
  { kind: 'patterns', icon: '🧩', title: '句型家族', sub: '19 个骨架 · 换词造句' },
  // 跟读复述与节拍连读已并入「口语训练营」（speaking-gym.tsx），这里不再单列。
  { kind: 'reading', icon: '📖', title: '分级阅读', sub: '40 篇 A1–C1 · 生词一键加入复习' },
  { kind: 'cloze', icon: '📝', title: '完形填空小测', sub: '30 篇 · 交卷看对错再朗读' },
  { kind: 'free', icon: '🎤', title: '自由开口 · 话题演讲', sub: '39 道开放题 · AI 评切题与用词' },
  { kind: 'words', icon: '🧸', title: '主题单词组 · 看图识词', sub: '119 组 · 儿童看图到 C1 句中填词' },
  { kind: 'bots', icon: '🤖', title: 'AI 陪练角色', sub: '8 个角色 · 按你的回答走不同剧情' },
];
