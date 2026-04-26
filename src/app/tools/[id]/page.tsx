'use client';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { tools } from '../../../data/tools';

export default function ToolPage() {
  const params = useParams();
  const toolId = params.id as string;
  
  const tool = tools.find(t => t.id === toolId);
  
  if (!tool) {
    notFound();
  }

  const relatedTools = tools
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen pb-20">
      <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-xl bg-gradient-to-r from-[var(--accent)] to-pink-500 bg-clip-text text-transparent">
              AI Navigator
            </span>
          </Link>
          <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            ← 返回首页
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 flex items-center justify-center bg-[var(--bg-primary)] rounded-2xl text-5xl border border-[var(--border)] flex-shrink-0">
              {tool.logoEmoji}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                    {tool.name}
                  </h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium border ${
                      tool.pricing === '免费' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : tool.pricing === '免费增值'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {tool.pricing}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                      <span className="text-yellow-500">★</span>
                      {tool.rating} ({(tool.votes / 1000).toFixed(1)}k)
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

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-[var(--text-primary)]">标签</h2>
          <div className="flex flex-wrap gap-2">
            {tool.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-lg border border-[var(--border)] hover:border-[var(--accent)]/50 transition">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {relatedTools.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">相关工具</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedTools.map(relatedTool => (
                <Link key={relatedTool.id} href={`/tools/${relatedTool.id}`}>
                  <div className="p-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl hover:border-[var(--accent)]/50 transition group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{relatedTool.logoEmoji}</span>
                      <h3 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                        {relatedTool.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                      {relatedTool.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
