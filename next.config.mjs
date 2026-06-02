/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NUKIPA_GATEWAY_URL:            'https://nukipa-staging-gateway.fly.dev',
    NUKIPA_TENANT_HOST:            'compliance-atlas-a6f91dc8.kibert.de',
    NEXT_PUBLIC_NUKIPA_GATEWAY_URL:'https://nukipa-staging-gateway.fly.dev',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
};

export default nextConfig;
