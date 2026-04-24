import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { getRequiredSupabasePublicEnv } from "@/lib/env";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin/articles";

  if (code) {
    const { url, anonKey } = getRequiredSupabasePublicEnv("admin/auth/callback");
    const successResponse = NextResponse.redirect(`${origin}${next}`);

    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value, options }) => {
            successResponse.cookies.set(name, value, options);
          });
          Object.entries(headers).forEach(([key, value]) => {
            successResponse.headers.set(key, value);
          });
        },
      },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return successResponse;
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`);
}
