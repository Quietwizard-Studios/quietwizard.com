import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ArticleForm from "@/components/admin/ArticleForm";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!article) notFound();

  return (
    <div>
      <h1 className="font-heading font-semibold text-fg-1 text-[24px] mb-8">
        Edit Article
      </h1>
      <ArticleForm article={article} />
    </div>
  );
}
