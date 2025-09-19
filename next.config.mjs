/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export', // ✅ enables static export (creates "out" folder on build)
  basePath: isProd ? '/login1990.github.io' : '', // ✅ prefix for GitHub Pages
  assetPrefix: isProd ? '/login1990.github.io/' : '', // ✅ makes assets load correctly
};

export default nextConfig;
