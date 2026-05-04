import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../lib/auth';
import { prisma } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !['ADMIN', 'EDITOR'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status, reason } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 更新工具状态
    const tool = await prisma.tool.update({
      where: { id },
      data: { status },
    });

    // 记录审核日志
    await prisma.auditLog.create({
      data: {
        toolId: id,
        userId: session.user.id!,
        action: status,
        reason: reason || '',
      },
    });

    return NextResponse.json({ success: true, tool });
  } catch (error) {
    console.error('Approve API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}