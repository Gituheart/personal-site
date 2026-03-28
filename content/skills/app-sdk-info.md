---
title: "App SDK Info — 涂鸦 SDK 配置自动填写"
description: "把你粘贴的包名、AppKey、AppSecret、签名、安全文件路径，一次性写入 Android 项目的所有相关文件，告别手动改多处。"
date: "2026-03-28"
tags: ["AI Agent", "Android", "涂鸦SDK", "自动化", "移动端"]
---

## 背景

涂鸦 SDK 接入时，一套配置信息需要写入至少三个地方：`gradle.properties`、`app/build.gradle.kts` 的 manifestPlaceholders、安全文件的放置位置。每次都要手动对应，容易漏写或写错位置。

这个技能的逻辑很简单：**你把配置信息粘贴给 AI，它自动帮你写到所有该写的地方。**

---

## 支持的配置项

| 配置项 | 常见写法 | 写入位置 |
|--------|----------|----------|
| 包名 | package、applicationId、包名 | `app/build.gradle.kts` |
| AppKey | AppKey、APP_KEY、应用 Key | `gradle.properties` + manifestPlaceholders |
| AppSecret | AppSecret、SECRET、应用密钥 | `gradle.properties` + manifestPlaceholders |
| 签名 | SHA256、证书、keystore、签名 | `signingConfigs` + release buildType |
| 安全文件 | security.aar、安全组件、security-algorithm.aar | `app/libs/` |

---

## 怎么用

直接把涂鸦平台上复制来的配置信息粘贴到对话里，技能会识别其中的配置项并自动写入：

```
包名：com.example.myapp
AppKey：xxxxxxxxxxxxxxxx
AppSecret：xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SHA256：AA:BB:CC:...
```

技能会自动判断哪些字段已有值（不覆盖），哪些缺失（填入）。

---

## 触发方式

| 你说的话 | 它做的事 |
|---------|---------|
| 粘贴包含 AppKey/AppSecret 的文本 | 识别并写入对应位置 |
| "填写 SDK 配置" | 引导你提供配置信息 |
| "配置 app-sdk-info" | 同上 |

---

## 配套技能

填写完后，用 `app-sdk-check` 做一次验证，确认所有配置项都已到位。
