import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export { isSupabaseConfigured };

/** Soft probe — does not throw when demo-only. */
export async function getSupabaseOrNull() {
  if (!isSupabaseConfigured()) return null;
  try {
    return await createClient();
  } catch {
    return null;
  }
}
