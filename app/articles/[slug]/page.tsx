import { notFound } from "next/navigation";
import Image from "next/image";
import { getOptionalSupabasePublicEnv } from "@/lib/env";
import { createPublicClient } from "@/lib/supabase/public";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const env = getOptionalSupabasePublicEnv("app/articles/[slug]/generateStaticParams");
  if (!env) return [];
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("articles")
    .select("slug")
    .eq("published", true);
  return (data ?? []).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const env = getOptionalSupabasePublicEnv("app/articles/[slug]/generateMetadata");
  if (!env) return {};
  const supabase = createPublicClient();
  const { data: article } = await supabase
    .from("articles")
    .select("title, seo_title, seo_description, cover_image_url")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!article) return {};

  return {
    title: article.seo_title ?? article.title,
    description: article.seo_description ?? undefined,
    openGraph: article.cover_image_url
      ? { images: [article.cover_image_url] }
      : undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!article) notFound();

  return (
    <div className="min-h-screen relative z-[1] pt-[120px] px-4 sm:px-6 lg:px-8 pb-24">
      <article className="max-w-[760px] mx-auto">
        {article.category && (
          <div className="eyebrow mb-4">{article.category}</div>
        )}
        <h1
          className="font-heading font-semibold text-fg-1 mb-4"
          style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
        >
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
          {article.author_name && (
            <span className="font-mono text-[11px] text-fg-muted">
              {article.author_name}
            </span>
          )}
          {article.published_at && (
            <span className="font-mono text-[11px] text-fg-muted">
              {new Date(article.published_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          {article.read_time_minutes && (
            <span className="font-mono text-[11px] text-fg-muted">
              {article.read_time_minutes} min read
            </span>
          )}
        </div>

        {article.cover_image_url && (
          <Image
            src={article.cover_image_url}
            alt={article.title}
            width={1520}
            height={840}
            className="w-full max-h-[240px] sm:max-h-[420px] object-cover rounded-[6px] mb-10"
          />
        )}

        {article.body && (
          <div
            className="prose-articles font-body text-[18px] text-fg-3 leading-[1.85]"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border-dim">
            {article.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-[0.08em] px-3 py-1 rounded-full border border-border text-fg-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
