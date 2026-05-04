import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session) {
    redirect('/admin/login');
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });
  
  if (!user || user.role === 'VIEWER') {
    redirect('/');
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 侧边栏 */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Aigood 后台</h1>
          <p className="text-sm text-gray-500 mt-1">{user.role}</p>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link 
            href="/admin" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            📊 仪表盘
          </Link>
          <Link 
            href="/admin/tools" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            🛠️ 工具管理
          </Link>
          <Link 
            href="/admin/affiliates" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            💰 联盟追踪
          </Link>
          <Link 
            href="/admin/analytics" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            📈 数据分析
          </Link>
          <Link 
            href="/" 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            🌐 查看网站
          </Link>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <form action="/api/auth/signout" method="post">
            <button 
              type="submit"
              className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-left"
            >
              退出登录
            </button>
          </form>
        </div>
      </aside>
      
      {/* 主内容区 */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
