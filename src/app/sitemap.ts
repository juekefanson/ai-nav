import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let tools: { slug: string; updatedAt: Date }[] = [];
  try {
    tools = await prisma.tool.findMany({
      where: { status: 'APPROVED' },
      select: { slug: true, updatedAt: true },
    });
  } catch (e) {
    // Database not available during build/prerender — return base sitemap only
    console.warn('Warning: Unable to fetch tools for sitemap (DB not available)');
  }

  const toolUrls = tools.map((tool) => ({
    url: `https://aigood.net/tools/${tool.slug}`,
    lastModified: tool.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://aigood.net',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://aigood.net/categories',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...toolUrls,
  ];
}