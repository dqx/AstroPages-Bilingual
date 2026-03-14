#!/usr/bin/env node

/**
 * Telegram Channel to Blog Sync Script
 *
 * 从 Telegram 私有频道获取消息并生成博客文章
 *
 * 环境变量：
 * - TELEGRAM_BOT_TOKEN: Bot Token (从 @BotFather 获取)
 * - TELEGRAM_CHANNEL_ID: 频道 ID (格式: @channel_name 或 -100xxxxxxxxxx)
 * - DAYS_BACK: 获取多少天前的消息 (默认: 7)
 */

import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ProxyAgent, setGlobalDispatcher } from 'undici';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 自动检测并应用代理设置
const proxyUrl = process.env.https_proxy || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.HTTP_PROXY;
if (proxyUrl) {
  setGlobalDispatcher(new ProxyAgent(proxyUrl));
  console.log(`🔌 使用代理: ${proxyUrl}`);
}

// 配置
const CONFIG = {
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  channelId: process.env.TELEGRAM_CHANNEL_ID,
  daysBack: parseInt(process.env.DAYS_BACK || '7', 10),
  welcomeFile: join(__dirname, '../src/data/blog/zh/welcome.md'),
  language: process.env.LANGUAGE || 'zh', // zh 或 en
  maxTableRows: 5, // 表格最大行数
  // VPN 订阅相关关键词
  keywords: [
    '订阅链接',
    '订阅流量',
    '已用上行',
    '已用下行',
    '剩余流量',
    '到期时间',
    '剩余时间',
  ],
};

// 验证配置
function validateConfig() {
  if (!CONFIG.botToken) {
    console.error('❌ 错误: 未设置 TELEGRAM_BOT_TOKEN 环境变量');
    process.exit(1);
  }
  if (!CONFIG.channelId) {
    console.error('❌ 错误: 未设置 TELEGRAM_CHANNEL_ID 环境变量');
    process.exit(1);
  }
  console.log('✅ 配置验证通过');
  console.log(`🔍 关键词过滤: ${CONFIG.keywords.join(', ')}`);
}

// 检查消息是否包含关键词
function containsKeywords(text) {
  if (!text) return false;
  return CONFIG.keywords.some(keyword => text.includes(keyword));
}

