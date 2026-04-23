"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const SETTING_KEYS = [
  { key: "site_tagline", label: "Site Tagline" },
  { key: "hero_headline", label: "Hero Headline" },
  { key: "hero_subtext", label: "Hero Subtext" },
  { key: "about_text", label: "About Text" },
  { key: "contact_email", label: "Contact Email" },
  { key: "footer_note", label: "Footer Note" },
];

export default function AdminSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("settings")
      .select("key, value")
      .then(({ data }) => {
        const map: Record<string, string> = {};
        (data ?? []).forEach((row) => {
          map[row.key] = row.value;
        });
        setValues(map);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const rows = Object.entries(values).map(([key, value]) => ({ key, value }));
    await supabase.from("settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-[600px]">
      <h1 className="font-heading font-semibold text-fg-1 text-[24px] mb-8">
        Settings
      </h1>

      <div className="flex flex-col gap-4 mb-8">
        {SETTING_KEYS.map(({ key, label }) => (
          <div key={key}>
            <label className="block font-ui text-[10px] font-bold tracking-[0.1em] uppercase text-fg-muted mb-1.5">
              {label}
            </label>
            <textarea
              value={values[key] ?? ""}
              onChange={(e) =>
                setValues((v) => ({ ...v, [key]: e.target.value }))
              }
              className="w-full bg-[rgba(20,168,159,0.04)] border border-border rounded-[4px] px-3 py-2.5 font-ui text-[13px] text-fg-1 outline-none h-[80px] resize-none"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="btn-primary h-[42px] px-8 text-[12px]"
      >
        {saved ? "Saved!" : saving ? "Saving…" : "Save Settings"}
      </button>
    </div>
  );
}
