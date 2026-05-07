import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function AffiliatesPage() {
  const totalClicks = await prisma.affiliateClick.count();
  // TODO: track actual commission - commission field added but calculation depends on affiliate program setup
  const totalCommission = { _sum: { commission: null } };


  const recentClicks = await prisma.affiliateClick.findMany({
    take: 20,
    orderBy: { clickedAt: 'desc' },
    include: {
      tool: { select: { name: true } },
    },
  });

  const toolStats = await prisma.tool.findMany({
    select: { name: true, clicks: true },
    orderBy: { clicks: 'desc' },
    take: 10,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">联盟追踪</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-gray-500">总点击数</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold">{totalClicks}</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-gray-500">预估佣金</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-green-600">¥{(totalCommission._sum.commission || 0).toFixed(2)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium text-gray-500">转化率</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-bold text-blue-600">2.5%</div></CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>工具点击排行 Top 10</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>工具名称</TableHead><TableHead>点击数</TableHead><TableHead>联盟链接</TableHead></TableRow></TableHeader>
              <TableBody>
                {toolStats.map((tool) => (
                  <TableRow key={tool.name}>
                    <TableCell className="font-medium">{tool.name}</TableCell>
                    <TableCell>{tool.clicks}</TableCell>
                    <TableCell className="text-xs text-gray-500">-</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>最近点击记录</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>工具</TableHead><TableHead>时间</TableHead><TableHead>来源</TableHead></TableRow></TableHeader>
              <TableBody>
                {recentClicks.map((click) => (
                  <TableRow key={click.id}>
                    <TableCell className="font-medium">{click.tool.name}</TableCell>
                    <TableCell>{new Date(click.clickedAt).toLocaleString('zh-CN')}</TableCell>
                    <TableCell className="text-xs text-gray-500 truncate max-w-[150px]">{click.referer || '直接访问'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
