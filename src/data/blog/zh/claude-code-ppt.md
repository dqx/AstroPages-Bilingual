---
title: 使用 ClaudeCode 生成 PPT 方法大全
pubDatetime: 2026-03-24T00:00:00Z
description: 盘点当前使用 ClaudeCode 生成 PPT 的主流方案，从官方 Skill 到开源项目，总有一款适合你。
featured: true
draft: false
tags:
  - ClaudeCode
  - PPT
  - AI工具
  - 效率工具
---

## 用 ClaudeCode 生成 PPT？完全可以！

ClaudeCode 不只是写代码的工具。越来越多的人开始用它来生成PPT，从技术分享到商业提案，AI 生成的幻灯片质量已经相当实用。

本文盘点当前主流的几种方案，帮你找到最适合自己的方式。

---

## 方案一：官方 Skill（最快捷）

**适合人群**：想快速上手、不想折腾环境的用户

Anthropic 官方提供了 PPT 生成的 Skill，安装后直接在 ClaudeCode 中使用，无需额外配置前后端服务。

**使用方式**：

在 ClaudeCode 中安装官方 Skill，然后直接用自然语言描述你想要的 PPT 内容即可：

```bash
# 在 ClaudeCode 中
/ppt 帮我生成一份关于 AI 发展趋势的 10 页 PPT
```

优点是零门槛、开箱即用，适合临时需要、不想搭建额外服务的场景。

---

## 方案二：banana-slides（最流行）

**项目地址**：https://github.com/Anionex/banana-slides

**适合人群**：追求最佳效果、愿意本地部署的用户

这是目前最受欢迎的 ClaudeCode PPT 生成方案，star 数量领先同类项目。它采用前后端分离架构，生成效果精美，支持多种主题和布局。

**部署步骤**：

```bash
# 克隆项目
git clone https://github.com/Anionex/banana-slides
cd banana-slides

# 安装依赖并启动后端
cd backend
pip install -r requirements.txt
python main.py

# 新开终端，启动前端
cd frontend
npm install
npm run dev
```

启动后访问本地地址，配合 ClaudeCode 即可生成 PPT。

---

## 方案三：ppt-master

**项目地址**：https://github.com/hugohe3/ppt-master

**适合人群**：需要定制化功能的开发者

ppt-master 是另一个值得关注的开源项目，提供了更灵活的模板系统，适合有一定开发能力、希望深度定制 PPT 样式的用户。

---

## 方案四：NanoBanana PPT Skills

**项目地址**：https://github.com/op7418/NanoBanana-PPT-Skills

**适合人群**：Skill 形式的轻量化方案用户

NanoBanana 以 ClaudeCode Skill 的形式提供 PPT 生成能力，不需要启动独立服务，比完整的 banana-slides 更轻量。适合对生成效果要求适中、更看重便捷性的场景。

**安装方式**：按照项目说明将 Skill 添加到你的 ClaudeCode 配置中，即可在对话中直接调用。

---

## 方案五：SVG PPT 生成器（非主流）

**项目地址**：https://github.com/vigorX777/ppt-svg-generator

**适合人群**：需要对生成的PPT进行编辑的用户

这个方案通过生成 SVG 格式来实现幻灯片，可以通过将SVG 格式图片转换成形状，然后进行PPT编辑。

---

## 方案六：ApiYi NanoBanana Pro 指南

**参考地址**：https://help.apiyi.com/nano-banana-pro-ppt-creation-guide.html

如果你使用 ApiYi 的 API 服务，可以参考这份详细的 NanoBanana Pro 配置指南，里面涵盖了从 API 配置到实际生成的完整流程，对国内用户尤为友好。

---

## 方案七：在线网站（无需安装）

如果你不想折腾本地环境，也可以直接使用在线工具，一般先用ClaudeCode生成markdown格式的PPT大纲，然后上传PPT大纲给大模型

**国内推荐**：

- **Kimi 2.5**：月之暗面出品，国内访问流畅，支持中文 PPT 生成，效果出色，是目前国内最好用的 AI PPT 工具之一。

**国外推荐**：

- **Gamma**（https://gamma.app）：老牌 AI 演示文稿工具，界面美观，模板丰富，英文内容生成效果优秀。需要国际网络访问。

---

## 方案对比总结

| 方案              | 难度            | 效果 | 适用场景           |
| ----------------- | --------------- | ---- | ------------------ |
| 官方 Skill        | ⭐ 极简         | 中   | 快速生成、临时使用 |
| banana-slides     | ⭐⭐⭐ 需部署   | 高   | 追求效果、长期使用 |
| ppt-master        | ⭐⭐⭐ 需部署   | 高   | 深度定制需求       |
| NanoBanana Skills | ⭐⭐ 安装 Skill | 中高 | 轻量便捷           |
| SVG 生成器        | ⭐⭐ 安装 Skill | 特殊 | 矢量/特殊格式需求  |
| Kimi 2.5          | ⭐ 极简         | 高   | 国内用户、无需编程 |
| Gamma             | ⭐ 极简         | 高   | 英文内容、精美设计 |

---

## 推荐选择路径

- **第一次尝试**：直接用 Kimi 2.5 或 Gamma，零成本体验 AI 生成 PPT
- **ClaudeCode 用户**：先试官方 Skill，满意后再考虑 banana-slides 提升效果
- **开发者**：直接上 banana-slides 或 ppt-master，效果最佳
