/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV !== "production";
const rewritesConfig = isDevelopment
  ? [
      {
        source: "/api/:path*",
        destination: 'http://localhost:5000/api/:path*', // TODO: change to process.env.API_ENDPOINT,
      }
    ]
  : [];

const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => rewritesConfig
}

module.exports = nextConfig
