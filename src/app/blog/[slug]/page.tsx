import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PostBody, renderSourcesList } from '@nukipa/post-renderer-react';
import { getNukipaClient } from '@/lib/nukipa';
import { ArticleCard } from '@/components/ArticleCard';
import { GateForm } from '@/components/GateForm';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso?: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = await getNukipaClient();
  const post = await client.getPostBySlug(slug);
  if (!post) return {};
  const seo = (post.seo as Record<string, string | undefined>) || {};
  return {
    title: seo.title || post.title,
    description: seo.description || post.excerpt || undefined,
    openGraph: {
      title: seo.title || post.title,
      description: seo.description || post.excerpt || undefined,
      images: seo.og_image
        ? [{ url: seo.og_image }]
        : post.cover?.url
        ? [{ url: post.cover.url }]
        : undefined,
      type: 'article',
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const client = await getNukipaClient();
  const post = await client.getPostBySlug(slug);
  if (!post) notFound();

  const related = await client.listRelatedPosts(slug, { limit: 3 });
  const sourcesHtml = renderSourcesList(post.sources ?? []);

  return (
    <div style={styles.page}>
      {/* Back link */}
      <Link href="/blog" style={styles.backLink}>
        &larr; Articles
      </Link>

      {/* Article header */}
      <header style={styles.header}>
        <div style={styles.headerMeta}>
          {Boolean((post as Record<string, unknown>).category) && (
            <span style={styles.category}>
              {String((post as Record<string, unknown>).category).toUpperCase()}
            </span>
          )}
          {post.published_at && (
            <span style={styles.date}>{formatDate(post.published_at)}</span>
          )}
        </div>
        <h1 style={styles.title}>{post.title}</h1>
        {post.excerpt && <p style={styles.excerpt}>{post.excerpt}</p>}
      </header>

      {/* Cover image */}
      {post.cover?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover.url}
          alt={post.cover.alt || post.title}
          style={styles.cover}
        />
      )}

      {/* Article body */}
      <article style={styles.body}>
        <div className="ca-article__body">
          <PostBody
            body={post.body ?? ''}
            components={(post.components ?? []) as Parameters<typeof PostBody>[0]['components']}
            sources={(post.sources ?? []) as Parameters<typeof PostBody>[0]['sources']}
            postId={post.id}
            lang={post.language ?? undefined}
          />
          {sourcesHtml && (
            <div dangerouslySetInnerHTML={{ __html: sourcesHtml }} />
          )}
        </div>
      </article>

      {/* Gating */}
      {post.is_gated && post.gated_form_slug && (
        <GateForm
          formSlug={post.gated_form_slug}
          formName={post.gated_form_name ?? null}
          fields={post.gated_form_fields ?? []}
        />
      )}

      {/* Related posts */}
      {related.length > 0 && (
        <section style={styles.related}>
          <div style={styles.relatedLabel}>RELATED ARTICLES</div>
          <div style={styles.relatedGrid}>
            {related.map((r) => (
              <ArticleCard key={r.id} post={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 860,
    margin: '0 auto',
    padding: '2rem 1.5rem 4rem',
  },
  backLink: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1.5px',
    color: 'var(--accent)',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '1.5rem',
  },
  header: {
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '2px solid var(--border-strong)',
  },
  headerMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem',
  },
  category: {
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
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 700,
    margin: '0 0 0.75rem',
    letterSpacing: '-1.5px',
    lineHeight: 1.15,
  },
  excerpt: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    margin: 0,
  },
  cover: {
    width: '100%',
    height: 'auto',
    display: 'block',
    marginBottom: '2rem',
    borderBottom: '1px solid var(--border)',
  },
  body: {
    marginBottom: '3rem',
  },
  related: {
    marginTop: '3rem',
    paddingTop: '2rem',
    borderTop: '1px solid var(--border)',
  },
  relatedLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '1.5px',
    color: 'var(--text-dim)',
    marginBottom: '1rem',
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
  },
};
