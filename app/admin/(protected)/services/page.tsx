"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Service } from "@/types/database";

const inputBase =
  "w-full bg-[rgba(20,168,159,0.04)] border border-border rounded-[4px] px-3 h-10 font-ui text-[13px] text-fg-1 outline-none";
const labelBase =
  "block font-ui text-[10px] font-bold tracking-[0.1em] uppercase text-fg-muted mb-1.5";

const EMPTY: Omit<Service, "id"> = {
  label: "",
  title: "",
  price: "",
  description: "",
  tags: [],
  featured: false,
  sort_order: 0,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>(EMPTY);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const supabase = createClient();
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("sort_order");
    setServices(data ?? []);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  function startNew() {
    setEditing(null);
    setForm(EMPTY);
    setTagsInput("");
  }

  function startEdit(s: Service) {
    setEditing(s);
    setForm({
      label: s.label,
      title: s.title,
      price: s.price ?? "",
      description: s.description ?? "",
      tags: s.tags ?? [],
      featured: s.featured,
      sort_order: s.sort_order,
    });
    setTagsInput((s.tags ?? []).join(", "));
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const payload = {
      ...form,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (editing) {
      await supabase.from("services").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("services").insert(payload);
    }

    setSaving(false);
    setEditing(null);
    setForm(EMPTY);
    setTagsInput("");
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service?")) return;
    const supabase = createClient();
    await supabase.from("services").delete().eq("id", id);
    load();
  }

  const isFormOpen = editing !== null || form.title !== "";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading font-semibold text-fg-1 text-[24px]">
          Services
        </h1>
        {!isFormOpen && (
          <button onClick={startNew} className="btn-primary h-[38px] px-5 text-[12px]">
            New Service
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="glass p-6 mb-6">
          <h2 className="font-heading font-semibold text-fg-1 text-[18px] mb-5">
            {editing ? "Edit Service" : "New Service"}
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelBase}>Label</label>
              <input
                className={inputBase}
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                placeholder="01"
              />
            </div>
            <div>
              <label className={labelBase}>Price</label>
              <input
                className={inputBase}
                value={form.price ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="Starting at $X,XXX"
              />
            </div>
            <div className="col-span-2">
              <label className={labelBase}>Title</label>
              <input
                className={inputBase}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Service name"
              />
            </div>
            <div className="col-span-2">
              <label className={labelBase}>Description</label>
              <textarea
                className="w-full bg-[rgba(20,168,159,0.04)] border border-border rounded-[4px] px-3 py-2.5 font-ui text-[13px] text-fg-1 outline-none h-[100px] resize-none"
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Service description"
              />
            </div>
            <div>
              <label className={labelBase}>Tags (comma separated)</label>
              <input
                className={inputBase}
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="AI, Automation"
              />
            </div>
            <div>
              <label className={labelBase}>Sort Order</label>
              <input
                type="number"
                className={inputBase}
                value={form.sort_order}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) =>
                  setForm((f) => ({ ...f, featured: e.target.checked }))
                }
                className="accent-teal-glow"
              />
              <label
                htmlFor="featured"
                className="font-ui text-[13px] text-fg-1 cursor-pointer"
              >
                Featured
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary h-[42px] px-6 text-[12px]"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => { setEditing(null); setForm(EMPTY); }}
              className="font-ui text-[12px] text-fg-muted bg-transparent border-0 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {services.map((s) => (
          <div
            key={s.id}
            className="glass px-5 py-4 flex items-center justify-between gap-4"
          >
            <div>
              <div className="font-ui text-[14px] text-fg-1 font-medium">{s.title}</div>
              <div className="font-mono text-[10px] text-fg-muted mt-0.5">
                {s.label}{s.price ? ` · ${s.price}` : ""}
                {s.featured && " · Featured"}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => startEdit(s)}
                className="font-ui text-[11px] text-teal-glow bg-transparent border-0 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="font-ui text-[11px] text-fg-muted bg-transparent border-0 cursor-pointer hover:text-red-400 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
