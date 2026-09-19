import { AppShell } from "@/components/shared/app-shell";
import { UnlockRulesPanel } from "@/components/admin/unlock-rules-panel";
import { getSessionUser } from "@/lib/demo/store";
import { listUnlockRules } from "@/lib/demo/admin-store";

export default async function AdminUnlockRulesPage() {
  const user = await getSessionUser();
  if (user.role !== "admin") {
    return (
      <AppShell title="Unlock rules">
        <p className="text-sm text-[var(--muted)]">Admin only.</p>
      </AppShell>
    );
  }
  const rules = await listUnlockRules();
  return (
    <AppShell title="Unlock rules">
      <p className="mb-6 text-sm text-[var(--muted)]">
        Pedagogical gates remain enforced in server actions. Disabling a rule blocks that unlock
        path until re-enabled.
      </p>
      <UnlockRulesPanel rules={rules} />
    </AppShell>
  );
}
