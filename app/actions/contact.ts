"use server";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getRequiredSupabaseServiceEnv } from "@/lib/env";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { error: "All fields are required." };
  }

  const { url, serviceRoleKey } = getRequiredSupabaseServiceEnv("app/actions/contact.submitContactForm");
  const supabase = createSupabaseClient(url, serviceRoleKey);

  const { error } = await supabase.from("contact_submissions").insert({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    read: false,
  });

  if (error) {
    return { error: "Failed to send. Please try again." };
  }

  return { success: true };
}
