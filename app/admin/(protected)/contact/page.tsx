"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ContactSubmission } from "@/types/database";

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const supabase = createClient();
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setSubmissions(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  async function handleView(submission: ContactSubmission) {
    setSelected(submission);
    if (!submission.read) {
      const supabase = createClient();
      await supabase
        .from("contact_submissions")
        .update({ read: true })
        .eq("id", submission.id);
      setSubmissions((prev) =>
        prev.map((s) => (s.id === submission.id ? { ...s, read: true } : s))
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this submission?")) return;
    const supabase = createClient();
    await supabase.from("contact_submissions").delete().eq("id", id);
    if (selected?.id === id) setSelected(null);
    load();
  }

  return (
    <div>
      <h1 className="font-heading font-semibold text-fg-1 text-[24px] mb-8">
        Contact Submissions
      </h1>

      <div className="flex gap-6">
        <div className="flex-1 flex flex-col gap-2">
          {loading ? (
            <div className="font-mono text-[11px] text-fg-muted">Loading…</div>
          ) : submissions.length === 0 ? (
            <div className="glass p-8 text-center">
              <p className="font-body text-[17px] text-fg-3">No submissions yet.</p>
            </div>
          ) : (
            submissions.map((s) => (
              <div
                key={s.id}
                onClick={() => handleView(s)}
                className="glass px-5 py-4 cursor-pointer flex items-start justify-between gap-4"
                style={{
                  borderColor:
                    selected?.id === s.id
                      ? "var(--teal-dim)"
                      : "var(--border)",
                }}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  {!s.read && (
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-teal-glow shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="font-ui text-[14px] text-fg-1 font-medium truncate">
                      {s.name}
                    </div>
                    <div className="font-mono text-[10px] text-fg-muted">
                      {s.email}
                    </div>
                    <div className="font-body text-[13px] text-fg-3 mt-1 line-clamp-1">
                      {s.message}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="font-mono text-[9px] text-fg-muted">
                    {new Date(s.created_at).toLocaleDateString()}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(s.id);
                    }}
                    className="font-ui text-[11px] text-fg-muted bg-transparent border-0 cursor-pointer hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {selected && (
          <div className="w-[340px] glass p-6 h-fit sticky top-8">
            <div className="font-ui text-[14px] text-fg-1 font-medium mb-1">
              {selected.name}
            </div>
            <div className="font-mono text-[10px] text-fg-muted mb-0.5">
              {selected.email}
            </div>
            {selected.company && (
              <div className="font-mono text-[10px] text-fg-muted mb-4">
                {selected.company}
              </div>
            )}
            <div className="font-mono text-[9px] text-fg-muted mb-4">
              {new Date(selected.created_at).toLocaleString()}
            </div>
            <div className="border-t border-border-dim pt-4">
              <p className="font-body text-[15px] text-fg-3 leading-[1.75] whitespace-pre-wrap">
                {selected.message}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
