/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  transpilePackages: ['three'],
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
