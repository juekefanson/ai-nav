'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tools, categories, Tool } from '../data/tools';
import ToolCard from '../components/ToolCard';
import Image from 'next/image';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [theme, setTheme] = useState('default');

  // 过滤逻辑
  const filteredTools = tools.filter(tool => {
    const matchSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchSearch && matchCategory;
  });

  // 趋势数据 (取前 6 个)
  const trendingTools = [...tools].sort((a, b) => (a.trending || 99) - (b.trending || 99)).slice(0, 6);

  const toggleTheme = () => {
    const themes = ['default', 'midnight', 'cyber'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme === 'default' ? '' : nextTheme);
  };

  return (
    <main className="min-h-screen pb-20">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Aigood" 
              width={120} 
              height={40}
              className="h-10 w-auto"
               priority
             />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              🎨 切换主题
            </button>
            <button className="hidden sm:block px-4 py-2 bg-[var(--accent)] text-white rounded-lg font-medium hover:bg-[var(--accent-hover)] transition">
              ✨ 提交工具
            </button>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="pt-20 pb-16 text-center px-4">
        <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-6 border border-[var(--accent)]/20">
          📢 每周更新 · 已收录 2,800+ AI 工具
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          发现全球最优质的 <br />
          <span className="bg-gradient-to-r from-[var(--accent)] via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI 工具与资源
          </span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-10">
          探索、比较并发现最适合你的 AI 工具。从聊天机器人到图像生成，一站式导航你的 AI 之旅。
        </p>

        {/* 搜索框 */}
        <div className="max-w-2xl mx-auto relative">
          <input 
            type="text" 
            placeholder="搜索 AI 工具，如：文本生成、图像设计..." 
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition shadow-xl"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          <button className="absolute right-2 top-2 bottom-2 px-6 bg-[var(--accent)] text-white rounded-lg font-medium hover:bg-[var(--accent-hover)]">
            搜索
          </button>
        </div>

        {/* 统计数据 */}
        <div className="flex justify-center gap-8 mt-12 text-sm text-[var(--text-secondary)]">
          <div><span className="text-xl font-bold text-[var(--text-primary)]">711</span> AI 工具</div>
          <div><span className="text-xl font-bold text-[var(--text-primary)]">48</span> 工具分类</div>
          <div><span className="text-xl font-bold text-[var(--text-primary)]">156K</span> 月活跃用户</div>
        </div>
      </section>

      {/* 分类导航 */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)]/50'
              }`}
            >
              <span>{cat.icon}</span>
              <span className="font-medium">{cat.name}</span>
              <span className="text-xs opacity-60">({cat.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* 工具列表网格 */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>🔥</span> 热门工具
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 热门趋势 (右侧风格) */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 border border-[var(--border)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>📈</span> Trending · 热门趋势
            </h2>
            <Link href="/trending" className="text-sm text-[var(--accent)] hover:underline">查看全部 →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {trendingTools.map((tool, index) => (
              <div key={tool.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--bg-primary)] transition cursor-pointer group">
                <span className={`text-lg font-bold w-8 text-center ${index < 3 ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                  {index + 1}
                </span>
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-primary)] flex items-center justify-center text-xl border border-[var(--border)]">
                  {tool.logoEmoji}
                </div>
                <div>
                  <h4 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)]">{tool.name}</h4>
                  <p className="text-xs text-[var(--text-secondary)] truncate w-48">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}