import Link from 'next/link';

const CompassSVG = () => (
  <svg
    width="24"
    height="24"
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

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.top}>
          <div style={styles.brand}>
            <CompassSVG />
            <span style={styles.brandName}>
              Compliance Atlas
              <span style={styles.slash}>/</span>
            </span>
          </div>
          <nav style={styles.links}>
            <Link href="/" style={styles.link}>Home</Link>
            <Link href="/topics" style={styles.link}>Topics</Link>
            <Link href="/blog" style={styles.link}>Articles</Link>
            <Link href="/imprint" style={styles.link}>Imprint</Link>
            <Link href="/privacy" style={styles.link}>Privacy</Link>
          </nav>
        </div>
        <div style={styles.freshness}>
          <span style={styles.freshnessText}>DATA UPDATED MAY 2026</span>
          <span style={styles.freshnessText}>&middot; 39 REGULATIONS</span>
        </div>
        <div style={styles.copy}>
          <span style={styles.copyText}>
            &copy; {currentYear} Nukipa. Compliance Atlas is a Nukipa publication.
          </span>
          <span style={styles.coords}>48.1351N 11.5820E</span>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    marginTop: 'auto',
    borderTop: '1px solid var(--border-strong)',
    background: 'var(--bg)',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '2rem 1.5rem 1.5rem',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '2rem',
    marginBottom: '1.5rem',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  brandName: {
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    color: 'var(--text)',
  },
  slash: {
    color: 'var(--accent)',
  },
  links: {
    display: 'flex',
    gap: '1.25rem',
    flexWrap: 'wrap' as React.CSSProperties['flexWrap'],
  },
  link: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as React.CSSProperties['textTransform'],
    color: 'var(--text-muted)',
    textDecoration: 'none',
    transition: 'color 0.15s',
  },
  freshness: {
    display: 'flex',
    gap: '0.5rem',
    paddingBottom: '0.75rem',
    marginBottom: '0.75rem',
    borderBottom: '1px solid var(--border)',
  },
  freshnessText: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '1.5px',
    color: 'var(--text-dim)',
  },
  copy: {
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyText: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1px',
    color: 'var(--text-dim)',
  },
  coords: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1.5px',
    color: 'var(--text-dim)',
  },
};
