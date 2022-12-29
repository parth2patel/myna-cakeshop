/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  images: {
    domains: ['api.p3fy.com'],
  },
  nextConfig
}

//module.exports = nextConfig
