import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getRequiredSupabasePublicEnv } from "@/lib/env";

export function createPublicClient() {
  const { url, anonKey } = getRequiredSupabasePublicEnv("lib/supabase/public.createPublicClient");
  return createSupabaseClient(url, anonKey);
}
