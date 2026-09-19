"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginDemoStudent } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LoginForm() {
  const [email, setEmail] = useState("student@online-md.local");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <form
      className="mx-auto max-w-md space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        startTransition(async () => {
          try {
            await loginDemoStudent(email);
            router.push("/dashboard");
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
          }
        });
      }}
    >
      <h1 className="font-[family-name:var(--font-display)] text-2xl">Student login</h1>
      <p className="text-sm text-[var(--muted)]">
        Demo auth. Faculty/admin accounts are invite-only — use an invite link or the role switcher.
      </p>
      <label className="block text-sm">
        <span className="mb-1 block text-[var(--muted)]">Email</span>
        <input
          className="h-10 w-full rounded-md border border-[var(--border)] px-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <Button disabled={pending} type="submit" className="w-full">
        Continue
      </Button>
      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
      <p className="text-xs text-[var(--muted)]">
        Need faculty access? Ask an admin for an invite, or open{" "}
        <Link href="/admin/invites" className="underline">
          invites
        </Link>{" "}
        as admin.
      </p>
    </form>
  );
}
