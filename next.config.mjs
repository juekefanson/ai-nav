/** @type {import('next').NextConfig} */
const nextConfig = {
  // React 严格模式
  reactStrictMode: true,
  
  // SWC 压缩
  swcMinify: true,
  
  // 图片配置（如需外部图片）
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // 环境变量
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;