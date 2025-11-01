// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // --- ADD THIS BLOCK ---
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      // ----------------------
    ],
  },
};

export default nextConfig;