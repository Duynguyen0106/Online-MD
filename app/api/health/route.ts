import { NextResponse } from "next/server";
import { getAllLessons, getAllModules, getObjectives } from "@/lib/curriculum/accessors";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET() {
  const [modules, lessons] = await Promise.all([
    getAllModules(),
    getAllLessons(),
  ]);
  return NextResponse.json({
    ok: true,
    app: "online-md",
    demoMode: process.env.DEMO_MODE !== "false",
    supabaseConfigured: isSupabaseConfigured(),
    catalog: {
      modules: modules.length,
      lessons: lessons.length,
      objectives: getObjectives().length,
    },
    timestamp: new Date().toISOString(),
  });
}
