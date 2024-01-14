const dotenv = require("dotenv");
dotenv.config();

const withTM = require("next-transpile-modules")(["mongodb"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
  env: {
    API: process.env.NEXT_PUBLIC_API,
    NEXT_AUTH_URL: process.env.NEXT_AUTH_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/nextauth",
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
      };
    }
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
  },
  
});
