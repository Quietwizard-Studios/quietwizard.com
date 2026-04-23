import Link from "next/link";
import { getOptionalSupabasePublicEnv } from "@/lib/env";
import { createPublicClient } from "@/lib/supabase/public";
import type { Article } from "@/types/database";

export const revalidate = 60;

function ArticleCard({ article, large }: { article: Article; large?: boolean }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="glass block no-underline group"
    >
      {article.cover_image_url ? (
        <div
          className="w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${article.cover_image_url})`,
              height: large ? "clamp(140px, 34vw, 220px)" : "clamp(120px, 28vw, 160px)",
            }}
        />
      ) : (
        <div
          className="w-full"
          style={{
            height: large ? "clamp(140px, 34vw, 220px)" : "clamp(120px, 28vw, 160px)",
            background:
              "linear-gradient(135deg, rgba(20,168,159,0.15) 0%, rgba(45,212,191,0.05) 100%)",
          }}
        />
      )}
      <div className="p-5">
        {article.category && (
          <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-teal-glow mb-2">
            {article.category}
          </div>
        )}
        <h3
          className={`font-heading font-semibold text-fg-1 leading-[1.3] mb-2 ${large ? "text-[20px]" : "text-[16px]"}`}
        >
          {article.title}
        </h3>
        <div className="flex items-center gap-3">
          {article.published_at && (
            <span className="font-mono text-[10px] text-fg-muted">
              {new Date(article.published_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          {article.read_time_minutes && (
            <span className="font-mono text-[10px] text-fg-muted">
              {article.read_time_minutes} min
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default async function Articles() {
  let published: Article[] = [];

  const env = getOptionalSupabasePublicEnv("components/Articles");
  if (env) {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    published = data ?? [];
  }
  const [featured, ...rest] = published;

  return (
    <div className="min-h-screen relative z-[1] pt-[120px] px-4 sm:px-6 lg:px-8 pb-24">
      <div className="max-w-[1100px] mx-auto">
        <div className="eyebrow justify-center mb-4">Writing</div>
        <h1
          className="font-heading font-semibold text-fg-1 text-center mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          Articles
        </h1>
        <p className="font-body text-[18px] text-fg-3 leading-[1.75] max-w-[480px] mx-auto text-center mb-12">
          Practical writing on AI engineering, automation strategy, and building
          intelligent systems.
        </p>

        {published.length === 0 ? (
          <div className="glass py-10 px-8 max-w-[480px] mx-auto text-center">
            <div className="font-mono text-[11px] text-teal-glow mb-3">
              {"// ARTICLES LOADING"}
            </div>
            <p className="font-body text-[17px] text-fg-3 leading-[1.7]">
              Publish your first article to see it here.
            </p>
          </div>
        ) : (
          <div>
            {featured && (
              <div className="mb-6 max-w-[760px] mx-auto">
                <ArticleCard article={featured} large />
              </div>
            )}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
