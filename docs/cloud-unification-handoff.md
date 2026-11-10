# SayUp 收费与积分统一方案｜云端执行清单（本地侧已落地）

日期：2026年11月9日 · 发件：本地 App 开发 · 收件：云端网页/后端开发
状态：本地代码已实现并推送 GitHub `main`（commit `2049f427`），**数据库迁移未执行、苹果联调未实测**，云端按本清单对齐后方可宣称两端统一。

---

## 一、已定稿的统一规则（本地实现值，云端照此对齐）

| 规则项 | 统一口径 | 说明 |
|---|---|---|
| 积分面值 | **30 积分 = 30 天**（1 积分 = 1 天会员） | 与云端候选 100 分方案实质相同；采用 30 是因为用户可直接理解"1 分 = 1 天"。**云端文案里的 100 积分请全部改为 30 积分** |
| 新人挑战 | 注册起 30 天内累计 25 个有效打卡日 → **+30 积分**，每账号一次，**不限付费状态** | 本地已取消"仅限未付费用户"限制 |
| 会员坚持奖 | 付费会员**每连续 3 个会员月**、每月满 25 个有效打卡日 → **+30 积分** | 可重复：第 1–3 月一次、第 4–6 月一次……非滚动窗口，发奖后重新计数 |
| 会员月口径 | **按已核验订阅周期锚点划分**（非自然月） | 由 `membership_periods` 表驱动；月卡/季卡/年卡都按付费周期拆会员月 |
| 断订与退款 | 付费覆盖间隔 **>1 天**即中断，重新累计；退款/撤销区间不算付费资格 | 1 天容差吸收苹果扣费重试延迟 |
| 积分有效期 | **永不过期** | 若将来设期限须提前公告且不追溯 |
| 兑换比例/时机 | `redeem_points(days)`：**有生效中的付费或奖励权益时拒绝兑换**（返回 `has_active`）；到期后才可兑 | 杜绝"订阅一直续费、奖励排队用不上" |
| 付费/奖励重叠 | **已核验付费优先，剩余奖励天数自动顺延** | `defer_point_grants` 在每次新付费期写入时把 points grant 剩余天数推到覆盖段末尾之后 |
| 兑换期间打卡 | 保留学习记录，**不计入**付费坚持奖（积分兑换期不在 `membership_periods` 内，自动不构成连续覆盖） | 新人挑战在兑换期内仍按独立规则判定 |
| 兑换入口 | **仅原生 App 内**；网页展示余额、流水、权益，不挂兑换按钮 | 本地前端已按 `Capacitor.isNativePlatform()` 分流 |
| 打卡标准 | 每个自然日（**Asia/Shanghai**，服务器判定）≥3 条 `score > 0` 的真实录音；挂机/无声不计 | 不限制练习类型——如需"指定练习"白名单请告知再加字段 |
| 收费 | 月 ¥39 / 季 ¥99 / 年 ¥299，苹果自动续订照常扣费；积分不是免单/退款/抵账 | App Store Connect 商品 `com.sayup.app.sub.{month,quarter,year}` **尚未创建** |
| 免费范围 | 永久：主词库前 40 条 + 前 2 周基础课程 | "4 个精选生活场景基础对话"门槛本地未确认存在，待云端核对 |
| 禁止宣传 | 「第4个月免费」「积分自动停扣」「打卡等于退款」「永久无限免费会员」 | 兑换页需明示：兑换不取消自动续费 |

---

## 二、唯一权威账本（已定稿，已迁移至我方自有账号）

| 角色 | 值 |
|---|---|
| **权威数据库（唯一）** | Supabase 项目 `lonhvcavkkejsapecaxy`（东京 ap-northeast-1，我方账号，已完成 0000–0009 全部迁移并验证）|
| **权威后端（唯一）** | `https://app.orikstudio.com`（IPA 内 `api-config.ts` 硬编码指向） |
| App Bundle ID / 团队 | `com.sayup.app` / `XU3FP3HXF3`（SHIHUA ZHANG） |
| 官网门面域名 | `sayup.orikstudio.com`（**当前 500，须修复**；修复前商店支持/隐私网址先用 lovable 域名） |

