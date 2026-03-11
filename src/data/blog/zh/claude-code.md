---
title: 国内安装ClaudeCode
pubDatetime: 2026-03-10T00:00:00Z
description: Windows、MacOS等系统如何安装ClaudeCode
featured: true
draft: false
tags:
  - ClaudeCode
  - Windows安装ClaudeCode
  - Mac安装ClaudeCode
---

## Windows 安装 ClaudeCode

由于 Claude 官方限制，国内无法直接通过官网安装和使用 ClaudeCode。本文介绍在国内如何安装 ClaudeCode。

### 准备工作

- 已安装 **Windows PowerShell**（Windows 10/11 自带）

### 安装步骤

#### 1. 下载并安装 Git Bash

下载地址：https://git-scm.com/install/windows

根据自己的电脑配置下载合适的版本，然后点击安装，选择默认配置直接安装即可。

#### 2. 下载并安装 Node.js

下载地址：https://nodejs.org/zh-cn/download

根据自己的电脑配置下载合适的版本（推荐 LTS 版本），然后点击安装。

**验证安装**：安装完成后，打开 PowerShell 运行以下命令验证：

```bash
node --version
npm --version
```

#### 3. 安装 ClaudeCode

打开 PowerShell，运行以下命令安装 ClaudeCode：

```bash
npm install -g @anthropic-ai/claude-code
```

等待安装完成。如果遇到网络问题，可以尝试使用国内镜像源：

```bash
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

#### 4. 下载并安装 CC Switch（可选）

ClaudeCode 可以对接不同的大模型，为了方便配置和切换不同的大模型，可以使用软件 CC Switch。

下载地址：https://github.com/farion1231/cc-switch/releases

Windows 推荐下载 `.msi` 格式的安装包。

安装后打开 CC Switch 并配置 API 地址和 API key，详细配置可参考 [CC Switch 配置](https://docs.gemai.cc/dev-tools/ccswitch)

#### 5. 调整 Windows PowerShell 安全策略

以管理员身份打开 PowerShell：

![以管理员身份打开PowerShell](@/assets/images/powershell.png)

输入以下命令并确认：

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

当提示是否更改执行策略时，输入 `Y` 并回车。

#### 6. 验证与首次启动

打开新的 PowerShell 窗口，运行以下命令验证安装：

```bash
claude --version
```

如果显示版本号，说明安装成功。

**首次使用**：

1. 进入你的项目目录：

```bash
cd your-project-path
```

2. 运行 `claude` 命令进行首次授权：

```bash
claude
```

## MacOS 安装 ClaudeCode

### 准备工作

- **操作系统**：macOS 10.15 或更高版本

### 安装方法

打开你的终端（Terminal），任选一种方式安装：

#### 方法一：官方脚本安装（推荐）

这是官方推荐的方式，最为简单直接，并且支持自动更新。

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**注意**：国内用户可能需要配置代理才能访问。

#### 方法二：Homebrew 安装

如果你是 Homebrew 用户，可以方便地通过 Cask 安装。

```bash
brew install --cask claude-code
```

#### 方法三：NPM 全局安装

如果你的开发环境依赖 Node.js，通过 npm 安装是常用选择。

```bash
npm install -g @anthropic-ai/claude-code
```

如果遇到网络问题，可以使用国内镜像源：

```bash
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

### 下载并安装 CC Switch（可选）

ClaudeCode 可以对接不同的大模型，为了方便配置和切换不同的大模型，可以使用软件 CC Switch。

下载地址：https://github.com/farion1231/cc-switch/releases

MacOS 推荐下载 `.dmg` 格式的安装包。

安装后打开 CC Switch 并配置 API 地址和 API key，详细配置可参考 [CC Switch 配置](https://docs.gemai.cc/dev-tools/ccswitch)

### 验证与首次启动

**验证安装**：

运行以下命令验证安装：

```bash
claude --version
```

如果能成功显示版本号，则表示安装成功。

**首次使用**：

1. 进入你的项目目录：

```bash
cd your-project-path
```

2. 运行 `claude` 命令：

```bash
claude
```

## 常见问题

### 1. 命令找不到（command not found）

**Windows**：

- 确保已重启 PowerShell 窗口
- 检查 Node.js 是否正确安装：`node --version`
- 检查环境变量配置是否正确，如 PATH 环境变量是否包含 npm 全局安装路径

**MacOS**：

- 运行 `source ~/.zshrc` 或 `source ~/.bash_profile` 重新加载配置

### 2. 网络连接问题

如果安装过程中遇到网络超时或连接失败：

- 使用国内 npm 镜像源（见上文安装步骤）
- 配置代理或使用 VPN
- 尝试切换网络环境

### 3. 权限问题

**Windows**：

- 确保以管理员身份运行 PowerShell并修改安全策略
- 检查执行策略是否已正确设置

**MacOS**：

- 如果遇到权限错误，可能需要使用 `sudo`：
  ```bash
  sudo npm install -g @anthropic-ai/claude-code
  ```

### 4. API Key 配置

首次使用前需要配置 API Key：

- 如果使用 CC Switch，按照 CC Switch 的配置说明进行设置
- API Key 配置后会保存在本地，无需每次输入

## 下一步

安装完成后，你可以：

- 查看帮助文档：`claude --help`
- 在项目中使用：`cd your-project && claude`
- 了解更多功能：访问 [Claude Code 官方文档](https://docs.anthropic.com/claude/docs)

祝你使用愉快！
