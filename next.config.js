/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  images: {
    domains: [
      'placeimg.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
}
