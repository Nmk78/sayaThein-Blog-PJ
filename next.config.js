/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: true,
}


module.exports = {
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

module.exports = nextConfig
