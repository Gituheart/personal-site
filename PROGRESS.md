# Marvel's Personal Site — PROGRESS

## 当前状态：Phase 0 — 准备阶段

---

## Phase 0 — 环境准备
> 目标：确认本地开发环境就绪，GitHub + Vercel 账号准备好

- [ ] Node.js v18+ 安装确认
- [ ] pnpm 安装确认（`npm install -g pnpm`）
- [ ] GitHub 账号就绪
- [ ] Vercel 账号就绪（用 GitHub 登录）
- [ ] 确定网站标题 / Slogan

**前置完成后开始 Phase 1。**

---

## Phase 1 — 项目初始化 + 视觉系统
> 目标：跑起来能看到蜘蛛宇宙风格的首页 Hero

- [ ] Next.js 15 项目初始化（pnpm create next-app）
- [ ] Tailwind CSS v4 配置
- [ ] Google Fonts 接入（Bangers + Noto Sans SC）
- [ ] 全局颜色变量定义（霓虹红/电光蓝/深黑/紫）
- [ ] `HalftoneBackground` 组件（Ben-Day 网点）
- [ ] `GlitchText` 组件（RGB 故障文字）
- [ ] `ActionLines` 组件（放射状动作线 SVG）
- [ ] `SpiderNav` 顶部导航
- [ ] 首页 Hero 区域完整实现
- [ ] Vercel 初次部署（验证 CI/CD 流程）

---

## Phase 2 — 内容系统
> 目标：能写 MDX 文章，能在网站上正常显示

- [ ] MDX 依赖安装与配置（@next/mdx + rehype-pretty-code）
- [ ] `lib/mdx.ts` 内容读取工具函数
- [ ] content/ 目录结构建立
- [ ] 文章列表页（/articles）
- [ ] 文章详情页（/articles/[slug]）
- [ ] 漫画风内容卡片组件 `ComicCard`
- [ ] 写入第一篇测试文章，验证渲染效果

---

## Phase 3 — 完整页面
> 目标：所有页面可访问

- [ ] Thoughts 列表 + 详情页
- [ ] Skills 展示页（卡片式，突出 Skill 名称和描述）
- [ ] Projects 展示页
- [ ] About 页面
- [ ] 首页最新内容区域（各分类最新 3 篇）
- [ ] 首页分类入口卡片
- [ ] 404 页面（蜘蛛侠风格彩蛋）

---

## Phase 4 — 体验打磨
> 目标：动效流畅，手机端好看

- [ ] Framer Motion 页面进入动画
- [ ] 卡片 Hover 故障效果
- [ ] 响应式适配（移动端导航 + 卡片布局）
- [ ] 内容页中文排版优化（行高/字距/引用样式）
- [ ] 代码块样式（黑色主题）
- [ ] 滚动视差网点层

---

## Phase 5 — 上线
> 目标：正式上线，导入初始内容

- [ ] 从 workspace/Marvel/ 整理并导入初始文章
- [ ] About 页面内容填充
- [ ] SEO 基础配置（title/description/og:image）
- [ ] Vercel 正式部署地址确认
- [ ] 分享链接验收

---

## 决策记录

| 日期 | 决策 | 原因 |
|------|------|------|
| 2026-03-27 | 选用 Next.js 15 + MDX | 内容友好，可扩展，Vercel 原生支持 |
| 2026-03-27 | 蜘蛛宇宙视觉风格 | Marvel 个人偏好，差异化强 |
| 2026-03-27 | 暂不购买域名 | 先上线验证，后续再绑定 |

---

## 踩坑记录

（开发过程中持续更新）
