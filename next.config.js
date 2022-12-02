/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  basePath: "/seaweed-house",
  assetPrefix: "/seaweed-house"
}

module.exports = nextConfig
