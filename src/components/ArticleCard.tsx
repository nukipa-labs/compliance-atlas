import Link from 'next/link';

interface Post {
  id: string;
  slug?: string | null;
  title: string;
  category?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  cover?: { url: string; alt?: string | null } | null;
  excerpt?: string | null;
  short_description?: string | null;
  author?: { name: string } | null;
}

function formatDate(iso?: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function ArticleCard({ post }: { post: Post }) {
  const href = `/blog/${post.slug || post.id}`;
  const coverUrl = post.cover?.url;
  const dek = post.short_description || post.excerpt;
  const date = formatDate(post.published_at || post.created_at);

  return (
    <Link href={href} style={styles.card}>
      {coverUrl && (
        <div style={styles.media}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl}
            alt={post.cover?.alt || post.title}
            loading="lazy"
            style={styles.img}
          />
        </div>
      )}
      <div style={styles.body}>
        <div style={styles.meta}>
          {post.category && (
            <span style={styles.cat}>{post.category.toUpperCase()}</span>
          )}
          <span style={styles.date}>{date}</span>
        </div>
        <h3 style={styles.title}>{post.title}</h3>
        {dek && <p style={styles.dek}>{dek}</p>}
        {post.author && (
          <div style={styles.author}>{post.author.name}</div>
        )}
      </div>
    </Link>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid var(--border-strong)',
    textDecoration: 'none',
    color: 'var(--text)',
    background: 'var(--bg)',
    overflow: 'hidden',
    transition: 'background 0.15s',
  },
  media: {
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: 180,
    objectFit: 'cover' as React.CSSProperties['objectFit'],
    display: 'block',
    transition: 'opacity 0.15s',
  },
  body: {
    padding: '0.85rem 1rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.45rem',
  },
  cat: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '1.5px',
    color: 'var(--accent)',
  },
  date: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1px',
    color: 'var(--text-dim)',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 1.35,
    margin: '0 0 0.35rem',
    letterSpacing: '-0.3px',
  },
  dek: {
    fontSize: '0.82rem',
    lineHeight: 1.55,
    color: 'var(--text-muted)',
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical' as React.CSSProperties['WebkitBoxOrient'],
    overflow: 'hidden',
    flex: 1,
  },
  author: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1px',
    color: 'var(--text-muted)',
    marginTop: '0.65rem',
    paddingTop: '0.5rem',
    borderTop: '1px solid var(--border)',
  },
};