**以 `lonhvcavkkejsapecaxy` 为准的理由**：已签名导出的 IPA 将 Supabase 地址在编译期写死指向该库，换库等于重打 IPA 并迁移全部练习/订阅数据；学习者练习记录、订阅账本、积分账本全部在此库，无迁移成本。云端侧仅需把环境变量指向该库即可，成本最低。

**云端需要配置的环境变量**（anon 公钥，客户端可公开，RLS 兜底）：
```
SUPABASE_URL=https://lonhvcavkkejsapecaxy.supabase.co
VITE_SUPABASE_URL=https://lonhvcavkkejsapecaxy.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_UGM-2n1YO1EK2UJsTfqU_Q_VV7z8oaP
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_UGM-2n1YO1EK2UJsTfqU_Q_VV7z8oaP
```
若云端服务端代码需要写共享表（service role），请到 Supabase Dashboard → Settings → API 取 `service_role` 密钥并**私下**配置，不要写进仓库或群聊。若云端只读不写（RLS 限 own），anon 键足够。

**关键事实**：云端项目（orikstudio）与本地后端是**两个不同 Supabase 项目**——云端有 `apple_membership_periods`、`learning_membership`，本库没有；本库的 `subscriptions`、`reward_grants`、`reward_point_events` 云端库里没有。**同一邮箱在两边是不同 auth user，权益目前完全不互通**。云端改指 `lonhvcavkkejsapecaxy` 后，原库内的注册用户如需保留，须把 auth 用户与数据迁移过来（或接受原库账号作废重注册）。

---

## 三、云端必须执行的事项（按顺序）

### 1. 执行数据库迁移（两个文件，缺一不可）

在 `lonhvcavkkejsapecaxy` 库的 SQL Editor 依次执行：

- `drizzle/migrations/0008_reward_points.sql` — 积分流水表 `reward_point_events`、`reward_points_balance()`、`redeem_points(int)`、`claim_rewards()`（积分版）、`reward_grants` 放开 `kind='points'`
- `drizzle/migrations/0009_unified_rewards.sql` — `membership_periods` 付费周期账本（含从 `subscriptions` 回填）、`apple_notification_events` 通知去重表、`subscriptions.last_event_at` 列、`latest_coverage_segment()`、`defer_point_grants()`、`redeem_points`/`claim_rewards` 统一版

执行后验证：`reward_point_events`、`membership_periods`、`apple_notification_events` 三表存在；`claim_rewards`、`redeem_points`、`reward_points_balance`、`latest_coverage_segment`、`defer_point_grants` 五个函数存在。

### 2. 苹果服务器通知地址（App Store Connect 后台填）

```
https://app.orikstudio.com/api/public/apple-purchase
```

该端点已实现（`src/routes/api/public/apple-purchase.ts`）：POST JSON，收两类报文——`{signedTransaction}`（App 购买凭据上报）与 `{signedPayload}`（苹果 V2 通知信封）。验签 Apple 证书链（ES256 + x5c → Apple Root G3），按 `notificationUUID` 幂等去重，`last_event_at` 防乱序回退；处理 `SUBSCRIBED/DID_RENEW/OFFER_REDEEMED`（写订阅+周期+顺延）、`DID_CHANGE_RENEWAL_STATUS`（续订开关）、`DID_FAIL_TO_RENEW`（past_due）、`EXPIRED/GRACE_PERIOD_EXPIRED`（canceled）、`REFUND/REVOKE`（canceled + 撤销对应 `membership_periods`）。

### 3. 云端网页改造

