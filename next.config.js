/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.clerk.dev'], // Allow Clerk avatar images
  },
  // Recommended for production deployments
  typescript: {
    // Dangerously allow production builds to successfully complete even if your project has type errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if your project has ESLint errors
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
