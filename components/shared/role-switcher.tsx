"use client";

import { useTransition } from "react";
import { switchDemoUser } from "@/actions/learning";
import { DEMO_USERS } from "@/lib/demo/users";

export function RoleSwitcher({ currentUserId }: { currentUserId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      name="userId"
      defaultValue={currentUserId}
      disabled={pending}
      className="h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-xs"
      onChange={(e) => {
        const userId = e.target.value;
        startTransition(async () => {
          await switchDemoUser(userId);
        });
      }}
    >
      {DEMO_USERS.map((u) => (
        <option key={u.id} value={u.id}>
          {u.role}
        </option>
      ))}
    </select>
  );
}