- 文案全部改为 **30 积分 = 30 天** 口径；会员坚持奖描述改为"每连续 3 个会员月（按订阅周期）"；加"有生效权益不可兑换、兑换不取消续费、重新付费剩余天数顺延"三条说明
- 积分余额/流水/权益只读展示（读 `reward_point_events`、`reward_grants`）；**不挂兑换按钮**，提示"请在 SayUp App 内兑换"
- 若继续保留 `learning_membership`/`apple_membership_periods` 表，必须与本地 `subscriptions`/`membership_periods` 字段对映射，或废弃改读权威库
- 修复 `sayup.orikstudio.com`（当前 500）；`legal` 页（隐私政策/条款）需可从正式域名访问——App Store 审核必填且会真点

### 4. 账号归属确认

确认 IPA 登录账号与网页登录账号指向**同一个 Supabase auth user**（同库同 id）。不同库则权益无法互通——这是本次最容易被"相同邮箱"假象掩盖的坑。

---

## 四、本地侧已完成清单（可核查）

- 迁移：`0008_reward_points.sql`（积分流水+兑换 RPC）、`0009_unified_rewards.sql`（周期账本+通知去重+锚点会员月+兑换门禁+顺延）
- 服务端：`src/lib/apple-purchase.server.ts`（购买/通知统一落库）、`src/lib/apple-iap.server.ts`（JWS 验签重构）、`src/utils/iap.functions.ts`（`recordAppleSubscription` 走统一通道）、`src/routes/api/public/apple-purchase.ts`（端点）
- 前端：`checkin-calendar.tsx`（余额/`has_active`/原生端门禁）、`i18n.ts` 三语文案统一
- 验证：TypeScript 零错误、57/57 测试通过、iOS bundle 已含新文案与路由注册（`/api/public/apple-purchase`）
- IPA：`ios/build/Export/App.ipa`，App Store 签名（`XU3FP3HXF3.com.sayup.app`）

## 五、联调验收清单（两端都过了才能宣称"已同步"）

- [ ] 同账号 App 购买 → 云端网页读到会员权益（同一 `subscriptions` 行）
- [ ] 有效打卡 → 两端读到同一天数（`practice_records` 同源）
- [ ] 达标发奖重复请求 → 只到账一次（`UNIQUE(user_id,reason,period_key)`）
- [ ] 兑换 30 天 → 两端同余额、同到期时间
- [ ] 有生效权益时兑换 → 拒绝且不扣分（`has_active`）
- [ ] 余额不足/并发/重复提交兑换 → 不误扣、不出负余额
- [ ] 取消续费 → 已付费期保留；到期后兑换成功
- [ ] 兑换期间重新购买 → 剩余奖励天数顺延，两端到期时间一致
- [ ] REFUND/REVOKE → 会员取消、对应付费期不计入坚持奖，乱序通知不回退
- [ ] 恢复购买 → 不重复发奖
- [ ] 商店页面文案与实际规则一致（审核会逐项核对）

## 六、诚实边界（不承诺项）

- 迁移未执行前，前端积分 UI 点击会报"函数不存在"——第 1 步是硬前提
- 苹果通知端点已实现但**未经真实通知联调**；`sayup.orikstudio.com` 修复是云端独立工作
- 本方案不构成商店审核与法律合规承诺；消费者保护、退款政策、隐私披露仍需逐项核对

## 2026-11-11 · Build 5 (commit fde5a446)
- Kids A0 dialogue library: 8 scenes wired (fruit/colors/counting/breakfast/park/weather/family/bedtime), choices + zh, 79 sentences baked (audio index 19,190)
- Cloud practice_records merge: signed-in users see remote rows marked `remote`, play only when real audioUrl
- Dead files deleted: vocabImages.ts / tprImmersion.ts / kidsAssets.ts (~1000 lines)
- AVAudioSession playAndRecord+defaultToSpeaker (BT audio fix, in AppDelegate)
- Verified: tsc clean, 70/70 tests, signed XU3FP3HXF3, uploaded 1.0(5) to ASC
- PENDING real-device: 50-scene list, review playback, BT audio, cloud-record labels
