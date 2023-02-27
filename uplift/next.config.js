/** @type {import('next').NextConfig} */
const nextConfig = {
  modules: [
    'headlessui'
  ],
  reactStrictMode: true,
  experimental: {
      appDir: true,
  }
}

module.exports = nextConfig;