// Telegram API 请求
async function telegramRequest(method, params = {}) {
  const url = `https://api.telegram.org/bot${CONFIG.botToken}/${method}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  if (!data.ok) {
    throw new Error(`Telegram API 错误: ${data.description}`);
  }
  return data.result;
}

// 获取频道消息
async function getChannelMessages() {
  console.log(`📡 正在获取频道 ${CONFIG.channelId} 的消息...`);

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - CONFIG.daysBack);
  const cutoffTimestamp = Math.floor(cutoffDate.getTime() / 1000);

  const messages = [];
  let offset = 0;
  const limit = 100;

  try {
    // 获取频道信息
    const chat = await telegramRequest('getChat', {
      chat_id: CONFIG.channelId,
    });
    console.log(`✅ 频道名称: ${chat.title || chat.username}`);

    // 获取最近的消息
    // 注意: Bot 只能读取它作为管理员后发送的消息
    const updates = await telegramRequest('getUpdates', {
      offset: offset,
      limit: limit,
      allowed_updates: ['channel_post'],
    });

    for (const update of updates) {
      if (update.channel_post) {
        const post = update.channel_post;
        const postDate = post.date;
        const text = post.text || post.caption || '';

        // 过滤：只保留包含关键词的消息
        if (postDate >= cutoffTimestamp && containsKeywords(text)) {
          messages.push({
            id: post.message_id,
            date: new Date(postDate * 1000),
            text: text,
            entities: post.entities || [],
            media: post.photo || post.video || post.document || null,
          });
        }
      }
    }

    console.log(`✅ 获取到 ${messages.length} 条包含关键词的消息`);
    return messages;
  } catch (error) {
    console.error('❌ 获取消息失败:', error.message);
    throw error;
  }
}

// 从消息文本中解析表格字段
// 消息格式示例：
// 订阅链接: https://...
// 订阅流量: 1000 GB
// 已用上行: 0 B
// 已用下行: 0 B
// 剩余流量: 1000 GB
// 到期时间: 2026-04-13 18:57:29
// 剩余时间: 30天 23小时 59分钟
function parseMessageToRow(text) {
  const fields = {
    '订阅链接': '',
    '订阅流量': '',
    '已用上行': '',
    '已用下行': '',
    '剩余流量': '',
    '到期时间': '',
    '剩余时间': '',
  };

  for (const key of Object.keys(fields)) {
    // 匹配 "key: value" 或 "key：value"（支持中英文冒号）
    const match = text.match(new RegExp(`${key}[：:][\\s]*([^\\n]+)`));
    if (match) {
      fields[key] = match[1].trim();
    }
  }

  // 如果没有解析到订阅链接，说明消息格式不符合预期
  if (!fields['订阅链接']) {
    return null;
  }

  return `| ${fields['订阅链接']} | ${fields['订阅流量']} | ${fields['已用上行']} | ${fields['已用下行']} | ${fields['剩余流量']} | ${fields['到期时间']} | ${fields['剩余时间']} |`;
}

// 更新 welcome.md 中的免费机场列表表格
function updateWelcomeTable(newRows) {
  if (!existsSync(CONFIG.welcomeFile)) {
    console.error(`❌ 文件不存在: ${CONFIG.welcomeFile}`);
    return;
  }

  const content = readFileSync(CONFIG.welcomeFile, 'utf-8');
  const lines = content.split('\n');

  // 找到表格头部（含"订阅链接"的行）和分隔符行
  const headerIndex = lines.findIndex(line => line.includes('| 订阅链接'));
  if (headerIndex === -1) {
    console.error('❌ 未找到免费机场列表表格');
    return;
  }

  const separatorIndex = headerIndex + 1;
  const firstDataIndex = separatorIndex + 1;

  // 收集当前所有数据行（直到空行或非表格行）
  let dataRows = [];
  let i = firstDataIndex;
  while (i < lines.length && lines[i].startsWith('|')) {
    dataRows.push(lines[i]);
    i++;
  }

  // 将新行插入到最前面
  for (const row of newRows) {
    dataRows.unshift(row);
  }

  // 截断到最大行数
  dataRows = dataRows.slice(0, CONFIG.maxTableRows);

  // 重建文件内容
  const updatedLines = [
    ...lines.slice(0, firstDataIndex),
    ...dataRows,
    ...lines.slice(firstDataIndex + (i - firstDataIndex)),
  ];

  const updatedContent = updatedLines.join('\n').replace(
    /pubDatetime:\s*.+/,
    `pubDatetime: ${new Date().toISOString()}`
  );
  writeFileSync(CONFIG.welcomeFile, updatedContent, 'utf-8');
  console.log(`✅ 已更新表格，当前共 ${dataRows.length} 行数据`);
  console.log(`✅ 已更新 pubDatetime: ${new Date().toISOString()}`);
}

// 主函数
async function main() {
  console.log('🚀 Telegram 频道同步脚本启动\n');

  validateConfig();

  try {
    // 获取消息
    const messages = await getChannelMessages();

    if (messages.length === 0) {
      console.log('\n✅ 没有符合条件的消息，无需更新');
      return;
    }

    // 解析每条消息为表格行
    const newRows = [];
    for (const msg of messages) {
      const row = parseMessageToRow(msg.text);
      if (row) {
        newRows.push(row);
        console.log(`✅ 解析消息 #${msg.id} 成功`);
      } else {
        console.warn(`⚠️  消息 #${msg.id} 格式不符合预期，已跳过`);
      }
    }

    if (newRows.length === 0) {
      console.log('\n⚠️  没有可解析的消息行，无需更新');
      return;
    }

    // 更新 welcome.md 表格
    updateWelcomeTable(newRows);

    console.log('\n✅ 同步完成！');
    console.log(`📊 新增行数: ${newRows.length} 条`);
    console.log(`📁 文件路径: ${CONFIG.welcomeFile}`);

  } catch (error) {
    console.error('\n❌ 同步失败:', error.message);
    process.exit(1);
  }
}

// 运行
main();
