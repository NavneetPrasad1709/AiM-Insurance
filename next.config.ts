import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const STATIC_CACHE = {
  key: "Cache-Control",
  value: "public, max-age=31536000, immutable",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      // Security headers — every route
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
      // 1-year immutable cache for our own static assets
      // (Next.js manages /_next/static/* itself, leave it alone.)
      {
        source: "/brand/:path*",
        headers: [STATIC_CACHE],
      },
      {
        source: "/:path*\\.(svg|jpg|jpeg|png|gif|webp|avif|ico|woff|woff2)",
        headers: [STATIC_CACHE],
      },
    ];
  },
};

export default nextConfig;
