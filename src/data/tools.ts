// src/data/tools.ts
export const categories = [
  { id: 'all', name: '全部', icon: '✨', count: 2800 },
  { id: 'chat', name: '聊天/LLM', icon: '', count: 350 },
  { id: 'image', name: '图像生成', icon: '🎨', count: 280 },
  { id: 'video', name: '视频创作', icon: '🎬', count: 150 },
  { id: 'coding', name: '编程开发', icon: '💻', count: 200 },
  { id: 'writing', name: '办公写作', icon: '📝', count: 400 },
  { id: 'music', name: '音频/音乐', icon: '🎵', count: 100 },
  { id: '3d', name: '3D/模型', icon: '🧊', count: 80 },
];

export type Tool = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
  pricing: '免费' | '免费增值' | '付费' | '即将上线';
  rating: number;
  votes: number;
  url: string;
  logoEmoji: string;
  trending?: number; // 排名
};

export const tools: Tool[] = [
  { id: '1', name: 'ChatGPT', description: 'OpenAI 开发的通用人工智能助手，擅长对话、写作和逻辑分析。', tags: ['对话', 'LLM', '通用'], category: 'chat', pricing: '免费增值', rating: 4.8, votes: 12500, url: 'https://chat.openai.com', logoEmoji: '🤖', trending: 1 },
  { id: '2', name: 'Claude 3.5 Sonnet', description: 'Anthropic 推出的最强模型，擅长代码编写和复杂逻辑推理，响应极快。', tags: ['代码', 'LLM', '推理'], category: 'chat', pricing: '免费增值', rating: 4.9, votes: 8000, url: 'https://claude.ai', logoEmoji: '🧠', trending: 2 },
  { id: '3', name: 'Midjourney V6', description: '目前最顶级的 AI 绘画工具，能生成电影级质感的图像，理解力大幅提升。', tags: ['绘画', '设计', '艺术'], category: 'image', pricing: '付费', rating: 4.8, votes: 15000, url: 'https://midjourney.com', logoEmoji: '', trending: 3 },
  { id: '4', name: 'Sora', description: 'OpenAI 的视频生成模型，只需文本提示即可生成长达一分钟的高清视频。', tags: ['视频', '生成', 'Sora'], category: 'video', pricing: '即将上线', rating: 5.0, votes: 20000, url: 'https://openai.com/sora', logoEmoji: '🎥', trending: 4 },
  { id: '5', name: 'Gemini Pro', description: 'Google 的多模态大模型，原生支持图片、音频理解，整合在 Google 生态中。', tags: ['Google', '多模态', 'LLM'], category: 'chat', pricing: '免费增值', rating: 4.6, votes: 6000, url: 'https://gemini.google.com', logoEmoji: '🔷' },
  { id: '6', name: 'Cursor AI', description: '基于 VS Code 改造的 AI 代码编辑器，能直接帮你写代码、改 Bug、重构项目。', tags: ['编辑器', '开发', '效率'], category: 'coding', pricing: '免费增值', rating: 4.9, votes: 9000, url: 'https://cursor.sh', logoEmoji: '💻', trending: 5 },
  { id: '7', name: 'ElevenLabs', description: '最逼真的 AI 语音合成平台，支持多种语言和音色克隆，情感表现力极强。', tags: ['语音', 'TTS', '克隆'], category: 'music', pricing: '免费增值', rating: 4.7, votes: 5500, url: 'https://elevenlabs.io', logoEmoji: '🎙️' },
  { id: '8', name: 'Stable Diffusion XL', description: '开源的高质量图像生成模型，完全免费，可在本地运行，社区生态丰富。', tags: ['开源', '绘画', '本地部署'], category: 'image', pricing: '免费', rating: 4.6, votes: 11000, url: 'https://stability.ai', logoEmoji: '️' },
  { id: '9', name: 'Perplexity AI', description: '基于大模型的搜索引擎，提供带引用的精准答案，适合学术研究和资料搜集。', tags: ['搜索', '研究', '问答'], category: 'chat', pricing: '免费增值', rating: 4.7, votes: 7200, url: 'https://perplexity.ai', logoEmoji: '🔍', trending: 6 },
  { id: '10', name: 'GitHub Copilot', description: 'GitHub 官方推出的 AI 编程助手，支持全行代码补全和智能建议。', tags: ['编程', '微软', '插件'], category: 'coding', pricing: '付费', rating: 4.5, votes: 18000, url: 'https://github.com/features/copilot', logoEmoji: '' },
  { id: '11', name: 'Runway Gen-2', description: '强大的 AI 视频创作套件，支持图生视频、视频风格化、绿幕抠除等专业功能。', tags: ['视频', '特效', '专业'], category: 'video', pricing: '付费', rating: 4.4, votes: 3200, url: 'https://runwayml.com', logoEmoji: '🎬' },
  { id: '12', name: 'Notion AI', description: '集成在 Notion 中的智能助手，支持写大纲、总结会议纪要、翻译和头脑风暴。', tags: ['笔记', '办公', '效率'], category: 'writing', pricing: '付费', rating: 4.3, votes: 4500, url: 'https://notion.so/product/ai', logoEmoji: '📝' },
  { id: '13', name: 'Suno AI', description: '只需输入歌词或风格描述，即可生成带人声的完整歌曲，效果惊艳。', tags: ['音乐', '生成', '人声'], category: 'music', pricing: '免费增值', rating: 4.8, votes: 6800, url: 'https://suno.com', logoEmoji: '🎵', trending: 7 },
  { id: '14', name: 'Character.AI', description: '可以创建和扮演任何角色的 AI 聊天平台，适合角色扮演和创意写作。', tags: ['角色', '娱乐', '聊天'], category: 'chat', pricing: '免费', rating: 4.5, votes: 8500, url: 'https://character.ai', logoEmoji: '🎭' },
  { id: '15', name: 'HeyGen', description: 'AI 视频翻译和数字人平台，只需上传视频即可生成多国语言版本，口型完美同步。', tags: ['数字人', '翻译', '视频'], category: 'video', pricing: '付费', rating: 4.6, votes: 2100, url: 'https://heygen.com', logoEmoji: '🤵' },
  { id: '16', name: 'Figma AI', description: '设计工具 Figma 内置的 AI 功能，支持自动布局、生成图标和素材搜索。', tags: ['设计', 'UI/UX', 'Figma'], category: 'image', pricing: '免费增值', rating: 4.2, votes: 3300, url: 'https://figma.com', logoEmoji: '🖌️' },
];