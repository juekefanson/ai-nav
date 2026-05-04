import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  // 验证 Secret 防止被恶意触发
  const authHeader = process.env.CRON_SECRET;
  // 实际部署时建议通过 Vercel Cron 的内置验证或 IP 白名单限制
  
  try {
    await execAsync('npx tsx src/scripts/scraper.ts');
    return NextResponse.json({ success: true, message: 'Scraping completed' });
  } catch (error) {
    console.error('Cron scrape failed:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}