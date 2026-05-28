import Link from 'next/link';
import type { SlimPost } from '@nukipa/site-sdk';

/**
 * Card used by the blog index and the related-posts strip on a post
 * detail page. Restyle freely - the prop is the canonical `SlimPost`
 * shape from the SDK (`client.listPosts(...)` /
 * `client.listRelatedPosts(...)`); don't redefine it.
 */
export function PostCard({ post }: { post: SlimPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-slate-200 overflow-hidden transition hover:border-slate-400 hover:shadow-md"
    >
      {post.cover?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover.url}
          alt={post.cover.alt || post.title}
          className="aspect-[16/9] w-full object-cover"
        />
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold tracking-tight group-hover:text-slate-900">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
        )}
        {post.published_at && (
          <time className="mt-3 block text-xs text-slate-400">
            {new Date(post.published_at).toLocaleDateString(undefined, {
              year: 'numeric', month: 'short', day: 'numeric'
            })}
          </time>
        )}
      </div>
    </Link>
  );
}
