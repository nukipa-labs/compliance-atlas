import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TOPICS } from '@/lib/topics';
import { TopicPageClient } from './TopicPageClient';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = TOPICS.find((t) => t.slug === slug);
  if (!topic) notFound();

  const relatedTopicDefs = (topic.relatedTopics || [])
    .map((s: string) => TOPICS.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <TopicPageClient topic={topic} relatedTopics={relatedTopicDefs} />
  );
}
