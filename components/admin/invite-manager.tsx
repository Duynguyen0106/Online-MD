"use client";

import { useState, useTransition } from "react";
import { createFacultyInvite, revokeFacultyInvite } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Invite } from "@/lib/types/domain";

export function InviteManager({ invites }: { invites: Invite[] }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"faculty" | "admin">("faculty");
  const [lastLink, setLastLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <form
        className="flex flex-wrap items-end gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);
          startTransition(async () => {
            try {
              const res = await createFacultyInvite({ email, role });
              setLastLink(res.acceptPath);
              setEmail("");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Failed");
            }
          });
        }}
      >
        <label className="text-sm">
          <span className="mb-1 block text-[var(--muted)]">Email</span>
          <input
            type="email"
            required
            className="h-10 rounded-md border border-[var(--border)] px-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-[var(--muted)]">Role</span>
          <select
            className="h-10 rounded-md border border-[var(--border)] px-3"
            value={role}
            onChange={(e) => setRole(e.target.value as "faculty" | "admin")}
          >
            <option value="faculty">faculty</option>
            <option value="admin">admin</option>
          </select>
        </label>
        <Button type="submit" disabled={pending}>
          Create invite
        </Button>
      </form>
      {lastLink ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
          Invite link (demo): <code>{lastLink}</code>
        </p>
      ) : null}
      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}

      <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] text-xs text-[var(--muted)]">
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Expires</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {invites.map((invite) => (
              <tr key={invite.id} className="border-b border-[var(--border)]">
                <td className="p-3">{invite.email}</td>
                <td className="p-3">{invite.role}</td>
                <td className="p-3">
                  <Badge>{invite.status}</Badge>
                </td>
                <td className="p-3 text-xs text-[var(--muted)]">
                  {new Date(invite.expiresAt).toLocaleString()}
                </td>
                <td className="p-3">
                  {invite.status === "pending" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={pending}
                      onClick={() => {
                        startTransition(async () => {
                          await revokeFacultyInvite(invite.id);
                        });
                      }}
                    >
                      Revoke
                    </Button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
