/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'laundrex-assets.s3.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
