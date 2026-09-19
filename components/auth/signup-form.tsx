"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupStudent } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const [email, setEmail] = useState("");
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
            await signupStudent({ email, fullName });
            router.push("/dashboard");
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Signup failed");
          }
        });
      }}
    >
      <h1 className="font-[family-name:var(--font-display)] text-2xl">
        Student signup
      </h1>
      <p className="text-sm text-[var(--muted)]">
        Public student registration. Faculty and admin remain invite-only.
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
      <label className="block text-sm">
        <span className="mb-1 block text-[var(--muted)]">Email</span>
        <input
          type="email"
          className="h-10 w-full rounded-md border border-[var(--border)] px-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <Button disabled={pending} type="submit" className="w-full">
        Create student account
      </Button>
      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
      <p className="text-xs text-[var(--muted)]">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
