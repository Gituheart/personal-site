# 待实现想法

## 1. 内容来源

### 1a. 每日 AI 新闻自动抓取 + 推送
- 限定范围（来源白名单：如 X、HN、少数派、微信公众号等）
- 每日定时抓取，筛选质量
- 推送方式待定（企微 / 网站 / 邮件）
- 参考现有技能：`daily-news-report`

### 1b. 好文收藏自动同步到网站
- 看到好文 → 一键收藏 → 自动同步到 `/articles` 或新增 `/bookmarks` 页
- 可能方案：浏览器插件 / 企微机器人 / Telegram Bot → 写入 content/ → 触发重新部署
- 需要调研触发机制（Webhook + Vercel 自动部署）

## 2. 内容格式多端复用
- 目标：一份内容，多处可用
  - 网站直接展示
  - 内部分享（企微卡片 / 飞书文档）
  - 向上汇报（PPT / PDF / Word）
- 需要调研：Markdown → HTML / PPT / PDF 的转换方案
- 参考现有技能：`baoyu-markdown-to-html`、`pptx`、`docx`、`pdf`
- 关键点：统一样式主题，多端一致

## 3. 项目同步到网站
- `/projects` 页目前为空
- 待同步项目：
  - 健康小程序（health-mp）
  - 周报自动化系统
  - TicketClaw 质检技能
  - 本网站本身
- 方案：手动维护 `content/projects/` Markdown 文件，或从 GitHub README 自动拉取
