# SayUp English 内容真实性与语义防伪物理门禁法典

## 1. 事故复盘与前车之鉴 (Post-Mortem)
在早期版本中，系统曾出现严重的「验收盲区」与「形式主义假象」：
- **病态反例**：主词库聚合器在导出 3,260 个词汇时，其 `example`（例句）字段全量硬编码为模板占位字符串：`` `I practice using the word "${w}" every day.` ``。
- **虚假安全感**：单测仅断言了 `words.length >= 3000` 和 `coffee?.meaning !== undefined`。因为只验数据结构骨架、不验语义血肉，测试 100% 亮绿灯，掩盖了真实的 2,142 条复审地道例句闲置在旁的严重缺陷。
- **治理原则**：拒绝走过场式的表面自动化测试，所有内容质量指标必须具备**语义真伪过滤与物理磁盘对账**能力。

---

## 2. 六大物理硬阻断门禁 (Automated Hard Gates)

本工程已在 [`src/test/content-integrity-audit.test.ts`](../src/test/content-integrity-audit.test.ts) 中物理固化以下六大门禁，每次 `bun test` 或 `bun run audit:content` 必跑：

### 门禁 1：主词库语义真伪门禁 (Vocab Semantic Integrity)
- 主词库条数 $\ge 3,000$ 条；
- 真实人工/母语复审地道例句挂载量 $\ge 2,000$ 条；
- 模板占位字符串比例严禁超过 40%；
- 释义严禁出现「日常常用单词」「待补充」「TODO」等通用假占位符；音标非空且格式完好。

### 门禁 2：儿童启蒙词库直观认知门禁 (Kids Vocab Integrity)
- 儿童词汇 $\ge 200$ 条；
- 每个词汇必须配备直观生活主题与具象图形 Emoji，严禁「基础词汇」兜底。

### 门禁 3：多轮对话深度与实战轮次门禁 (Dialogue Depth Gate)
- 角色扮演场景 $\ge 40$ 个，情景对话单元 $\ge 40$ 个，日常快问快答 $\ge 100$ 组；
- 全系统实装真实物理对话轮次必须 $\ge 1,000$ 轮；
- 对话文本严禁包含任何 `Lorem Ipsum`、`TODO:`、`placeholder` 占位符。

### 门禁 4：听力材料正文与丰富度门禁 (Listening Corpus Richness)
- 分级生活听力与学术短讲总篇数 $\ge 80$ 篇；
- 每篇听力必须具备实体中英文字句、段落或逐句转写正文，严禁空标题卡片。

### 门禁 5：物理音频与图片防 0 字节损坏门禁 (Media Zero-Byte Protection)
- `public/audio/index.json` 索引条目 $\ge 15,000$ 条，与磁盘实际 `.mp3` 数量对齐；
- 严禁存在任何 `0 字节` 的损坏或空音频文件；
- 单词实物摄影图 $\ge 250$ 张，且抽检核心词实物图片体积 $> 5\text{ KB}$。

### 门禁 6：合规防倒流门禁 (Regulatory Purity Gate)
- 源码中严禁重新引入未成年人/贫困学生敏感信息收集、表单或字段（如 `aid_applications`、`贫困证明`、`助学申请`）；
- 严格遵循 App Store 3.1.2 标准订阅与恢复购买合规要求。

---

## 3. 物理执行命令
任何功能提交或版本打包前，必须执行以下验证命令：
```bash
# 专项目标穿透质检
bun run audit:content

# 全量单元与集成回归
bun test
```
任何一项门禁未通过，构建直接报错阻断，严禁带病发布。
