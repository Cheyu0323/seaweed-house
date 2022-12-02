/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV === "production";
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: [prod ? "/seaweed-house" : "/"], 
      unoptimized: true,
    },
    basePath: prod ? "/seaweed-house" : "/",
    assetPrefix: prod ? "/seaweed-house" : "/",
    
};

module.exports = nextConfig;
