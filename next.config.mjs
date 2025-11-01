/** @type {import('next').NextConfig} */
const nextConfig = {
  // ADD THIS BLOCK
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Add any other domains you will use for images
    ],
  },
};

export default nextConfig;      