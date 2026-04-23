"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Article } from "@/types/database";

const QuillEditor = dynamic(() => import("./QuillEditor"), { ssr: false });

const inputBase =
  "w-full bg-[rgba(20,168,159,0.04)] border border-border rounded-[4px] px-3 h-10 font-ui text-[13px] text-fg-1 outline-none";
const labelBase =
  "block font-ui text-[10px] font-bold tracking-[0.1em] uppercase text-fg-muted mb-1.5";

interface Props {
  article?: Article;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ArticleForm({ article }: Props) {
  const router = useRouter();
  const isEdit = !!article;

  const [fields, setFields] = useState({
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    category: article?.category ?? "",
    author_name: article?.author_name ?? "",
    read_time_minutes: article?.read_time_minutes?.toString() ?? "",
    tags: article?.tags?.join(", ") ?? "",
    seo_title: article?.seo_title ?? "",
    seo_description: article?.seo_description ?? "",
    cover_image_url: article?.cover_image_url ?? "",
  });
  const [body, setBody] = useState(article?.body ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(key: string, val: string) {
    setFields((prev) => {
      const next = { ...prev, [key]: val };
      if (key === "title" && !isEdit) {
        next.slug = slugify(val);
      }
      return next;
    });
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `covers/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(path, file);

    if (uploadError) {
      setError(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    set("cover_image_url", data.publicUrl);
  }

  async function handleSave(publish: boolean) {
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const payload = {
      ...fields,
      body,
      read_time_minutes: fields.read_time_minutes
        ? parseInt(fields.read_time_minutes)
        : null,
      tags: fields.tags
        ? fields.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : null,
      published: publish,
      published_at: publish
        ? article?.published_at ?? new Date().toISOString()
        : null,
      updated_at: new Date().toISOString(),
    };

    let err;
    if (isEdit) {
      ({ error: err } = await supabase
        .from("articles")
        .update(payload)
        .eq("id", article.id));
    } else {
      ({ error: err } = await supabase.from("articles").insert(payload));
    }

    setSaving(false);
    if (err) {
      setError(err.message);
    } else {
      router.push("/admin/articles");
    }
  }

  return (
    <div className="max-w-[860px]">
      {error && (
        <div className="glass border border-red-500/30 p-4 mb-6 font-mono text-[12px] text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-span-2">
          <label className={labelBase}>Title</label>
          <input
            className={inputBase}
            value={fields.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Article title"
          />
        </div>
        <div>
          <label className={labelBase}>Slug</label>
          <input
            className={inputBase}
            value={fields.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="url-slug"
          />
        </div>
        <div>
          <label className={labelBase}>Category</label>
          <input
            className={inputBase}
            value={fields.category}
            onChange={(e) => set("category", e.target.value)}
            placeholder="Engineering"
          />
        </div>
        <div>
          <label className={labelBase}>Author</label>
          <input
            className={inputBase}
            value={fields.author_name}
            onChange={(e) => set("author_name", e.target.value)}
            placeholder="Author name"
          />
        </div>
        <div>
          <label className={labelBase}>Read Time (min)</label>
          <input
            type="number"
            className={inputBase}
            value={fields.read_time_minutes}
            onChange={(e) => set("read_time_minutes", e.target.value)}
            placeholder="5"
          />
        </div>
        <div className="col-span-2">
          <label className={labelBase}>Tags (comma separated)</label>
          <input
            className={inputBase}
            value={fields.tags}
            onChange={(e) => set("tags", e.target.value)}
            placeholder="AI, Automation, Engineering"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className={labelBase}>Cover Image</label>
        {fields.cover_image_url && (
          <Image
            src={fields.cover_image_url}
            alt="cover"
            width={1200}
            height={400}
            className="w-full max-h-[200px] object-cover rounded-[4px] mb-2"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverUpload}
          className="font-ui text-[12px] text-fg-muted"
        />
      </div>

      <div className="mb-4">
        <label className={labelBase}>Body</label>
        <div className="border border-border rounded-[4px] overflow-hidden">
          <QuillEditor value={body} onChange={setBody} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelBase}>SEO Title</label>
          <input
            className={inputBase}
            value={fields.seo_title}
            onChange={(e) => set("seo_title", e.target.value)}
            placeholder="Override page title for SEO"
          />
        </div>
        <div>
          <label className={labelBase}>SEO Description</label>
          <input
            className={inputBase}
            value={fields.seo_description}
            onChange={(e) => set("seo_description", e.target.value)}
            placeholder="Meta description"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => handleSave(false)}
          disabled={saving}
          className="btn-secondary h-[42px] px-6 text-[12px]"
        >
          {saving ? "Saving…" : "Save Draft"}
        </button>
        <button
          onClick={() => handleSave(true)}
          disabled={saving}
          className="btn-primary h-[42px] px-6 text-[12px]"
        >
          {saving ? "Publishing…" : "Publish"}
        </button>
        <button
          onClick={() => router.push("/admin/articles")}
          className="ml-auto font-ui text-[12px] text-fg-muted bg-transparent border-0 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
