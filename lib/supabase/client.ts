import { createBrowserClient } from "@supabase/ssr";

function supabaseKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    ""
  );
}

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && supabaseKey());
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = supabaseKey();
  if (!url || !key) {
    throw new Error("Supabase env vars missing — use DEMO_MODE local store");
  }
  return createBrowserClient(url, key);
}
