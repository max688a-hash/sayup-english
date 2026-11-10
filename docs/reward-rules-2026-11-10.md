# 打卡与邀请奖励规则 + App 端对接契约（2026-11-10 起，替代积分制）

数据库：Lovable Cloud 项目 dxioqoapztyayfyekkjv（唯一正式库）；网页：https://app.orikstudio.com
本文件内容均为直接查询正式库函数定义得出，不是转述。

## 一、规则
| 规则 | 内容 |
|---|---|
| 打卡日 | 当天至少 3 次有评分的真实录音（practice_records） |
| 新人挑战 | 注册后 30 天内打卡满 25 天 → 30 天会员，每账号一次；练免费试学内容也算 |
| 会员月度奖 | 每个付费会员月（按 Apple 付费时段 membership_periods 起算）打卡满 25 天 → 7 天会员；奖励天数不算付费月；不续费则最后一个达标月发完即止 |
| 邀请好友 | 好友注册 7 天内填写邀请码，好友付费满 7 天 → 邀请人 15 天会员；只奖励直接邀请；每人每 365 天最多 12 次 |
| 生效 | 奖励天数写入 reward_grants，排在付费会员到期和已有奖励之后；新付费到账时自动顺延 |
| 苹果扣费 | 奖励天数不抵扣、不暂停苹果订阅扣费 |

数值单一来源：src/lib/reward-rules.ts（前端文案）= 数据库函数里的常量，测试 src/test/reward-rules.test.ts 锁定。

## 二、对四个问题的答复

### 1. 条款页
- app.orikstudio.com/legal 已改为新规则，保留并强化免责句：“赠送天数不可提现、不可转让，不抵扣、不暂停苹果订阅扣费”。
- sayup.orikstudio.com/terms 属于官网项目（另一个项目），需在官网项目里同步修改（已给出修改指令）。
- 建议 App 内“服务条款”链接改指 https://app.orikstudio.com/legal，规则与后台同源。

### 2. 代码回推
本项目无法直接推送到你们的私有仓库。改动已打包为：
- sayup-cloud-changes.patch：相对导入基线（导入时的仓库代码）的完整差异，可 `git apply --3way` 应用；
- sayup-cloud-changed-files.zip：改动后的完整文件，冲突时直接对照；
- 包含新迁移 drizzle/migrations/0010~0012 与 meta/_journal.json（referrals / referral_codes 就在 0012 里），正式库已执行全部 13 条迁移。
- 未包含：.env、supabase/config.toml、previewAuthStorage.ts（仅 Lovable 预览使用）、音频文件。

### 3. claim_rewards 内部语义（旧函数现状）
| 函数 | 现在的行为 | App 是否继续调 |
|---|---|---|
| `claim_reward_days()` | 新主函数。按上表规则直接发**天数**，返回 `{status:'ok'|'denied', newcomer:boolean, monthly:int, referral:int}` | **调**（打开打卡日历/账号页时调用一次，幂等，重复调用不会多发） |
| `claim_rewards()` | 旧名兼容：内部直接调用 `claim_reward_days()`，返回 `'newcomer' | 'streak' | 'none'`。**不再发积分，发的是天数** | 旧包可继续工作；新包改调 claim_reward_days |
| `reward_points_balance()` | 只读旧积分流水，新规则不再产生积分，所有人恒为 0 | **不调**，界面删掉积分余额 |
| `redeem_points(_days)` | 旧积分兑换，余额为 0 时返回 `insufficient` | **不调**，删掉“兑换”按钮 |

### 4. 邀请流程 App 端契约（全部为登录用户调用的 RPC，未登录调用会被拒）
| 步骤 | 调用 | 说明 |
|---|---|---|
| 读我的邀请码 | `rpc('my_referral_info')` | 首次调用自动生成 7 位码（不含易混字符），返回 `{status, code, invited, rewarded, applied, can_apply}` |
| 好友填码 | `rpc('apply_referral_code', {_code})` | 返回 `ok / invalid / self / already / expired(注册超7天) / not_new(已付费过) / denied(未登录)`；成功写入 `referrals(invitee_id, inviter_id)` |
| 邀请人领 15 天 | 不是触发器，在邀请人调用 `claim_reward_days()` 时发放 | 条件：被邀请人有未撤销的付费时段且开始已满 7 天；同时把 `referrals.rewarded_at` 写上 |
| 分享链接 | `https://app.orikstudio.com/?invite=<码>` | App 内请让好友在「我的账号」手动填写 |

表 referral_codes / referrals 已开启行级权限，App 不要直接读写这两张表，只走上面三个 RPC。

为什么外部探测“猜不到函数”：这些函数只授权给登录用户；用 publishable key 未登录探测时会被拒，看起来像不存在。名字以本表为准。

## 三、App 端需要改的
1. 打卡日历/账号页：`claim_rewards` → `claim_reward_days`，提示文案改为“已送 X 天会员”。
2. 删除积分余额、兑换按钮及“积分/随时兑换”字样。
3. 账号页加邀请卡片（参考 src/components/invite-card.tsx）。
4. 注销账号时一并删除 referral_codes 与 referrals 中本人的记录（参考 src/utils/account.functions.ts）。
5. 服务条款链接改指 https://app.orikstudio.com/legal。
6. 重新打包 IPA。
