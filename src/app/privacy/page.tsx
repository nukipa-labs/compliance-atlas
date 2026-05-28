import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Compliance Atlas, a Nukipa publication.',
};

export default function PrivacyPage() {
  return (
    <div style={styles.page}>
      <div style={styles.kicker}>LEGAL &middot; PRIVACY</div>
      <h1 style={styles.title}>Privacy Policy</h1>
      <p style={styles.meta}>Last updated: May 2026</p>

      <div style={styles.body}>
        <h2 style={styles.h2}>1. Controller</h2>
        <p>
          Compliance Atlas is a publication operated by Nukipa GmbH, Schillerstraße 23a,
          80336 Munich, Germany. For all data protection matters, contact:{' '}
          <a href="mailto:privacy@nukipa.com" style={styles.link}>privacy@nukipa.com</a>.
        </p>

        <h2 style={styles.h2}>2. What data we collect</h2>
        <p>
          When you visit Compliance Atlas, we process the following data to deliver the
          service and understand usage:
        </p>
        <ul style={styles.ul}>
          <li>Server access logs (IP address, browser type, pages requested, timestamps)</li>
          <li>Session identifiers stored in a first-party cookie (<code style={styles.code}>nk_sid</code>)</li>
          <li>Optional: email address if you subscribe to the newsletter or unlock gated content</li>
          <li>Optional: contact information if you submit a contact form</li>
        </ul>

        <h2 style={styles.h2}>3. Legal bases (GDPR Art. 6)</h2>
        <ul style={styles.ul}>
          <li>
            <strong>Legitimate interest (Art. 6(1)(f)):</strong> Server logs and session analytics to
            detect abuse, ensure security, and understand aggregate usage patterns.
          </li>
          <li>
            <strong>Consent (Art. 6(1)(a)):</strong> Newsletter subscriptions and marketing
            communications. You may withdraw consent at any time.
          </li>
          <li>
            <strong>Contractual necessity (Art. 6(1)(b)):</strong> Processing your email to deliver
            content you have requested (e.g. newsletter issues).
          </li>
        </ul>

        <h2 style={styles.h2}>4. Cookies</h2>
        <p>
          We use a single session cookie (<code style={styles.code}>nk_sid</code>) for visit
          analytics. This cookie contains only a pseudonymous session identifier and does not
          track you across third-party sites. No advertising or tracking cookies are set.
          You may disable cookies in your browser settings; the site remains fully functional
          without them.
        </p>

        <h2 style={styles.h2}>5. Data sharing</h2>
        <p>
          We do not sell your personal data. We share data only with processors acting on our
          instructions under Article 28 GDPR data processing agreements:
        </p>
        <ul style={styles.ul}>
          <li>Fly.io (hosting infrastructure, EU region)</li>
          <li>Cloudflare (CDN, DDoS protection)</li>
        </ul>

        <h2 style={styles.h2}>6. Retention</h2>
        <p>
          Server logs are retained for 30 days. Session identifiers expire after 90 days of
          inactivity. Email addresses for newsletter subscribers are retained until you
          unsubscribe. You may request deletion at any time.
        </p>

        <h2 style={styles.h2}>7. Your rights</h2>
        <p>
          Under GDPR you have the right to access, rectify, erase, and port your personal data,
          to object to processing, and to lodge a complaint with your national supervisory
          authority. To exercise your rights, email{' '}
          <a href="mailto:privacy@nukipa.com" style={styles.link}>privacy@nukipa.com</a>.
        </p>
        <p>
          The competent supervisory authority for Nukipa GmbH is the Bavarian State Office for
          Data Protection Supervision (BayLDA), Promenade 18, 91522 Ansbach, Germany.
        </p>

        <h2 style={styles.h2}>8. Changes</h2>
        <p>
          We may update this policy to reflect changes in our practices or applicable law.
          Material changes will be announced on this page with an updated date.
        </p>
      </div>

      <div style={styles.backWrap}>
        <Link href="/" style={styles.backLink}>&larr; HOME</Link>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 760,
    margin: '0 auto',
    padding: '2rem 1.5rem 4rem',
  },
  kicker: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '2px',
    color: 'var(--accent)',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    margin: '0 0 0.25rem',
    letterSpacing: '-1.5px',
  },
  meta: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1px',
    color: 'var(--text-dim)',
    marginBottom: '2.5rem',
  },
  body: {
    fontSize: '0.95rem',
    lineHeight: 1.75,
    color: 'var(--text)',
  },
  h2: {
    fontSize: '1.1rem',
    fontWeight: 700,
    margin: '2rem 0 0.5rem',
    letterSpacing: '-0.3px',
  },
  ul: {
    paddingLeft: '1.5rem',
    margin: '0 0 1em',
  },
  code: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.88em',
    background: 'var(--surface)',
    padding: '0.1em 0.3em',
  },
  link: {
    color: 'var(--accent)',
    textDecoration: 'underline',
  },
  backWrap: {
    marginTop: '3rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--border)',
  },
  backLink: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1.5px',
    color: 'var(--accent)',
    textDecoration: 'none',
  },
};
