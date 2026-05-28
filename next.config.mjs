/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NUKIPA_GATEWAY_URL:            'https://nukipa-staging-gateway.fly.dev',
    NUKIPA_TENANT_HOST:            'ws-wwwnukipacom-6f43fd054346.kibert.de',
    NEXT_PUBLIC_NUKIPA_GATEWAY_URL:'https://nukipa-staging-gateway.fly.dev',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
};

export default nextConfig;
