import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, AudioLines, BookOpen, Check, CheckCheck, ChevronRight, Coffee, Flame, GraduationCap, Headphones, Leaf, Maximize2, MessageCircle, Mic, Minimize2, MoreHorizontal, Plane, RotateCcw, ShoppingBag, Sparkles, Sprout, Target, Volume2, X, Zap, Briefcase, Users, Signal, Wifi, BatteryFull, Sun, Moon, Star, CircleHelp, Turtle, Gauge, Cat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { scenes, kidScene, toyScene, kidCategories, words, kidWords, type Scene, type Tab } from '@/lib/speaking-content';
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
const wordImages: Record<string, string> = { coffee: w_coffee, please: w_please, delicious: w_delicious, recommend: w_recommend, cat: w_cat, apple: w_apple, happy: w_happy, sunshine: w_sunshine };

const tabs: { name: Tab; icon: typeof MessageCircle }[] = [{ name: '对话', icon: MessageCircle }, { name: '角色', icon: Users }, { name: '学习', icon: GraduationCap }, { name: '词汇', icon: BookOpen }, { name: '加强', icon: Zap }];
const sceneIcons = { coffee: Coffee, plane: Plane, briefcase: Briefcase, shopping: ShoppingBag };

type SpeakSpeed = 'slow' | 'normal' | 'current';

