import { notFound } from "next/navigation";
import { articles } from "@/lib/content/articles";
import ArticleView from "@/components/marketing/ArticleView";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const exists = articles.some((a) => a.slug === slug);

  if (!exists) {
    notFound();
  }

  return <ArticleView slug={slug} />;
}
