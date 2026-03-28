# Marvel's Personal Site — PRD

## 一、项目概述

| 项目 | 说明 |
|------|------|
| 产品名称 | Marvel's Universe（暂定） |
| 目标用户 | 公开访问，面向任何感兴趣的访客 |
| 核心价值 | 展示 Marvel 写的文章、感悟、Skill，打造个人品牌与知识沉淀平台 |
| 视觉风格 | 蜘蛛侠平行宇宙 / 超越宇宙画风（漫画描边、Ben-Day 网点、霓虹配色、RGB 故障） |
| 部署平台 | Vercel（免费托管，push 自动上线） |
| 主要语言 | 中文 |

---

## 二、内容结构

### 2.1 内容分类

| 分类 | 说明 | 来源 |
|------|------|------|
| 文章（Articles） | 有深度的长文、技术文章、调研报告 | workspace/Marvel/*.md |
| 感悟（Thoughts） | 短篇随想、日常反思、学习感悟 | 新写 |
| Skills | 介绍自己开发/使用的 Claude Skill | .claude/skills/ |
| 项目（Projects） | 个人项目展示（如 health-mp、周报系统） | workspace/Marvel/projects.md |

### 2.2 内容格式
- 所有内容用 **Markdown / MDX** 编写
- 文件存放在 `content/` 目录，按分类子目录组织
- 每篇内容有 frontmatter 元数据：

```yaml
---
title: "文章标题"
date: "2026-03-27"
category: "articles" # articles / thoughts / skills / projects
tags: ["AI", "Claude"]
summary: "一句话摘要"
cover: "/images/cover.jpg"  # 可选
---
```

---

## 三、页面结构

```
/ 首页
├── Hero 区域（个人介绍 + 蜘蛛宇宙风格大标题动画）
├── 最新内容（各分类最新 3 篇）
└── 分类入口卡片

/articles         文章列表
/articles/[slug]  文章详情

/thoughts         感悟列表
/thoughts/[slug]  感悟详情

/skills           Skill 列表
/skills/[slug]    Skill 详情

/projects         项目展示（卡片式）

/about            关于我
```

---

## 四、视觉设计规范

### 4.1 蜘蛛宇宙视觉语言

**配色（参考 Across the Spider-Verse）**
| 用途 | 色值 |
|------|------|
| 主色（霓虹红） | `#E63946` |
| 强调色（电光蓝） | `#457BFF` |
| 背景（深黑） | `#0A0A0F` |
| 文字（白） | `#F0F0F0` |
| 辅助（紫） | `#7B2FBE` |
| 网点底纹（灰） | `#1A1A2E` |

**视觉元素**
- **Ben-Day 网点**：背景、卡片装饰，使用 CSS 径向渐变模拟
- **粗描边**：所有卡片、按钮、标题文字加 2-4px 描边
- **RGB 故障效果**：Hover 时文字/图片触发 CSS 错位动画
- **漫画动作线**：Hero 区域放射状线条背景
- **手写/漫画字体**：标题用 Bangers（Google Fonts），正文用 Noto Sans SC
- **面板布局**：内容卡片用不规则倾斜（`rotate: -1deg` / `+1deg` 交错）
- **Pop-out 效果**：重要元素有轻微 3D 突出感（box-shadow 偏移）

### 4.2 动效
- 页面进入：内容块从下方弹入（Framer Motion）
- Hover：卡片 RGB 故障闪烁 + 轻微上浮
- 滚动：视差网点层
- 标题：打字机效果 + 间歇性故障闪烁

---

## 五、技术方案

### 5.1 技术栈

| 层 | 技术 |
|----|------|
| 框架 | Next.js 15（App Router） |
| 样式 | Tailwind CSS v4 |
| 内容 | MDX（next-mdx-remote 或 @next/mdx） |
| 动效 | Framer Motion |
| 字体 | Google Fonts（Bangers + Noto Sans SC） |
| 代码高亮 | rehype-pretty-code + Shiki |
| 部署 | Vercel |
| 包管理 | pnpm |

### 5.2 项目目录结构

```
personal-site/
├── app/
│   ├── page.tsx              # 首页
│   ├── articles/
│   │   ├── page.tsx          # 列表
│   │   └── [slug]/page.tsx   # 详情
│   ├── thoughts/...
│   ├── skills/...
│   ├── projects/page.tsx
│   ├── about/page.tsx
│   └── layout.tsx            # 全局布局 + 导航
├── content/
│   ├── articles/             # .mdx 文件
│   ├── thoughts/
│   ├── skills/
│   └── projects/
├── components/
│   ├── ui/                   # 基础组件（Card, Button...）
│   ├── layout/               # Nav, Footer
│   └── spider-verse/         # 专属视觉组件（HalftoneBackground, GlitchText...）
├── lib/
│   └── mdx.ts                # 读取/解析 MDX 内容
└── public/
    └── images/
```

### 5.3 关键组件

- `GlitchText` — 故障闪烁文字，CSS animation
- `HalftoneBackground` — Ben-Day 网点背景，CSS radial-gradient
- `ComicCard` — 漫画风内容卡片，带描边 + 倾斜 + pop-out shadow
- `ActionLines` — 放射状动作线，SVG
- `SpiderNav` — 顶部导航，蜘蛛网元素装饰

---

## 六、需要 Marvel 做的事

### 前置准备
- [ ] 注册 GitHub 账号（如已有则跳过）
- [ ] 注册 Vercel 账号（用 GitHub 登录即可）：https://vercel.com
- [ ] 本地安装 Node.js（v18+）：https://nodejs.org
- [ ] 本地安装 pnpm：`npm install -g pnpm`

### 内容准备（开发过程中随时）
- [ ] 整理 workspace/Marvel/ 下哪些文章可以发布
- [ ] 写一段"关于我"的介绍（50-200 字）
- [ ] 确定网站标题/Slogan（比如："Marvel's Universe / 穿越宇宙的代码"）

### 开发配合
- [ ] 每个阶段完成后，本地 `pnpm dev` 预览，确认视觉效果
- [ ] 导入第一批内容后确认中文排版
- [ ] 部署后验收线上效果

---

## 七、开发阶段

| Phase | 内容 | 产出 |
|-------|------|------|
| **Phase 1** | 项目初始化 + 全局样式 + 蜘蛛宇宙视觉系统 | 首页 Hero 效果可看 |
| **Phase 2** | 内容系统（MDX 读取 + 列表/详情页） | 文章可正常发布浏览 |
| **Phase 3** | 所有页面完整实现（Articles/Thoughts/Skills/Projects/About） | 完整站点 |
| **Phase 4** | 动效细化 + 响应式适配（手机端） | 体验打磨 |
| **Phase 5** | Vercel 部署 + 导入初始内容 | 上线 |
