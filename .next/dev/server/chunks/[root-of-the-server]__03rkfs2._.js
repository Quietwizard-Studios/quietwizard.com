module.exports = [
"[externals]/next/dist/build/adapter/setup-node-env.external.js [external] (next/dist/build/adapter/setup-node-env.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/build/adapter/setup-node-env.external.js", () => require("next/dist/build/adapter/setup-node-env.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/memory-cache.external.js [external] (next/dist/server/lib/incremental-cache/memory-cache.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/memory-cache.external.js", () => require("next/dist/server/lib/incremental-cache/memory-cache.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/shared-cache-controls.external.js [external] (next/dist/server/lib/incremental-cache/shared-cache-controls.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/shared-cache-controls.external.js", () => require("next/dist/server/lib/incremental-cache/shared-cache-controls.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/env.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getConfigHealthAllowedIps",
    ()=>getConfigHealthAllowedIps,
    "getConfigHealthToken",
    ()=>getConfigHealthToken,
    "getConfigurationHealth",
    ()=>getConfigurationHealth,
    "getOptionalSupabasePublicEnv",
    ()=>getOptionalSupabasePublicEnv,
    "getRequiredSupabasePublicEnv",
    ()=>getRequiredSupabasePublicEnv,
    "getRequiredSupabaseServiceEnv",
    ()=>getRequiredSupabaseServiceEnv,
    "getSiteUrl",
    ()=>getSiteUrl
]);
function readEnv(name) {
    const value = process.env[name];
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
}
function failMissing(name, context) {
    throw new Error(`[env:${context}] Missing required environment variable: ${name}`);
}
function getOptionalSupabasePublicEnv(context) {
    const url = readEnv("NEXT_PUBLIC_SUPABASE_URL");
    const anonKey = readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
    if (!url && !anonKey) return null;
    if (!url || !anonKey) {
        throw new Error(`[env:${context}] NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must both be set`);
    }
    return {
        url,
        anonKey
    };
}
function getRequiredSupabasePublicEnv(context) {
    const env = getOptionalSupabasePublicEnv(context);
    if (!env) {
        throw new Error(`[env:${context}] Missing NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY`);
    }
    return env;
}
function getRequiredSupabaseServiceEnv(context) {
    const url = readEnv("NEXT_PUBLIC_SUPABASE_URL");
    const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");
    if (!url) failMissing("NEXT_PUBLIC_SUPABASE_URL", context);
    if (!serviceRoleKey) failMissing("SUPABASE_SERVICE_ROLE_KEY", context);
    return {
        url,
        serviceRoleKey
    };
}
function getSiteUrl(context) {
    const configured = readEnv("NEXT_PUBLIC_SITE_URL");
    if (configured) return configured;
    if (("TURBOPACK compile-time value", "undefined") !== "undefined" && window.location?.origin) //TURBOPACK unreachable
    ;
    throw new Error(`[env:${context}] Missing required environment variable: NEXT_PUBLIC_SITE_URL`);
}
function getConfigurationHealth() {
    const supabaseUrl = !!readEnv("NEXT_PUBLIC_SUPABASE_URL");
    const supabaseAnonKey = !!readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
    const supabaseServiceRoleKey = !!readEnv("SUPABASE_SERVICE_ROLE_KEY");
    const siteUrl = !!readEnv("NEXT_PUBLIC_SITE_URL");
    const supabasePublic = supabaseUrl && supabaseAnonKey;
    const supabasePublicPartial = supabaseUrl !== supabaseAnonKey;
    const supabaseService = supabaseUrl && supabaseServiceRoleKey;
    const supabaseServicePartial = supabaseUrl !== supabaseServiceRoleKey;
    const checks = {
        supabasePublic,
        supabaseService,
        siteUrl
    };
    const partials = {
        supabasePublicPartial,
        supabaseServicePartial
    };
    const overall = Object.values(checks).every(Boolean) && !Object.values(partials).some(Boolean);
    return {
        overall,
        checks,
        partials
    };
}
function getConfigHealthToken() {
    return readEnv("CONFIG_HEALTH_TOKEN");
}
function getConfigHealthAllowedIps() {
    const value = readEnv("CONFIG_HEALTH_ALLOWED_IPS");
    if (!value) return [];
    return value.split(",").map((ip)=>ip.trim()).filter(Boolean);
}
}),
"[project]/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/env.ts [middleware] (ecmascript)");
;
;
;
async function proxy(request) {
    let supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request
    });
    const { url, anonKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["getRequiredSupabasePublicEnv"])("proxy.proxy");
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createServerClient"])(url, anonKey, {
        cookies: {
            getAll () {
                return request.cookies.getAll();
            },
            setAll (cookiesToSet) {
                cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request
                });
                cookiesToSet.forEach(({ name, value, options })=>supabaseResponse.cookies.set(name, value, options));
            }
        }
    });
    // Refresh session — required for Server Components to read auth state
    const { data: { user } } = await supabase.auth.getUser();
    const { pathname } = request.nextUrl;
    // Protect all /admin/* routes except /admin/login and /admin/auth/*
    const isAdminRoute = pathname.startsWith("/admin");
    const isPublicAdminRoute = pathname === "/admin/login" || pathname.startsWith("/admin/auth/");
    if (isAdminRoute && !isPublicAdminRoute && !user) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/admin/login";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
    }
    return supabaseResponse;
}
const config = {
    matcher: [
        "/admin/:path*"
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__03rkfs2._.js.map