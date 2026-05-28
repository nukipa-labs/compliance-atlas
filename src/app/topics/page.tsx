import type { Metadata } from 'next';
import Link from 'next/link';
import { TOPICS, TOPIC_AREAS, getTopicsByArea } from '@/lib/topics';
import type { TopicDefinition } from '@/lib/topics';

export const metadata: Metadata = {
  title: 'Regulatory Topics',
  description:
    'Browse 40 regulatory frameworks by topic area: sustainability, digital, financial, labor, and more.',
};

function jurisdictionBadge(j: string): string {
  if (j === 'eu') return 'EU';
  if (j === 'us_federal') return 'US';
  return 'EU / US';
}

function humanizeCategory(cat: string): string {
  return cat.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const areaOrder: TopicDefinition['area'][] = [
  'foundational',
  'environmental',
  'digital',
  'product_safety',
  'financial',
  'labor',
  'trade',
];

export default function TopicsPage() {
  const topicsByArea = getTopicsByArea();
  const totalTopics = TOPICS.length;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.kicker}>T &middot; 135&deg; &middot; REGULATORY FRAMEWORKS</div>
        <h1 style={styles.title}>Topics</h1>
        <p style={styles.subtitle}>
          Deep-dive into {totalTopics} regulatory frameworks across the EU and US
        </p>
      </div>

      {areaOrder.map((area) => {
        const topics = topicsByArea[area] || [];
        if (!topics.length) return null;
        return (
          <div key={area} style={styles.areaSection}>
            <div style={styles.areaLabel}>{TOPIC_AREAS[area]}</div>
            <div style={styles.grid}>
              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  style={styles.card}
                >
                  <div style={styles.cardTop}>
                    <span style={styles.jurisdiction}>
                      {jurisdictionBadge(topic.jurisdiction)}
                    </span>
                    <span style={styles.categoryLabel}>
                      {humanizeCategory(topic.category)}
                    </span>
                  </div>
                  <h2 style={styles.cardTitle}>{topic.title}</h2>
                  <p style={styles.cardDesc}>{topic.description}</p>
                  <span style={styles.cta}>EXPLORE &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '2rem 1.5rem 3rem',
  },
  header: {
    marginBottom: '2rem',
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
    margin: 0,
    letterSpacing: '-1.5px',
  },
  subtitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '1px',
    color: 'var(--text-muted)',
    margin: '0.3rem 0 0',
  },
  areaSection: {
    marginBottom: '2.5rem',
  },
  areaLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '2px',
    color: 'var(--text-dim)',
    textTransform: 'uppercase',
    marginBottom: '0.75rem',
    paddingBottom: '0.35rem',
    borderBottom: '1px solid var(--border)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '0.75rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.25rem',
    border: '1px solid var(--border-strong)',
    background: 'var(--bg)',
    textDecoration: 'none',
    color: 'var(--text)',
    transition: 'background 0.15s',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.65rem',
  },
  jurisdiction: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '1.5px',
    padding: '0.1rem 0.4rem',
    border: '1px solid var(--border-strong)',
    color: 'var(--text)',
  },
  categoryLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1.5px',
    color: 'var(--text-dim)',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    margin: '0 0 0.5rem',
    lineHeight: 1.3,
    letterSpacing: '-0.3px',
  },
  cardDesc: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
    margin: '0 0 0.75rem',
    flex: 1,
  },
  cta: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1.5px',
    color: 'var(--accent)',
  },
};
