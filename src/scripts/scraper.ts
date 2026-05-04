// src/scripts/scraper.ts
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import path from 'path';

// 1. 加载项目根目录的 .env 文件
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const prisma = new PrismaClient();

// 2. 工具函数：生成 slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-') // 保留中文、字母、数字
    .replace(/(^-|-$)/g, '');              // 去除首尾连字符
}

// 3. 主采集逻辑（以 ProductHunt RSS 为例）
async function runScraper() {
  console.log('🚀 开始采集 AI 工具数据...');
  
  try {
    // 使用 RSS 采集（稳定、无反爬、适合自动化）
    const rssUrl = 'https://www.producthunt.com/front-page/rss';
    const response = await fetch(rssUrl);
    const xml = await response.text();
    const $ = cheerio.load(xml, { xmlMode: true });

    const items = $('item').toArray().slice(0, 15); // 每次采集 15 条
    let addedCount = 0;

    for (const item of items) {
      const title = $(item).find('title').text().trim();
      const link = $(item).find('link').text().trim();
      const description = $(item).find('description').text().replace(/<[^>]*>/g, '').trim();

      // 简单过滤：只采集含 AI 关键词的工具
      if (!/ai|artificial|machine learning|llm|gpt|stable diffusion/i.test(title + description)) {
        continue;
      }

      // 防重复：检查 name 或 url 是否已存在
      const exists = await prisma.tool.findFirst({
        where: { OR: [{ name: title }, { url: link }] },
      });

      if (!exists) {
        await prisma.tool.create({
          data: {
            name: title,
            slug: generateSlug(title),
            description: description.substring(0, 300),
            url: link,
            category: 'uncategorized',
            priceTier: 'free',
            tags: ['auto-imported', 'rss'],
            status: 'PENDING', // 采集入库默认待审核
            metaTitle: title,
            metaDesc: description.substring(0, 155),
          },
        });
        console.log(`✅ 已收录: ${title}`);
        addedCount++;
      }
    }

    console.log(`\n🎉 采集完成！本次新增 ${addedCount} 个工具`);
  } catch (error) {
    console.error('❌ 采集失败:', error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

// 执行
runScraper();