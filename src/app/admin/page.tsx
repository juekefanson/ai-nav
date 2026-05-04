import { prisma } from '../../../lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

export default async function AdminDashboard() {
  const [totalTools, pendingTools, approvedTools, totalClicks] = await Promise.all([
    prisma.tool.count(),
    prisma.tool.count({ where: { status: 'PENDING' } }),
    prisma.tool.count({ where: { status: 'APPROVED' } }),
    prisma.affiliateClick.count(),
  ]);
  
  const recentTools = await prisma.tool.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      submittedUser: {
        select: { name: true, email: true },
      },
    },
  });
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">仪表盘</h1>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">总工具数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTools}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-yellow-600">待审核</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pendingTools}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-green-600">已通过</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{approvedTools}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-blue-600">联盟点击</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalClicks}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* 最近提交 */}
      <Card>
        <CardHeader>
          <CardTitle>最近提交的工具</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTools.map((tool) => (
              <div key={tool.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{tool.name}</h3>
                  <p className="text-sm text-gray-500">{tool.submittedUser?.email || '未知用户'}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  tool.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                  tool.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {tool.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
