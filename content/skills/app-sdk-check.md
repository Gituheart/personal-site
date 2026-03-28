---
title: "App SDK Check — 涂鸦 SDK 配置一键验证"
description: "自动检查 Android 项目的 AppKey、AppSecret、签名配置和安全 aar，缺失签名时自动创建并输出 SHA256。"
date: "2026-03-28"
tags: ["AI Agent", "Android", "涂鸦SDK", "自动化", "移动端"]
---

## 背景

在涂鸦 Android SDK 接入流程中，新工程经常出现同一类问题：AppKey/AppSecret 没填、签名未配置、安全文件漏放。每次排查都要手动打开多个文件逐个确认，繁琐且容易遗漏。

这个技能把这个排查流程自动化了。

---

## 它能做什么

按顺序执行以下检查，输出一份结构化报告（✅ 已配置 / ❌ 缺失）：

### 1. AppKey / AppSecret

检查 `gradle.properties` 中的 `TUYA_APP_KEY`、`TUYA_APP_SECRET`，或 `app/build.gradle.kts` 的 `manifestPlaceholders` 是否已配置。

### 2. 签名（signingConfigs）

检查 `app/build.gradle.kts` 是否存在 `signingConfigs` 块，并且 `release` buildType 是否引用了该配置。

**缺失时自动处理：** 创建 debug keystore，写入 `signingConfig`，并输出 SHA256，直接可以复制到涂鸦平台注册。

### 3. 安全 aar 文件

扫描 `app/src/main/assets/` 和 `app/libs/` 目录，查找 `security*.aar` 文件是否存在。

---

## 怎么触发

| 你说的话 | 它做的事 |
|---------|---------|
| "检查 AppKey / AppSecret / 签名 / 安全文件" | 全项检查 + 输出报告 |
| "app sdk check" | 同上 |
| "run app sdk check" | 同上 |
| "验证 SDK 配置" | 同上 |

---

## 配套技能

与 `app-sdk-info` 配合使用：先用 `app-sdk-check` 检查缺什么，再用 `app-sdk-info` 一次性填写所有配置。
