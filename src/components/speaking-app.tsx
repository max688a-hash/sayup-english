import uiGarden from '@/assets/ui-garden.jpg';
import uiMistakes from '@/assets/ui-mistakes.jpg';
import { tr, trn } from '@/lib/tr';
import { speakCloud, stopCloudSpeech, playExclusiveAudio } from '@/lib/cloud-speech';
import { setContentLang } from '@/lib/tr';
import { useEffect, useRef, useState, type ReactNode, type UIEvent, type TouchEvent } from 'react';
import { ClickableSentence } from '@/components/clickable-sentence';
import { DictionarySheet } from '@/components/dictionary-sheet';
import { ArrowLeft, ArrowRight, AudioLines, BookOpen, Check, CheckCheck, ChevronRight, Coffee, Flame, GraduationCap, Headphones, Leaf, Maximize2, MessageCircle, Mic, Minimize2, MoreHorizontal, Plane, RotateCcw, ShoppingBag, Sparkles, Target, Volume2, X, Zap, Briefcase, Users, Signal, Wifi, BatteryFull, Sun, Moon, Star, CircleHelp, Turtle, Gauge, Cat, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpeechCoach, type PracticeRecord } from '@/components/speech-coach';
import { AdvancedHub, type AdvModule } from '@/components/advanced-hub';
import { PlacementTest, StoryReader } from '@/components/story-hub';
import { CourseHub } from '@/components/course-hub';
import { VocabReview } from '@/components/vocab-review';
import { Library, LIB_ENTRIES, type LibKind } from '@/components/library';
import { LearningResults } from '@/components/learning-results';
import { CheckinCalendar } from '@/components/checkin-calendar';
import { PronLab } from '@/components/pron-lab';
import { MistakeBook, ChunkDrill } from '@/components/review-tools';
import { StressDrill, ShadowDrill, ImmersionDrill } from '@/components/speaking-drills';
import { SpeakingGym } from '@/components/speaking-gym';
import { FreeChat } from '@/components/free-chat';
import { DailyExchange } from '@/components/daily-exchange';
import { TodayPlan } from '@/components/today-plan';
import { SubscribeDialog } from '@/components/membership';
import { DICT, LANGS, type Lang } from '@/lib/i18n';
import { AuthDialog, AccountSheet } from '@/components/account';
import { useAuth } from '@/hooks/use-auth';
import { useMemberVoice } from '@/hooks/use-member-voice';
import { supabase } from '@/integrations/supabase/client';
import { Lock, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scenes, kidScene, toyScene, kidCategories, words, kidWords, type Scene, type Tab } from '@/lib/speaking-content';
import { getMainVocabWords, getKidsVocabWords } from '@/lib/main-vocab';
import {
  loadKnownWords,
  saveKnownWords,
  loadLocalRecords,
  saveLocalRecords,
  updateGuestMistake,
  calculateRealStats,
} from '@/lib/storage';
import cafeImage from '@/assets/cafe.jpg';
import logoImage from '@/assets/logo-small.png';
import kidsImage from '@/assets/kids-scene.jpg';
import w_coffee from '@/assets/words/coffee.jpg';
import w_please from '@/assets/words/please.jpg';
import w_delicious from '@/assets/words/delicious.jpg';
import w_recommend from '@/assets/words/recommend.jpg';
import w_cat from '@/assets/words/cat.jpg';
import w_apple from '@/assets/words/apple.jpg';
import w_happy from '@/assets/words/happy.jpg';
import w_sunshine from '@/assets/words/sunshine.jpg';
import w_menu from '@/assets/words/menu.jpg';
import w_ticket from '@/assets/words/ticket.jpg';
import w_passport from '@/assets/words/passport.jpg';
import w_colleague from '@/assets/words/colleague.jpg';
import w_dog from '@/assets/words/dog.jpg';
import w_ball from '@/assets/words/ball.jpg';
import w_banana from '@/assets/words/banana.jpg';
import w_flower from '@/assets/words/flower.jpg';
import w_milk from '@/assets/words/milk.jpg';
import w_water from '@/assets/words/water.jpg';
import w_bread from '@/assets/words/bread.jpg';
import w_egg from '@/assets/words/egg.jpg';
import w_rice from '@/assets/words/rice.jpg';
import w_tea from '@/assets/words/tea.jpg';
import w_juice from '@/assets/words/juice.jpg';
import w_bus from '@/assets/words/bus.jpg';
import w_car from '@/assets/words/car.jpg';
import w_train from '@/assets/words/train.jpg';
import w_plane from '@/assets/words/plane.jpg';
import w_bike from '@/assets/words/bike.jpg';
import w_phone from '@/assets/words/phone.jpg';
import w_book from '@/assets/words/book.jpg';
import w_pen from '@/assets/words/pen.jpg';
import w_bag from '@/assets/words/bag.jpg';
import w_shoes from '@/assets/words/shoes.jpg';
import w_hat from '@/assets/words/hat.jpg';
import w_chair from '@/assets/words/chair.jpg';
import w_table from '@/assets/words/table.jpg';
import w_bed from '@/assets/words/bed.jpg';
import w_door from '@/assets/words/door.jpg';
import w_key from '@/assets/words/key.jpg';
import { isIosApp, isNativeApp } from '@/lib/platform';
import w_clock from '@/assets/words/clock.jpg';
const wordImages: Record<string, string> = { coffee: w_coffee, please: w_please, delicious: w_delicious, recommend: w_recommend, cat: w_cat, apple: w_apple, happy: w_happy, sunshine: w_sunshine, menu: w_menu, ticket: w_ticket, passport: w_passport, colleague: w_colleague, dog: w_dog, ball: w_ball, banana: w_banana, flower: w_flower, milk: w_milk, water: w_water, bread: w_bread, egg: w_egg, rice: w_rice, tea: w_tea, juice: w_juice, bus: w_bus, car: w_car, train: w_train, plane: w_plane, bike: w_bike, phone: w_phone, book: w_book, pen: w_pen, bag: w_bag, shoes: w_shoes, hat: w_hat, chair: w_chair, table: w_table, bed: w_bed, door: w_door, key: w_key, clock: w_clock };

const tabs: { name: Tab; icon: typeof MessageCircle }[] = [{ name: '对话', icon: MessageCircle }, { name: '角色', icon: Users }, { name: '学习', icon: GraduationCap }, { name: '词汇', icon: BookOpen }, { name: '加强', icon: Zap }];
const sceneIcons = { coffee: Coffee, plane: Plane, briefcase: Briefcase, shopping: ShoppingBag };

type SpeakSpeed = 'slow' | 'normal' | 'current';

