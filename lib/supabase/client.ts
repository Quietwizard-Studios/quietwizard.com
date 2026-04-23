import { createBrowserClient } from "@supabase/ssr";
import { getRequiredSupabasePublicEnv } from "@/lib/env";

export function createClient() {
  const { url, anonKey } = getRequiredSupabasePublicEnv("lib/supabase/client.createClient");
  return createBrowserClient(url, anonKey);
}
