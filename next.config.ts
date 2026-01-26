import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  },
    experimental: {
      serverActions: {
        allowedOrigins: [
          "*.orchids.cloud",
          "*.proxy.daytona.works",
          "3000-7eeae819-dd13-4190-95dc-6d45969bbec1.orchids.cloud",
          "3000-7eeae819-dd13-4190-95dc-6d45969bbec1.proxy.daytona.works",
        ],
      },
    },
    // @ts-ignore
    allowedDevOrigins: [
      "*.orchids.cloud",
      "*.proxy.daytona.works",
    ],
};

export default nextConfig;
