import type { Metadata } from 'next';
import Link from 'next/link';
import { getNukipaClient } from '@/lib/nukipa';
import { ArticleCard } from '@/components/ArticleCard';
import { TOPICS } from '@/lib/topics';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Compliance Atlas — EU and US Regulation for Business',
  description:
    'Track EU and US regulation, court rulings, and enforcement decisions. Understand compliance obligations with clarity.',
};

function getNextMilestone(topic: (typeof TOPICS)[0]): string {
  if (!topic.milestones?.length) return '';
  const now = new Date().toISOString().slice(0, 10);
  const future = topic.milestones
    .filter((m) => m.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date));
  if (future.length) {
    const m = future[0]!;
    const d = new Date(m.date);
    return `${d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — ${m.event}`;
  }
  const latest = [...topic.milestones].sort((a, b) => b.date.localeCompare(a.date))[0];
  return latest?.event || '';
}

export default async function HomePage() {
  const client = await getNukipaClient();
  let posts: Awaited<ReturnType<typeof client.listPosts>> = [];
  try {
    posts = await client.listPosts({ limit: 12 });
  } catch {
    // no posts yet
  }

  const featuredTopics = TOPICS.slice(0, 12);

  return (
    <div style={styles.home}>
      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Compliance Atlas</h1>
        <p style={styles.heroSubtitle}>
          EU and US regulation explained for business professionals.
        </p>
      </section>

      {/* Latest Analysis */}
      {posts.length > 0 && (
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Latest analysis</h2>
            <Link href="/blog" style={styles.sectionLink}>
              View all articles &rarr;
            </Link>
          </div>
          <div style={styles.articlesGrid}>
            {posts.map((p) => (
              <ArticleCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* Topics */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Topics</h2>
          <Link href="/topics" style={styles.sectionLink}>
            View all {TOPICS.length} topics &rarr;
          </Link>
        </div>
        <div style={styles.topicGrid}>
          {featuredTopics.map((topic) => {
            const jurisdictionLabel =
              topic.jurisdiction === 'eu'
                ? 'EU'
                : topic.jurisdiction === 'us_federal'
                ? 'US'
                : 'EU / US';
            const nextMilestone = getNextMilestone(topic);
            return (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                style={styles.topicCard}
              >
                <div style={styles.topicCardHead}>
                  <span style={styles.topicCardJurisdiction}>
                    {jurisdictionLabel}
                  </span>
                  {topic.area && (
                    <span style={styles.topicCardArea}>{topic.area}</span>
                  )}
                </div>
                <h3 style={styles.topicCardTitle}>{topic.title}</h3>
                <p style={styles.topicCardDesc}>{topic.description}</p>
                {nextMilestone && (
                  <div style={styles.topicCardNext}>
                    <span style={styles.topicCardNextLabel}>NEXT MILESTONE</span>
                    <span style={styles.topicCardNextEvent}>{nextMilestone}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      <style>{`
        @media (max-width: 1100px) {
          .topic-grid-home { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .topic-grid-home { grid-template-columns: repeat(2, 1fr) !important; }
          .articles-grid-home { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .topic-grid-home { grid-template-columns: 1fr !important; }
          .articles-grid-home { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  home: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 1.5rem 3rem',
  },
  hero: {
    textAlign: 'center',
    padding: '4rem 0 2.5rem',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '-1.5px',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    margin: '0.75rem auto 0',
    maxWidth: 540,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: '3rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '1rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '-0.5px',
  },
  sectionLink: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    textDecoration: 'none',
  },
  topicGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.75rem',
  },
  topicCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 1.15rem',
    border: '1px solid var(--border-strong)',
    textDecoration: 'none',
    color: 'var(--text)',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  topicCardHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  topicCardJurisdiction: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '1.5px',
    fontWeight: 700,
    color: 'var(--accent)',
    textTransform: 'uppercase',
  },
  topicCardArea: {
    fontFamily: 'var(--font-mono)',
    fontSize: 8,
    letterSpacing: '1px',
    color: 'var(--text-dim)',
    textTransform: 'uppercase',
  },
  topicCardTitle: {
    fontSize: '0.95rem',
    fontWeight: 700,
    margin: '0 0 0.4rem',
    lineHeight: 1.3,
    letterSpacing: '-0.3px',
  },
  topicCardDesc: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical' as React.CSSProperties['WebkitBoxOrient'],
    overflow: 'hidden',
    flex: 1,
  },
  topicCardNext: {
    marginTop: '0.65rem',
    paddingTop: '0.5rem',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
  },
  topicCardNextLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 8,
    letterSpacing: '1.5px',
    color: 'var(--accent)',
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  topicCardNextEvent: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as React.CSSProperties['WebkitBoxOrient'],
    overflow: 'hidden',
  },
  articlesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.75rem',
  },
};