const CORE_ENTRIES: Record<string, { title: string; sub: string; icon: ReactNode }> = {
  placement: { title: '入门水平测试', sub: '10 道题 · 约 3 分钟 · 推荐适合你的起点', icon: <ClipboardCheck size={22} /> },
  course: { title: '12 周主线课程', sub: '日常与职场英语 · A2 起步约 3 个月', icon: <GraduationCap size={22} /> },
  results: { title: '学习成果', sub: '真实跟读波形 · AI 评分趋势 · 打卡天数', icon: <AudioLines size={22} /> },
  checkin: { title: '打卡日历 · 送会员', sub: '每天 3 次真实跟读算打卡 · 满 25 天领奖励', icon: <Flame size={22} /> },
  mistakes: { title: '智能错题本', sub: '低于 60 分的句子自动收集 · 重练过关', icon: <ClipboardCheck size={22} /> },
  listen: { title: '听力训练', sub: 'A1–C1 分级听力 · 在线听力资源', icon: <Headphones size={22} /> },
  daily: { title: '每日交流', sub: '59 个真实生活场景 · A1–C1 · 听懂换说法再开口', icon: <MessageCircle size={22} /> },
  gym: { title: '口语训练营', sub: '看图拖拽 → 跟读 → 重音节奏 → 沉浸复述', icon: <AudioLines size={22} /> },
  pron: { title: '发音实验室', sub: '8 组易混音 · 对比听 · 智能纠正', icon: <AudioLines size={22} /> },
  chat: { title: 'AI 自由对话', sub: '选场景用英语聊天 · 说错了马上给更自然的说法', icon: <Sparkles size={22} /> },
  stories: { title: '故事阅读', sub: '34 篇分级小故事 · 读、跟读、问答、复述', icon: <BookOpen size={22} /> },
  'adv-mock': { title: '迷你模拟考 · 1–6 级', sub: '长篇听力 + 长篇阅读自动判分 · 估算你的等级', icon: <GraduationCap size={22} /> },
  'adv-listening': { title: '进阶学术听力', sub: '学科短讲 · 整段听 → 逐句精听 → 开口复述', icon: <Headphones size={22} /> },
  'adv-speaking': { title: '进阶口语话题', sub: '简短问答 · 话题独白 · 深入讨论 · 观点表达', icon: <Mic size={22} /> },
  records: { title: '我的录音记录', sub: '每次真实跟读的识别结果与待纠正点', icon: <Mic size={22} /> },
  'adv-reading': { title: '进阶学术阅读', sub: '判断 / 选择 / 填空 · 自动判分 + 解析', icon: <BookOpen size={22} /> },
  'adv-writing': { title: '进阶学术写作', sub: '议论文 / 看图写 · 框架 + 范文 + 自评', icon: <BookOpen size={22} /> },
  'adv-vocab': { title: '进阶学术词汇', sub: '高频学术词 · 学一个词立刻开口造句', icon: <BookOpen size={22} /> },
  vocab: { title: '词汇复习', sub: '主题词库 A1–C1 · 例句 + 真实语境 · 间隔复习', icon: <BookOpen size={22} /> },
  chunks: { title: '短语块 · 句型替换', sub: '27 组高频句型 · 换词开口说', icon: <AudioLines size={22} /> },
};
const LEARN_GROUPS: { title: string; short: string; icon: ReactNode; items: string[] }[] = [
  { title: '起步与计划', short: '起步', icon: <ClipboardCheck size={20} />, items: ['placement', 'course', 'checkin', 'results', 'mistakes', 'adv-mock'] },
  { title: '听力', short: '听力', icon: <Headphones size={20} />, items: ['listen', 'daily', 'scenes', 'adv-listening'] },
  { title: '口语', short: '口语', icon: <AudioLines size={20} />, items: ['gym', 'pron', 'free', 'chat', 'bots', 'adv-speaking', 'records'] },
  { title: '阅读与写作', short: '阅读', icon: <BookOpen size={20} />, items: ['stories', 'reading', 'cloze', 'adv-reading', 'adv-writing'] },
  { title: '词汇与句型', short: '词汇', icon: <BookOpen size={20} />, items: ['vocab', 'words', 'chunks', 'phrases', 'patterns', 'adv-vocab'] },
];

