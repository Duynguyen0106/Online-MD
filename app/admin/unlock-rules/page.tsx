import { AppShell } from "@/components/shared/app-shell";
import { UnlockRulesPanel } from "@/components/admin/unlock-rules-panel";
import { listUnlockRules } from "@/lib/demo/admin-store";

export default async function AdminUnlockRulesPage() {
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
