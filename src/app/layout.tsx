import type { Metadata } from 'next';
import { NukipaFeedback } from '@/components/NukipaFeedback';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Compliance Atlas',
    template: '%s — Compliance Atlas',
  },
  description:
    'EU and US regulation explained for business professionals. Track regulatory frameworks, compliance obligations, and enforcement decisions.',
  openGraph: {
    siteName: 'Compliance Atlas',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "Helvetica, Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          background: 'var(--bg)',
          color: 'var(--text)',
          lineHeight: 1.6,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <SiteHeader />
        <main style={{ flex: 1 }}>{children}</main>
        <SiteFooter />
        <NukipaFeedback />
      </body>
    </html>
  );
}