export function SpeakingApp({ initialLang, initialTab }: { initialLang?: Lang; initialTab?: Tab } = {}) {
  const [tab, setTab] = useState<Tab>(initialTab ?? '对话');
  const [kids, setKids] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [previewInfo, setPreviewInfo] = useState(false);
  const [category, setCategory] = useState('全部');
  const [learnGroup, setLearnGroup] = useState(1);
  const featuredScene = scenes[0] ?? kidScene;
  const childrenScenes: Scene[] = [kidScene, toyScene];
  const [scene, setScene] = useState<Scene | null>(null);
  const [rolePlay, setRolePlay] = useState(false);
  const [turn, setTurn] = useState(0);
  const [messages, setMessages] = useState<{ text: string; user: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(false);
  const [turnTip, setTurnTip] = useState('');
  const [lastReply, setLastReply] = useState('');
  const [attempts, setAttempts] = useState<{ turn: number; reply: string; tip: string }[]>([]);
  const [showReview, setShowReview] = useState(false);
  const [recording, setRecording] = useState(false);
  const [records, setRecords] = useState<PracticeRecord[]>(() => loadLocalRecords());
  const [notice, setNotice] = useState('');
  const [speaking, setSpeaking] = useState('');
  const [dialogDone, setDialogDone] = useState(false);
  const [rateMode, setRateMode] = useState<'slow' | 'normal'>('normal');
  const [learning, setLearning] = useState(-1);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [wordLevel, setWordLevel] = useState('全部');
  const [wordIndex, setWordIndex] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>(() => loadKnownWords(false));
  const [practice, setPractice] = useState<string | null>(null);
  const [advanced, setAdvanced] = useState<null | `adv-${AdvModule}` | 'listen' | 'stories' | 'placement' | 'course' | 'checkin' | 'results' | 'pron' | 'mistakes' | 'chunks' | 'chat' | 'stress' | 'shadow' | 'immerse' | 'gym' | 'daily' | 'vocab' | LibKind>(null);
  const [dailyId, setDailyId] = useState<string | undefined>(undefined);
  const [storyLevel, setStoryLevel] = useState<string | undefined>(undefined);
  const [lang, setLang] = useState<Lang>(initialLang ?? 'zh');
  setContentLang(lang);
  const [sheet, setSheet] = useState<null | 'sub' | 'aid' | 'auth' | 'account'>(null);
  const [authReason, setAuthReason] = useState('');
  const [authMode, setAuthMode] = useState<'in' | 'up'>('in');
  const [dictWord, setDictWord] = useState<string | null>(null);
  const [dictSentence, setDictSentence] = useState<string>('');
  const openDict = (w: string, s: string) => { setDictWord(w); setDictSentence(s); };
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      setRecords(loadLocalRecords());
    }
  }, [user?.id]);
  const { voice: coreVoice, member: isMember } = useMemberVoice(user?.id);
  const [pendingSheet, setPendingSheet] = useState<null | 'sub'>(null);
  useEffect(() => { if (user && pendingSheet) { setSheet(pendingSheet); setPendingSheet(null); } }, [user, pendingSheet]);
  function needLogin(next: 'sub') { setSheet('sub'); }
  function addRecord(r: PracticeRecord) {
    setRecords(old => {
      const next = [r, ...old].slice(0, 30);
      saveLocalRecords(next);
      return next;
    });
    updateGuestMistake(r.target, r.analysis.score, r.heard, r.analysis.issues[0]?.fix ?? null);
    if (user) {
      void supabase.from('practice_records').insert({
        id: r.id,
        user_id: user.id,
        target: r.target.slice(0, 500),
        heard: r.heard.slice(0, 500),
        score: r.analysis.score,
        main_issue: r.analysis.issues[0] ? `${r.analysis.issues[0].word} · ${r.analysis.issues[0].fix}`.slice(0, 300) : null
      });
    }
  }
  const t = DICT[lang];
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const [vocabPage, setVocabPage] = useState(1);
  const fullVocab = getMainVocabWords();
  const fullKidsVocab = getKidsVocabWords();
  const activeWords = (kids ? fullKidsVocab : fullVocab).filter(w => wordLevel === '全部' || w.level.toUpperCase() === wordLevel.toUpperCase());
  const currentWord = wordIndex === null ? null : activeWords[wordIndex];
  useEffect(() => { const q = new URLSearchParams(window.location.search); if (q.get('checkout') === 'success') { setNotice(tr("付款成功！会员身份通常几秒内生效，可在「我的账号」查看。")); window.history.replaceState(null, '', '/'); } }, []);
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [messages]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); window.speechSynthesis?.cancel(); stopCloudSpeech(); }, []);
  useEffect(() => { if (!notice) return; const t = setTimeout(() => setNotice(''), 4000); return () => clearTimeout(t); }, [notice]);

  function speak(text: string, speed: SpeakSpeed = 'current') {
    const slow = (speed === 'current' ? rateMode : speed) === 'slow';
    window.speechSynthesis?.cancel();
    void speakCloud(text, slow, {
      onstart: () => setSpeaking(text),
      onend: () => setSpeaking(''),
      onerror: () => setSpeaking(''),
    }, advanced === 'course' ? coreVoice : 'ava').then(ok => {
      if (ok) return;
      // 云端语音不可用（离线等）时回退设备系统语音
      if (!('speechSynthesis' in window)) { setNotice(tr("当前浏览器不支持朗读，请使用 Chrome 或 Safari。")); return; }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; utterance.rate = slow ? (kids ? 0.5 : 0.62) : (kids ? 0.78 : 0.95);
      const voices = window.speechSynthesis.getVoices();
      const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
      const voice = enVoices.find(v => /(premium|enhanced|natural)/i.test(v.name) && !/compact/i.test(v.name))
        ?? enVoices.find(v => /ava|allison|serena|rachel|tessa|oliver|karen|daniel|moira/i.test(v.name) && !/compact/i.test(v.name))
        ?? enVoices.find(v => v.lang.replace('_', '-') === 'en-US' && !/fred|bells|bahh|bad|cellos|good|pipe|whisper|zarvox|trinoids|junior|albert|compact/i.test(v.name))
        ?? enVoices[0];
      if (voice) utterance.voice = voice;
      utterance.onstart = () => setSpeaking(text);
      utterance.onend = () => setSpeaking('');
      utterance.onerror = () => { setSpeaking(''); setNotice(tr("朗读暂不可用，请检查浏览器音频设置后重试。")); };
      window.speechSynthesis.speak(utterance);
    });
  }
  function resetDetail() { setAdvanced(null);
    if (timer.current) clearTimeout(timer.current);
    setScene(null); setLearning(-1); setWordIndex(null); setPractice(null); setFeedback(false); setRecording(false); setCompleted(false); setAnswer(''); setChecked(false); setTurnTip(''); setLastReply(''); setAttempts([]); setShowReview(false);
    window.speechSynthesis?.cancel(); stopCloudSpeech(); setSpeaking('');
  }
  function openScene(item: Scene, role = false) {
    const opening = item.turns[0];
    if (!opening) return;
    resetDetail(); setScene(item); setRolePlay(role); setTurn(0); setMessages([{ text: opening, user: false }]); setInput('');
  }
  function send(text: string) {
    if (!scene || !text.trim() || turn >= scene.turns.length) return;
    const next = turn + 1;
    const nextLine = scene.turns[next] ?? 'Lovely talking to you. Have a wonderful day!';
    const tip = scene.tips[turn] ?? '';
    setMessages(old => [...old, { text: text.trim(), user: true }, { text: nextLine, user: false }]);
    setTurn(next); setInput(''); setFeedback(false); setTurnTip(tip); setLastReply(text.trim());
    setAttempts(old => [...old, { turn, reply: text.trim(), tip }]);
  }
  function retryTurn() {
    if (!scene || turn === 0) return;
    if (timer.current) clearTimeout(timer.current); setRecording(false);
    setMessages(old => old.slice(0, -2));
    setTurn(turn - 1); setTurnTip(''); setLastReply(''); setFeedback(false);
  }
  function rewindTo(target: number) {
    if (!scene) return;
    if (timer.current) clearTimeout(timer.current); setRecording(false);
    setMessages(old => old.slice(0, target * 2 + 1));
    setTurn(target); setTurnTip(''); setLastReply(''); setFeedback(false); setShowReview(false);
  }
  function back() {
    if (learning > 0 && learning < 3) { setLearning(learning - 1); setFeedback(false); setChecked(false); setAnswer(''); return; }
    resetDetail();
  }
  const detail = scene || learning >= 0 || currentWord || practice;
  const sample = kids ? 'I like cats!' : "I'd like a latte, please.";

  function AudioButton({ text, slow = false }: { text: string; slow?: boolean }) { const label = slow || rateMode === 'slow' ? tr("慢速朗读") : tr("正常语速朗读"); return <Button variant="ghost" size="icon" aria-label={`${label}：${text}`} title={label} onClick={() => speak(text, slow ? 'slow' : 'current')} className={cn('audio-button', speaking === text && 'text-primary')}>{slow ? <Turtle /> : <Volume2 />}</Button>; }
  function PracticeControl({ target }: { target: string }) { return <SpeechCoach target={target} key={target} onPassed={() => setFeedback(true)} onRecord={addRecord} />; }

  const swipe = useRef<{ x: number; y: number } | null>(null);
  const backButton = (el: Element | null) => el?.querySelector<HTMLButtonElement>('.detail-heading button') ?? null;
  const clickBack = () => { const main = document.querySelector('.app-content'); backButton(main)?.click(); main?.scrollTo({ top: 0 }); };
  const onContentScroll = () => {};
  const onSwipeStart = (e: TouchEvent<HTMLElement>) => { const t = e.touches[0]; if (!t) return; const left = e.currentTarget.getBoundingClientRect().left; swipe.current = t.clientX - left < 40 ? { x: t.clientX, y: t.clientY } : null; };
  const onSwipeEnd = (e: TouchEvent<HTMLElement>) => { const s0 = swipe.current; swipe.current = null; if (!s0) return; const t = e.changedTouches[0]; if (!t) return; const dx = t.clientX - s0.x, dy = Math.abs(t.clientY - s0.y); if (dx > 70 && dy < 60 && backButton(e.currentTarget)) clickBack(); };

  const native = isNativeApp();

  return <div className={cn('preview-workspace', (fullscreen || native) && 'is-fullscreen', native && 'is-native-app')}>
    {!native && <header className="workspace-header"><div className="workspace-brand"><img className="brand-logo" src={logoImage} alt={tr("声芽 SayUp Logo")} width={36} height={36} /><span>{tr("声芽")}<span className="workspace-brand-en"> SayUp</span></span><span className="preview-tag">WEB PREVIEW</span></div><div className="workspace-actions"><span className="live-label"><i /> {tr("实时预览")}</span><Button variant="ghost" size="icon" title={tr("预览说明")} aria-label={tr("预览说明")} onClick={() => setPreviewInfo(true)}><CircleHelp /></Button><Button variant="ghost" size="icon" title={fullscreen ? tr("退出全屏") : tr("全屏预览")} aria-label={fullscreen ? tr("退出全屏") : tr("全屏预览")} onClick={() => setFullscreen(!fullscreen)}>{fullscreen ? <Minimize2 /> : <Maximize2 />}</Button></div></header>}
    {fullscreen && !native && <Button variant="secondary" size="icon" className="fullscreen-exit" aria-label={tr("退出全屏")} title={tr("退出全屏")} onClick={() => setFullscreen(false)}><Minimize2 /></Button>}
    {previewInfo && !native && <div className="preview-info-backdrop" onClick={() => setPreviewInfo(false)}><section role="dialog" aria-modal="true" aria-label={tr("在线预览说明")} className="preview-info" onClick={e => e.stopPropagation()}><div className="flex justify-between items-center"><h2>{tr("在线预览说明")}</h2><Button variant="ghost" size="icon" aria-label={tr("关闭说明")} onClick={() => setPreviewInfo(false)}><X /></Button></div><p>{tr("这是浏览器中的手机样式 Web 预览，不是原生手机 App 或手机系统模拟器。")}</p><h3>{tr("可交互体验")}</h3><p>{tr("五个栏目切换、情景筛选、输入回复、角色回合提示、三步学习与返回、词卡翻转与记忆、强化练习、示范发音慢速与正常语速切换、儿童主题及全屏切换。")}</p><h3>{tr("浏览器朗读与模拟功能")}</h3><p>{tr("英语朗读由浏览器 Web Speech API 提供，可切换慢速与正常语速，声音因设备而异。对话为预设回合；跟读评测会请求麦克风权限，录音发送给 AI 识别并逐词纠正；没有录到声音不会评分，会提示你重说。")}</p><h3>{tr("仅静态展示")}</h3><p>{tr("手机边框、灵动岛、9:41 时间、电量、信号和底部横条为静态展示；首页连续天数与练习时长为演示样式。")}</p><p className="preview-info-foot">{tr("登录后，学习进度、词汇复习、录音记录、打卡和会员都会保存在你的账号里，换设备也能接着学。")}</p></section></div>}
    <div className={cn('phone-shell', kids && 'kids-theme')}>
      <div className="phone-screen">
        {!native && <div className="status-bar"><span>9:41</span><div className="dynamic-island" /><div className="flex items-center gap-1.5"><Signal size={14} /><Wifi size={14} /><BatteryFull size={21} /></div></div>}
        <header className="app-header"><div className="flex items-center gap-2"><img className="app-logo-img" src={logoImage} alt="" width={28} height={28} /><div className="flex flex-col leading-tight"><span className="app-logo">{tr("声芽")}<span>SayUp</span></span><span className="app-tagline">{trn(t.tagline)}</span></div></div><div className="header-tools"><Button variant="ghost" size="icon" className="mode-switch" aria-label={user ? tr("我的账号") : tr("登录")} title={user ? tr("我的账号") : tr("登录 / 注册")} onClick={() => { if (user) setSheet('account'); else { setAuthReason(tr("登录后，学习进度、录音记录与会员权益都会保存在你的账号里。")); setSheet('auth'); } }}><UserRound size={15} /></Button><select className="lang-select" aria-label={t.langLabel} value={lang} onChange={e => setLang(e.target.value as Lang)}>{LANGS.map(l => <option key={l.id} value={l.id}>{trn(l.label)}</option>)}</select><Button variant="ghost" className="mode-switch" onClick={() => { const nextKids = !kids; resetDetail(); setKids(nextKids); setCategory('全部'); setKnown(loadKnownWords(nextKids)); setCompleted(false); setDialogDone(false); }} title={tr("切换课程模式")}>{kids ? <Sun size={14} /> : <Sparkles size={14} />}{kids ? tr("儿童") : tr("成人")}</Button></div></header>
        <div className="account-entry-row">
          <Button variant="ghost" size="sm" onClick={() => { setAuthMode('in'); setAuthReason(tr('登录后，学习进度、录音记录与会员权益都会保存在你的账号里。')); setSheet(user ? 'account' : 'auth'); }}><UserRound size={15} />{user ? tr('我的账号') : tr('登录')}</Button>
          {!user && <Button variant="outline" size="sm" onClick={() => { setAuthMode('up'); setAuthReason(tr('登录后，学习进度、录音记录与会员权益都会保存在你的账号里。')); setSheet('auth'); }}>{tr('注册学员账号')}</Button>}
        </div>
        <div className="speed-bar"><span className="speed-bar-label"><Volume2 size={13} /> {tr("示范发音")}</span><div className="speed-segment" role="group" aria-label={tr("示范发音语速")}><Button variant="ghost" size="sm" className={cn('speed-option', rateMode === 'slow' && 'active')} aria-pressed={rateMode === 'slow'} onClick={() => setRateMode('slow')}><Turtle size={12} /> {tr("慢速")}</Button><Button variant="ghost" size="sm" className={cn('speed-option', rateMode === 'normal' && 'active')} aria-pressed={rateMode === 'normal'} onClick={() => setRateMode('normal')}><Gauge size={12} /> {tr("正常")}</Button></div><span className="speed-bar-hint">{rateMode === 'slow' ? tr("放慢约三分之一，方便跟读") : tr("接近日常对话语速")}</span></div>
        <main className="app-content" key={tab + String(kids) + lang} onScroll={onContentScroll} onTouchStart={onSwipeStart} onTouchEnd={onSwipeEnd}>
          {detail ? <>
            <div className="detail-heading"><Button variant="ghost" size="icon" aria-label={tr("返回上一级")} onClick={back}><ArrowLeft /></Button><span>{scene ? (rolePlay ? tr("情景角色扮演") : tr("情景对话")) : currentWord ? tr("记忆词卡") : practice ? tr("薄弱项强化") : tr("每日学习")}</span><span className="level-tag">{scene?.level || 'A1'}</span></div>
            {scene && <div className="conversation-view"><div className="scene-heading"><div className="eyebrow">{trn(scene.english)}</div><h1>{trn(scene.title)}</h1><p>{rolePlay ? tr("你来扮演顾客，声芽来扮演店员") : tr("和声芽聊一聊，让英语融入日常")}</p><span className="simulation-label">{tr("模拟对话 ·")} {Math.min(turn + 1, scene.turns.length)} / {trn(scene.turns.length)} {tr("回合")}</span></div>{rolePlay && <div className="role-hint"><Users size={17} /><span>{tr("你的角色：")}{scene.id === 'travel' ? tr("旅客") : scene.id === 'work' ? tr("新同事") : scene.id === 'toys' ? tr("小顾客") : kids ? tr("小朋友") : tr("顾客")}</span><span className="ml-auto text-teal">{turn < scene.turns.length ? tr("轮到你了") : tr("已完成")}</span></div>}<div className="chat-messages">{messages.map((m, i) => <div className={cn('chat-row', m.user && 'is-user')} key={i}>{!m.user && <span className="chat-avatar"><img src={logoImage} alt="SayUp" className="w-[18px] h-[18px] rounded-full object-contain" /></span>}<div className="chat-bubble"><p><ClickableSentence text={m.text} onWordClick={openDict} /></p>{!m.user && <AudioButton text={m.text} />}</div></div>)}{turnTip && <div className="turn-feedback"><div className="turn-feedback-head"><Sparkles size={15} /><span>{turnTip}</span></div><div className="turn-feedback-actions"><Button variant="ghost" size="sm" aria-label={tr("慢速重听示范发音")} title={tr("慢速重听示范发音")} onClick={() => speak(lastReply, 'slow')}><Turtle size={14} /> {tr("慢速重听")}</Button><Button variant="ghost" size="sm" aria-label={tr("正常语速重听示范发音")} title={tr("正常语速重听示范发音")} onClick={() => speak(lastReply, 'normal')}><Volume2 size={14} /> {tr("正常重听")}</Button><Button variant="ghost" size="sm" aria-label={tr("重新选择回复")} title={tr("重新选择回复")} onClick={retryTurn}><RotateCcw size={14} /> {tr("再选一次")}</Button></div></div>}<div ref={bottom} /></div>{turn < scene.turns.length ? <div className="reply-area"><p className="section-overline"><CircleHelp size={13} /> {tr("回合提示 · 点一句回复，或试着自己说")}</p><div className="reply-options">{(scene.options[turn] ?? []).map(option => <div className="reply-option-row" key={option}><Button variant="outline" className="reply-option" onClick={() => send(option)}><span>{option}</span></Button><AudioButton text={option} /></div>)}</div>{attempts.length > 0 && <><Button variant="ghost" className="review-toggle" onClick={() => setShowReview(!showReview)}><MessageCircle size={14} /> {tr("分支回看 · 已尝试")} {trn(attempts.length)} {tr("句")}<ChevronRight size={13} className={cn('review-chevron', showReview && 'open')} /></Button>{showReview && <div className="branch-review">{attempts.map((a, i) => <div className="branch-item" key={i}><div className="branch-item-head"><span className="branch-turn">{tr("第")} {a.turn + 1} {tr("回合")}</span><span className="audio-pair"><AudioButton text={a.reply} slow /><AudioButton text={a.reply} /></span></div><p className="branch-reply">{trn(a.reply)}</p><p className="branch-tip">{trn(a.tip)}</p>{a.turn < turn && <Button variant="ghost" size="sm" className="branch-rewind" onClick={() => rewindTo(a.turn)}><RotateCcw size={13} /> {tr("回到这轮改选")}</Button>}</div>)}</div>}</>}<div className="suggested-sentence"><span><ClickableSentence text={scene.replies[turn] ?? ""} onWordClick={openDict} /></span><AudioButton text={scene.replies[turn] ?? ""} /></div>{PracticeControl({ target: scene.replies[turn] ?? "" })}<form className="chat-input" onSubmit={e => { e.preventDefault(); send(input); }}><input value={input} onChange={e => setInput(e.target.value)} aria-label={tr("输入英文回复")} placeholder={tr("也可以输入英文回复…")} /><Button type="submit" size="icon" aria-label={tr("发送回复")} disabled={!input.trim()}><ArrowRight /></Button></form><Button variant="ghost" className="w-full text-primary" onClick={() => send(scene.replies[turn] ?? "")}>{tr("使用提示回复")} <ArrowRight size={14} /></Button></div> : <div className="completion"><div className="success-icon"><Check /></div><h2>{tr("又一次勇敢开口！")}</h2><p>{tr("你完成了")} {trn(scene.turns.length)} {tr("回合情景对话")}</p><Button onClick={() => { resetDetail(); setDialogDone(true); setNotice(tr("情景对话已完成，做得很棒！")); }}>{tr("完成练习")} <Check size={16} /></Button><Button variant="ghost" onClick={() => openScene(scene, rolePlay)}><RotateCcw /> {tr("再练一次")}</Button></div>}</div>}
            {learning >= 0 && <div className="learning-view"><div className="learning-progress">{['学习', '填空巩固', '开口练'].map((s, i) => <div className={cn('learning-step', i <= learning && 'active')} key={s}><span>{i < learning ? <Check size={12} /> : i + 1}</span>{s}</div>)}</div><div className="progress-track"><div className={`progress-fill step-${Math.min(learning + 1, 3)}`} /></div>{learning === 0 ? <><div className="lesson-illustration">{kids ? <Cat size={58} /> : <Coffee size={58} />}<Sparkles size={23} /></div><div className="eyebrow">LESSON 01 · {kids ? tr("动物朋友") : tr("礼貌点单")}</div><h1>{kids ? tr("说说你喜欢的动物") : tr("一杯咖啡，开启对话")}</h1><p className="lesson-copy">{kids ? tr("用 I like… 表达你的喜欢。") : tr("用 I’d like… 礼貌地表达你想要的东西。")}</p><div className="sentence-panel"><span>{sample}</span><span className="audio-pair"><AudioButton text={sample} slow /><AudioButton text={sample} /></span><p>{kids ? tr("我喜欢小猫！") : tr("我想要一杯拿铁，谢谢。")}</p></div><div className="tip-panel"><Leaf size={18} /><div><b>{tr("声芽小贴士")}</b><p>{kids ? tr("like 的意思是“喜欢”，后面可以加动物或食物。") : tr("I’d 是 I would 的缩写，比 I want 听起来更礼貌。")}</p></div></div><Button className="w-full h-12 mt-8" onClick={() => setLearning(1)}>{tr("开始巩固")} <ArrowRight /></Button></> : learning === 1 ? <><div className="eyebrow mt-8">LET’S CHECK</div><h1>{tr("选出缺少的单词")}</h1><p className="lesson-copy">{kids ? tr("我喜欢小猫！") : tr("我想要一杯拿铁，谢谢。")}</p><div className="quiz-sentence">{kids ? 'I ' : "I'd "}<span>{answer || '______'}</span>{kids ? ' cats!' : ' a latte, please.'}</div><div className="quiz-options">{(kids ? ['like', 'am', 'is'] : ['like', 'likes', 'liking']).map(a => <Button key={a} variant="outline" className={cn(answer === a && 'selected-answer')} onClick={() => { setAnswer(a); setChecked(false); }} disabled={checked && answer === 'like'}>{a}</Button>)}</div>{checked && <div className={cn('answer-feedback', answer === 'like' ? 'correct' : 'incorrect')}>{answer === 'like' ? tr("答对了！现在来开口练一练。") : tr("再试一次：这里应该使用动词原形 like。")}</div>}<Button className="w-full h-12 mt-8" disabled={!answer} onClick={() => { if (checked && answer === 'like') { setLearning(2); setFeedback(false); } else setChecked(true); }}>{checked && answer === 'like' ? tr("进入开口练") : tr("检查答案")}<ArrowRight /></Button></> : learning === 2 ? <><div className="lesson-illustration"><Mic size={56} /></div><h1>{tr("把学到的，大声说出来")}</h1><p className="lesson-copy">{tr("先听一遍，再试着自然地跟读")}</p><div className="sentence-panel"><span>{sample}</span><span className="audio-pair"><AudioButton text={sample} slow /><AudioButton text={sample} /></span></div>{PracticeControl({ target: sample })}<Button className="w-full mt-4" variant="outline" disabled={!feedback} onClick={() => { setLearning(3); setCompleted(true); }}>{tr("完成本课")} <Check /></Button></> : <div className="completion"><div className="success-icon"><Star size={30} /></div><h1>{tr("今日份成长，已收获！")}</h1><p>{tr("学习 → 巩固 → 开口，全部完成")}</p><div className="reward">{tr("+20 成长值")} <Sparkles size={18} /></div><Button className="w-full" onClick={resetDetail}>{tr("回到学习")} <ArrowRight /></Button></div>}</div>}
            {currentWord && <div className="word-detail">
              <div className="eyebrow mt-4">{(wordIndex ?? 0) + 1} / {trn(activeWords.length)} · {tr("记忆词卡")}</div>
              <div
                className={cn('memory-card', flipped && 'flipped')}
                onClick={() => speak(currentWord.word)}
                role="button"
                tabIndex={0}
                aria-label={tr("点击播放发音")}
              >
                {wordImages[currentWord.word] ? (
                  <img className="word-photo" src={wordImages[currentWord.word]} alt={currentWord.meaning} width={816} height={816} />
                ) : (currentWord as any).emoji ? (
                  <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-amber-500/10 text-5xl shadow-sm select-none">
                    <span>{(currentWord as any).emoji}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/10 text-primary">
                    <BookOpen size={36} />
                  </div>
                )}
                <h1>{flipped ? currentWord.meaning : currentWord.word}</h1>
                <p>{flipped ? currentWord.example : currentWord.phonetic}</p>
                <div className="memory-card-tap-hint">
                  <Volume2 size={13} />
                  <span>{tr("轻触卡片听真人发音")}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={e => {
                    e.stopPropagation();
                    setFlipped(!flipped);
                  }}
                >
                  <RotateCcw size={13} />
                  {flipped ? tr("查看英文") : tr("翻转释义")}
                </Button>
              </div>
              <div className="word-detail-actions">
                <Button
                  variant="outline"
                  className="h-11"
                  onClick={() => {
                    setFlipped(false);
                    setWordIndex(((wordIndex ?? 0) + 1) % activeWords.length);
                  }}
                >
                  {tr("稍后再记")}
                </Button>
                <Button
                  className="h-11"
                  onClick={() => {
                    const nextKnown = [...new Set([...known, currentWord.word])];
                    setKnown(nextKnown);
                    saveKnownWords(kids, nextKnown);
                    setFlipped(false);
                    if ((wordIndex ?? 0) + 1 >= activeWords.length) {
                      setWordIndex(null);
                      setNotice(tr("本组词卡已完成，继续保持！"));
                    } else {
                      setWordIndex((wordIndex ?? 0) + 1);
                    }
                  }}
                >
                  <Check size={16} /> {tr("记住了")}
                </Button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-2">{tr("已掌握")} {trn(known.length)} {tr("个单词")}</p>
            </div>}
            {practice && <div className="practice-view"><div className="lesson-illustration"><Target size={56} /></div><div className="eyebrow">FOCUS PRACTICE</div><h1>{practice}</h1><p className="lesson-copy">{practice.includes('发音') ? tr("注意 /θ/：舌尖轻触上下齿，轻轻送气。") : tr("听一听，感受单词之间自然的连接。")}</p><div className="sentence-panel"><span>{practice.includes('发音') ? 'Thank you for your help.' : 'Would you like a cup of coffee?'}</span><span className="audio-pair"><AudioButton text={practice.includes('发音') ? 'Thank you for your help.' : 'Would you like a cup of coffee?'} slow /><AudioButton text={practice.includes('发音') ? 'Thank you for your help.' : 'Would you like a cup of coffee?'} /></span></div>{PracticeControl({ target: practice.includes('发音') ? 'Thank you for your help.' : 'Would you like a cup of coffee?' })}<Button className="w-full mt-4" variant="outline" disabled={!feedback} onClick={() => { resetDetail(); setNotice(tr("强化练习已完成，做得很棒！")); }}>{tr("完成强化")} <Check /></Button></div>}
          </> : <>
            <div className="greeting-row"><div><div className="eyebrow">{kids ? 'HELLO, LITTLE EXPLORER' : 'A LITTLE EVERY DAY, A LOT ALONG THE WAY'}</div><h1>{tab === '对话' ? (kids ? tr("你好，小小探险家！") : tr("今天，也勇敢开口吧")) : tab === '角色' ? tr("换个角色，聊点新鲜的") : tab === '学习' ? tr("每一小步，都是进步") : tab === '词汇' ? tr("让每个单词，成为朋友") : tr("把薄弱，变成你的强项")}<span className="greeting-spark">{tab === '对话' ? '✦' : ''}</span></h1><p>{tab === '对话' ? tr("从熟悉的生活开始，练出自然的英语。") : tab === '角色' ? tr("进入真实情景，体验不一样的你。") : tab === '学习' ? tr("听懂、记住、说出来，声芽陪你一步步来。") : tab === '词汇' ? tr("不只记住意思，更要学会怎么说。") : tr("针对性练习，让每一次开口更有底气。")}</p></div></div>
            {tab === '对话' && <>
              <div className="member-cta"><Button onClick={() => needLogin('sub')}><Star size={15} /> {trn(t.subscribe)}</Button></div>
              {!kids && <section className="promo-card" aria-label={tr("声芽会员福利")}><div className="promo-head"><Flame size={16} className="text-amber" /><b>{tr("坚持 3 个月，第 4 个月免费")}</b></div><p>{tr("付费会员连续 3 个月、每月开口打卡满 25 天，第 4 个月会员免费送。坚持越久，学得越省。")}</p><div className="promo-points"><span><Check size={12} /> {tr("智能逐词纠音")}</span><span><Check size={12} /> {tr("12 周强攻开口")}</span><span><Check size={12} /> {tr("沉浸式原声听力")}</span></div><Button variant="ghost" size="sm" className="promo-link" onClick={() => needLogin('sub')}>{tr("查看会员方案")} <ArrowRight size={13} /></Button></section>}
              <div className="daily-summary">
                <span><Flame size={17} className="text-amber" /><b>{calculateRealStats(records.map(r => r.at)).streak}</b> {tr("天连续学习")}</span>
                <div className="summary-divider" />
                <span><AudioLines size={17} className="text-teal" />{tr("今日开口")} <b>{calculateRealStats(records.map(r => r.at)).todayMinutes}</b> {tr("分钟")}</span>
                <span className="daily-dot" />
              </div>
              <section className="featured-scene"><img src={kids ? kidsImage : cafeImage} width={1024} height={640} alt={kids ? tr("小猫和小狗在玩具店里玩球") : tr("暖灯下的街角咖啡店")} /><div className="featured-overlay" /><div className="featured-copy"><span className="featured-label"><Sparkles size={11} /> {kids ? tr("儿童精选") : tr("今日推荐")}</span><h2>{kids ? <>{tr("一起认识")}<br />{tr("动物朋友")}</> : <>{tr("一杯咖啡，")}<br />{tr("一段新对话。")}</>}</h2><p>{kids ? 'Say hello to little friends.' : 'Your daily dose of English.'}</p><Button onClick={() => openScene(kids ? kidScene : featuredScene)} className="featured-cta">{tr("开始对话")} <ArrowRight size={14} /></Button></div><span className="featured-level">{kids ? tr("启蒙") : tr("A1 入门")} {tr("· 约 5 分钟")}</span></section>
              <div className="section-heading"><h2>{tr("聊你感兴趣的")}</h2><span>{tr("真实情景，轻松开口")}</span></div><div className="filter-row">{(kids ? kidCategories : ['全部', '日常生活', '旅行出行', '职场交流']).map(c => <Button variant="ghost" key={c} onClick={() => setCategory(c)} className={cn('filter-button', c === category && 'active')}>{trn(c)}</Button>)}</div><div className="scene-grid">{(kids ? childrenScenes : scenes).filter(s => category === '全部' || s.category === category).map((s, i) => { const Icon = sceneIcons[s.icon]; return <Button key={s.id} variant="ghost" className="topic-card" onClick={() => openScene(s)}><div className="flex items-start justify-between w-full"><span className={`topic-icon tone-${i % 4}`}><Icon size={23} /></span><span className="level-tag">{trn(s.level)}</span></div><h3>{trn(s.title)}</h3><p>{trn(s.category)} · {trn(s.turns.length)} {tr("回合")}</p><span className="topic-card-arrow"><ArrowRight size={16} /></span></Button>; })}</div>
              <div className="section-heading mt-6"><h2>{tr("接着上次的小进步")}</h2><span className="text-teal">KEEP GOING</span></div><Button variant="ghost" className="continue-lesson" onClick={() => { setTab('学习'); setLearning(0); }}><span className="continue-icon"><Headphones size={21} /></span><div className="min-w-0 text-left"><h3>{kids ? tr("和小猫说声 Hello") : tr("礼貌表达你的需要")}</h3><p>{tr("第 1 课 ·")} {completed ? tr("已完成，可以复习") : tr("学会说 I’d like…")}</p></div><ChevronRight className="ml-auto" /></Button><p className="bottom-note"><Leaf size={12} /> {tr("不用完美，开口就是进步。")}</p>
            </>}
            {tab === '角色' && <><section className="role-banner"><div className="role-avatar"><Coffee size={31} /></div><div><span className="eyebrow">YOUR TURN TO SHINE</span><h2>{tr("今天，你想成为谁？")}</h2><p>{tr("双人对话 · 回合提示 · 跟读练习")}</p></div></section><div className="section-heading"><h2>{tr("挑选你的情景")}</h2><span>{tr("多轮实战 · 真实对话")}</span></div><div className="role-list">{(kids ? childrenScenes : scenes).map((s, i) => { const Icon = sceneIcons[s.icon]; return <Button variant="ghost" className="role-card" key={s.id} onClick={() => openScene(s, true)}><span className={`topic-icon tone-${i}`}><Icon size={25} /></span><div className="min-w-0 text-left"><h3>{trn(s.title)}</h3><p>{i === 0 ? (kids ? tr("小朋友 × 动物伙伴") : tr("顾客 × 咖啡师")) : i === 1 ? (kids ? tr("小顾客 × 玩具店主") : tr("旅客 × 地勤人员")) : i === 2 ? tr("新同事 × 团队伙伴") : tr("顾客 × 店主")}</p><span className="text-xs text-teal">{trn(s.level)} {tr("· 双人角色扮演")}</span></div><ChevronRight className="ml-auto" /></Button>; })}</div><div className="tip-panel mt-6"><Sparkles size={19} /><div><b>{tr("在角色里，发现自信的自己")}</b><p>{tr("试着听懂对方，再用自己的话回答。")}</p></div></div></>}
            {tab === '学习' && advanced === 'results' && <LearningResults key={user?.id ?? 'guest'} userId={user?.id} records={records} onExit={() => setAdvanced(null)} onLogin={() => { setAuthMode('in'); setSheet('auth'); }} />}{tab === '学习' && advanced === 'checkin' && <CheckinCalendar onExit={() => setAdvanced(null)} />}{tab === '学习' && advanced === 'pron' && <PronLab speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && advanced === 'daily' && <DailyExchange key={dailyId ?? 'list'} initialId={dailyId} speak={speak} onExit={() => { setAdvanced(null); setDailyId(undefined); }} onRecord={addRecord} />}{tab === '学习' && advanced && LIB_ENTRIES.some(e => e.kind === advanced) && <Library key={advanced} kind={advanced as LibKind} speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && advanced === 'vocab' && <VocabReview speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && advanced === 'chat' && <FreeChat speak={speak} lang={lang} onExit={() => setAdvanced(null)} />}{tab === '学习' && advanced === 'mistakes' && <MistakeBook speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && advanced === 'gym' && <SpeakingGym speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && advanced === 'stress' && <StressDrill speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && advanced === 'shadow' && <ShadowDrill speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && advanced === 'immerse' && <ImmersionDrill speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && advanced === 'chunks' && <ChunkDrill speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && advanced === 'course' && <CourseHub speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} isMember={isMember} onNeedSub={() => needLogin('sub')} />}{tab === '学习' && advanced === 'placement' && <PlacementTest speak={speak} onExit={() => setAdvanced(null)} onStart={c => { setStoryLevel(c); setAdvanced('stories'); }} />}{tab === '学习' && advanced === 'stories' && <StoryReader key={storyLevel} initialLevel={storyLevel} speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && advanced === 'listen' && <AdvancedHub focus="listen" speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && advanced?.startsWith('adv-') && <AdvancedHub key={advanced} start={advanced.slice(4) as AdvModule} speak={speak} onExit={() => setAdvanced(null)} onRecord={addRecord} />}{tab === '学习' && !advanced && !kids && <>
              <section
                className="mb-4 p-3.5 rounded-2xl border border-teal/30 bg-teal/5 flex items-center justify-between cursor-pointer transition-all hover:bg-teal/10"
                onClick={() => setAdvanced('listen')}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-teal/15 text-teal flex items-center justify-center font-bold">
                    <Headphones size={20} />
                  </span>
                  <div className="text-left">
                    <h3 className="font-bold text-sm text-foreground">{tr("听力精听大厅 · 80 篇生活与学术听力")}</h3>
                    <p className="text-xs text-muted-foreground">{tr("A1-C1 分级精听 · 学术短讲 · 逐句跟读评测")}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-teal shrink-0" />
              </section>
              <TodayPlan open={(t, id) => { setDailyId(id); setAdvanced(t === 'stories' ? 'stories' : t); }} />
            </>}{tab === '学习' && !advanced && !kids && <div className="weak-list mb-4"><div className="grid grid-cols-5 gap-1.5 mb-2">{LEARN_GROUPS.map((g, gi) => <button type="button" key={g.title} aria-pressed={learnGroup === gi} onClick={() => setLearnGroup(gi)} className={cn('flex flex-col items-center gap-1 rounded-2xl border p-2 text-xs font-semibold', learnGroup === gi ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card')}>{g.icon}{tr(g.short)}</button>)}</div>{[LEARN_GROUPS[learnGroup] ?? LEARN_GROUPS[0]!].map(g => <div key={g.title} className="contents"><div className="section-heading"><h2>{tr(g.title)}</h2><span>{g.items.length} {tr("项")}</span></div>{g.items.map(k => { const lib = LIB_ENTRIES.find(e => e.kind === k); const m = lib ? { title: lib.title, sub: lib.sub, icon: <span>{lib.icon}</span> } : CORE_ENTRIES[k]; if (!m) return null; return <Button key={k} variant="ghost" className="weak-card" onClick={() => { if (k === 'daily') setDailyId(undefined); if (k === 'stories') setStoryLevel(undefined); if (k === 'records') { resetDetail(); setTab('加强'); return; } setAdvanced(k as never); }}><span className="topic-icon tone-2">{m.icon}</span><div className="text-left"><h3>{tr(m.title)}</h3><p>{tr(m.sub)}</p></div><ChevronRight className="ml-auto" /></Button>; })}</div>)}</div>}{tab === '学习' && !advanced && (kids || learnGroup === 0) && <><div className="learning-overview"><span className="topic-icon tone-0"><GraduationCap size={27} /></span><div><h2>{kids ? tr("小小英语探险") : tr("日常英语 · 入门 A1")}</h2><p>{tr("单元 01 · 从一句 Hello 开始")}</p></div></div><div className="section-heading"><h2>{tr("你的学习路径")}</h2><span>{completed ? '1' : '0'} {tr("/ 3 课完成")}</span></div><div className="lesson-path">{[{ title: kids ? tr('认识动物朋友') : tr('礼貌表达你的需要'), subtitle: tr('I’d like… · 约 5 分钟') }, { title: tr('介绍你自己'), subtitle: tr('My name is… · 约 5 分钟') }, { title: tr('说说你的喜好'), subtitle: tr('I like… · 约 5 分钟') }].map((l, i) => <div className="path-item" key={l.title}><span className={cn('path-number', i === 0 && 'active')}>{i === 0 && completed ? <Check size={19} /> : `0${i + 1}`}</span><Button className="lesson-card" variant="ghost" onClick={() => { if (i > 0) { setAdvanced('course'); return; } setLearning(0); setFeedback(false); }}><div className="text-left"><h3>{trn(l.title)}</h3><p>{i === 0 && kids ? tr("I like cats! · 约 5 分钟") : l.subtitle}</p><span className="lesson-badge">{i === 0 ? completed ? tr("已完成 · 复习") : tr("现在开始") : tr("在 12 周主线课程中继续")}</span></div><ChevronRight /></Button></div>)}</div><div className="tip-panel"><Leaf size={18} /><div><b>{tr("每天 5 分钟，给成长一点时间")}</b><p>{tr("每课包含学习、填空巩固和开口练三个阶段。")}</p></div></div></>}
            {tab === '词汇' && <>
              <div className="vocab-stats">
                <div>
                  <span className="eyebrow">MY WORD GARDEN · 3500+ VOCABULARY</span>
                  <h2>{trn(known.length)}<span> / {trn(activeWords.length)} {tr("个已掌握")}</span></h2>
                </div>
                <img src={uiGarden} alt="" width={64} height={64} loading="lazy" className="h-16 w-16 rounded-2xl object-cover" />
              </div>
              <div className="section-heading">
                <h2>{tr("分级词卡库")}</h2>
                <span className="text-teal font-semibold">{trn(activeWords.length)} {tr("个词汇")}</span>
              </div>
              <div className="filter-row">
                {['全部', 'A1', 'A2', 'B1', 'B2', 'C1'].map(l => (
                  <Button
                    key={l}
                    variant="ghost"
                    className={cn('filter-button', wordLevel === l && 'active')}
                    onClick={() => {
                      setWordLevel(l);
                      setVocabPage(1);
                    }}
                  >
                    {l === '全部' ? tr("全部") : `${l} ${l === 'A1' ? tr("入门") : l === 'A2' ? tr("基础") : l === 'B1' ? tr("进阶") : l === 'B2' ? tr("高阶") : tr("专家")}`}
                  </Button>
                ))}
              </div>
              <div className="word-list">
                {activeWords.slice(0, vocabPage * 40).map((w, i) => {
                  const locked = i >= 40 && !isMember;
                  return (
                    <div className="word-row" key={`${w.word}-${i}`}>
                      <Button
                        variant="ghost"
                        className={cn("word-open flex-1", locked && "opacity-80")}
                        onClick={() => {
                          if (locked) {
                            needLogin('sub');
                            return;
                          }
                          setWordIndex(i);
                          setFlipped(false);
                        }}
                      >
                        {wordImages[w.word] && (
                          <img className="word-thumb" src={wordImages[w.word]} alt={w.meaning} width={56} height={56} loading="lazy" />
                        )}
                        <div className="text-left min-w-0">
                          <h3 className="truncate flex items-center gap-1.5">
                            {trn(w.word)}
                            {known.includes(w.word) && <Check size={13} className="text-teal" />}
                            {locked && <Lock size={12} className="text-amber-500 shrink-0" />}
                          </h3>
                          <p className="truncate">{trn(w.phonetic)} <span>· {trn(w.meaning)}</span></p>
                        </div>
                      </Button>
                      <AudioButton text={w.word} />
                    </div>
                  );
                })}
              </div>
              {vocabPage * 40 < activeWords.length ? (
                <Button
                  variant="outline"
                  className="w-full h-11 mt-4"
                  onClick={() => {
                    if (!isMember && vocabPage >= 1) {
                      needLogin('sub');
                      return;
                    }
                    setVocabPage(p => p + 1);
                  }}
                >
                  {!isMember && vocabPage >= 1 ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <Lock size={14} className="text-amber-500" />
                      {tr("开通会员查看全部 3,500+ 词汇")}
                    </span>
                  ) : (
                    <>{tr("加载更多词汇")} ({Math.min(vocabPage * 40, activeWords.length)} / {activeWords.length})</>
                  )}
                </Button>
              ) : null}
              <Button
                className="w-full h-12 mt-4"
                onClick={() => {
                  setWordIndex(0);
                  setFlipped(false);
                }}
              >
                <BookOpen size={18} /> {isMember ? tr("开始词卡记忆（本组") + ` ${trn(activeWords.length)} ` + tr("词）") : tr("开始词卡记忆（精选前 40 词）")}
              </Button>
            </>}
            {tab === '加强' && <><div className="strength-summary"><div><span className="eyebrow">SMALL FIXES, BIG PROGRESS</span><h2>{tr("精准练习，更快进步")}</h2><p>{tr("说错的句子自动进错题本，逐个攻克。")}</p></div><img src={uiMistakes} alt="" width={64} height={64} loading="lazy" className="h-16 w-16 flex-none rounded-2xl object-cover" /></div><div className="section-heading"><h2>{tr("我的错题本")}</h2></div><div className="weak-list"><Button variant="ghost" className="weak-card" onClick={() => setAdvanced('mistakes' as never)}><span className="topic-icon tone-2"><ClipboardCheck size={24} /></span><div className="text-left"><h3>{tr("打开错题本")}</h3><p>{tr("低于 60 分的句子自动收集 · 重练过关")}</p></div><ChevronRight className="ml-auto" /></Button></div><div className="section-heading mt-6"><h2>{tr("我的录音记录")}</h2><span>{trn(records.length)} {tr("条")}</span></div>{records.length === 0 ? <div className="empty-state"><span className="empty-bubble"><Mic size={26} /></span><b>{tr("还没有录音")}</b><p>{tr("在对话、学习或强化练习里点「开始跟读录音」，AI 会逐词纠正，记录会出现在这里。")}</p></div> : <div className="record-list">{records.map(r => <div className="record-item" key={r.id}><div className="flex items-center justify-between gap-2"><b className="truncate">{trn(r.target)}</b><span className={cn('record-score', r.analysis.score >= 85 ? 'good' : r.analysis.score >= 60 ? 'mid' : 'low')}>{trn(r.analysis.score)}</span></div><p className="record-heard">{tr("识别到：")}{trn(r.heard)}</p>{r.analysis.issues[0] && <p className="record-fix">{tr("待纠正：")}<b>{trn(r.analysis.issues[0].word)}</b> · {trn(r.analysis.issues[0].fix)}</p>}<div className="flex items-center gap-1"><Button variant="ghost" size="sm" onClick={() => void playExclusiveAudio(r.audioUrl)}><Volume2 size={13} /> {tr("我的录音")}</Button><AudioButton text={r.target} /><span className="ml-auto text-[10px] text-muted-foreground">{r.at.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span></div></div>)}</div>}<div className="tip-panel mt-6"><Zap size={19} /><div><b>{tr("不怕说错，怕的是不再尝试")}</b><p>{tr("所有纠正都来自你的真实录音，分数只代表这一次的发挥。")}</p></div></div></>}
          </>}
        </main>
        {sheet === 'sub' && <SubscribeDialog lang={lang} onClose={() => setSheet(null)} onLogin={() => { setSheet(null); setAuthMode('in'); setSheet('auth'); }} onBuy={id => { setSheet(null); setNotice(tr("会员权益已开通")); }} />}{sheet === 'auth' && <AuthDialog initialMode={authMode} reason={authReason} onClose={() => { setSheet(null); }} />}{sheet === 'account' && user && <AccountSheet user={user} onResults={() => { setSheet(null); resetDetail(); setTab('学习'); setAdvanced('results'); }} onClose={() => setSheet(null)} />}
        {notice && <div role="status" className="app-notice">{notice}<Button variant="ghost" size="icon" aria-label={tr("关闭提示")} onClick={() => setNotice('')}><X size={14} /></Button></div>}
        <nav className="bottom-nav" aria-label={tr("核心栏目")}>{tabs.map(t => <Button variant="ghost" key={t.name} className={cn('nav-item', tab === t.name && 'active')} onClick={() => { resetDetail(); setTab(t.name); }} aria-label={t.name} aria-current={tab === t.name ? 'page' : undefined}><t.icon size={22} strokeWidth={tab === t.name ? 2.2 : 1.6} /><span>{trn(DICT[lang].tabs[t.name])}</span>{tab === t.name && <i />}</Button>)}</nav><div className="home-indicator"><span /></div>
      </div>
    </div>
    <DictionarySheet word={dictWord} contextSentence={dictSentence} open={!!dictWord} onClose={() => setDictWord(null)} />
    <footer className="workspace-footer"><span className="flex items-center gap-2"><span className="footer-dot" />{tr("声芽 SayUp")}</span><span>{tr("一点一滴，自然生长。")}</span><span>DESIGNED FOR YOUR DAILY GROWTH</span></footer>
  </div>;
}
