import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'images.unsplash.com' },
    ],
  },
  // OpenNext for Cloudflare requires the standalone output (it reads
  // .next/standalone for the server bundle); 'export' produces no manifest.
  output: 'standalone' as const,
  outputFileTracingRoot: process.cwd(),
};

export default withNextIntl(nextConfig);
