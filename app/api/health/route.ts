import { NextResponse } from "next/server";
import {
  getAllLessons,
  getAllModules,
  getObjectives,
} from "@/lib/curriculum/accessors";
import { isSupabaseConfigured } from "@/lib/supabase/server";

async function probeSupabase(): Promise<"ok" | "unreachable" | "skipped"> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return "skipped";
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/auth/v1/health`, {
      headers: { apikey: key },
      signal: AbortSignal.timeout(5000),
    });
    return res.ok ? "ok" : "unreachable";
  } catch {
    return "unreachable";
  }
}

export async function GET() {
  const [modules, lessons, supabaseReachable] = await Promise.all([
    getAllModules(),
    getAllLessons(),
    probeSupabase(),
  ]);
  return NextResponse.json({
    ok: true,
    app: "online-md",
    demoMode: process.env.DEMO_MODE !== "false",
    supabaseConfigured: isSupabaseConfigured(),
    supabaseReachable,
    hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    keyType: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      ? "publishable"
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? "anon"
        : "none",
    catalog: {
      modules: modules.length,
      lessons: lessons.length,
      objectives: getObjectives().length,
    },
    timestamp: new Date().toISOString(),
  });
}
