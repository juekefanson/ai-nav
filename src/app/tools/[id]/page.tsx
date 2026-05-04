import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/db';
import type { Metadata } from 'next';

// 🔹 1. 动态生成 JSON-LD 数据
function generateToolJsonLd(tool: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.metaDesc || tool.description,
    url: tool.url,
    applicationCategory: 'AIApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: tool.priceTier === 'free' ? '0' : '10',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating?.toString() || '4.5',
      ratingCount: tool.votes?.toString() || '100',
    },
  };
}

// 🔹 2. Next.js 动态 Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const tool = await prisma.tool.findUnique({ 
    where: { id: params.id } 
  });
  
  if (!tool) return { title: '工具未找到 - Aigood' };

  return {
    title: `${tool.name} - AI工具评测 | Aigood`,
    description: tool.metaDesc || tool.description.slice(0, 155),
  };
}

// 🔹 3. 页面主组件
export default async function ToolDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const tool = await prisma.tool.findUnique({ 
    where: { id: params.id } 
  });

  if (!tool) notFound();

  const jsonLd = generateToolJsonLd(tool);

  return (
    <>
      {/* 🟢 注入 JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 页面内容 */}
      <main className="min-h-screen pb-20 bg-[var(--bg-primary)]">
        {/* 导航栏 */}
        <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span className="font-bold text-xl bg-gradient-to-r from-[var(--accent)] to-pink-500 bg-clip-text text-transparent">
                Aigood
              </span>
            </a>
            <a href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              ← 返回首页
            </a>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* 工具卡片 */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo */}
              <div className="w-24 h-24 flex items-center justify-center bg-[var(--bg-primary)] rounded-2xl text-5xl border border-[var(--border)] flex-shrink-0">
                {tool.logoEmoji || '🤖'}
              </div>
              
              {/* 信息 */}
              <div className="flex-grow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                      {tool.name}
                    </h1>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium border ${
                        tool.priceTier === 'free' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : tool.priceTier === 'freemium'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      }`}>
                        {tool.pricing || tool.priceTier}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                        <span className="text-yellow-500">★</span>
                        {tool.rating} ({Math.floor(tool.votes / 1000)}k)
                      </span>
                    </div>
                  </div>
                  
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-medium hover:bg-[var(--accent-hover)] transition shadow-lg shadow-[var(--accent)]/25"
                  >
                    访问官网 ↗
                  </a>
                </div>
                
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>
          </div>

          {/* 标签 */}
          {tool.tags && tool.tags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 text-[var(--text-primary)]">标签</h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-lg border border-[var(--border)]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
