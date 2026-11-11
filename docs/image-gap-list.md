# 看图识词 · 缺图清单与生图规范

## 机制（零代码接入）
`src/lib/word-images.ts` 用 `import.meta.glob('@/assets/words/*.jpg')` 自动收录：
**把 jpg 丢进 `src/assets/words/` 即自动接线**，文件名（去 .jpg、连字符转空格）即单词键。
任何组件查 `WORD_IMAGES[word]` 命中即渲染照片，否则回退 emoji——无需改代码。

## 生图规范（保持一致画风）
- 写实照片风，单一清晰主体，干净浅灰/米白背景，1:1 方形，≥1024px
- 无文字、无水印、无 logo、无人物正脸特写（儿童安全）
- 标志类词（toilet/exit/sign/platform）用公共场所指示牌风格
- 同一批统一光线与色调，文件名 = 小写单词（多词用连字符）

## 待生成 · 具象可拍词（110 个）
account, agreement, allergic, apartment, appointment, arrange, athletic, automatic, band, bold, borrow, brain, breath, buy, celebrate, cheap, cheek, class, collect, college, compare, connect, cook, correct, courage, deadline, delayed, delighted, desert, dessert, detail, dime, discount, email, evening, examine, find, fun, gain, gap, gun, headline, help, hit, hold, homework, hop, housework, hurry, invite, label, land, late, leather, live, look, loose, lose, love, main, meal, meeting, money, morning, network, night, older, order, pain, password, personal, platform, principal, prize, protect, quiet, quit, remember, rent, repair, repeat, rest, retail, return, salty, sample, say, scandal, see, sick, sign, size, spicy, stick, suit, suite, sweep, sweet, talk, thick, time, toffee, wash, weakness, weather, weekday, weekend, word, work, worry

## 待生成 · 易混词对配图建议（wordSets 里是成对辨析词，配图能立辨）
desert(沙漠) vs dessert(蛋糕甜点) · suit(西装) vs suite(酒店套房) ·
principal(校长/人物) vs principle(灯泡/原则) · quiet(噤声手势) ·
loose(松的鞋带) vs lose(丢钥匙) · breath(呼气雾气) vs breathe ·
band(橡皮筋) · land(俯瞰大地) · pain(忍痛表情)

## 可选 · 字母卡 A–Z（26 个）
如需字母图卡用木质积木字母风格；否则 emoji 已够用，可不生成。

## 不建议配图 · 抽象/功能词（83 个，保持 emoji 占位）
accept, access, adapt, adept, adopt, adverse, advice, advise, affect, allusion, amount, assess, assure, averse, beg, big, breathe, bum, burrow, but, by, check, complement, compliment, delivered, discreet, discrete, economic, economical, effect, elicit, eminent, ensure, except, excess, exchange, expect, fine, generate, grapes, guideline, hope, illicit, illusion, immanent, imminent, inside, insist, insure, lay, leave, left, lie, life, lift, meaning, meet, minute, next, offer, passage, personnel, practice, precede, predict, prepare, price, pride, principle, proceed, quite, recognize, retain, schedule, sensible, sensitive, separate, side, text, took, vent, whether, wish
