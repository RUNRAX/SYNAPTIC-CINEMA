/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  transpilePackages: ['three'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        encoding: false,
        fs: false,
      }
    }

    return config
  },
}

module.exports = nextConfig
