/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: true,
}


module.exports = {
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
