'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const CompassSVG = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <circle cx="16" cy="16" r="14.5" stroke="#0a0a0a" strokeWidth="1" />
    <circle cx="16" cy="16" r="10" stroke="#0a0a0a" strokeWidth="0.75" />
    <line x1="16" y1="1" x2="16" y2="31" stroke="#0a0a0a" strokeWidth="0.5" />
    <line x1="1" y1="16" x2="31" y2="16" stroke="#0a0a0a" strokeWidth="0.5" />
    <line x1="5.4" y1="5.4" x2="26.6" y2="26.6" stroke="#0a0a0a" strokeWidth="0.5" />
    <line x1="26.6" y1="5.4" x2="5.4" y2="26.6" stroke="#0a0a0a" strokeWidth="0.5" />
    <polygon points="16,2 14,10 16,8 18,10" fill="#e63312" />
    <polygon points="16,30 14,22 16,24 18,22" fill="#0a0a0a" />
    <circle cx="16" cy="16" r="2" fill="#e63312" />
  </svg>
);

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Topics', to: '/topics' },
  { label: 'Articles', to: '/blog' },
];

function getBreadcrumbSegments(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (!segments.length) return [];

  return segments.map((seg, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/');
    const label = seg
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const isLast = i === segments.length - 1;
    return {
      label: label.length > 40 ? label.slice(0, 37) + '...' : label,
      to: isLast ? null : path,
    };
  });
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const breadcrumbSegments = getBreadcrumbSegments(pathname);
  const isHome = pathname === '/';

  function isActive(item: (typeof navItems)[0]) {
    if (item.to === '/') return pathname === '/';
    return pathname.startsWith(item.to);
  }

  return (
    <>
      <header style={styles.header}>
        <div style={styles.inner}>
          {/* Brand */}
          <Link href="/" style={styles.brand}>
            <CompassSVG size={32} />
            <span style={styles.title}>
              Compliance Atlas
              <span style={styles.slash}>/</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="site-nav" style={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                style={{
                  ...styles.tab,
                  ...(isActive(item) ? styles.tabActive : {}),
                }}
              >
                <span style={styles.tabLabel}>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right: hamburger */}
          <div style={styles.right}>
            <button
              className="site-hamburger"
              style={styles.hamburger}
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span style={styles.hamburgerLine} />
              <span style={styles.hamburgerLine} />
              <span style={styles.hamburgerLine} />
            </button>
          </div>
        </div>

        {/* Breadcrumb strip */}
        {!isHome && (
          <div style={styles.strip}>
            <div style={styles.stripInner}>
              <Link href="/" style={styles.stripHome}>
                Home
              </Link>
              {breadcrumbSegments.map((seg, i) => (
                <span key={i}>
                  <span style={styles.stripSep}>/</span>
                  {seg.to ? (
                    <Link href={seg.to} style={styles.stripLink}>
                      {seg.label}
                    </Link>
                  ) : (
                    <span style={styles.stripCurrent}>{seg.label}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          <div
            style={styles.mobileOverlay}
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav style={styles.mobileMenu}>
            <div style={styles.mobileMenuHeader}>
              <span style={styles.mobileMenuTitle}>NAVIGATION</span>
              <button
                style={styles.mobileMenuClose}
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                &times;
              </button>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                style={{
                  ...styles.mobileMenuItem,
                  ...(isActive(item) ? styles.mobileMenuItemActive : {}),
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span style={styles.mobileMenuLabel}>{item.label}</span>
              </Link>
            ))}
          </nav>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .site-nav { display: none !important; }
          .site-hamburger { display: flex !important; }
        }
        @media (max-width: 640px) {
          .site-title { font-size: 0.85rem !important; }
          .site-compass { width: 24px !important; height: 24px !important; }
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'var(--bg)',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 1.5rem',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--border-strong)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    textDecoration: 'none',
    color: 'var(--text)',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    color: 'var(--text)',
  },
  slash: {
    color: 'var(--accent)',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1.1rem',
    textDecoration: 'none',
    color: 'var(--text-muted)',
    transition: 'background 0.15s, color 0.15s',
  },
  tabActive: {
    background: 'var(--text)',
    color: 'var(--bg)',
  },
  tabLabel: {
    fontSize: '0.82rem',
    fontWeight: 600,
    letterSpacing: '0.3px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: 4,
    padding: 6,
    background: 'none',
    border: '1px solid var(--border)',
    cursor: 'pointer',
  },
  hamburgerLine: {
    display: 'block',
    width: 18,
    height: 1.5,
    background: 'var(--text)',
  },
  strip: {
    borderBottom: '1px solid var(--border)',
  },
  stripInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0.45rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
  },
  stripHome: {
    color: 'var(--text-muted)',
    textDecoration: 'none',
  },
  stripLink: {
    color: 'var(--text-muted)',
    textDecoration: 'none',
  },
  stripSep: {
    margin: '0 0.4rem',
    color: 'var(--border)',
  },
  stripCurrent: {
    color: 'var(--text)',
    fontWeight: 500,
  },
  mobileOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(10, 10, 10, 0.3)',
    zIndex: 999,
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: 280,
    maxWidth: '85vw',
    height: '100vh',
    background: '#fafaf8',
    borderLeft: '1px solid #0a0a0a',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  mobileMenuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid #ddd',
  },
  mobileMenuTitle: {
    fontFamily: 'ui-monospace, Menlo, monospace',
    fontSize: 10,
    letterSpacing: 2,
    color: '#999',
  },
  mobileMenuClose: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    lineHeight: 1,
    cursor: 'pointer',
    color: '#0a0a0a',
    padding: '0 0.25rem',
  },
  mobileMenuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1.25rem',
    textDecoration: 'none',
    color: '#0a0a0a',
    borderBottom: '1px solid #eee',
    transition: 'background 0.15s',
  },
  mobileMenuItemActive: {
    background: '#0a0a0a',
    color: '#fafaf8',
  },
  mobileMenuLabel: {
    fontFamily: 'ui-monospace, Menlo, monospace',
    fontSize: 11,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
};
