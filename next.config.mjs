/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.kick.com',
      },
      {
        protocol: 'https',
        hostname: 'static-cdn.jtvnw.net',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
