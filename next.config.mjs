/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tenants serve images from their own assets, the Nukipa storage bucket,
  // and the customer's existing CDN (logos/OG images sometimes hot-link
  // during the first pass). Add specific allow-listed remotePatterns
  // before going live in production.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
};

export default nextConfig;
