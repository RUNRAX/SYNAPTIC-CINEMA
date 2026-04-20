/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  transpilePackages: ['three'],
}

module.exports = nextConfig
