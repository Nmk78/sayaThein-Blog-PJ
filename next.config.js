/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: true,
}


module.exports = {
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
