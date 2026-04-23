module.exports = [
"[project]/lib/env.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/app/actions/contact.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40e5ee5453cb26615b3a0e03c5ac8861899cfcc8b0":{"name":"submitContactForm"}},"app/actions/contact.ts",""] */ __turbopack_context__.s([
    "submitContactForm",
    ()=>submitContactForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/env.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function submitContactForm(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return {
            error: "All fields are required."
        };
    }
    const { url, serviceRoleKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequiredSupabaseServiceEnv"])("app/actions/contact.submitContactForm");
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, serviceRoleKey);
    const { error } = await supabase.from("contact_submissions").insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        read: false
    });
    if (error) {
        return {
            error: "Failed to send. Please try again."
        };
    }
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    submitContactForm
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitContactForm, "40e5ee5453cb26615b3a0e03c5ac8861899cfcc8b0", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/contact.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$contact$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/contact.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/contact.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40e5ee5453cb26615b3a0e03c5ac8861899cfcc8b0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$contact$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitContactForm"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$contact$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/contact.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$contact$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/contact.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_0xa-g8y._.js.map