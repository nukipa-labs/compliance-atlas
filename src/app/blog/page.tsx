import type { Metadata } from 'next';
import { getNukipaClient } from '@/lib/nukipa';
import { ArticleCard } from '@/components/ArticleCard';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Latest analysis and deep-dives on EU and US regulatory frameworks.',
};

export default async function BlogIndex() {
  const client = await getNukipaClient();
  let posts: Awaited<ReturnType<typeof client.listPosts>> = [];
  try {
    posts = await client.listPosts({ limit: 50 });
  } catch {
    // no posts yet
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.kicker}>A &middot; 090&deg; &middot; LATEST ANALYSIS</div>
        <h1 style={styles.title}>Articles</h1>
      </div>

      {posts.length === 0 ? (
        <p style={styles.empty}>No articles published yet. Check back soon.</p>
      ) : (
        <div style={styles.grid}>
          {posts.map((p) => (
            <ArticleCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 1200,
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
  empty: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.75rem',
  },
};
