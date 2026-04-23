function readEnv(name: string) {
  const value = process.env[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function failMissing(name: string, context: string): never {
  throw new Error(`[env:${context}] Missing required environment variable: ${name}`);
}

export function getOptionalSupabasePublicEnv(context: string) {
  const url = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url && !anonKey) return null;

  if (!url || !anonKey) {
    throw new Error(
      `[env:${context}] NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must both be set`
    );
  }

  return { url, anonKey };
}

export function getRequiredSupabasePublicEnv(context: string) {
  const env = getOptionalSupabasePublicEnv(context);
  if (!env) {
    throw new Error(
      `[env:${context}] Missing NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY`
    );
  }
  return env;
}

export function getRequiredSupabaseServiceEnv(context: string) {
  const url = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!url) failMissing("NEXT_PUBLIC_SUPABASE_URL", context);
  if (!serviceRoleKey) failMissing("SUPABASE_SERVICE_ROLE_KEY", context);

  return { url, serviceRoleKey };
}

export function getSiteUrl(context: string) {
  const configured = readEnv("NEXT_PUBLIC_SITE_URL");
  if (configured) return configured;

  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  throw new Error(`[env:${context}] Missing required environment variable: NEXT_PUBLIC_SITE_URL`);
}

export function getConfigurationHealth() {
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
    siteUrl,
  };

  const partials = {
    supabasePublicPartial,
    supabaseServicePartial,
  };

  const overall = Object.values(checks).every(Boolean) && !Object.values(partials).some(Boolean);

  return {
    overall,
    checks,
    partials,
  };
}

export function getConfigHealthToken() {
  return readEnv("CONFIG_HEALTH_TOKEN");
}

export function getConfigHealthAllowedIps() {
  const value = readEnv("CONFIG_HEALTH_ALLOWED_IPS");
  if (!value) return [];
  return value
    .split(",")
    .map((ip) => ip.trim())
    .filter(Boolean);
}
