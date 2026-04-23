"use client";

import { getSiteUrl } from "@/lib/env";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  async function handleGoogleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getSiteUrl("app/admin/login.handleGoogleLogin")}/admin/auth/callback`,
      },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="glass p-10 w-full max-w-[380px] text-center">
        <div className="font-display text-[15px] font-bold text-fg-1 tracking-[0.02em] mb-1">
          QuietWizard
        </div>
        <div className="font-mono text-[7px] tracking-[0.28em] uppercase text-fg-muted mb-8">
          Studios
        </div>
        <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-teal-glow mb-3">
          Admin Panel
        </div>
        <h1 className="font-heading font-semibold text-fg-1 text-[22px] mb-8">
          Sign In
        </h1>
        <button
          onClick={handleGoogleLogin}
          className="btn-primary w-full justify-center h-[46px] text-[12px]"
        >
          Continue with Google
        </button>
        <p className="font-mono text-[10px] text-fg-muted mt-6">
          Access restricted to authorized accounts.
        </p>
      </div>
    </div>
  );
}
