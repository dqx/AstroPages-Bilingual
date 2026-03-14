# Telegram 频道同步配置说明

## 整体流程

```
Telegram 群组
  → 手动转发消息到你的私有频道
    → Bot 作为频道管理员读取消息
      → GitHub Actions 每周执行脚本
        → 生成 Markdown 文章
          → 自动 commit & push
            → Cloudflare Pages 自动部署
```

## 第一步：创建 Telegram Bot

1. 打开 Telegram，搜索 `@BotFather`
2. 发送 `/newbot`，按提示设置 Bot 名称
3. 保存返回的 **Bot Token**（格式：`123456789:ABCdefGHI...`）

## 第二步：创建私有频道

1. 在 Telegram 创建一个新频道（私有）
2. 将 Bot 添加为频道**管理员**（需要"发布消息"权限）
3. 获取频道 ID：
   - 方法一：将频道设为公开，频道 ID 即 `@channel_username`
   - 方法二：转发一条频道消息给 `@userinfobot`，获取数字 ID（格式：`-100xxxxxxxxxx`）

## 第三步：配置 GitHub Secrets

在 GitHub 仓库 → Settings → Secrets and variables → Actions 中添加：

| Secret 名称 | 值 |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot Token（从 BotFather 获取） |
| `TELEGRAM_CHANNEL_ID` | 频道 ID（如 `@mychannel` 或 `-100123456789`） |

## 第四步：日常使用

每次想要同步内容时：
1. 在原始 Telegram 群组中找到想要发布的消息
2. 转发到你的私有频道
3. 等待每周日自动执行，或手动触发 GitHub Actions

**手动触发**：
GitHub 仓库 → Actions → Telegram Weekly Sync → Run workflow

## 脚本参数说明

| 环境变量 | 说明 | 默认值 |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot Token | 必填 |
| `TELEGRAM_CHANNEL_ID` | 频道 ID | 必填 |
| `DAYS_BACK` | 获取多少天前的消息 | `7` |
| `LANGUAGE` | 文章语言（`zh` 或 `en`） | `zh` |

## 本地测试

```bash
# 设置环境变量
export TELEGRAM_BOT_TOKEN="your_bot_token"
export TELEGRAM_CHANNEL_ID="@your_channel"
export DAYS_BACK=7

# 运行脚本
node scripts/fetch-telegram.js
```
