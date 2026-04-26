import Link from 'next/link';
import { Tool } from '@/data/tools';

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.id}`}>
      <div className="group relative flex flex-col h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--accent)]/50 hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all duration-300 hover:-translate-y-1">
        
        {/* 顶部：图标 + 名称 + 价格标签 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center bg-[var(--bg-primary)] rounded-xl text-2xl border border-[var(--border)] group-hover:scale-110 transition-transform">
              {tool.logoEmoji}
            </div>
            <div>
              <h3 className="font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {tool.name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                {/* 星星评分 */}
                <span className="text-yellow-500 text-sm">★</span>
                <span className="text-sm font-medium text-[var(--text-primary)]">{tool.rating}</span>
                <span className="text-xs text-[var(--text-secondary)]">({(tool.votes / 1000).toFixed(1)}k)</span>
              </div>
            </div>
          </div>
          
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
            tool.pricing === '免费' 
              ? 'bg-green-500/10 text-green-400 border-green-500/20' 
              : tool.pricing === '免费增值'
              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
              : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
          }`}>
            {tool.pricing}
          </span>
        </div>

        {/* 描述 */}
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 flex-grow">
          {tool.description}
        </p>

        {/* 底部：标签 + 访问按钮 */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]/50">
          <div className="flex flex-wrap gap-2">
            {tool.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs bg-[var(--bg-primary)] text-[var(--text-secondary)] px-2 py-1 rounded-md border border-[var(--border)]">
                #{tag}
              </span>
            ))}
          </div>
          <span className="text-xs font-medium text-[var(--accent)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            访问官网 →
          </span>
        </div>
      </div>
    </Link>
  );
}