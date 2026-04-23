"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/contact", label: "Contact" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("contact_submissions")
      .select("id", { count: "exact" })
      .eq("read", false)
      .then(({ count }) => setUnreadCount(count ?? 0));
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="w-[220px] shrink-0 border-r border-border-dim min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-border-dim">
        <div className="font-display text-[13px] font-bold text-fg-1 tracking-[0.02em]">
          QuietWizard
        </div>
        <div className="font-mono text-[7px] tracking-[0.28em] uppercase text-fg-muted">
          Studios
        </div>
      </div>

      <div className="px-3 py-4 border-b border-border-dim">
        <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-fg-muted px-3 mb-2">
          Admin
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between px-3 py-2 rounded-[4px] font-ui text-[13px] no-underline transition-colors duration-150"
                style={{
                  color: isActive ? "var(--teal-glow)" : "var(--fg-muted)",
                  background: isActive
                    ? "rgba(45,212,191,0.06)"
                    : "transparent",
                }}
              >
                {item.label}
                {item.href === "/admin/contact" && unreadCount > 0 && (
                  <span className="bg-teal-glow text-bg font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-3 py-4">
        <button
          onClick={handleSignOut}
          className="w-full px-3 py-2 text-left font-ui text-[13px] text-fg-muted bg-transparent border-0 cursor-pointer rounded-[4px] transition-colors duration-150 hover:text-fg-1"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
