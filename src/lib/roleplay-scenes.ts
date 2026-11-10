// 把角色扮演对话库（ROLE_PLAY_DIALOGUES，50 段真实场景对话，逐句带中文）
// 适配成「对话」tab 使用的 Scene 结构：机器人回合 / 用户回合交替推进。
import { ROLE_PLAY_DIALOGUES } from './advanced/rolePlayDialogues';
import type { Scene } from './speaking-content';

type RawTurn = { speaker: string; text: string; zh?: string };
type RawDialogue = {
  id: string; level: string; title: string; titleZh?: string; icon?: string;
  scene?: string; userRole?: string; botRole?: string; turns: RawTurn[];
};

const CATEGORY_RULES: [RegExp, string][] = [
  [/机场|飞机|航班|出租|酒店|旅行|地图|街|公交|地铁|搬家|海关|签证/i, '旅行出行'],
  [/面试|商务|谈判|薪资|项目|汇报|技术|媒体|采访|法律|保险|创业|调解|办公室|会议|职场|家长/i, '职场交流'],
];
function categoryOf(d: RawDialogue): string {
  const text = `${d.scene ?? ''}${d.title ?? ''}${d.titleZh ?? ''}`;
  for (const [re, cat] of CATEGORY_RULES) if (re.test(text)) return cat;
  return '日常生活';
}
function iconOf(d: RawDialogue, category: string): Scene['icon'] {
  if (category === '旅行出行') return 'plane';
  if (category === '职场交流') return 'briefcase';
  if (/购|买|店|市|衣服|理发|退货/i.test(`${d.scene ?? ''}${d.titleZh ?? ''}`)) return 'shopping';
  return 'coffee';
}

const USER_FIRST_OPENER = { text: 'Hello! How can I help you today?', zh: '你好！有什么可以帮你的吗？' };
const CLOSING = { text: 'Lovely talking to you. Have a wonderful day!', zh: '和你聊天很开心。祝你有美好的一天！' };

function toScene(d: RawDialogue): Scene | null {
  const turns = [...d.turns];
  // 用户先开口的对话：前置一句自然的对方开场白，保证机器人先行的回合模型
  if (turns[0] && turns[0].speaker !== 'bot') turns.unshift(USER_FIRST_OPENER as RawTurn);
  const bot: RawTurn[] = [];
  const user: RawTurn[] = [];
  for (const t of turns) (t.speaker === 'bot' ? bot : user).push(t);
  if (!bot.length || !user.length) return null;
  const zh: Record<string, string> = {};
  for (const t of turns) if (t.zh) zh[t.text] = t.zh;
  zh[CLOSING.text] = CLOSING.zh!;
  return {
    id: `rp-${d.id}`,
    title: d.titleZh ?? d.title,
    english: `${d.scene ? d.scene + ' · ' : ''}${d.userRole ?? '你'} × ${d.botRole ?? '对方'}`,
    category: categoryOf(d),
    icon: iconOf(d, categoryOf(d)),
    level: (d.level || 'a1').toUpperCase(),
    turns: bot.map(t => t.text),
    replies: user.map(t => t.text),
    options: user.map(t => [t.text, t.text] as [string, string]),
    tips: user.map(() => ''),
    zh,
  };
}

const converted = (ROLE_PLAY_DIALOGUES as unknown as RawDialogue[])
  .map(toScene)
  .filter((s): s is Scene => s !== null);

export const rolePlayScenes: Scene[] = converted;
