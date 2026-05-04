import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { toolId } = await req.json();
    const headersList = headers();
    
    // 获取客户端信息
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const userAgent = headersList.get('user-agent') || '';
    const referer = headersList.get('referer') || '';

    // 记录点击
    await prisma.affiliateClick.create({
      data: {
        toolId,
        ipAddress: ip,
        userAgent,
        referer,
      },
    });

    // 增加工具点击数
    await prisma.tool.update({
      where: { id: toolId },
      data: { clicks: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Affiliate Click API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}