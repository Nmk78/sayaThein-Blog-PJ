const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
  env: {
    API: process.env.API,
    NEXT_AUTH_URL : process.env.NEXT_AUTH_URL,
    JWT_SECRET : process.env.JWT_SECRET,
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/nextauth",
      },
    ];
  },
};

module.exports = nextConfig;
