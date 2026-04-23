import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getRequiredSupabasePublicEnv } from "@/lib/env";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const { url, anonKey } = getRequiredSupabasePublicEnv("proxy.proxy");

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh session — required for Server Components to read auth state
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect all /admin/* routes except /admin/login and /admin/auth/*
  const isAdminRoute = pathname.startsWith("/admin");
  const isPublicAdminRoute =
    pathname === "/admin/login" || pathname.startsWith("/admin/auth/");

  if (isAdminRoute && !isPublicAdminRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
