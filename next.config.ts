import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.asnu.edu.eg',
        pathname: '/main/sites/default/files/**',
      },
    ],
  },
  serverExternalPackages: [
    '@prisma/client',
    'prisma',
    'bcryptjs',
    'fs',
    'fs-extra',
    'pdfjs-dist',
    'canvas',
    'html2canvas',
  ],
};

export default nextConfig;
