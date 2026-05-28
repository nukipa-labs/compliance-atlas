import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Imprint',
  description: 'Legal imprint (Impressum) for Compliance Atlas, operated by Nukipa GmbH.',
};

export default function ImprintPage() {
  return (
    <div style={styles.page}>
      <div style={styles.kicker}>LEGAL &middot; IMPRESSUM</div>
      <h1 style={styles.title}>Imprint</h1>

      <div style={styles.body}>
        <h2 style={styles.h2}>Angaben gemäß § 5 TMG</h2>
        <p>
          Nukipa GmbH<br />
          Schillerstraße 23a<br />
          80336 Munich<br />
          Germany
        </p>

        <h2 style={styles.h2}>Registereintrag</h2>
        <p>
          Eingetragen im Handelsregister beim Amtsgericht München<br />
          HRB-Nummer: wird bekannt gegeben nach Eintragung
        </p>

        <h2 style={styles.h2}>Vertreten durch</h2>
        <p>Geschäftsführung: Nukipa GmbH</p>

        <h2 style={styles.h2}>Kontakt</h2>
        <p>
          E-Mail:{' '}
          <a href="mailto:hello@nukipa.com" style={styles.link}>hello@nukipa.com</a>
          <br />
          Web:{' '}
          <a href="https://nukipa.com" style={styles.link} target="_blank" rel="noopener noreferrer">
            nukipa.com
          </a>
        </p>

        <h2 style={styles.h2}>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
          wird nach Registrierung bekannt gegeben
        </p>

        <h2 style={styles.h2}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          Nukipa GmbH<br />
          Schillerstraße 23a<br />
          80336 Munich<br />
          Germany
        </p>

        <h2 style={styles.h2}>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
          bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr"
            style={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2 style={styles.h2}>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
          Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
          als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
          rechtswidrige Tätigkeit hinweisen.
        </p>

        <div style={styles.coords}>48.1351N 11.5820E</div>
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
    margin: '0 0 2rem',
    letterSpacing: '-1.5px',
  },
  body: {
    fontSize: '0.95rem',
    lineHeight: 1.75,
    color: 'var(--text)',
  },
  h2: {
    fontSize: '0.85rem',
    fontWeight: 700,
    margin: '2rem 0 0.35rem',
    letterSpacing: '1.5px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase' as React.CSSProperties['textTransform'],
    color: 'var(--text-dim)',
  },
  link: {
    color: 'var(--accent)',
    textDecoration: 'underline',
  },
  coords: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '2px',
    color: 'var(--text-dim)',
    marginTop: '3rem',
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
