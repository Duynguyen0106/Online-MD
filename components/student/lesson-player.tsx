"use client";

import { useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { markBlockViewed } from "@/actions/learning";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ContentBlock, Lesson, LessonProgress } from "@/lib/types/domain";
import { cn } from "@/lib/utils";

export function LessonPlayer({
  lesson,
  blocks,
  progress,
  moduleId,
}: {
  lesson: Lesson;
  blocks: ContentBlock[];
  progress?: LessonProgress;
  moduleId: string;
}) {
  const viewed = new Set(progress?.viewedBlockIds ?? []);
  const firstUnseen = blocks.findIndex((b) => !viewed.has(b.id));
  const [activeId, setActiveId] = useState(
    blocks[firstUnseen >= 0 ? firstUnseen : 0]?.id ?? blocks[0]?.id,
  );
  const [pending, startTransition] = useTransition();
  const active = blocks.find((b) => b.id === activeId) ?? blocks[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          Lesson navigation
        </p>
        <ul className="space-y-1">
          {lesson.concepts.map((concept) => (
            <li key={concept.id}>
              <p className="px-2 py-1 text-xs font-semibold text-[var(--brand-strong)]">
                {concept.title}
              </p>
              <ul className="mb-2 space-y-1">
                {concept.blocks.map((block) => (
                  <li key={block.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(block.id)}
                      className={cn(
                        "w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                        activeId === block.id
                          ? "bg-[var(--brand-soft)] text-[var(--brand-strong)]"
                          : "hover:bg-[var(--surface-2)]",
                      )}
                    >
                      <span className="block truncate">{block.title}</span>
                      <span className="text-[10px] uppercase text-[var(--muted)]">
                        {block.blockType.replace("_", " ")}
                        {viewed.has(block.id) ? " · viewed" : ""}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 border-t border-[var(--border)] pt-3">
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/lessons/${lesson.id}/quiz`}>Formative quiz</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href={`/modules/${moduleId}`}>Back to module</Link>
          </Button>
        </div>
      </aside>

      <section className="animate-fade-up rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge>{active?.blockType.replace(/_/g, " ")}</Badge>
          {progress?.state === "mastered" ? (
            <Badge className="border-emerald-300 bg-emerald-50 text-emerald-800">
              Lesson mastered
            </Badge>
          ) : null}
        </div>
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl">
          {active?.title}
        </h2>
        {active?.mediaUrl ? (
          <div className="mb-4 overflow-hidden rounded-lg border border-[var(--border)] bg-black/5">
            <div className="aspect-video w-full">
              <iframe
                title={active.title}
                src={toEmbedUrl(active.mediaUrl)}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : null}
        {active?.bodyMd ? (
          <article className="prose-lesson max-w-none text-[15px] leading-7 text-[var(--foreground)]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {active.bodyMd}
            </ReactMarkdown>
          </article>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            disabled={pending || !active}
            onClick={() => {
              if (!active) return;
              startTransition(async () => {
                await markBlockViewed({
                  lessonId: lesson.id,
                  blockId: active.id,
                });
              });
            }}
          >
            {viewed.has(active?.id ?? "") ? "Viewed" : "Mark as viewed"}
          </Button>
          <Button
            variant="secondary"
            disabled={!active}
            onClick={() => {
              const idx = blocks.findIndex((b) => b.id === active?.id);
              if (idx >= 0 && idx < blocks.length - 1) {
                setActiveId(blocks[idx + 1].id);
              }
            }}
          >
            Next block
          </Button>
        </div>
      </section>
    </div>
  );
}

function toEmbedUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
  } catch {
    /* ignore */
  }
  return url;
}
