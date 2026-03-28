---
title: "20 行代码彻底搞懂龙虾（OpenClaw）"
description: "AI Agent 到底是什么？飞天闪客用 20 行 Python 拆穿了所有神话：它就是一个大模型 API 加上一个命令执行循环。看完这篇，你会彻底理解 OpenClaw 的本质。"
date: "2026-03-28"
tags: ["AI Agent", "OpenClaw", "大模型", "Python", "视频笔记"]
---

最近"龙虾"（OpenClaw）火了。各种演示视频里，它帮你订外卖、写代码、操控电脑，看起来像科幻电影。

于是有人开始焦虑：AI 是不是真的要替代人了？这东西背后到底是什么黑魔法？

B 站 UP 主飞天闪客用一个 13 分钟的视频回答了这个问题：**20 行 Python，从零复刻一个 AI Agent。** 代码写完的那一刻，所有神秘感都消失了。

这篇文章是我看完视频后的完整梳理，加上自己的理解。

> **视频来源**：[飞天闪客 — 20 行代码彻底搞懂小龙虾](https://www.bilibili.com/video/BV19hwTzwETF/) | 时长 13:38

---

![title](/articles/openclaw-20-lines-explained/images/01_title.jpg)

## 结论先说：龙虾的本质

**大模型 API + 命令执行循环。**

就这两件事。Agent 程序本身一点都不聪明，它只是机械地把大模型的输出当命令执行，然后把结果反馈回去。真正"智能"的部分完全在大模型里，和 Agent 代码无关。

理解了这一点，下面的六步推导就是水到渠成。

---

## 第一步：调用大模型 API

![API调用](/articles/openclaw-20-lines-explained/images/02_api_call.jpg)

起点很简单：通过 OpenRouter 调用大模型（视频用的是 Claude Opus 4.6），几行代码实现一问一答。

```python
from openrouter import OpenRouter
with OpenRouter(api_key=os.getenv("OPENROUTER_API_KEY")) as client:
    response = client.chat.send(
        model="anthropic/claude-opus-4.6",
        messages=[{"role": "user", "content": "你好"}]
    )
    print(response.choices[0].message.content)
```

这一步没什么特别的。任何会用 API 的人都能写出来。

---

## 第二步：加上"记忆"

![无记忆问题](/articles/openclaw-20-lines-explained/images/03_no_memory.jpg)

大模型本身**没有记忆**。问完 `1+1=几`，再追问 `再加1呢`，它完全不知道上文说了什么。

解决方案极其朴素：每次调用时，把所有历史消息全部塞进 `messages` 列表一起发送。

```python
messages = []
while True:
    user_input = input("\n你: ")
    messages.append({"role": "user", "content": user_input})
    response = client.chat.send(model=..., messages=messages)
    reply = response.choices[0].message.content
    messages.append({"role": "assistant", "content": reply})
    print(reply)
```

所谓"记忆"，其实是每次对话都把账单重新报一遍。简单粗暴，但有效。

---

## 第三步：进化为 Agent — 核心！

![Agent循环](/articles/openclaw-20-lines-explained/images/04_agent_loop.jpg)

这一步是整个视频最关键的部分。

从"聊天机器人"变成"Agent"，只需要一个改变：**让大模型回复命令，程序去执行它。**

```
【你】提问
  → 【AI】回复命令
    → 【Agent】执行命令
      → 【AI】判断下一步
        → ... → 【AI】完成
```

判断逻辑极其简单：
- 回复以 `完成:` 开头 → 跳出循环，返回结果
- 回复以 `命令:` 开头 → 用 `os.popen()` 执行，把输出反馈给大模型

一个循环，两个分支，这就是 Agent。

---

## 第四步：精简后的完整代码

![完整Agent代码](/articles/openclaw-20-lines-explained/images/05_full_agent_code.jpg)

去掉格式化输出，核心逻辑只有 **15 行**：

```python
from openrouter import OpenRouter
import os
with OpenRouter(api_key=os.getenv("OPENROUTER_API_KEY")) as client:
    messages = [{"role": "system", "content": open("Agent.md", "r").read()}]
    while True:
        user_input = input("\n [你] ")
        messages.append({"role": "user", "content": user_input})
        while True:
            response = client.chat.send(model="openai/gpt-5.4", messages=messages)
            reply = response.choices[0].message.content
            messages.append({"role": "assistant", "content": reply})
            if reply.strip().startswith("完成:"):
                break
            command_result = os.popen(reply.strip().split("命令:")[1].strip()).read()
            messages.append({"role": "user", "content": f"执行完毕 {command_result}"})
```

看到这里，龙虾的神秘感基本归零。

---

## 第五步：安装"技能"

![技能系统](/articles/openclaw-20-lines-explained/images/06_skills.jpg)

大模型不知道 `yt-dlp` 这个命令是干嘛的？把使用说明写进 `SKILL.md`，拼到系统提示词里就行了：

```python
agentmd = open("Agent.md", "r").read()
skillmd = open("SKILL.md", "r").read()
messages = [{"role": "system", "content": agentmd + skillmd}]
```

视频里有一句话，我觉得说到了点上：

> **"为什么有人的龙虾什么都不会，有人装了一堆 Skill 就变得很厉害——你只是提前把操作说明告诉它而已。不是它厉害，而是你厉害。"**

Agent 的能力上限 = 大模型的基础能力 + 你预置了多少使用说明。这个框架本身不产生智能。

---

## 第六步：加个 HTTP 服务和漂亮 UI

![HTTP服务](/articles/openclaw-20-lines-explained/images/07_http_service.jpg)

用 Flask 启动本地 HTTP 服务，手机浏览器访问就能远程控制。加上一个虚拟龙虾形象的前端页面，一个看起来"正式"的消费级产品就出来了。

核心逻辑一行没变，只是换了输入方式。

---

## 总结：一条依赖链

![总结](/articles/openclaw-20-lines-explained/images/08_summary.jpg)

```
Claw（龙虾） > Agent > 大模型 > 提示词
```

龙虾的所有能力，都沿着这条链路往下找。Agent 是皮，大模型是肉，提示词和 Skill 是骨架。

---

## 我的几点感受

**命令是万能的抽象。** 读写文件、启动服务、下载视频、调用远程 API——理论上，世界上一切操作都可以用命令表示。Agent 不理解命令的含义，只是执行。这是它的局限，也是它的优势。

**安全风险是真实的。** 视频演示了通过提示词注入让 Agent 执行危险命令。Agent 毫不犹豫，因为它根本不理解命令含义。把执行权交给一个"不理解"的执行者，这件事值得认真对待。

**龙虾加速的是接口化进程。** 架构本身没问题，真正的瓶颈是：世界上有多少操作已经被命令化、接口化了？这需要漫长的演化。龙虾最大的价值可能不是替代人，而是加速推动更多系统暴露出可调用的接口。

看完这个视频，我的焦虑少了很多。不是因为 AI 不厉害，而是因为我搞清楚了它到底在哪里厉害、在哪里不厉害。
