import ArticleForm from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="font-heading font-semibold text-fg-1 text-[24px] mb-8">
        New Article
      </h1>
      <ArticleForm />
    </div>
  );
}
