"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { acceptFacultyInvite } from "@/actions/admin";
import { Button } from "@/components/ui/button";

export function AcceptInviteForm({ token }: { token: string }) {
  const [fullName, setFullName] = useState("");
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
            const res = await acceptFacultyInvite({ token, fullName });
            router.push(res.user.role === "admin" ? "/admin/analytics" : "/faculty");
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Accept failed");
          }
        });
      }}
    >
      <h1 className="font-[family-name:var(--font-display)] text-2xl">
        Accept faculty/admin invite
      </h1>
      <p className="text-sm text-[var(--muted)]">
        Invite-only provisioning. Students cannot use this path to escalate roles.
      </p>
      <label className="block text-sm">
        <span className="mb-1 block text-[var(--muted)]">Full name</span>
        <input
          className="h-10 w-full rounded-md border border-[var(--border)] px-3"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </label>
      <Button disabled={pending || fullName.trim().length < 2} type="submit" className="w-full">
        Create account
      </Button>
      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
    </form>
  );
}