export function SpeakingApp() {
  const [tab, setTab] = useState<Tab>('对话');
  const [kids, setKids] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [previewInfo, setPreviewInfo] = useState(false);
  const [category, setCategory] = useState('全部');
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
  const [known, setKnown] = useState<string[]>([]);
  const [practice, setPractice] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const activeWords = (kids ? kidWords : words).filter(w => wordLevel === '全部' || w.level === wordLevel);
  const featuredScene = scenes[0] ?? kidScene;
  const childrenScenes: Scene[] = [kidScene, toyScene];
  const currentWord = wordIndex === null ? null : activeWords[wordIndex];
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [messages]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); window.speechSynthesis?.cancel(); }, []);
  useEffect(() => { if (!notice) return; const t = setTimeout(() => setNotice(''), 4000); return () => clearTimeout(t); }, [notice]);

  function speak(text: string, speed: SpeakSpeed = 'current') {
    if (!('speechSynthesis' in window)) { setNotice('当前浏览器不支持朗读，请使用 Chrome 或 Safari。'); return; }
    window.speechSynthesis.cancel();
    const slow = (speed === 'current' ? rateMode : speed) === 'slow';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; utterance.rate = slow ? (kids ? 0.5 : 0.62) : (kids ? 0.78 : 0.95);
    const voice = window.speechSynthesis.getVoices().find(v => v.lang.replace('_', '-') === 'en-US') ?? window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith('en'));
    if (voice) utterance.voice = voice;
    utterance.onstart = () => setSpeaking(text);
    utterance.onend = () => setSpeaking('');
    utterance.onerror = () => { setSpeaking(''); setNotice('朗读暂不可用，请检查浏览器音频设置后重试。'); };
    window.speechSynthesis.speak(utterance);
  }
  function resetDetail() {
    if (timer.current) clearTimeout(timer.current);
    setScene(null); setLearning(-1); setWordIndex(null); setPractice(null); setFeedback(false); setRecording(false); setCompleted(false); setAnswer(''); setChecked(false); setTurnTip(''); setLastReply(''); setAttempts([]); setShowReview(false);
    window.speechSynthesis?.cancel(); setSpeaking('');
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
  function simulate() {
    if (recording) return;
    setRecording(true); setFeedback(false);
    timer.current = setTimeout(() => { setRecording(false); setFeedback(true); }, 1400);
  }
  function back() {
    if (learning > 0 && learning < 3) { setLearning(learning - 1); setFeedback(false); setChecked(false); setAnswer(''); return; }
    resetDetail();
  }
  const detail = scene || learning >= 0 || currentWord || practice;
  const sample = kids ? 'I like cats!' : "I'd like a latte, please.";

  function AudioButton({ text, slow = false }: { text: string; slow?: boolean }) { const label = slow || rateMode === 'slow' ? '慢速朗读' : '正常语速朗读'; return <Button variant="ghost" size="icon" aria-label={`${label}：${text}`} title={label} onClick={() => speak(text, slow ? 'slow' : 'current')} className={cn('audio-button', speaking === text && 'text-primary')}>{slow ? <Turtle /> : <Volume2 />}</Button>; }
  function Feedback() { return <div className="feedback-box"><div className="flex items-center justify-between"><span className="flex items-center gap-2 text-teal font-semibold"><CheckCheck size={17} /> 很棒，继续保持！</span><span className="feedback-score">92<span>/100</span></span></div><p className="mt-2 text-sm text-muted-foreground">发音清晰，试着把单词连得更自然一些。</p><div className="mt-3 flex gap-4 text-xs"><span>准确度 <b className="text-teal">94</b></span><span>流利度 <b className="text-teal">90</b></span><span>完整度 <b className="text-teal">92</b></span></div><p className="mt-3 text-[10px] text-muted-foreground">模拟评测 · 演示分数，不录音或分析真实发音</p></div>; }
  function PracticeControl() { return <><Button className={cn('w-full h-12', recording && 'recording')} onClick={simulate}><Mic size={18} />{recording ? '正在模拟跟读…' : '模拟跟读评测'}</Button>{feedback && <Feedback />}</>; }

  return <div className={cn('preview-workspace', fullscreen && 'is-fullscreen')}>
    <header className="workspace-header"><div className="workspace-brand"><img className="brand-logo" src={logoImage} alt="语芽 Logo" width={36} height={36} /><span>语芽<span className="workspace-brand-en"> yuya</span></span><span className="preview-tag">WEB PREVIEW</span></div><div className="workspace-actions"><span className="live-label"><i /> 实时预览</span><Button variant="ghost" size="icon" title="预览说明" aria-label="预览说明" onClick={() => setPreviewInfo(true)}><CircleHelp /></Button><Button variant="ghost" size="icon" title={fullscreen ? '退出全屏' : '全屏预览'} aria-label={fullscreen ? '退出全屏' : '全屏预览'} onClick={() => setFullscreen(!fullscreen)}>{fullscreen ? <Minimize2 /> : <Maximize2 />}</Button></div></header>
    {fullscreen && <Button variant="secondary" size="icon" className="fullscreen-exit" aria-label="退出全屏" title="退出全屏" onClick={() => setFullscreen(false)}><Minimize2 /></Button>}
    {previewInfo && <div className="preview-info-backdrop" onClick={() => setPreviewInfo(false)}><section role="dialog" aria-modal="true" aria-label="在线预览说明" className="preview-info" onClick={e => e.stopPropagation()}><div className="flex justify-between items-center"><h2>在线预览说明</h2><Button variant="ghost" size="icon" aria-label="关闭说明" onClick={() => setPreviewInfo(false)}><X /></Button></div><p>这是浏览器中的手机样式 Web 预览，不是原生手机 App 或手机系统模拟器。</p><h3>可交互体验</h3><p>五个栏目切换、情景筛选、输入回复、角色回合提示、三步学习与返回、词卡翻转与记忆、强化练习、示范发音慢速与正常语速切换、儿童主题及全屏切换。</p><h3>浏览器朗读与模拟功能</h3><p>英语朗读由浏览器 Web Speech API 提供，可切换慢速与正常语速，声音因设备而异。对话为预设回合；跟读与评测为模拟，不访问麦克风，不识别或评分真实发音。</p><h3>仅静态展示</h3><p>手机边框、灵动岛、9:41 时间、电量、信号和底部横条；首页连续天数与练习时长、错题记录为示例数据。</p><p className="preview-info-foot">本次学习状态仅保留在当前页面，刷新会重置；预览不包含登录、云端同步、真实录音、系统通知或后台运行。</p></section></div>}
    <div className={cn('phone-shell', kids && 'kids-theme')}>
      <div className="phone-screen">
        <div className="status-bar"><span>9:41</span><div className="dynamic-island" /><div className="flex items-center gap-1.5"><Signal size={14} /><Wifi size={14} /><BatteryFull size={21} /></div></div>
        <header className="app-header"><div className="flex items-center gap-2"><img className="app-logo-img" src={logoImage} alt="" width={28} height={28} /><span className="app-logo">语芽<span>英语口语</span></span></div><Button variant="ghost" className="mode-switch" onClick={() => { resetDetail(); setKids(!kids); setCategory('全部'); setKnown([]); setCompleted(false); setDialogDone(false); }} title="切换课程模式">{kids ? <Sun size={14} /> : <Sparkles size={14} />}{kids ? '儿童模式' : '成人模式'}<ChevronRight size={12} /></Button></header>
        <div className="speed-bar"><span className="speed-bar-label"><Volume2 size={13} /> 示范发音</span><div className="speed-segment" role="group" aria-label="示范发音语速"><Button variant="ghost" size="sm" className={cn('speed-option', rateMode === 'slow' && 'active')} aria-pressed={rateMode === 'slow'} onClick={() => setRateMode('slow')}><Turtle size={12} /> 慢速</Button><Button variant="ghost" size="sm" className={cn('speed-option', rateMode === 'normal' && 'active')} aria-pressed={rateMode === 'normal'} onClick={() => setRateMode('normal')}><Gauge size={12} /> 正常</Button></div><span className="speed-bar-hint">{rateMode === 'slow' ? '放慢约三分之一，方便跟读' : '接近日常对话语速'}</span></div>
        <main className="app-content" key={tab + String(kids)}>
          {detail ? <>
            <div className="detail-heading"><Button variant="ghost" size="icon" aria-label="返回上一级" onClick={back}><ArrowLeft /></Button><span>{scene ? (rolePlay ? '情景角色扮演' : '情景对话') : currentWord ? '记忆词卡' : practice ? '薄弱项强化' : '每日学习'}</span><span className="level-tag">{scene?.level || 'A1'}</span></div>
            {scene && <div className="conversation-view"><div className="scene-heading"><div className="eyebrow">{scene.english}</div><h1>{scene.title}</h1><p>{rolePlay ? '你来扮演顾客，语芽来扮演店员' : '和语芽聊一聊，让英语融入日常'}</p><span className="simulation-label">模拟对话 · {Math.min(turn + 1, scene.turns.length)} / {scene.turns.length} 回合</span></div>{rolePlay && <div className="role-hint"><Users size={17} /><span>你的角色：{scene.id === 'travel' ? '旅客' : scene.id === 'work' ? '新同事' : scene.id === 'toys' ? '小顾客' : kids ? '小朋友' : '顾客'}</span><span className="ml-auto text-teal">{turn < scene.turns.length ? '轮到你了' : '已完成'}</span></div>}<div className="chat-messages">{messages.map((m, i) => <div className={cn('chat-row', m.user && 'is-user')} key={i}>{!m.user && <span className="chat-avatar"><Sprout size={17} /></span>}<div className="chat-bubble"><p>{m.text}</p>{!m.user && <AudioButton text={m.text} />}</div></div>)}{turnTip && <div className="turn-feedback"><div className="turn-feedback-head"><Sparkles size={15} /><span>{turnTip}</span></div><div className="turn-feedback-actions"><Button variant="ghost" size="sm" aria-label="慢速重听示范发音" title="慢速重听示范发音" onClick={() => speak(lastReply, 'slow')}><Turtle size={14} /> 慢速重听</Button><Button variant="ghost" size="sm" aria-label="正常语速重听示范发音" title="正常语速重听示范发音" onClick={() => speak(lastReply, 'normal')}><Volume2 size={14} /> 正常重听</Button><Button variant="ghost" size="sm" aria-label="重新选择回复" title="重新选择回复" onClick={retryTurn}><RotateCcw size={14} /> 再选一次</Button></div></div>}<div ref={bottom} /></div>{turn < scene.turns.length ? <div className="reply-area"><p className="section-overline"><CircleHelp size={13} /> 回合提示 · 点一句回复，或试着自己说</p><div className="reply-options">{(scene.options[turn] ?? []).map(option => <div className="reply-option-row" key={option}><Button variant="outline" className="reply-option" onClick={() => send(option)}><span>{option}</span></Button><AudioButton text={option} /></div>)}</div>{attempts.length > 0 && <><Button variant="ghost" className="review-toggle" onClick={() => setShowReview(!showReview)}><MessageCircle size={14} /> 分支回看 · 已尝试 {attempts.length} 句<ChevronRight size={13} className={cn('review-chevron', showReview && 'open')} /></Button>{showReview && <div className="branch-review">{attempts.map((a, i) => <div className="branch-item" key={i}><div className="branch-item-head"><span className="branch-turn">第 {a.turn + 1} 回合</span><span className="audio-pair"><AudioButton text={a.reply} slow /><AudioButton text={a.reply} /></span></div><p className="branch-reply">{a.reply}</p><p className="branch-tip">{a.tip}</p>{a.turn < turn && <Button variant="ghost" size="sm" className="branch-rewind" onClick={() => rewindTo(a.turn)}><RotateCcw size={13} /> 回到这轮改选</Button>}</div>)}</div>}</>}<div className="suggested-sentence"><span>{scene.replies[turn]}</span><AudioButton text={scene.replies[turn] ?? ""} /></div><PracticeControl /><form className="chat-input" onSubmit={e => { e.preventDefault(); send(input); }}><input value={input} onChange={e => setInput(e.target.value)} aria-label="输入英文回复" placeholder="也可以输入英文回复…" /><Button type="submit" size="icon" aria-label="发送回复" disabled={!input.trim()}><ArrowRight /></Button></form><Button variant="ghost" className="w-full text-primary" onClick={() => send(scene.replies[turn] ?? "")}>使用提示回复 <ArrowRight size={14} /></Button></div> : <div className="completion"><div className="success-icon"><Check /></div><h2>又一次勇敢开口！</h2><p>你完成了 {scene.turns.length} 回合情景对话</p><Button onClick={() => { resetDetail(); setDialogDone(true); setNotice('情景对话已完成，做得很棒！'); }}>完成练习 <Check size={16} /></Button><Button variant="ghost" onClick={() => openScene(scene, rolePlay)}><RotateCcw /> 再练一次</Button></div>}</div>}
            {learning >= 0 && <div className="learning-view"><div className="learning-progress">{['学习', '填空巩固', '开口练'].map((s, i) => <div className={cn('learning-step', i <= learning && 'active')} key={s}><span>{i < learning ? <Check size={12} /> : i + 1}</span>{s}</div>)}</div><div className="progress-track"><div className={`progress-fill step-${Math.min(learning + 1, 3)}`} /></div>{learning === 0 ? <><div className="lesson-illustration">{kids ? <Cat size={58} /> : <Coffee size={58} />}<Sparkles size={23} /></div><div className="eyebrow">LESSON 01 · {kids ? '动物朋友' : '礼貌点单'}</div><h1>{kids ? '说说你喜欢的动物' : '一杯咖啡，开启对话'}</h1><p className="lesson-copy">{kids ? '用 I like… 表达你的喜欢。' : '用 I’d like… 礼貌地表达你想要的东西。'}</p><div className="sentence-panel"><span>{sample}</span><span className="audio-pair"><AudioButton text={sample} slow /><AudioButton text={sample} /></span><p>{kids ? '我喜欢小猫！' : '我想要一杯拿铁，谢谢。'}</p></div><div className="tip-panel"><Leaf size={18} /><div><b>语芽小贴士</b><p>{kids ? 'like 的意思是“喜欢”，后面可以加动物或食物。' : 'I’d 是 I would 的缩写，比 I want 听起来更礼貌。'}</p></div></div><Button className="w-full h-12 mt-8" onClick={() => setLearning(1)}>开始巩固 <ArrowRight /></Button></> : learning === 1 ? <><div className="eyebrow mt-8">LET’S CHECK</div><h1>选出缺少的单词</h1><p className="lesson-copy">{kids ? '我喜欢小猫！' : '我想要一杯拿铁，谢谢。'}</p><div className="quiz-sentence">{kids ? 'I ' : "I'd "}<span>{answer || '______'}</span>{kids ? ' cats!' : ' a latte, please.'}</div><div className="quiz-options">{(kids ? ['like', 'am', 'is'] : ['like', 'likes', 'liking']).map(a => <Button key={a} variant="outline" className={cn(answer === a && 'selected-answer')} onClick={() => { setAnswer(a); setChecked(false); }} disabled={checked && answer === 'like'}>{a}</Button>)}</div>{checked && <div className={cn('answer-feedback', answer === 'like' ? 'correct' : 'incorrect')}>{answer === 'like' ? '答对了！现在来开口练一练。' : '再试一次：这里应该使用动词原形 like。'}</div>}<Button className="w-full h-12 mt-8" disabled={!answer} onClick={() => { if (checked && answer === 'like') { setLearning(2); setFeedback(false); } else setChecked(true); }}>{checked && answer === 'like' ? '进入开口练' : '检查答案'}<ArrowRight /></Button></> : learning === 2 ? <><div className="lesson-illustration"><Mic size={56} /></div><h1>把学到的，大声说出来</h1><p className="lesson-copy">先听一遍，再试着自然地跟读</p><div className="sentence-panel"><span>{sample}</span><span className="audio-pair"><AudioButton text={sample} slow /><AudioButton text={sample} /></span></div><PracticeControl /><Button className="w-full mt-4" variant="outline" disabled={!feedback} onClick={() => { setLearning(3); setCompleted(true); }}>完成本课 <Check /></Button></> : <div className="completion"><div className="success-icon"><Star size={30} /></div><h1>今日份成长，已收获！</h1><p>学习 → 巩固 → 开口，全部完成</p><div className="reward">+20 成长值 <Sparkles size={18} /></div><Button className="w-full" onClick={resetDetail}>回到学习 <ArrowRight /></Button></div>}</div>}
            {currentWord && <div className="word-detail"><div className="eyebrow mt-7">{(wordIndex ?? 0) + 1} / {activeWords.length} · MEMORY CARD</div><div className={cn('memory-card', flipped && 'flipped')}>{wordImages[currentWord.word] ? <img className="word-photo" src={wordImages[currentWord.word]} alt={currentWord.meaning} width={816} height={816} /> : <BookOpen size={30} className="text-teal" />}<h1>{flipped ? currentWord.meaning : currentWord.word}</h1><p>{flipped ? currentWord.example : currentWord.phonetic}</p><AudioButton text={flipped ? currentWord.example : currentWord.word} /><Button variant="ghost" onClick={() => setFlipped(!flipped)}><RotateCcw size={14} />{flipped ? '查看英文' : '翻转词卡'}</Button></div><div className="grid grid-cols-2 gap-3 mt-6"><Button variant="outline" onClick={() => { setFlipped(false); setWordIndex(((wordIndex ?? 0) + 1) % activeWords.length); }}>稍后再记</Button><Button onClick={() => { setKnown(prev => [...new Set([...prev, currentWord.word])]); setFlipped(false); if ((wordIndex ?? 0) + 1 >= activeWords.length) { setWordIndex(null); setNotice('本组词卡已完成，继续保持！'); } else setWordIndex((wordIndex ?? 0) + 1); }}><Check /> 记住了</Button></div><p className="text-center text-xs text-muted-foreground mt-5">已掌握 {known.length} 个单词</p></div>}
            {practice && <div className="practice-view"><div className="lesson-illustration"><Target size={56} /></div><div className="eyebrow">FOCUS PRACTICE</div><h1>{practice}</h1><p className="lesson-copy">{practice.includes('发音') ? '注意 /θ/：舌尖轻触上下齿，轻轻送气。' : '听一听，感受单词之间自然的连接。'}</p><div className="sentence-panel"><span>{practice.includes('发音') ? 'Thank you for your help.' : 'Would you like a cup of coffee?'}</span><span className="audio-pair"><AudioButton text={practice.includes('发音') ? 'Thank you for your help.' : 'Would you like a cup of coffee?'} slow /><AudioButton text={practice.includes('发音') ? 'Thank you for your help.' : 'Would you like a cup of coffee?'} /></span></div><PracticeControl /><Button className="w-full mt-4" variant="outline" disabled={!feedback} onClick={() => { resetDetail(); setNotice('强化练习已完成，做得很棒！'); }}>完成强化 <Check /></Button></div>}
          </> : <>
            <div className="greeting-row"><div><div className="eyebrow">{kids ? 'HELLO, LITTLE EXPLORER' : 'A LITTLE EVERY DAY, A LOT ALONG THE WAY'}</div><h1>{tab === '对话' ? (kids ? '你好，小小探险家！' : '今天，也勇敢开口吧') : tab === '角色' ? '换个角色，聊点新鲜的' : tab === '学习' ? '每一小步，都是进步' : tab === '词汇' ? '让每个单词，成为朋友' : '把薄弱，变成你的强项'}<span className="greeting-spark">{tab === '对话' ? '✦' : ''}</span></h1><p>{tab === '对话' ? '从熟悉的生活开始，练出自然的英语。' : tab === '角色' ? '进入真实情景，体验不一样的你。' : tab === '学习' ? '听懂、记住、说出来，语芽陪你一步步来。' : tab === '词汇' ? '不只记住意思，更要学会怎么说。' : '针对性练习，让每一次开口更有底气。'}</p></div></div>
            {tab === '对话' && <>
              <div className="daily-summary"><span><Flame size={17} className="text-amber" /><b>3</b> 天连续学习</span><div className="summary-divider" /><span><AudioLines size={17} className="text-teal" />今日开口 <b>{6 + (completed ? 3 : 0) + (dialogDone ? 2 : 0)}</b> 分钟</span><span className="daily-dot" /></div>
              <section className="featured-scene"><img src={kids ? kidsImage : cafeImage} width={1024} height={640} alt={kids ? '小猫和小狗在玩具店里玩球' : '暖灯下的街角咖啡店'} /><div className="featured-overlay" /><div className="featured-copy"><span className="featured-label"><Sparkles size={11} /> {kids ? '儿童精选' : '今日推荐'}</span><h2>{kids ? <>一起认识<br />动物朋友</> : <>一杯咖啡，<br />一段新对话。</>}</h2><p>{kids ? 'Say hello to little friends.' : 'Your daily dose of English.'}</p><Button onClick={() => openScene(kids ? kidScene : featuredScene)} className="featured-cta">开始对话 <ArrowRight size={14} /></Button></div><span className="featured-level">{kids ? '启蒙' : 'A1 入门'} · 约 5 分钟</span></section>
              <div className="section-heading"><h2>聊你感兴趣的</h2><span>真实情景，轻松开口</span></div><div className="filter-row">{(kids ? kidCategories : ['全部', '日常生活', '旅行出行', '职场交流']).map(c => <Button variant="ghost" key={c} onClick={() => setCategory(c)} className={cn('filter-button', c === category && 'active')}>{c}</Button>)}</div><div className="scene-grid">{(kids ? childrenScenes : scenes).filter(s => category === '全部' || s.category === category).map((s, i) => { const Icon = sceneIcons[s.icon]; return <Button key={s.id} variant="ghost" className="topic-card" onClick={() => openScene(s)}><div className="flex items-start justify-between w-full"><span className={`topic-icon tone-${i % 4}`}><Icon size={23} /></span><span className="level-tag">{s.level}</span></div><h3>{s.title}</h3><p>{s.category} · 3 回合</p><span className="topic-card-arrow"><ArrowRight size={16} /></span></Button>; })}</div>
              <div className="section-heading mt-6"><h2>接着上次的小进步</h2><span className="text-teal">KEEP GOING</span></div><Button variant="ghost" className="continue-lesson" onClick={() => { setTab('学习'); setLearning(0); }}><span className="continue-icon"><Headphones size={21} /></span><div className="min-w-0 text-left"><h3>{kids ? '和小猫说声 Hello' : '礼貌表达你的需要'}</h3><p>第 1 课 · {completed ? '已完成，可以复习' : '学会说 I’d like…'}</p></div><ChevronRight className="ml-auto" /></Button><p className="bottom-note"><Leaf size={12} /> 不用完美，开口就是进步。</p>
            </>}
            {tab === '角色' && <><section className="role-banner"><div className="role-avatar"><Coffee size={31} /></div><div><span className="eyebrow">YOUR TURN TO SHINE</span><h2>今天，你想成为谁？</h2><p>双人对话 · 回合提示 · 跟读练习</p></div></section><div className="section-heading"><h2>挑选你的情景</h2><span>3 回合 / 情景</span></div><div className="role-list">{(kids ? childrenScenes : scenes).map((s, i) => { const Icon = sceneIcons[s.icon]; return <Button variant="ghost" className="role-card" key={s.id} onClick={() => openScene(s, true)}><span className={`topic-icon tone-${i}`}><Icon size={25} /></span><div className="min-w-0 text-left"><h3>{s.title}</h3><p>{i === 0 ? (kids ? '小朋友 × 动物伙伴' : '顾客 × 咖啡师') : i === 1 ? (kids ? '小顾客 × 玩具店主' : '旅客 × 地勤人员') : i === 2 ? '新同事 × 团队伙伴' : '顾客 × 店主'}</p><span className="text-xs text-teal">{s.level} · 双人角色扮演</span></div><ChevronRight className="ml-auto" /></Button>; })}</div><div className="tip-panel mt-6"><Sparkles size={19} /><div><b>在角色里，发现自信的自己</b><p>试着听懂对方，再用自己的话回答。</p></div></div></>}
            {tab === '学习' && <><div className="learning-overview"><span className="topic-icon tone-0"><GraduationCap size={27} /></span><div><h2>{kids ? '小小英语探险' : '日常英语 · 入门 A1'}</h2><p>单元 01 · 从一句 Hello 开始</p></div></div><div className="section-heading"><h2>你的学习路径</h2><span>{completed ? '1' : '0'} / 3 课完成</span></div><div className="lesson-path">{[{ title: kids ? '认识动物朋友' : '礼貌表达你的需要', subtitle: 'I’d like… · 约 5 分钟' }, { title: '介绍你自己', subtitle: 'My name is… · 约 5 分钟' }, { title: '说说你的喜好', subtitle: 'I like… · 约 5 分钟' }].map((l, i) => <div className="path-item" key={l.title}><span className={cn('path-number', i === 0 && 'active')}>{i === 0 && completed ? <Check size={19} /> : `0${i + 1}`}</span><Button className="lesson-card" variant="ghost" onClick={() => { if (i > 0) { setNotice('预览版开放第 1 课，其余课程暂未开放。'); return; } setLearning(0); setFeedback(false); }}><div className="text-left"><h3>{l.title}</h3><p>{i === 0 && kids ? 'I like cats! · 约 5 分钟' : l.subtitle}</p><span className="lesson-badge">{i === 0 ? completed ? '已完成 · 复习' : '现在开始' : '即将开放'}</span></div><ChevronRight /></Button></div>)}</div><div className="tip-panel"><Leaf size={18} /><div><b>每天 5 分钟，给成长一点时间</b><p>每课包含学习、填空巩固和开口练三个阶段。</p></div></div></>}
            {tab === '词汇' && <><div className="vocab-stats"><div><span className="eyebrow">MY WORD GARDEN</span><h2>{known.length}<span> 个已掌握</span></h2></div><span className="vocab-sprout"><Sprout size={37} /></span></div><div className="section-heading"><h2>分级词卡库</h2><span>{activeWords.length} 个单词</span></div><div className="filter-row">{['全部', 'A1', 'A2', 'B1'].map(l => <Button key={l} variant="ghost" className={cn('filter-button', wordLevel === l && 'active')} onClick={() => setWordLevel(l)}>{l === '全部' ? '全部' : `${l} ${l === 'A1' ? '入门' : l === 'A2' ? '基础' : '进阶'}`}</Button>)}</div><div className="word-list">{activeWords.map((w, i) => <div className="word-row" key={w.word}><Button variant="ghost" className="word-open" onClick={() => { setWordIndex(i); setFlipped(false); }}>{wordImages[w.word] && <img className="word-thumb" src={wordImages[w.word]} alt={w.meaning} width={56} height={56} loading="lazy" />}<div className="text-left"><h3>{w.word}{known.includes(w.word) && <Check size={13} className="text-teal" />}</h3><p>{w.phonetic} <span>· {w.meaning}</span></p></div></Button><AudioButton text={w.word} /></div>)}</div><Button className="w-full h-12 mt-6" onClick={() => { setWordIndex(0); setFlipped(false); }}><BookOpen /> 开始词卡记忆</Button></>}
            {tab === '加强' && <><div className="strength-summary"><div><span className="eyebrow">SMALL FIXES, BIG PROGRESS</span><h2>精准练习，更快进步</h2><p>2 个薄弱项，今天解决一点点。</p></div><Target size={39} className="text-amber" /></div><div className="section-heading"><h2>我的错题本</h2><span className="simulation-label">示例记录</span></div><div className="weak-list">{['/θ/ 发音练习', '自然连读练习'].map((p, i) => <Button variant="ghost" className="weak-card" key={p} onClick={() => { setPractice(p); setFeedback(false); }}><span className={cn('topic-icon', i === 0 ? 'tone-2' : 'tone-1')}>{i === 0 ? <AudioLines size={24} /> : <Headphones size={24} />}</span><div className="text-left"><h3>{p}</h3><p>{i === 0 ? 'thank / think · 容易混淆的音' : 'would you / like a · 单词间的连接'}</p><span className="text-xs text-amber">建议复习 · 约 2 分钟</span></div><ChevronRight className="ml-auto" /></Button>)}</div><div className="tip-panel mt-6"><Zap size={19} /><div><b>不怕说错，怕的是不再尝试</b><p>示例薄弱项用于展示强化练习，不代表真实发音诊断。</p></div></div></>}
          </>}
        </main>
        {notice && <div role="status" className="app-notice">{notice}<Button variant="ghost" size="icon" aria-label="关闭提示" onClick={() => setNotice('')}><X size={14} /></Button></div>}
        <nav className="bottom-nav" aria-label="核心栏目">{tabs.map(t => <Button variant="ghost" key={t.name} className={cn('nav-item', tab === t.name && 'active')} onClick={() => { resetDetail(); setTab(t.name); }} aria-label={t.name} aria-current={tab === t.name ? 'page' : undefined}><t.icon size={22} strokeWidth={tab === t.name ? 2.2 : 1.6} /><span>{t.name}</span>{tab === t.name && <i />}</Button>)}</nav><div className="home-indicator"><span /></div>
      </div>
    </div><footer className="workspace-footer"><span className="flex items-center gap-2"><span className="footer-dot" />语芽英语口语</span><span>一点一滴，自然生长。</span><span>DESIGNED FOR YOUR DAILY GROWTH</span></footer>
  </div>;
}