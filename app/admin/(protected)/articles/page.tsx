"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Article } from "@/types/database";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const supabase = createClient();
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    setArticles(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  async function togglePublish(article: Article) {
    const supabase = createClient();
    await supabase
      .from("articles")
      .update({
        published: !article.published,
        published_at: !article.published ? new Date().toISOString() : null,
      })
      .eq("id", article.id);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    const supabase = createClient();
    await supabase.from("articles").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading font-semibold text-fg-1 text-[24px]">
          Articles
        </h1>
        <Link href="/admin/articles/new" className="btn-primary h-[38px] px-5 text-[12px]">
          New Article
        </Link>
      </div>

      {loading ? (
        <div className="font-mono text-[11px] text-fg-muted">Loading…</div>
      ) : articles.length === 0 ? (
        <div className="glass p-8 text-center">
          <p className="font-body text-[17px] text-fg-3">No articles yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {articles.map((a) => (
            <div
              key={a.id}
              className="glass px-5 py-4 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="font-ui text-[14px] text-fg-1 font-medium truncate">
                  {a.title}
                </div>
                <div className="font-mono text-[10px] text-fg-muted mt-0.5">
                  /{a.slug}
                  {a.category && ` · ${a.category}`}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-1 rounded-full"
                  style={{
                    color: a.published ? "var(--teal-glow)" : "var(--fg-muted)",
                    background: a.published
                      ? "rgba(45,212,191,0.08)"
                      : "rgba(255,255,255,0.04)",
                  }}
                >
                  {a.published ? "Published" : "Draft"}
                </span>
                <button
                  onClick={() => togglePublish(a)}
                  className="font-ui text-[11px] text-fg-muted bg-transparent border-0 cursor-pointer hover:text-fg-1 transition-colors"
                >
                  {a.published ? "Unpublish" : "Publish"}
                </button>
                <Link
                  href={`/admin/articles/${a.id}`}
                  className="font-ui text-[11px] text-teal-glow no-underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="font-ui text-[11px] text-fg-muted bg-transparent border-0 cursor-pointer hover:text-red-400 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
